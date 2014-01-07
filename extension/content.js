// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.sendMessage("", {
	method : "homeurl"
}, function(response) {
	var homeurl = response.url;
	if (((window.location.href.indexOf(homeurl) < 0) && (window.location.href.indexOf("chrome://") < 0) && (window.location.href.indexOf("http://citymediaride.hexalab.org/") < 0))) {
	window.location = "http://"+homeurl;
		chrome.runtime.sendMessage("", {
			method : "closeTabs"
		}, function(response) {
		});
	}
});

