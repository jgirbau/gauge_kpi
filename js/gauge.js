var canvas = document.getElementById("gauge");
var corte1 = canvas.getAttributeNode("data-corte").value;
var corte2 = canvas.getAttributeNode("data-corte2").value;
var valor1 = canvas.getAttributeNode("data-valor").value;
var maxim = canvas.getAttributeNode("data-max").value;
var corte = corte1 / maxim;
var cort2 = corte2 /maxim;
var valor = valor1 / maxim;
var val1 = 0;
var ctx = canvas.getContext("2d");
var radio = canvas.width / 2;
ctx.translate(radio, radio*1.05);
radio = radio * 0.90;
DibujaGauge();
AA = setInterval(DibujaGauge, 20);


// Dibuja el Indicador
function DibujaGauge() {
  FondoGauge(ctx, radio);
  MarcasGauge(ctx, radio);
  Agujas(ctx, radio);
  val1 = val1 + 0.01;
  if (val1 >= valor) {
	val1 = valor;  
	clearInterval(AA);
  };
}

// Dibuja el Fondo y Borde
function FondoGauge(ctx, radio) {
  var grad;
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.arc(0,0,radio*1.02, Math.PI, 2*Math.PI);
  ctx.fillStyle = "#444";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, radio, Math.PI, 2*Math.PI);
  ctx.fillStyle = '#0b3';
  ctx.fill();
  ctx.beginPath();
  ctx.arc( 0, 0, radio, (1+corte) * Math.PI, 2*Math.PI);
  ctx.lineTo(0,0);
  ctx.fillStyle = '#ff0';
  ctx.fill();
  ctx.beginPath();
  ctx.arc( 0, 0, radio, (1+cort2) * Math.PI, 2*Math.PI);
  ctx.lineTo(0,0);
  ctx.fillStyle = '#c00';
  ctx.fill();
  grad = ctx.createLinearGradient(0, 0, 0, radio / 10);
  grad.addColorStop(0, "#666");
  grad.addColorStop(0.5, "#fff");
  grad.addColorStop(1, "#666");
  ctx.fillStyle = grad;
  ctx.fillRect(-radio*1.02, 0, 2.04*radio, radio*0.1);
  ctx.beginPath();
  ctx.arc(0,0, radio / 10, 0, 2*Math.PI);
  ctx.fillStyle = "#777";
  ctx.fill();
}

// Dibuja las Marcas y Texto
function MarcasGauge(ctx, radio) {
  var ang;
  var num;
  ctx.font = radio*0.14 + "px system";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  ctx.fillStyle = "#007";
  ctx.fillText("Indicador KPI", 0, radio*0.32);
  ctx.fillStyle = "#000";
  ctx.fillText("Sistemas400", 0, -radio*0.5);
  ctx.font = radio*0.10 + "px system";
  for(num = 0; num < 11; num++){
    ang = num * Math.PI / 10;
    ctx.rotate(ang);
    ctx.translate(-radio*0.85, 0);
    ctx.rotate(-ang);
    ctx.fillText(parseInt(num * maxim / 10), 0, -radio*0.05);
    ctx.rotate(ang);
    ctx.translate(radio*0.85, 0);
    ctx.rotate(-ang);
	
  }
}

// Dibuja la aguja del Indicador
function Agujas(ctx, radio){
    
    //Mueve la aguja según el valor del indicador
	ang = (1+val1) * Math.PI;
	lon = radio * 0.85;
	ctx.beginPath();
	ctx.strokeStyle = "#8af";
	ctx.lineCap="round";
	ctx.lineWidth = radio*0.05;
	ctx.arc(0, 0, lon, ang, ang);
	ctx.lineTo(0,0);
	ctx.stroke();
	
	// Dibuja el circulo central
	var tras = radio * 0.05;
	grad = ctx.createRadialGradient(tras, -tras, 0, tras,-tras, radio * 0.15);
	grad.addColorStop(0,"#ddd");
	grad.addColorStop(1,"#666");
	ctx.beginPath();
	ctx.arc(0,0, radio * 0.15, 0, 2*Math.PI);
	ctx.fillStyle = grad;
	ctx.fill();
}
