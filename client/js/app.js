const pageEl = document.getElementById('page');
const pageSlug = pageEl.dataset.page
  || location.pathname.replace('/', '')
  || 'home';

async function loadPage(slug) {
  const res = await fetch(`/api/pages/${slug}`);
  if (!res.ok) {
    pageEl.innerHTML = '<p>Failed to load page</p>';
    return;
  }

 const page = await res.json();
console.log('PAGE DATA:', page);
renderPage(page);
}

function renderPage(page) {
  pageEl.innerHTML = '';

  if (!page.sections || !page.sections.length) {
    pageEl.innerHTML = '<p>No content</p>';
    return;
  }

  page.sections
    .sort((a, b) => a.order_index - b.order_index)
    .forEach(section => {
      const sectionEl = document.createElement('section');
      sectionEl.className = `section section--${section.key}`;

      if (!section.blocks) return;

      section.blocks
        .sort((a, b) => a.order_index - b.order_index)
        .forEach(block => {
          if (block.type === 'text') {
            const p = document.createElement('p');
            p.textContent = block.content;
            sectionEl.appendChild(p);
          }

          if (block.type === 'image') {
            const img = document.createElement('img');
            img.src = block.content;
            img.loading = 'lazy';
            sectionEl.appendChild(img);
          }
        });

      pageEl.appendChild(sectionEl);
    });
}

loadPage(pageSlug);
