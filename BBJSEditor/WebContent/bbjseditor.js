var bbjseditor = {};


bbjseditor.createEditor = function(_divId, _width) {
	if (_divId == null || _divId == "") {
		return false;
	}
	
	if (_width == null || _width == "") {
		_width = "500px";
	}
	
	
	var divElem = document.getElementById(_divId);
	
	var buttonBarHeight = "40";
	var buttonBarStyle = "width: " + _width + "; height: " + buttonBarHeight + "px;";
	
	var buttonBarObj = document.createElement("div");
	buttonBarObj.setAttribute("id", "bbjseditor_buttonbar");
	buttonBarObj.setAttribute("class", "bbjseditor_buttonbar");
	buttonBarObj.setAttribute("style", buttonBarStyle);
	
	
//	var button1 = document.createElement("input");
//	button1.setAttribute("type", "button");
//	button1.setAttribute("class", "bbjseditor_button");
//	button1.setAttribute("value", "h1");
//	button1.setAttribute("onclick", "bbjseditor.setH1()");
//	buttonBarObj.appendChild(button1);
//	
//	var button2 = document.createElement("input");
//	button2.setAttribute("type", "button");
//	button2.setAttribute("class", "bbjseditor_button");
//	button2.setAttribute("value", "h2");
//	button2.setAttribute("onclick", "bbjseditor.setH2()");
//	buttonBarObj.appendChild(button2);
//	
//	var button3 = document.createElement("input");
//	button3.setAttribute("type", "button");
//	button3.setAttribute("class", "bbjseditor_button");
//	button3.setAttribute("value", "h3");
//	button3.setAttribute("onclick", "bbjseditor.setH3()");
//	buttonBarObj.appendChild(button3);
//	
//	var button4 = document.createElement("input");
//	button4.setAttribute("type", "button");
//	button4.setAttribute("class", "bbjseditor_button");
//	button4.setAttribute("value", "h4");
//	button4.setAttribute("onclick", "bbjseditor.setH4()");
//	buttonBarObj.appendChild(button4);
	
	
	var button = null;
	
	
	button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("id", "bbjseditor_button_bold");
	button.setAttribute("class", "bbjseditor_button");
	button.setAttribute("value", "b");
	button.setAttribute("onclick", "bbjseditor.setBold()");
	buttonBarObj.appendChild(button);
	
	button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("class", "bbjseditor_button");
	button.setAttribute("value", "u");
	button.setAttribute("onclick", "bbjseditor.setUnderline()");
	buttonBarObj.appendChild(button);
	
	
	divElem.appendChild(buttonBarObj);
	
	
	bbjseditor.buttonBarHeight = buttonBarHeight;
	var editorHeight = bbjseditor.calcEditorHeight(buttonBarHeight) + "px";
	
	
	var contentObj = document.createElement("div");
	contentObj.setAttribute("id", "bbjseditor_content");
	contentObj.setAttribute("class", "bbjseditor_content");
	contentObj.setAttribute("style", "width: " + _width + "; height: " + editorHeight + ";");
	contentObj.setAttribute("CONTENTEDITABLE", "");
	divElem.appendChild(contentObj);
	
	contentObj.onkeydown = function(e) {
		
	    // bbjseditor.execCommand("bold");
//	    var selection = window.getSelection();
//	    var range = selection.getRangeAt(0);
//	    range.insertNode(document.createTextNode("!"));
////        range.deleteContents();
	    
	    bbjseditor.updateButtons();
	}
	
	
	contentObj.onkeyup = function(e) {
		bbjseditor.updateButtons();
	}
	
	
	contentObj.onclick = function() {
		bbjseditor.updateButtons();
	}
	
	
	contentObj.ondblclick = function() {
		bbjseditor.updateButtons();
	}
	
	
	var previewObj = document.createElement("div");
	previewObj.setAttribute("id", "bbjseditor_preview");
	previewObj.setAttribute("class", "bbjseditor_preview");
	previewObj.setAttribute("style", "width: " + _width + "; height: " + editorHeight + ";");
	divElem.appendChild(previewObj);
	
	
	bbjseditor.focus();
	
	
	window.setInterval(function(){
		bbjseditor.updatePreview();
	}, 10);
}

//
//bbjseditor.setH1 = function() {
//	bbjseditor.execCommand("formatBlock", true, "<h1>");
//}
//
//
//bbjseditor.setH2 = function() {
//	bbjseditor.execCommand("formatBlock", false, "<h2>");
//}
//
//
//bbjseditor.setH3 = function() {
//	bbjseditor.execCommand("formatBlock", false, "<h3>");
//}
//
//
//bbjseditor.setH4 = function() {
//	// bbjseditor.execCommand("formatBlock", false, "<h4>");
//}
//
//
//bbjseditor.setH5 = function() {
//	bbjseditor.wrapTagText("<h5>", "</h5>");
//}
//
//
//bbjseditor.setH6 = function() {
//	bbjseditor.wrapTagText("<h6>", "</h6>");
//}


