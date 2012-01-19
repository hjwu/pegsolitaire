var space = 20, pegSize = 50;
var shapeSize = 0;
var Peg = new Array();
var bgWidth = 650; bgHeight = 650;
var cx = 0, cy = 0;
var levelmax = 21;

function changeLevel(step){ //設定各種 board	
	wantPlay = wantPlay + step;
	if (wantPlay < 0) wantPlay = 0;
	else if (wantPlay > levelmax) wantPlay = levelmax;
	document.getElementById("leveltxt").innerHTML = "Level " + (wantPlay+1).toString();
	switch (wantPlay){	
		case 0: boardShape = "L"; break;
		case 1: boardShape = "Hoe"; break;
		case 2: boardShape = "Ax"; break;
		case 3: boardShape = "Cross"; break;
		case 4: boardShape = "Brench"; break;
		case 5: boardShape = "Snake"; break;
		case 6: boardShape = "Plus"; break;
		case 7: boardShape = "Bow"; break;
		case 8: boardShape = "Ring"; break;
		case 9: boardShape = "Circle"; break;
		case 10: boardShape = "English"; break;
		case 11: boardShape = "French"; break;
		case 12: boardShape = "Wiegleb"; break;
		case 13: boardShape = "3-3-2-2"; break;
//		case 114: boardShape = "Triangle"; break;
		case 14: boardShape = "Diamond1"; break;
		case 15: boardShape = "Diamond2"; break;		
		case 16: boardShape = "Fireplace"; break;
		case 17: boardShape = "Arrow"; break;
		case 18: boardShape = "Pyramid"; break;
		case 19: boardShape = "Chevron"; break;
		case 20: boardShape = "Square"; break;
		case 21: boardShape = "Windmill"; break;
	}
	resetBoard();
	rank();
}

