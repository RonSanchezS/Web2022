var datos = [];

function insertarDatos() {
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
    var e = document.getElementById("selection");
    var strUser = e.options[e.selectedIndex].text
    //En este pedazo de codigo se hace la consulta
    $queryString = "SELECT COLUMN_NAME, EXTRA, COLUMN_TYPE FROM INFORMATION_SCHEMA. COLUMNS WHERE table_schema = 'electrondb' AND table_name = '" + strUser + "'";
    var divPadre = document.getElementById("divCrear");
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
            result.forEach(function (v) {
                if (v.EXTRA) {
                    html += `<input type="text" name="" placeholder="${v.COLUMN_NAME}" class = "inputsGenerados" disabled>`
                } else {
                    if (v.COLUMN_TYPE == "int") {
                        html += `<input type="number" name="" placeholder="${v.COLUMN_NAME}" class = "inputsGenerados">`
                    } else if (v.COLUMN_TYPE == "date") {
                        html += `<input type="date" name="" placeholder="${v.COLUMN_NAME}" class = "inputsGenerados">`
                    } else {
                        html += `<input type="text" name="" placeholder="${v.COLUMN_NAME}" class = "inputsGenerados">`
                    }
                }
                console.log(v)

            }

            );
            html += `<button type="button" onClick="IngresarDatosEnBD()" id="btnVerificar">Click Me!</button>`;
            divPadre.innerHTML = (html);

        }

    });

    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });

}
function modificarbtnVerificar() {
    let boton = document.getElementById("btnVerificar");
    if (numero == 1) {
        boton.style.backgroundColor(rgb(0, 255, 255));
    } else {
        boton.style.backgroundColor(rgb(255, 255, 255));

    }
}
function IngresarDatosEnBD() {
    datos = [];
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
    var divPadre = document.getElementById("divCrear");
    var e = document.getElementById("selection");
    var strUser = e.options[e.selectedIndex].text
    $queryString2 = "SELECT DATA_TYPE, EXTRA FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'electrondb' AND table_name = '" + strUser + "'";

    connection.query($queryString2, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach(function (v) {
                console.log(v)
                if (v.EXTRA) {
                    datos.push("AUTOINCREMENT")
                } else {
                    datos.push(v.DATA_TYPE)
                }
            }
            );
        }

    });



    ////////////////////////////////

    $queryString = "";



    ////////////////////////////////




    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });

}
function mostrarConsulta() {
    var divPadre = document.getElementById("divCrear");
    var e = document.getElementById("selection");
    var strUser = e.options[e.selectedIndex].text
    let maximoElementos = (divPadre.childNodes.length - 1);
    let consulta = "INSERT INTO " + strUser + " values (";
    let separador = "";
    for (var i = 0; i < maximoElementos; i++) {

        if (datos[i] == "AUTOINCREMENT") {
            consulta += separador + "default";
        } else if (datos[i] === "int") {
            consulta += separador + divPadre.childNodes[i].value;
        } else {
            consulta += separador + "'" + divPadre.childNodes[i].value + "'";
        }
        console.log((divPadre.childNodes[i].textContent));
        separador = ","


    }
    consulta += ")";
    realizarInsert(consulta);
}
function realizarInsert(consulta) {
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
    $queryString = consulta;

    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            alert("Se ingreso con exito la balanza")
        }

    });
    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });
}
//////////////////////////////
