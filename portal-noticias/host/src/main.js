async function loadMicroFrontend() {
    try {
        const module = await import('header/Header');
        module.mount(document.getElementById('header'));
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}

loadMicroFrontend();