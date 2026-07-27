const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");
const invitation = document.getElementById("invitation");
const rosesContainer = document.getElementById("rosesContainer");

// توليد ورود بيضاء متحركة وناعمة في الخلفية للمشهد الكارتوني
function createWhiteRoses() {
    if (!rosesContainer) return;
    for (let i = 0; i < 30; i++) {
        const rose = document.createElement("div");
        rose.classList.add("floating-rose");
        
        // أحجام عشوائية لأشكال الورود/البتلات الناعمة
        const size = Math.random() * 18 + 10;
        rose.style.width = `${size}px`;
        rose.style.height = `${size}px`;
        
        rose.style.left = `${Math.random() * 100}vw`;
        rose.style.animationDuration = `${Math.random() * 4 + 3}s`;
        rose.style.animationDelay = `${Math.random() * 5}s`;
        
        rosesContainer.appendChild(rose);
    }
}

// تشغيل الأحداث عند الضغط على زر فتح الدعوة
if (startBtn) {
    startBtn.onclick = () => {
        // إخفاء شاشة الترحيب بتلاشي
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);

        // إظهار المشهد الكارتوني والورود البيضاء بتلاشي ناعم
        giftScene.style.display = "block";
        setTimeout(() => {
            giftScene.style.opacity = "1";
            createWhiteRoses();
        }, 50);

        // تشغيل الصوت (إذا كان متوفراً)
        const audio = new Audio("assets/music/open.mp3");
        audio.play().catch(e => console.log("Audio autoplay restricted"));

        // الانتقال من المشهد الكارتوني إلى تفاصيل الدعوة بالتلاشي بعد عرض المشهد اللطيف
        setTimeout(() => {
            giftScene.style.opacity = "0"; // تلاشي المشهد الكارتوني
            setTimeout(() => {
                giftScene.style.display = "none";
                invitation.style.display = "block";
                setTimeout(() => {
                    invitation.style.opacity = "1"; // ظهور تفاصيل الدعوة بالتلاشي
                }, 50);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 1500);
        }, 5500);
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
