# Page Render Contract

A page object is considered renderable if:

- page is an object
- page.sections is an array
- each section has a blocks array
- each block has:
  - type
  - content

This contract is enforced by `assertRenderablePage(page)`.

Any renderer may assume this structure after the assertion passes.
