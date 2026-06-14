import { AuthManager } from './auth.js'
const auth = new AuthManager()  
document.getElementById('btn-login').addEventListener('click', handleLogin)

document.getElementById('password').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin()
})
// Verificar sesión al cargar la página
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
// Función para manejar el proceso de login
async function handleLogin() {
    try {
        const email = document.getElementById('email').value.trim()
        const password = document.getElementById('password').value
        if (!email || !password) {
        document.getElementById('error-login').textContent = '❌ Completa todos los campos'
        return
        }
        document.getElementById('btn-login').textContent = 'Ingresando...'
        document.getElementById('btn-login').disabled = true
        await auth.login(email, password)
        window.location.href = 'panel.html'
    }
    catch (error) {
        document.getElementById('error-login').textContent = '❌ ' + error.message
        document.getElementById('btn-login').textContent = 'Ingresar'
        document.getElementById('btn-login').disabled = false
    }
}
iniciarLogin()