// Premium Portfolio Interactive Script Engine

// 1. Interactive Canvas Particles Matrix Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleColors = ['rgba(59, 130, 246, 0.12)', 'rgba(6, 182, 212, 0.12)'];

// Dynamically handle canvas scaling to eliminate layout shifting
function scaleCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class MicroParticle {
    constructor() {
        this.reset();
        // Stagger initial distribution across the entire viewport canvas
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10; // Start slightly below viewport
        this.size = Math.random() * 2 + 0.8; // Elegant micro-dot variance
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = -(Math.random() * 0.4 + 0.1); // Constant gentle upward drift
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundaries check logic
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initializeParticleEngine() {
    scaleCanvas();
    particles = [];
    // 65 particles balancing high-fidelity visuals with absolute CPU efficiency
    const totalParticles = 65; 
    for (let i = 0; i < totalParticles; i++) {
        particles.push(new MicroParticle());
    }
}

function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(renderLoop);
}

// Global window event management
window.addEventListener('resize', () => {
    scaleCanvas();
});


// 2. Advanced Hover Spotlight Tracking (Glassmorphism Effect)
function setupSpotlightTracking() {
    const targetCards = document.querySelectorAll('.card');

    targetCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate absolute coordinate offsets inside the exact target card container
            const xCoord = e.clientX - rect.left;
            const yCoord = e.clientY - rect.top;

            // Feed calculated coordinates back directly into CSS variable architecture
            card.style.setProperty('--x', `${xCoord}px`);
            card.style.setProperty('--y', `${yCoord}px`);
        });
    });
}


// 3. Document Engine Operational Lifecycle
document.addEventListener('DOMContentLoaded', () => {
    initializeParticleEngine();
    renderLoop();
    setupSpotlightTracking();
});
