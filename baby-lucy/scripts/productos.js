import { db } from './main.js'
// products.js: Manejo de productos
export class ProductoManager {
    // Obtener todos los productos con su categoría
    async obtenerTodos() {
        try {
        const { data, error } = await db
        .from('productos')
        .select(`
          *,
          categorias (nombre)
        `)
        .order('nombre')
        //
        if (error) throw error
        return data
        }
        catch (error) {
        throw error
        }
    }
    //obtener solo las categorías para el select
    async obtenerCategorias() {
        try {
        const { data, error } = await db
        .from('categorias')
        .select('*')
        .order('nombre')
        //
        if (error) throw error
        return data
        }
        catch (error) {
        throw error
        }
    }
    // Guardar un nuevo producto
    async guardar(producto) {
        try {
        const { error } = await db
        .from('productos')
        .insert(producto)
        //
        if (error) throw error
        }
        catch (error) {
        throw error
        }
    }
    // Actualizar un producto existente
    async actualizar(id, cambios) {
        try {
        const { error } = await db
        .from('productos')
        .update(cambios)
        .eq('id', id)
        //
        if (error) throw error
        } 
        catch (error) {
        throw error
        }
    }
    // Eliminar un producto
    async eliminar(id) {
        try {
        const { error } = await db
        .from('productos')
        .delete()
        .eq('id', id)
        //
        if (error) throw error
        } 
        catch (error) {
        throw error
        }
    }
}