function validar(id, titulo, skill, categoria, descricao, youtube) {
  let alertTitulo = document.getElementById("alertTitulo");
  let alertSkill = document.getElementById("alertSkill");
  let alertCategoria = document.getElementById("alertCategoria");
  let alertDescricao = document.getElementById("alertDescricao");
  let alertYoutube = document.getElementById("alertYoutube");
  let tituloVerificado = "";
  let skillVerificado = "";
  let categoriaVerificado = "";
  let descricaoVerificado = "";
  let youtubeVerificado = "";
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  if (titulo.length >= 8 && titulo.length <= 64) {
    tituloVerificado = true;
  } else {
    alertTitulo.innerHTML = "Titulo deve conter entre 8 à 64 caracteres";
  }

  if (skill.length >= 3 && skill.length <= 32) {
    skillVerificado = true;
  } else {
    alertSkill.innerHTML = "Linguagem deve conter entre 8 à 32 caracteres";
  }
  if (categoria == 0) {
    alertCategoria.innerHTML = "Preencha o campo corretamente";
  } else {
    categoriaVerificado = true;
  }
  if (descricao.length > 8 && descricao.length < 1024) {
    descricaoVerificado = true;
  } else {
    alertDescricao.innerHTML =
      "Descricao deve conter entre 8 à 1024 caracteres";
  }

  if (youtube) {
    if (youtube.match(p)) {
      youtubeVerificado = true;
    } else {
      alertYoutube.innerHTML = "Digite um link válido";
    }
  } else {
    youtubeVerificado = true;
  }

  if (
    id &&
    tituloVerificado &&
    skillVerificado &&
    categoriaVerificado &&
    descricaoVerificado &&
    youtubeVerificado
  ) {
    salvar_edicao(id, titulo, skill, categoria, descricao, youtube);
  } else if (
    tituloVerificado &&
    skillVerificado &&
    categoriaVerificado &&
    descricaoVerificado &&
    youtubeVerificado
  ) {
    salvar_localstorage(titulo, skill, categoria, descricao, youtube);
  }
}

function youtube(obj) {
  console.log(obj);
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
  window.alert(`Item ${titulo} Editado`)
  location.reload();
}

function editar(obj) {
  const data = JSON.parse(localStorage.getItem("dicas")).find(
    (item) => item.id == obj.id
  );
  preenche_form(data);
}

function apagar(obj) {
  let confirmacao = confirm("Deseja apagar ?");
  if (confirmacao === true) {
    const data = JSON.parse(localStorage.getItem("dicas")).filter(
      (item) => item.id !== obj.id
    );
    localStorage.setItem("dicas", JSON.stringify(data));
    window.alert(`Item apagado`)
    location.reload();
  }
  else{

  }

}

function criar_cards() {
  let dicas_obj = JSON.parse(localStorage.getItem("dicas"));

  dicas_obj.map((dica) => {
    let conteudo = document.createElement("div");
    conteudo.setAttribute("id", "column");
    conteudo.setAttribute("value", categoria);

    document.getElementById("cards").appendChild(conteudo);
    if (dica.youtube) {
      conteudo.innerHTML = `<div id="card" class="${dica.id} titulocard" > <h1 >${dica.titulo}</h1>  <p><b>Linguagem/Skill:</b> ${dica.skill}</br> <b class="${dica.categoria}">Categoria:</b> ${dica.categoria} <br> <br> ${dica.descricao}</p> <div class="btnCard"><button id="${dica.youtube}" class="youtube" onclick="youtube(id)"><i class="fa-brands fa-youtube youtubeH"></i></button> <button id="${dica.id}" class="editar" onclick="editar(this)"><i class="fa-solid fa-pen-to-square"></i></button> <button class="apagar" id="${dica.id}"  onclick="apagar(this)"><i class="fa-solid fa-trash"></i></button></div></div> `;
    } else {
      conteudo.innerHTML = `<div id="card" class="${dica.id} titulocard" > <h1 >${dica.titulo}</h1>  <p><b>Linguagem/Skill:</b> ${dica.skill}  <br><b class="${dica.categoria}">Categoria:</b> ${dica.categoria} <br> <br>${dica.descricao}</p> <div class="btnCard"><div class="btnCard"><button id="${dica.id}" class="editar" onclick="editar(this)"><i class="fa-solid fa-pen-to-square"></i></button><button class="apagar" id="${dica.id}"  onclick="apagar(this)"><i class="fa-solid fa-trash"></i></button> </div></div> `;
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
  window.alert(`Item ${titulo} adcionado`)
  location.reload();
}

function input() {
  let id = document.getElementById("id").value;
  let titulo = document.getElementById("titulo").value;
  let skill = document.getElementById("skill").value;
  let categoria = document.getElementById("categoria").value;
  let descricao = document.getElementById("descricao").value;
  let youtube = document.getElementById("youtube").value;
  validar(id, titulo, skill, categoria, descricao, youtube);
}

window.onload = criar_cards();
window.onload = contar();
window.onload = pesquisar();
