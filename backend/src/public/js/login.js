import { iniciarTema, toggleTema } from "../../../../frontend/js/utils";

iniciarTema();

const btnAccesoRapido = document.getElementById('btnAccesoRapido');
const inputCorreo = document.getElementById('correo');
const inputContrasenia = document.getElementById('contrasenia');
const btnTema = document.getElementById('btnTema');

btnTema.addEventListener('click', toggleTema);

btnAccesoRapido.addEventListener('click', () => {
    inputCorreo.value = 'admin@nextplay.com';
    inputContrasenia.value = 'admin123';
});