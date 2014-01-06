chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.method == "homeurl")
		sendResponse({
			url : localStorage['homeurl']
		});
	else {
		if (request.method == "closeTabs") {
			chrome.tabs.query({
				active : false
			}, function(tabs) {
				for (a in tabs) {
					chrome.tabs.remove(tabs[a].id);
				}
			});
		} else
			sendResponse({});
		// snub them.
	}
});
