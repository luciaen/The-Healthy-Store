window.addEventListener('load', function () {
    let formulario = document.querySelector('.form-product-create');
    formulario.addEventListener('submit',function(evento){
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear Producto',

            })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Producto Creado',
            })
        }
        function validaciones(evento){
            let {categoria,nombre,descripcion,precio,stock,descuento,recomendado,imagen } = formulario.elements; 
            let errores=[];
            if (nombre.value.length < 5) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de 5 caracteres');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }
            if (categoria.value == '') {
                errores.push('El campo categoria no puede estar vacio');
                categoria.classList.add('is-invalid');
            } else {
                categoria.classList.add('is-valid');
                categoria.classList.remove('is-invalid');
            }
            if (descripcion.value.length < 20) {
                errores.push('El campo descripcion no puede estar vacio ni contener menos de 20 caracteres');
                descripcion.classList.add('is-invalid');
            } else {
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
            }
            if (stock.value == '') {
                errores.push('El campo stock no puede estar vacio');
                stock.classList.add('is-invalid');
            } else {
                stock.classList.add('is-valid');
                stock.classList.remove('is-invalid');
            }
            if (precio.value == '') {
                errores.push('El campo precio no puede estar vacio');
                precio.classList.add('is-invalid');
            } else {
                precio.classList.add('is-valid');
                precio.classList.remove('is-invalid');
            }
            if (descuento.value == '') {
                errores.push('El campo descuento no puede estar vacio');
                descuento.classList.add('is-invalid');
            } else {
                descuento.classList.add('is-valid');
                descuento.classList.remove('is-invalid');
            }
            if (recomendado.value == '') {
                errores.push('El campo recomendado no puede estar vacio');
                recomendado.classList.add('is-invalid');
            } else {
                recomendado.classList.add('is-valid');
                recomendado.classList.remove('is-invalid');
            }
            if (imagen.value == '') {
                errores.push('El campo imagen no puede estar vacio');
                imagen.classList.add('is-invalid');
            } else {
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
//ACA VALIDACION DEL BORRAR PRODUCTO
window.onload=function(){
    let formulario = document.getElementById("form-delete")
    formulario.addEventListener("submit",function(event){
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
     
    
 })}
//aca empieza OTRA VALIDACION
window.addEventListener('load', function () {
    let formulario = document.querySelector('.form-product-edit');
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al crear Producto',

            })
        } else {
            formulario.submit();
            Swal.fire({
                icon: 'ssuccess',
                title: 'Genial!',
                text: 'Producto Creado',
            })
        }

        function validaciones(evento) {
            let {categoria, nombre, descripcion, precio, stock,descuento,recomendado} = formulario.elements;
            let errores = [];
            if (nombre.value.length < 5 ) {
                errores.push('El campo nombre no puede estar vacio ni tener menos de 5 caracteres');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }
            if (categoria.value == '') {
                errores.push('El campo categoria no puede estar vacio');
                categoria.classList.add('is-invalid');
            } else {
                categoria.classList.add('is-valid');
                categoria.classList.remove('is-invalid');
            }
            if (descripcion.value.length < 2) {
                errores.push('El campo descripcion no puede estar vacio ni contener menos de 20 caracteres');
                descripcion.classList.add('is-invalid');
            } else {
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
            }
            if (stock.value == '') {
                errores.push('El campo stock no puede estar vacio');
                stock.classList.add('is-invalid');
            } else {
                stock.classList.add('is-valid');
                stock.classList.remove('is-invalid');
            }
            if (precio.value == '') {
                errores.push('El campo precio no puede estar vacio');
                precio.classList.add('is-invalid');
            } else {
                precio.classList.add('is-valid');
                precio.classList.remove('is-invalid');
            }
            if (descuento.value == '') {
                errores.push('El campo descuento no puede estar vacio');
                descuento.classList.add('is-invalid');
            } else {
                descuento.classList.add('is-valid');
                descuento.classList.remove('is-invalid');
            }
            if (recomendado.value == '') {
                errores.push('El campo recomendado no puede estar vacio');
                recomendado.classList.add('is-invalid');
            } else {
                recomendado.classList.add('is-valid');
                recomendado.classList.remove('is-invalid');
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