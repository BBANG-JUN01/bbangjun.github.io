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
        const startY = Math.random() * canvas.height;
        const shapes = [4, 6, 8, 10, 12];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const firework = {
            x: startX,
            y: startY,
            shape: shape,
            particles: []
        };

        for (let i = 0; i < shape; i++) {
            firework.particles.push({
                x: firework.x,
                y: firework.y,
                angle: (Math.PI * 2 / shape) * i,
                speed: Math.random() * 3 + 2,
                radius: 2 + Math.random() * 2,
                color: `hsla(${Math.random() * 360}, 100%, 50%, 1)`
            });
        }

        fireworks.push(firework);
    }

    function updateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < fireworks.length; i++) {
            const firework = fireworks[i];

            for (let j = 0; j < firework.particles.length; j++) {
                const particle = firework.particles[j];
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.speed *= 0.98;
                particle.radius *= 0.98;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            }

            if (firework.particles.every(p => p.radius < 0.5)) {
                fireworks.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        updateFireworks();
        requestAnimationFrame(animate);
    }

    function initialFireworks() {
        for (let i = 0; i < 5; i++) {
            createFirework();
        }
    }

    initialFireworks();

    function randomInterval() {
        createFirework();
        setTimeout(randomInterval, Math.random() * 1000 + 500);
    }

    setTimeout(randomInterval, 1000);
    animate();

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
});
