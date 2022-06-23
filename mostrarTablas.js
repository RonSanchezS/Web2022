function obtenerTablas() {


    var mysql = require("mysql");
    //aqui se crea la conexion
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "electrondb"
    });
    //En este pedazo de codigo se conecta a la base de datos
    connection.connect(function (err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }

    });

    //En este pedazo de codigo se hace la consulta
    $queryString = "show tables";
    var divPadre = document.getElementById("selection");
    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre

            var html = "";
            divPadre.innerHTML = html;
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            let i = 0;
            result.forEach(function (v) {
                i++;
                console.log(v),
                    html += `<option value="opcion${i}">${v.Tables_in_electrondb}</option>`
            }

            );
            divPadre.innerHTML = (html);

        }

    });


    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });
}