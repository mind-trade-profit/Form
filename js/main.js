// Contador global para generar IDs secuenciales
let userCounter = 1;
let usersDatabase = [];

function notification(text, classN, color1, color2) {
  Toastify({
    text: text,
    className: classN,
    style: {
      color: "#111114",
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    },
  }).showToast();
}
// Función para agregar usuarios al localStorage y la base de datos temporal
function addUser(name, password, email) {
  // Generar un ID más estructurado
  const userId = `${userCounter}-${Math.random().toString(36).substr(2, 9)}`;
  userCounter++; // Incrementar el contador para el próximo usuario

  const userData = {
    id: userId,
    name: name,
    password: password,
    email: email,
  };

  localStorage.setItem(userId, JSON.stringify(userData));

  usersDatabase.push(userData);
}

// Validar inputs y agregar usuarios
function validateInputs() {
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameI = document.querySelector("#nameI").value.trim();
    const passwordI = document.querySelector("#password").value.trim();
    const emailI = document.querySelector("#email").value.trim();

    if (nameI && passwordI && emailI) {
      addUser(nameI, passwordI, emailI);
      notification("The Prompts Sent", "Success", "#00FF9C", "#73EC8B");
    } else {
      notification(
        "Check that the fields in the form are filled in.",
        "Error",
        "#FB4141",
        "#EE4E4E"
      );
    }
  });
}

function loadUsersFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const userData = JSON.parse(localStorage.getItem(key));
    if (userData && userData.email) {
      usersDatabase.push(userData);
    }
  }
}

// Función para validar la existencia de un usuario por ID
function getUserById(id) {
  // Busca en la base de datos temporal
  const user = usersDatabase.find((user) => user.id.startsWith(id));
  if (user) {
    notification(`User found: ${user.name}`, "Success", "#00FF9C", "#73EC8B");
  } else {
    notification("User not found.", "Error", "#FB4141", "#EE4E4E");
  }
}

// Inicializar la base de datos temporal
loadUsersFromLocalStorage();
validateInputs();

//Log In Form

function msg(text, textButton, textRecommendation , icon) {
  // const tagMsg = document.querySelector(".tagMSG");
  // tagMsg.innerHTML = `
  //  <div class="msgContainer">
  //       <h2 class="tittleM">${text}</h2>
  //       <button class="closeOrOpen">${textButton}</button>
  //   </div>

  // `
  Swal.fire({
    title: text,
    text: textRecommendation,
    icon: icon,
    showConfirmButton: true,
    confirmButtonText: textButton,
  });
}

function validateDataUser() {
  const form2 = document.querySelector(".formLogIn");

  form2.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailLogIn = document.querySelector("#email2").value.trim();
    const passwordLogIn = document.querySelector("#password2").value.trim();
  
    const userFound = usersDatabase.find(
      (user) => user.email === emailLogIn && user.password === passwordLogIn);

    if (userFound) {
      msg("You successfully accessed to your account", "Close", " ", "success");
    } else {
      msg(
        "You don´t have an account, please register now!",
        "Retry Again",
        "You should register on the link below the form",
        "question"
      );
    }
  });
}

validateDataUser();
