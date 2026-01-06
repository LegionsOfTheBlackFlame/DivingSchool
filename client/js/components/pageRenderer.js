import { assertRenderablePage } from "../test/assertRenderablePage.js";

export function renderPageData(page) {
  // 🔒 Guard clause — sanity first
  assertRenderablePage(page);

  const fragment = document.createDocumentFragment();

  page.sections.forEach(section => {
    const sectionEl = document.createElement('section');

    section.blocks.forEach(block => {
      if (block.type === 'text') {
        const p = document.createElement('p');
        p.textContent = block.content;
        sectionEl.appendChild(p);
      }

      if (block.type === 'image') {
        const img = document.createElement('img');
        img.src = block.content;
        sectionEl.appendChild(img);
      }
    });

    fragment.appendChild(sectionEl);
  });

  return fragment;
}
