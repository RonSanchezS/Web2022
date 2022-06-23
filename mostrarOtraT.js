function obtenerTabla2() {


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
    var divPadre = document.getElementById("selectTable");
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
var numeroColumnas = 0;
function poblarTabla() {
    numeroColumnas = 0;
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
    var e = document.getElementById("selectTable");
    var strUser = e.options[e.selectedIndex].text
    //En este pedazo de codigo se hace la consulta
    $queryString = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA. COLUMNS WHERE table_schema = 'electrondb' AND table_name = '" + strUser + "'";

    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre        
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            let tabla = document.getElementById("tablaLeer");
            let html = "";
            let i = 0;
            html += `<tr>`;
            result.forEach(function (v) {
                i++;
                console.log(v),
                    html += `<td>${v.COLUMN_NAME}</td>`;
                numeroColumnas++;
            }

            );
            html += `</tr>`;
            html += `<tr>`;

            html += `</tr>`;
            tabla.innerHTML = html;
        }

    });
    $queryString = "SELECT * FROM "+strUser;

    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos
            var padre = document.getElementById("tablaLeer");
            let html = padre.innerHTML;
            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre        
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach(function (v) {
                html += `<tr>`;

                console.log(v);
                for (var prop in v) {
                    html += `<td>${v[prop]}</td>`;
                    //  alert(v[prop])
                }
                html += `</tr>`;
                //alert(v[Object.keys(v)[index]]);
            }
            ); padre.innerHTML = html;

        }

    });




    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });
}