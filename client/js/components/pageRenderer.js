export function renderPageData(page) {
  if (!page || !Array.isArray(page.sections)) {
    throw new Error('Invalid page structure');
  }

  const fragment = document.createDocumentFragment();

  page.sections.forEach(section => {
    const sectionEl = document.createElement('section');

    if (!Array.isArray(section.blocks)) return;

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
