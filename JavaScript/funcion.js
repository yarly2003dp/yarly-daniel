//date()
//1 declara una funcion sin parametros que imprima la fecha actual del sistema 
function fechaActual() {
    alert("hoy")
}

//declarar una funcion con parametros que reciba una nota(0-5,0) y vuelva "aprobado"(>=3,5) o "reprobado"

function EvaluarNota(nota) {
    if(nota>=3,5){
        return "aprovado";
    }else{
        return"reprobado"
    }
    
}

//declarar una funcion flecha, con parametros que reciba un texto y vuelva mayuscula 

const Mayuscula=(texto)=> texto
console.log(mayuscula(texto))


//declara una funcion con parametros dado un numero, devolver "par" o "impar"

function devolver(numero) {
    if(numero %2==0){
        return"par"
    }else{
        return"impar"
    }
    
}