window.onload= function(){
    let formulario = document.querySelector("#formEditPerfil")
    formulario.addEventListener("submit",function(){
        let errores =[];
        let campoNombre= document.querySelector(".input-nombre");
        if(campoNombre.value == " "){
            errores.push("El campo nombre esta vacio");
        }
        if(errores.length > 0){
            event.preventDefault();
        }
        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
        }


    });
    formulario.addEventListener("submit",function(){
        let errores =[];
        let campoNombre= document.querySelector(".input-lastName");
        if(campoNombre.value == " "){
            errores.push("El campo apellido esta vacio");
        }
        if(errores.length > 0){
            event.preventDefault();
        }
        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
        }


    });
    formulario.addEventListener("submit",function(){
        let errores =[];
        let campoNombre= document.querySelector(".input-email");
        if(campoNombre.value == ""){
            errores.push("El campo email esta vacio");
        }
        if(errores.length > 0){
            event.preventDefault();
        }
        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
        }


    });
    formulario.addEventListener("submit",function(){
        let errores =[];
        let campoNombre= document.querySelector(".input-phone");
        if(campoNombre.value == 0){
            errores.push("El campo telefono esta vacio");
        }
        if(errores.length > 0){
            event.preventDefault();
        }
        let ulErrores = document.querySelector("div.errores ul");
        for(let i = 0; i< errores.length; i++){
            ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
        }


    });
}