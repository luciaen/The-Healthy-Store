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
            //Valido nombre ==============================================>
            let errorName = document.getElementById('errorName')
            if (nombre.value.length < 2) {
                //errores.push('El campo nombre no puede estar vacio ni contener menos de dos caracteres');
                nombre.classList.add('is-invalid');
                errorName.classList.add('text-danger')
                errorName.innerHTML = 'El campo nombre no puede estar vacio ni contener menos de dos caracteres'
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //VALIDO EL APELLIDO =========================================>
            let errorlastName = document.getElementById('errorLastName')
            if (lastname.value.length < 2) {
               // errores.push('El campo apellido no puede estar vacio ni contener menos de dos caracteres');
                lastname.classList.add('is-invalid');
                errorlastName.classList.add('text-danger')
                errorlastName.innerHTML = 'El campo apellido no puede estar vacio ni contener menos de dos caracteres'

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }
            //VALIDO EL E-MAIL=============================================>
            let errorEmail = document.getElementById('erroremail')
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                //errores.push('El email es inválido');
                email.classList.add('is-invalid');
                errorEmail.classList.add('text-danger')
                errorEmail.innerHTML = 'El mail tiene un formato incorrecto'
            } else {
                validacionMail(email.value).then(existe => {
                    if (existe) {
                        errores.push('Email ya registrado')
                        email.classList.add('is-invalid')
                        errorEmail.classList.add('text-danger')
                        errorEmail.innerHTML = 'Email ya registrado'
        
                    } else {
                        email.classList.add('is-valid')
                        errorEmail.innerHTML = ''
                        email.classList.remove('is-invalid')
        
                    }
                })
            }
            //VALIDO EL TELEFONO ========================================>
            let errorPhone = document.getElementById("errorPhone")
            if (telefono.value == '') {
               // errores.push('El campo telefono no puede estar vacio');
                telefono.classList.add('is-invalid');
                errorPhone.classList.add('text-danger')
                errorPhone.innerHTML= "El campo telefono no puede estar vacio";

            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }
            //VALIDO EL PASSWORD==========================================>
            let errorPassword = document.getElementById("errorPassword")
            if (password.value == '') {
               // errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');
                errorPassword.classList.add("text-danger")
                errorPassword.innerHTML="El campo contraseña no puede estar vacio"

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            //VALIDO LA CONFIRMACION DEL PASSWORD ============================================>
            let errorConfirmPassword = document.getElementById("errorConfirmPassword")
            if (confirmpassword.value == '') {
               // errores.push('El campo de confirmacion de contraseña no puede estar vacio');
                confirmpassword.classList.add('is-invalid');
               errorConfirmPassword .classList.add("text-danger")
               errorConfirmPassword .innerHTML="El campo de confirmacion de contraseña no puede estar vacio"

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');
                errorPassword.classList.add("text-danger")
                errorPassword.innerHTML="Las contraseñas son incorrectas"

            }
            //VALIDO LA IMAGEN ========================================>
            let errorImagen = document.getElementById('errorImagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value == '') {
                if (!acceptFileTypes.test(imagen.value)) {
                   errores.push('')
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
            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else{
                return true
            }
        }
        //SE VALIDA SI EL MAIL YA EXISTE EN LA BASE DE DATOS====================>
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

             //VALIDO EL E-MAIL=============================================>
             let errorEmail = document.getElementById('errorEmail')
             let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 
             if (!reEmail.test(email.value)) {
                 //errores.push('El email es inválido');
                 email.classList.add('is-invalid');
                 errorEmail.classList.add('text-danger')
                 errorEmail.innerHTML = 'El mail tiene un formato incorrecto'
             } else {
                 validacionMail(email.value).then(existe => {
                     if (existe) {
                         errores.push('Email ya registrado')
                         email.classList.add('is-invalid')
                         errorEmail.classList.add('text-danger')
                         errorEmail.innerHTML = 'Email ya registrado'
         
                     } else {
                         email.classList.add('is-valid')
                         errorEmail.innerHTML = ''
                         email.classList.remove('is-invalid')
         
                     }
                 })
             }
             let errorPassword = document.getElementById("errorPassword")
             if (password.value == '') {
                 errores.push('El campo contraseña no puede estar vacio');
                 password.classList.add('is-invalid');
                 errorPassword.classList.add("text-danger")
                 errorPassword.innerHTML="El campo contraseña no puede estar vacio"
 
             } else {
                 password.classList.add('is-valid');
                 password.classList.remove('is-invalid');
             }
             //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else{
                return true
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
            let { nombre, lastname, email, password, confirmpassword, telefono,imagen } = formulario.elements;
            let errores = [];
            //Valido nombre ==============================================>
            let errorName = document.getElementById('errorName')
            if (nombre.value.length < 2) {
                //errores.push('El campo nombre no puede estar vacio ni contener menos de dos caracteres');
                nombre.classList.add('is-invalid');
                errorName.classList.add('text-danger')
                errorName.innerHTML = 'El campo nombre no puede estar vacio ni contener menos de dos caracteres'
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }
            //VALIDO EL APELLIDO =========================================>
            let errorlastName = document.getElementById('errorLastName')
            if (lastname.value.length < 2) {
               // errores.push('El campo apellido no puede estar vacio ni contener menos de dos caracteres');
                lastname.classList.add('is-invalid');
                errorlastName.classList.add('text-danger')
                errorlastName.innerHTML = 'El campo apellido no puede estar vacio ni contener menos de dos caracteres'

            } else {
                lastname.classList.add('is-valid');
                lastname.classList.remove('is-invalid');
            }

              //VALIDO EL E-MAIL=============================================>
              let errorEmail = document.getElementById('errorEmail')
              let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
              if (!reEmail.test(email.value)) {
                  //errores.push('El email es inválido');
                  email.classList.add('is-invalid');
                  errorEmail.classList.add('text-danger')
                  errorEmail.innerHTML = 'El mail tiene un formato incorrecto'
              } else {
                  validacionMail(email.value).then(existe => {
                      if (existe) {
                          errores.push('Email ya registrado')
                          email.classList.add('is-invalid')
                          errorEmail.classList.add('text-danger')
                          errorEmail.innerHTML = 'Email ya registrado'
          
                      } else {
                          email.classList.add('is-valid')
                          errorEmail.innerHTML = ''
                          email.classList.remove('is-invalid')
          
                      }
                  })
              }
             //VALIDO EL TELEFONO ========================================>
             let errorPhone = document.getElementById("errorPhone")
             if (telefono.value == '') {
                // errores.push('El campo telefono no puede estar vacio');
                 telefono.classList.add('is-invalid');
                 errorPhone.classList.add('text-danger')
                 errorPhone.innerHTML= "El campo telefono no puede estar vacio";
 
             } else {
                 telefono.classList.add('is-valid');
                 telefono.classList.remove('is-invalid');
             }
            //VALIDO EL PASSWORD==========================================>
            let errorPassword = document.getElementById("errorPassword")
            if (password.value == '') {
               // errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');
                errorPassword.classList.add("text-danger")
                errorPassword.innerHTML="El campo contraseña no puede estar vacio"

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            //VALIDO LA CONFIRMACION DEL PASSWORD ============================================>
            let errorConfirmPassword = document.getElementById("errorConfirmPassword")
            if (confirmpassword.value == '') {
               // errores.push('El campo de confirmacion de contraseña no puede estar vacio');
                confirmpassword.classList.add('is-invalid');
               errorConfirmPassword .classList.add("text-danger")
               errorConfirmPassword .innerHTML="El campo de confirmacion de contraseña no puede estar vacio"

            } else {
                confirmpassword.classList.add('is-valid');
                confirmpassword.classList.remove('is-invalid');
            }
            if (confirmpassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
                confirmpassword.classList.add('is-invalid');
                errorPassword.classList.add("text-danger")
                errorPassword.innerHTML="Las contraseñas son incorrectas"

            }

            //IMAGEN
            let errorImagen = document.getElementById('errorImagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value == '') {
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

            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else{
                return true
            }
        }
//SE VALIDA SI EL MAIL YA EXISTE EN LA BASE DE DATOS====================>
async function validacionMail(emailbuscado){
    let request = await fetch('http://localhost:3000/users/registrados')
    let res = await request.json()
        return (Array.from(res).find(usuario => usuario.email == emailbuscado) != null)
    
    
}  
})
})
//VALIDACION DE UPDATE DE USUARIO================================>
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditPerfil")
    formulario.addEventListener("submit",function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al editar perfil',

            })
        }else{
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Perfil editado',
            })
        }
        function validaciones(evento){
            let {name,lastname,phone,imagen}=formulario.elements;
            let errores = [];
           //Valido nombre ==============================================>
           let errorName = document.getElementById('errorName')
           if (name.value.length < 2) {
               //errores.push('El campo nombre no puede estar vacio ni contener menos de dos caracteres');
               name.classList.add('is-invalid');
               errorName.classList.add('text-danger')
               errorName.innerHTML = 'El campo nombre no puede estar vacio ni contener menos de dos caracteres'
           } else {
               nombre.classList.add('is-valid');
               nombre.classList.remove('is-invalid');
           }
           //VALIDO EL APELLIDO =========================================>
           let errorlastName = document.getElementById('errorLastName')
           if (lastname.value.length < 2) {
              // errores.push('El campo apellido no puede estar vacio ni contener menos de dos caracteres');
               lastname.classList.add('is-invalid');
               errorlastName.classList.add('text-danger')
               errorlastName.innerHTML = 'El campo apellido no puede estar vacio ni contener menos de dos caracteres'

           } else {
               lastname.classList.add('is-valid');
               lastname.classList.remove('is-invalid');
           }
             //VALIDO EL TELEFONO ========================================>
             let errorPhone = document.getElementById("errorPhone")
             if (phone.value == '') {
                // errores.push('El campo telefono no puede estar vacio');
                phone.classList.add('is-invalid');
                 errorPhone.classList.add('text-danger')
                 errorPhone.innerHTML= "El campo telefono no puede estar vacio";
 
             } else {
                 telefono.classList.add('is-valid');
                 telefono.classList.remove('is-invalid');
             }
            //IMAGEN
            let errorImagen = document.getElementById('errorImagen')
            let acceptFileTypes = /(\.|\/)(gif|jpe?g|png|jpg)$/i
            if (imagen.value == '') {
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


            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else{
                return true
            }
        }
    })
})
//VALIDACION PARA EL UPDATE DE CONTRASEñA DE USUARIO
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditPassword")   
    formulario.addEventListener("submit",function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cambiar contraseña',

            })
        }else{
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Contraseña cambiada!',
            })
        }
        function validaciones(evento){
            let{oldPassword,password,confirmPassword}=formulario.elements;
            let errores = [];
            let errorOldPassword = document.getElementById("errorOldPassword")
            if (oldPassword.value == '') {
                errores.push('La antigua contraseña es obligatoria');
                oldPassword.classList.add('is-invalid');
                errorOldPassword.classList.add("text-danger");
                errorOldPassword.innerHTML="La antigua contraseña es obligatoria"

            } else {
                oldPassword.classList.add('is-valid');
                oldPassword.classList.remove('is-invalid');
            }
            let errorPassword = document.getElementById("errorPassword")
            if (password.value == '') {
               // errores.push('El campo contraseña no puede estar vacio');
                password.classList.add('is-invalid');
                errorPassword.classList.add("text-danger")
                errorPassword.innerHTML="El campo contraseña no puede estar vacio"

            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            let errorConfirmPassword = document.getElementById("errorConfirmPassword")
            if (confirmPassword.value == '') {
                errores.push('El campo de confirmacion de contraseña no puede estar vacio.');
               confirmPassword.classList.add('is-invalid');
               errorConfirmPassword.classList.add("text-danger")
                errorConfirmPassword.innerHTML="El campo contraseña no puede estar vacio"

            } else {
               confirmPassword.classList.add('is-valid');
               confirmPassword.classList.remove('is-invalid');
            }
            if (confirmPassword.value != password.value) {
                errores.push('las contraseña tienen que ser iguales.');
               confirmPassword.classList.add('is-invalid');
               errorPassword.classList.add("text-danger")
               errorPassword.innerHTML="Las contraseña tienen que ser iguales."

            }
            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else{
                return true
            }
        }
    })
})

