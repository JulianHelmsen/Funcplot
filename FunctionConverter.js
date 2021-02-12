

<<<<<<< HEAD
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
=======
function convertToFunction(funcText){
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
    return funcText;
>>>>>>> b242bd9e40819a85adf301707643caccb140df2d
}

function testConverter(xValue, funcText){

<<<<<<< HEAD
	let y = eval (convertToFunction(xValue, funcText) );
=======
	let y = convertToFunction(funcText) ;
>>>>>>> b242bd9e40819a85adf301707643caccb140df2d
	
	let p = document.getElementById("test");
	p.innerHTML = y;
	
}