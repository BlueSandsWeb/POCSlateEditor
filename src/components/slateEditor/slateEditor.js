import React, { useEffect, useMemo, useState, useCallback } from "react";

import { createEditor } from "slate";

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

  return (
    // You can think of the <Slate /> component as providing "controlled" context to every component inside it.
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable onKeyDown={(e) => fixAnd(e)} />
    </Slate>
  );
};

export default SlateEditor;
