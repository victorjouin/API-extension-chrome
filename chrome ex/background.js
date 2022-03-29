// this is the background code...

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "jquery-3.6.0.min.js" }, function() {
	chrome.tabs.executeScript(null, { file: "content.js" });	
	});
  });
  