bbjseditor.setUnderline = function() {
//	bbjseditor.execCommand("Underline");
	
	for(i=0;i<document.all.length;i++) {
		 document.all(i).unselectable="on";
//		 oDiv.unselectable="off";
//		 oDiv.innerHTML="";
//		 oDiv.focus();
	}
}


bbjseditor.setBold = function() {
	bbjseditor.execCommand("bold");
}


bbjseditor.createHTMLNode = function(_tag) {
	
}



bbjseditor.execCommand = function(_command) {
	var selection = window.getSelection();
	if (selection != null && selection != "") {
		var range = selection.getRangeAt(0);
		if (range != null) {
			document.execCommand(_command);
			bbjseditor.focus();
			return true;
		}
	}
	
	if (bbjseditor.buttonStatusBold == true) {
		bbjseditor.selectBoldButton(false);
	} else {
		bbjseditor.selectBoldButton(true);
	}

	bbjseditor.focus();
	
	// apply bold
//	if (bbjseditor.checkIE()) {
		window.setTimeout(function(){
			document.execCommand(_command, false, null);
		}, 100);
		
//	} else {
//		document.execCommand(_command, false, null);
//	}
}


bbjseditor.buttonStatusBold = false;
bbjseditor.selectBoldButton = function(_status) {
	var buttonId = "bbjseditor_button_bold";
	
	if (_status == false) {
		document.getElementById(buttonId).style.backgroundColor = "#FEFEFE";
		bbjseditor.buttonStatusBold = false;
		
	} else {
		document.getElementById(buttonId).style.backgroundColor = "#DDDDDD";
		bbjseditor.buttonStatusBold = true;
	}
}


bbjseditor.focus = function() {
	document.getElementById("bbjseditor_content").focus();
}


bbjseditor.wrapTagText = function(_beforeTag, _afterTag) {
	var selection = window.getSelection();
	if (selection == null) {
		return false;
	}
	
	var range = selection.getRangeAt(0);
	if (range == null) {
		return false;
	}
	
	var beforeNode = document.createTextNode(_beforeTag);
	range.insertNode(beforeNode);
	
	var endNode = range.endContainer;
	var endOffset = range.endOffset;
	
	var afterRange = document.createRange();
	afterRange.setStart(endNode, endOffset);
	
	var afterNode = document.createTextNode(_afterTag);
	afterRange.insertNode(afterNode);
}



//bbjseditor.boldbold = function() {
//	var selection = window.getSelection();
//	if (selection == null) {
//		return false;
//	}
//	
//	var range = selection.getRangeAt(0);
//	if (range == null) {
//		return false;
//	}
//	
//	var endNode = range.endContainer;
//	var endOffset = range.endOffset;
//	
//	var afterRange = document.createRange();
//	afterRange.setStart(endNode, endOffset);
//	
//	var afterNode = document.createElement("strong");
//	afterRange.insertNode(afterNode);
//	
//	var contentObj = document.getElementById("bbjseditor_content");
//	resultHTML = contentObj.innerHTML;
//	resultHTML = bbjseditor.replaceAll(resultHTML, "<strong></strong>", "<strong>");
//	contentObj.innerHTML = resultHTML;
//}


//bbjseditor.wrapTagHTML = function(_beforeTag, _afterTag) {
//	var selection = window.getSelection();
//	if (selection == null) {
//		return false;
//	}
//	
//	var range = selection.getRangeAt(0);
//	if (range == null) {
//		return false;
//	}
//	
////	alert(range);
//	
//	var beforeNode = document.createElement("beforetag");
//	range.insertNode(beforeNode);
//	
//	var endNode = range.endContainer;
//	var endOffset = range.endOffset;
//	
//	var afterRange = document.createRange();
//	afterRange.setStart(endNode, endOffset);
//	
//	var afterNode = document.createElement("aftertag");
//	afterRange.insertNode(afterNode);
//	
//	var contentObj = document.getElementById("bbjseditor_content");
//	resultHTML = contentObj.innerHTML;
//	resultHTML = bbjseditor.replaceAll(resultHTML, "<beforetag></beforetag>", _beforeTag);
//	resultHTML = bbjseditor.replaceAll(resultHTML, "<aftertag></aftertag>", _afterTag);
//	contentObj.innerHTML = resultHTML;
//}


