let currentHLS = null;
let attempts = 0;
const maxAttempts = 3;
let locked = false;

const passwords = {
  1:"123",2:"123",3:"123",4:"123",5:"123",
  6:"123",7:"123",8:"123",9:"123",10:"123"
};

const links = {
  1:"video1.html",2:"video2.html",3:"video3.html",4:"video4.html",5:"video5.html",
  6:"video6.html",7:"video7.html",8:"video8.html",9:"video9.html",10:"video10.html"
};

function openModal(hls){
  if(locked) return alert("Bloqueado temporariamente!");
  currentHLS=hls;
  document.getElementById("modal").style.display="flex";
  document.getElementById("error").textContent="";
  document.getElementById("tries").textContent=`Tentativas: ${attempts}/${maxAttempts}`;
}

function checkPassword(){
  if(locked) return;

  const input=document.getElementById("passwordInput").value;
  const loader=document.getElementById("loader");

  if(input===passwords[currentHLS]){
    loader.style.display="block";
    document.getElementById("modalTitle").textContent="Desbloqueando...";
    setTimeout(()=>{
      window.location.href=links[currentHLS];
    },1500);
  }else{
    attempts++;
    document.getElementById("error").textContent="Senha incorreta!";
    document.getElementById("tries").textContent=`Tentativas: ${attempts}/${maxAttempts}`;

    if(attempts>=maxAttempts){
      locked=true;
      document.getElementById("error").textContent="Bloqueado por 30s!";
      setTimeout(()=>{
        attempts=0;
        locked=false;
      },30000);
    }
  }
}

/* PARTÍCULAS */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;

let particles=[];
for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2+1,
    dx:(Math.random()-.5)*0.5,
    dy:(Math.random()-.5)*0.5
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx;
    p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,.6)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();