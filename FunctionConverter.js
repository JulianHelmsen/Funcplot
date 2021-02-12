

function convertToFunction(xValue, funcText){
    funcText = funcText.replaceAll("x", xValue);
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
    return funcText;
}

function testConverter(xValue, funcText){

	let y = eval (convertToFunction(xValue, funcText) );
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}