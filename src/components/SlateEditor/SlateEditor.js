import React, { useEffect, useMemo, useState, useCallback } from "react";
import styles from "./SlateEditor.module.scss";

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

      case "h1":
        return <H1Element {...props} />;
      case "h2":
        return <H2Element {...props} />;
      case "h3":
        return <H3Element {...props} />;
      case "ul":
        return <ULElement {...props} />;
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
const H1Element = (props) => {
  return (
    <h1 {...props.attributes} className={styles.h1}>
      {props.children}
    </h1>
  );
};
const H2Element = (props) => {
  return (
    <h2 {...props.attributes} className={styles.h2}>
      {props.children}
    </h2>
  );
};
const H3Element = (props) => {
  return (
    <h3 {...props.attributes} className={styles.h3}>
      {props.children}
    </h3>
  );
};
const ULElement = (props) => {
  return (
    <ul {...props.attributes} className={styles.ul}>
      <li>{props.children}</li>
    </ul>
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
  isH1Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "h1",
    });
    return !!match;
  },
  isH2Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "h2",
    });
    return !!match;
  },
  isH3Active(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "h3",
    });
    return !!match;
  },
  isULActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "ul",
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
  toggleH1(editor) {
    const isActive = CustomEditor.isH1Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "h1" },

      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleH2(editor) {
    const isActive = CustomEditor.isH2Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "h2" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleH3(editor) {
    const isActive = CustomEditor.isH3Active(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "h3" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleUL(editor) {
    const isActive = CustomEditor.isULActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "ul" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
