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
// PARTÍCULAS FLUTUANTES NO HERO
// ========================================

/**
 * Cria partículas animadas no hero section
 */
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    // Cria 20 partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 15;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.4));
            border-radius: 50%;
            left: ${left}%;
            bottom: -10px;
            animation: floatUp ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
    
    // Adiciona CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ========================================
// PARALLAX EFFECT NO MOUSE
// ========================================

/**
 * Efeito parallax suave seguindo o mouse
 */
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 2;
        const yPercent = (clientY / innerHeight - 0.5) * 2;
        
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `
                translate(${xPercent * 10}px, ${yPercent * 10}px)
            `;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
    });
}

// ========================================
// INTERSECTION OBSERVER (Animações ao scroll)
// ========================================

/**
 * Observa elementos e adiciona animação quando entram na viewport
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove opacity inline antes de adicionar a classe
            entry.target.style.opacity = '';
            entry.target.classList.add('fade-in');
            
            // Adiciona efeito especial para section titles
            if (entry.target.classList.contains('section-title')) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards, pulseGlow 2s ease-in-out 0.8s';
            }
            
            // Garante que o elemento permaneça visível após a animação
            entry.target.addEventListener('animationend', () => {
                entry.target.style.opacity = '1';
            }, { once: true });
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa cards de projetos
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observa itens de habilidades
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.style.opacity = '0';
    observer.observe(skill);
});

// Observa itens de contato
document.querySelectorAll('.contact-item').forEach(contact => {
    contact.style.opacity = '0';
    observer.observe(contact);
});

// Observa títulos de seções
document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
});

// ========================================
// TYPED EFFECT NO SUBTÍTULO
// ========================================

/**
 * Efeito de digitação no subtítulo do hero
 */
function typeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 80);
        } else {
            // Adiciona cursor piscante após terminar
            subtitle.innerHTML += '<span style="animation: blink 1s infinite;">|</span>';
            
            // Remove cursor após 3 segundos
            setTimeout(() => {
                const cursor = subtitle.querySelector('span');
                if (cursor) cursor.remove();
            }, 3000);
        }
    }
    
    // Aguarda 1 segundo antes de começar
    setTimeout(type, 1000);
    
    // Adiciona CSS para cursor piscante
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
        }
    `;
    if (!document.querySelector('style[data-blink]')) {
        style.setAttribute('data-blink', 'true');
        document.head.appendChild(style);
    }
}

// Inicia efeito após carregamento
window.addEventListener('load', typeWriter);

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
// 3D TILT EFFECT NOS CARDS
// ========================================

/**
 * Efeito 3D nos project cards ao mover o mouse
 */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            translateY(-8px) 
            scale(1.02) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
        card.style.transformStyle = 'preserve-3d';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transformStyle = '';
    });
});

// ========================================
// HOVER GLOW EFFECT
// ========================================

/**
 * Adiciona efeito de brilho seguindo o cursor nos cards
 */
document.querySelectorAll('.project-card, .skill-item').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Adiciona CSS para o efeito de brilho
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .project-card,
    .skill-item {
        position: relative;
    }
    
    .project-card::after,
    .skill-item::after {
        content: '';
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: -1;
    }
    
    .project-card:hover::after,
    .skill-item:hover::after {
        opacity: 1;
    }
    
    .project-content {
        position: relative;
        z-index: 2;
    }
`;
document.head.appendChild(glowStyle);

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
// SCROLL PROGRESS BAR
// ========================================

/**
 * Cria barra de progresso de leitura
 */
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1);
        background-size: 200% 100%;
        animation: gradientShift 3s ease infinite;
        z-index: 10000;
        transition: width 0.1s ease-out;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

createScrollProgressBar();

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

/**
 * Easter egg divertido com Konami Code
 */
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Ativa modo party 🎉
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Mostra mensagem
        const message = document.createElement('div');
        message.textContent = '🎉 PARTY MODE ACTIVATED! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 2rem 3rem;
            border-radius: 1rem;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10001;
            animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                message.remove();
                document.body.style.animation = '';
            }, 500);
        }, 3000);
    }
});

// ========================================
// LOG DE INICIALIZAÇÃO
// ========================================

console.log('%c🚀 Portfólio carregado com sucesso!', 'color: #6366f1; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(99, 102, 241, 0.3);');
console.log('%c💜 Desenvolvido com JavaScript puro', 'color: #8b5cf6; font-size: 14px;');
console.log('%c✨ Animações e efeitos especiais ativos', 'color: #a78bfa; font-size: 12px;');
console.log('%c🎮 Easter egg: Tente o Konami Code (↑↑↓↓←→←→BA)', 'color: #c4b5fd; font-size: 10px; font-style: italic;');

// ========================================
// TRACKING DE PERFORMANCE
// ========================================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`%c⚡ Tempo de carregamento: ${Math.round(loadTime)}ms`, 'color: #10b981; font-size: 12px;');
});
