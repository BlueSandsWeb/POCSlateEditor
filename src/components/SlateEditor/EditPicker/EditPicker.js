import React from "react";

const EditPicker = ({ CustomEditor, editor }) => {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleBoldMark(editor);
        }}
        style={{ fontWeight: "bold" }}
      >
        B
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleItalicMark(editor);
        }}
        // style={{ color: 'red'}}
      >
        I
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleUnderlineMark(editor);
        }}
        // style={{ color: 'red'}}
      >
        U
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleStrikethroughMark(editor);
        }}
        // style={{ color: 'red'}}
      >
        S
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code Block
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleH1(editor);
        }}
      >
        h1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleH2(editor);
        }}
      >
        h2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleH3(editor);
        }}
      >
        h3
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleUL(editor);
        }}
      >
        Bullet List
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          CustomEditor.toggleOL(editor);
        }}
      >
        Numbered List
      </button>
    </div>
  );
};

export default EditPicker;
