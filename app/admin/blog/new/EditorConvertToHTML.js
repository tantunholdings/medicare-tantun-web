"use client";

import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorConvertToHTML = ({ content, setContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (content && !editorState.getCurrentContent().hasText()) {
      const blocksFromHtml = htmlToDraft(content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [content]);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setContent(draftToHtml(convertToRaw(newEditorState.getCurrentContent())));
  };

  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor min-h-[200px] border border-gray-300 p-2 rounded"
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName="bg-gray-50 border border-gray-300 rounded"
      />
    </div>
  );
};

export default EditorConvertToHTML;
