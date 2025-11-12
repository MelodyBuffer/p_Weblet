import {
    formatCol
} from './textFormat.js';

class TextFormatter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            :host {
                display: block;
                font-family: Arial, sans-serif;
                background-color: #f9fafc;
                padding: 16px;
                border-radius: 8px;
                border: 1px solid #ddd;
                max-width: 900px;
            }
        
            h2 {
                font-weight: normal;
                margin: 0 0 12px 0;
                color: #444;
            }
        
            .row {
                display: flex;
                gap: 10px;
                align-items: flex-start;
                margin-bottom: 10px;
            }
        
            textarea {
                flex: 1;
                height: 200px;
                padding: 10px;
                font-family: Consolas, monospace;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 14px;
            }
        
            button {
                padding: 10px 18px;
                border: none;
                border-radius: 6px;
                background-color: #0078d7;
                color: white;
                cursor: pointer;
            }
        
            button:hover {
                background-color: #005ea1;
            }
        
            .options {
                display: flex;
                gap: 12px;
                margin-bottom: 10px;
            }
        
            label {
                font-size: 14px;
                user-select: none;
            }
        
            .output {
                background: #f3f4f6;
            }
        </style>
        
        <h2>Text Formatter</h2>
        <div class="options">
            <label><input type="input" value=5 id="strsPerLine" style="width: 2rem; text-align: right"> Strings Per Line</label>
            <label><input type="checkbox" id="useDouble"> Double Quotes</label>
            <label><input type="checkbox" id="useSql"> SQL N' ' Style</label>
        </div>
        <div class="row">
            <textarea id="input" placeholder="Enter text here..."></textarea>
            <button id="submit">Format</button>
        </div>
        <textarea id="output" class="output" placeholder="Output will appear here..." readonly></textarea>
        `;
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const input = shadow.getElementById('input');
        const output = shadow.getElementById('output');
        const submit = shadow.getElementById('submit');
        const strsPerLine = shadow.getElementById('strsPerLine');
        const useDouble = shadow.getElementById('useDouble');
        const useSql = shadow.getElementById('useSql');

        submit.addEventListener('click', () => {
            const inputText = input.value.trim();
            if (!inputText) {
                output.value = '';
                return;
            }

            let strsCount = parseInt(strsPerLine.value, 10);
            if (isNaN(strsCount) || strsCount <= 0) {
                strsCount = 5;
            }
            let quoteType = 1;
            if (useDouble.checked) quoteType = 2;
            if (useSql.checked) quoteType = 3;
            const formatted = formatCol(inputText, strsCount, quoteType);
            output.value = formatted;
        });
    }
}
customElements.define('text-formatter', TextFormatter);