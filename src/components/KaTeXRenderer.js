// KaTeX Formula & Text Renderer for Math Expressions
export function renderMathInText(text) {
  if (!text) return '';
  if (typeof window === 'undefined' || !window.katex) {
    return text;
  }

  try {
    // Replace block math $$...$$
    let formatted = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
      try {
        return `<div class="my-2 py-1 overflow-x-auto text-center font-serif">${window.katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch (e) {
        return match;
      }
    });

    // Replace inline math $...$
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
      try {
        return `<span class="inline-block px-0.5 font-serif">${window.katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch (e) {
        return match;
      }
    });

    return formatted;
  } catch (err) {
    return text;
  }
}
