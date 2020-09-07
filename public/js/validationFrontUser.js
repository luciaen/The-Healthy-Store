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
                text: 'Usuario Creado',
            })
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, lastname, email, password, confirmpassword, telefono, imagen } = formulario.elements;
            let errores = [];
            if (nombre.value.length < 2) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de dos caracteres');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Apellido
            if (lastname.value.length < 2) {
                errores.push('El campo apellido no puede estar vacio ni contener menos de dos caracteres');
                lastname.classList.add('is-invalid');

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }
            let errorEmail = document.getElementById('erroremail')
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido');
                email.classList.add('is-invalid');
                errorEmail.classList.add('text-danger')
                errorEmail.innerHTML = 'el mail tiene un formato incorrecto'
            } else {
                validacionMail(email.value).then(existe => {
                    if (existe) {
                        errores.push('el email ya existe')
                        email.classList.add('is-invalid')
                        errorEmail.classList.add('text-danger')
                        errorEmail.innerHTML = 'el mail ya existe'
        
                    } else {
                        email.classList.add('is-valid')
                        errorEmail.innerHTML = ''
                        email.classList.remove('is-invalid')
        
                    }
                })
            }
            if (telefono.value == '') {
                errores.push('El campo telefono no puede estar vacio');
                telefono.classList.add('is-invalid');

            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            if (confirmpassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio');
                confirmpassword.classList.add('is-invalid');

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');

            }
            /*if (imagen.value == '') {
                errores.push('Debe seleccionar su imagen en formato JPG - PNG ó JPEG');
                imagen.classList.add('is-invalid');
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            } else {
                imagen.classList.add('is-valid');
                imagen.classList.remove('is-invalid');
            }*/

            //IMAGEN
            let errorImagen = document.getElementById('errorimagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value != '') {
                if (!acceptFileTypes.test(imagen.value)) {
                    errores.push('la imagen debe ser jpg,jepg,gif o png')
                    imagen.classList.add('is-invalid')
                    errorImagen.classList.add('text-danger')
                    errorImagen.innerHTML = 'la imagen debe ser jpg,jepg,gif o png'


                } else {
                    imagen.classList.add('is-valid')
                    errorImagen.innerHTML = ''
                    imagen.classList.remove('is-invalid')
                }
            } else {
                imagen.classList.add('is-valid')
                errorImagen.innerHTML = ''
                imagen.classList.remove('is-invalid')
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
            async function validacionMail(emailbuscado) {
                let request = await fetch('http://localhost:3000/registrados')
                let res = await request.json()
                return (Array.from(res).find(usuario => usuario.email == emailbuscado) != null)
            
                }
        }
        async function validacionMail(emailbuscado){
            let request = await fetch('http://localhost:3000/users/registrados')
            let res = await request.json()
                return (Array.from(res).find(usuario => usuario.email == emailbuscado) != null)
            
            
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
            let { email, password } = formulario.elements;
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
window.onload = function () {
    let formulario = document.getElementById("form-delete")
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        Swal.fire({
            title: 'Estas seguro?',
            text: "Este cambio es irreversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo!'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Borrado!',
                    'El archivo ha sido borrado.',
                    'exitosamente'
                )
                formulario.submit();
            }
        })


    })
}
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
                text: 'Usuario Creado',
            })
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, lastname, email, password, confirmpassword, telefono, imagen } = formulario.elements;
            let errores = [];
            if (nombre.value.length < 2) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de dos caracteres');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Apellido
            if (lastname.value.length < 2) {
                errores.push('El campo apellido no puede estar vacio ni contener menos de dos caracteres');
                lastname.classList.add('is-invalid');

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }

            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido');
                email.classList.add('is-invalid');
            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }
            if (telefono.value == '') {
                errores.push('El campo telefono no puede estar vacio');
                telefono.classList.add('is-invalid');

            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            if (confirmpassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio');
                confirmpassword.classList.add('is-invalid');

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');

            }

            //IMAGEN
            let errorImagen = document.getElementById('errorimagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value != '') {
                if (!acceptFileTypes.test(imagen.value)) {
                    errores.push('la imagen debe ser jpg,jepg,gif o png')
                    imagen.classList.add('is-invalid')
                    errorImagen.classList.add('text-danger')
                    errorImagen.innerHTML = 'la imagen debe ser jpg,jepg,gif o png'


                } else {
                    imagen.classList.add('is-valid')
                    errorImagen.innerHTML = ''
                    imagen.classList.remove('is-invalid')
                }
            } else {
                imagen.classList.add('is-valid')
                errorImagen.innerHTML = ''
                imagen.classList.remove('is-invalid')
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
//VALIDACION DE UPDATE DE USUARIO
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditPerfil")
    formulario.addEventListener("submit", function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al editar perfil',

            })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Perfil editado',
            })
        }
        function validaciones(evento) {
            let { name, lastname, phone, imagen } = formulario.elements;
            let errores = [];
            if (name.value.length < 2) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de 2 caracteres.');
                name.classList.add('is-invalid');

            } else {
                name.classList.add('is-valid');
                name.classList.remove('is-invalid');
            }
            if (lastname.value.length < 2) {
                errores.push('El campo apellido no puede estar vacio ni contener menos de 2 caracteres.');
                lastname.classList.add('is-invalid');

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }
            if (phone.value == '') {
                errores.push('El campo telefono no puede estar vacio.');
                phone.classList.add('is-invalid');

            } else {
                phone.classList.add('is-valid');
                phone.classList.remove('is-invalid');
            }
            //IMAGEN
            let errorImagen = document.getElementById('errorimagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value != '') {
                if (!acceptFileTypes.test(imagen.value)) {
                    errores.push('la imagen debe ser jpg,jepg,gif o png')
                    imagen.classList.add('is-invalid')
                    errorImagen.classList.add('text-danger')

                } else {
                    imagen.classList.add('is-valid')
                    imagen.classList.remove('is-invalid')
                }
            } else {
                imagen.classList.add('is-valid')
                imagen.classList.remove('is-invalid')
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
//VALIDACION PARA EL UPDATE DE CONTRASEñA DE USUARIO
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditPassword")
    formulario.addEventListener("submit", function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cambiar contraseña',

            })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Contraseña cambiada!',
            })
        }
        function validaciones(evento) {
            let { oldPassword, password, confirmPassword } = formulario.elements;
            let errores = [];
            if (oldPassword.value == '') {
                errores.push('La antigua contraseña es obligatoria');
                oldPassword.classList.add('is-invalid');

            } else {
                oldPassword.classList.add('is-valid');
                oldPassword.classList.remove('is-invalid');
            }
            if (password.value == '') {
                errores.push('El campo contraseña no puede estar vacio.');
                password.classList.add('is-invalid');

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            if (confirmPassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio.');
                confirmPassword.classList.add('is-invalid');

            } else {
                confirmPassword.classList.add('is-valid');
                confirmPassword.classList.remove('is-invalid');
            }
            if (confirmPassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmPassword.classList.add('is-invalid');
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

//valido el campo editEmail del usuario
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditEmail")
    formulario.addEventListener("submit", function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cambiar E-mail',

            })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'E-mail cambiado!',
            })
        }
        function validaciones(evento) {
            let { email } = formulario.elements;
            let errores = [];
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido');
                email.classList.add('is-invalid');
            } else {
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
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