var bbjseditor = {};


bbjseditor.createEditor = function(_divId, _width) {
	if (_divId == null || _divId == "") {
		return false;
	}
	
	if (_width == null || _width == "") {
		_width = "500px";
	}
	
	
	var divElem = document.getElementById(_divId);
	
	var titleBarHeight = "30";
	var titleBarStyle = "width: " + _width + "; height: " + titleBarHeight + "px;";
	
	var buttonBarHeight = "40";
	var buttonBarStyle = "width: " + _width + "; height: " + buttonBarHeight + "px;";
	
	var titleBarObj = document.createElement("div");
	titleBarObj.setAttribute("id", "bbjseditor_titlebar");
	titleBarObj.setAttribute("class", "bbjseditor_titlebar");
	titleBarObj.setAttribute("style", titleBarStyle);
	
	var inputTitle = document.createElement("input");
	inputTitle.setAttribute("type", "text");
	inputTitle.setAttribute("id", "bbjseditor_title");
	inputTitle.setAttribute("class", "bbjseditor_title");
	inputTitle.setAttribute("maxlength", "200");
	inputTitle.setAttribute("max", "200");
	titleBarObj.appendChild(inputTitle);
	
	divElem.appendChild(titleBarObj);
	
	
	var buttonBarObj = document.createElement("div");
	buttonBarObj.setAttribute("id", "bbjseditor_buttonbar");
	buttonBarObj.setAttribute("class", "bbjseditor_buttonbar");
	buttonBarObj.setAttribute("style", buttonBarStyle);
	
	var boldButton = document.createElement("input");
	boldButton.setAttribute("type", "button");
	boldButton.setAttribute("id", "bbjseditor_button_bold");
	boldButton.setAttribute("class", "bbjseditor_button");
	boldButton.setAttribute("value", "b");
	boldButton.setAttribute("onclick", "bbjseditor.setBold()");
	buttonBarObj.appendChild(boldButton);
	
	var underlineButton = document.createElement("input");
	underlineButton.setAttribute("type", "button");
	underlineButton.setAttribute("id", "bbjseditor_button_underline");
	underlineButton.setAttribute("class", "bbjseditor_button");
	underlineButton.setAttribute("value", "u");
	underlineButton.setAttribute("onclick", "bbjseditor.setUnderline()");
	buttonBarObj.appendChild(underlineButton);
	
	var italicButton = document.createElement("input");
	italicButton.setAttribute("type", "button");
	italicButton.setAttribute("id", "bbjseditor_button_italic");
	italicButton.setAttribute("class", "bbjseditor_button");
	italicButton.setAttribute("value", "i");
	italicButton.setAttribute("onclick", "bbjseditor.setItalic()");
	buttonBarObj.appendChild(italicButton);
	
	var pictureButton = document.createElement("input");
	pictureButton.setAttribute("type", "button");
	pictureButton.setAttribute("id", "bbjseditor_button_picture");
	pictureButton.setAttribute("class", "bbjseditor_button");
	pictureButton.setAttribute("value", "P");
	pictureButton.setAttribute("onclick", "bbjseditor.setPicture()");
	buttonBarObj.appendChild(pictureButton);
	
	var htmlButton = document.createElement("input");
	htmlButton.setAttribute("type", "button");
	htmlButton.setAttribute("id", "bbjseditor_button_html");
	htmlButton.setAttribute("class", "bbjseditor_button");
	htmlButton.setAttribute("style", "width: 60px; float: right; margin-right: 5px;");
	htmlButton.setAttribute("value", "HTML");
	htmlButton.setAttribute("onclick", "bbjseditor.setHtmlPreview()");
	buttonBarObj.appendChild(htmlButton);
	
	divElem.appendChild(buttonBarObj);
	
	
	bbjseditor.titleBarHeight = titleBarHeight;
	bbjseditor.buttonBarHeight = buttonBarHeight;
	var editorHeight = bbjseditor.calcEditorHeight() + "px";
	
	
	var contentObj = document.createElement("div");
	contentObj.setAttribute("id", "bbjseditor_content");
	contentObj.setAttribute("class", "bbjseditor_content");
	contentObj.setAttribute("style", "width: " + _width + "; height: " + editorHeight + ";");
	contentObj.setAttribute("CONTENTEDITABLE", "");
	divElem.appendChild(contentObj);
	
	contentObj.onkeydown = function(e) {
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
	previewObj.setAttribute("style", "width: " + _width + "; height: " + editorHeight + "; display: none;");
	divElem.appendChild(previewObj);
	
	
	bbjseditor.focus();
}


bbjseditor.setBold = function() {
	bbjseditor.execCommand("bold");
}


bbjseditor.setUnderline = function() {
	bbjseditor.execCommand("underline");
}


bbjseditor.setItalic = function() {
	bbjseditor.execCommand("italic");
}


bbjseditor.setPicture = function() {
	alert("setPicture");
}


bbjseditor.setHtmlPreview = function() {
	var contentObj = document.getElementById("bbjseditor_content");
	var previewObj = document.getElementById("bbjseditor_preview");
	
	bbjseditor.updateHtmlPreview();
	
	if (previewObj.style.display == "none") {
		contentObj.style.display = "none";
		previewObj.style.display = "";
		
		bbjseditor.selectHtmlButton(true);
		
	} else {
		contentObj.style.display = "";
		previewObj.style.display = "none";
		
		bbjseditor.selectHtmlButton(false);
		bbjseditor.focus();
	}
}


bbjseditor.checkHtmlPreviewMode = function() {
	var previewObj = document.getElementById("bbjseditor_preview");
	if (previewObj.style.display != "none") {
		return true;
	} else {
		return false;
	}
}


bbjseditor.execCommand = function(_command) {
	
	if (bbjseditor.checkHtmlPreviewMode()) {
		return false;
	}
	
	var selection = window.getSelection();
	if (selection != null && selection != "") {
		var range = selection.getRangeAt(0);
		if (range != null) {
			document.execCommand(_command);
			bbjseditor.focus();
			return true;
		}
	}
	
	if (_command == "bold") {
		if (bbjseditor.statusOfBoldButton == true) {
			bbjseditor.selectBoldButton(false);
		} else {
			bbjseditor.selectBoldButton(true);
		}
		
	} else if (_command == "underline") {
		if (bbjseditor.statusOfUnderlineButton == true) {
			bbjseditor.selectUnderlineButton(false);
		} else {
			bbjseditor.selectUnderlineButton(true);
		}
		
	} else if (_command == "italic") {
		if (bbjseditor.statusOfItalicButton == true) {
			bbjseditor.selectItalicButton(false);
		} else {
			bbjseditor.selectItalicButton(true);
		}
	}

	bbjseditor.focus();
	
	window.setTimeout(function(){
		document.execCommand(_command, false, null);
	}, 50);
}


bbjseditor.statusOfBoldButton = false;
bbjseditor.selectBoldButton = function(_status) {
	var buttonId = "bbjseditor_button_bold";
	
	if (_status == false) {
		document.getElementById(buttonId).style.backgroundColor = "#FEFEFE";
		bbjseditor.statusOfBoldButton = false;
		
	} else {
		document.getElementById(buttonId).style.backgroundColor = "#DDDDDD";
		bbjseditor.statusOfBoldButton = true;
	}
}



bbjseditor.statusOfUnderlineButton = false;
bbjseditor.selectUnderlineButton = function(_status) {
	var buttonId = "bbjseditor_button_underline";
	
	if (_status == false) {
		document.getElementById(buttonId).style.backgroundColor = "#FEFEFE";
		bbjseditor.statusOfUnderlineButton = false;
		
	} else {
		document.getElementById(buttonId).style.backgroundColor = "#DDDDDD";
		bbjseditor.statusOfUnderlineButton = true;
	}
}


bbjseditor.statusOfItalicButton = false;
bbjseditor.selectItalicButton = function(_status) {
	var buttonId = "bbjseditor_button_italic";
	
	if (_status == false) {
		document.getElementById(buttonId).style.backgroundColor = "#FEFEFE";
		bbjseditor.statusOfItalicButton = false;
		
	} else {
		document.getElementById(buttonId).style.backgroundColor = "#DDDDDD";
		bbjseditor.statusOfItalicButton = true;
	}
}


bbjseditor.statusOfHtmlButton = false;
bbjseditor.selectHtmlButton = function(_status) {
	var buttonId = "bbjseditor_button_html";
	
	if (_status == false) {
		document.getElementById(buttonId).style.backgroundColor = "#FEFEFE";
		bbjseditor.statusOfHtmlButton = false;
		
	} else {
		document.getElementById(buttonId).style.backgroundColor = "#DDDDDD";
		bbjseditor.statusOfHtmlButton = true;
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


/*
bbjseditor.wrapTagHTML = function(_beforeTag, _afterTag) {
	var selection = window.getSelection();
	if (selection == null) {
		return false;
	}
	
	var range = selection.getRangeAt(0);
	if (range == null) {
		return false;
	}
	
	var beforeNode = document.createElement("beforetag");
	range.insertNode(beforeNode);
	
	var endNode = range.endContainer;
	var endOffset = range.endOffset;
	
	var afterRange = document.createRange();
	afterRange.setStart(endNode, endOffset);
	
	var afterNode = document.createElement("aftertag");
	afterRange.insertNode(afterNode);
	
	var contentObj = document.getElementById("bbjseditor_content");
	resultHTML = contentObj.innerHTML;
	resultHTML = bbjseditor.replaceAll(resultHTML, "<beforetag></beforetag>", _beforeTag);
	resultHTML = bbjseditor.replaceAll(resultHTML, "<aftertag></aftertag>", _afterTag);
	contentObj.innerHTML = resultHTML;
}
*/


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
	var titleBarHeight = bbjseditor.parseInt(bbjseditor.titleBarHeight);
	var buttonBarHeight = bbjseditor.parseInt(bbjseditor.buttonBarHeight);
	var margin = 40;
	
	var innerHeight = parseInt(window.innerHeight, 10);
	// var newVal = (innerHeight - titleBarHeight - buttonBarHeight - margin) / 2;
	var newVal = (innerHeight - titleBarHeight - buttonBarHeight - margin);
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


bbjseditor.updateHtmlPreview = function() {
	var contentObj = document.getElementById("bbjseditor_content");
	var previewObj = document.getElementById("bbjseditor_preview");
	
	var result = contentObj.innerHTML;
	previewObj.innerText = result;
	return result;
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
			continue;
		}
	}
	
	return str;
}


bbjseditor.updateButtons = function() {
	
	if (document.queryCommandState("bold")) {
		bbjseditor.selectBoldButton(true);
	} else {
		bbjseditor.selectBoldButton(false);
	}
	
	
	if (document.queryCommandState("underline")) {
		bbjseditor.selectUnderlineButton(true);
	} else {
		bbjseditor.selectUnderlineButton(false);
	}
	
	
	if (document.queryCommandState("italic")) {
		bbjseditor.selectItalicButton(true);
	} else {
		bbjseditor.selectItalicButton(false);
	}
}


/*
bbjseditor.checkIE = function() {
	var agent = navigator.userAgent.toLowerCase();
	if ((navigator.appName == "Netscape" && agent.indexOf("trident") != -1) || (agent.indexOf("msie") != -1)) {
	     return true;
	} else {
	     return false;
	}
}
*/