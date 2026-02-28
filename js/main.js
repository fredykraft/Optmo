// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');
const mainContent = document.querySelector('.main-content');
const footer = document.querySelector('.footer');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        mainContent.classList.toggle('sidebar-open');
        footer.classList.toggle('sidebar-open');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mainContent.classList.remove('sidebar-open');
        footer.classList.remove('sidebar-open');
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mainContent.classList.remove('sidebar-open');
        footer.classList.remove('sidebar-open');
    });
}

// Account Menu Toggle
const accountBtn = document.getElementById('accountBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (accountBtn && dropdownMenu) {
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.account-menu')) {
            dropdownMenu.classList.remove('active');
        }
    });
}

// Active Nav Item on Scroll
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Filter functionality for picks
const filterBtns = document.querySelectorAll('.filter-btn');
const pickCards = document.querySelectorAll('.pick-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter cards
        pickCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-filter') === filterValue) {
                card.style.display = 'block';
                // Add animation
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mainContent.classList.remove('sidebar-open');
                footer.classList.remove('sidebar-open');
            }
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and analysis items
document.querySelectorAll('.pick-card, .analysis-card, .featured-article').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Cookie Consent Management
const cookieNotice = document.getElementById('cookieNotice');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const declineCookiesBtn = document.getElementById('declineCookies');

// Check if user has already made a cookie choice
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        // Show cookie notice after a short delay
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    } else if (cookieConsent === 'accepted') {
        // Initialize tracking if cookies were accepted
        initializeTracking();
    }
}

// Initialize tracking systems (placeholder for actual tracking code)
function initializeTracking() {
    console.log('🍪 Cookie tracking enabled');
    // This is where you would initialize:
    // - Google Analytics
    // - Facebook Pixel
    // - Custom tracking
    // - User behavior analytics
    
    // Track page view
    trackEvent('page_view', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
}

// Track events (placeholder for actual tracking)
function trackEvent(eventName, eventData) {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        console.log('📊 Tracking event:', eventName, eventData);
        // Send to analytics service
        // Example: gtag('event', eventName, eventData);
    }
}

// Accept cookies
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieNotice.classList.remove('show');
        initializeTracking();
        trackEvent('cookie_consent', { action: 'accepted' });
    });
}

// Decline cookies
if (declineCookiesBtn) {
    declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieNotice.classList.remove('show');
        console.log('🍪 Cookie tracking declined');
        trackEvent('cookie_consent', { action: 'declined' });
    });
}

// Track user interactions (only if consent given)
document.addEventListener('click', (e) => {
    if (e.target.closest('.pick-card')) {
        const cardTitle = e.target.closest('.pick-card').querySelector('h4').textContent;
        trackEvent('project_view', { project: cardTitle });
    }
    
    if (e.target.closest('.filter-btn')) {
        const filter = e.target.closest('.filter-btn').getAttribute('data-filter');
        trackEvent('filter_used', { filter: filter });
    }
    
    if (e.target.closest('.plan-btn')) {
        const plan = e.target.closest('.pricing-card').querySelector('h4').textContent;
        trackEvent('plan_click', { plan: plan });
    }
});

// Initialize cookie consent check on page load
checkCookieConsent();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('OPTMO website loaded and interactive features initialized');
});
