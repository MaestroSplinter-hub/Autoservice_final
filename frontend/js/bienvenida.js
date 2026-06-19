import { iniciarTema, toggleTema, guardarNombre, capitalizarNombre } from "./utils.js";

//inicializamos el tema guardado
iniciarTema();

const form = document.getElementById('formBienvenida');
const inputNombre = document.getElementById('inputNombre');
const btnContinuar =document.getElementById('btnContinuar');
const errorNombre = document.getElementById('errorNombre');
const btnTema = document.getElementById('btnTema');
const linkAdmin = document.getElementById('linkAdmin');

btnTema.addEventListener('click', toggleTema);

// panel admin, aun no listo
linkAdmin.addEventListener('click', (e) => {
    e.preventDefault();
    alert('panel admin en trabajo');
});

//habilitar o deshabilitar boton
inputNombre.addEventListener('input', () => {
    const valor = inputNombre.value.trim();
    btnContinuar.disabled = valor.length === 0;
    if (valor.length > 0) {
        errorNombre.classList.remove('visible');
        inputNombre.style.borderColor = '';
    } 
});

//envio form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    if (!nombre) {
        errorNombre.classList.add('visible');
        inputNombre.style.borderColor = '#EF4444';
        inputNombre.focus();
        return;
    }
    guardarNombre(capitalizarNombre(nombre));
    //animacion de boton
    btnContinuar.textContent = 'Cargando...';
    btnContinuar.disabled = true;
    setTimeout(() => {
        window.location.href = 'productos.html';
    }, 400);
});

//enviar form con enter
inputNombre.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
});

window.addEventListener('load', () => {
    inputNombre.focus();
})