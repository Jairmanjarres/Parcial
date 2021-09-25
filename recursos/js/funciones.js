var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB", 65535)

function limpiar(){
	document.getElementById("item").value="";
	document.getElementById("precio").value="";
 }
 function eliminarRegistro(){
	$(document).one('click','button[type="button"]', function(event){
		let id=this.id;
		var lista=[];
		$("#listaProductos").each(function(){
			var celdas=$(this).find('tr.Reg_'+id);
			celdas.each(function(){
				var registro=$(this).find('span.mid');
				registro.each(function(){
					lista.push($(this).html())
				});
			});
		});