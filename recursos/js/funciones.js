var nuevoId;
var db = openDatabase("itemDB", "1.0", "itemDB", 65535)

function limpiar() {
    document.getElementById("item").value = "";
    document.getElementById("contacto").value = "";
}
function eliminarRegistro() {
    $(document).one('click', 'button[type="button"]', function (event) {
        let id = this.id;
        var lista = [];
        $("#listaCliente").each(function () {
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
    document.getElementById("item").value=lista[1];
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
            "item VARCHAR(100) NOT NULL,"+
            "precio DECIMAL(5,2) NOT NULL)";
            transaction.executeSql(sql,undefined, function(){
                alert("tabla creada sastifactoriamente");
            },function(transaction, err){
                alert(err.massage);
            })
        });
    });
    
})