//valido el campo editEmail del usuario
window.addEventListener('load', function () {
    let formulario = document.getElementById("formEditEmail") 
    formulario.addEventListener("submit",function(evento){
        if(!validaciones(evento)){
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al cambiar E-mail',

            })
        }else{
            formulario.submit();
           
        }
        function validaciones(evento){
            let{email}=formulario.elements;
            let errores = [];
            //VALIDO EL E-MAIL=============================================>
            let errorEmail = document.getElementById('errorEmail')
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(email.value)) {
                errores.push('El email es inválido');
                email.classList.add('is-invalid');
                errorEmail.classList.add('text-danger')
                errorEmail.innerHTML = 'El mail tiene un formato incorrecto'
            } else {
                validacionMail(email.value).then(existe => {
                    if (existe) {
                        errores.push('Email ya registrado')
                        email.classList.add('is-invalid')
                        errorEmail.classList.add('text-danger')
                        errorEmail.innerHTML = 'Email ya registrado'
        
                    } else {
                        email.classList.add('is-valid')
                        errorEmail.innerHTML = ''
                        email.classList.remove('is-invalid')
        
                    }
                })
            }
       //SE VALIDAN LOS ERRORES =============>         
       if (errores.length > 0) {
        evento.preventDefault();
        errores = [];
    } else{
        return true
    }
}
//SE VALIDA SI EL MAIL YA EXISTE EN LA BASE DE DATOS====================>
async function validacionMail(emailbuscado){
    let request = await fetch('http://localhost:3000/users/registrados')
    let res = await request.json()
        return (Array.from(res).find(usuario => usuario.email == emailbuscado) != null)
    
    
}  
})
})