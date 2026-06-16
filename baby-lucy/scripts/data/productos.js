import { db } from '../main.js';
//Handles all product and category operations against Supabase.
//All methods throw errors up to the caller if the query fails.
//Example: const productos = new ProductoManager()
export class ProductoManager {
    //what it does:
    //  Private method that runs any Supabase query and handles the response.
    //  Throws the error if Supabase returns one, otherwise returns the data.
    #handleRequest = async (query) => {
        const { data, error } = await query;
        if (error) throw error;
        return data;
    };
    //what it does:
    //  Returns all products with their category name, ordered alphabetically.
    obtenerTodos = async () => {
        return await this.#handleRequest(
            db.from('productos').select('*, categorias(nombre)').order('nombre')
        );
    };
    //what it does:
    //  Returns all categories ordered alphabetically.
    obtenerCategorias = async () => {
        return await this.#handleRequest(
            db.from('categorias').select('*').order('nombre')
        );
    };
    //Parameters:
    //  producto: object with the product fields to insert
    //What it does:
    //  Inserts a new product into the productos table in Supabase.
    guardar = async (producto) => {
        await this.#handleRequest(db.from('productos').insert(producto));
    };
    //Parameters:
    //  id: string with the product id to update
    //  cambios: object with the fields to update
    //What it does:
    //  Finds the product by id and updates only the fields provided in cambios.
    actualizar = async (id, cambios) => {
        await this.#handleRequest(db.from('productos').update(cambios).eq('id', id));
    };
    //Parameters:
    //  id: string with the product id to delete
    //What it does:
    //  Finds the product by id and permanently removes it from Supabase.
    eliminar = async (id) => {
        await this.#handleRequest(db.from('productos').delete().eq('id', id));
    };
}