var canvas = null;
var ctx = null; 
var havePick = false, havePut = null;
/****************************************
拿取失敗後 havePick = false / havePut = null 
拿取正確 havePick = true / havePut = null
放下成功 havePick = true / havePut = true
放下失敗 havePick = true / havePut = false
****************************************/
var boardShape = "L";
var reset = true;
var undoX = new Array();
var undoY = new Array();
var wantPlay = 0; //選擇玩的關
var enableLevel = null;　//能玩的關
var selectX = null, selectY = null;
var preX = null, preY = null;
var alertGame = null;
var result = null;

function undo(){ 
	if (havePick && havePut == null) Peg[undoX.pop()][undoY.pop()] = 1; 
	else {
		preX = undoX.pop();
		preY = undoY.pop();
		Peg[preX][preY] = 2; //hole
		var preX2 = undoX.pop();
		var preY2 = undoY.pop();
		Peg[preX2][preY2] = 1; //peg
		Peg[(preX+preX2)/2][(preY+preY2)/2] = 1; //peg
	}	
	setBoard(boardShape, reset);	
}

function resetBoard(){
	loadBackground();
	reset = true;
	setBoard(boardShape, reset);
	reset = false;
	loadLock();
	havePick = false;
	havePut = null;
	result = null;
	undoX.length = 0;
	undoY.length = 0;	
}

function init(){
	rank();
	setBoard(boardShape, reset);
	loadLock();	
	canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
}

function loadLock(){ 
	canvas = document.getElementById('psGame');
	ctx = canvas.getContext('2d');
	if (typeof window.localStorage['enableLevel'] != 'undefined') 
		enableLevel = parseInt(window.localStorage['enableLevel'],10);
	else enableLevel = 0;

	if (wantPlay > enableLevel) { //上鎖
		reset = true; 
		var lockImg = new Image();
		lockImg.onload = function(){ctx.drawImage(lockImg, 0, 0);}
		lockImg.src = "icon/lock.png";
	}
	else reset = false //允許玩;
}

function loadResult(){ 
	setBoard(boardShape, reset);
	if (result != null){
		canvas = document.getElementById('psGame');
		ctx = canvas.getContext('2d');
		var lockImg = new Image();
		lockImg.onload = function(){ctx.drawImage(lockImg, 0, 0);}
		if (result==true) lockImg.src = "icon/cong.png";
		else lockImg.src = "icon/gf.png";
		reset = false;
		result = null;
	}
}

function mouseMove(e){
	if(!reset){
		if (havePick == false && havePut == null){
			selectX = Math.floor((e.offsetX - cx + space/2)/(space+pegSize)) + Math.floor(shapeSize/2);
			selectY = Math.floor((e.offsetY - cy + space/2)/(space+pegSize)) + Math.floor(shapeSize/2);
			if (pickAble(selectX, selectY)) document.body.style.cursor = "move";
			else document.body.style.cursor = "default";
		}
	}
	else document.body.style.cursor = "default";
}

function mouseDown(e){
	if (!reset){		
		selectX = Math.floor((e.offsetX - cx + space/2)/(space+pegSize)) + Math.floor(shapeSize/2);
		selectY = Math.floor((e.offsetY - cy + space/2)/(space+pegSize)) + Math.floor(shapeSize/2);

		if (!havePick) {	
			if(pickAble(selectX, selectY)){
				havePick = true;
				undoX.push(selectX);
				undoY.push(selectY);
			}
			havePut = null;
		}		
		else {
			if(putAble(selectX, selectY)){
				havePut = true;	
				undoX.push(selectX);
				undoY.push(selectY);				
			}
			else havePut = false;	
 		}
	}
}

