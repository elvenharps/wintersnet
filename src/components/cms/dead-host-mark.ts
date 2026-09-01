import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    deadHost: {
      setDeadHost: (attrs?: { title?: string }) => ReturnType;
      toggleDeadHost: (attrs?: { title?: string }) => ReturnType;
      unsetDeadHost: () => ReturnType;
    };
  }
}

export const DeadHostMark = Mark.create({
  name: "deadHost",

  addAttributes() {
    return {
      title: {
        default: "Offline — historical hostname",
        parseHTML: (element) =>
          element.getAttribute("title") || "Offline — historical hostname",
        renderHTML: (attributes) => ({ title: attributes.title }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span.dead-host" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { class: "dead-host" }),
      0,
    ];
  },

  addCommands() {
    return {
      setDeadHost:
        (attrs) =>
        ({ commands }) =>
          commands.setMark(this.name, attrs),
      toggleDeadHost:
        (attrs) =>
        ({ commands }) =>
          commands.toggleMark(this.name, attrs),
      unsetDeadHost:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    };
  },
});
