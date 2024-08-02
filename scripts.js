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

    function createFirework() {
        const startX = Math.random() * canvas.width;
        const startY = canvas.height;
        const endY = Math.random() * canvas.height / 2;
        const shapes = [4, 6, 8, 12, 30];
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

    function drawFirework(firework) {
        if (!firework.exploded) {
            firework.y -= 2;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            if (firework.y <= firework.targetY) {
                firework.exploded = true;
                const particleLength = 40;
                const startLength = 20; // 중앙 부분부터 시작
                for (let i = 0; i < firework.shape; i++) {
                    firework.particles.push({
                        x: firework.x,
                        y: firework.y,
                        angle: (Math.PI * 2 / firework.shape) * i,
                        speed: 1.5,
                        startLength: startLength,
                        maxLength: startLength + particleLength,
                        length: particleLength,
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
                    particle.x + Math.cos(particle.angle) * (particle.startLength + particle.length),
                    particle.y + Math.sin(particle.angle) * (particle.startLength + particle.length)
                );
                ctx.strokeStyle = particle.color;
                ctx.stroke();
                if (particle.startLength < particle.maxLength) {
                    particle.startLength += particle.speed;
                    particle.length -= particle.speed;
                }
            });
            firework.particles = firework.particles.filter(p => p.length > 0);
        }
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            drawFirework(firework);
            if (firework.exploded && firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(update);
    }

    function initialEffects() {
        for (let i = 0; i < 5; i++) {
            createFirework();
        }
    }

    initialEffects();

    setInterval(createFirework, Math.random() * 1000 + 500);

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
