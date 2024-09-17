'use client';

import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { ContentState, Modifier } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    
    // Call the parent method to pass the content
    this.props.setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  // Custom function to add a table
  addTable = () => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const tableHtml = '<table border="1"><tr><td>Row 1, Col 1</td><td>Row 1, Col 2</td></tr></table>';

    const contentStateWithEntity = contentState.createEntity('html', 'IMMUTABLE', { html: tableHtml });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const contentStateWithText = Modifier.insertText(
      contentState,
      selectionState,
      ' ',
      null,
      entityKey
    );

    const newEditorState = EditorState.push(editorState, contentStateWithText, 'insert-characters');
    this.onEditorStateChange(newEditorState);
  };

  // Custom function to add a section
  addSection = () => {
    const { editorState } = this.state;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '--- New Section ---\n\n'
    );
    const newEditorState = EditorState.push(editorState, contentState, 'insert-characters');
    this.onEditorStateChange(newEditorState);
  };

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
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'remove', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            blockType: {
              options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
            },
            // Hide image option
            image: { visible: false },
            // Custom toolbar options
            extra: {
              options: ['table', 'section'],
              table: { icon: '🗒', label: 'Add Table', onClick: this.addTable },
              section: { icon: '📄', label: 'Add Section', onClick: this.addSection },
            },
          }}
        />
      </div>
    );
  }
}

export default EditorConvertToHTML;
