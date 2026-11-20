// WGIH Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeNewsTicker();
    initializeNavigation();
    initializeScrollEffects();
    initializeCompanyCarousel();
    initializeAIAgentWidget();
});

// ===== COMPANY LOGO CAROUSEL =====
// Duplicates the logo track once so the CSS animation (translateX(-50%)) can
// loop seamlessly — when the first copy scrolls fully offscreen, the
// identical second copy is already in its place, so the loop point is
// invisible to the eye.
function initializeCompanyCarousel() {
    const track = document.querySelector('.company-track');
    if (!track) return;

    track.innerHTML += track.innerHTML;
}

// ===== SLIDER FUNCTIONALITY =====
function initializeSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');

    const showSlide = (n) => {
        if (!slides[n]) return;
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        slides[n].classList.add('active');
        if (indicators[n]) indicators[n].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    if (!slides.length || !prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides
    setInterval(nextSlide, 5000);
}

// ===== NEWS TICKER =====
// All 3 news items stay visible at all times. Instead of sliding items in
// and out of view (which only ever showed one at a time), we rotate a
// "is-live" highlight — a yellow pulse — across the items on an interval so
// the cool animation is kept without hiding the other headlines.
function initializeNewsTicker() {
    const newsList = document.querySelector('.news-list');
    if (!newsList) return;

    const items = document.querySelectorAll('.news-item');
    if (!items.length) return;

    let currentIndex = 0;

    const highlightNext = () => {
        items.forEach(item => item.classList.remove('is-live'));
        items[currentIndex].classList.add('is-live');
        currentIndex = (currentIndex + 1) % items.length;
    };

    highlightNext(); // highlight the first item immediately on load
    setInterval(highlightNext, 4000);
}

// ===== ACTIVE NAVIGATION =====
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(11, 110, 79, 0.3)';
        } else {
            header.style.boxShadow = '0 4px 16px rgba(11, 110, 79, 0.2)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .featured-card, .event-card, .partner-logo').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== SEARCH FUNCTIONALITY =====
const searchBox = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

if (searchBox && searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchBox.value;
        if (query) {
            window.location.href = 'search.html?q=' + encodeURIComponent(query);
        }
    });

    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// ===== SMOOTH SCROLL FOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== GALLERY LIGHTBOX =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            console.log('Opening gallery item:', img.src);
            // Lightbox modal can be implemented here
        }
    });
});

// ===== NEWS ITEM CLICK =====
document.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', function() {
        console.log('Navigating to news article');
        // Will connect to news detail page
    });
});

// ===== EVENT CARD CLICK =====
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Opening event details');
        // Will connect to event detail page
    });
});

// ===== LANGUAGE SELECTOR =====
const languageSelector = document.querySelector('.language-selector select');
if (languageSelector) {
    languageSelector.addEventListener('change', function() {
        const selectedLang = this.value;
        console.log('Language changed to:', selectedLang);
        // Backend API call for language switching
        // location.href = '?lang=' + selectedLang;
    });
}

// ===== MOBILE MENU TOGGLE (for future implementation) =====
function initializeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');

    // Add mobile menu button logic here
    if (window.innerWidth <= 768) {
        // Mobile optimizations
    }
}

// Call mobile menu initialization
initializeMobileMenu();

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    initializeMobileMenu();
}, 250));

// ===== UTILITY FUNCTION: DEBOUNCE =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== SERVICE CARD HOVER EFFECTS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 12px 24px rgba(11, 110, 79, 0.25)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ===== CTA BUTTON ANALYTICS (placeholder) =====
document.querySelectorAll('.cta-button, .service-btn, .card-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const text = this.textContent.trim();
        console.log('CTA Clicked:', text);
        // Track analytics event here
    });
});

// ===== PARTNER LOGO LINKS =====
document.querySelectorAll('.partner-logo').forEach(partner => {
    partner.addEventListener('click', function() {
        console.log('Partner logo clicked');
        // Will link to partner detail or external site
    });
});

// ===== AI AGENT WIDGET (frontend only) =====
// UI shell for the future WGIH assistant. It will answer questions about our
// services and search the site once the backend (DB + admin) is finalized.
// For now the send handler just echoes a canned "coming soon" reply so the
// interaction, open/close, and layout can be reviewed and styled.
function initializeAIAgentWidget() {
    const launcher = document.querySelector('.ai-agent-launcher');
    const panel = document.querySelector('.ai-agent-panel');
    const closeBtn = document.querySelector('.ai-agent-close');
    const form = document.querySelector('.ai-agent-form');
    const input = document.querySelector('.ai-agent-input');
    const messages = document.querySelector('.ai-agent-messages');

    if (!launcher || !panel) return;

    const togglePanel = (open) => {
        panel.classList.toggle('open', open);
        launcher.classList.toggle('hidden', open);
        if (open && input) input.focus();
    };

    launcher.addEventListener('click', () => togglePanel(true));
    if (closeBtn) closeBtn.addEventListener('click', () => togglePanel(false));

    const addMessage = (text, sender) => {
        const bubble = document.createElement('div');
        bubble.className = 'ai-msg ' + sender;
        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    };

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = input.value.trim();
            if (!query) return;

            addMessage(query, 'user');
            input.value = '';

            // Placeholder response until the AI backend is connected.
            setTimeout(() => {
                addMessage(
                    "Thanks! Our WGIH assistant is coming soon — it will answer " +
                    "questions about our services and search the site for you.",
                    'bot'
                );
            }, 500);
        });
    }

    // Quick-suggestion chips prefill the input to show intended scope.
    document.querySelectorAll('.ai-agent-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            input.value = chip.textContent;
            input.focus();
        });
    });
}

console.log('WGIH Website initialized successfully');
