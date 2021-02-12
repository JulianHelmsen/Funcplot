
function convertToFunction(funcText){
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
    funcText = funcText.replaceAll("round", "Math.round");
	funcText = funcText.replaceAll("floor", "Math.floor");
	funcText = funcText.replaceAll("ceil", "Math.ceil");
	funcText = funcText.replaceAll("pi", "Math.PI");
	funcText = funcText.replaceAll("e", "Math.E");
	funcText = funcText.replaceAll("log", "Math.log");
	funcText = funcText.replaceAll("sqrt", "Math.sqrt");
	funcText = funcText.replaceAll("pow", "Math.pow");
	funcText = funcText.replaceAll("min", "Math.min");
    return funcText;

}

function Expression(expression) {
	this.expression = convertToFunction(expression);

	this.evaluate = function(x) {
		let expression = this.expression.replaceAll("x", "" + x);
		return eval(expression);
	}
}


function testConverter(funcText){
	
	let points = calculateFunction(-10, 10, funcText);
	
	let y = "";
	
	for(let p in points){
		y += "P( " + p + " / " + p  +" )";
	}
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}