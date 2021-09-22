getStorage();

const login = document.getElementById("login");
const password = document.getElementById("password");
const formLogin = document.querySelector(".form-login");

const create = window.localStorage.getItem("create");
if (create) {
  document.querySelector(".user-success").classList.add("show");
  messageSuccess("remove");
}

/* Login */
function loginAcess(res) {
  if (res && !res.success) {
    modal(false, { message: "Usuário não encontrado!" });
  } else {
    if (res.data[0].password !== password.value) {
      modal(false, { message: "Ops, verifique sua senha!" });
      return;
    }
    window.localStorage.setItem("@growdev-user", res.data[0].id);
    window.location.href = "lista.html";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const vLogin = validate(login);
  const vPassword = validate(password);
  if (vLogin && vPassword) {
    if (validLengthInput(login, 3)) {
      modal(false, {
        message: "Campo nome precisa ter mais de 3 caracteres",
      });
    } else if (validLengthInput(password, 8)) {
      modal(false, {
        message: "Campo senha precisa ter mais de 8 caracteres",
      });
    } else {
      getApi(
        "/users/name/" + login.value.toLowerCase(),
        null,
        function (response) {
          if (response && response.success) {
            loginAcess(response);
          } else {
            modal(false, {
              message: "Usuário não encontrado!",
            });
          }
        }
      );
    }
  }
}

window.addEventListener("load", function () {
  formLogin.addEventListener("submit", handleSubmit);
});
