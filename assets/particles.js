// Particles Effect Script
class ParticlesBackground {
    constructor(containerId = 'particles-container') {
        this.container = document.getElementById(containerId) || document.body;
        this.particles = [];
        this.particleCount = 50;
        this.init();
        this.animate();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particles-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
            pointer-events: none;
        `;
        document.body.insertBefore(this.canvas, document.body.firstChild);

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x - particle.radius < 0 || particle.x + particle.radius > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(particle.radius, Math.min(this.canvas.width - particle.radius, particle.x));
            }
            if (particle.y - particle.radius < 0 || particle.y + particle.radius > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(particle.radius, Math.min(this.canvas.height - particle.radius, particle.y));
            }

            // Draw particle
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw lines between nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 150) * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesBackground();
});