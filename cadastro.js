async function cadastro(){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "name": document.querySelector("#nome").value,
         "senha": document.querySelector("#senha").value,
         "email": document.querySelector("#email").value,
         "foto": document.querySelector("#foto").value,
         "nascimento": document.querySelector("#nascimento").value
       });
       
       let response = await fetch("http://localhost:3005/user/create", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       await new Promise(r => setTimeout(r, 2000));
        window.location.replace("./login.html");

}
