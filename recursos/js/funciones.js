var nuevoId;
var db = openDatabase("itemDB", "1.0", "empleadosDB", 65538)

    function limpiar() {
    document.getElementById("empleado").value="";
    document.getElementById("sueldo").value="";
    }
    
    $(function(){
        //cerar la tabla de empleados
        $("#crear").click(function(){
            db.transaction(function(transaction){
                var sql="CREATE TABLE empleados "+
                "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
                "empleado VARCHAR(100) NOT NULL,"+
                "sueldo DECIMAL(20,2) NOT NULL)";
                transaction.executeSql(sql,undefined, function(){
                    alert("tabla creada sastifactoriamente");
                }, function(transaction, err){
                    alert(err.message);
                })
            });
        });

 

    $("#registrar").click(function(){
        var empleado=$("#empleado").val();
        var sueldo=$("#sueldo").val();
        db.transaction(function(transaction){
            var sql="INSERT INTO empleados(empleado,sueldo) VALUES(?,?)";
            transaction.executeSql(sql,[empleado,sueldo],function(){			
            }, function(transaction, err){
                alert(err.message);
            })
        })
            limpiar();
            mostrarDatos();
        })

         //inicializa la funcion para recibir los datos 
         $("#mostrar").click(function(){
            mostrarDatos();
        })
    
        //funcion para cargar lista y mostrar tabla
        function mostrarDatos(){
            $("#listaEmpleados").children().remove();
            db.transaction(function(transaction){
                var sql="SELECT * FROM empleados ORDER BY id DESC";
                transaction.executeSql(sql,undefined, function(transaction,result){
                    if(result.rows.length){
                        $("#listaEmpleados").append('<tr><th>Código</th><th>Nombre Empleado</th><th>Sueldo</th><th></th><th></th></tr>');
    
                        for(var i=0;i<result.rows.length; i++){
                            var row=result.rows.item(i);
                            var empleado=row.empleado;
                            var id=row.id;
                            var sueldo=row.sueldo;
                            $("#listaEmpleados").append('<tr id="fila'+id+'" class="Reg_A'+id+'"><td><span class="mid">A'+
                            id+'</span></td><td><span>'+empleado+'</span></td><td><span>'+
                            sueldo+' Pesos$</span></td><td><button type="button" id="A'+id+'" class="btn btn-success" onclick="editar()"><img src="recursos/img/editar.png" /></button></td><td><button type="button" id="A'+id+'" class="btn btn-danger" onclick="eliminarRegistro()"><img src="recursos/img/eliminar.png" /></button></td></tr>');
                        }
                    }else{
                        $("#listaEmpleados").append('<tr><td colspan="5" align="center">No existen registros de empleados</td></tr>');
    
                    }
                },function(transaction,err){
                    alert(err.message);
                })
            })
        }

    




    $("#editar").click(function(){
	var nempleado=$("#empleado").val();
	var nsueldo=$("#sueldo").val();
	db.transaction(function(transaction){
		var sql="UPDATE empleados SET empleado='"+nempleado+"', sueldo='"+nsueldo+"' WHERE id="+nuevoId+";"
		transaction.executeSql(sql,undefined,function(){
			mostrarDatos();
			limpiar();
		}, function(transaction, err){
			alert(err.message)
		})
    })
})  

// Para borrado total
$("#borrarTodo").click(function(){
	if(!confirm("Sguro desea borrar la tabla?, los datos se perderán permanentemente",""))
		return;
	db.transaction(function(transaction){
		var sql="DROP TABLE empleados ";
		transaction.executeSql(sql,undefined,function(){
			alert("Tabla borrada satisfactoriamente, Por favor, actualice la página")
		}, function(transaction, err){
			alert(err.message);
		})
	})
})  
})
function editar(){
    $(document).one('click','button[type="button"]', function(event){
    let id=this.id;
    var lista=[];
    $("#listaEmpleados").each(function(){
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
            var sql = "DELETE FROM empleados WHERE ID=" + nuevoId + ";"
            transaction.executeSql(sql, undefined, function () {
                alert("Registro borrado satisfactoriamente, Por favor actualice la tabla")
            }, function (transaction, err) {
                alert(err.message);
            })
        })
    });
    }