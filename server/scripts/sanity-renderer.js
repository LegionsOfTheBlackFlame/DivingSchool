export function assertRenderablePage(page) {
  if (!page || typeof page !== "object") {
    throw new Error("Page is not an object");
  }

  if (!page.id) {
    throw new Error("Page missing id");
  }

  if (!page.slug) {
    throw new Error("Page missing slug");
  }

  if (!Array.isArray(page.sections)) {
    throw new Error("Page.sections is not an array");
  }

  page.sections.forEach((section, i) => {
    if (!section.key) {
      throw new Error(`Section[${i}] missing key`);
    }

    if (!Array.isArray(section.blocks)) {
      throw new Error(`Section '${section.key}' blocks is not an array`);
    }

    section.blocks.forEach((block, j) => {
      if (!block.type) {
        throw new Error(
          `Block[${j}] in section '${section.key}' missing type`
        );
      }
    });
  });

  return true;
}
