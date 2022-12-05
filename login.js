isUserLogged();

async function isUserLogged(){
    if((await verifyLogin()) != 401){
        window.location.replace("./timeline.html");      
    }

}

async function login(){
    let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
    "email":  document.querySelector("#usuario").value,
    "senha":  document.querySelector("#senha").value
    });

    let response = await fetch("http://localhost:3005/user/login", { 
    method: "POST",
    body: bodyContent,
    headers: headersList
    });

    if(response.status != (404 || 401)){ //SE O LOGIN FOR VÁLIDO
        let data = await response.text();
        data = data.substring(1, data.length - 1);
        console.log(JSON.stringify({
            "token": data
        }));
    
        localStorage.setItem("token", data);
    
        await new Promise(r => setTimeout(r, 2000));
        window.location.replace("./timeline.html");
    }

    else{  //SE LOGIN FOR INVALIDO IMPRIME UMA MENSAGEM NO CONSOLE
        let data = await response.text();
        data = JSON.parse(data);
        console.log(data.mensagem);
    }
}

async function verifyLogin(){
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "token": localStorage.getItem("token")
   });
   
   let response = await fetch("http://localhost:3005/user/get", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = response.status;
   
   return data;
}
