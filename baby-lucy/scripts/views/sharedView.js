//Parameters:
//  none
//What it does:
//  Builds the main navigation bar as an HTML string.
//  Renders four buttons, one per section: Productos, Inventario, Ventas, Clientes.
//  Each button carries a data-seccion attribute used by the router
//  to know which section to load when clicked.
//  Productos starts with nav__btn--active as the default section.
//  Also renders an empty <div#contenido> where each section will be injected.
//Returns:
//  A raw HTML string with the <nav> and the content container ready to inject into the DOM.
export function renderNav() {
  return `
    <nav class="nav-panel" id="nav-panel">
      <button class="nav__btn nav__btn--active" data-seccion="dashboard">Dashboard</button>
      <button class="nav__btn" data-seccion="productos">Productos</button>
      <button class="nav__btn" data-seccion="inventario">Inventario</button>
      <button class="nav__btn" data-seccion="ventas">Ventas</button>
      <button class="nav__btn" data-seccion="clientes">Clientes</button>
    </nav>
    <div id="contenido"></div>
  `;
}