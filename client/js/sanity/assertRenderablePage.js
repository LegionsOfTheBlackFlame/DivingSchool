export function assertRenderablePage(page) {
  if (!page || typeof page !== 'object') {
    throw new Error('Page must be an object');
  }

  if (!Array.isArray(page.sections)) {
    throw new Error('Page.sections must be an array');
  }

  page.sections.forEach((section, i) => {
    if (!Array.isArray(section.blocks)) {
      throw new Error(`Section[${i}] blocks must be an array`);
    }

    section.blocks.forEach((block, j) => {
      if (!block.type) {
        throw new Error(`Block[${i}:${j}] missing type`);
      }

      if (typeof block.content !== 'string') {
        throw new Error(`Block[${i}:${j}] content must be string`);
      }
    });
  });
}