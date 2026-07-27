const loader = document.getElementById("loader");
const giftScene = document.getElementById("giftScene");
const startBtn = document.getElementById("startBtn");

const lid = document.querySelector(".lid");
const ring = document.getElementById("ring");

const doors = document.getElementById("doors");
const leftDoor = document.querySelector(".left");
const rightDoor = document.querySelector(".right");

const invitation = document.getElementById("invitation");

startBtn.onclick = () => {

loader.style.display = "none";

giftScene.style.display = "flex";

setTimeout(() => {

lid.style.transform = "rotate(-130deg)";

},800);

setTimeout(()=>{

document.querySelector(".glow").style.opacity="1";

document.querySelector(".glow").style.transform=
"translateX(-50%) scale(1.2)";

ring.style.opacity="1";

ring.style.transform=
"translateY(-140px) scale(1.45) rotate(720deg)";

for(let i=0;i<60;i++){

setTimeout(()=>{

const p=document.createElement("div");

p.className="gold-particle";

p.style.left=(window.innerWidth/2+(Math.random()*220-110))+"px";

p.style.top=(window.innerHeight/2+40)+"px";

document.body.appendChild(p);

setTimeout(()=>p.remove(),5000);

},i*45);

}

},1800);
setTimeout(() => {

giftScene.style.display="none";

doors.style.display="block";

},4200);

setTimeout(() => {

leftDoor.classList.add("openLeft");
rightDoor.classList.add("openRight");

},4500);

setTimeout(() => {

doors.style.display="none";

invitation.style.display="block";

window.scrollTo({
top:0,
behavior:"smooth"
});

},6500);

};



// =======================
// Countdown
// =======================

const target = new Date("September 19, 2026 16:00:00").getTime();

setInterval(()=>{

const now = new Date().getTime();

const distance = target - now;

const days = Math.floor(distance/(1000*60*60*24));

const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

const seconds = Math.floor((distance%(1000*60))/1000);

document.getElementById("days").innerHTML=days;
document.getElementById("hours").innerHTML=hours;
document.getElementById("minutes").innerHTML=minutes;
document.getElementById("seconds").innerHTML=seconds;

},1000);




// =======================
// ورود متساقطة
// =======================

function createFlower(){

const flower=document.createElement("div");

flower.innerHTML="🌸";

flower.style.position="fixed";

flower.style.left=Math.random()*100+"vw";

flower.style.top="-50px";

flower.style.fontSize=(20+Math.random()*25)+"px";

flower.style.animation="fall "+(6+Math.random()*6)+"s linear";

flower.style.zIndex="999";

document.body.appendChild(flower);

setTimeout(()=>{

flower.remove();

},12000);

}

setInterval(createFlower,700);



// =======================
// Animation CSS
// =======================

const style=document.createElement("style");

style.innerHTML=`

@keyframes fall{

0%{

transform:translateY(-100px) rotate(0deg);

opacity:1;

}

100%{

transform:translateY(110vh) rotate(360deg);

opacity:0;

}

}

`;

document.head.appendChild(style);




// =======================
// صوت عند فتح الصندوق
// =======================

const audio=new Audio("assets/music/open.mp3");

startBtn.addEventListener("click",()=>{

audio.play();

});
