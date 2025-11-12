let scene, camera, renderer, player, coins = [], obstacles = [];
let score = 0, totalCoins = 10;
let startTime, gameActive = true;
let velocity = new THREE.Vector3();
let keys = {};

const canvas = document.getElementById('gameCanvas');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const finalTimeDisplay = document.getElementById('finalTime');
const restartBtn = document.getElementById('restartBtn');

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x87ceeb, 1, 100);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 20);
    camera.lookAt(0, 0, 0);
    
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87ceeb);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2ecc71,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    const grid = new THREE.GridHelper(100, 50, 0x27ae60, 0x34a65f);
    grid.position.y = 0.01;
    scene.add(grid);
    
    const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
    const playerMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3498db,
        roughness: 0.3,
        metalness: 0.7
    });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1, 0);
    player.castShadow = true;
    scene.add(player);
    
    createCoins();
    createObstacles();
    
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
    document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
    restartBtn.addEventListener('click', restartGame);
    
    startTime = Date.now();
    animate();
}

function createCoins() {
    const coinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const coinMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffd700,
        roughness: 0.2,
        metalness: 0.8,
        emissive: 0xffaa00,
        emissiveIntensity: 0.3
    });
    
    const positions = [
        [8, 1, 8], [-8, 1, 8], [8, 1, -8], [-8, 1, -8],
        [0, 1, 12], [12, 1, 0], [0, 1, -12], [-12, 1, 0],
        [6, 1, -6], [-6, 1, 6]
    ];
    
    positions.forEach(pos => {
        const coin = new THREE.Mesh(coinGeometry, coinMaterial);
        coin.position.set(pos[0], pos[1], pos[2]);
        coin.castShadow = true;
        coin.userData.collected = false;
        coins.push(coin);
        scene.add(coin);
    });
}

function createObstacles() {
    const obstacleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xe74c3c,
        roughness: 0.7,
        metalness: 0.3
    });
    
    const obstaclePositions = [
        [4, 1, 0], [-4, 1, 0], [0, 1, 4], [0, 1, -4],
        [6, 1, 6], [-6, 1, -6]
    ];
    
    obstaclePositions.forEach(pos => {
        const obstacleGeometry = new THREE.BoxGeometry(2, 2, 2);
        const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        obstacle.position.set(pos[0], pos[1], pos[2]);
        obstacle.castShadow = true;
        obstacles.push(obstacle);
        scene.add(obstacle);
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    if (gameActive) {
        updatePlayer();
        updateCoins();
        updateTimer();
        checkCollisions();
    }
    
    renderer.render(scene, camera);
}

function updatePlayer() {
    const speed = 0.15;
    const friction = 0.92;
    
    if (keys['w'] || keys['arrowup']) {
        velocity.z -= speed;
    }
    if (keys['s'] || keys['arrowdown']) {
        velocity.z += speed;
    }
    if (keys['a'] || keys['arrowleft']) {
        velocity.x -= speed;
    }
    if (keys['d'] || keys['arrowright']) {
        velocity.x += speed;
    }
    
    velocity.multiplyScalar(friction);
    
    player.position.x += velocity.x;
    player.position.z += velocity.z;
    
    const maxDistance = 45;
    player.position.x = Math.max(-maxDistance, Math.min(maxDistance, player.position.x));
    player.position.z = Math.max(-maxDistance, Math.min(maxDistance, player.position.z));
    
    player.rotation.x += velocity.z * 0.1;
    player.rotation.z -= velocity.x * 0.1;
    
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 20;
    camera.lookAt(player.position.x, 0, player.position.z);
}

function updateCoins() {
    coins.forEach(coin => {
        if (!coin.userData.collected) {
            coin.rotation.y += 0.03;
            coin.position.y = 1 + Math.sin(Date.now() * 0.002 + coin.position.x) * 0.2;
        }
    });
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Czas: ${elapsed}s`;
}

function checkCollisions() {
    coins.forEach(coin => {
        if (!coin.userData.collected) {
            const distance = player.position.distanceTo(coin.position);
            if (distance < 1.5) {
                coin.userData.collected = true;
                scene.remove(coin);
                score++;
                scoreDisplay.textContent = `Monety: ${score}/${totalCoins}`;
                
                if (score >= totalCoins) {
                    endGame();
                }
            }
        }
    });
    
    obstacles.forEach(obstacle => {
        const distance = player.position.distanceTo(obstacle.position);
        if (distance < 2) {
            const pushDirection = new THREE.Vector3()
                .subVectors(player.position, obstacle.position)
                .normalize()
                .multiplyScalar(0.3);
            velocity.add(pushDirection);
        }
    });
}

function endGame() {
    gameActive = false;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    finalTimeDisplay.textContent = `Czas: ${elapsed}s`;
    gameOverScreen.style.display = 'block';
}

function restartGame() {
    score = 0;
    gameActive = true;
    velocity.set(0, 0, 0);
    player.position.set(0, 1, 0);
    player.rotation.set(0, 0, 0);
    
    coins.forEach(coin => scene.remove(coin));
    coins = [];
    
    createCoins();
    
    scoreDisplay.textContent = `Monety: 0/${totalCoins}`;
    gameOverScreen.style.display = 'none';
    startTime = Date.now();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
