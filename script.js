// Array of "Hello" in different languages
const greetings = [
    "Hello",           // English
    "Hola",            // Spanish
    "Bonjour",         // French
    "Ciao",            // Italian
    "Hallo",           // German
    "Olá",             // Portuguese
    "Привет",          // Russian
    "مرحبا",           // Arabic
    "你好",            // Mandarin
    "こんにちは",       // Japanese
    "안녕하세요",       // Korean
    "สวัสดี",          // Thai
    "Xin chào",        // Vietnamese
    "Kumusta",         // Tagalog/Filipino
    "Jambo",           // Swahili
    "Guten Tag",       // German (formal)
    "Namaste",         // Hindi
    "Shalom",          // Hebrew
    "Merhaba",         // Turkish
    "你好吗",          // Mandarin (how are you)
];

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Shuffle greetings on load
let shuffledGreetings = shuffleArray(greetings);
let greetingIndex = 0;

// Set greeting with animation
function setGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        greetingElement.style.animation = 'none';
        setTimeout(() => {
            greetingElement.textContent = shuffledGreetings[greetingIndex];
            greetingElement.style.animation = 'fadeIn 0.5s ease-in';
        }, 10);
        
        greetingIndex = (greetingIndex + 1) % shuffledGreetings.length;
    }
}

// Set random greeting on page load
window.addEventListener('load', () => {
    setGreeting();
    
    // Change greeting every 5 seconds
    setInterval(setGreeting, 5000);
});

// Add fade-in animation and mobile touch optimizations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Mobile touch optimizations */
    @media (max-width: 768px) {
        a, button, .cta-btn, .dropdown-trigger {
            min-height: 44px;
            min-width: 44px;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation links with mobile optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header && window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else if (header) {
        header.style.boxShadow = 'none';
    }
});

// Add animation on scroll
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

// Observe all cards and experience items
document.querySelectorAll('.experience-card, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dropdown functionality with touch support
document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        const dropdownCard = this.closest('.dropdown');
        dropdownCard.classList.toggle('active');
    });
    
    // Add touch feedback
    trigger.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
    });
    
    trigger.addEventListener('touchend', function() {
        this.style.opacity = '1';
    });
});

// Improve button touch feedback
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});