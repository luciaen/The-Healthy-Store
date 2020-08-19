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
            if (nombre.value == '') {
                errores.push('El campo nombre no puede estar vacio');
                nombre.classList.add('is-invalid');
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
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
//aca empieza OTRA VALIDACION
