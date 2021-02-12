
function convertToFunction(funcText){
    funcText = funcText.replaceAll("sin", "Math.sin");
    funcText = funcText.replaceAll("cos", "Math.cos");
    funcText = funcText.replaceAll("tan", "Math.tan");
    return funcText;

}

function calculateFunction(xmin, xmax, funcText){
	let xdelta = xmax - xmin;
	let point = {x:0, y:0};
	let pointList = {point, };
	
	let xValue = 0.0;
	let precision = 1000;
	
	for(let i = 0; i < precision; i++ ){
		
		xValue = i * xdelta / precision + xmin;
		yValue = convertToFunction(funcText).replaceAll("x", xValue);
		
		point.x = xValue;
		point.y = eval(yValue);
	

		pointList[i] = point;
		window.alert(pointList[i].x + "/" + pointList[i].y);
	}
	
	return pointList;
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