// ========================================
// SMOOTH SCROLLING
// ========================================

/**
 * Adiciona smooth scroll para links internos
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignora links vazios ou apenas '#'
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER (Animações ao scroll)
// ========================================

/**
 * Observa elementos e adiciona animação quando entram na viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa cards de projetos
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Observa itens de habilidades
document.querySelectorAll('.skill-item').forEach(skill => {
    observer.observe(skill);
});

// Observa itens de contato
document.querySelectorAll('.contact-item').forEach(contact => {
    observer.observe(contact);
});

// ========================================
// SCROLL TO TOP
// ========================================

/**
 * Botão de voltar ao topo (opcional)
 * Descomente o código abaixo se quiser adicionar um botão de scroll to top
 */

/*
// Cria botão de scroll to top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(scrollTopBtn);

// Mostra/esconde botão baseado na posição do scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Ação do botão
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// CSS para o botão (adicione ao style.css se quiser usar):
.scroll-top-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--accent-primary);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.scroll-top-btn.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-top-btn:hover {
    background-color: var(--accent-hover);
    transform: translateY(-3px);
}
*/

// ========================================
// PROJECT MEDIA HANDLER
// ========================================

/**
 * Garante que vídeos e GIFs sejam reproduzidos corretamente
 */
document.querySelectorAll('.project-image video').forEach(video => {
    // Autoplay ao passar o mouse
    video.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log('Video play error:', e));
    });
    
    // Pausa ao sair
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// ========================================
// IMAGE HOVER PREVIEW
// ========================================

/**
 * Configura preview de imagem ao passar o mouse
 */
document.querySelectorAll('.project-image').forEach(imageContainer => {
    const img = imageContainer.querySelector('img, video');
    
    if (img) {
        // Define a imagem como variável CSS para usar no ::after
        const imgSrc = img.tagName === 'VIDEO' ? img.poster || img.src : img.src;
        imageContainer.style.setProperty('--preview-image', `url(${imgSrc})`);
    }
});

// ========================================
// FORMULÁRIO DE CONTATO (Opcional)
// ========================================

/**
 * Se você adicionar um formulário de contato no futuro,
 * pode usar este código como base
 */

/*
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Aqui você pode enviar para um backend ou serviço como Formspree
            console.log('Dados do formulário:', data);
            
            // Exemplo de envio (substitua pela sua URL)
            // const response = await fetch('SUA_URL_AQUI', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
            
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    });
}
*/

// ========================================
// THEME TOGGLE (Dark/Light Mode - Opcional)
// ========================================

/**
 * Alterna entre tema claro e escuro
 * Descomente se quiser adicionar essa funcionalidade
 */

/*
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
themeToggle.setAttribute('aria-label', 'Alternar tema');
document.body.appendChild(themeToggle);

// Verifica preferência salva
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
});
*/

// ========================================
// PERFORMANCE & LAZY LOADING
// ========================================

/**
 * Lazy loading de imagens para melhor performance
 */
if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback para navegadores mais antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// LOG DE INICIALIZAÇÃO
// ========================================

console.log('%c🚀 Portfólio carregado com sucesso!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c💜 Desenvolvido com JavaScript puro', 'color: #8b5cf6; font-size: 12px;');
