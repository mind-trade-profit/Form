// Realizar validaciones para que no haya campos vacios o sean invalidos
//Enviar los datos al Storage del navegador

//acceder a los datos del los usuarios
// luego realizamos validacion
// si pasa la validacion, procesamos los datos

function notification (text, classN, color1,color2){
  Toastify({
    text: text,
    className: classN,
    style: {
      background: `linear-gradient(to right, ${color1},  ${color2})`,
      color: "#111114"
    },
    duration: 2000
  }).showToast()
}


//base de datos de usuario

function user (name,password,email){

 let dataUsers = {
  id : Math.random(10),
  name: name,
  password: password,
  email: email
 }

 JSON.stringify(localStorage.setItem(dataUsers.id, `${name},${password},${email}`))
}

function validateInputs() {
  const form = document.querySelector(".form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const nameI = document.querySelector("#nameI").value.trim()
    const passwordI = document.querySelector("#password").value.trim()
    const emailI = document.querySelector("#email").value.trim()
    
    user(nameI,passwordI,emailI)

  if(nameI && passwordI && emailI) {
    notification("The Prompts Sent", "Success","#00FF9C", "#73EC8B")
  } 
})
}
validateInputs()

//accder a los datos de los usuarios y almacenarlos en una tabla

function getDataUsers (){
   for(let i = 0; i < localStorage.length; i++){
    let getData = JSON.parse(localStorage.key(i))

   console.table(getData, localStorage.getItem(getData))
   } 

 
}
