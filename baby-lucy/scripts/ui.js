import { renderNav } from './views/sharedView.js';
//Manages the base UI of the admin panel.
//Handles header, welcome message, logout button, and nav rendering.
//Example: const ui = new UIManager(auth)
export class UIManager {
    //Parameters:
    //  auth: AuthManager instance to handle logout
    constructor(auth) {
        this.auth = auth;
    }
    //Parameters:
    //  session: Supabase session object with user data
    //What it does:
    //  Renders the nav into the app container,
    //  shows the header, sets the welcome message,
    //  and registers the logout button.
    configurar(session) {
        console.log(session.user.user_metadata)
        document.getElementById('app').innerHTML = renderNav();
        document.getElementById('header').style.display = 'flex';
        const nombre = session.user.user_metadata?.full_name ?? session.user.email;
        document.getElementById('bienvenida').textContent = `Hola, ${nombre}`;
        document.getElementById('btn-logout').onclick = () => this.auth.logout();
    }
}