//----------------------------------------------MODAL-----------------------------------------------//
//const { css } = require("jquery");//

let cerrar = $(".cerrar");
let abrir = $(".accion");
let modal = $(".modal");
let modalContainer = $(".modalContainer");

$(abrir).on("click", function(e){
    e.preventDefault();
    $(modalContainer).css("opacity", "1");
    $(modalContainer).css("visibility", "visible");
    $(modal).toggleClass("modalCerrar");
})

$(cerrar).on("click", function(){
    $(modal).toggleClass("modalCerrar");
    setTimeout(function(){
        $(modalContainer).css("opacity", "0");
        $(modalContainer).css("visibility", "hidden");
    },850)
})

$(window).on("click", function(e){
    console.log(e.target)
    if(e.target == modalContainer){
    $(modal).toggleClass("modalCerrar");
    setTimeout(function(){
        $(modalContainer).css("opacity", "0");
        $(modalContainer).css("visibility", "hidden");
    },850)
    }
})

//----------------------------------------------LOGIN MODAL-----------------------------------------------//

let loginCerrar = document.querySelectorAll(".loginCerrar")[0];
let loginAbrir = document.querySelectorAll(".loginAccion")[0];
let loginModal = document.querySelectorAll(".loginModal")[0];
let loginModalContainer = document.querySelectorAll(".loginModalContainer")[0];

loginAbrir.addEventListener("click", function(e){
    e.preventDefault();
    loginModalContainer.style.opacity = "1";
    loginModalContainer.style.visibility = "visible";
    loginModal.classList.toggle("loginModalCerrar")
})

loginCerrar.addEventListener("click", function(){
    loginModal.classList.toggle("loginModalCerrar");
    setTimeout(function(){
        loginModalContainer.style.opacity = "0";
        loginModalContainer.style.visibility = "hidden";
    },850)
})

window.addEventListener("click", function(e){
    console.log(e.target)
    if(e.target == loginModalContainer){
    loginModal.classList.toggle("loginModalCerrar");
    setTimeout(function(){
        loginModalContainer.style.opacity = "0";
        loginModalContainer.style.visibility = "hidden";
    },850)
    }
})

//----------------------------------------------DARK/LIGHTMODE-----------------------------------------------//

const btnswitch = $('#dlbtn');

$(btnswitch).on('click', () => {
    $(document.body).toggleClass('dark');
    $(btnswitch).toggleClass('active');
})

//----------------------------------------------LOGIN/REGISTER-----------------------------------------------//

const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', function(event){
    event.preventDefault();
    let users = Array(
        {
            usuario: username.value,
            contraseña: password.value
        }
    );
    localStorage.setItem('user',JSON.stringify(users));
    location.href = 'index.html';
})

const usernav = document.getElementById('usernav');
const close = document.getElementById('close');

let nameuser = JSON.parse(localStorage.getItem('user'));

if(nameuser != null){
    usernav.innerHTML = '<p class="userName" id="close"> Bienvenido, '+nameuser[0].usuario+'</p>';

}
close.addEventListener('click', function(){
    localStorage.clear('user');
    location.href = 'index.html';
})