function mouseUp(e){
	if (!reset){	
	 	if(havePick) {		 		
	 		if (havePut == null){ //拿成功
		 		document.body.style.cursor = "url('icon/peg.png')";
				Peg[selectX][selectY] = 2;
			}
			else {		
				document.body.style.cursor = "default";
				if (havePut){ //放成功
					Peg[selectX][selectY] = 1; 
					Peg[(preX + selectX)/2][(preY + selectY)/2] = 2;

					if (!keepGame(shapeSize)){ //end Game					
						var remains = 0;
						for (var i=0; i< shapeSize; i++) 
							for (var j=0; j < shapeSize; j++) 
								if (Peg[i][j] == 1) remains++;
						if (typeof window.localStorage[boardShape] != 'undefined') 
							window.localStorage[boardShape] = Math.min(window.localStorage[boardShape], remains); 
						else window.localStorage[boardShape] = remains;
						rank();
						if (wantPlay == enableLevel && remains == 1) window.localStorage['enableLevel'] = (enableLevel)+1; //開鎖
						if (remains == 1) result = true;								
						else if (remains > 1) result = false;						
					}
				}
				else Peg[undoX.pop()][undoY.pop()] = 1; //放失敗
				havePut = null;
				havePick = false;
			}			
			loadResult();
	 	}	 	
	}
}

function pickAble(x, y){ //判斷該位置是否可 pick
	if (x > shapeSize-1 || y > shapeSize-1 || x<0 || y<0) return false; //不在範圍內
	else if (Peg[x][y] == 1){
		if ((x>1 && Peg[x-1][y] == 1 && Peg[x-2][y] == 2) ||
			(y>1 && Peg[x][y-1] == 1 && Peg[x][y-2] == 2) ||
			(x<shapeSize-2 && Peg[x+1][y] == 1 && Peg[x+2][y] == 2) ||
			(y<shapeSize-2 && Peg[x][y+1] == 1 && Peg[x][y+2] == 2)) return true;
		else return false;
	}
	else return false;
}

function putAble(x,y){ //判斷該位置是否可 put
	if (x > shapeSize-1 || y > shapeSize-1 || x<0 || y<0) return false; //不在範圍內
	else if (Peg[x][y] == 2){
		preX = undoX[undoX.length-1];
		preY = undoY[undoY.length-1];
		if (boardShape == "Triangle"){ //allow jumpable diagonally and orthogonally
			if (Math.abs(preX-selectX) + Math.abs(preY-selectY) == 1){ 
				if (Peg[(preX+selectX)/2][(preY+selectY)/2] == 1) return true;
				else return false;
			}
			else return false;
		}
		else { //allow jumpable orthogonally
			if ((Math.abs(preX-selectX) == 2 && preY == selectY)||(Math.abs(preY-selectY) == 2 && preX == selectX)){
				if (Peg[(preX+selectX)/2][(preY+selectY)/2] == 1) return true;
				else return false;
			}
			else return false;
		}
	}
	else return false;
}

function rank(){
	var rankImgsrc = null;
	if (typeof window.localStorage[boardShape] == 'undefined') rankImgsrc = "icon/star0.png";
	else{
	 	if (window.localStorage[boardShape] == "1") rankImgsrc = "icon/star5.png";
		else if (window.localStorage[boardShape] == "2") rankImgsrc = "icon/star4.png";
		else if (window.localStorage[boardShape] == "3") rankImgsrc = "icon/star3.png";
		else if (window.localStorage[boardShape] == "4") rankImgsrc = "icon/star2.png";
		else rankImgsrc = "icon/star1.png";
	}
	document.getElementById("rank").setAttribute("src", rankImgsrc);	
}

function keepGame(shapeSize){
	var keep = false;
	for (var x=0; x<shapeSize; x++) { 
		if (keep) break;
		for (var y=0; y<shapeSize; y++) {
			if (Peg[x][y] == 1){
				if ((x>1 && Peg[x-1][y] == 1 && Peg[x-2][y] == 2) ||
					(y>1 && Peg[x][y-1] == 1 && Peg[x][y-2] == 2) ||
					(x<shapeSize-2 && Peg[x+1][y] == 1 && Peg[x+2][y] == 2) ||
					(y<shapeSize-2 && Peg[x][y+1] == 1 && Peg[x][y+2] == 2)) {
						keep = true; break;
				}
			}
		}
	}
	return keep;
}
