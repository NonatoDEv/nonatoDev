document.addEventListener('DOMContentLoaded', () =>{
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    if (!themeToggle) return;
    const currentTheme = localStorage.getItem('babyLucyTheme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        }
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.getAttribute('data-theme') === 'dark';
        if (isDarkMode) {
            body.removeAttribute('data-theme');
            localStorage.setItem('babyLucyTheme', 'light');
            }
        else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('babyLucyTheme', 'dark');
            }
    });
});