//
//bbjseditor.wrapTagHTML = function(_beforeTag, _afterTag) {
//	var selection = window.getSelection();
//	if (selection == null) {
//		return false;
//	}
//	
//	var range = selection.getRangeAt(0);
//	if (range == null) {
//		return false;
//	}
//	
//	
//	
//	
//	
//	
//	
//	
//	var nodes = document.getElementById("bbjseditor_content").childNodes;
//	var nodeCount = nodes.length;
//	if (nodeCount < 1) {
//		return null;
//	}
//	
//	var startNode = range.startContainer;
//	var endNode = range.endContainer;
//	
//	var startOffset = range.startOffset;
//	var endOffset = range.endOffset;
//	
//	alert("startOffset  : " + startOffset);
//	alert("endOffset  : " + endOffset);
//	
////	range.startContainer.data = range.startContainer.data + ""
////	range.endContainer.data = range.endContainer.data + ""
////	
////	var stratData = range.startContainer.data + "";
////	var endData = range.endContainer.data + "";
////	
//	var startTop = startNode.offsetTop;
//	var endTop = endNode.offsetTop;
//	
////	var startTop = stratData.offsetTop;
////	var endTop = endData.offsetTop;
//	
//	alert("startTop  : " + startTop);
//	alert("endTop  : " + endTop);
//	
//	
//	
////	alert("startOffset : " + startOffset);
////	alert("endOffset : "+endOffset);
//	
//	if (startTop > endTop) {
//		bSwap = true;
//		var tmp = startTop;
//		startTop = endTop;
//		endTop = tmp;
//		
//		var tmp2 = startOffset;
//		startOffset = endOffset;
//		endOffset = tmp2;
//		
//		var tmp3 = startNode;
//		startNode = endtNode;
//		endtNode = tmp3;
//	}
//	
//	
//	var bBegin = false;
//	var resultArray = [];
//	for (var i=0; i<nodeCount; i++) {
////		alert(i + " : " + nodes[i].offsetTop);
//		if (nodes[i].offsetTop == startTop) {
////			alert("a" + i);
//			resultArray[resultArray.length] = nodes[i];
//			bBegin = true;
//			
//		} else if (nodes[i].offsetTop == endTop) {
////			alert("b" + i);
//			resultArray[resultArray.length] = nodes[i];
//			break;
//			
//		} else if (bBegin == true) {
////			alert("c" + i);
//			resultArray[resultArray.length] = nodes[i];
//		}
//	}
//	
//	
//	
//	
//	nodes = resultArray;
////	var nodes = bbjseditor.getSelectedNodes();
////	if (nodes == null || nodes.length == 0) {
////		return false;
////	}
//	
//	
////	range.startContainer.data = range.startContainer.data + ""
////	range.endContainer.data = range.endContainer.data + ""
////	
////	var startNode = range.startContainer;
////	var endNode = range.endContainer;
////	
////	var startTop = startNode.offsetTop;
////	var endTop = endNode.offsetTop;
////	
////	var bSwap = false;
////	if (startTop > endTop) {
////		bSwap = true;
////		var tmp = startTop;
////		startTop = endTop;
////		endTop = tmp;
////	}
////	
////	var startOffset = range.startOffset;
////	var endOffset = range.endOffset;
////	
////	if (bSwap == true) {
////		var tmp = startOffset;
////		startOffset = endOffset;
////		endOffset = tmp;
////	}
//	
//	
////	alert("startOffset ;" + startOffset);
////	alert("endOffset ;" + endOffset);
//	
//	var nodeCount = nodes.length;
//	var lastIndex = nodeCount - 1;
//	for (var i=0; i<nodeCount; i++) {
//		if (i == 0) {
//			alert(1);
//			try {
//				var leftHTML = startNode.innerHTML.substring(0, startOffset);
//				var rightHTML = startNode.innerHTML.substring(startOffset);
//				
//				alert(leftHTML + "" + _beforeTag + "" + rightHTML + "" + _afterTag);
//				nodes[i].innerHTML = leftHTML + "" + _beforeTag + "" + rightHTML + "" + _afterTag;
//				
//			} catch (e) {
//				alert(e);
//			}
//			
//		} else if (i == lastIndex) {
//			alert(2);
//			var leftHTML = endNode.innerHTML.substring(0, endOffset);
//			var rightHTML = endNode.innerHTML.substring(endOffset);
//			
//			nodes[i].innerHTML = _beforeTag + "" + leftHTML + "" + _afterTag + "" + rightHTML;
//			
//		} else {
//			alert(3);
//			nodes[i].innerHTML = _beforeTag + "" + nodes[i].innerHTML + "" + _afterTag;
//		}
//	}
//	
//	
//	
////	if (bbjseditor.startsWith(range.startContainer.innerHTML, _beforeTag) && bbjseditor.endsWith(range.startContainer.innerHTML, _afterTag)) {
////		alert(1);
////		range.startContainer.innerHTML = range.startContainer.innerHTML.substring(_beforeTag.length);
////		range.endContainer.innerHTML = range.endContainer.innerHTML.substring(0, range.endContainer.innerHTML.length - _afterTag.length);
////		
////	} else {
////		alert(22);
////		alert(document.getElementById("bbjseditor_content").innerHTML);
////		
////		if (range.startContainer == range.endContainer) {
////			
////		} else {
////			var leftHTML = range.startContainer.innerHTML.substring(0, startOffset);
////			var rightHTML = range.startContainer.innerHTML.substring(startOffset);
////			
////			range.startContainer.innerHTML = leftHTML+ _beforeTag + rightHTML + _afterTag;
////			
////			leftHTML = range.endContainer.innerHTML.substring(0, endOffset);
////			rightHTML = range.endContainer.innerHTML.substring(endOffset);
////			
////			range.endContainer.innerHTML = _beforeTag + leftHTML + _afterTag + rightHTML;
////		}
//////	}
////	
////	alert(document.getElementById("bbjseditor_content").innerHTML);
//}

