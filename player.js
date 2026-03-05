const video=document.getElementById("video");
const loader=document.getElementById("loader");
const errorBox=document.getElementById("");
const playBtn=document.getElementById("play");
const progress=document.getElementById("progress");
const volume=document.getElementById("volume");
const time=document.getElementById("time");
const fullscreenBtn=document.getElementById("fullscreen");

const hlsLink=HLS_LINK;

if(Hls.isSupported()){
  const hls=new Hls();
  hls.loadSource(hlsLink);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED,()=>{loader.style.display="none";});
  hls.on(Hls.Events.ERROR,()=>{loader.style.display="none";errorBox.style.display="flex";});
}else if(video.canPlayType("application/vnd.apple.mpegurl")){
  video.src=hlsLink;
}else{
  errorBox.style.display="flex";
}

playBtn.onclick=()=>{if(video.paused){video.play();playBtn.textContent="⏸";}else{video.pause();playBtn.textContent="▶";}};
video.ontimeupdate=()=>{
  progress.value=(video.currentTime/video.duration)*100;
  time.textContent=format(video.currentTime)+" / "+format(video.duration);
};
progress.oninput=()=>{video.currentTime=(progress.value/100)*video.duration;};
volume.oninput=()=>{video.volume=volume.value;};
fullscreenBtn.onclick=()=>{if(video.requestFullscreen)video.requestFullscreen();};

function format(sec){
  if(isNaN(sec))return"00:00";
  const m=Math.floor(sec/60);
  const s=Math.floor(sec%60);
  return `${m<10?"0":""}${m}:${s<10?"0":""}${s}`;
}

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth;
canvas.height=innerHeight;
let particles=[];
for(let i=0;i<80;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-.5)*0.5,dy:(Math.random()-.5)*0.5});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;
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