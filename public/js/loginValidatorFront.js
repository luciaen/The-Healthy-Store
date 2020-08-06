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