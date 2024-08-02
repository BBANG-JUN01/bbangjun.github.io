document.addEventListener('DOMContentLoaded', () => {
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
            setTimeout(type, 100); // 타이핑 속도 조절
        } else {
            setTimeout(() => {
                setTimeout(() => {
                    typingElement.innerHTML = '';
                    index = 0;
                    setTimeout(type, 100); // 반복 시작 전 대기 시간
                }, 1000); // 타이핑 완료 후 대기 시간
            }, 1000);
        }
    }

    type();

    const canvas = document.getElementById('balloonsCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];
    let stars = [];

    function createFirework() {
        const startX = Math.random() * canvas.width;
        const startY = canvas.height;
        const endY = Math.random() * canvas.height / 2;
        const shapes = [4, 6, 8, 10, 12];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
        const firework = {
            x: startX,
            y: startY,
            targetY: endY,
            shape: shape,
            particles: [],
            exploded: false,
            color: color
        };

        fireworks.push(firework);
    }

    function createStar() {
        const star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 6 + 3, // 크기를 키움
            color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`,
            opacity: Math.random(),
            direction: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.5
        };

        stars.push(star);
    }

    function drawFirework(firework) {
        if (!firework.exploded) {
            firework.y -= 2;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            if (firework.y <= firework.targetY) {
                firework.exploded = true;
                for (let i = 0; i < firework.shape; i++) {
                    firework.particles.push({
                        x: firework.x,
                        y: firework.y,
                        angle: (Math.PI * 2 / firework.shape) * i,
                        speed: Math.random() * 3 + 2,
                        startLength: 10,
                        length: 30 + Math.random() * 10,
                        maxLength: 30 + Math.random() * 10,
                        color: firework.color
                    });
                }
            }
        } else {
            firework.particles.forEach(particle => {
                ctx.beginPath();
                ctx.moveTo(
                    particle.x + Math.cos(particle.angle) * particle.startLength,
                    particle.y + Math.sin(particle.angle) * particle.startLength
                );
                ctx.lineTo(
                    particle.x + Math.cos(particle.angle) * particle.length,
                    particle.y + Math.sin(particle.angle) * particle.length
                );
                ctx.strokeStyle = particle.color;
                ctx.stroke();
                particle.startLength += 0.5;
                particle.length -= 0.5;
            });
            firework.particles = firework.particles.filter(p => p.length > 0);
        }
    }

    function drawStar(star) {
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.direction);
        ctx.beginPath();
        ctx.moveTo(0, -star.size);
        for (let i = 1; i < 5; i++) {
            ctx.lineTo(Math.cos((i * 2 * Math.PI) / 5) * star.size, -Math.sin((i * 2 * Math.PI) / 5) * star.size);
        }
        ctx.closePath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.restore();
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            drawFirework(firework);
            if (firework.exploded && firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });

        stars.forEach((star, index) => {
            drawStar(star);
            star.opacity -= 0.02;
            if (star.opacity <= 0) {
                stars.splice(index, 1);
            }
        });

        requestAnimationFrame(update);
    }

    function initialEffects() {
        for (let i = 0; i < 5; i++) {
            createFirework();
        }
        for (let i = 0; i < 100; i++) {
            createStar();
        }
    }

    initialEffects();

    setInterval(createFirework, Math.random() * 1000 + 500);
    setInterval(createStar, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

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

    update();
});
