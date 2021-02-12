

function convertToFunction(funcText){
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
    return funcText;
}

function testConverter(xValue, funcText){

	let y = convertToFunction(funcText) ;
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}