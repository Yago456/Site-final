// ============================================================
// DADOS DAS REDAÇÕES (COLE O SEU ARRAY COMPLETO AQUI)
// ============================================================
const redacoes = [
    // Exemplo:
    // { id: 1, titulo: "Título", texto: "Texto..." },
    // (Cole as suas 17 redações aqui)
];

// ============================================================
// 1. CARREGAR ACORDEÃO
// ============================================================
function carregarRedacoes() {
    const container = document.getElementById('lista-redacoes');
    if (!container) return;
    
    redacoes.forEach((redacao) => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');

        const header = document.createElement('div');
        header.classList.add('accordion-header');
        header.innerHTML = `
            <span>${redacao.titulo}</span>
            <i class="fa-solid fa-chevron-down"></i>
        `;

        const content = document.createElement('div');
        content.classList.add('accordion-content');
        content.innerHTML = `<p>${redacao.texto}</p>`;

        item.appendChild(header);
        item.appendChild(content);
        container.appendChild(item);

        header.addEventListener('click', () => {
            const allHeaders = document.querySelectorAll('.accordion-header');
            const allContents = document.querySelectorAll('.accordion-content');
            
            allHeaders.forEach((h, i) => {
                if (h !== header && h.classList.contains('active')) {
                    h.classList.remove('active');
                    allContents[i].style.maxHeight = null;
                }
            });

            header.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// ============================================================
// 2. ANIMAÇÃO DE SCROLL (À PROVA DE FALHAS)
// ============================================================
function initScrollReveal() {
    // Aplica a classe 'reveal' apenas via JS. Se o JS falhar, o CSS não esconde nada.
    const elementsToReveal = document.querySelectorAll('.timeline-item, .section-header, .accordion-container');
    
    elementsToReveal.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToReveal.forEach(el => {
        // Se já estiver visível na tela ao carregar, mostra na hora sem animação
        if(el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('active');
        } else {
            observer.observe(el);
        }
    });
}

// ============================================================
// 3. BARRA DE PROGRESSO, BOTÃO TOPO E SCROLL SUAVE
// ============================================================
function initScrollEffects() {
    const progressBar = document.getElementById('progress-bar');
    const btnTop = document.getElementById('btn-top');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if(progressBar) progressBar.style.width = scrolled + '%';

        if (window.scrollY > 500) {
            if(btnTop) btnTop.classList.add('show');
        } else {
            if(btnTop) btnTop.classList.remove('show');
        }
    });

    if(btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const links = document.querySelectorAll('nav a, .scroll-down');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================================
// INICIALIZAÇÃO E TEMPORIZADOR DE SEGURANÇA
// ============================================================
function init() {
    carregarRedacoes();
    initScrollEffects();
    
    // Adiciona a classe que faz a animação do topo
    document.body.classList.add('js-loaded');

    // Tenta rodar a animação de scroll
    try {
        initScrollReveal();
    } catch (error) {
        console.warn("IntersectionObserver falhou, mostrando tudo.", error);
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }

    // TEMPORIZADOR DE SEGURANÇA (Se a tela ficar preta por mais de 1.5s, força a exibição)
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.reveal:not(.active)');
        hiddenElements.forEach(el => el.classList.add('active'));
    }, 1500);
}

// Roda quando a página carregar
window.addEventListener('DOMContentLoaded', init);
