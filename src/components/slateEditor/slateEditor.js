import React, { useEffect, useMemo, useState, useCallback } from "react";

import { createEditor, Transforms, Editor, Text } from "slate";

import { Slate, Editable, withReact } from "slate-react";

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // value that comes out of editor
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // Define a rendering function based on the element passed to `props`. we use `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const elementSelector = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();

    switch (e.key) {
      case "`": {
        CustomEditor.toggleCodeBlock(editor);
        break;
      }
      case "b": {
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      case "i": {
        CustomEditor.toggleItalicMark(editor);
        break;
      }
      case "u": {
        CustomEditor.toggleUnderlineMark(editor);
        break;
      }
      case "s": {
        if (e.shiftKey) {
          CustomEditor.toggleStrikethroughMark(editor);
        }
        break;
      }
    }
  };

  return (
    // You can think of the <Slate /> component as providing "controlled" context to every component inside it.
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
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
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyUp={(e) => elementSelector(e)}
      />
    </Slate>
  );
};

export default SlateEditor;

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes} style={{ background: "#ccc" }}>
      <code>{props.children}</code>
    </pre>
  );
};

// DEFAULT element / p tag
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: textDecorationSwitch(props.leaf),
      }}
    >
      {props.children}
    </span>
  );
};

function textDecorationSwitch(leaf) {
  console.log("leaf :>> ", leaf);
  let decoration = "";
  // strikethrough
  if (leaf.strikethrough) {
    decoration = "line-through";
  }
  // underline
  if (leaf.underline) {
    decoration += " underline";
  }
  console.log("decoration :>> ", decoration);
  if (decoration.length === 0) {
    return "none";
  } else {
    return decoration;
  }
}

// =============  Custom  ============= //

const CustomEditor = {
  // =================== Check Activity Section =================== //
  // ------------------- Check Text Decorations ------------------- //
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });
    return !!match;
  },

  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    });
    return !!match;
  },

  isStrikethroughMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.strikethrough === true,
      universal: true,
    });
    return !!match;
  },

  // ------------------- Check Elements ------------------- //
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    return !!match;
  },

  // =================== Toggle Section =================== //

  // ------------------- Toggle Text Decorations ------------------- //
  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleStrikethroughMark(editor) {
    const isActive = CustomEditor.isStrikethroughMarkActive(editor);
    Transforms.setNodes(
      editor,
      { strikethrough: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  // ------------------- Toggle Elements ------------------- //

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
