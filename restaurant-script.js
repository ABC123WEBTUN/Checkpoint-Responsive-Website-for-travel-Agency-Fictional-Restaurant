// Restaurant Interactive Features

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

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add to order button functionality
document.querySelectorAll('.btn-outline-warning').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const itemName = card.querySelector('.card-title').textContent;
        const originalText = this.innerHTML;
        
        this.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
        this.classList.remove('btn-outline-warning');
        this.classList.add('btn-success');
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('btn-success');
            this.classList.add('btn-outline-warning');
        }, 2000);
        
        // You could integrate with a cart system here
        console.log(`Added ${itemName} to cart`);
    });
});

// Intersection Observer for animations
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

// Observe menu cards for animation
document.querySelectorAll('.menu-card').forEach(card => {
    observer.observe(card);
});

// Add CSS for intersection observer animations
const style = document.createElement('style');
style.textContent = `
    .menu-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .menu-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);