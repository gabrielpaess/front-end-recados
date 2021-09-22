// Validacoes
function getStorage() {
  const path = document.location.pathname;
  const getStorage = window.localStorage.getItem("@growdev-user");
  if (getStorage && path.indexOf("/lista") <= -1) {
    window.location.href = "lista.html";
  } else if (!getStorage && path.indexOf("/lista") > -1) {
    window.location.href = "/";
  }
}
// Função para habilitar e desabilitar campos input recados
function loadingElement(status) {
  if (status) {
    loading.classList.add("show");
    return;
  }
  loading.classList.remove("show");
  document.querySelectorAll(".enabled").forEach(function (item) {
    item.removeAttribute("disabled");
  });
}

// Funcao de logout
function logout() {
  window.localStorage.removeItem("@growdev-user");
  location.reload();
}

// Valida campos de input
function validate(element) {
  if (element.value === "") {
    element.classList.add("border-danger");
    return false;
  } else {
    element.classList.remove("border-danger");
    return true;
  }
}

// Valida length dos campos input
function validLengthInput(element, min) {
  if (element.value.length < min) {
    return true;
  }
}

// Função para comparar senhas
function comparePass(password, repetPass) {
  const e = document.querySelector(".danger");
  if (e) {
    e.remove();
  }
  if (password.value != repetPass.value) {
    const span = document.createElement("span");
    span.classList.add("link-danger");
    span.classList.add("danger");
    span.innerText = "As senhas não conferem";
    password.parentNode.insertBefore(span, repetPass);
    password.classList.add("border-danger");
    repetPass.classList.add("border-danger");
    return false;
  } else {
    password.classList.remove("border-danger");
    repetPass.classList.remove("border-danger");
    return true;
  }
}

// Função responsável por controlar o Modal
function modal(fade, data) {
  const btn = document.querySelector(".btn-close");
  const btnNot = document.querySelector(".btn-not");
  const modal = document.querySelector("#modal");

  const textModal = document.querySelector(".text-modal");
  const modalBody = document.querySelector(".modal-body");
  if (data !== undefined && Object.keys(data).length > 0) {
    textModal.innerText = data.message;
  }

  function handleClose(e) {
    if (e.target === this) {
      modal.classList.remove("show");
    }
  }
  !fade ? modal.classList.add("show") : modal.classList.remove("show");
  modal.addEventListener("click", handleClose);
  btn.addEventListener("click", handleClose);
  if (btnNot) {
    btnNot.addEventListener("click", handleClose);
  }
}

// Função de reset nas mudanças
function handleChange(e) {
  const span = document.querySelector(".danger");
  if (span) {
    span.remove();
  }
  const element = e.target;
  if (element.classList.contains("border-danger")) {
    element.classList.remove("border-danger");
  }
}
const formInput = document.querySelectorAll(".form-group input");
formInput.forEach(function (item) {
  const span = document.querySelector(".danger");
  if (span) {
    span.remove();
  }
  item.addEventListener("change", handleChange);
});

// Função para utilizar o removeitem
function messageSuccess(type) {
  if (type === "create") {
    window.localStorage.setItem("create", "1");
  } else if (type === "remove") {
    window.localStorage.removeItem("create");
  }
}

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
