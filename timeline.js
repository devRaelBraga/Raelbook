async function inicio(){
    if((await verifyLogin()) != 401){  //VERIFICA SE O USUARIO ESTÁ LOGADO COM UM TOKEN VÁLIDO
      id_autor = arguments.length > 0 ? arguments[0] : "c9315519-6ffc-4e82-b1bc-e55e784e15da";
      let headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Content-Type": "application/json"
      }
  
      let bodyContent = JSON.stringify({
          "token": localStorage.getItem("token")
      });
  
      let response = await fetch("http://localhost:3005/post/get", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
      });
  
      let data = await response.json();
  
      //Criar os posts pegando do banco de dados
      data.reverse().forEach(element => {
          criarPost(element.foto, element.texto, element.id_autor, element.id)
      });

      post();
  
      nsei();
    }

    else{  //SE O USUARIO NAO ESTIVER LOGADO, REDIRECIONA PARA A PÁGINA DE LOGIN
        await new Promise(r => setTimeout(r, 500));
        window.location.replace("./login.html");
    }

}

async function criarPost(foto, texto, id_autor, idpost){
    // CRIAR A DIV DO   POST
    var container = document.querySelector(".container");
    var divpai = document.createElement("div");
    divpai.classList.add("post");
    
    // DIV DA FOTO DO PERFIL
    var divpfp = document.createElement("div");
    divpfp.classList.add("pfp");
    divpai.appendChild(divpfp);

    //DIV DO TEXTO DO POST
    var divtexto = document.createElement("div");
    divtexto.classList.add("post-text");
    divpai.appendChild(divtexto);
    
    // DIV DA IMAGEM DO POST
    var divimg = document.createElement("div");
    divimg.classList.add("post-img");
    divpai.appendChild(divimg);

    // DIV DA PARTE DE LIKE E COMENTÁRIO
    var divreactions = document.createElement("div");
    divreactions.classList.add("post-reactions");
    divpai.appendChild(divreactions);
    
    //ELEMENTO TEXTO
    var text = document.createElement("p");
    text.innerHTML = texto;
    divtexto.appendChild(text);
    
    //ELEMENTO IMAGEM
    var img = document.createElement("img");
    img.src = foto;
    divimg.appendChild(img);
    

    // ELEMENTO FOTO DE PERFIL
    var pfp = document.createElement("img");
    pfp.src = await getPhoto(id_autor);
    divpfp.appendChild(pfp);
    
    
    // DIV INFO DO PERFIL
    var divperfil = document.createElement("div");
    divperfil.classList.add("info-post");
    divpfp.appendChild(divperfil);


    // ELEMENTO DO NOME DO PERFIL
    var pfpname = document.createElement("p");
    pfpname.innerHTML = await getName(id_autor);
    divperfil.appendChild(pfpname);

    // ELEMENTO DATA DO POST
    var postdate = document.createElement("p");
    postdate.classList.add("postdata");
    postdate.innerHTML = await getDate(idpost);
    divperfil.appendChild(postdate);

    
    // DIV INTERNA DO LIKE
    var divlike = document.createElement("div");
    divlike.classList.add("post-like");
    divreactions.appendChild(divlike);


    // ELEMENTO LIKE
    var like = document.createElement("img");
    like.src = "./img/like.png";
    divlike.appendChild(like);

    // ELEMENTO DO TEXTO DO LIKE
    var liketext = document.createElement("p");
    liketext.innerHTML = "Curtir";
    divlike.appendChild(liketext);

    // DIV INTERNA DO COMENTARIO
    var divcomment = document.createElement("div");
    divcomment.classList.add("post-comment");
    divreactions.appendChild(divcomment);
    
    // ELEMENTO DO COMENTARIO
    var comment = document.createElement("img");
    comment.src = "./img/comment.png";
    divcomment.appendChild(comment);

    // ELEMENTO DO TEXTO DO COMENTARIO
    var liketext = document.createElement("p");
    liketext.innerHTML = "Comentar";
    divcomment.appendChild(liketext);


    divpai.appendChild(divreactions);
    container.appendChild(divpai);
}

async function getPhoto(id){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "id": id
       });
       
       let response = await fetch("http://localhost:3005/user/getphoto", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       data = data.substring(1, data.length - 1);

       return data
}

async function getName(id){
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "id": id
       });
       
       let response = await fetch("http://localhost:3005/user/getname", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       data = data.substring(1, data.length - 1);

       return data
}

async function getDate(id){  //RETORNA A DATA QUE O POST FOI CRIADO
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }
    
    let bodyContent = JSON.stringify({
      "id": id
    });
    
    let response = await fetch("http://localhost:3005/post/getdate", { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    
    let data = await response.text();
    data = data.substring(1, data.length - 1);

    
    return data;
}

async function getPfp(){ //RETORNA UM JSON COM FOTO E NOME
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
   
   let data = await response.text();
   data = await JSON.parse(data);

   return JSON.stringify({
    "foto": data.foto,
    "name": data.name
  });
}

async function nsei(){
    const img = document.querySelector(".pfp-img");
    const name = document.querySelector(".pfp-name");
    const dados = await JSON.parse(await getPfp());

    img.src = dados.foto;
    name.innerHTML = dados.name
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

async function post(){
    var data = JSON.parse(await getPfp());

    document.querySelector("#userphoto").src = data.foto
    document.querySelector("#username").innerHTML = data.name

}

async function postar(){
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "token": localStorage.getItem("token"),
     "foto": document.querySelector(".linkfoto").value,
     "texto": document.querySelector("#mensagem-post").value
   });
   
   let response = await fetch("http://localhost:3005/post/create", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.text();
   console.log(data);
}

async function logout(){
  localStorage.removeItem("token")
  await new Promise(r => setTimeout(r, 1000));
  window.location.replace("./login.html");
}