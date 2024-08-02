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
        const targetX = startX;
        const targetY = Math.random() * canvas.height / 2;
        const speed = 2 + Math.random() * 3;
        const firework = {
            x: startX,
            y: startY,
            targetX: targetX,
            targetY: targetY,
            speed: speed,
            exploded: false,
            particles: [],
            shape: Math.floor(Math.random() * 5) // 5가지 모양 중 하나 선택
        };

        fireworks.push(firework);
    }

    function drawShape(ctx, x, y, radius, shape) {
        ctx.beginPath();
        switch (shape) {
            case 0: // Circle
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                break;
            case 1: // Triangle
                ctx.moveTo(x, y - radius);
                ctx.lineTo(x + radius, y + radius);
                ctx.lineTo(x - radius, y + radius);
                ctx.closePath();
                break;
            case 2: // Square
                ctx.rect(x - radius, y - radius, radius * 2, radius * 2);
                break;
            case 3: // Diamond
                ctx.moveTo(x, y - radius);
                ctx.lineTo(x + radius, y);
                ctx.lineTo(x, y + radius);
                ctx.lineTo(x - radius, y);
                ctx.closePath();
                break;
            case 4: // Star
                const spikes = 5;
                const outerRadius = radius;
                const innerRadius = radius / 2;
                let rot = Math.PI / 2 * 3;
                let step = Math.PI / spikes;

                ctx.moveTo(x, y - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
                    rot += step;
                    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
                    rot += step;
                }
                ctx.lineTo(x, y - outerRadius);
                ctx.closePath();
                break;
        }
        ctx.fill();
    }

    function updateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < fireworks.length; i++) {
            const firework = fireworks[i];

            if (!firework.exploded) {
                firework.y -= firework.speed;

                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();

                if (firework.y <= firework.targetY) {
                    firework.exploded = true;
                    for (let j = 0; j < 100; j++) {
                        firework.particles.push({
                            x: firework.x,
                            y: firework.y,
                            angle: Math.random() * Math.PI * 2,
                            speed: Math.random() * 6,
                            radius: Math.random() * 3 + 1,
                            color: `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`
                        });
                    }
                }
            } else {
                for (let j = 0; j < firework.particles.length; j++) {
                    const particle = firework.particles[j];
                    particle.x += Math.cos(particle.angle) * particle.speed;
                    particle.y += Math.sin(particle.angle) * particle.speed;
                    particle.speed *= 0.98;
                    particle.radius *= 0.98;

                    ctx.fillStyle = particle.color;
                    drawShape(ctx, particle.x, particle.y, particle.radius, firework.shape);
                }

                if (firework.particles.every(p => p.radius < 0.5)) {
                    fireworks.splice(i, 1);
                    i--;
                }
            }
        }
    }

    function animate() {
        updateFireworks();
        requestAnimationFrame(animate);
    }

    // 처음 접속 시 고정된 위치에서 폭죽 터트리기
    function initialFireworks() {
        for (let i = 0; i < 3; i++) {
            createFirework();
        }
    }

    initialFireworks();

    // 반복 주기 조정 및 폭죽 생성
    function randomInterval() {
        createFirework();
        setTimeout(randomInterval, Math.random() * 1000 + 500); // 0.5초에서 1.5초 사이의 랜덤 주기
    }

    setTimeout(randomInterval, 1000); // 초기 폭죽 후 반복 주기 설정
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // 프로젝트 카드 클릭 시 뒤집히는 기능 추가
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardInner = card.querySelector('.card-inner');
            cardInner.classList.toggle('flipped');
        });
    });

    // 스킬 바 애니메이션
    const skillBars = document.querySelectorAll('.skill-bar-level');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
});
