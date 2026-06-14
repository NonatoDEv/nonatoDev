import { db } from './main.js'
// auth.js: Manejo de autenticación 
export class AuthManager {
    // El constructor ahora no necesita recibir el cliente, ya que lo importamos directamente
    async login(email, password) {
        try {
        const { data, error } = await db.auth.signInWithPassword({ email, password })
        if (error) throw error
        return data.session
        } 
        catch (error) {
        throw error
        }
    }
    // Método para cerrar sesión
    async logout() {
        try {
        const { error } = await db.auth.signOut()
        if (error) throw error
        window.location.href = 'login.html'
        }
        catch (error) {
        console.error('Error al cerrar sesión:', error.message)
        }
    }
    // Método para verificar si hay una sesión activa
    async verificarSesion() {
        try {
        const { data, error } = await db.auth.getSession()
        if (error) throw error
        return data.session
        }
        catch (error) {
        console.error('Error al verificar sesión:', error.message)
        return null
        }
    }
}