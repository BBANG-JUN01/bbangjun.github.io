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

    // 폭죽 효과 시작
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Constants
    const FLAT = canvas.height;
    const FIREWORKS_COUNT = 20;
    const EXP_COUNT = 20;
    const AFTERIMG_COUNT = 10;
    const RADIUS = 2;

    // Classes
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(b) {
            this.x += b.x;
            this.y += b.y;
        }
        clone() {
            return new Vector(this.x, this.y);
        }
    }

    class RGB {
        constructor(r, g, b, a = 1) {
            this.R = r;
            this.G = g;
            this.B = b;
            this.A = a;
        }
        toString() {
            return `rgba(${this.R}, ${this.G}, ${this.B}, ${this.A})`;
        }
        alpha(value) {
            let A = value;
            if (value < 0) {
                A = 0;
            }
            return new RGB(this.R, this.G, this.B, A);
        }
    }

    class Fireworks {
        constructor(pos_x, pos_y, speedH, color = Palette[randint(Palette.length)]) {
            this.start = new Vector(pos_x, pos_y);
            this.color = color;

            // Explosion Particle Count
            this.EXP_COUNT = EXP_COUNT;

            // 0 : 상승, 1: 터짐
            this.mode = 0;

            // Particle
            this.elevator = new Particle(pos_x, pos_y, 0, speedH, this.color);
            this.explosion = [];
        }
        draw() {
            if (this.mode === 0) {
                this.elevate();
            } else {
                this.explode();
            }
        }
        elevate() {
            this.elevator.draw();
            this.elevator.move();
            this.elevator.vel.y += 0.01;
            if (this.elevator.vel.y > 0) {
                const pos = this.elevator.pos;
                for (let i = 0; i < this.EXP_COUNT; i++) {
                    this.explosion.push(new Particle(pos.x, pos.y,
                        rand(1.5) * randSym(), rand(1.5) * randSym(), this.color));
                }
                this.mode = 1;
            }
        }
        explode() {
            this.explosion.forEach(i => {
                i.vel.y += 0.002;
                i.life -= 0.004;
                i.draw();
                i.move();
            });
        }
    }

    class Particle {
        constructor(x, y, vel_x, vel_y, color) {
            this.AFTERIMG_COUNT = AFTERIMG_COUNT;

            this.life = 1;
            this.pos = new Vector(x, y);
            this.vel = new Vector(vel_x, vel_y);
            this.color = color;
            this.afterimg = [];
        }
        draw() {
            Circle(this.pos, RADIUS, this.color);
            for (let i = 0; i < this.afterimg.length; i++) {
                let _color = this.color.alpha(i / this.AFTERIMG_COUNT - 1 + this.life);
                Circle(this.afterimg[i], RADIUS, _color);
            }
        }
        move() {
            this.color = this.color.alpha(this.life);

            this.afterimg.push(this.pos.clone());
            this.pos.add(this.vel);
            while (true) {
                if (this.afterimg.length <= this.AFTERIMG_COUNT) {
                    break;
                }
                this.afterimg.shift();
            }
        }
    }

    const Palette = [
        new RGB(255, 105, 97),
        new RGB(232, 93, 4),
        new RGB(255, 255, 40),
        new RGB(66, 214, 164),
        new RGB(8, 204, 209),
        new RGB(89, 173, 246),
        new RGB(157, 248, 255),
        new RGB(199, 127, 232),
    ];

    function selectColor(color) {
        ctx.beginPath();
        ctx.fillStyle = color.toString();
        ctx.strokeStyle = color.toString();
    }

    function Circle(pos, r, color) {
        selectColor(color);
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, false);
        ctx.fill();
    }

    function randint(n) {
        return Math.floor(Math.random() * n);
    }

    function rand(n) {
        return Math.random() * n;
    }

    function randSym() {
        return randint(2) == 0 ? 1 : -1;
    }

    const RenderList = [];

    function makeFireworks() {
        return new Fireworks(randint(canvas.width), FLAT, -rand(2) - 2);
    }

    function createFireworks() {
        RenderList.push(makeFireworks());
    }

    createFireworks();

    let frame = 0;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (RenderList.length < FIREWORKS_COUNT && frame % 40 === 0) {
            createFireworks();
        }
        for (let i = 0; i < RenderList.length; i++) {
            let count = RenderList[i].explosion.length;
            if (RenderList[i].mode == 1 && RenderList[i].explosion[count - 1].life <= 0) {
                RenderList[i] = makeFireworks();
            }
        }
        RenderList.forEach(i => {
            i.draw();
        });

        frame++;
        requestAnimationFrame(render);
    }

    render();
    // 폭죽 효과 끝

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
