const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");

const doors = document.getElementById("doors");
const leftDoor = document.querySelector(".left");
const rightDoor = document.querySelector(".right");

const invitation = document.getElementById("invitation");

// إعداد مشهد Three.js لعلبة الخاتم ثلاثية الأبعاد
let scene, camera, renderer, composer, lidMesh, ringGroup;
let isAnimationStarted = false;
let openProgress = 0;
let clock = new THREE.Clock();

function initThreeScene() {
    const container = document.getElementById("three-canvas-container");
    if (!container) return;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // إضاءة سينمائية
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 4, 30);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // مجموعة العلبة والخاتم
    const masterGroup = new THREE.Group();

    // 1. قاعدة العلبة
    const boxGeo = new THREE.BoxGeometry(2, 1, 2);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x990011, roughness: 0.3, metalness: 0.2 });
    const boxBase = new THREE.Mesh(boxGeo, boxMat);
    masterGroup.add(boxBase);

    // 2. غطاء العلبة
    const lidGeo = new THREE.BoxGeometry(2.05, 0.2, 2.05);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0xaa0015, roughness: 0.3, metalness: 0.2 });
    lidMesh = new THREE.Mesh(lidGeo, lidMat);
    
    const lidGroup = new THREE.Group();
    lidMesh.position.set(0, 0, 1);
    lidGroup.add(lidMesh);
    lidGroup.position.set(0, 0.5, -1);
    masterGroup.add(lidGroup);

    // 3. الخاتم داخل العلبة
    ringGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.1 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringGroup.add(ringMesh);

    // فص الألماس
    const diamondGeo = new THREE.OctahedronGeometry(0.18, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, metalness: 0.1, roughness: 0, transmission: 0.9, ior: 2.4, transparent: true, opacity: 0.95
    });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.y = 0.5;
    ringGroup.add(diamondMesh);

    ringGroup.position.set(0, 0.2, 0);
    masterGroup.add(ringGroup);

    scene.add(masterGroup);

    // تأثير التوهج
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.85);
    
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    function animate() {
        requestAnimationFrame(animate);

        if (isAnimationStarted) {
            if (openProgress < 1) {
                openProgress += 0.02;
                lidGroup.rotation.x = -Math.PI * 0.7 * openProgress;
            } else {
                if (ringGroup.position.y < 1.2) {
                    ringGroup.position.y += 0.015;
                }
                ringGroup.rotation.y += 0.03;
                camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5, 0.03);
            }
        } else {
            masterGroup.rotation.y = clock.getElapsedTime() * 0.4;
        }

        composer.render();
    }
    animate();
}

// تشغيل الأحداث عند الضغط
if (startBtn) {
    startBtn.onclick = () => {
        loader.style.display = "none";
        giftScene.style.display = "block";
        
        initThreeScene();
        isAnimationStarted = true;

        // تشغيل الصوت (إذا كان متوفراً)
        const audio = new Audio("assets/music/open.mp3");
        audio.play().catch(e => console.log("Audio autoplay restricted"));

        // انتقال الشاشات بتوقيت متناسق
        setTimeout(() => {
            giftScene.style.display = "none";
            doors.style.display = "block";
        }, 4500);

        setTimeout(() => {
            leftDoor.classList.add("openLeft");
            rightDoor.classList.add("openRight");
        }, 4800);

        setTimeout(() => {
            doors.style.display = "none";
            invitation.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 6800);
    };
}

// العداد التنازلي
const target = new Date("September 19, 2026 16:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerHTML = days;
    if (hoursEl) hoursEl.innerHTML = hours;
    if (minutesEl) minutesEl.innerHTML = minutes;
    if (secondsEl) secondsEl.innerHTML = seconds;
}, 1000);
