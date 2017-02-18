chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.type=="color-divs")
    	colorDivs();
	return true;
});	


var colorDivs = function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {type: "color-divs", color: "#000000"});
	});
}
