// Realizar validaciones para que no haya campos vacios o sean invalidos
//Enviar los datos al Storage del navegador


//acceder a los datos del los usuarios
// luego realizamos validacion
// si pasa la validacion, procesamos los datos


const nameI = document.querySelector("#name").value.trim()
const passwordI = document.querySelector("#password").value.trim()
const emailI = document.querySelector("#email").value.trim()


function notification (text){
    Swal.fire(text)
}

function validateInputs () {
    const form = querySelector(".form")
    form.addEventListener("submit", function(e){
        //prevenimos la carga del formulario
        e.preventDefault()

   if(!nameI || !passwordI || !emailI){
     notification("please complete all inputs")
   }  

   else {
    notification("data validated", {nameI, passwordI, emailI})
   }
})
}

validateInputs()