/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/
"use strict";!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Mark=t()}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(n){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;t(this,e),this.ctx=n,this.iframes=r,this.exclude=i,this.iframesTimeout=o}return n(e,[{key:"getContexts",value:function(){var e=[];return(void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach(function(t){var n=e.filter(function(e){return e.contains(t)}).length>0;-1!==e.indexOf(t)||n||e.push(t)}),e}},{key:"getIframeContents",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var i=e.contentWindow;if(r=i.document,!i||!r)throw new Error("iframe inaccessible")}catch(e){n()}r&&t(r)}},{key:"isIframeBlank",value:function(e){var t=e.getAttribute("src").trim();return"about:blank"===e.contentWindow.location.href&&"about:blank"!==t&&t}},{key:"observeIframeLoad",value:function(e,t,n){var r=this,i=!1,o=null,a=function a(){if(!i){i=!0,clearTimeout(o);try{r.isIframeBlank(e)||(e.removeEventListener("load",a),r.getIframeContents(e,t,n))}catch(e){n()}}};e.addEventListener("load",a),o=setTimeout(a,this.iframesTimeout)}},{key:"onIframeReady",value:function(e,t,n){try{"complete"===e.contentWindow.document.readyState?this.isIframeBlank(e)?this.observeIframeLoad(e,t,n):this.getIframeContents(e,t,n):this.observeIframeLoad(e,t,n)}catch(e){n()}}},{key:"waitForIframes",value:function(e,t){var n=this,r=0;this.forEachIframe(e,function(){return!0},function(e){r++,n.waitForIframes(e.querySelector("html"),function(){--r||t()})},function(e){e||t()})}},{key:"forEachIframe",value:function(t,n,r){var i=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},a=t.querySelectorAll("iframe"),s=a.length,c=0;a=Array.prototype.slice.call(a);var u=function(){--s<=0&&o(c)};s||u(),a.forEach(function(t){e.matches(t,i.exclude)?u():i.onIframeReady(t,function(e){n(t)&&(c++,r(e)),u()},u)})}},{key:"createIterator",value:function(e,t,n){return document.createNodeIterator(e,t,n,!1)}},{key:"createInstanceOnIframe",value:function(t){return new e(t.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(e,t,n){if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(null===t)return!0;if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}},{key:"getIteratorNode",value:function(e){var t=e.previousNode();return{prevNode:t,node:null===t?e.nextNode():e.nextNode()&&e.nextNode()}}},{key:"checkIframeFilter",value:function(e,t,n,r){var i=!1,o=!1;return r.forEach(function(e,t){e.val===n&&(i=t,o=e.handled)}),this.compareNodeIframe(e,t,n)?(!1!==i||o?!1===i||o||(r[i].handled=!0):r.push({val:n,handled:!0}),!0):(!1===i&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(e,t,n,r){var i=this;e.forEach(function(e){e.handled||i.getIframeContents(e.val,function(e){i.createInstanceOnIframe(e).forEachNode(t,n,r)})})}},{key:"iterateThroughNodes",value:function(e,t,n,r,i){for(var o,a=this,s=this.createIterator(t,e,r),c=[],u=[],l=void 0,h=void 0;void 0,o=a.getIteratorNode(s),h=o.prevNode,l=o.node;)this.iframes&&this.forEachIframe(t,function(e){return a.checkIframeFilter(l,h,e,c)},function(t){a.createInstanceOnIframe(t).forEachNode(e,function(e){return u.push(e)},r)}),u.push(l);u.forEach(function(e){n(e)}),this.iframes&&this.handleOpenIframes(c,e,n,r),i()}},{key:"forEachNode",value:function(e,t,n){var r=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},o=this.getContexts(),a=o.length;a||i(),o.forEach(function(o){var s=function(){r.iterateThroughNodes(e,o,t,n,function(){--a<=0&&i()})};r.iframes?r.waitForIframes(o,s):s()})}}],[{key:"matches",value:function(e,t){var n="string"==typeof t?[t]:t,r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector;if(r){var i=!1;return n.every(function(t){return!r.call(e,t)||(i=!0,!1)}),i}return!1}}]),e}(),o=function(){function o(e){t(this,o),this.ctx=e,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf("MSIE")>-1||n.indexOf("Trident")>-1)&&(this.ie=!0)}return n(o,[{key:"log",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"debug",r=this.opt.log;this.opt.debug&&"object"===(void 0===r?"undefined":e(r))&&"function"==typeof r[n]&&r[n]("mark.js: "+t)}},{key:"escapeStr",value:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(e){return"disabled"!==this.opt.wildcards&&(e=this.setupWildcardsRegExp(e)),e=this.escapeStr(e),Object.keys(this.opt.synonyms).length&&(e=this.createSynonymsRegExp(e)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),this.opt.diacritics&&(e=this.createDiacriticsRegExp(e)),e=this.createMergedBlanksRegExp(e),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.createJoinersRegExp(e)),"disabled"!==this.opt.wildcards&&(e=this.createWildcardsRegExp(e)),e=this.createAccuracyRegExp(e)}},{key:"createSynonymsRegExp",value:function(e){var t=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var i in t)if(t.hasOwnProperty(i)){var o=t[i],a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i),s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o);""!==a&&""!==s&&(e=e.replace(new RegExp("("+this.escapeStr(a)+"|"+this.escapeStr(s)+")","gm"+n),r+"("+this.processSynomyms(a)+"|"+this.processSynomyms(s)+")"+r))}return e}},{key:"processSynomyms",value:function(e){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(e=this.setupIgnoreJoinersRegExp(e)),e}},{key:"setupWildcardsRegExp",value:function(e){return(e=e.replace(/(?:\\)*\?/g,function(e){return"\\"===e.charAt(0)?"?":""})).replace(/(?:\\)*\*/g,function(e){return"\\"===e.charAt(0)?"*":""})}},{key:"createWildcardsRegExp",value:function(e){var t="withSpaces"===this.opt.wildcards;return e.replace(/\u0001/g,t?"[\\S\\s]?":"\\S?").replace(/\u0002/g,t?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(e){return e.replace(/[^(|)\\]/g,function(e,t,n){var r=n.charAt(t+1);return/[(|)\\]/.test(r)||""===r?e:e+"\0"})}},{key:"createJoinersRegExp",value:function(e){var t=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&t.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&t.push("\\u00ad\\u200b\\u200c\\u200d"),t.length?e.split(/\u0000+/).join("["+t.join("")+"]*"):e}},{key:"createDiacriticsRegExp",value:function(e){var t=this.opt.caseSensitive?"":"i",n=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],r=[];return e.split("").forEach(function(i){n.every(function(n){if(-1!==n.indexOf(i)){if(r.indexOf(n)>-1)return!1;e=e.replace(new RegExp("["+n+"]","gm"+t),"["+n+"]"),r.push(n)}return!0})}),e}},{key:"createMergedBlanksRegExp",value:function(e){return e.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(e){var t=this,n=this.opt.accuracy,r="string"==typeof n?n:n.value,i="";switch(("string"==typeof n?[]:n.limiters).forEach(function(e){i+="|"+t.escapeStr(e)}),r){case"partially":default:return"()("+e+")";case"complementary":return"()([^"+(i="\\s"+(i||this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")))+"]*"+e+"[^"+i+"]*)";case"exactly":return"(^|\\s"+i+")("+e+")(?=$|\\s"+i+")"}}},{key:"getSeparatedKeywords",value:function(e){var t=this,n=[];return e.forEach(function(e){t.opt.separateWordSearch?e.split(" ").forEach(function(e){e.trim()&&-1===n.indexOf(e)&&n.push(e)}):e.trim()&&-1===n.indexOf(e)&&n.push(e)}),{keywords:n.sort(function(e,t){return t.length-e.length}),length:n.length}}},{key:"isNumeric",value:function(e){return Number(parseFloat(e))==e}},{key:"checkRanges",value:function(e){var t=this;if(!Array.isArray(e)||"[object Object]"!==Object.prototype.toString.call(e[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(e),[];var n=[],r=0;return e.sort(function(e,t){return e.start-t.start}).forEach(function(e){var i=t.callNoMatchOnInvalidRanges(e,r),o=i.start,a=i.end;i.valid&&(e.start=o,e.length=a-o,n.push(e),r=a)}),n}},{key:"callNoMatchOnInvalidRanges",value:function(e,t){var n=void 0,r=void 0,i=!1;return e&&void 0!==e.start?(r=(n=parseInt(e.start,10))+parseInt(e.length,10),this.isNumeric(e.start)&&this.isNumeric(e.length)&&r-t>0&&r-n>0?i=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(e)),this.opt.noMatch(e))):(this.log("Ignoring invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:n,end:r,valid:i}}},{key:"checkWhitespaceRanges",value:function(e,t,n){var r=void 0,i=!0,o=n.length,a=t-o,s=parseInt(e.start,10)-a;return(r=(s=s>o?o:s)+parseInt(e.length,10))>o&&(r=o,this.log("End range automatically set to the max value of "+o)),s<0||r-s<0||s>o||r>o?(i=!1,this.log("Invalid range: "+JSON.stringify(e)),this.opt.noMatch(e)):""===n.substring(s,r).replace(/\s+/g,"")&&(i=!1,this.log("Skipping whitespace only range: "+JSON.stringify(e)),this.opt.noMatch(e)),{start:s,end:r,valid:i}}},{key:"getTextNodes",value:function(e){var t=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(e){r.push({start:n.length,end:(n+=e.textContent).length,node:e})},function(e){return t.matchesExclude(e.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){e({value:n,nodes:r})})}},{key:"matchesExclude",value:function(e){return i.matches(e,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(e,t,n){var r=this.opt.element?this.opt.element:"mark",i=e.splitText(t),o=i.splitText(n-t),a=document.createElement(r);return a.setAttribute("data-markjs","true"),this.opt.className&&a.setAttribute("class",this.opt.className),a.textContent=i.textContent,i.parentNode.replaceChild(a,i),o}},{key:"wrapRangeInMappedTextNode",value:function(e,t,n,r,i){var o=this;e.nodes.every(function(a,s){var c=e.nodes[s+1];if(void 0===c||c.start>t){if(!r(a.node))return!1;var u=t-a.start,l=(n>a.end?a.end:n)-a.start,h=e.value.substr(0,a.start),f=e.value.substr(l+a.start);if(a.node=o.wrapRangeInTextNode(a.node,u,l),e.value=h+f,e.nodes.forEach(function(t,n){n>=s&&(e.nodes[n].start>0&&n!==s&&(e.nodes[n].start-=l),e.nodes[n].end-=l)}),n-=l,i(a.node.previousSibling,a.start),!(n>a.end))return!1;t=a.end}return!0})}},{key:"wrapMatches",value:function(e,t,n,r,i){var o=this,a=0===t?0:t+1;this.getTextNodes(function(t){t.nodes.forEach(function(t){t=t.node;for(var i=void 0;null!==(i=e.exec(t.textContent))&&""!==i[a];)if(n(i[a],t)){var s=i.index;if(0!==a)for(var c=1;c<a;c++)s+=i[c].length;t=o.wrapRangeInTextNode(t,s,s+i[a].length),r(t.previousSibling),e.lastIndex=0}}),i()})}},{key:"wrapMatchesAcrossElements",value:function(e,t,n,r,i){var o=this,a=0===t?0:t+1;this.getTextNodes(function(t){for(var s=void 0;null!==(s=e.exec(t.value))&&""!==s[a];){var c=s.index;if(0!==a)for(var u=1;u<a;u++)c+=s[u].length;var l=c+s[a].length;o.wrapRangeInMappedTextNode(t,c,l,function(e){return n(s[a],e)},function(t,n){e.lastIndex=n,r(t)})}i()})}},{key:"wrapRangeFromIndex",value:function(e,t,n,r){var i=this;this.getTextNodes(function(o){var a=o.value.length;e.forEach(function(e,r){var s=i.checkWhitespaceRanges(e,a,o.value),c=s.start,u=s.end;s.valid&&i.wrapRangeInMappedTextNode(o,c,u,function(n){return t(n,e,o.value.substring(c,u),r)},function(t){n(t,e)})}),r()})}},{key:"unwrapMatches",value:function(e){for(var t=e.parentNode,n=document.createDocumentFragment();e.firstChild;)n.appendChild(e.removeChild(e.firstChild));t.replaceChild(n,e),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:"normalizeTextNode",value:function(e){if(e){if(3===e.nodeType)for(;e.nextSibling&&3===e.nextSibling.nodeType;)e.nodeValue+=e.nextSibling.nodeValue,e.parentNode.removeChild(e.nextSibling);else this.normalizeTextNode(e.firstChild);this.normalizeTextNode(e.nextSibling)}}},{key:"markRegExp",value:function(e,t){var n=this;this.opt=t,this.log('Searching with expression "'+e+'"');var r=0,i="wrapMatches";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),this[i](e,this.opt.ignoreGroups,function(e,t){return n.opt.filter(t,e,r)},function(e){r++,n.opt.each(e)},function(){0===r&&n.opt.noMatch(e),n.opt.done(r)})}},{key:"mark",value:function(e,t){var n=this;this.opt=t;var r=0,i="wrapMatches",o=this.getSeparatedKeywords("string"==typeof e?[e]:e),a=o.keywords,s=o.length,c=this.opt.caseSensitive?"":"i";this.opt.acrossElements&&(i="wrapMatchesAcrossElements"),0===s?this.opt.done(r):function e(t){var o=new RegExp(n.createRegExp(t),"gm"+c),u=0;n.log('Searching with expression "'+o+'"'),n[i](o,1,function(e,i){return n.opt.filter(i,t,r,u)},function(e){u++,r++,n.opt.each(e)},function(){0===u&&n.opt.noMatch(t),a[s-1]===t?n.opt.done(r):e(a[a.indexOf(t)+1])})}(a[0])}},{key:"markRanges",value:function(e,t){var n=this;this.opt=t;var r=0,i=this.checkRanges(e);i&&i.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(i)),this.wrapRangeFromIndex(i,function(e,t,r,i){return n.opt.filter(e,t,r,i)},function(e,t){r++,n.opt.each(e,t)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:"unmark",value:function(e){var t=this;this.opt=e;var n=this.opt.element?this.opt.element:"*";n+="[data-markjs]",this.opt.className&&(n+="."+this.opt.className),this.log('Removal selector "'+n+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(e){t.unwrapMatches(e)},function(e){var r=i.matches(e,n),o=t.matchesExclude(e);return!r||o?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(e){this._opt=r({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},e)},get:function(){return this._opt}},{key:"iterator",get:function(){return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),o}();return function(e){var t=this,n=new o(e);return this.mark=function(e,r){return n.mark(e,r),t},this.markRegExp=function(e,r){return n.markRegExp(e,r),t},this.markRanges=function(e,r){return n.markRanges(e,r),t},this.unmark=function(e){return n.unmark(e),t},this}});


//plugin scope -- function scope didnt work right

chrome.storage.sync.get("keywords", function (obj) {
  var keyword_input = document.getElementsByClassName("keywords");
  if (keyword_input.length && obj.keywords != undefined) {
    keyword_input[0].value = obj.keywords; //populate form from saved object   
    window.sendtocs1 = keyword_input[0].value;
  }
});

function saveChanges(keyword) {
	// Get a value saved in a form.
	var theValue = keyword;
	// Check that there's some code there.
  if (!theValue) {
      chrome.storage.sync.remove('keywords', function() {
      
      });
      return;
	}
	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'keywords': theValue}, function() {
    
  });  
};

//listen for call from content_script(browser scope)
chrome.runtime.onMessage.addListener(function(request, sender) {

  let POPUPparse = JSON.parse(request.source);
    // title
  var seo_title, input_title, seo_title_count, seo_descr, input_descr, seo_descr_length, keywords_p, noindex;
  if (seo_title = document.querySelector('#seo_title'))
  seo_title.innerText = POPUPparse.seo_title;

  if (input_title = document.querySelector('#input_title')){
    input_title.value = POPUPparse.seo_title;
  }
  if (seo_title_count = document.querySelector('#seo_title_count')) {
    seo_title_count.innerText = POPUPparse.seo_title.length;
  }

        // noindex
  if (POPUPparse.noindex) {
    if(noindex = document.querySelector('#indexing_m'))
      noindex.classList.add('show_tr');
  }
        
  // description
  if(POPUPparse.seo_description){
    if(seo_descr = document.querySelector('#seo_description'))
    seo_descr.innerText = POPUPparse.seo_description;

    if(input_descr = document.querySelector('#input_description'))
    input_descr.value = POPUPparse.seo_description;

    if(seo_descr_length = document.querySelector('#seo_description_count'))
    seo_descr_length.innerText = POPUPparse.seo_description.length;
  } 
  else {
    if(seo_descr)
    seo_descr.innerText = 'Description is missing!';
    
    if(keywords_p = document.querySelector('#description_p'))
    document.querySelector('#description_p').classList.add('missing');
  }
          
  // keywords
  if(POPUPparse.seo_keywords){
    document.querySelector('#seo_keywords').innerText = POPUPparse.seo_keywords;
    document.querySelector('#seo_keywords_count').innerText = POPUPparse.seo_keywords.length;
  } 
  else {
    if(keywords_p = document.querySelector('#description_p'))
      document.querySelector('#keywords_p').classList.add('hidden_tr');
  }
          
          // google cache
      // http://webcache.googleusercontent.com/search?q=cache:msys.pro/portfolio
  var cache_google, cache_yandex, google_index, sitemap, robots, robots2, liveinternet, canonical;
  if(cache_google = document.querySelector('#google_cache'))
  cache_google.setAttribute("href", "http://webcache.googleusercontent.com/search?q=cache:" + POPUPparse.windowlocationhref);

  // Yandex index
  if(cache_yandex = document.querySelector('#yandex_index'))
  cache_yandex.setAttribute("href", 'https://yandex.ru/search/?text=site:'+POPUPparse.windowlocationhostname+'');

  // Google index
  if(google_index = document.querySelector('#google_index'))
  google_index.setAttribute("href", 'https://www.google.com/search?q=site:'+POPUPparse.windowlocationhostname+'');

  // sitemap.xml
  if(sitemap = document.querySelector('#sitemap'))
  sitemap.setAttribute("href", 'http://'+POPUPparse.windowlocationhostname+'/sitemap.xml');
  // robots.txt
  if(robots = document.querySelector('#robots'))
  robots.setAttribute("href", 'http://' + POPUPparse.windowlocationhostname + '/robots.txt');

  if(robots2 = document.querySelector('#robots2'))  
  robots2.setAttribute("href", 'http://'+POPUPparse.windowlocationhostname+'/robots.txt');

  // liveinternet
  if(liveinternet = document.querySelector('#liveinternet'))
  liveinternet.setAttribute("href", 'http://counter.yadro.ru/values?site='+(POPUPparse.windowlocationhostname.replace('www.','')));

  // canonical
  if(POPUPparse.canonical){
      if(canonical = document.querySelector('#canonical'))
      canonical.innerText = POPUPparse.canonical;
  } else {
      if(canonical = document.querySelector('#canonical'))
      canonical.classList.add('hidden_tr');
  }


  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://msys.pro/robots/index.php?domain="+POPUPparse.windowlocationhref+"&uri="+POPUPparse.locationpathname+"");
  xhr.onload = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
          if(xhr.responseText == 'denied'){
              //document.querySelector('#noindex').innerText = '';                    
              document.querySelector('#indexing_p').classList.add('show_tr');  
          } 
      }
  };
  // xhr.send(null);

  // h
  if (!POPUPparse.h1tag.length) {
    var h1_tag, h1_tag_p;
    if(h1_tag = document.querySelector('#h1'))
      h1_tag.innerText = 'H1 is missing!';
    if(h1_tag_p = document.querySelector('#h1_p'))
      h1_tag_p.classList.add('missing');    
  }
          
  for (let item of POPUPparse.h1tag) {
      let p_for_H1 = document.createElement('div');
      let p_for_H1_inner = document.createTextNode(item);
      p_for_H1.appendChild(p_for_H1_inner);
    let h1 = document.querySelector('#h1');
      if(h1)
      h1.appendChild(p_for_H1);
  }

  //thats how we create a DOM element without Jquary
  //ECMA6 "for" loop
  for (let item of POPUPparse.h2tag) {
      //create DOM element
      let p_for_H2 = document.createElement('div');

      //create textNode element
      let p_for_H2_inner = document.createTextNode(item);

      //fills p with textNode
      p_for_H2.appendChild(p_for_H2_inner);
    let h2 = document.querySelector('#h2');
    if(h2)
      h2.appendChild(p_for_H2);
  }

  // img
  if (POPUPparse.IMG_alt.every(element => element === null) || POPUPparse.IMG_alt.every(element => element === undefined)) {
    var img_rel_p;    
    if (img_rel_p =  document.querySelector('#img_rel_p'))
      img_rel_p.classList.add('hidden_tr');
    } 
  else {
    for (let item of POPUPparse.IMG_alt) {
      if (item !== null && item !== 'undefined' && item !== undefined) {
        let IMG_alt_DIV = document.createElement('div');
        let IMG_alt_inner = document.createTextNode(item);
        IMG_alt_DIV.appendChild(IMG_alt_inner);
        let IMG_alt = document.querySelector('#IMG_alt');
        if(IMG_alt)
        IMG_alt.appendChild(IMG_alt_DIV);
      }
    }
  }

  if (POPUPparse.IMG_rel.every(element => element === null) || POPUPparse.IMG_rel.every(element => element === undefined)) {
    var img_rel_p;
    if(img_rel_p = document.querySelector('#img_rel_p'))
      img_rel_p.classList.add('hidden_tr');
  } 
  else {
    for (let item of POPUPparse.IMG_rel) {
      let IMG_rel_DIV = document.createElement('div');
      let IMG_rel_inner = document.createTextNode(item);
      IMG_rel_DIV.appendChild(IMG_rel_inner);
      let IMG_rel = document.querySelector('#IMG_rel');
      if(IMG_rel)
        IMG_rel.appendChild(IMG_rel_DIV);
    }
  }

        // copy title
  var copy_title_elem, copy_description, keyword_listener;
  if (copy_title_elem = document.getElementById("copy_title")) { 
    copy_title_elem.onclick = function() {
      document.querySelector('#input_title').select();
      try {
        let successful = document.execCommand('copy');
      } catch(e) {}
      document.querySelector('#input_title').blur();
      return false;
    }
  }

        // copy description
  if(copy_description = document.getElementById("copy_description")){
    copy_description.onclick = function() {
      document.querySelector('#input_description').select();
      try {
        let successful = document.execCommand('copy');
      } catch(e) {}
      document.querySelector('#input_description').blur();
      return false;
    }
  }
  //call for
  var markUp = function() {
    let keyword = document.getElementsByClassName("keywords")[0].value;
    //this been called on input change
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //get current tad
      let port = chrome.tabs.connect(tabs[0].id, { name: "example" });   //call current tad (long-pool)
      port.postMessage(	keyword );
    });

    //mark keyword inside popup
    let markInstance = new Mark(document.querySelectorAll("#seo_title, #seo_description, #seo_keywords, #h1, #h2, #IMG_alt, #IMG_rel"));

    // Determine selected options
    let options = {
      "separateWordSearch": true
    };

    // Remove previous marked elements and mark
    // the new keyword inside the context
    markInstance.unmark({
      done: function(){
        markInstance.mark(keyword, options);
      }
    });
    saveChanges(keyword);
    ShowClearButton();
  };

  if (document.getElementsByClassName("keywords").length != 0){
    markUp();
    document.getElementsByClassName("keywords")[0].addEventListener('keyup', markUp); //callback by keyup
  }
  function ShowClearButton(){
    var textarea = document.getElementsByClassName('keywords')[0];
    var keyword_input = document.getElementsByClassName("clear_keywords")[0];
    if(typeof textarea !== 'undefined'){
      if(textarea.value.length !== 0 && textarea.value !== ''){
        keyword_input.classList.add('show');
      }
      else{
        keyword_input.classList.remove('show');
      } 
    }   
  }
  
  function ClearKeywords() {
    var textarea = document.getElementsByClassName('keywords')[0];
    textarea.value = '';
    textarea.focus();
    ShowClearButton();
    saveChanges();
    markUp();
  }
  ShowClearButton();
  var textAreaKeyWords = document.getElementsByClassName("clear_keywords")[0];
  if(typeof textAreaKeyWords !== 'undefined')
    textAreaKeyWords.addEventListener("click", ClearKeywords);
});
//Popup not a valid dom element so we need invoke its js like this(after popup.html loaded)

function onWindowLoad() {
	let message = document.querySelector('#seo_title');
  if(message != null){
    chrome.tabs.executeScript(null, {
      //file: "getPagesSource.js"
      file: "content_script.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
      });
  }
  initListenForTableRows();
}

var tableRows = document.getElementsByTagName("tr");
function initListenForTableRows(){  
  for(var i = 0; i < tableRows.length; i++){
    tableRows[i].addEventListener('click', MarkTableRow);
  }
}

function MarkTableRow(){
  for(var i = 0; i < tableRows.length; i++){
    tableRows[i].classList.remove('marked');
  }
  this.classList.add('marked');
}

window.onload = onWindowLoad;

// its first call for "keywords" from NN -- obsolete
// chrome.tabs.getSelected(null, function(tab) {     //get current tab
//   chrome.tabs.sendRequest(tab.id, {greeting: "hello", data: document.getElementsByClassName("keywords")[0].value}, function(response) {
//     //alert(response.farewell);
//   });
// });