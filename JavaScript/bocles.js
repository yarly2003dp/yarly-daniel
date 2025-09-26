//for
//for(iniciacion;condicion;incremento){}

for(let i =0;i<=5;i+=2){
    console.log("numero"+ i)
}

//la tabla de multiplicar solicitando un numero

let numero=prompt("ingresa un mumero")
for (let i=; i<=10;i++) {
    let resultado=numero*i
    console.log(numero,"x" , i ,"=",resultado)
    console.log({})
} 

//bucle while
//wile (condicion){}
let contador=1;
while (contador<=3) {
     console.log("contador "+contador);
    contador++; 
}
   
//suma de los primeros 10 numeros
let i=1
let suma=0;
while(i<=10) {
    suma+=i;
    i++;
    console.log(suma)
}
console.log("las suma es: ,")

//do while
//sintaxis do{}while();
let num=5;
do{
    console.log("el numero es: "+ num);
    num --
}while(num>0)

 let opcion;

do {
    opcion=prompt("escoja una opcion : 1:saludar, 2:despedir,")
    if (opcion=="1"){
        console.log("hola bienvenido ")
    }
    

}