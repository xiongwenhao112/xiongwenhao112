// 获取Canvas元素和上下文
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const modeSelect = document.getElementById('mode-select');
const confirmButton = document.getElementById('confirm-button');

// 定义游戏区域的大小和格子大小
const gridSize = 20;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

// 定义蛇的初始位置和速度
let snake = [{x: 10, y: 10}];
let dx = 0;
let dy = 0;

// 定义食物的初始位置
let food = {x: 15, y: 15};

// 定义得分
let score = 0;

// 定义游戏速度
let gameSpeed = 100;

// 绘制蛇
function drawSnake() {
    ctx.fillStyle = '#00FF00';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// 更新游戏状态
function update() {
    // 移动蛇的头部
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = `得分: ${score}`;
        generateFood();
    } else {
        snake.pop();
    }

    // 检查是否碰撞到墙壁或自己的身体
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // 清除画布并重新绘制
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

// 生成食物
function generateFood() {
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };
    // 确保食物不在蛇的身体上
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        generateFood();
    }
}

// 游戏结束
function gameOver() {
    alert('游戏结束！');
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    document.getElementById('score').innerText = `得分: ${score}`;
    generateFood();
    restartButton.style.display = 'block'; // 显示重新开始按钮
}

// 处理用户输入
document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'ArrowUp' && dy !== 1) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy !== -1) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx !== 1) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

// 重新开始游戏
restartButton.addEventListener('click', () => {
    restartButton.style.display = 'none'; // 隐藏重新开始按钮
    init();
});

// 初始化游戏
function init() {
    generateFood();
    setInterval(update, 100); // 调整游戏速度
}

init();
