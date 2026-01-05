import { renderPageData } from './components/pageRenderer.js';

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
pageEl.innerHTML = '';
pageEl.appendChild(renderPageData(page));
}



loadPage(pageSlug);
