//Parameters:
//List: Array of product objects from Supabase, each containing:
//       { id, nombre, precio, categorias: { nombre } }
//Categories: Array of category objects (declared but not used in this function)
//What it does:
//Builds the full products section as an HTML string.
//   If lista is empty, renders a fallback message.
//   If lista has items, maps each product into a card with its name,
//   category (falls back to "—" if missing), price, and a delete button
//   that carries the product id via data-id attribute.
//
// Returns:
//   A raw HTML string representing the <section> ready to inject into the DOM.
export function renderSeccionProductos(lista, categorias) {
  return `
    <section class="seccion-productos" id="seccion-productos">
      <h2>Productos</h2>
      <button class="btn-crear" id="btn-abrir-modal">+ Agregar producto</button>
      <div class="product-grid" id="lista-productos">
        ${lista.length === 0
          ? '<p>No hay pr oductos aún.</p>'
          : lista.map(p => `
            <div class="product-card">
              <h3>${p.nombre}</h3>
              <p>Categoría: ${p.categorias?.nombre ?? '—'}</p>
              <p>Precio venta: S/${p.precio}</p>
              <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
            </div>
          `).join('')
        }
      </div>
    </section>
  `;
}
//Parameters:
//Categories: Array of category objects from Supabase, each containing:
//       { id, nombre }
// What it does:
//  Builds the product modal as an HTML string.
//  Maps each category into an <option> inside a <select> so the user
//  can pick one when creating a new product.
//  The form collects: name, category, sale price, cost price, and description.
//  Includes a submit button to save and a cancel button to close the modal.
// Returns:
//  A raw HTML string representing the <dialog> ready to inject into the DOM.
export const renderModalProducto = (categorias) => {
  return `
    <dialog class="modal" id="modal-producto">
      <form class="modal__content" id="form-producto">
        <h3>Nuevo producto</h3>
        <input type="text" id="input-nombre" placeholder="Nombre" required />
        <select id="select-categoria" required>
          <option value="">Selecciona categoría</option>
          ${categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
        </select>
        <input type="number" id="input-precio" placeholder="Precio venta" step="0.01" required />
        <input type="number" id="input-costo" placeholder="Precio costo" step="0.01" required />
        <textarea id="input-descripcion" placeholder="Descripción"></textarea>
        <p id="error-producto"></p>
        <div class="modal__actions">
          <button class="btn-crear" type="submit" id="btn-guardar-producto">Guardar</button>
          <button class="btn-eliminar" type="button" id="btn-cerrar-modal">Cancelar</button>
        </div>
      </form>
    </dialog>
  `;
};