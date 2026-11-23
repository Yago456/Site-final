// ============================================================
// DADOS DAS 17 REDAÇÕES - YAGO BEZERRA DA SILVA
// ============================================================
const redacoes = [
    // (COLE AQUI O ARRAY COM AS 17 REDAÇÕES QUE VOCÊ JÁ TEM NO SEU ARQUIVO ATUAL)
    // Para não ficar gigante aqui na resposta, apenas mantenha as suas 17 redações
    // no formato { id: 1, titulo: "...", texto: "..." }
];

// ============================================================
// 1. CRIAR OS CARDS DO ACORDEÃO (Design Premium)
// ============================================================
function carregarRedacoes() {
    const container = document.getElementById('lista-redacoes');
    
    redacoes.forEach((redacao, index) => {
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

        // Lógica de clique (Acordeão Premium)
        header.addEventListener('click', () => {
            // Fecha todos os outros abertos (opcional, mas deixa o design mais limpo)
            const allHeaders = document.querySelectorAll('.accordion-header');
            const allContents = document.querySelectorAll('.accordion-content');
            
            allHeaders.forEach((h, i) => {
                if (h !== header && h.classList.contains('active')) {
                    h.classList.remove('active');
                    allContents[i].style.maxHeight = null;
                }
            });

            // Abre/Fecha o atual
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
// 2. ANIMAÇÃO AO ROLAR A PÁGINA (Scroll Reveal com IntersectionObserver)
// ============================================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: parar de observar depois que animou
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Dispara quando 10% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

// ============================================================
// 3. BARRA DE PROGRESSO E BOTÃO VOLTAR AO TOPO
// ============================================================
function initScrollEffects() {
    const progressBar = document.getElementById('progress-bar');
    const btnTop = document.getElementById('btn-top');

    window.addEventListener('scroll', () => {
        // Progresso
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';

        // Botão Topo
        if (window.scrollY > 500) {
            btnTop.classList.add('show');
        } else {
            btnTop.classList.remove('show');
        }
    });

    // Clique do botão voltar ao topo
    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================
// 4. SCROLL SUAVE DO MENU
// ============================================================
function initSmoothScroll() {
    const links = document.querySelectorAll('nav a, .scroll-down'); // Inclui a setinha do hero
    
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
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    carregarRedacoes();
    initScrollReveal();
    initScrollEffects();
    initSmoothScroll();
    
    // Pequeno delay para garantir que o DOM foi renderizado antes de animar o Hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('active');
    }, 100);
});
