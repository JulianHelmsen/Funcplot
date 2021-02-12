
function convertToFunction(funcText){
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
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