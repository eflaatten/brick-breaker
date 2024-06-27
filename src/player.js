const player = document.getElementById('platform')

const platformWidth = 130;
const platformHeight = 20;
const windowWidth = window.innerWidth;

const startingLeft = (windowWidth / 2) - (platformWidth / 2);

player.style.left = `${startingLeft}px`;

let moveLeft = false
let moveRight = false
const speed = 5

window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') moveRight = true
    if(e.key === 'ArrowLeft') moveLeft = true
})

window.addEventListener('keyup', (e) => {
    if(e.key === 'ArrowRight') moveRight = false
    if(e.key === 'ArrowLeft') moveLeft = false
})

const updatePlayerPosition = () => {
    if(moveRight){
        player.style.left = `${Math.min(window.innerWidth - platformWidth, parseInt(player.style.left, 10) + speed)}px`
    }
    if(moveLeft){
        player.style.left = `${Math.max(0, parseInt(player.style.left, 10) - speed)}px`
    }
    requestAnimationFrame(updatePlayerPosition)
}

const checkCollisionWithPlatform = (ballX, ballY) => {
    const platformTop = window.innerHeight - platformHeight;
    const platformLeft = parseInt(player.style.left, 10);
    const platformRight = platformLeft + platformWidth;

    const ballDiameter = 20;
    const ballBottom = ballY + ballDiameter;

    const yCollision = ballBottom >= platformTop; 
    const xCollision = ballX + ballDiameter >= platformLeft && ballX <= platformRight;

    return yCollision && xCollision;
}

updatePlayerPosition()

export { checkCollisionWithPlatform, platformHeight }