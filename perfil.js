CarregarPerfil()
async function CarregarPerfil(){
    var token = await localStorage.getItem('token');

    let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
    "token": token
    });

    let response = await fetch("http://localhost:3005/user/get", { 
    method: "POST",
    body: bodyContent,
    headers: headersList
    });

    if(response.status != 401){
        let data = await response.text();
        //data = await JSON.stringify(data);
        data = await  JSON.parse(data)
    
    
        let nome = document.querySelector("#nome");
        let foto = document.querySelector("#foto");
        let email = document.querySelector("#email");
        let id = document.querySelector("#id");
    
        nome.innerHTML = data.name;
        foto.src = data.foto;
        email.innerHTML = data.email;
        id.innerHTML = data.nascimento;
    }

    else{
        await new Promise(r => setTimeout(r, 100));
        window.location.replace("./login.html");
    }

}

async function logout(){
    localStorage.removeItem("token");
    await new Promise(r => setTimeout(r, 2000));
    window.location.replace("./login.html");
}
