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
                typingElement.innerHTML = '';
                index = 0;
                setTimeout(type, 100); // 반복 시작 전 대기 시간
            }, 1000); // 타이핑 완료 후 대기 시간
        }
    }

    type();

    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 182, 193, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < 100; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        requestAnimationFrame(animate);
    }

    init();
    animate();
});
