function lWrapScroll(WrapperID,siWidth,siHeight,ilistImgs,speedTime, siVertical){
	lWrap = this;
	
	var listImgs = ilistImgs;
	var eleCurPage;
	var curPage;
	var isVertial = siVertical;
	var wrapper, scrollItems,scroller;
	var clientX, clientDX;
	var wrapable = true;
	var iWidth = siWidth;
	var iHeight = siHeight;
	var drageable = false;
	//Set Speed Here
	var speedmove = speedTime;
	//Vertical or Horizon
	var isetInterval;	
	var	pageingItems;
	var wrapper = document.getElementById(WrapperID);
	
function setImage(indexPage,flag){
		if(!flag){
			scrollItems[indexPage].style.backgroundImage = "url(images/loading.gif)";
		} else {
			scrollItems[indexPage].style.backgroundImage = "url(images/" + listImgs[indexPage] + ")";
		}
		scrollItems[indexPage].style.backgroundRepeat = "no-repeat";
}

// setImageAtIndexPage
function setImageAtIndexPage(){
		//remove all images Except Index
		for(var i=0; i < listImgs.length; i++){
			if(i!=curPage && (scrollItems[i].style.backgroundImage.indexOf("loading.gif") < 0)){
					setImage(i,false);
			}
		}
		var addImgBefore = setRule(curPage-1);
		setImage(addImgBefore,true);
		var addImgAfter = setRule(curPage+1);
		setImage(addImgAfter,true);
		//set background for Index.
		if(scrollItems[curPage].style.backgroundImage.indexOf("loading.gif") > -1){
			setImage(curPage,true);
		}
		
}

function setCurPage(num){
		curPage = num;
		if(curPage < 0) curPage = 0;
		if(curPage > listImgs.length-1) curPage = listImgs.length-1;
		eleCurPage.innerHTML = curPage;
		var pageNum = eleCurPage.innerHTML;
    	curPage  = parseInt(pageNum.replace(/"/g,""));
		if(pageingItems){
			setPagingControlCurent(curPage);
		}
}
	
function setRule(num){
	var numRum = num;
	if(num < 0) numRum = 0;
	if(num >= listImgs.length-1) numRum = listImgs.length-1;
	return numRum;
}

function loadImg(){
		
		//Create Elements
		
		wrapper.className = "wrapper";
		wrapper.style.width = iWidth + "px";
		wrapper.style.height = iHeight + "px";
		
		var currentPage = document.createElement("div");
		currentPage.className = "currentpage";
		wrapper.appendChild(currentPage);
		eleCurPage = wrapper.getElementsByClassName("currentpage")[0]; //optimzie later
		setCurPage(0);
		
		var wscroller = document.createElement("div");
		wscroller.className = "scroller";
		
		if(isVertial){
			//Set Width Height for Wrapper
			wscroller.style.width = iWidth + "px";
			wscroller.style.height = (iHeight) + "px";		
		} else {
			wscroller.style.width =  (iWidth) + "px";	
			wscroller.style.height =  iHeight+ "px";
		}
		
		var wscrolleritem;
		for(var i = 0; i < listImgs.length; i++){
			wscrolleritem = document.createElement("div");
			wscrolleritem.setAttribute("id","scroll" + i);
			wscrolleritem.className = "scrollitem" + WrapperID;
			wscrolleritem.style.position="absolute";
			wscrolleritem.style.background = "url(images/loading.gif) no-repeat center center";
	
			wscrolleritem.style.width = iWidth + "px";
			wscrolleritem.style.height = iHeight + "px";
			
			if(isVertial){
				wscrolleritem.style.top = (iHeight*i) + "px";
				wscrolleritem.style.left = "0px";
			} else {
				wscrolleritem.style.top =  "0px";
				wscrolleritem.style.left = (iWidth*i) + "px";
			}
			
			wscrolleritem.style.WebkitTransitionProperty = "all";
			wscrolleritem.style.WebkitTransitionDelay = "0";
			wscrolleritem.style.WebkitTransitionDuration = "0ms";
			wscrolleritem.style.webkitTransform = "translate3d(0px,0px,0px)";	
			
			wscroller.appendChild(wscrolleritem);
		}
		wrapper.appendChild(wscroller);
		scrollItems = wrapper.getElementsByClassName("scrollitem" + WrapperID);
		scroller = 	wrapper.getElementsByClassName("scroller")[0];
		
		
		scroller.style.WebkitTransitionProperty = "all";
		scroller.style.WebkitTransitionDelay = "0";
		scroller.style.WebkitTransitionDuration = "0ms";
		scroller.style.webkitTransform = "translate3d(0px,0px,0px)";
		//setDefault Transition
		
		//load 2 images default;
		setImage(0,true);
		setImage(1,true);
}

function getClientPos(e){
		var obj;
		if(navigator.platform == "iPad"){
			if(isVertial){
				obj = e.changedTouches[0].clientY
			} else {
				obj = e.changedTouches[0].clientX
			}
		} else {
			if(isVertial){
				obj = e.clientY
			} else {
				obj = e.clientX
			}
		}
		return obj;
}

function setMove(ele,pointDes,stime){
	scroller.style.WebkitTransitionDuration = stime +  "ms";
	if(isVertial){
		ele.style.webkitTransform = "translate3d(0px," + pointDes +"px,0px)";
	} else {
		ele.style.webkitTransform = "translate3d(" + pointDes + "px,0px,0px)";
	}
	ele.addEventListener("webkitTransitionEnd",setImageAtIndexPage,false);
}

function mouseDown(e){
	clientX = getClientPos(e);
	drageable = true;
	
}

function mouseMove(e){
	if(!drageable) return;
	var clientXm = getClientPos(e);
	var clientDXm = clientX - clientXm;
	//is Fingier Down
	var posNow;
	var distanceMove = 50;
	if(iHeight < 768 || iWidth < 1024){
		distanceMove = 5;		
	}
	
	
	//slide -- Fix Here _ IMPORTANT
	if(Math.abs(clientDXm) > distanceMove){
		if(isVertial){
			if(curPage ==0){
				if(clientDXm > 0)	posNow = -iHeight*curPage - clientDXm;	
			} else if (curPage == listImgs.length -1){
				if(clientDXm < 0)	posNow = -iHeight*curPage - clientDXm;	
			} else {
				posNow = -iHeight*curPage - clientDXm;	
			}		
		} else {
			if(curPage ==0){
				if(clientDXm > 0)	posNow = -iWidth*curPage - clientDXm;	
			} else if (curPage == listImgs.length -1){
				if(clientDXm < 0)	posNow = -iWidth*curPage - clientDXm;	
			} else {
				posNow = -iWidth*curPage - clientDXm;	
			}		
		}
	
	}
		
	
	setMove(scroller,posNow,0);
}

function mouseUp(e){
	if(wrapable==true){
		var x1 = getClientPos(e);
		clientDX = clientX - x1;
		var distanceMove = 150; 
		if(iHeight < 768 || iWidth < 1024){
			distanceMove = 50;		
		}
		if(Math.abs(clientDX) > distanceMove  ){
			if(clientDX < 0){
				//isDown = false //goDown or goRight
				setCurPage(curPage-1);
			} else {
				//isDown = true;	//goUp or goLeft
				setCurPage(curPage+1);
			} 	
			e.stopPropagation();
			//slide
			if(isVertial){
				setMove(scroller,-iHeight*curPage,speedmove);
			} else {
				setMove(scroller,-iWidth*curPage,speedmove);
			}
		} else {
			//slide
			if(isVertial){
				setMove(scroller,-iHeight*curPage,speedmove);
			} else {
				setMove(scroller,-iWidth*curPage,speedmove);
			}
		
		}
		
		clientX = x1;
	}
	drageable = false;
	
}

this.addListener = function(){
	if(navigator.platform == "iPad"){
			wrapper.addEventListener("touchstart",mouseDown,false);
			wrapper.addEventListener("touchmove",mouseMove,false);
			wrapper.addEventListener("touchend",mouseUp,false);
	} else {
			wrapper.addEventListener("mousedown",mouseDown,false);
			wrapper.addEventListener("mousemove",mouseMove,false);
			wrapper.addEventListener("mouseup",mouseUp,false);
	}
}

this.removeListener = function(){
	if(navigator.platform == "iPad"){
			wrapper.removeEventListener("touchstart",mouseDown,false);
			wrapper.removeEventListener("touchmove",mouseMove,false);
			wrapper.removeEventListener("touchend",mouseUp,false);
	} else {
			wrapper.removeEventListener("mousedown",mouseDown,false);
			wrapper.removeEventListener("mousemove",mouseMove,false);
			wrapper.removeEventListener("mouseup",mouseUp,false);
	}
}



function initScroll(){
	loadImg();
	lWrap.addListener();
}


function initScroll(){
	loadImg();
	lWrap.addListener();
}

//page Controller
this.addPageControle = function(itop,ileft,idis){
	var mainpagecontrol = document.createElement("div");
	mainpagecontrol.className = "maincontrolpaging";
	// Num listImgs.length
	var iw = listImgs.length * idis;
	mainpagecontrol.style.width = iw + "px";
	mainpagecontrol.style.top = itop + "px";
	mainpagecontrol.style.left = ileft  + "px";
	var itemi;
	for(var i = 0; i< listImgs.length; i++){
		itemi = document.createElement("div");
		itemi.setAttribute('id',"itemi" + i);
		itemi.className = "pagecontrolitem";
		itemi.style.left = i*idis + "px";
		//itemi.style.backgroundImage = "url(images/White_bullet.png)";
		itemi.style.backgroundColor = "rgba(128,128,128,1)";
		mainpagecontrol.appendChild(itemi);
	}
	wrapper.appendChild(mainpagecontrol);
	pageingItems = wrapper.getElementsByClassName("pagecontrolitem");
	setPagingControlCurent(0);
}

function setPagingControlCurent(curentPageIndex){
	for(var i = 0; i< listImgs.length; i++){
			pageingItems[i].style.backgroundColor = "rgba(128,128,128,1)";
	}
	//pageingItems[curentPageIndex].style.backgroundImage = "url(images/Black_bullet.png)";
	pageingItems[curentPageIndex].style.backgroundColor = "rgba(218,32,43,1)";
	
	
}

initScroll();

	
}

