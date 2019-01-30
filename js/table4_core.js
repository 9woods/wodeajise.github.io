/* POSITIONING */

// Temporary variables to hold mouse x-y pos.s
var mouseX = 0;
var mouseY = 0;

function getMouseXY(e) 
{
  /*
	Capturing The Mouse Position in IE4-6 & NS4-6
	(C) 2000 www.CodeLifter.com
	Free for all users, but leave in this  header
  */
  
  // Detect if the browser is IE or not.
  // If it is not IE, we assume that the browser is NS.
  var IE = document.all?true:false
	
  if (IE) { // grab the x-y pos.s if browser is IE
    mouseX = event.clientX + document.body.scrollLeft
    mouseY = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    mouseX = e.pageX
    mouseY = e.pageY
  }  
  // catch possible negative values in NS4
  if (mouseX < 0){mouseX = 0}
  if (mouseY < 0){mouseY = 0}  
  
  return true
}

function mouseWithinBounds(browser, nearX, farX, nearY, farY)
{
	var threshold = 10;
	var currentMouseX = mouseX;
	var currentMouseY = mouseY;
	var pageScrollX = getScrollX();
	var pageScrollY = getScrollY();
	
	switch(browser)
	{	//adjust values for browser... should probably do this in getMouseXY
		case "INTERNET EXPLORER" :
			currentMouseX += pageScrollX;
			currentMouseY += pageScrollY;
		break;
		
		default :
			
		break;
	}
	
	if(currentMouseX < (nearX - threshold) || currentMouseX > (farX + threshold))
	{
		return false;
	}
	
	if(currentMouseY < (nearY - threshold) || currentMouseY > (farY + threshold))
	{
		return false;
	}
	
	return true;
}

function findPos(obj) 
{
	var curleft = curtop = 0;
	if(obj.offsetParent) 
	{
		do 
		{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
/* END POSITIONING */

/* COOKIES */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
/* END COOKIES */

/* PAGE SCROLL */
function getScrollY()
{
	
	var y;
	if (self.pageYOffset) // all except Explorer
	{
		y = self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop) // Explorer 6 Strict
	{
		y = document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		y = document.body.scrollTop;
	}
	
	return y;
}

function setScrollY(y)
{
	document.documentElement.scrollTop = y;
}

function getScrollX()
{
	
	var y;
	if (self.pageXOffset) // all except Explorer
	{
		x = self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft) // Explorer 6 Strict
	{
		x = document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		x = document.body.scrollLeft;
	}
	
	return x;
}

function setScrollX(y)
{
	document.documentElement.scrollLeft = x;
}
/* END PAGE SCROLL */

/* SELECTS */
function select_innerHTML(objeto,innerHTML)
{
/******
* select_innerHTML - corrige o bug do InnerHTML em selects no IE
* Veja o problema em: http://support.microsoft.com/default.aspx?scid=kb;en-us;276228
* Versão: 2.1 - 04/09/2007
* Autor: Micox - Náiron José C. Guimarães - micoxjcg@yahoo.com.br
* @objeto(tipo HTMLobject): o select a ser alterado
* @innerHTML(tipo string): o novo valor do innerHTML
*******/
    objeto.innerHTML = ""
    var selTemp = document.createElement("micoxselect")
    var opt;
    selTemp.id="micoxselect1"
    document.body.appendChild(selTemp)
    selTemp = document.getElementById("micoxselect1")
    selTemp.style.display="none"
    
	if(innerHTML.indexOf("<optgroup")<0)
	{
        var optGroups = false;
    }
	else
	{
		var optGroups = true;	
	}
	
	if(innerHTML.indexOf("<option")<0)
	{//se não é option eu converto
        innerHTML = "<option>" + innerHTML + "</option>"
    }
	
    innerHTML = innerHTML.replace(/<optgroup/g,"<div").replace(/<\/optgroup/g,"</div").replace(/<option/g,"<span").replace(/<\/option/g,"</span").replace(/&/g,"and").replace(/\?/g, " ")
    
	selTemp.innerHTML = innerHTML;
    
	for(var h=0;h<selTemp.childNodes.length;h++)
	{
		var element = selTemp.childNodes[h];
		
		switch(element.tagName)
		{ 	
		  case "DIV" :
			//optgroup
			optGroup = document.createElement("OPTGROUP");
			
			objeto.appendChild(optGroup);
			
			
			/////////
			//getting label
			optGroup.setAttribute('label',element.getAttribute('label'));
			/////////
			
			for(var i=0;i<element.childNodes.length;i++)
			{
				var subElement = element.childNodes[i];
				
				if(subElement.tagName == 'SPAN')
				{
					opt = document.createElement("OPTION")
	
					optGroup.appendChild(opt);
					
					//getting attributes
					for(var j=0; j<subElement.attributes.length ; j++)
					{
						var attrName = subElement.attributes[j].nodeName;
						var attrVal = subElement.attributes[j].nodeValue;
						if(attrVal)
						{
							try
							{
							  opt.setAttribute(attrName,attrVal);
							  opt.setAttributeNode(spantemp.attributes[j].cloneNode(true));
							}
							catch(e){}
						}
					}
				   
					//getting styles
					if(subElement.style)
					{
						for(var y in subElement.style)
						{
							try{opt.style[y] = subElement.style[y];}catch(e){}
						}
					}
				   
					//value and text
					opt.value = subElement.getAttribute("value");
					opt.text = subElement.innerHTML;
					//IE
					opt.selected = subElement.getAttribute('selected');
					opt.className = subElement.className;
				}
			}
		  break;
		  
		  case "SPAN" :
		    	opt = document.createElement("OPTION")
		
				if(document.all)
				{ //IE
					objeto.add(opt)
				}
				else
				{
					objeto.appendChild(opt)
				}       
		
				//getting attributes
				for(var j=0; j<element.attributes.length ; j++)
				{
					var attrName = element.attributes[j].nodeName;
					var attrVal = element.attributes[j].nodeValue;
					if(attrVal)
					{
						try
						{
						  opt.setAttribute(attrName,attrVal);
						  opt.setAttributeNode(spantemp.attributes[j].cloneNode(true));
						}
						catch(e){}
					}
			    }
			   
			    //getting styles
			    if(element.style)
			    {
					for(var y in element.style)
					{
						try{opt.style[y] = element.style[y];}catch(e){}
					}
			    }
			   
			    //value and text
			    opt.value = element.getAttribute("value");
			    opt.text = element.innerHTML;
			    //IE
			    opt.selected = element.getAttribute('selected');
			    opt.className = element.className;
		  break;
		}//switch
	}// for h
	
	document.body.removeChild(selTemp)
	selTemp = null
}
/* END SELECTS */

function refreshPage(y)
{
	createCookie('y',getScrollY(),'');
	location.reload();
}

function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

function confirmSubmit()
{
	var agree=confirm("Are you sure you wish to proceed?");
	if (agree)
		return true ;
	else
		return false ;
}