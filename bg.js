//we should not separate popup from bg but i didn't figure how to merge them properly
/*
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(chrome.pageAction){
        chrome.pageAction.setIcon({
            tabId: tab.id,
            path: "icon.png"
        });
        chrome.pageAction.setTitle({
            tabId: tab.id,
            title: "SEO Meta Helper"
        });
            chrome.pageAction.show(tab.id);
    }
});
