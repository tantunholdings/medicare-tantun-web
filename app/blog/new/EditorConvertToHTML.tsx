'use client';

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);

    let editorState = EditorState.createEmpty();
    // If content is passed, convert it to editor state
    if (props.content) {
      const blocksFromHtml = htmlToDraft(props.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      editorState = EditorState.createWithContent(contentState);

      props.setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    this.state = {
      editorState,
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    
  };

  componentDidUpdate(prevProps) {
    if (this.props.content !== prevProps.content) {
      const blocksFromHtml = htmlToDraft(this.props.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const newEditorState = EditorState.createWithContent(contentState);
      this.setState({ editorState: newEditorState });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="border border-gray-300 p-2 rounded-md">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor min-h-[200px] border border-gray-300 p-2 rounded"
          onEditorStateChange={this.onEditorStateChange}
          toolbarClassName="bg-gray-50 border border-gray-300 rounded"
        />
      </div>
    );
  }
}

export default EditorConvertToHTML;
