function youtube(obj) {
  console.log(obj)
  var strWindowFeatures =
    "location=yes,height=570,width=520,scrollbars=yes,status=yes";
  var URL = obj + location.href;
  var win = window.open(URL, "_blank", strWindowFeatures);
}

function limpar() {
  document.getElementById("formulario").reset();
}
function pesquisar() {
  var pesquisa = document.getElementById("pesquisa");
  var titulocard = document.getElementsByClassName("titulocard");
  pesquisa.onkeyup = function () {
    var search_value = pesquisa.value.toLowerCase();
    for (var l = 0; l < titulocard.length; l++) {
      if (
        titulocard[l].innerHTML.toLocaleLowerCase().search(search_value) == -1
      ) {
        titulocard[l].style.display = "none";
      } else {
        titulocard[l].style.display = "block";
      }
    }
  };
}

function contar() {
  let FrontEnd = document.querySelectorAll(" .FrontEnd").length;
  let BackEnd = document.querySelectorAll(" .BackEnd").length;
  let FullStack = document.querySelectorAll(" .FullStack").length;
  let Soft = document.querySelectorAll(" .Soft").length;

  let front = document.querySelector(".front");
  front.innerHTML = FrontEnd;

  let back = document.querySelector(".back");
  back.innerHTML = BackEnd;

  let full = document.querySelector(".full");
  full.innerHTML = FullStack;

  let soft = document.querySelector(".soft");
  soft.innerHTML = Soft;

  let total = FrontEnd + BackEnd + FullStack + Soft;
  let totalexibir = document.querySelector(".total");
  totalexibir.innerHTML = total;
}

function prencher() {
  document.getElementById("titulo").value = "GRID vs Flex-box";
  document.getElementById("skill").value = "CSS";
  document.getElementById("categoria").value = "FrontEnd";
  document.getElementById("descricao").value =
    "Se você está usando mais de um container flex para organizar elementos em um layout, provavelmente um deles deveria ser grid. Se você precisa aplicar diversas propriedades nos elementos filhos para ter maior controle do layout, você provavelmente deveria estar fazendo isso com grid.";
  document.getElementById("youtube").value =
    "https://www.youtube.com/watch?v=3elGSZSWTbM&ab_channel=KevinPowell";
}

function preenche_form(data) {
  document.getElementById("id").value = data.id;
  document.getElementById("titulo").value = data.titulo;
  document.getElementById("skill").value = data.skill;
  document.getElementById("categoria").value = data.categoria;
  document.getElementById("descricao").value = data.descricao;
  document.getElementById("youtube").value = data.youtube;
}

function salvar_edicao(id, titulo, skill, categoria, descricao, youtube) {
  let array_editado = { id, titulo, skill, categoria, descricao, youtube };
  const data_full = JSON.parse(localStorage.getItem("dicas"));
  const posicao = data_full.findIndex((item) => item.id == id);
  data_full.splice(posicao, 1, array_editado);
  localStorage.setItem("dicas", JSON.stringify(data_full));
}

function editar(obj) {
  const data = JSON.parse(localStorage.getItem("dicas")).find(
    (item) => item.id == obj.id
  );
  preenche_form(data);
}

function apagar(obj) {
  console.log(obj.id);
  const data = JSON.parse(localStorage.getItem("dicas")).filter(
    (item) => item.id !== obj.id
  );
  localStorage.setItem("dicas", JSON.stringify(data));
  location.reload();
}

function criar_cards() {
  let dicas_obj = JSON.parse(localStorage.getItem("dicas"));

  dicas_obj.map((dica) => {
    let conteudo = document.createElement("div");
    conteudo.setAttribute("id", "column");
    conteudo.setAttribute("value", categoria);

    document.getElementById("cards").appendChild(conteudo);
    if (dica.youtube) {
      conteudo.innerHTML = `<div id="card" class="${dica.id} titulocard" > <h1 >${dica.titulo}</h1>  <p><b>Linguagem/Skill:</b> ${dica.skill}  <br><b class="${dica.categoria}">Categoria:</b> ${dica.categoria} <br> ${dica.descricao}</p> <div class="btnCard"><button class="apagar" id="${dica.id}"  onclick="apagar(this)"><i class="fa-solid fa-trash"></i></button> <button id="${dica.id}" class="editar" onclick="editar(this)"><i class="fa-solid fa-pen-to-square"></i></button> <button id="${dica.youtube}" class="youtube" onclick="youtube(id)"><i class="fa-brands fa-youtube youtubeH"></i></button></div></div> `;
    } else {
      conteudo.innerHTML = `<div id="card" class="${dica.id} titulocard" > <h1 >${dica.titulo}</h1>  <p><b>Linguagem/Skill:</b> ${dica.skill}  <br><b class="${dica.categoria}">Categoria:</b> ${dica.categoria} <br> ${dica.descricao}</p> <div class="btnCard"><div class="btnCard"><button class="apagar" id="${dica.id}"  onclick="apagar(this)"><i class="fa-solid fa-trash"></i></button> <button id="${dica.id}" class="editar" onclick="editar(this)"><i class="fa-solid fa-pen-to-square"></i></button></div></div> `;
    }
  });
}

function salvar_localstorage(titulo, skill, categoria, descricao, youtube) {
  var dicas = JSON.parse(localStorage.getItem("dicas") || "[]");
  var id = "id" + new Date().getTime();
  dicas.push({
    id: id,
    titulo: titulo,
    skill: skill,
    categoria: categoria,
    descricao: descricao,
    youtube: youtube,
  });
  localStorage.setItem("dicas", JSON.stringify(dicas));
}

function input() {
  let id = document.getElementById("id").value;
  let titulo = document.getElementById("titulo").value;
  let skill = document.getElementById("skill").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let youtube = document.getElementById("youtube").value;

  if (id == "") {
    salvar_localstorage(titulo, skill, categoria, descricao, youtube);
  } else {
    salvar_edicao(id, titulo, skill, categoria, descricao, youtube);
  }
}

window.onload = criar_cards();
window.onload = contar();
window.onload = pesquisar();
