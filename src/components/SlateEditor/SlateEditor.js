import React, { useMemo, useState, useCallback } from "react";

import { createEditor } from "slate";
import { Transforms, Editor, Text, Element } from "slate";
import EditPicker from "./EditPicker/EditPicker";
import { CustomEditor } from "./EditPicker/customEditorOperations";
import {
  CodeElement,
  H1Element,
  H2Element,
  H3Element,
  UlElement,
  OlElement,
  LiElement,
  DefaultElement,
} from "./Elements";

import { Slate, Editable, withReact } from "slate-react";

const SlateEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // const withParagraphs = (editor) => {
  //   const { normalizeNode } = editor;

  //   editor.normalizeNode = (entry) => {
  //     const [node, path] = entry;

  //     // If the element is a paragraph, ensure its children are valid.
  //     if (Element.isElement(node) && node.type === "paragraph") {
  //       for (const [child, childPath] of Node.children(editor, path)) {
  //         if (Element.isElement(child) && !editor.isInline(child)) {
  //           Transforms.unwrapNodes(editor, { at: childPath });
  //           return;
  //         }
  //       }
  //     }
  //     normalizeNode(entry);
  //   };
  //   return editor;
  // };

  // withParagraphs(editor);

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
        return <UlElement {...props} />;
      case "ol":
        return <OlElement {...props} />;
      case "li":
        return <LiElement {...props} />;
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
      <EditPicker CustomEditor={CustomEditor} editor={editor} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyUp={(e) => elementSelector(e)}
      />
    </Slate>
  );
};

export default SlateEditor;

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
