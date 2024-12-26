// Contador global para generar IDs secuenciales
let userCounter = 1;
let usersDatabase = [];


function notification(text, classN,color1,color2){
  Toastify({
    text: text,
    className: classN,
    style: {
      color: "#111114",
      background: `linear-gradient(to right, ${color1}, ${color2})`,
    }
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
    email: email
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
      notification("Check that the fields in the form are filled in.", "Error", "#FB4141", "#EE4E4E");
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
