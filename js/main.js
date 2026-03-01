// Search Bar Functionality
function initSearchBar() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }
    
    function clearHighlights() {
        // Remove all mark elements and restore text nodes
        document.querySelectorAll('mark.search-highlight').forEach(mark => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
        });
        document.body.normalize();
    }
    
    function highlightText(node, searchTerm) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent;
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            
            if (regex.test(text)) {
                const span = document.createElement('span');
                span.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            const childNodes = Array.from(node.childNodes);
            childNodes.forEach(child => {
                highlightText(child, searchTerm);
            });
        }
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        clearHighlights();
        
        const searchResultsPanel = document.getElementById('searchResults');
        
        if (searchTerm === '') {
            // Show all cards if search is empty
            document.querySelectorAll('.pick-card').forEach(card => {
                card.style.display = 'block';
                card.style.backgroundColor = '';
            });
            if (searchResultsPanel) {
                searchResultsPanel.style.display = 'none';
            }
            return;
        }
        
        const searchTermLower = searchTerm.toLowerCase();
        const pickCards = document.querySelectorAll('.pick-card');
        let cardMatches = 0;
        let otherMatches = 0;
        const sections = [];
        
        // Filter and highlight project cards
        pickCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            
            if (cardText.includes(searchTermLower)) {
                card.style.display = 'block';
                card.style.backgroundColor = 'rgba(128, 0, 32, 0.1)';
                cardMatches++;
                
                // Highlight all matching text in the card
                highlightText(card, searchTerm);
            } else {
                card.style.display = 'none';
                card.style.backgroundColor = '';
            }
        });
        
        // Also search and highlight in other page content (headers, paragraphs, etc)
        const allElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, .featured-content, .portfolio-card');
        
        allElements.forEach(element => {
            // Skip if element is inside a pick card (already handled)
            if (!element.closest('.pick-card')) {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTermLower)) {
                    highlightText(element, searchTerm);
                    
                    // Get section name
                    const section = element.closest('section');
                    if (section) {
                        const sectionTitle = section.querySelector('h2');
                        const sectionName = sectionTitle ? sectionTitle.textContent : 'Content Section';
                        if (!sections.includes(sectionName)) {
                            sections.push(sectionName);
                        }
                    }
                    otherMatches++;
                }
            }
        });
        
        // Display search results summary
        if (searchResultsPanel && (cardMatches > 0 || otherMatches > 0)) {
            const totalMatches = cardMatches + otherMatches;
            let resultHTML = `<div class="search-results-summary">
                <strong>${totalMatches} result${totalMatches !== 1 ? 's' : ''} found</strong>`;
            
            if (cardMatches > 0) {
                resultHTML += `<div class="result-type"><i class="fas fa-project-diagram"></i> ${cardMatches} project${cardMatches !== 1 ? 's' : ''}</div>`;
            }
            
            if (sections.length > 0) {
                resultHTML += `<div class="result-type"><i class="fas fa-file-alt"></i> ${sections.join(', ')}</div>`;
            }
            
            resultHTML += '</div>';
            searchResultsPanel.innerHTML = resultHTML;
            searchResultsPanel.style.display = 'block';
        } else if (searchResultsPanel) {
            searchResultsPanel.innerHTML = '<div class="search-results-summary"><small>No results found</small></div>';
            searchResultsPanel.style.display = 'block';
        }
        
        // Scroll to first highlighted match
        const firstHighlighted = document.querySelector('mark.search-highlight');
        if (firstHighlighted) {
            const yOffset = -100;
            const y = firstHighlighted.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
    
    searchInput.addEventListener('input', () => {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const firstHighlighted = document.querySelector('mark.search-highlight');
            if (firstHighlighted) {
                firstHighlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

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

// Filter functionality for project cards
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
const analyticsPasswordInput = document.getElementById('analyticsPassword');
const cookieStatus = document.getElementById('cookieStatus');
const runtimeAnalyticsPassword = window.OPTMO_ANALYTICS_PASSWORD;

function isAnalyticsEnabled() {
    return localStorage.getItem('analyticsEnabled') === 'true';
}

function setCookieStatus(message, type = '') {
    if (!cookieStatus) {
        return;
    }

    cookieStatus.textContent = message;
    cookieStatus.classList.remove('success', 'error');
    if (type) {
        cookieStatus.classList.add(type);
    }
}

function hasValidAnalyticsPassword() {
    if (!runtimeAnalyticsPassword || !analyticsPasswordInput) {
        return false;
    }

    const enteredPassword = analyticsPasswordInput.value.trim();
    return enteredPassword.length > 0 && enteredPassword === runtimeAnalyticsPassword;
}

// Check if user has already made a cookie choice
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieNotice) {
        return;
    }

    if (!cookieConsent) {
        // Show cookie notice after a short delay
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    } else if (cookieConsent === 'accepted') {
        if (isAnalyticsEnabled()) {
            initializeTracking();
        }
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
    if (localStorage.getItem('cookieConsent') === 'accepted' && isAnalyticsEnabled()) {
        console.log('📊 Tracking event:', eventName, eventData);
        // Send to analytics service
        // Example: gtag('event', eventName, eventData);
    }
}

// Accept cookies (simple - no analytics required)
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('analyticsEnabled', 'false');
        if (cookieNotice) {
            cookieNotice.classList.remove('show');
        }
    });
}

