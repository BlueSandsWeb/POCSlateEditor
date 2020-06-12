import React, { useEffect, useMemo, useState, useCallback } from "react";

import { createEditor, Transforms, Editor } from "slate";

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

  const fixAnd = (e) => {
    if (e.key === "&") {
      // prevent the ampersand character from being inserted
      e.preventDefault();
      // Exeute the 'insertText' method when the event occurs to insert and instead of &.
      editor.insertText("and");
    }
  };

  // Define a rendering function based on the element passed to `props`. we use `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const elementSelector = (e) => {
    e.preventDefault();
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });
    if (e.key === "`" && e.ctrlKey) {
      Transforms.setNodes(
        editor,
        { type: match ? "paragraph" : "code" },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    }
  };

  return (
    // You can think of the <Slate /> component as providing "controlled" context to every component inside it.
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        onKeyDown={(e) => fixAnd(e)}
        renderElement={renderElement}
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