function loadBackground(){
	canvas = document.getElementById('psGame');
	ctx = canvas.getContext('2d');
	var bgImg = new Image();
	bgImg.onload = function(){ctx.drawImage(bgImg, 0, 0);}
	bgImg.src = "icon/wood.png";
	return true;
}
//選擇你要的 board 
function setBoard(boardShape, reset){
	if (reset) {
		switch (boardShape){
			case "L":
				shapeSize = 3;				
				Peg[0] = [2,2,2];
				Peg[1] = [1,1,1];
				Peg[2] = [2,2,1];
			break;
			case "Hoe":
				shapeSize = 4;
				Peg[0] = [2,2,1,2];
				Peg[1] = [2,1,2,2];
				Peg[2] = [1,2,2,2];
				Peg[3] = [2,1,1,2];
			break;
			case "Ax":
				shapeSize = 3;
				Peg[0] = [2,2,2];
				Peg[1] = [1,1,1];
				Peg[2] = [1,1,2];
			break;	
			case "Cross":
				shapeSize = 5;
				for (var i=0; i<shapeSize; i++){
					if (i==2) Peg[i] = [1,1,1,1,2];
					else if (i==1 || i==3) Peg[i] = [2,1,2,2,2];
					else Peg[i] = [2,2,2,2,2]; }
			break;					
			case "Brench":
				shapeSize = 4;
				Peg[0] = [2,1,2,2];
				Peg[1] = [2,1,1,1];
				Peg[2] = [1,2,1,2];
				Peg[3] = [2,2,2,2];
			break;
			case "Snake":
				shapeSize = 5;
				Peg[0] = [0,2,2,2,0];
				Peg[1] = [2,1,2,2,1];
				Peg[2] = [1,2,2,1,2];
				Peg[3] = [2,1,2,1,2];
				Peg[4] = [0,2,1,2,0];
			break;			
			case "Plus":
				shapeSize = 7;
				for (var i=0; i< shapeSize; i++) {
					if (i==3) Peg[i] = [2,1,1,1,1,1,2];
					else if (i==2 || i==4) Peg[i] = [2,2,2,1,2,2,2];
					else if (i==1 || i==5) Peg[i] = [0,0,2,1,2,0,0];
					else Peg[i] = [0,0,2,2,2,0,0]; }
			break;
			case "Bow":
				shapeSize = 5;
				for (var i=0; i<shapeSize; i++){
					if (i==2) Peg[i] = [2,2,2,1,1];
					else if (i==1 || i==3) Peg[i] = [2,2,1,1,2];
					else Peg[i] = [2,2,1,0,0];}
			break;		
			case "Ring":
				shapeSize = 7;
				for (var i=0; i< shapeSize; i++) {
					if (i==3) Peg[i] = [2,1,2,2,2,1,2];
					else if (i==2 || i==4) Peg[i] = [2,1,1,2,1,1,2];
					else if (i==1 || i==5) Peg[i] = [0,0,1,1,1,0,0];
					else Peg[i] = [0,0,2,2,2,0,0]; }
			break;
			case "Circle":
				shapeSize = 7;
				for (var i=0; i< shapeSize; i++) {
					if (i==3) Peg[i] = [2,1,1,2,1,1,2];
					else if (i==2 || i==4) Peg[i] = [2,1,1,1,1,1,2];
					else if (i==1 || i==5) Peg[i] = [0,0,1,1,1,0,0];
					else Peg[i] = [0,0,2,2,2,0,0]; }
			break;						
			case "English":
				shapeSize = 7;
				for (var i=0; i< shapeSize; i++) {
					if (i==2 || i==4) Peg[i] = [1,1,1,1,1,1,1];
					else if (i==3) Peg[i] = [1,1,1,2,1,1,1];
					else Peg[i] = [0,0,1,1,1,0,0];}
			break;			
			case "French":
				shapeSize = 7;
				for (var i=0; i< shapeSize; i++) {
					if (i==0 || i==6) Peg[i] = [0,0,1,1,1,0,0];
					else if (i==1 || i==5) Peg[i] = [0,1,1,1,1,1,0];
					else if (i==2 || i==4) Peg[i] = [1,1,1,1,1,1,1];				
					else if (i==3) Peg[i] = [1,1,2,1,1,1,1];}
			break;
			case "Wiegleb": //J.C. Wiegleb
				shapeSize = 9;
				for (var i=0; i< shapeSize; i++) {
					if (i==3 || i==5) Peg[i] = [1,1,1,1,1,1,1,1,1];
					else if (i==4) Peg[i] = [1,1,1,1,2,1,1,1,1];
					else Peg[i] = [0,0,0,1,1,1,0,0,0];}
			break;
			case "3-3-2-2":
				shapeSize = 8;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [1,1,1,1,2,1,1,1];
					else if (i==2 || i==4) Peg[i] = [1,1,1,1,1,1,1,1];
					else Peg[i] = [2,2,2,1,1,1,2,2];}
			break;/*
			case "Triangle":
				shapeSize = 5;
				Peg[0] = [0,0,0,0,1];
				Peg[1] = [0,0,0,1,1];
				Peg[2] = [0,0,1,1,1];
				Peg[3] = [0,1,1,1,1];
				Peg[4] = [2,1,1,1,1];																
			break;*/
			case "Diamond1":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [2,1,1,2,1,1,2];
					else if (i==2 || i==4) Peg[i] = [2,2,1,1,1,2,2];
					else if (i==1 || i==5) Peg[i] = [2,2,2,1,2,2,2];
					else Peg[i] = [2,2,2,2,2,2,2];}
			break;
			case "Diamond2":
				shapeSize = 9;
				for (var i=0; i<shapeSize; i++){
					if (i==4) Peg[i] = [1,1,1,1,2,1,1,1,1];
					else if (i==3 || i==5) Peg[i] = [2,1,1,1,1,1,1,1,2];
					else if (i==2 || i==6) Peg[i] = [2,2,1,1,1,1,1,2,2];
					else if (i==1 || i==7) Peg[i] = [2,2,2,1,1,1,2,2,2];
					else Peg[i] = [2,2,2,2,1,2,2,2,2];}
			break;
			case "Fireplace":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [1,1,1,2,2,2,2];
					else if (i==2 || i==4) Peg[i] = [1,1,1,1,2,2,2];
					else Peg[i] = [0,0,2,2,2,0,0];}
			break;
			case "Arrow":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [1,1,1,1,1,1,1];
					else if (i==2 || i==4) Peg[i] = [2,1,1,2,2,1,1];
					else if (i==1 || i==5) Peg[i] = [0,0,1,2,2,0,0];
					else Peg[i] = [0,0,2,2,2,0,0];}
			break;
			case "Pyramid":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [2,1,1,1,1,2,2];
					else if (i==2 || i==4) Peg[i] = [2,2,1,1,1,2,2];
					else if (i==1 || i==5) Peg[i] = [0,0,2,1,1,0,0];
					else Peg[i] = [0,0,2,2,1,0,0];}
			break;
			case "Chevron":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
					if (i==3) Peg[i] = [1,1,1,1,2,2,2];
					else if (i==2 || i==4) Peg[i] = [2,2,1,1,1,2,2];
					else if (i==1 || i==5) Peg[i] = [0,2,2,1,1,1,0];
					else Peg[i] = [0,0,2,2,2,0,0];}
			break;
			case "Square":
				shapeSize = 5;
				for (var i=0; i< shapeSize; i++) {
					if (i==2) Peg[i] = [1,1,1,2,1];
					else Peg[i] = [1,1,1,1,1]; }
			break;			
			case "Windmill":
				shapeSize = 7;
				for (var i=0; i<shapeSize; i++){
				 	if (i==0||i==1) Peg[i] = [0,0,1,1,2,0,0];
				 	else if (i==5||i==6) Peg[i] = [0,0,2,1,1,0,0];
				 	else if (i==2) Peg[i] = [2,2,1,1,1,1,1];
				 	else if (i==4) Peg[i] = [1,1,1,1,1,2,2];
				 	else Peg[i] = [1,1,1,1,1,1,1];}
			break;						
		}

		if (shapeSize%2==0) { cx = (bgWidth+space)/2; cy = (bgHeight+pegSize)/2; }
		else { cx = (bgWidth-pegSize)/2; cy = (bgHeight-pegSize)/2; }
	}
	loadBackground();
	for (var i=0; i<shapeSize; i++) for (var j=0; j<shapeSize; j++)	createPeg(Peg[i][j], i, j);
}

//peg type: 0:隱藏; 1:peg; 2:hole; 3:障礙物
function createPeg(type, Ix, Iy){
	canvas = document.getElementById('psGame');
	ctx = canvas.getContext('2d');
	var img = new Image();
	img.onload = function(){ctx.drawImage(img, cx + (Ix - Math.floor(shapeSize/2))*(space+pegSize),  cy + (Iy - Math.floor(shapeSize/2))*(space+pegSize));}
	if (type == 1) img.src = "icon/peg.png";
	else if (type == 2) {
		if (havePick == true && havePut == null && Ix == selectX && Iy == selectY) img.src = "icon/redhole.png";
		else img.src = "icon/hole.png";
	}
}
