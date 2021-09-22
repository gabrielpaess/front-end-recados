//
// Script da Pagina Recados
//

var data;
const link = ("https://back-end-recados.herokuapp.com/", "http:localhost:8080");

var userLocalStorage = localStorage.getItem("user");
var user = JSON.parse(userLocalStorage); // Retorna se ja existe

window.addEventListener("load", () => {
  //Todos os elementos do DOM e scripts estão disponiveis
  axios.get(link + "/messages/" + user).then((response) => {
    data = response.data;
    listLoad(data);
    console.log(data);
  });
});

var list = document.getElementById("list");

var alert = document.getElementById("alert");
alert.style.display = "none";

var descricao = document.getElementById("descricao");
var detalhamento = document.getElementById("detalhamento");
var saveEditBtn = document.getElementById("saveEditBtn");
saveEditBtn.style.display = "none";

//função load a lista sempre q necessario
function listLoad() {
  list.innerHTML = "";
  for (let prop in data) {
    list.innerHTML += `<tr>
    <td id="id+${data[prop].uid}"><strong>${parseInt(prop) + 1}</strong></td>
    <td id="title+${data[prop].uid}">${data[prop].title}</td>
    <td class="col-7" id="detail+${data[prop].uid}">${data[prop].detail}</td>
    <td>
      <button onclick="del(this)" id="del+${
        data[prop].uid
      }" type="button" data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-danger">
        Apagar
      </button>
      <button onclick="edit(this.id)" id="edit+${
        data[prop].uid
      }" type="button" class="btn btn-success">
        Editar
      </button>
    </td>
    </tr>`;
  }
}

//listLoad();

//Adicionar
// item, descricao, detalhamento, acao
function newRecado() {
  axios
    .post(link + "/message", {
      title: descricao.value,
      detail: detalhamento.value,
      id_user: user,
    })
    .then((response) => {
      //console.log(response.data.msg);
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
    });

  alert.style.display = "block";

  descricao.value = "";
  detalhamento.value = "";

  //listLoad();
}

//Editar
var editId; //GlobalVariable não coloca var dentro da function senao
//cria uma var com mesmo nome mas são diferentes
function edit(obj) {
  editId = obj.split("+")[1];
  //console.log(editId);
  var saveBtn = document.getElementById("saveBtn");
  saveEditBtn.style.display = "block";
  saveBtn.style.display = "none";
  titleValue = document.getElementById(`title+${editId}`).innerText;
  detailValue = document.getElementById(`detail+${editId}`).innerText;
  descricao.value = titleValue;
  detalhamento.value = detailValue;
  alert.style.display = "none";
}

function saveBtnEdit() {
  //console.log(editId);
  saveEditBtn.style.display = "none";
  saveBtn.style.display = "block";
  axios
    .put(link + "/message/" + editId, {
      title: descricao.value,
      detail: detalhamento.value,
    })
    .then((response) => {
      console.log(response.data.msg);
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
    });

  descricao.value = "";
  detalhamento.value = "";
  alert.style.display = "block";

  //listLoad();
}

//Delete
//criado um modol bootstrap
var btndelTudo = document.getElementById("btndelTudo");
btndelTudo.style.display = "none";

var btndelItem = document.getElementById("btndelItem");
btndelItem.style.display = "block";

var titulo = document.getElementById("exampleModalLabel");
var body = document.getElementById("modal-body");

var deleteId; //GlobalVariable
function del(obj) {
  deleteId = obj.id.split("+")[1];
  btndelItem.style.display = "block";
  btndelTudo.style.display = "none";

  titulo.innerHTML = `Confirmação de Exclusão do <strong>Item ${deleteId}</strong>`;
  body.innerHTML = `Tem certeza ? Não poderá ser recupado o <strong>Item ${deleteId}</strong> no futuro. `;
}

function confirmDelete() {
  //console.log(deleteId)
  axios
    .delete(link + "/message/" + deleteId)
    .then((response) => {
      //console.log(response.data.msg);
      setTimeout(() => {
        location.reload();
      }, 1000);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
    });

  //listLoad();
}

//#TODO deletar TUDO
// function delModal() {
//   btndelTudo.style.display = "block";
//   btndelItem.style.display = "none";

//   titulo.innerHTML = `Confirmação de Exclusão <strong>Toda Lista de Recados</strong>`;
//   body.innerHTML = `Tem certeza ? Não poderá ser recupado <strong>Toda Lisda de Recados</strong> no futuro. `;
// }

// //Utilidade apagar todos
// function delStorage() {
//   localStorage.removeItem("recados");
//   // recados = {};
//   // listLoad();
//   // recados.slice(indice onde começa, quantos)
//   location.reload();
// }
