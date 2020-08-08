window.addEventListener('load', function () {
    let show = document.getElementById("show_password")
    //console.log(hola)
    show.addEventListener("mousedown",function(){
        let pass = document.getElementById("pass");
        pass.removeAttribute('type');
        show.classList.remove('fas fa-eye-slash')
        show.classList.add('fas fa-eye')
        
    })
    show.addEventListener("mouseup",function(){
        let pass = document.getElementById("pass");
        pass.setAttribute('type','password');
        show.classList.remove('fas fa-eye')
        show.classList.add('fas fa-eye-slash')
        
    })
})