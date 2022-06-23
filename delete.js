function obtenerTabla4() {
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
    var divPadre = document.getElementById("selectTable4");
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
function poblarTablaUpdate() {
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
    var e = document.getElementById("selectTable4");
    var strUser = e.options[e.selectedIndex].text;
    var inputPK = document.getElementById("llavePrimaria");
    //En este pedazo de codigo se hace la consulta
    let datos = [];
    $queryString = "SELECT COLUMN_NAME, COLUMN_KEY, COLUMN_TYPE FROM INFORMATION_SCHEMA. COLUMNS WHERE table_schema = 'electrondb' AND table_name = '" + strUser + "'";

    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre        
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            let tabla = document.getElementById("tablaActualizar2");
            let div = document.getElementById("camposParaUpdate");
            let htmlUpdate = "";
            div.innerHTML = htmlUpdate;
            let html = "";
            let i = 0;
            html += `<tr>`;
            result.forEach(function (v) {
                console.log(v);
                if (v.COLUMN_KEY == "PRI") {
                    inputPK.value = v.COLUMN_NAME;
                }
                htmlUpdate += `<input type="text" value=${v.COLUMN_NAME} id="${v.COLUMN_TYPE}" disabled>`;

                datos.push(v.COLUMN_NAME);
                html += `<td>${v.COLUMN_NAME}</td>`;
            }

            );
            html += `</tr>`;
            console.log("DATOS RECIBIDOS");
            console.log(datos);
            tabla.innerHTML = html;
            div.innerHTML = htmlUpdate;
        }

    });
    $queryString = "SELECT * FROM " + strUser;

    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos
            var padre = document.getElementById("tablaActualizar2");
            let html = padre.innerHTML;
            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre        
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            result.forEach(function (v) {
                html += `<tr>`;
                var seleccionDeTabla = strUser;
                console.log(v);
                for (var prop in v) {
                    html += `<td>${v[prop]}</td>`;
                    //  alert(v[prop])
                }

                html += `<td><button onClick="editarDato(${v[Object.keys(v)[0]]})">Editar</button></td>`;
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
function editarDato(objeto) {
    insertarCarta(objeto);
    for (var prop in objeto) {
    }
}
function mostrarCampos() {

}
function insertarCarta(objeto) {
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


    var inputPK = document.getElementById("llavePrimaria").value;

    var divPadre = document.getElementById("contenedorCarta");
    divPadre.innerHTML = `<div id="card"></div>`;
    var e = document.getElementById("selectTable4");
    var strUser = e.options[e.selectedIndex].text

    var carta = document.getElementById("card");

    $queryString = "SELECT * FROM " + strUser + " WHERE " + inputPK + "= " + objeto;
    connection.query($queryString, function (err, rows, fields) {
        if (err) {
            console.log("error: " + err);
        } else {
            //creamos los nodos

            //Seleccionamos el elemento padre
            //Agregamos los nodos al elemento padre        
            console.log("success");
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            let html = "";
            html += `<tr>`;
            result.forEach(function (v) {
                for (var prop in v) {
                    html += `<input type="text" value="${v[prop]}"></input>`;
                    //  alert(v[prop])
                }
            }

            );
            html += `<button id="btnUpdate" onClick="actualizacion()">Aceptar</button>`;
            carta.innerHTML = html;
        }

    });



    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
    });
}
function realizarInsert(consulta) {

}
function actualizacion(consulta) {
    //
    var e = document.getElementById("selectTable4");
    var strUser = e.options[e.selectedIndex].text;

    //Primero obtenemos la carta
    var carta = document.getElementById("card");

    //guardamos el ID a actualizar
    let idActualizacion = carta.firstChild;

    let maximoElementosCarta = (carta.childNodes.length - 1);

    let separador = "";

    var camposParaUpdate = document.getElementById("camposParaUpdate")
    let maximoElementosCampos = (camposParaUpdate.childNodes.length);
    var consulta = `UPDATE ${strUser} set `;
    for (var i = 0; i < maximoElementosCampos; i++) {
        if (camposParaUpdate.childNodes[i].id == "int") {
            consulta += `${separador}${camposParaUpdate.childNodes[i].value} = ${carta.childNodes[i].value}`;

        } else {
            consulta += `${separador}${camposParaUpdate.childNodes[i].value} = "${carta.childNodes[i].value}"`;

        }
        separador = ", ";
    }
    consulta += ` where ${camposParaUpdate.childNodes[0].value} = ${idActualizacion.value}`;
    console.log(consulta);
    actualizar(consulta);

}
function actualizar(consulta) {
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
            console.log("success");
            alert("Se ha realizado un UPDATE con exito");
        }
    });
    //En este pedazo de codigo se cierra la conexion
    connection.end(() => {
        console.log("connection closed");
        var carta = document.getElementById("card");
        for (var i = 0; i < carta.childElementCount; i++) {
            carta.childNodes[i].value = "";
        }

    });
}