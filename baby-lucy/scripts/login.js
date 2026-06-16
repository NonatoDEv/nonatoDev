import { AuthManager } from './auth.js'
const auth = new AuthManager()  
//Parameters:
//  none
//What it does:
//  Checks if the user already has an active session when the page loads.
//  If a session exists, redirects directly to panel.html
//  so the user does not see the login form again.
//Returns: 
//  none
async function iniciarLogin() {
    try {
        const session = await auth.verificarSesion()
        if (session) {
        window.location.href = 'panel.html'
        }
        } 
    catch (error) {
        console.error(error.message)
        }
    }
//Parameters:
//  none(reads email and password directly from the DOM)
//
//What it does:
//  Validates that both fields are filled before calling auth.login().
//  Disables the button and shows "Ingresando..." while waiting.
//  On success, redirects to panel.html.
//  On error, shows the error message and re-enables the button.
//Returns: 
//  nothing
async function handleLogin() {
    try {
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value
        if (!email || !password) {
        document.getElementById('error-login').textContent = ' Completa todos los campos'
        return
        }
        document.getElementById('btn-login').textContent = 'Ingresando...'
        document.getElementById('btn-login').disabled = true
        await auth.login(email, password)
        window.location.href = 'panel.html'
    }
    catch (error) {
        document.getElementById('error-login').textContent = ' ' + error.message
        document.getElementById('btn-login').textContent = 'Ingresar'
        document.getElementById('btn-login').disabled = false
    }
}
//What it does:
//  Entry point of the login page.
//  Registers all event listeners and checks for an existing session.
//Returns: 
//  nothing
function init() {
    document.getElementById('btn-login').addEventListener('click', handleLogin)
    document.getElementById('password').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleLogin()
    })

    iniciarLogin()
}
init()
