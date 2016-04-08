chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.pageAction.setIcon({tabId: tab.id,path:"icon16.png"});
    chrome.pageAction.setTitle({tabId: tab.id,title:"SEO helper"});
	chrome.pageAction.show(tab.id);
});
