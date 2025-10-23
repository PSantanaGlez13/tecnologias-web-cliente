// Simple Custom Element, logs callbacks
class Dummy extends HTMLInputElement {
    static observedAttributes = ['is-on'];
    constructor() {
        super();
        this.type = 'checkbox';
        this.setAttribute('is-on', 'false')
        this.checked = false;
        this.addEventListener('click', () => {
            const currentValue = this.getAttribute('is-on');
            this.setAttribute('is-on', currentValue === 'false' ? 'true' : 'false');
        })
    }

    adoptedCallback() {
        console.log('Custom element moved!');
    }

    connectedCallback() {
        console.log('Custom element connected!');
    }

    disconnectedCallback() {
        console.log('Custom element disconnected')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed, you clicked the checkbox!`);
    }
}

customElements.define('dummy-element', Dummy, {extends: 'input'});

const button = document.getElementById('create-custom-element');

button.addEventListener('click', () => {
    document.body.appendChild(document.createElement('input', {is: 'dummy-element'}));
});