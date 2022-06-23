function cargarLista() {
    var mysql = require("mysql");
    //aqui se crea la conexion
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "webPerks"
    });
    //En este pedazo de codigo se conecta a la base de datos
    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }

    });

    //En este pedazo de codigo se hace la consulta
    $queryString = 'SELECT * FROM datos order by idDato asc';
    var ul = document.getElementById("lista");
    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre

            var html = "";

            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach(function (v) {
                html = `<li class="elementoLista" onclick="goToReact()"><a href="https://www.electronjs.org/">${v.nombreDato}</a></li>`,
                    ul.innerHTML += (html);
            }

            );
        }

    });


    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });

}
function goToReact() {
    window.location.href = "https://www.electronjs.org/";

}

