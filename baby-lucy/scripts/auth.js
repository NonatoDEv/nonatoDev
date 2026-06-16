import { db } from './main.js'
//Manages all authentication operations for the app.
//Uses the shared Supabase client imported from main.js.
//Handles login, logout, and session verification.
export class AuthManager {
    //Parameters:
    //  email: string with the user's email
    //  password: string with the user's password
    //
    //What it does:
    //  Calls Supabase signInWithPassword with the given credentials.
    //  If Supabase returns an error, throws it up to the caller.
    //
    //Returns:
    //  The session object if login is successful.
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
    //What it does:
    //  Signs the user out from Supabase and redirects to login.html.
    //  If something goes wrong, logs the error to the console.
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
    //What it does:
    //  Checks if there is an active session in Supabase.
    //  Useful to protect routes or decide if the user needs to log in.
    //Returns:
    //  The session object if the user is logged in, null otherwise.
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