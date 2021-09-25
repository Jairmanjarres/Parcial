var nuevoId;
var db = openDatabase("itemDB", "1.0", "itemDB", 65535)

function limpiar() {
    document.getElementById("empleados").value = "";
    document.getElementById("sueldo").value = "";
}
function eliminarRegistro() {
    $(document).one('click', 'button[type="button"]', function (event) {
        let id = this.id;
        var lista = [];
        $("#listaEmpleados").each(function () {
            var celdas = $(this).find('tr.Reg_' + id);
            celdas.each(function () {
                var registro = $(this).find('span.mid');
                registro.each(function () {
                    lista.push($(this).html())
                });
            });
        });
        nuevoId = lista[0].substr(1);
        
        db.transaction(function (transaction) {
            var sql = "borrar=" + nuevoId + ";"
            transaction.executeSql(sql, undefined, function () {
                alert("Registro borrado satisfactoriamente, Por favor actualice la tabla")
            }, function (transaction, err) {
                alert(err.message);
            })
        })
    });
}
function editar(){
    $(document).one('click','button[type="button"]', function(event){
    let id=this.id;
    var lista=[];
    $("#listaProductos").each(function(){
        var celdas=$(this).find('tr.Reg_'+id);
        celdas.each(function(){
            var registro=$(this).find('span');
            registro.each(function(){
                lista.push($(this).html())
            });
        });
    });
    document.getElementById("empleado").value=lista[1];
    document.getElementById("sueldo").value=lista[2].slice(0,-5);
    nuevoId=lista[0].substr(1);
})
}
$(function(){
    //cerar la tabla de productos
    $("#crear").cclick(function(){
        db.transaction(function(transaction){
            var sql="CREATE TABLA productos"+
            "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
            "empleado VARCHAR(100) NOT NULL,"+
            "sueldo DECIMAL(10,2) NOT NULL)";
            transaction.executeSql(sql,undefined, function(){
                alert("tabla creada sastifactoriamente");
            },function(transaction, err){
                alert(err.massage);
            })
        });
    });
    //recibe los datos 
    $("#listar").click(function(){
        cargardatos();
    })
    //funcion para cargar lista y mostrar tabla
    function cargardatos(){
        $("#listaEmpleados").children().remove();
        db.transaction(function(transaction){
            var sql="SELECT * FROM empleados ORDER BY id DESC";
            transaction.executeSql(sql,undefined, function(transaction,result){
                if(result.rows.length){
                    $("#listaEmpleados").append('<tr><th>Código</th><th>Empleado</th><th>Sueldo</th><th></th><th></th></tr>');

                    for(var i=0;i<result.rows.length; i++){
                        var row=result.rows.sueldo(i);
                        var sueldo=row.sueldo;
                        var id=row.id;
                        var sueldo=row.sueldo;
                        $("#listaEmpleados").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span class="mid">A'+
                        id+'</span></td><td><span>'+sueldo+'</span></td><td><span>'+
                        sueldo+' Pesos</span></td><td><button type="button" id="A'+id+'" class="btn btn-success" onclick="editar()"><img src="libs/img/edit.png" /></button></td><td><button type="button" id="A'+id+'" class="btn btn-danger" onclick="eliminarRegistro()"><img src="libs/img/delete.png" /></button></td></tr>');
                    }
                }else{
                    $("#listaEmpleados").append('<tr><td colspan="5" align="center">No existen registros de productos</td></tr>');

                }
            },function(transaction,err){
                alert(err.message);
            })
        })
    }
})

$("#modificar").click(function(){
	var nempleado=$("#empleado").val();
	var nsueldo=$("#sueldo").val();
	db.transaction(function(transaction){
		var sql="UPDATE productos SET empleado='"+nempleado+"', sueldo='"+nsueldo+"' WHERE id="+nuevoId+";"
		transaction.executeSql(sql,undefined,function(){
			cargarDatos();
			limpiar();
		}, function(transaction, err){
			alert(err.message)
		})
    })
})