// Enable Analytics button - shows password field
const enableAnalyticsBtn = document.getElementById('enableAnalyticsBtn');
const analyticsAuthSection = document.getElementById('analyticsAuthSection');
const submitAnalyticsBtn = document.getElementById('submitAnalyticsBtn');

if (enableAnalyticsBtn) {
    enableAnalyticsBtn.addEventListener('click', () => {
        if (analyticsAuthSection) {
            analyticsAuthSection.style.display = 'block';
        }
        enableAnalyticsBtn.style.display = 'none';
    });
}

if (submitAnalyticsBtn) {
    submitAnalyticsBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        
        if (!runtimeAnalyticsPassword) {
            localStorage.setItem('analyticsEnabled', 'false');
            setCookieStatus('Analytics password is not configured.', 'error');
        } else if (!hasValidAnalyticsPassword()) {
            localStorage.setItem('analyticsEnabled', 'false');
            setCookieStatus('Incorrect analytics password.', 'error');
        } else {
            localStorage.setItem('analyticsEnabled', 'true');
            setCookieStatus('Analytics enabled for this browser.', 'success');
            initializeTracking();
            trackEvent('cookie_consent', { action: 'accepted_analytics' });
            if (cookieNotice) {
                cookieNotice.classList.remove('show');
            }
        }
    });
}

// Decline cookies
if (declineCookiesBtn) {
    declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        localStorage.setItem('analyticsEnabled', 'false');
        if (cookieNotice) {
            cookieNotice.classList.remove('show');
        }
        setCookieStatus('Analytics disabled.', '');
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

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
        
        // Update scroll progress bar
        const scrollProgressBar = document.getElementById('scrollProgressBar');
        if (scrollProgressBar) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / totalScroll) * 100;
            scrollProgressBar.style.width = scrolled + '%';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// Toast Notification Helper
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Sidebar Resize Functionality
function initSidebarResize() {
    const sidebar = document.getElementById('sidebar');
    const resizeHandle = document.getElementById('sidebarResizeHandle');
    if (!sidebar || !resizeHandle) return;

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    const minWidth = 200; // Minimum sidebar width (px)
    const maxWidth = 450; // Maximum sidebar width (px)
    const storageKey = 'sidebarWidth';

    // Load saved sidebar width
    const savedWidth = localStorage.getItem(storageKey);
    if (savedWidth) {
        const width = parseInt(savedWidth, 10);
        if (width >= minWidth && width <= maxWidth) {
            sidebar.style.width = width + 'px';
        }
    }

    // Handle resize start
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        resizeHandle.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    });

    // Handle resize move
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        let newWidth = startWidth + deltaX;

        // Constrain width between min and max
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        sidebar.style.width = newWidth + 'px';
    });

    // Handle resize end
    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            resizeHandle.classList.remove('dragging');
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            // Save width to localStorage
            localStorage.setItem(storageKey, sidebar.offsetWidth.toString());
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('OPTMO website loaded and interactive features initialized');
    initSearchBar();
    initSidebarResize();
});
