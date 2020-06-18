import { Transforms, Editor, Text } from "slate";

export const CustomEditor = {
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
  isOLActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "ol",
    });
    return !!match;
  },
  isLiActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "li",
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
    Transforms.wrapNodes(
      editor,
      { type: isActive ? null : "ul" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleOL(editor) {
    const isActive = CustomEditor.isOLActive(editor);
    Transforms.wrapNodes(
      editor,
      { type: isActive ? null : "ol" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
  toggleLI(editor) {
    const isActive = CustomEditor.isLiActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "li" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
