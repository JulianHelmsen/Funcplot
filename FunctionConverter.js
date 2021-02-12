

function convertToFunction(xValue, funcText){
	let y = funcText;
	
		if(y.includes("x") ){
			y = y.replace("x", xValue);
		}	
		
		if(y.includes("sin") ){
			y = y.replace("sin", "Math.sin");
		}

		if(y.includes("cos") ){
			y = y.replace("cos", "Math.cos");
		}
		
		if(y.includes("tan") ){
			y = y.replace("tan", "Math.tan");
		}
		
	
	
	
	return eval(y);
}

function testConverter(xValue, funcText){

	let y = eval (convertToFunction(xValue, funcText) );
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}