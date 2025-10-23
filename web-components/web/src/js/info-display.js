export class InfoDisplay extends HTMLElement {
    static MAX_VALORATION_NUMBER = 5 // Number included
    constructor() {
        super();
        this.valorations = [];
        let sumValorations = 0;
        let totalValorations = 0;
        for (let i = 1; i <= InfoDisplay.MAX_VALORATION_NUMBER; ++i) {
            const numberOfValorations = Math.floor(Math.random() * (10 - 1)) + 1;
            totalValorations += numberOfValorations;
            sumValorations += numberOfValorations * i;
            this.valorations.push(numberOfValorations); // Keep in mind, index 0 will be valorations 1
        }
        this.mean = sumValorations / totalValorations; 
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});
        const template = document.getElementById('info-display-empty-template');
        const clone = template.content.cloneNode(true);
        shadow.append(clone);
        document.addEventListener('newselection', this.onNewSelectionCallback.bind(this));
    }
    // Add new content to the display
    onNewSelectionCallback(event) {
        console.log("here")
        const shadow = this.shadowRoot;
        shadow.innerHTML = '';
        const template = document.getElementById('info-display-template');
        const clone = template.content.cloneNode(true);
        shadow.append(clone);
        const id = event.detail.id;
        fetch(`http://localhost:3000/${id}`).then((response) => response.json().then((json) => {
            shadow.getElementById('detail-img').src = json.imagen_url_2;
            shadow.getElementById('title').textContent = json.espacio_cultura_nombre;
            for (let i=1; i <= InfoDisplay.MAX_VALORATION_NUMBER; ++i) {
                shadow.getElementById(String(i)).textContent = `${i} estrellas:${this.valorations[i - 1]}`;
            }
            shadow.getElementById('mean').textContent = `Media de puntuación: ${this.mean}`;            
        })).catch(err => console.error(err));
        
    }
}