import { iniciarTema, toggleTema } from "./utils.js";

iniciarTema();

const btnAccesoRapido = document.getElementById('btnAccesoRapido');
const inputCorreo = document.getElementById('correo');
const inputContrasenia = document.getElementById('contrasenia');
const btnTema = document.getElementById('btnTema');

btnTema.addEventListener('click', toggleTema);

btnAccesoRapido.addEventListener('click', () => {
    // Valores por defecto 
    inputCorreo.value = 'admin@nextplay.com';
    inputContrasenia.value = 'admin123';
});

const btnTema = document.getElementById('btnTema');
const root = document.documentElement;
btnTema.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    root.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
});