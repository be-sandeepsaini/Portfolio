// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-nav');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.className = isHidden ? 'fas fa-bars' : 'fas fa-times';
    });
}

const initBgAnimation = () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    const particleCount = 60;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    // Particle constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
    ctx.shadowBlur = 10; // Adds a glow effect
    ctx.shadowColor = '#10b981';
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 4);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset for performance
}
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate); // Recursive animation loop
    };
    

    animate(); // Start the animation loop
};

initBgAnimation(); 

// Typewriter Effect Logic
const roles = [
    "Web Developer", 
    "Front End Developer"
];

const roleElement = document.getElementById("role");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200; 

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; 
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
};

document.addEventListener('DOMContentLoaded', typeEffect);
