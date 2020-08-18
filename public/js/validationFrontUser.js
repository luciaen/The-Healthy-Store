//VALIDACION DEL REGISTRO DE USUARIOS
window.addEventListener('load', function () {
    //Capturar el formulario 
    let formulario = document.querySelector('.form-register');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear usuario',
                
              })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Usuario Creado',})
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, lastname, email, password, confirmpassword,telefono,imagen} = formulario.elements;
            let errores = [];
            if (nombre.value == '') {
                errores.push('El campo nombre no puede estar vacio...');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Apellido
            if (lastname.value == '') {
                errores.push('El campo apellido no puede estar vacio...');
                lastname.classList.add('is-invalid');

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }
            
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido...');
                email.classList.add('is-invalid');
            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }
            if (telefono.value == '') {
                errores.push('El campo telefono no puede estar vacio...');
                telefono.classList.add('is-invalid');

            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio...');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            if (confirmpassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio...');
                confirmpassword.classList.add('is-invalid');

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');

            }
            if(imagen.value == ''){
                errores.push('Debe seleccionar su imagen en formato JPG - PNG ó JPEG');
                imagen.classList.add('is-invalid');   
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            }else{
                imagen.classList.add('is-valid');
                imagen.classList.remove('is-invalid');
            }

            let ulErrores = document.querySelector('.errores');
            ulErrores.classList.add('alert-danger')
            if (errores.length > 0) {
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            } else {
                return true;
            }
        }

    })
})
//VALIDACION DEL LOGIN DE USUARIOS
window.addEventListener('load', function () {
    //Capturar el formulario 
    let formulario = document.querySelector('.form-login');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Campos Incompletos',
                
              })
        } else {
            formulario.submit();
        }

        function validaciones(evento) {
            //Destructuring  
            let {email, password} = formulario.elements;
            let errores = [];
            
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email no puede estar vacio');
                email.classList.add('is-invalid');
            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            let ulErrores = document.querySelector('.errores');
            ulErrores.classList.add('alert-danger')
            if (errores.length > 0) {
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            } else {
                return true;
            }
        }

    })
    
});
// VALIDACION DE BORRAR USUARIO
window.onload=function(){
    let formulario = document.getElementById("form-delete")
    formulario.addEventListener("submit",function(event){
        event.preventDefault();
       Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              formulario.submit();
            }
          })
     
    
 })}
 //VALIDACION DE CREAR USUARIO DEL CRUD
 window.addEventListener('load', function () {
    //Capturar el formulario 
    let formulario = document.querySelector('.form-createUser');
    //console.log(formulario.elements.email.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear usuario',
                
              })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Usuario Creado',})
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, lastname, email, password, confirmpassword,telefono} = formulario.elements;
            let errores = [];
            if (nombre.value == '') {
                errores.push('El campo nombre no puede estar vacio...');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Apellido
            if (lastname.value == '') {
                errores.push('El campo apellido no puede estar vacio...');
                lastname.classList.add('is-invalid');

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }
            
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido...');
                email.classList.add('is-invalid');
            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }
            if (telefono.value == '') {
                errores.push('El campo telefono no puede estar vacio...');
                telefono.classList.add('is-invalid');

            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio...');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            if (confirmpassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio...');
                confirmpassword.classList.add('is-invalid');

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');

            }

            let ulErrores = document.querySelector('.errores');
            ulErrores.classList.add('alert-danger')
            if (errores.length > 0) {
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            } else {
                return true;
            }
        }

    })



})