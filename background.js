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

  // var downloadButton = document.createElement('<a id="download_btn" href="#" download="page.html" style="position:fixed; bottom: 10px; right: 10px; background-color: #222; border: none; padding: 10px 12px; font-size: 14px; color: white; font-family: sans-serif; text-decoration: none; z-index: 9999;">Download this page</a>');

  downloadButton.onclick = function(e){
    turnEditingOff(d);
    var pageHtml = 'data:text/html;charset=UTF-8,' + encodeURIComponent(document.documentElement.outerHTML);
    e.target.setAttribute('href', pageHtml);
  };

  body.appendChild(downloadButton);
};


// document.addEventListener('DOMContentLoaded', function() {
// 	var editBtn = document.getElementById('start_edit')
//   editBtn.addEventListener('click', function() {
// 		chrome.activeTab(null, function(tab) {
// 			d = tab.document;
// 			turnEditingOn(d);
// 		});
// 	})
// });

chrome.browserAction.onClickedocument.addListener(function(tab) {
  // No tabs or host permissions needed!
	console.log('Turning ' + tab.url + ' editable!');
  chrome.tabs.executeScript({
    code: 'turnEditingOn()'
  });
});

