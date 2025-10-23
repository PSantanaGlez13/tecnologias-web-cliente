export class CulturalSpace extends HTMLElement {
    // Attribute representing the selection of the element
    static observedAttributes = ['highlighted'];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: "open"});
        const template = document.getElementById('cultural-space-template');
        const clone = template.content.cloneNode(true);
        shadow.append(clone);
        // Saving handler to remove it later and change it depending on the state of the element.
        this.currentHandler = this.showInfoCallback.bind(this);
        this.button = shadow.getElementById('show-info');
        this.button.addEventListener('click', this.currentHandler);
        this.setAttribute('highlighted', 'off');
        this.spaceId = this.id;
        fetch(`http://localhost:3000/${this.spaceId}`).then((response) => response.json().then((json) => {
            shadow.getElementById('cultural-space-img').src = json.imagen_url_1;
        })).catch(err => console.error(err));
    }

    // Button has been clicked
    showInfoCallback(event) {
        this.setAttribute('highlighted', 'on');
        // Remove event listener from button
        event.target.removeEventListener('click', this.currentHandler);
        this.dispatchEvent(new CustomEvent('newselection', {detail: {id: this.spaceId}, bubbles: true, composed: true}));
        this.currentHandler = this.newSelectionCallback.bind(this);
        document.addEventListener('newselection', this.currentHandler);
    }

    // To disable highlight after new selections
    newSelectionCallback() {
        console.log('Received')
        this.setAttribute('highlighted', 'off');
        document.removeEventListener('newselection', this.currentHandler);
        this.currentHandler = this.showInfoCallback.bind(this);
        this.button.addEventListener('click', this.currentHandler);
    }

    attributeChangedCallback() {
        const highlightedState = this.getAttribute('highlighted');
        if (highlightedState === 'on') {
            if (!this.button.classList.contains('highlighted'))
                this.button.classList.add('highlighted');
        } else {
            if (this.button.classList.contains('highlighted'))
                this.button.classList.remove('highlighted');
        }    
    }
}