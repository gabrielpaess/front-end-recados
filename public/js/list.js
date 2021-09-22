getStorage();

const key = window.localStorage.getItem("@growdev-user");

const description = document.querySelector("#description");
const details = document.querySelector("#details");
const formList = document.querySelector(".form-list");
const online = window.localStorage.getItem("online");
const loading = document.querySelector(".loading");
const inputHidden = document.querySelector("#key");

// Salvando nova mensagem
function handleSubmit(e) {
  e.preventDefault();

  const vDescription = validate(description);
  const vDetails = validate(details);

  if (vDescription && vDetails) {
    const data = {
      description: description.value,
      details: details.value,
    };

    const update = updateRegister(data);

    if (!update) {
      if (key) {
        postApi(`/messages/${key}`, data, function (res) {
          if (res && res.success) {
            getMessages();
          } else {
            logout();
          }
        });
      }
    }

    description.value = "";
    details.value = "";
    inputHidden.value = "";
    description.placeholder = "Descrição";
    details.placeholder = "Detalhamento";
  }
}

// Buscar todas as mensagens
function getMessages() {
  loadingElement(true);

  if (key) {
    getApi(`/messages/users/${key}`, null, function (res) {
      if (res && res.success) {
        listMessages(res);
      } else {
        logout();
      }
    });
  }
}

// Lista toda as mensagens
function listMessages(data) {
  loadingElement(false);
  let html = "";
  if (data.success && Object.keys(data.data).length > 0) {
    data.data = data.data.reverse();
    let i = 1;
    data.data.forEach(function (item, index) {
      html += `<tr id=${item.id}><td>${i}</td><td>${item.description}</td><td>${item.details}</td><td><div class="btns-table"><button data-id="${item.id}" class="btn btn-danger btn-delete">Apagar</button> <button data-id="${item.id}" class="btn btn-success btn-edit">Editar</button></div></td></tr>`;
      i++;
    });
  } else {
    html +=
      "<tr><td></td><td></td><td>Nenhum registro encontrado</td><td></td></tr>";
  }
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = html;

  debounce(editRegister(), 1000);
  debounce(deleteRegister(), 1000);
}

// Preenche os input's descricao e detalhamento
function fillMessages(data) {
  description.placeholder = "Descrição";
  details.placeholder = "Detalhamento";
  if (data.success) {
    inputHidden.value = data.data.id;
    description.value = data.data.description;
    details.value = data.data.details;
  }
}

// Atualizar mensagem
function updateRegister(data) {
  const id = document.querySelector("#key").value;
  if (id != "") {
    putApi(`/messages/${id}`, data, function (res) {
      if (res && res.success) {
        getMessages();
      } else {
        logout();
      }
    });
    return true;
  }
  return false;
}

// Editar Mensagem
function editRegister() {
  const btn = document.querySelectorAll(".btn-edit");
  function handleClick(e) {
    const id = e.target.dataset.id;
    description.placeholder = "Carregando...";
    details.placeholder = "Carregando...";
    if (key) {
      getApi(`/messages/${id}`, null, function (res) {
        if (res && res.success) {
          fillMessages(res);
        } else {
          logout();
        }
      });
    }
  }
  btn.forEach(function (item) {
    item.addEventListener("click", handleClick);
  });
}

// Deletar Mensagem
function deleteRegister() {
  const btn = document.querySelectorAll(".btn-delete");
  function confirm(element) {
    const btnConfirm = document.querySelector(".btn-yes");
    btnConfirm.addEventListener("click", function () {
      const id = element.target.dataset.id;
      const el = document.getElementById(`${id}`);
      if (el) {
        deleteApi(`/messages/${id}`, function (res) {
          if (res && res.success) {
            el.remove();
          }
        });
      }
      modal(true);
    });
  }
  btn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      modal(false);
      confirm(e);
    });
  });
}

// Logout
const logoutElement = document.getElementById("logout");
if (logoutElement) {
  logoutElement.addEventListener("click", function () {
    logout();
  });
}

window.addEventListener("load", function () {
  formList.addEventListener("submit", handleSubmit);
  getMessages();
});
