// BlogEditorPage.js
'use client';

import React, { useState } from 'react';

import dynamic from 'next/dynamic';

// Dynamically import the EditorConvertToHTML with SSR disabled
const EditorConvertToHTML = dynamic(() => import('./EditorConvertToHTML'), {
  ssr: false,
});


const BlogEditorPage = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  const handleTitleChange = (e) => setBlogTitle(e.target.value);
  const handleSubtitleChange = (e) => setBlogSubtitle(e.target.value);
  const handleTagsChange = (e) => setBlogTags(e.target.value);
  const handleImageChange = (e) => setBlogImage(e.target.files[0]);

  const savePost = () => {
    const newPost = {
      title: blogTitle,
      subtitle: blogSubtitle,
      tags: blogTags,
      image: blogImage ? URL.createObjectURL(blogImage) : null,
      content: editorContent,
    };

    if (selectedPost !== null) {
      const updatedPosts = [...posts];
      updatedPosts[selectedPost] = newPost;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, newPost]);
    }

    setBlogTitle('');
    setBlogSubtitle('');
    setBlogTags('');
    setBlogImage(null);
    setEditorContent('');
    setSelectedPost(null);
  };

  const editPost = (index) => {
    const post = posts[index];
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    setBlogTags(post.tags);
    setBlogImage(post.image);
    setEditorContent(post.content);
    setSelectedPost(index);
  };

  return (
    <div className="container mx-auto mt-8 px-6 space-y-8">
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
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={savePost}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            {selectedPost === null ? 'Post' : 'Update Post'}
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600">
            Save as Draft
          </button>
        </div>
      </section>

    </div>
  );
};

export default BlogEditorPage;
