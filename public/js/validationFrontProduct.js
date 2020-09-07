window.addEventListener('load', function () {
    let formulario = document.querySelector('.form-product-create');
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
            let {
                categoria,
                nombre,
                descripcion,
                precio,
                stock,
                descuento,
                recomendado,
                imagen
            } = formulario.elements;
            let errores = [];
            //VALIDO EL NOMBRE=========================================================================>
            let errorName = document.getElementById('errorName')
            if (nombre.value.length < 5) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de 5 caracteres');
                nombre.classList.add('is-invalid');
                errorName.classList.add("text-danger")
                errorName.innerHTML = "El campo nombre no puede estar vacio ni contener menos de 5 caracteres"
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }
            //VALIDO LA CATEGORIA ===========================================>
            let errorCategorie = document.getElementById('errorCategories')
            if (categoria.value == '') {
                errores.push('El campo categoria no puede estar vacio');
                categoria.classList.add('is-invalid');
                errorCategorie.classList.add("text-danger")
                errorCategorie.innerHTML = 'El campo categoria no puede estar vacio'
            } else {
                categoria.classList.add('is-valid');
                categoria.classList.remove('is-invalid');
            }
            //VALIDO LA DESCRIPCION ========================================================================>
            let errorDescription = document.getElementById('errorDescription')
            if (descripcion.value.length < 20) {
                errores.push('El campo descripcion no puede estar vacio ni contener menos de 20 caracteres');
                descripcion.classList.add('is-invalid');
                errorDescription.classList.add("text-danger")
                errorDescription.innerHTML = 'El campo descripcion no puede estar vacio ni contener menos de 20 caracteres'
            } else {
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
            }
            //VALIDO EL STOCK==========================================>
            let errorStock = document.getElementById('errorStock')
            if (stock.value == '') {
                errores.push('El campo stock no puede estar vacio');
                stock.classList.add('is-invalid');
                errorStock.classList.add("text-danger")
                errorStock.innerHTML = 'El campo stock no puede estar vacio'
            } else {
                stock.classList.add('is-valid');
                stock.classList.remove('is-invalid');
            }
            //VALIDO EL PRECIO =========================================>
            let errorPrice = document.getElementById('errorPrice')
            if (precio.value == '') {
                errores.push('El campo precio no puede estar vacio');
                precio.classList.add('is-invalid');
                errorPrice.classList.add("text-danger")
                errorPrice.innerHTML = 'El campo precio no puede estar vacio'
            } else {
                precio.classList.add('is-valid');
                precio.classList.remove('is-invalid');
            }
            //VALIDO EL DESCUENTO=======================================>
            let errorDiscount = document.getElementById('errorDiscount')
            if (descuento.value == '') {
                errores.push('El campo descuento no puede estar vacio');
                descuento.classList.add('is-invalid');
                errorDiscount.classList.add("text-danger")
                errorDiscount.innerHTML = 'El campo descuento no puede estar vacio'
            } else {
                descuento.classList.add('is-valid');
                descuento.classList.remove('is-invalid');

            }
            //VALIDO LA RECOMENDACION======================================>
            let erroRecommended = document.getElementById('erroRecommended')
            if (recomendado.value == '') {
                errores.push('El campo recomendado no puede estar vacio');
                recomendado.classList.add('is-invalid');
                erroRecommended.classList.add("text-danger")
                erroRecommended.innerHTML = 'El campo recomendado no puede estar vacio'
            } else {
                recomendado.classList.add('is-valid');
                recomendado.classList.remove('is-invalid');
            }
            //IMAGEN
            let errorImagen = document.getElementById('errorImagen')
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
            if (imagen.value == '') {
                errores.push('El campo imagen no puede estar vacio');
                imagen.classList.add('is-invalid');
            } else {
                imagen.classList.add('is-valid');
                imagen.classList.remove('is-invalid');
            }
            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else {
                return true
            }
        }


    })
})
//ACA VALIDACION DEL BORRAR PRODUCTO
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
            let {
                nombre,
                descripcion,
                precio,
                stock,
                imagen
            } = formulario.elements;
            let errores = [];
            //VALIDO EL NOMBRE=========================================================================>
            let errorName = document.getElementById('errorName')
            if (nombre.value.length < 5) {
                errores.push('El campo nombre no puede estar vacio ni contener menos de 5 caracteres');
                nombre.classList.add('is-invalid');
                errorName.classList.add("text-danger")
                errorName.innerHTML = "El campo nombre no puede estar vacio ni contener menos de 5 caracteres"
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }
            //VALIDO LA DESCRIPCION ========================================================================>
            let errorDescription = document.getElementById('errorDescription')
            if (descripcion.value.length < 20) {
                errores.push('El campo descripcion no puede estar vacio ni contener menos de 20 caracteres');
                descripcion.classList.add('is-invalid');
                errorDescription.classList.add("text-danger")
                errorDescription.innerHTML = 'El campo descripcion no puede estar vacio ni contener menos de 20 caracteres'
            } else {
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
            }
            //VALIDO EL STOCK==========================================>
            let errorStock = document.getElementById('errorStock')
            if (stock.value == '') {
                errores.push('El campo stock no puede estar vacio');
                stock.classList.add('is-invalid');
                errorStock.classList.add("text-danger")
                errorStock.innerHTML = 'El campo stock no puede estar vacio'
            } else {
                stock.classList.add('is-valid');
                stock.classList.remove('is-invalid');
            }
            //VALIDO EL PRECIO =========================================>
            let errorPrice = document.getElementById('errorPrice')
            if (precio.value == '') {
                errores.push('El campo precio no puede estar vacio');
                precio.classList.add('is-invalid');
                errorPrice.classList.add("text-danger")
                errorPrice.innerHTML = 'El campo precio no puede estar vacio'
            } else {
                precio.classList.add('is-valid');
                precio.classList.remove('is-invalid');
            }

            //IMAGEN
            let errorImagen = document.getElementById('errorImagen')
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
            if (imagen.value == '') {
                errores.push('El campo imagen no puede estar vacio');
                imagen.classList.add('is-invalid');
            } else {
                imagen.classList.add('is-valid');
                imagen.classList.remove('is-invalid');
            }
            //SE VALIDAN LOS ERRORES =============>         
            if (errores.length > 0) {
                evento.preventDefault();
                errores = [];
            } else {
                return true
            }
        }


    })
})