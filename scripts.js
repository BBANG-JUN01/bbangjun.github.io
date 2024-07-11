// scripts.js
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

    const balloons = [];

    function createBalloon() {
        const balloon = {
            x: Math.random() * canvas.width,
            y: canvas.height + 100,
            r: 20 + Math.random() * 30,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: 1 + Math.random() * 3
        };
        balloons.push(balloon);
    }

    function updateBalloons() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balloons.length; i++) {
            const b = balloons[i];
            b.y -= b.speed;
            if (b.y + b.r < 0) {
                balloons.splice(i, 1);
                i--;
            }
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = b.color;
            ctx.fill();
        }
    }

    function animate() {
        updateBalloons();
        requestAnimationFrame(animate);
    }

    setInterval(createBalloon, 500);
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
