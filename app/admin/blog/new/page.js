'use client';
import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import AdminSideBar from '../../../../components/AdminSideBar';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImageHelper'; // Helper function to get cropped image
import Cookies from 'js-cookie';
import {Suspense} from "react";

const EditorConvertToHTML = dynamic(() => import('./EditorConvertToHTML'), {
  ssr: false,
});

const BlogEditorPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [blogID, setBlogID] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [prevImageUrl, setPrevImageUrl] = useState('');
  const [editorContent, setEditorContent] = useState(''); 
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState(null); // For cropping modal
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);

  const handleTitleChange = (e) => setBlogTitle(e.target.value);
  const handleSubtitleChange = (e) => setBlogSubtitle(e.target.value);
  const handleAuthorChange = (e) => setBlogAuthor(e.target.value);
  const handleTagsChange = (e) => setBlogTags(e.target.value);

  // Handle the image change and open cropping modal
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
      setCropping(true); // Open cropping modal
    }
  };

  // When the crop area changes
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Finish cropping
  const cropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setBlogImage(croppedImage); // Set cropped image as blog image
      setCropping(false); // Close cropping modal
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (id) {
      setBlogID(id);
      fetchBlogDetails(id);
    }
  }, [id]);

  const fetchBlogDetails = async (id) => {
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/blog/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlogTitle(data.blog.title);
        setBlogSubtitle(data.blog.subtitle);
        setBlogAuthor(data.blog.author);
        setBlogTags(data.blog.tags ? data.blog.tags.join(',') : '');
        setEditorContent(data.blog.content);
        setPrevImageUrl(data.blog.image_url);
        setStatusMessage('Blog details loaded successfully.');
      } else {
        const errorData = await response.json();
        setStatusMessage(`Failed to load Blog details: ${errorData.detail}`);
      }
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (isDraft) => {
    setLoading(true);
    setStatusMessage(''); // Clear previous messages

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('subtitle', blogSubtitle);
    formData.append('author', blogAuthor);
    formData.append('tags', blogTags);
    formData.append('content', editorContent);
    formData.append('draft', isDraft);
    formData.append('id', blogID);

    console.log('Blog ID:', editorContent);

    if (!blogID) {
      const newblogID = uuidv4();
      setBlogID(newblogID);
      formData.append('id', newblogID);
    }

    if (blogImage) {
      formData.append('image', blogImage);
    }
    else {
      formData.append('prev_image_url', prevImageUrl);
    }

    try {
      const token = Cookies.get('authToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/add-blog`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStatusMessage('Post saved successfully!');
        setBlogTitle('');
        setBlogSubtitle('');
        setBlogAuthor('');
        setBlogTags('');
        setBlogImage(null);
        setEditorContent('');
      } else {
        setStatusMessage(`Error saving post: ${response.statusText}`);
      }
    } catch (error) {
      setStatusMessage(`Error sending post: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-1 p-10">
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">
            {id ? 'Edit Post' : 'Write Post'}
          </h2>

          <div className="space-y-4">
            {/* Title Input */}
            <div className="mb-4">
              <label htmlFor="blogTitle" className="block text-gray-700 mb-1">Title</label>
              <input
                id="blogTitle"
                type="text"
                value={blogTitle}
                onChange={handleTitleChange}
                placeholder="Enter post title"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subtitle Input */}
            <div className="mb-4">
              <label htmlFor="blogSubtitle" className="block text-gray-700 mb-1">Subtitle</label>
              <input
                id="blogSubtitle"
                type="text"
                value={blogSubtitle}
                onChange={handleSubtitleChange}
                placeholder="Enter post subtitle"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Blog Body Editor */}
            <div className="mb-4 z-10">
              <label htmlFor="blogBody" className="block text-gray-700 mb-1">Body</label>
              <EditorConvertToHTML content={editorContent} setContent={setEditorContent} />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="blogImage" className="block text-gray-700 mb-1">Attach Image</label>
              <input
                id="blogImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">Upload a feature image for your post.</p>
            </div>

            {/* Tags Input */}
            <div className="mb-4">
              <label htmlFor="blogTags" className="block text-gray-700 mb-1">Tags</label>
              <input
                id="blogTags"
                type="text"
                value={blogTags}
                onChange={handleTagsChange}
                placeholder="Enter tags (comma separated)"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Author Input */}
            <div className="mb-4">
              <label htmlFor="blogAuthor" className="block text-gray-700 mb-1">Author</label>
              <input
                id="blogAuthor"
                type="text"
                value={blogAuthor}
                onChange={handleAuthorChange}
                placeholder="Enter author name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Cropping Modal */}
          {cropping && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-lg h-auto">
              <div className="relative w-full h-64"> {/* Adjust the height here */}
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={3/2} // 2:3 aspect ratio (corrected to match your requirement)
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  classes={{ containerClassName: 'w-full h-full' }} // Ensures the Cropper fits the container
                />
              </div>
          
              <div className="flex justify-between mt-4">
                <button
                  onClick={cropImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-primary"
                >
                  Crop and Upload
                </button>
                <button
                  onClick={() => setCropping(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          
          )}

          {/* Save and Publish Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => savePost(false)}  // Save as published post
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-primary"
              disabled={loading}  // Disable button while loading
            >
              {loading ? 'Posting...' : id ? 'Update Post' : 'Post'}
            </button>

            <button
              onClick={() => savePost(true)}  // Save as draft
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
              disabled={loading}  // Disable button while loading
            >
              {loading ? 'Saving Draft...' : 'Save as Draft'}
            </button>
          </div>

          {/* Status message */}
          {statusMessage && (
            <div className={`mt-4 text-${statusMessage.includes('Error') ? 'red' : 'green'}-600`}>
              {statusMessage}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <BlogEditorPage/>
    </Suspense>
  )
}


export default Page;
