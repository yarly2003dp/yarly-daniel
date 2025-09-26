 function mostrar() {
            constvalor=document.getElementById("textoinput").value;
            document.getElementById("resultado").innerText=valor;
        }

        let clics = 0;
        function contarClics() {
            clics++;
            document.getElementById("contador").innerText="clics"+clics;
        }

        function agregarparrafo() {
            let texto = document.getElementById("nuevotexto").value;
            let p = document.getElementById("p");
            p.innerText = texto;
            document.getElementById("contenedor").appendChild(p);
        }

        let tam =24;
        function agrandar() {
            tam +=5;
            document.getElementById("titulo").style.fontSize = tam + "px"
        }

