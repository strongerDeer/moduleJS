export default function createHTMLElement(tagName, attr, textContent) {
  const element = document.createElement(tagName);

  if (attr) {
    for (const key in attr) {
      if (attr.hasOwnProperty(key)) {
        element.setAttribute(key, attr[key]);
      }
    }
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
