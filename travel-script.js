// Travel Agency Interactive Features

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Destination Learn More buttons
document.querySelectorAll('.destination-card .btn-outline-info').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.destination-card');
        const destinationName = card.querySelector('.card-title').textContent;
        
        // Create modal or show more info
        alert(`More information about ${destinationName} coming soon! Contact us for detailed itineraries.`);
        
        // In a real app, you might open a modal with more details
        // or navigate to a detailed destination page
    });
});

// Tour package view details
document.querySelectorAll('.accordion-body .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const tourType = this.closest('.accordion-item').querySelector('.accordion-button').textContent.trim();
        
        // Scroll to contact form and pre-fill destination
        const contactSection = document.querySelector('#contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add a subtle highlight effect
        setTimeout(() => {
            const form = document.querySelector('.contact-form');
            form.style.transform = 'scale(1.02)';
            form.style.boxShadow = '0 25px 80px rgba(23, 162, 184, 0.2)';
            
            setTimeout(() => {
                form.style.transform = 'scale(1)';
                form.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
            }, 300);
        }, 500);
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        destination: document.getElementById('destination').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.destination || !formData.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Planning Your Journey...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your interest! Our travel experts will contact you within 24 hours to start planning your perfect trip.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success animation
        const form = document.querySelector('.contact-form');
        form.style.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
        setTimeout(() => {
            form.style.background = 'white';
        }, 2000);
        
    }, 3000);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.destination-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.tour-accordion-item').forEach(item => {
    observer.observe(item);
});

// Add CSS for intersection observer animations
const style = document.createElement('style');
style.textContent = `
    .destination-card,
    .tour-accordion-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .destination-card.animate-in,
    .tour-accordion-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .destination-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .destination-card:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    .tour-accordion-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .tour-accordion-item:nth-child(3) {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    const speed = scrolled * 0.5;
    
    if (window.innerWidth > 768) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Dynamic destination selection
const destinationSelect = document.getElementById('destination');
if (destinationSelect) {
    // Add change event listener to provide contextual help
    destinationSelect.addEventListener('change', function() {
        const messageField = document.getElementById('message');
        const selectedValue = this.value;
        
        let placeholder = 'Describe your ideal travel experience, preferred dates, group size, etc.';
        
        switch(selectedValue) {
            case 'paris':
                placeholder = 'Tell us about your Paris dreams! Interested in art, cuisine, romance, or history? Preferred dates and group size?';
                break;
            case 'tokyo':
                placeholder = 'What excites you about Tokyo? Culture, food, technology, or traditions? When would you like to visit?';
                break;
            case 'santorini':
                placeholder = 'Dreaming of Greek islands? Tell us about your ideal Santorini experience - sunsets, beaches, or local culture?';
                break;
            case 'other':
                placeholder = 'Which destination has captured your imagination? Tell us all about your dream trip!';
                break;
        }
        
        messageField.placeholder = placeholder;
    });
}

// Add loading states and micro-interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});