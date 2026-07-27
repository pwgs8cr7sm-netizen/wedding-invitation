const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");

const doors = document.getElementById("doors");
const leftDoor = document.querySelector(".left");
const rightDoor = document.querySelector(".right");

const invitation = document.getElementById("invitation");

// إعداد مشهد Three.js ثلاثي الأبعاد
let scene, camera, renderer, composer, ringMesh, diamondMesh;
let isAnimationStarted = false;
let clock = new THREE.Clock();

function initThreeScene() {
    const container = document.getElementById("three-canvas-container");
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // الإضاءة لتعكس الذهب والألماس
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 3, 50);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 5);
    spotLight.position.set(0, 10, 5);
    scene.add(spotLight);

    // تصميم الخاتم الذهبي والماسة برمجياً
    const ringGroup = new THREE.Group();

    // حلقة الذهب
    const ringGeo = new THREE.TorusGeometry(1, 0.15, 32, 100);
    const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1.0,
        roughness: 0.1,
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringGroup.add(ringMesh);

    // فصوص الألماس البراقة
    const diamondGeo = new THREE.OctahedronGeometry(0.3, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0,
        transmission: 0.9,
        ior: 2.4,
        transparent: true,
        opacity: 0.95
    });
    diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.y = 1;
    ringGroup.add(diamondMesh);

    scene.add(ringGroup);

    // إعداد تأثير الـ Bloom للتوهج الإشعاعي
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // حلقة التحديث المستمرة للمشهد
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        if (isAnimationStarted) {
            ringGroup.rotation.y += 0.02;
            ringGroup.rotation.x += 0.01;
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 4, 0.05);
        } else {
            ringGroup.rotation.y = elapsedTime * 0.5;
        }

        composer.render();
    }
    animate();
}

// تشغيل الأحداث عند النقر على زر فتح الدعوة
startBtn.onclick = () => {
    loader.style.display = "none";
    giftScene.style.display = "block";
    
    // بدء تهيئة الـ 3D وتشغيل المؤثرات
    initThreeScene();
    isAnimationStarted = true;

    // تشغيل الصوت
    const audio = new Audio("assets/music/open.mp3");
    audio.play().catch(e => console.log("Audio autoplay restricted"));

    // إظهار أسماء عبدالله وعذراء من الضوء المتوهج
    setTimeout(() => {
        const glowPopup = document.getElementById("names-glow-popup");
        glowPopup.style.opacity = "1";
        glowPopup.style.transform = "translate(-50%, -50%) scale(1.1)";
    }, 1500);

    // الانتقال للأبواب والموقع بعد انتهاء عرض الـ 3D
    setTimeout(() => {
        giftScene.style.display = "none";
        doors.style.display = "block";
    }, 4200);

    setTimeout(() => {
        leftDoor.classList.add("openLeft");
        rightDoor.classList.add("openRight");
    }, 4500);

    setTimeout(() => {
        doors.style.display = "none";
        invitation.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 6500);
};

// =======================
// Countdown
// =======================
const target = new Date("September 19, 2026 16:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if(document.getElementById("days")) {
        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;
    }
}, 1000);
