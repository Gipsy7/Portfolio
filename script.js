/* ========================================
   PORTFÓLIO — MIKAEL FRANCISCO
   JavaScript puro, sem dependências.
   ======================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ========================================
    // NAVBAR: sombra ao rolar, menu mobile, seção ativa
    // ========================================

    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.getElementById('navbar-menu');

    if (navbar) {
        const setNavbarState = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 12);
        };
        setNavbarState();
        window.addEventListener('scroll', setNavbarState, { passive: true });
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });

        // Fecha o menu ao navegar
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menu');
            });
        });
    }

    // Destaca no menu a seção visível
    const navLinks = Array.from(document.querySelectorAll('.navbar-menu a[href^="#"]'));
    const sections = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // ========================================
    // SMOOTH SCROLL para âncoras internas
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    // ========================================
    // TEMA CLARO / ESCURO
    // ========================================

    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);

            const themeColor = document.querySelector('meta[name="theme-color"]');
            if (themeColor) {
                themeColor.setAttribute('content', next === 'dark' ? '#0a0a0c' : '#ffffff');
            }

            try {
                localStorage.setItem('theme', next);
            } catch (e) {
                /* modo privado: segue sem persistir */
            }
        });
    }

    // ========================================
    // ANIMAÇÃO DE ENTRADA AO ROLAR
    // ========================================

    const revealTargets = document.querySelectorAll(
        '.project-card, .skill-item, .contact-item, .timeline-item, .feature-card, ' +
        '.stat-card, .overview-card, .result-card, .gallery-item, .learning-item, .case-nav-card'
    );

    if (prefersReducedMotion) {
        revealTargets.forEach(el => el.classList.add('visible'));
    } else {
        revealTargets.forEach(el => el.classList.add('reveal'));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;
                // Escalona levemente os itens que entram juntos
                entry.target.style.transitionDelay = Math.min(index * 60, 240) + 'ms';
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        revealTargets.forEach(el => revealObserver.observe(el));
    }

    // ========================================
    // CARDS DE PROJETO: vídeo no hover
    // ========================================

    document.querySelectorAll('.project-image video, .gallery-item video').forEach(video => {
        const container = video.closest('.project-card, .gallery-item') || video;

        container.addEventListener('mouseenter', () => {
            video.play().catch(() => { /* autoplay bloqueado: ignora */ });
        });

        container.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ========================================
    // LIGHTBOX ACESSÍVEL (clique, teclado, Esc)
    // ========================================

    const zoomables = document.querySelectorAll(
        '.project-image img, .gallery-item img, .screenshot-container img, .project-figure img'
    );

    if (zoomables.length) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Visualização ampliada');
        lightbox.innerHTML =
            '<button class="lightbox-close" aria-label="Fechar visualização">&times;</button>' +
            '<img class="lightbox-media" alt="">';
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-media');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        let lastFocused = null;

        const openLightbox = (src, alt) => {
            lastFocused = document.activeElement;
            lightboxImg.src = src;
            lightboxImg.alt = alt || '';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
            lightboxImg.src = '';
            if (lastFocused) lastFocused.focus();
        };

        zoomables.forEach(img => {
            // Torna a imagem acionável por teclado sem virar link
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Ampliar imagem: ' + (img.alt || 'imagem do projeto'));

            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(img.currentSrc || img.src, img.alt);
            });

            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img.currentSrc || img.src, img.alt);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // BARRA DE PROGRESSO DE LEITURA
    // ========================================

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);

    const updateProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progressBar.style.width = percent + '%';
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ========================================
    // BOTÃO FLUTUANTE DE WHATSAPP
    // ========================================

    const WHATSAPP_URL = 'https://wa.me/5547996915224?text=' +
        encodeURIComponent('Olá Mikael! Vi seu portfólio e gostaria de conversar.');

    const whatsappFab = document.createElement('a');
    whatsappFab.className = 'whatsapp-fab';
    whatsappFab.href = WHATSAPP_URL;
    whatsappFab.target = '_blank';
    whatsappFab.rel = 'noopener';
    whatsappFab.setAttribute('aria-label', 'Conversar no WhatsApp');
    whatsappFab.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488"/>' +
        '</svg><span class="whatsapp-fab-label">Fale comigo</span>';
    document.body.appendChild(whatsappFab);

    // ========================================
    // BOTÃO VOLTAR AO TOPO
    // ========================================

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    scrollTopBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    // ========================================
    // EASTER EGG — KONAMI CODE
    // ========================================

    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiInput = [];

    document.addEventListener('keydown', (e) => {
        konamiInput.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
        konamiInput = konamiInput.slice(-konamiSequence.length);

        if (konamiInput.join(',') !== konamiSequence.join(',')) return;

        document.body.classList.add('party-mode');

        const message = document.createElement('div');
        message.className = 'party-message';
        message.textContent = '🎉 PARTY MODE 🎉';
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
            document.body.classList.remove('party-mode');
        }, 3000);
    });
})();
