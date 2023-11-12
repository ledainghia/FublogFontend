import React from "react";

interface TableOfContentsProps {
  content: string;
}

const tableOfContentsReplace = (content: string) => {
  const parseContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const tableOfContents = doc.querySelector(
      ".table-of-contents"
    ) as HTMLElement | null;

    const tableOfContentsHTML =
      `<div class="table-of-contents">` +
        (tableOfContents?.innerHTML || "") +
        `</div>` || "";

    if (!tableOfContents)
      return { tableOfContents: null, remainingContent: content };

    const remainingContent = content.replace(tableOfContentsHTML, "");

    return {
      tableOfContents: tableOfContentsHTML,
      remainingContent: remainingContent,
    };
  };

  const { tableOfContents, remainingContent } = parseContent(content);

  return {
    tableOfContents: tableOfContents,
    remainingContent: remainingContent,
  };
};

export default tableOfContentsReplace;
