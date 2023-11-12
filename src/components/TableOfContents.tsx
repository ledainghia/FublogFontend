import React, { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<{ level: string; text: string }[]>(
    []
  );

  useEffect(() => {
    const regex = /<h([1-6])[^>]*>(.+?)<\/h\1>/g;
    const matches = Array.from(content.matchAll(regex));

    const headingsList = matches.map((match) => ({
      level: match[1],
      text: match[2],
    }));

    setHeadings(headingsList);
  }, [content]);

  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#heading${index + 1}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
