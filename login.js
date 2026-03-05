function handleLogin(){
  const input=document.getElementById("password").value;
  let saved=localStorage.getItem("mainPassword");

  if(!saved){
    localStorage.setItem("mainPassword",input);
    sessionStorage.setItem("logged","1");
    location.href="hls.html";
  }else{
    if(input===saved){
      sessionStorage.setItem("logged","1");
      location.href="hls.html";
    }else alert("Senha errada!");
  }
}