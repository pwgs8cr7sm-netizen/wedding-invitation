const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");

const doors = document.getElementById("doors");
const leftDoor = document.querySelector(".left");
const rightDoor = document.querySelector(".right");

const invitation = document.getElementById("invitation");

// تشغيل الأحداث عند الضغط على زر فتح الدعوة
if (startBtn) {
    startBtn.onclick = () => {
        loader.style.display = "none";
        giftScene.style.display = "flex";

        // تشغيل الصوت (إذا كان متوفراً)
        const audio = new Audio("assets/music/open.mp3");
        audio.play().catch(e => console.log("Audio autoplay restricted"));

        // انتقال الشاشات بتوقيت متناسق (ظهور مشهد العروسين والورود ثم فتح الأبواب ثم الدعوة)
        setTimeout(() => {
            giftScene.style.display = "none";
            doors.style.display = "block";
        }, 4000);

        setTimeout(() => {
            leftDoor.classList.add("openLeft");
            rightDoor.classList.add("openRight");
        }, 4300);

        setTimeout(() => {
            doors.style.display = "none";
            invitation.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 6300);
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
