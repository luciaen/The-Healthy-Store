window.onload=function(){
    let borrar = document.getElementById("delete")
    borrar.addEventListener("click",function(event){
     let borrarProducto =confirm("desea borrar el producto?")
     if(borrarProducto==false){
         event.preventDefault
     }
    })
 }