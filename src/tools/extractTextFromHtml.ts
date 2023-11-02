export function extractTextFromHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements = doc.querySelectorAll(
    "h2, div, p, span, h1, h3, h4, h5, h6, ul, li, a, img, iframe, blockquote, pre"
  );
  let text = "";
  for (let i = 0; i < elements.length; i++) {
    text += elements[i].textContent + " ";
  }
  return text.trim();
}
