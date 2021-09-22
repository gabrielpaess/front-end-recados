//
// Script Cadastro
//

const link = ("https://back-end-recados.herokuapp.com", "http:localhost:8080");

//alert não é resevado mas da conflito com comando alert
var alert1 = document.getElementById("alert");
alert1.style.display = "none";

// verificar login e senha
function addUser() {
  let user_name = document.getElementById("name");
  let password1 = document.getElementById("password1");
  let password2 = document.getElementById("password2");

  function passwordCheck(user_name, password1, password2) {
    if (password1 === password2) {
      axios
        .post(link + "/signin", {
          user: user_name,
          password: password2,
        })
        .then((response) => {
          //console.log(response.data.statusText);
          alert1.style.display = "block"; //criar alerta bootstrap
          alert1.getElementsByTagName("p")[0].innerHTML =
            "Cadastrado com sucesso";
        })
        .catch((error) => {
          console.log(error.response.statusText);
        });
      //Cadastro feito com sucesso Alert Bootstrap
    } else {
      alert1.style.display = "block"; //criar alerta bootstrap
      alert1.getElementsByTagName("p")[0].innerHTML = "Senhas não conferem.";
      password1.value = "";
      password2.value = "";
      password1.focus();
      password1.select();
    }
  }

  //userCheck(user_name.value);
  passwordCheck(user_name.value, password1.value, password2.value);
}
