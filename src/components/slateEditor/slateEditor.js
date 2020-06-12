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

  return (
    // You can think of the <Slate /> component as providing "controlled" context to every component inside it.
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable />
    </Slate>
  );
};

export default SlateEditor;
