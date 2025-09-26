

//ejercicio 1

//ejercicio 2


// ejercicio 3
//si el usuario no escribe nada de nombre 
//mostrar error

let nom=prompt("escribe tu nombre: ")
if (nom) {
    console.log(" el campo no puede estar vacio ")
} else if (nom.length<1) { 
    console.log("el nombre es demaciado corto")
} else{
    console.log("bienvenido" + nom)
}
let tipo_identificacion=prompt("por favor seleccione una opcion: 1;cc, 2;ti, 3;pasaporte")

if(tipo_identificacion==="1"){
    if (identificacion){
        console.log("el campo esta vacio")
    } else if (identificacion.length < 7){
        console.log("numero no valido, por favor vuelve a ingresar")
    } else {
        console.log("felicidades registro completado")
    }
} else if(tipo_identificacion==="2"){
    if (identificacion){
        console.log("el campo esta vacio")
    } else if (identificacion.length<10){
        console.log("numero no valido, por favor vuelva a ingresar ")
        }else{
            console.log("felicidades regitro completado")
        }
}else if(tipo_identificacion==="3"){
    if (identificacion){
        console.log("el campo esta vacio")
    } else if (identificacion.length<10){
        console.log("numero no valido, por favor vuelva a ingresar ")
        }else{
            console.log("felicidades regitro completado")
        }
}        