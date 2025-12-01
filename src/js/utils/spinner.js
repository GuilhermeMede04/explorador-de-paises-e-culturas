class Spinner {
    constructor() {
        //cria o spinner
        this.createSpinner();
    }

    createSpinner() {
        //nao cria se ja existir
        if (document.querySelector('.spinner-overlay')) return;

        const spinner = document.createElement('div');
        spinner.className = 'spinner-overlay';
        spinner.innerHTML = `
            <div class="spinner"></div>
            <p>Carregando...</p>
        `;
        spinner.style.display = 'none';
        
        document.body.appendChild(spinner);
    }
    //mostra o spinner
    show() {
        const spinner = document.querySelector('.spinner-overlay');
        if (spinner) {
            spinner.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    //escode o spinner
    hide() {
        const spinner = document.querySelector('.spinner-overlay');
        if (spinner) {
            spinner.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
}

//criar uma instancia global para todos usarem
window.appSpinner = new Spinner();