//
//
//bbjseditor.getSelectedNodes = function() {
//	var selection = window.getSelection();
//	if (selection == null) {
//		return null;
//	}
//	
//	alert(1);
//	var range = selection.getRangeAt(0);
//	if (range == null) {
//		return null;
//	}
//	
//	var nodes = document.getElementById("bbjseditor_content").childNodes;
//	var nodeCount = nodes.length;
//	if (nodeCount < 1) {
//		return null;
//	}
//	
//	
//	range.startContainer.data = range.startContainer.data + ""
//	range.endContainer.data = range.endContainer.data + ""
//	
//	var startNode = range.startContainer;
//	var endNode = range.endContainer;
//	
//	var startTop = startNode.offsetTop;
//	var endTop = endNode.offsetTop;
//	
//	var bSwap = false;
//	if (startTop > endTop) {
//		bSwap = true;
//		var tmp = startTop;
//		startTop = endTop;
//		endTop = tmp;
//	}
//	
//	var startOffset = range.startOffset;
//	var endOffset = range.endOffset;
//	
//	if (bSwap == true) {
//		var tmp = startOffset;
//		startOffset = endOffset;
//		endOffset = tmp;
//	}
//	
//	alert(33);
//	
//	
//	var bBegin = false;
//	var resultArray = [];
//	for (var i=0; i<nodeCount; i++) {
////		alert(i + " : " + nodes[i].offsetTop);
//		if (nodes[i].offsetTop == startTop) {
////			alert("a" + i);
//			resultArray[resultArray.length] = nodes[i];
//			bBegin = true;
//			
//		} else if (nodes[i].offsetTop == endTop) {
////			alert("b" + i);
//			resultArray[resultArray.length] = nodes[i];
//			break;
//			
//		} else if (bBegin == true) {
////			alert("c" + i);
//			resultArray[resultArray.length] = nodes[i];
//		}
//	}
//	
//	return resultArray;
//}


bbjseditor.endsWith = function(_target, _str) {
	if (_target == null || _target == "") {
		return false;
	}
	
	if (_str == null || _str == "") {
		return true;
	}
	
	if (_target.substring(_target.length - _str.length) == _str) {
		return true;
	}
	
	return false;
}


bbjseditor.startsWith = function(_target, _str) {
	if (_target == null || _target == "") {
		return false;
	}
	
	if (_str == null || _str == "") {
		return true;
	}
	
	if (_target.substring(0, _str.length) == _str) {
		return true;
	}
	
	return false;
}


bbjseditor.calcEditorHeight = function() {
	var buttonBarHeight = bbjseditor.parseInt(bbjseditor.buttonBarHeight);
	var margin = 20;
	
	var innerHeight = parseInt(window.innerHeight, 10);
	var newVal = (innerHeight - buttonBarHeight - margin) / 2;
	newVal = bbjseditor.parseInt(newVal);
	
	// minimum 100
	if (newVal < 100) {
		newVal = 100;
	}
	
	return newVal;
}


