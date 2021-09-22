getStorage();

const login = document.getElementById("login");
const password = document.getElementById("password");
const repetPass = document.getElementById("repeat-pass");

// REGISTER
const formRegister = document.querySelector(".form-register");
function register(res) {
  if (res && !res.success) {
    postApi(
      "/users",
      {
        name: login.value.toLowerCase(),
        password: password.value,
        repeatPass: repetPass.value,
      },
      function (response) {
        if (response) {
          messageSuccess("create");
          window.location.href = "index.html";
        }
      }
    );
  } else {
    modal(false, { message: "Esse usuário já existe!" });
  }
}

// Submit Register
function handleSubmit(e) {
  e.preventDefault();
  const vLogin = validate(login);
  const vPassword = validate(password);
  const vRepeat = validate(repetPass);
  if (vLogin && vPassword && vRepeat) {
    if (validLengthInput(login, 3)) {
      modal(false, {
        message: "Campo nome precisa ter mais de 3 caracteres",
      });
    } else if (validLengthInput(password, 8)) {
      modal(false, {
        message: "Campo senha precisa ter mais de 8 caracteres",
      });
    } else if (validLengthInput(password, 8)) {
      modal(false, {
        message: "Campo repetir senha precisa ter mais de 8 caracteres",
      });
    } else {
      if (comparePass(password, repetPass)) {
        getApi(
          "/users/name/" + login.value.toLowerCase(),
          null,
          function (response) {
            register(response);
          }
        );
      }
    }
  }
}

window.addEventListener("load", function () {
  formRegister.addEventListener("submit", handleSubmit);
});
