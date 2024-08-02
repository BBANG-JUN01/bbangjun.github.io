class CanvasOption {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.bgColor = '#000000';
        this.init();
    }

    init() {
        this.canvas.width = this.canvasWidth * this.dpr;
        this.canvas.height = this.canvasHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.canvas.style.width = this.canvasWidth + "px";
        this.canvas.style.height = this.canvasHeight + "px";
    }
}

class Particle extends CanvasOption {
    constructor(x, y, vx, vy) {
        super();
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.opacity = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.01;
    }

    draw() {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}

class Firework extends CanvasOption {
    constructor(x, y, targetY, color) {
        super();
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.color = color;
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.y -= 2;
            if (this.y <= this.targetY) {
                this.exploded = true;
                this.createParticles();
            }
        }

        this.particles.forEach((particle, index) => {
            particle.update();
            if (particle.opacity <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    draw() {
        if (!this.exploded) {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }

        this.particles.forEach(particle => particle.draw());
    }

    createParticles() {
        const PARTICLE_NUM = 10;
        const x = this.x;
        const y = this.y;
        for (let i = 0; i < PARTICLE_NUM; i++) {
            const r = this.randomNumBetween(0.1, 3);
            const angle = Math.PI / 180 * this.randomNumBetween(0, 360);
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            this.particles.push(new Particle(x, y, vx, vy));
        }
    }

    randomNumBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
}

class Canvas extends CanvasOption {
    constructor() {
        super();
        this.fireworks = [];
        this.init();
        this.render();
    }

    init() {
        this.createFirework();
    }

    createFirework() {
        const x = Math.random() * this.canvasWidth;
        const y = this.canvasHeight;
        const targetY = Math.random() * this.canvasHeight / 2;
        const color = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
        const firework = new Firework(x, y, targetY, color);
        this.fireworks.push(firework);
    }

    render() {
        let now, delta;
        let then = Date.now();
        const frame = () => {
            window.requestAnimationFrame(frame);
            now = Date.now();
            delta = now - then;
            if (delta < this.interval) return;
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            if (Math.random() < 0.03) this.createFirework();

            this.fireworks.forEach((firework, index) => {
                firework.update();
                firework.draw();
                if (firework.exploded && firework.particles.length === 0) {
                    this.fireworks.splice(index, 1);
                }
            });

            then = now - (delta % this.interval);
        };
        window.requestAnimationFrame(frame);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Canvas();

    const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = document.querySelector('header').offsetHeight;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    const typingElement = document.getElementById('typing');
    const text = "포트폴리오에 오신 것을 환영합니다";
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index) === ' ' ? '&nbsp;' : text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                setTimeout(() => {
                    typingElement.innerHTML = '';
                    index = 0;
                    setTimeout(type, 100);
                }, 1000);
            }, 1000);
        }
    }

    type();

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardInner = card.querySelector('.card-inner');
            cardInner.classList.toggle('flipped');
        });
    });

    const skillBars = document.querySelectorAll('.skill-bar-level');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
});