bbjseditor.resizeEditor = function() {
	var contentObj = document.getElementById("bbjseditor_content");
	var previewObj = document.getElementById("bbjseditor_preview");
	
	var editorHeight = bbjseditor.calcEditorHeight() + "px";
	
	contentObj.style.height = editorHeight;
	previewObj.style.height = editorHeight;
}


bbjseditor.parseInt = function(_val) {
	if (_val == null || _val == "") {
		return 0;
	}
	
	_val = _val = _val + "";
	
	var newVal = 0;
	if (bbjseditor.endsWith(_val, "px")) {
		newVal = _val.substring(0, _val.length - 2);
		newVal = parseInt(newVal, 10);
		
	} else if (bbjseditor.endsWith(_val, "%")) {
		newVal = _val.substring(0, _val.length - 1);
		newVal = parseInt(newVal, 10);
		
	} else {
		newVal = parseInt(_val, 10);
	}
	
	return newVal;
}


bbjseditor.updatePreview = function() {
//	var contentObj = document.getElementById("bbjseditor_content");
//	var previewObj = document.getElementById("bbjseditor_preview");
//	
//	var text = bbjseditor.replaceAll(contentObj.innerText, "\r\n\r\n\r\n", "</p>&nbsp;<p>");
//	text = bbjseditor.replaceAll(text, "\n", "</p><p>");
//	
//	previewObj.innerHTML = text;
//	previewObj.scrollTop = contentObj.scrollTop;
	
	
	var contentObj = document.getElementById("bbjseditor_content");
	var previewObj = document.getElementById("bbjseditor_preview");
	
	previewObj.innerText = contentObj.innerHTML;
	
	
//	bbjseditor.updateButtons();
}


bbjseditor.replaceAll = function(str, org, dest) {
    // return str.split(org).join(dest);
	
	var len = str.length;
	var orgLen = org.length;
	for (var i=0; i<len; i++) {
		try {
			if (str.substring(i, i + orgLen) == org) {
				str = str.substring(0, i) + dest + str.substring(i + orgLen);
			}
		} catch (e) {
//			alert(e);
			continue;
		}
	}
	
//	alert(str);
	return str;
}


bbjseditor.updateButtons = function() {
	
	if (document.queryCommandState("bold")) {
		bbjseditor.selectBoldButton(true);
	} else {
		bbjseditor.selectBoldButton(false);
	}
//	window.setTimeout(function(){
//		var selection = window.getSelection();
//		if (selection == null) {
//			return null;
//		}
//		
//		var range = selection.getRangeAt(0);
//		if (range == null) {
//			return null;
//		}
//
////		var nodes = document.getElementById("bbjseditor_content").childNodes;
////		var nodeCount = nodes.length;
////		if (nodeCount < 1) {
////			return null;
////		}
//		
//		var startNode = range.startContainer;
//////		var endNode = range.endContainer;
//		var aa =startNode;
//	//	
//		var boldIdx1 = aa.indexOf("<strong>");
//		var boldIdx2 = aa.indexOf("</strong>");
////		if (boldIdx1 > -1 && boldIdx2 > -1) {
//////			bbjseditor.selectBoldButton(true);
////		}
//	}, 1);
	
}


bbjseditor.checkIE = function() {
	
	var agent = navigator.userAgent.toLowerCase();
	if ((navigator.appName == "Netscape" && agent.indexOf("trident") != -1) || (agent.indexOf("msie") != -1)) {
	     return true;
	} else {
	     return false;
	}
}



//bbjseditor.test = function() {
//	var selection = window.getSelection();
//	if (selection == null) {
//		return false;
//	}
//	
//	var range = selection.getRangeAt(0);
//	if (range == null) {
//		return false;
//	}
//	
//	var contentObj = document.getElementById("bbjseditor_content");
//	var nodeList = contentObj.childNodes;
//	var nodeCount = nodeList.length;
//	if (nodeCount < 1) {
//		return false;
//	}
//	
//	var startNode = range.startContainer;
//	var endNode = range.endContainer;
//	
//	var startOffset = range.startOffset;
//	var endOffset = range.endOffset;
//	
////	var oneNode = null;
////	var newHTML = "";
////	for (var i=0; i<nodeCount; i++) {
////		
////		oneNode = nodeList[i];
////		if (oneNode != null && oneNode.innerHTML != null) {
////			
////			if (nodeList[i] == startNode) {
////				alert(1)
////				newHTML += "<p>" + oneNode.innerHTML.substring(0, startOffset) + "</p>";
////			} else {
////				newHTML += "<p>" + oneNode.innerHTML + "</p>";
////			}
////		}
////	}
////	
////	document.getElementById("bbjseditor_content").innerHTML = newHTML;
//	
//	startNode.innerHTML = "dfdfd";
//}


