const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");

const doors = document.getElementById("doors");
const leftDoor = document.querySelector(".left");
const rightDoor = document.querySelector(".right");

const invitation = document.getElementById("invitation");

// إعداد مشهد الـ 3D (أيدي العروسين والخاتم المتحرك والورود البيضاء المحيطة)
let scene, camera, renderer, ringMesh, handGroup;

function init3DScene() {
    const container = document.getElementById("three-canvas-container");
    if (!container) return;
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // إضاءة ناعمة ورومانسية
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffd700, 3, 20);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // مجموعة الأيدي والخاتم
    handGroup = new THREE.Group();

    // 1. يد العريس (إصبع حامل الخاتم مبسط بـ 3D Cylinders)
    const groomFingerGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.5, 32);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const groomFinger = new THREE.Mesh(groomFingerGeo, skinMat);
    groomFinger.rotation.z = Math.PI / 4;
    groomFinger.position.set(-0.6, 0.2, 0);
    handGroup.add(groomFinger);

    // 2. يد العروس
    const brideFingerGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
    const brideFinger = new THREE.Mesh(brideFingerGeo, skinMat);
    brideFinger.rotation.z = -Math.PI / 4;
    brideFinger.position.set(0.6, 0.2, 0);
    handGroup.add(brideFinger);

    // 3. خاتم الزفاف الذهبي مع فص ألماس يتحرك ويلبس بالإصبع
    const ringGeo = new THREE.TorusGeometry(0.18, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-1.5, 1.2, 0); // يبدأ الخاتم متحركاً من الأعلى لكي يلبس
    ringMesh.rotation.x = Math.PI / 2;
    handGroup.add(ringMesh);

    scene.add(handGroup);

    // خلق ورود بيضاء محيطة بالمشهد (عن طريق كرات بيضاء ناعمة متناثرة بشكل جمالي)
    const rosesGroup = new THREE.Group();
    const roseGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const roseMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    
    for (let i = 0; i < 20; i++) {
        const rose = new THREE.Mesh(roseGeo, roseMat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 2.5 + Math.random() * 1.5;
        
        rose.position.x = radius * Math.sin(phi) * Math.cos(theta);
        rose.position.y = radius * Math.sin(phi) * Math.sin(theta);
        rose.position.z = radius * Math.cos(phi) - 1;
        rosesGroup.add(rose);
    }
    scene.add(rosesGroup);

    // حركة الرسوم المتحركة (Animation Loop)
    function animate() {
        requestAnimationFrame(animate);

        // حركة لبس الخاتم تدريجياً حتى يستقر في الإصبع
        if (ringMesh.position.x < 0.55) {
            ringMesh.position.x += 0.015;
            ringMesh.position.y -= 0.012;
        } else {
            // دوران خفيف وجميل بعد استقرار الخاتم
            handGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
        }

        renderer.render(scene, camera);
    }
    animate();
}

// تشغيل الأحداث عند الضغط على زر فتح الدعوة
if (startBtn) {
    startBtn.onclick = () => {
        loader.style.display = "none";
        giftScene.style.display = "block";

        // تشغيل مشهد الـ 3D
        init3DScene();

        // تشغيل الصوت (إذا كان متوفراً)
        const audio = new Audio("assets/music/open.mp3");
        audio.play().catch(e => console.log("Audio autoplay restricted"));

        // انتقال الشاشات بتوقيت متناسق (عرض مشهد لبس الخاتم 3D ثم فتح الأبواب ثم الدعوة)
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
