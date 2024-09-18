'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import AdminSideBar from '../../../components/AdminSideBar';

const EditorConvertToHTML = dynamic(() => import('./EditorConvertToHTML'), {
  ssr: false,
});

const BlogEditorPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');  // For displaying status messages
  const [loading, setLoading] = useState(false);  // For displaying a loading state

  const handleTitleChange = (e) => setBlogTitle(e.target.value);
  const handleSubtitleChange = (e) => setBlogSubtitle(e.target.value);
  const handleAuthorChange = (e) => setBlogAuthor(e.target.value);
  const handleTagsChange = (e) => setBlogTags(e.target.value);
  const handleImageChange = (e) => setBlogImage(e.target.files[0]);

  const savePost = async (isDraft) => {
    setLoading(true);
    setStatusMessage(''); // Clear previous messages

    // Prepare formData to send image file and post data
    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('subtitle', blogSubtitle);
    formData.append('author', blogAuthor);
    formData.append('tags', blogTags);
    formData.append('content', editorContent);
    formData.append('draft', isDraft);
    if (blogImage) {
      formData.append('image', blogImage);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/add-blog`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatusMessage('Post saved successfully!');
        // Reset the form fields after successful save
        setBlogTitle('');
        setBlogSubtitle('');
        setBlogAuthor('');
        setBlogTags('');
        setBlogImage(null);
        setEditorContent('');
        setSelectedPost(null);
      } else {
        setStatusMessage(`Error saving post: ${response.statusText}`);
      }
    } catch (error) {
      setStatusMessage(`Error sending post: ${error.message}`);
    }

    setLoading(false);
  };

  const editPost = (index) => {
    const post = posts[index];
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    setBlogAuthor(post.author);
    setBlogTags(post.tags);
    setBlogImage(post.image);
    setEditorContent(post.content);
    setSelectedPost(index);
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-1 p-10">

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">
            {selectedPost === null ? 'Write' : 'Edit Post'}
          </h2>

          <div className="space-y-4">
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

            <div className="mb-4">
              <label htmlFor="blogSubtitle" className="block text-gray-700 mb-1">Body</label>
              <EditorConvertToHTML content={editorContent} setContent={setEditorContent} />
            </div>

            <div className="mb-4">
              <label htmlFor="blogImage" className="block text-gray-700 mb-1">Attach a file or URL</label>
              <input
                id="blogImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">Upload file</p>
            </div>

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

          <div className="flex justify-between mt-4">
            <button
              onClick={() => savePost(false)}  // Save as published post
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
              disabled={loading}  // Disable button while loading
            >
              {loading ? 'Posting...' : selectedPost === null ? 'Post' : 'Update Post'}
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

export default BlogEditorPage;
