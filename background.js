function turnEditingOff() {
	var body = document.getElementsByTagName('body')[0];
	var bodyAll = body.querySelectorAll('*:not(script)');
	bodyAll.setAttribute('contenteditable', false);
	var downloadButton = document.querySelectorAll('#download_btn');
	downloadButton.parentNode.removeChild(downloadButton);
}

function turnEditingOn() {
	var body = document.getElementsByTagName('body')[0];
	var bodyAll = body.querySelectorAll('*:not(script)');
	bodyAll.forEach(function(el){
		el.setAttribute('contenteditable', true);
	});

	var downloadButton = document.createElement('a');
	downloadButton.setAttribute('href', '#');
	downloadButton.setAttribute('download', 'page.html');
	downloadButton.setAttribute('style', 'position:fixed; bottom: 10px; right: 10px; background-color: #222; border: none; padding: 10px 12px; font-size: 14px; color: white; font-family: sans-serif; text-decoration: none; z-index: 9999;');
	var downloadButtonText = document.createTextNode('Download this page');
	downloadButton.appendChild(downloadButtonText);

  downloadButton.onclick = function(e){
    turnEditingOff(d);
    var pageHtml = 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML);
    e.target.setAttribute('href', pageHtml);
  };

  body.appendChild(downloadButton);
};


chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.executeScript({
    code: '(' + turnEditingOn.toString() + ')();'
  });
});

