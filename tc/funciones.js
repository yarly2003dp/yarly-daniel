//sintaxix de una funcion
//partes
//funcion-> palabra reservada
//nombre de la funcion: ->identificador de la funcion 
//(parametros)-> variables que trecibe la funcion 
//cuerpos{}- instrucciones a ejecutar 
//return -> valor a devolver


//funcion sin parametros
function saludo() {
    console.log("hola bienvenido a este modulo")
    //alert("hola bienvenido a este modulo")
    
}
//llamado de la funcion
saludo();

//funcion con parametros

function suma(a, b) {
    return a+b;
}

console.log(suma(10,5))


//ejemplo
//declarar una funcion que calcule el area de untriangulo

function areaTriangulo(b,h) {
    return (b*h)/2
}
console.log(areaTriangulo(5,7))

//ejercicio declarar una funcion calcule el cuadro solicitando el valor

//paso1; declaracion
function calcularCuadro() {
    //solicito el valor
    let numero=number(prompt("ingresa un valor:"));
    //calcular
    let resultado=numero**2;
    //mostrar resultado
    console.log("el cuadrado de" + numero + "es" + resultado)
}
//llamar la funcion
calcularCuadro();

function calCuadrado() {
    let numero=number(prompt("ingresar un valor"));
    return numero**2;
}
let result=calCuadrado()
console.log("el resultado: " + resul) 

//funcion anonima

const res= funcion (a,b) 
    return a-b

alert(res(10,4))

//funcion flech
const multiplicacion= (a,b)=> a*b
console.log(multiplicacion(4,3))

//funciones flechas sin parametro

const mensaje=()=>alert("hoy es un dia maravilloso para aprender")