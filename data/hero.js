export class Hero {
    constructor(containerId, name, roles, description) {
        this.container = document.getElementById(containerId);
        this.name = name;
        this.roles = roles;
        this.currentRoleIndex = 0;
        this.description = description;
    }
    render(){
        this.container.innerHTML = `
            <h1 class="heroTitle">${this.name}</h1>
            <p class="heroSubtitle"><strong id="dynamic-text" class="highlight">${this.roles[this.currentRoleIndex]}</strong></p>
            <p class="heroDescription">${this.description}</p>
        `;
        this._initDynamicText();
    }
    _initDynamicText(){
        const roleElement = document.getElementById('dynamic-text');
        const roles = this.roles;
        let index = 0;
        setInterval(() => {
        roleElement.classList.add('fade-out');
        setTimeout(() => {
            index = (index + 1) % roles.length;
            roleElement.textContent = roles[index];
            roleElement.classList.remove('fade-out');
            roleElement.classList.add('fade-in-top');
            void roleElement.offsetWidth; 
            roleElement.classList.remove('fade-in-top');
        }, 500); 
    }, 3500);
    }
}