/* styles.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: white;
}

header {
    background: #333;
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
}

header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}

header nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
}

header nav ul li a {
    color: white;
    text-decoration: none;
}

#hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    background-color: white;
    overflow: hidden;
}

.hero-content {
    position: relative;
    z-index: 2;
}

#typing-container {
    height: 3rem; /* 고정된 높이 설정 */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

#typing {
    font-size: 2.5rem;
    white-space: nowrap;
    overflow: hidden;
}

.caret {
    border-right: 2px solid black;
    animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: black; }
}

#balloonsCanvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

section {
    padding: 2rem;
    text-align: center;
}

.project-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.project-card {
    background: #f4f4f4;
    width: calc(33% - 2rem);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.6s;
    perspective: 1000px;
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d; /* 카드의 자식 요소들이 3D 공간에서 회전하도록 설정 */
}

.project-card .card-front,
.project-card .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    padding: 1rem;
    box-sizing: border-box;
    transform-style: preserve-3d; /* 카드의 내용도 3D 공간에서 회전하도록 설정 */
    background: #f4f4f4; /* 텍스트 부분 배경색 추가 */
}

.project-card .card-front {
    background: #f4f4f4;
    z-index: 2;
}

.project-card .card-back {
    background: #333;
    color: white;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.project-card.flipped .card-front {
    transform: rotateY(180deg);
}

.project-card.flipped .card-back {
    transform: rotateY(0deg);
}

.skills-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.skill {
    background: #f4f4f4;
    padding: 1rem;
    width: calc(33% - 2rem);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    text-align: center;
}

.skill:hover {
    transform: scale(1.05);
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
}

footer {
    background: #333;
    color: white;
    padding: 1rem 0;
    text-align: center;
}
