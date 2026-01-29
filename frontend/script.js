const API = "http://localhost:5000";

async function register(){
  const res = await fetch(API + "/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      name: rname.value,
      email: remail.value,
      password: rpass.value
    })
  });
  const data = await res.json();
  msg.innerText = data.msg;
}

async function login(){
  const res = await fetch(API + "/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      email: lemail.value,
      password: lpass.value
    })
  });
  const data = await res.json();
  if(data.token){
    localStorage.setItem("token", data.token);
    msg.innerText = "Login successful!";
  }else{
    msg.innerText = data.msg;
  }
}
