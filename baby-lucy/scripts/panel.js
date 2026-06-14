import { AuthManager } from './auth.js'
import { ProductoManager } from './productos.js'

const auth = new AuthManager()
const productos = new ProductoManager()

async function iniciarPanel() {
    try {
        const session = await auth.verificarSesion()
        if (!session) {
        window.location.href = 'login.html'
        return
        }
        // Mostrar header
        document.getElementById('header').style.display = 'block'
        document.getElementById('bienvenida').textContent = 'Hola, ' + session.user.email
        document.getElementById('btn-logout').addEventListener('click', () => auth.logout())
        // Inyectar navegación en main
        document.getElementById('app').innerHTML = renderNav()
        // Cargar módulo productos por defecto
        await cargarSeccionProductos()
        // Eventos de navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('activo'))
            btn.classList.add('activo')
            switch (btn.dataset.seccion) {
            case 'productos':
                await cargarSeccionProductos()
                break
            case 'inventario':
                document.getElementById('contenido').innerHTML = '<p>Inventario próximamente...</p>'
                break
            case 'ventas':
                document.getElementById('contenido').innerHTML = '<p>Ventas próximamente...</p>'
                break
            case 'clientes':
                document.getElementById('contenido').innerHTML = '<p>Clientes próximamente...</p>'
                break
            }
        })
        })
    }
    catch (error) {
    console.error(error.message)
    window.location.href = 'login.html'
    }
}
// Renderiza la barra de navegación y el contenedor principal
function renderNav() {
  return `
    <nav id="nav-panel">
      <button class="nav-btn activo" data-seccion="productos">Productos</button>
      <button class="nav-btn" data-seccion="inventario">Inventario</button>
      <button class="nav-btn" data-seccion="ventas">Ventas</button>
      <button class="nav-btn" data-seccion="clientes">Clientes</button>
    </nav>
    <div id="contenido"></div>
  `
}
// Carga y renderiza la sección de productos
async function cargarSeccionProductos() {
  try {
    const [listaProductos, listaCategorias] = await Promise.all([
      productos.obtenerTodos(),
      productos.obtenerCategorias()
    ])
        document.getElementById('contenido').innerHTML = renderSeccionProductos(listaProductos, listaCategorias)
    // Evento abrir modal
        document.getElementById('btn-abrir-modal').addEventListener('click', () => {
        document.getElementById('modal-producto').style.display = 'flex'
    })
    // Evento cerrar modal
        document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModalProducto)

    // Cerrar al hacer clic fuera
        document.getElementById('modal-producto').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-producto')) cerrarModalProducto()
    })
    // Evento guardar
        document.getElementById('btn-guardar-producto').addEventListener('click', handleGuardarProducto)
    // Eventos eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', async () => {
        if (confirm('¿Eliminar este producto?')) {
          await productos.eliminar(btn.dataset.id)
          await cargarSeccionProductos()
        }
        })
    })
  }
  catch (error) {
    console.error(error.message)
  }
}
// Renderiza la sección de productos con la lista y categorías
function renderSeccionProductos(lista, categorias) {
  return `
    <section id="seccion-productos">
      <h2>Productos</h2>
      <button id="btn-abrir-modal">+ Agregar producto</button>
      <div id="lista-productos">
        ${lista.length === 0
          ? '<p>No hay productos aún.</p>'
          : lista.map(p => `
            <div class="producto-card">
              <h3>${p.nombre}</h3>
              <p>Categoría: ${p.categorias?.nombre ?? '—'}</p>
              <p>Precio venta: S/${p.precio}</p>
              <p>Precio costo: S/${p.precio_costo ?? '—'}</p>
              <p>${p.descripcion ?? ''}</p>
              <button class="btn-eliminar" data-id="${p.id}">Eliminar</button>
            </div>
          `).join('')
        }
      </div>
      <!-- Modal -->
      <div id="modal-producto" style="display:none;">
        <div id="modal-contenido">
          <h3>Nuevo producto</h3>
          <input type="text" id="input-nombre" placeholder="Nombre del producto" />
          <select id="select-categoria">
            <option value="">Selecciona categoría</option>
            ${categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
          </select>
          <input type="number" id="input-precio" placeholder="Precio venta" step="0.01" />
          <input type="number" id="input-costo" placeholder="Precio costo" step="0.01" />
          <textarea id="input-descripcion" placeholder="Descripción (opcional)"></textarea>
          <p id="error-producto"></p>
          <button id="btn-guardar-producto">Guardar</button>
          <button id="btn-cerrar-modal">Cancelar</button>
        </div>
      </div>
    </section>
  `
}
// Función para cerrar el modal y limpiar campos
function cerrarModalProducto() {
  document.getElementById('modal-producto').style.display = 'none'
  document.getElementById('input-nombre').value = ''
  document.getElementById('input-precio').value = ''
  document.getElementById('input-costo').value = ''
  document.getElementById('input-descripcion').value = ''
  document.getElementById('select-categoria').value = ''
  document.getElementById('error-producto').textContent = ''
}
// Función para manejar el guardado de un nuevo producto
async function handleGuardarProducto() {
  try {
    const nombre = document.getElementById('input-nombre').value.trim()
    const precio = parseFloat(document.getElementById('input-precio').value)
    const precio_costo = parseFloat(document.getElementById('input-costo').value)
    const descripcion = document.getElementById('input-descripcion').value.trim()
    const categoria_id = document.getElementById('select-categoria').value
    //
    if (!nombre || !precio || !categoria_id) {
      document.getElementById('error-producto').textContent = '❌ Nombre, precio y categoría son obligatorios'
      return
    }
    // Mostrar estado de guardado
    document.getElementById('btn-guardar-producto').textContent = 'Guardando...'
    document.getElementById('btn-guardar-producto').disabled = true
    // Guardar producto
    await productos.guardar({ nombre, precio, precio_costo, descripcion, categoria_id })
    // Recargar lista y cerrar modal
    cerrarModalProducto()
    await cargarSeccionProductos()
  }
  catch (error) {
    document.getElementById('error-producto').textContent = '❌ ' + error.message
  }
  finally {
    document.getElementById('btn-guardar-producto').textContent = 'Guardar'
    document.getElementById('btn-guardar-producto').disabled = false
  }
}
iniciarPanel()