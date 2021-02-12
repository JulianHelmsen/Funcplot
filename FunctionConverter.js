

function convertToFunction(xValue, funcText){
	let y = funcText;
	
	let repeat = false;
	
		if(y.includes("x") ){
			y = y.replace("x", xValue);
			repeat = true;
		}	
		
		if(y.includes("sin") ){
			y = y.replace("sin", "Math.sin");
			repeat = true;
		}

		if(y.includes("cos") ){
			y = y.replace("cos", "Math.cos");
			repeat = true;
		}
		
		if(y.includes("tan") ){
			y = y.replace("tan", "Math.tan");
			repeat = true;
		}
		
		if(repeat){
			convertToFunction(xValue, y);
		}	
	
	return eval(y);
}

function testConverter(xValue, funcText){

	let y = eval (convertToFunction(xValue, funcText) );
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}