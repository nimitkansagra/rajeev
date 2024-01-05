/**
 * Add paths for Tungsten
 * Define these at any point to override
 */
if(typeof JS_VENDOR_LOCATION == "undefined") {
	var JS_VENDOR_LOCATION = '../../js/dist/vendor/';
}
if(typeof IMAGES_LOCATION == "undefined") {
	var IMAGES_LOCATION = '../../images/';
}
if(typeof CSS_LOCATION == "undefined") {
	var CSS_LOCATION = '../../css/';
}
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.3",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b="length"in a&&a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;

return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function aa(){return!0}function ba(){return!1}function ca(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ca()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ca()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?aa:ba):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=aa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=aa,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=aa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=ba;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=ba),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function da(a){var b=ea.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var ea="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fa=/ jQuery\d+="(?:null|\d+)"/g,ga=new RegExp("<(?:"+ea+")[\\s/>]","i"),ha=/^\s+/,ia=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ja=/<([\w:]+)/,ka=/<tbody/i,la=/<|&#?\w+;/,ma=/<(?:script|style|link)/i,na=/checked\s*(?:[^=]|=\s*.checked.)/i,oa=/^$|\/(?:java|ecma)script/i,pa=/^true\/(.*)/,qa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ra={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sa=da(y),ta=sa.appendChild(y.createElement("div"));ra.optgroup=ra.option,ra.tbody=ra.tfoot=ra.colgroup=ra.caption=ra.thead,ra.th=ra.td;function ua(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ua(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function va(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wa(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xa(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function ya(a){var b=pa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function za(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Aa(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Ba(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xa(b).text=a.text,ya(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!ga.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(ta.innerHTML=a.outerHTML,ta.removeChild(f=ta.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ua(f),h=ua(a),g=0;null!=(e=h[g]);++g)d[g]&&Ba(e,d[g]);if(b)if(c)for(h=h||ua(a),d=d||ua(f),g=0;null!=(e=h[g]);g++)Aa(e,d[g]);else Aa(a,f);return d=ua(f,"script"),d.length>0&&za(d,!i&&ua(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=da(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(la.test(f)){h=h||o.appendChild(b.createElement("div")),i=(ja.exec(f)||["",""])[1].toLowerCase(),l=ra[i]||ra._default,h.innerHTML=l[1]+f.replace(ia,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&ha.test(f)&&p.push(b.createTextNode(ha.exec(f)[0])),!k.tbody){f="table"!==i||ka.test(f)?"<table>"!==l[1]||ka.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ua(p,"input"),va),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ua(o.appendChild(f),"script"),g&&za(h),c)){e=0;while(f=h[e++])oa.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ua(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&za(ua(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ua(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fa,""):void 0;if(!("string"!=typeof a||ma.test(a)||!k.htmlSerialize&&ga.test(a)||!k.leadingWhitespace&&ha.test(a)||ra[(ja.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ia,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ua(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ua(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&na.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ua(i,"script"),xa),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ua(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,ya),j=0;f>j;j++)d=g[j],oa.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qa,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Ca,Da={};function Ea(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fa(a){var b=y,c=Da[a];return c||(c=Ea(a,b),"none"!==c&&c||(Ca=(Ca||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ca[0].contentWindow||Ca[0].contentDocument).document,b.write(),b.close(),c=Ea(a,b),Ca.detach()),Da[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Ga=/^margin/,Ha=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ia,Ja,Ka=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ia=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Ha.test(g)&&Ga.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ia=function(a){return a.currentStyle},Ja=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ia(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Ha.test(g)&&!Ka.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function La(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight),b.removeChild(i)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Ma=/alpha\([^)]*\)/i,Na=/opacity\s*=\s*([^)]*)/,Oa=/^(none|table(?!-c[ea]).+)/,Pa=new RegExp("^("+S+")(.*)$","i"),Qa=new RegExp("^([+-])=("+S+")","i"),Ra={position:"absolute",visibility:"hidden",display:"block"},Sa={letterSpacing:"0",fontWeight:"400"},Ta=["Webkit","O","Moz","ms"];function Ua(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Ta.length;while(e--)if(b=Ta[e]+c,b in a)return b;return d}function Va(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fa(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wa(a,b,c){var d=Pa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Ya(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ia(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Ja(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ha.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xa(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ja(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ua(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qa.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ua(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Ja(a,b,d)),"normal"===f&&b in Sa&&(f=Sa[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Oa.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Ra,function(){return Ya(a,b,d)}):Ya(a,b,d):void 0},set:function(a,c,d){var e=d&&Ia(a);return Wa(a,c,d?Xa(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Na.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Ma,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Ma.test(f)?f.replace(Ma,e):f+" "+e)}}),m.cssHooks.marginRight=La(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Ja,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Ga.test(a)||(m.cssHooks[a+b].set=Wa)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ia(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Va(this,!0)},hide:function(){return Va(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Za(a,b,c,d,e){
return new Za.prototype.init(a,b,c,d,e)}m.Tween=Za,Za.prototype={constructor:Za,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")},cur:function(){var a=Za.propHooks[this.prop];return a&&a.get?a.get(this):Za.propHooks._default.get(this)},run:function(a){var b,c=Za.propHooks[this.prop];return this.options.duration?this.pos=b=m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Za.propHooks._default.set(this),this}},Za.prototype.init.prototype=Za.prototype,Za.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Za.propHooks.scrollTop=Za.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Za.prototype.init,m.fx.step={};var $a,_a,ab=/^(?:toggle|show|hide)$/,bb=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cb=/queueHooks$/,db=[ib],eb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bb.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bb.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fb(){return setTimeout(function(){$a=void 0}),$a=m.now()}function gb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hb(a,b,c){for(var d,e=(eb[b]||[]).concat(eb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ib(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fa(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fa(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ab.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fa(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hb(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jb(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kb(a,b,c){var d,e,f=0,g=db.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$a||fb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$a||fb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jb(k,j.opts.specialEasing);g>f;f++)if(d=db[f].call(j,a,k,j.opts))return d;return m.map(k,hb,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kb,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],eb[c]=eb[c]||[],eb[c].unshift(b)},prefilter:function(a,b){b?db.unshift(a):db.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kb(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gb(b,!0),a,d,e)}}),m.each({slideDown:gb("show"),slideUp:gb("hide"),slideToggle:gb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($a=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$a=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_a||(_a=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_a),_a=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lb=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lb,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mb,nb,ob=m.expr.attrHandle,pb=/^(?:checked|selected)$/i,qb=k.getSetAttribute,rb=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nb:mb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rb&&qb||!pb.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qb?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nb={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rb&&qb||!pb.test(c)?a.setAttribute(!qb&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ob[b]||m.find.attr;ob[b]=rb&&qb||!pb.test(b)?function(a,b,d){var e,f;return d||(f=ob[b],ob[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,ob[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rb&&qb||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mb&&mb.set(a,b,c)}}),qb||(mb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},ob.id=ob.name=ob.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mb.set},m.attrHooks.contenteditable={set:function(a,b,c){mb.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sb=/^(?:input|select|textarea|button|object)$/i,tb=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sb.test(a.nodeName)||tb.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var ub=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ub," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vb=m.now(),wb=/\?/,xb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yb,zb,Ab=/#.*$/,Bb=/([?&])_=[^&]*/,Cb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Db=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Eb=/^(?:GET|HEAD)$/,Fb=/^\/\//,Gb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hb={},Ib={},Jb="*/".concat("*");try{zb=location.href}catch(Kb){zb=y.createElement("a"),zb.href="",zb=zb.href}yb=Gb.exec(zb.toLowerCase())||[];function Lb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mb(a,b,c,d){var e={},f=a===Ib;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nb(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Ob(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zb,type:"GET",isLocal:Db.test(yb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nb(Nb(a,m.ajaxSettings),b):Nb(m.ajaxSettings,a)},ajaxPrefilter:Lb(Hb),ajaxTransport:Lb(Ib),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cb.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zb)+"").replace(Ab,"").replace(Fb,yb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gb.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yb[1]&&c[2]===yb[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yb[3]||("http:"===yb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mb(Hb,k,b,v),2===t)return v;h=m.event&&k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Eb.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wb.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bb.test(e)?e.replace(Bb,"$1_="+vb++):e+(wb.test(e)?"&":"?")+"_="+vb++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jb+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mb(Ib,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Ob(k,v,c)),u=Pb(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qb=/%20/g,Rb=/\[\]$/,Sb=/\r?\n/g,Tb=/^(?:submit|button|image|reset|file)$/i,Ub=/^(?:input|select|textarea|keygen)/i;function Vb(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rb.test(a)?d(a,e):Vb(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vb(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vb(c,a[c],b,e);return d.join("&").replace(Qb,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Ub.test(this.nodeName)&&!Tb.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sb,"\r\n")}}):{name:b.name,value:c.replace(Sb,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zb()||$b()}:Zb;var Wb=0,Xb={},Yb=m.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Xb)Xb[a](void 0,!0)}),k.cors=!!Yb&&"withCredentials"in Yb,Yb=k.ajax=!!Yb,Yb&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xb[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xb[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zb(){try{return new a.XMLHttpRequest}catch(b){}}function $b(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _b=[],ac=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_b.pop()||m.expando+"_"+vb++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ac.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ac.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ac,"$1"+e):b.jsonp!==!1&&(b.url+=(wb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_b.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bc=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bc)return bc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cc=a.document.documentElement;function dc(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cc;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cc})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=La(k.pixelPosition,function(a,c){return c?(c=Ja(a,b),Ha.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ec=a.jQuery,fc=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fc),b&&a.jQuery===m&&(a.jQuery=ec),m},typeof b===K&&(a.jQuery=a.$=m),m});

/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){o[n]||(o[n]=!0,e.migrateWarnings.push(n),t.console&&console.warn&&!e.migrateMute&&(console.warn("JQMIGRATE: "+n),e.migrateTrace&&console.trace&&console.trace()))}function a(t,a,o,i){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(i),o},set:function(e){r(i),o=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=o}var o={};e.migrateWarnings=[],!e.migrateMute&&t.console&&console.log&&console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){o={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var i=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",i||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,o,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(i?a in i:e.isFunction(e.fn[a])))?e(t)[a](o):("type"===a&&o!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,o=e.prop(t,r);return o===!0||"boolean"!=typeof o&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,o))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;e.fn.init=function(t,n,a){var o;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(o=y.exec(t))&&o[1]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(e.trim(t),n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,o,i=this[0];return!i||"events"!==t||1!==arguments.length||(a=e.data(i,t),o=e._data(i,t),a!==n&&a!==o||o===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),o)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,o,i){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),o)for(c=function(e){return!e.type||j.test(e.type)?i?i.push(e.parentNode?e.parentNode.removeChild(e):e):o.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(o.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,C=e.fn.live,S=e.fn.die,T="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",M=RegExp("\\b(?:"+T+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,o){e!==document&&M.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,o)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,o=t.guid||e.guid++,i=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%i;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=o;a.length>i;)a[i++].guid=o;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),C?C.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),S?S.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||M.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(T.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);

/*! A fix for the iOS orientationchange zoom bug.
Script by @scottjehl, rebound by @wilto.
MIT / GPLv2 License.
*/
(function(w){

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if(!(/iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1)){
		return;
	}

	var doc = w.document;

	if( !doc.querySelector ){ return; }

	var meta = doc.querySelector( "meta[name=viewport]" ),
		initialContent = meta && meta.getAttribute( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;

	if( !meta ){ return; }

	function restoreZoom(){
		meta.setAttribute( "content", enabledZoom );
		enabled = true;
	}

	function disableZoom(){
		meta.setAttribute( "content", disabledZoom );
		enabled = false;
	}

	function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		Response.create({
			mode: 'src',
			prefix: 'src',
			breakpoints: $(window).data('breakpoints').x
		});

		// If portrait orientation and in one of the danger zones
		if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if(enabled){
				disableZoom();
			}
		} else if (!enabled){
			restoreZoom();
		}
	}

	w.addEventListener("orientationchange", restoreZoom, false);
	w.addEventListener("devicemotion", checkTilt, false);

})(this);
'use strict';


// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
	Array.prototype.indexOf= function(find, i /*opt*/) {
		if (i===undefined) i= 0;
		if (i<0) i+= this.length;
		if (i<0) i= 0;
		for (var n= this.length; i<n; i++)
			if (i in this && this[i]===find)
				return i;
		return -1;
	};
}

if (!Object.keys) {
	Object.keys = function(obj) {
		var keys = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				keys.push(i);
			}
		}
		return keys;
	};
}
/*!
 * @link http://responsejs.com
 * @link http://github.com/ryanve/response.js
 * @copyright 2014 Ryan Van Etten
 * @license MIT
 * @version 0.7.12
 */

/*jshint expr:true, sub:true, supernew:true, debug:true, node:true, boss:true, devel:true, evil:true,
  laxcomma:true, eqnull:true, undef:true, unused:true, browser:true, jquery:true, maxerr:100 */

(function(root, name, make) {
  var $ = root['jQuery'] || root['Zepto'] || root['ender'] || root['elo'];
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make($);
  else root[name] = make($);
  // @link github.com/ryanve/response.js/pull/9
  // @example AMD `define(['jquery'], make)
}(this, 'Response', function($) {

  if (typeof $ != 'function') {
	try {// Exit gracefully if dependency is missing:
	  console.log('Response was unable to run due to missing dependency.');
	} catch (e) {}
  }

  var Response
	, root = this
	, name = 'Response'
	, old = root[name]
	, initContentKey = 'init' + name
	, win = window
	, doc = document
	, docElem = doc.documentElement
	, ready = $.domReady || $
	, $win = $(win)
	, screen = win.screen
	, AP = Array.prototype
	, OP = Object.prototype
	, push = AP.push
	, slice = AP.slice
	, concat = AP.concat
	, toString = OP.toString
	, owns = OP.hasOwnProperty
	, isArray = Array.isArray || function(item) {
		return '[object Array]' === toString.call(item);
	  }
	, defaultPoints = {
	  width: [0, 320, 481, 641, 961, 1025, 1281]
		, height: [0, 481]
		, ratio: [1, 1.5, 2] // device-pixel-ratio
	  }
	, Elemset, band, wave, device = {}
	, propTests = {}
	, isCustom = {}
	, sets = { all: [] }
	, suid = 1
	, screenW = screen.width
	, screenH = screen.height
	, screenMax = screenW > screenH ? screenW : screenH
	, screenMin = screenW + screenH - screenMax
	, deviceW = function() { return screenW; }
	, deviceH = function() { return screenH; }
	, regexFunkyPunc = /[^a-z0-9_\-\.]/gi
	, regexTrimPunc = /^[\W\s]+|[\W\s]+$|/g
	, regexCamels = /([a-z])([A-Z])/g
	, regexDashB4 = /-(.)/g
	, regexDataPrefix = /^data-(.+)$/

	, procreate = Object.create || function(parent) {
		/** @constructor */
		function Type() {}
		Type.prototype = parent;
		return new Type;
	  }
	, namespaceIt = function(eventName, customNamespace) {
		customNamespace = customNamespace || name;
		return eventName.replace(regexTrimPunc, '') + '.' + customNamespace.replace(regexTrimPunc, '');
	  }
	, event = {
		allLoaded: namespaceIt('allLoaded') // fires on lazy elemsets when all elems in a set have been loaded once
		//, update: namespaceIt('update') // fires on each elem in a set each time that elem is updated
		, crossover: namespaceIt('crossover') // fires on window each time dynamic breakpoint bands is crossed
	  }

	  // Response.media (normalized matchMedia)
	  // @example Response.media("(orientation:landscape)").matches
	  // If both versions are undefined, .matches will equal undefined
	  // Also see: band / wave / device.band / device.wave / dpr
	, matchMedia = win.matchMedia || win.msMatchMedia
	, media = matchMedia || function() { return {}; }

	  // http://ryanve.com/lab/dimensions
	  // http://github.com/ryanve/verge/issues/13
	, viewportW = function() {
		var a = docElem['clientWidth'], b = win['innerWidth'];
		return a < b ? b : a;
	  }
	, viewportH = function() {
		var a = docElem['clientHeight'], b = win['innerHeight'];
		return a < b ? b : a;
	  };

  function doError(msg) {
	// Error handling. (Throws exception.)
	// Use Ctrl+F to find specific @errors
	throw new TypeError(msg ? name + '.' + msg : name);
  }

  function isNumber(item) {
	return item === +item;
  }

  /**
   * @param {{length:number}} stack
   * @param {Function} fn
   * @param {*=} scope
   * @return {Array}
   */
  function map(stack, fn, scope) {
	for (var r = [], l = stack.length, i = 0; i < l;) r[i] = fn.call(scope, stack[i], i++, stack);
	return r;
  }

  /**
   * @param {string|{length:number}} list
   * @return {Array} new and compact
   */
  function compact(list) {
	return !list ? [] : sift(typeof list == 'string' ? list.split(' ') : list);
  }

  /**
   * @since 0.4.0, supports scope and sparse-item iteration since 0.6.2
   * @param {{length:number}} stack
   * @param {Function} fn
   * @param {*=} scope
   */
  function each(stack, fn, scope) {
	if (null == stack) return stack;
	for (var l = stack.length, i = 0; i < l;) fn.call(scope || stack[i], stack[i], i++, stack);
	return stack;
  }

  /**
   * @since 0.4.0 skips null|undefined since 0.6.2, adds `0` since 0.7.11
   * @param {{length:number}} stack
   * @param {(string|number)=} prefix
   * @param {(string|number)=} suffix
   * @return {Array} new array of affixed strings or added numbers
   */
  function affix(stack, prefix, suffix) {
	if (null == prefix) prefix = '';
	if (null == suffix) suffix = '';
	for (var r = [], l = stack.length, i = 0; i < l; i++)
	  null == stack[i] || r.push(prefix + stack[i] + suffix);
	return r;
  }

  /**
   * @param {{length:number}} stack to iterate
   * @param {(Function|string|*)=} fn callback or typestring
   * @param {(Object|boolean|*)=} scope or inversion boolean
   * @since 0.4.0, supports scope and typestrings since 0.6.2
   * @example Response.sift([5, 0, 'str'], isFinite) // [5, 0]
   * @example Response.sift([5, 0, 'str']) // [5, 'str']
   */
  function sift(stack, fn, scope) {
	var fail, l, v, r = [], u = 0, i = 0, run = typeof fn == 'function', not = true === scope;
	for (l = stack && stack.length, scope = not ? null : scope; i < l; i++) {
	  v = stack[i];
	  fail = run ? !fn.call(scope, v, i, stack) : fn ? typeof v !== fn : !v;
	  fail === not && (r[u++] = v);
	}
	return r;
  }

  /**
   * @since 0.3.0
   * @param {Object|Array|Function|*} r receiver
   * @param {Object|Array|Function|*} s supplier Undefined values are ignored.
   * @return {Object|Array|Function|*} receiver
   */
  function merge(r, s) {
	if (null == r || null == s) return r;
	if (typeof s == 'object' && isNumber(s.length)) push.apply(r, sift(s, 'undefined', true));
	else for (var k in s) owns.call(s, k) && void 0 !== s[k] && (r[k] = s[k]);
	return r;
  }

  /**
   * @description Call `fn` on each stack value or directly on a non-stack item
   * @since 0.3.0 scope support added in 0.6.2
   * @param {*} item stack or non-stack item
   * @param {Function} fn callback
   * @param {*=} scope defaults to current item
   */
  function route(item, fn, scope) {
	if (null == item) return item;
	if (typeof item == 'object' && !item.nodeType && isNumber(item.length)) each(item, fn, scope);
	else fn.call(scope || item, item);
	return item;
  }

  /**
   * @param {Function} fn gets a value to compare against
   * @return {Function} range comparison tester
   */
  function ranger(fn) {
	/**
	 * @param {string|number} min
	 * @param {(string|number)=} max
	 * @return {boolean}
	 */
	return function(min, max) {
	  var point = fn();
	  return point >= (min || 0) && (!max || point <= max);
	};
  }

  /**
   * Range comparison booleans
   * @link responsejs.com/#booleans
   */
  band = ranger(viewportW);    // Response.band
  wave = ranger(viewportH);    // Response.wave
  device.band = ranger(deviceW); // Response.device.band
  device.wave = ranger(deviceH); // Response.device.wave

  /**
   * Response.dpr(decimal) Tests if a minimum device pixel ratio is active.
   * Or (version added in 0.3.0) returns the device-pixel-ratio
   * @param {number} decimal   is the integer or float to test.
   * @return {boolean|number}
   * @example Response.dpr() // get the device-pixel-ratio (or 0 if undetectable)
   * @example Response.dpr(1.5) // true when device-pixel-ratio is 1.5+
   * @example Response.dpr(2) // true when device-pixel-ratio is 2+
   */
  function dpr(decimal) {
	// Consider: github.com/ryanve/res
	var dPR = win.devicePixelRatio;
	if (null == decimal) return dPR || (dpr(2) ? 2 : dpr(1.5) ? 1.5 : dpr(1) ? 1 : 0); // approx
	if (!isFinite(decimal)) return false;

	// Use window.devicePixelRatio if supported - supported by Webkit
	// (Safari/Chrome/Android) and Presto 2.8+ (Opera) browsers.
	if (dPR && dPR > 0) return dPR >= decimal;

	// Fallback to .matchMedia/.msMatchMedia. Supported by Gecko (FF6+) and more:
	// @link developer.mozilla.org/en/DOM/window.matchMedia
	// -webkit-min- and -o-min- omitted (Webkit/Opera supported above)
	// The generic min-device-pixel-ratio is expected to be added to the W3 spec.
	// Return false if neither method is available.
	decimal = 'only all and (min--moz-device-pixel-ratio:' + decimal + ')';
	if (media(decimal).matches) return true;
	return !!media(decimal.replace('-moz-', '')).matches;
  }

  /**
   * Response.camelize
   * @example Response.camelize('data-casa-blanca') // casaBlanca
   */
  function camelize(s) {
	// Remove data- prefix and convert remaining dashed string to camelCase:
	return s.replace(regexDataPrefix, '$1').replace(regexDashB4, function(m, m1) {
	  return m1.toUpperCase();
	});
  }

  /**
   * Response.datatize
   * Converts pulpFiction (or data-pulpFiction) to data-pulp-fiction
   * @example Response.datatize('casaBlanca')  // data-casa-blanca
   */
  function datatize(s) {
	// Make sure there's no data- already in s for it to work right in IE8.
	return 'data-' + (s ? s.replace(regexDataPrefix, '$1').replace(regexCamels, '$1-$2').toLowerCase() : s);
  }

  /**
   * Convert stringified primitives back to JavaScript.
   * @since 0.3.0
   * @param {string|*} s String to parse into a JavaScript value.
   * @return {*}
   */
  function render(s) {
	var n; // undefined, or becomes number
	return typeof s != 'string' || !s ? s
	  : 'false' === s ? false
	  : 'true' === s ? true
	  : 'null' === s ? null
	  : 'undefined' === s || (n = (+s)) || 0 === n || 'NaN' === s ? n
	  : s;
  }

  // Isolate native element:
  function getNative(e) {
	// stackoverflow.com/questions/9119823/safest-way-to-detect-native-dom-element
	// See @link jsperf.com/get-native
	// If e is a native element then return it. If not check if index 0 exists and is
	// a native elem. If so then return that. Otherwise return false.
	return !e ? false : e.nodeType === 1 ? e : e[0] && e[0].nodeType === 1 ? e[0] : false;
  }

  function datasetChainable(key, value) {
	var n, numOfArgs = arguments.length, elem = getNative(this), ret = {}, renderData = false;

	if (numOfArgs) {
	  if (isArray(key)) {
		renderData = true;
		key = key[0];
	  }
	  if (typeof key === 'string') {
		key = datatize(key);
		if (1 === numOfArgs) {//GET
		  ret = elem.getAttribute(key);
		  return renderData ? render(ret) : ret;
		}
		if (this === elem || 2 > (n = this.length || 1)) elem.setAttribute(key, value);
		else while (n--) n in this && datasetChainable.apply(this[n], arguments);
	  } else if (key instanceof Object) {
		for (n in key) {
		  key.hasOwnProperty(n) && datasetChainable.call(this, n, key[n]);
		}
	  }
	  return this;
	}

	// ** Zero args **
	// Get object containing all the data attributes. Use native dataset when avail.
	if (elem.dataset && DOMStringMap) return elem.dataset;
	each(elem.attributes, function(a) {
	  // Fallback adapted from ded/bonzo
	  a && (n = String(a.name).match(regexDataPrefix)) && (ret[camelize(n[1])] = a.value);
	});
	return ret; // plain object
  }

  function deletesChainable(keys) {
	if (this && typeof keys === 'string') {
	  keys = compact(keys);
	  route(this, function(el) {
		each(keys, function(key) {
		  key && el.removeAttribute(datatize(key));
		});
	  });
	}
	return this;
  }

  /**
   * Response.dataset() See datasetChainable above
   * @since 0.3.0
   */
  function dataset(elem) {
	return datasetChainable.apply(elem, slice.call(arguments, 1));
  }

  /**
   * Response.deletes(elem, keys)  Delete HTML5 data attributes (remove them from them DOM)
   * @since 0.3.0
   * @param {Element|Object} elem is a native element or jQuery object
   * @param {string} keys  one or more space-separated data attribute keys (names) to delete (removed
   * from the DOM) Should be camelCased or lowercase.         // from all divs.
   */
  function deletes(elem, keys) {
	return deletesChainable.call(elem, keys);
  }

  function sel(keys) {
	// Convert an array of data keys into a selector string
	// Converts ["a","b","c"] into "[data-a],[data-b],[data-c]"
	// Double-slash escapes periods so that attrs like data-density-1.5 will work
	// @link api.jquery.com/category/selectors/
	// @link github.com/jquery/sizzle/issues/76
	for (var k, r = [], i = 0, l = keys.length; i < l;)
	  (k = keys[i++]) && r.push('[' + datatize(k.replace(regexTrimPunc, '').replace('.', '\\.')) + ']');
	return r.join();
  }

  /**
   * Response.target() Get the corresponding data attributes for an array of data keys.
   * @since 0.1.9
   * @param {Array} keys is the array of data keys whose attributes you want to select.
   * @return {Object} jQuery stack
   * @example Response.target(['a', 'b', 'c']) //  $('[data-a],[data-b],[data-c]')
   * @example Response.target('a b c']) //  $('[data-a],[data-b],[data-c]')
   */
  function target(keys) {
	return $(sel(compact(keys)));
  }

  // Cross-browser versions of window.scrollX and window.scrollY
  // Compatibiliy notes @link developer.mozilla.org/en/DOM/window.scrollY
  // Performance tests @link jsperf.com/scrollx-cross-browser-compatible
  // Using native here b/c Zepto doesn't support .scrollLeft() /scrollTop()
  // In jQuery you can do $(window).scrollLeft() and $(window).scrollTop()

  /**
   * @since 0.3.0
   * @return {number}
   */
  function scrollX() {
	return window.pageXOffset || docElem.scrollLeft;
  }

  /**
   * @since   0.3.0
   * @return {number}
   */
  function scrollY() {
	return window.pageYOffset || docElem.scrollTop;
  }

  /**
   * area methods inX/inY/inViewport
   * @since   0.3.0
   */
  function rectangle(el, verge) {
	// Local handler for area methods:
	// adapted from github.com/ryanve/dime
	// The native object is read-only so we
	// have use a copy in order to modify it.
	var r = el.getBoundingClientRect ? el.getBoundingClientRect() : {};
	verge = typeof verge == 'number' ? verge || 0 : 0;
	return {
	  top: (r.top || 0) - verge
	  , left: (r.left || 0) - verge
	  , bottom: (r.bottom || 0) + verge
	  , right: (r.right || 0) + verge
	};
  }

  // The verge is the amount of pixels to act as a cushion around the viewport. It can be any
  // integer. If verge is zero, then the inX/inY/inViewport methods are exact. If verge is set to 100,
  // then those methods return true when for elements that are are in the viewport *or* near it,
  // with *near* being defined as within 100 pixels outside the viewport edge. Elements immediately
  // outside the viewport are 'on the verge' of being scrolled to.

  function inX(elem, verge) {
	var r = rectangle(getNative(elem), verge);
	return !!r && r.right >= 0 && r.left <= viewportW();
  }

  function inY(elem, verge) {
	var r = rectangle(getNative(elem), verge);
	return !!r && r.bottom >= 0 && r.top <= viewportH();
  }

  function inViewport(elem, verge) {
	// equiv to: inX(elem, verge) && inY(elem, verge)
	// But just manually do both to avoid calling rectangle() and getNative() twice.
	// It actually gzips smaller this way too:
	var r = rectangle(getNative(elem), verge);
	return !!r && r.bottom >= 0 && r.top <= viewportH() && r.right >= 0 && r.left <= viewportW();
  }

  /**
   * @description Detect whether elem should act in src or markup mode.
   * @param {Element} elem
   * @return {number}
   */
  function detectMode(elem) {
	// Normalize to lowercase to ensure compatibility across HTML/XHTML/XML.
	// These are the elems that can use src attr per the W3 spec:
	//dev.w3.org/html5/spec-author-view/index.html#attributes-1
	//stackoverflow.com/q/8715689/770127
	//stackoverflow.com/a/4878963/770127
	var srcElems = { img:1, input:1, source:3, embed:3, track:3, iframe:5, audio:5, video:5, script:5 }
	  , modeID = srcElems[ elem.nodeName.toLowerCase() ] || -1;

	// -5 => markup mode for video/audio/iframe w/o src attr.
	// -1 => markup mode for any elem not in the array above.
	//  1 => src mode  for img/input (empty content model). Images.
	//  3 => src mode  for source/embed/track (empty content model). Media *or* time data.
	//  5 => src mode  for audio/video/iframe/script *with* src attr.
	//  If we at some point we need to differentiate <track> we'll use 4, but for now
	//  it's grouped with the other non-image empty content elems that use src.
	//  hasAttribute is not supported in IE7 so check elem.getAttribute('src')
	return 4 > modeID ? modeID : null != elem.getAttribute('src') ? 5 : -5;
  }

  /**
   * Response.store()
   * Store a data value on each elem targeted by a jQuery selector. We use this for storing an
   * elem's orig (no-js) state. This gives us the ability to return the elem to its orig state.
   * The data it stores is either the src attr or the innerHTML based on result of detectMode().
   * @since 0.1.9
   * @param {Object} $elems DOM element | jQuery object | nodeList | array of elements
   * @param {string} key is the key to use to store the orig value w/ @link api.jquery.com/data/
   * @param {string=} source  (@since 0.6.2) an optional attribute name to read data from
   */
  function store($elems, key, source) {
	var valToStore;
	if (!$elems || null == key) doError('store');
	source = typeof source == 'string' && source;
	route($elems, function(el) {
	  if (source) valToStore = el.getAttribute(source);
	  else if (0 < detectMode(el)) valToStore = el.getAttribute('src');
	  else valToStore = el.innerHTML;
	  null == valToStore ? deletes(el, key) : dataset(el, key, valToStore);
	});
	return Response;
  }

  /**
   * Response.access() Access data-* values for element from an array of data-* keys.
   * @since 0.1.9 added support for space-separated strings in 0.3.1
   * @param {Object} elem is a native or jQuery element whose values to access.
   * @param {Array|string} keys is an array or SSV string of data keys
   * @return {Array} dataset values corresponding to each key. Since 0.4.0 if
   *   the params are wrong then the return is an empty array.
   */
  function access(elem, keys) {
	var ret = [];
	elem && keys && each(compact(keys), function(k) {
	  ret.push(dataset(elem, k));
	}, elem);
	return ret;
  }

  function addTest(prop, fn) {
	if (typeof prop == 'string' && typeof fn == 'function') {
	  propTests[prop] = fn;
	  isCustom[prop] = 1;
	}
	return Response;
  }

  // Prototype object for element sets used in Response.create
  // Each element in the set inherits this as well, so some of the
  // methods apply to the set, while others apply to single elements.
  Elemset = (function() {
	var crossover = event.crossover
	  //, update = event.update
	  , min = Math.min;

	// Techically data attributes names can contain uppercase in HTML, but, The DOM lowercases
	// attributes, so they must be lowercase regardless when we target them in jQuery. Force them
	// lowercase here to prevent issues. Removing all punc marks except for dashes, underscores,
	// and periods so that we don't have to worry about escaping anything crazy.
	// Rules @link dev.w3.org/html5/spec/Overview.html#custom-data-attribute
	// jQuery selectors @link api.jquery.com/category/selectors/

	function sanitize (key) {
	  // Allow lowercase alphanumerics, dashes, underscores, and periods:
	  return typeof key == 'string' ? key.toLowerCase().replace(regexFunkyPunc, '') : '';
	}

	function ascending(a, b) {
	  return a - b;
	}

	return {
	  $e: 0       // object   jQuery object
	  , mode: 0       // integer  defined per element
	  , breakpoints: null // array  validated @ configure()
	  , prefix: null    // string   validated @ configure()
	  , prop: 'width'   // string   validated @ configure()
	  , keys: []      // array  defined @ configure()
	  , dynamic: null   // boolean  defined @ configure()
	  , custom: 0     // boolean  see addTest()
	  , values: []    // array  available values
	  , fn: 0       // callback the test fn, defined @ configure()
	  , verge: null     // integer  uses default based on device size
	  , newValue: 0
	  , currValue: 1
	  , aka: null
	  , lazy: null
	  , i: 0  // integer   the index of the current highest active breakpoint min
	  , uid: null

	  , reset: function() {
		var subjects = this.breakpoints, i = subjects.length, tempIndex = 0;
		while (!tempIndex && i--) this.fn(subjects[i]) && (tempIndex = i);
		if (tempIndex !== this.i) {
		  // Crossover occurred. Fire the crossover events:
		  $win.trigger(crossover).trigger(this.prop + crossover);
		  this.i = tempIndex || 0;
		}
		return this;
	  }

	  , configure: function(options) {
		merge(this, options);

		var i, points, prefix, aliases, aliasKeys, isNumeric = true, prop = this.prop;
		this.uid = suid++;
		if (null == this.verge) this.verge = min(screenMax, 500);
		this.fn = propTests[prop] || doError('create @fn');

		// If we get to here then we know the prop is one one our supported props:
		// 'width', 'height', 'device-width', 'device-height', 'device-pixel-ratio'
		if (null == this.dynamic) this.dynamic = 'device' !== prop.slice(0, 6);

		this.custom = isCustom[prop];
		prefix = this.prefix ? sift(map(compact(this.prefix), sanitize)) : ['min-' + prop + '-'];
		aliases = 1 < prefix.length ? prefix.slice(1) : 0;
		this.prefix = prefix[0];
		points = this.breakpoints;

		// Sort and validate (#valid8) custom breakpoints if supplied.
		// Must be done before keys are created so that the keys match:
		if (isArray(points)) {
		  each(points, function(v) {
			if (!v && v !== 0) throw 'invalid breakpoint';
			isNumeric = isNumeric && isFinite(v);
		  });

		  isNumeric && points.sort(ascending);
		  points.length || doError('create @breakpoints');
		} else {
		  // The default breakpoints are presorted.
		  points = defaultPoints[prop] || defaultPoints[prop.split('-').pop()] || doError('create @prop');
		}

		// Remove breakpoints that are above the device's max dimension,
		// in order to reduce the number of iterations needed later.
		this.breakpoints = isNumeric ? sift(points, function(n) {
		  return n <= screenMax;
		}) : points;

		// Use the breakpoints array to create array of data keys:
		this.keys = affix(this.breakpoints, this.prefix);
		this.aka = null; // Reset to just in case a value was merged in.

		if (aliases) {
		  aliasKeys = [];
		  i = aliases.length;
		  while (i--) aliasKeys.push(affix(this.breakpoints, aliases[i]));
		  this.aka = aliasKeys; // this.aka is an array of arrays (one for each alias)
		  this.keys = concat.apply(this.keys, aliasKeys); // flatten aliases into this.keys
		}

		sets.all = sets.all.concat(sets[this.uid] = this.keys); // combined keys ===> sets.all
		return this;
	  }

	  , target: function() {
		this.$e = $(sel(sets[this.uid])); // Cache selection. DOM must be ready.
		store(this.$e, initContentKey);  // Store original (no-js) value to data key.
		this.keys.push(initContentKey);  // #keys now equals #breakpoints+1
		return this;
	  }

	  // The rest of the methods are designed for use with single elements.
	  // They are for use in a cloned instances within a loop.
	  , decideValue: function() {
		// Return the first value from the values array that passes the boolean
		// test callback. If none pass the test, then return the fallback value.
		// this.breakpoints.length === this.values.length + 1
		// The extra member in the values array is the initContentKey value.
		var val = null, subjects = this.breakpoints, sL = subjects.length, i = sL;
		while (val == null && i--) this.fn(subjects[i]) && (val = this.values[i]);
		this.newValue = typeof val === 'string' ? val : this.values[sL];
		return this; // chainable
	  }

	  , prepareData: function(elem) {
		this.$e = $(elem);
		this.mode = detectMode(elem);
		this.values = access(this.$e, this.keys);
		if (this.aka) {
		  // If there are alias keys then there may be alias values. Merge the values from
		  // all the aliases into the values array. The merge method only merges in truthy values
		  // and prevents falsey values from overwriting truthy ones. (See Response.merge)
		  // Each of the this.aka arrays has the same length as the this.values
		  // array, so no new indexes will be added, just filled if there's truthy values.
		  var i = this.aka.length;
		  while (i--) this.values = merge(this.values, access(this.$e, this.aka[i]));
		}
		return this.decideValue();
	  }

	  , updateDOM: function() {
		// Apply the method that performs the actual swap. When updateDOM called this.$e and this.e refer
		// to single elements. Only update the DOM when the new value is different than the current value.
		if (this.currValue === this.newValue) { return this; }
		this.currValue = this.newValue;
		if (0 < this.mode) {
		  this.$e[0].setAttribute('src', this.newValue);
		} else if (null == this.newValue) {
		  this.$e.empty && this.$e.empty();
		} else {
		  if (this.$e.html) {
			this.$e.html(this.newValue);
		  } else {
			this.$e.empty && this.$e.empty();
			this.$e[0].innerHTML = this.newValue;
		  }
		}
		// this.$e.trigger(update); // may add this event in future
		return this;
	  }

	};
  }());

  // The keys are the prop and the values are the method that tests that prop.
  // The props with dashes in them are added via array notation below.
  // Props marked as dynamic change when the viewport is resized:
  propTests['width'] = band;   // dynamic
  propTests['height'] = wave;  // dynamic
  propTests['device-width'] = device.band;
  propTests['device-height'] = device.wave;
  propTests['device-pixel-ratio'] = dpr;

  function resize(fn) {
	$win.on('resize', fn);
	return Response; // chain
  }

  function crossover(prop, fn) {
	var temp, eventToFire, eventCrossover = event.crossover;
	if (typeof prop == 'function') {// support args in reverse
	  temp = fn;
	  fn = prop;
	  prop = temp;
	}
	eventToFire = prop ? ('' + prop + eventCrossover) : eventCrossover;
	$win.on(eventToFire, fn);
	return Response; // chain
  }

  /**
   * Response.action A facade for calling functions on both the ready and resize events.
   * @link http://responsejs.com/#action
   * @since 0.1.3
   * @param {Function|Array} action is the callback name or array of callback names to call.
   * @example Response.action(myFunc1) // call myFunc1() on ready/resize
   * @example Response.action([myFunc1, myFunc2]) // call myFunc1(), myFunc2() ...
   */
  function action(fnOrArr) {
	route(fnOrArr, function(fn) {
	  ready(fn);
	  resize(fn);
	});
	return Response;
  }

  /**
   * Response.create()  Create their own Response attribute sets, with custom
   *   breakpoints and data-* names.
   * @since 0.1.9
   * @param {Object|Array} args is an options object or an array of options objects.
   * @link http://responsejs.com/#create
   * @example Response.create(object) // single
   * @example Response.create([object1, object2]) // bulk
   */

  function create(args) {
	route(args, function(options) {
	  typeof options == 'object' || doError('create @args');

	  var elemset = procreate(Elemset).configure(options)
		, lowestNonZeroBP
		, verge = elemset.verge
		, breakpoints = elemset.breakpoints
		, scrollName = namespaceIt('scroll')
		, resizeName = namespaceIt('resize');

	  if (!breakpoints.length) return;

	  // Identify the lowest nonzero breakpoint. (They're already sorted low to high by now.)
	  lowestNonZeroBP = breakpoints[0] || breakpoints[1] || false;

	  ready(function() {
		var allLoaded = event.allLoaded, lazy = !!elemset.lazy;

		function resizeHandler() {
		  elemset.reset();
		  each(elemset.$e, function(el, i) {
			elemset[i].decideValue().updateDOM();
		  }).trigger(allLoaded);
		}

		function scrollHandler() {
		  each(elemset.$e, function(el, i) {
			inViewport(elemset[i].$e, verge) && elemset[i].updateDOM();
		  });
		}

		// Target elements containing this set's Response data attributes and chain into the
		// loop that occurs on ready. The selector is cached to elemset.$e for later use.
		each(elemset.target().$e, function(el, i) {
		  elemset[i] = procreate(elemset).prepareData(el);// Inherit from elemset
		  if (!lazy || inViewport(elemset[i].$e, verge)) {
			// If not lazy update all the elems in the set. If
			// lazy, only update elems in the current viewport.
			elemset[i].updateDOM();
		  }
		});

		// device-* props are static and only need to be tested once. The others are
		// dynamic, meaning they need to be tested on resize. Also if a device so small
		// that it doesn't support the lowestNonZeroBP then we don't need to listen for
		// resize events b/c we know the device can't resize beyond that breakpoint.

		if (elemset.dynamic && (elemset.custom || lowestNonZeroBP < screenMax)) {
		   resize(resizeHandler, resizeName);
		}

		// We don't have to re-decide the content on scrolls because neither the viewport or device
		// properties change from a scroll. This setup minimizes the operations binded to the scroll
		// event. Once everything in the set has been swapped once, the scroll handler is deactivated
		// through the use of a custom event.
		if (!lazy) return;

		$win.on(scrollName, scrollHandler);
		elemset.$e.one(allLoaded, function() {
		  $win.off(scrollName, scrollHandler);
		});
	  });
	});
	return Response;
  }

  function noConflict(callback) {
	if (root[name] === Response) root[name] = old;
	if (typeof callback == 'function') callback.call(root, Response);
	return Response;
  }

  // Handler for adding inx/inY/inViewport to $.fn (or another prototype).
  function exposeAreaFilters(engine, proto, force) {
	each(['inX', 'inY', 'inViewport'], function(methodName) {
	  (force || !proto[methodName]) && (proto[methodName] = function(verge, invert) {
		return engine(sift(this, function(el) {
		  return !!el && !invert === Response[methodName](el, verge);
		}));
	  });
	});
  }

  /**
   * Response.bridge
   * Bridges applicable methods into the specified host (e.g. jQuery)
   * @param {Function} host
   * @param {boolean=} force
   */
  function bridge(host, force) {
	if (typeof host == 'function' && host.fn) {
	  // Expose .dataset() and .deletes() to jQuery:
	  if (force || void 0 === host.fn.dataset) host.fn.dataset = datasetChainable;
	  if (force || void 0 === host.fn.deletes) host.fn.deletes = deletesChainable;
	  // Expose .inX() .inY() .inViewport()
	  exposeAreaFilters(host, host.fn, force);
	}
	return Response;
  }

  /**
   * Response.chain
   * @since 0.3.0
   * @deprecated Use Response.bridge instead.
   */
  function chain (host, force) {
	host = arguments.length ? host : $;
	return bridge(host, force);
  }

  Response = {
	deviceMin: function() { return screenMin; }
	, deviceMax: function() { return screenMax; }
	//, sets: function(prop) {// must be uid
	//  return $(sel(sets[prop] || sets.all));
	//}
	, noConflict: noConflict
	, chain: chain
	, bridge: bridge
	, create: create
	, addTest: addTest
	, datatize: datatize
	, camelize: camelize
	, render: render
	, store: store
	, access: access
	, target: target
	, object: procreate
	, crossover: crossover
	, action: action
	, resize: resize
	, ready: ready
	, affix: affix
	, sift: sift
	, dpr: dpr
	, deletes: deletes
	, scrollX: scrollX
	, scrollY: scrollY
	, deviceW: deviceW
	, deviceH: deviceH
	, device: device
	, inX: inX
	, inY: inY
	, route: route
	, merge: merge
	, media: media
	, wave: wave
	, band: band
	, map: map
	, each: each
	, inViewport: inViewport
	, dataset: dataset
	, viewportH: viewportH
	, viewportW: viewportW
  };

  // Initialize
  ready(function() {
	var settings = dataset(doc.body, 'responsejs'), parse = win.JSON && JSON.parse || $.parseJSON;
	settings = settings && parse ? parse(settings) : settings;
	settings && settings.create && create(settings.create);
	// Remove .no-responsejs and add .responsejs
	docElem.className = docElem.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, '$1$3') + ' responsejs ';
  });

  return Response;
}));

/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
"use strict";

/**
 * Core bootstrap for application code to load onto.
 *
 * As the application is broken down into many smaller application
 * files, we use an event based system to notify of changes between
 * commands.
 */
var DO = DO || {};

DO.Debug = false;
DO.OneTimeEvents = [];

/**
 * Subscribe a function callback to run when an event runs. Uses jQuery
 * on() internally so follows the same argument method as that
 *
 * See (http://api.jquery.com/on/)
 *
 * @param {mixed} string || object
 * @param {mixed} string || func
 * @param {function} func
 * @param {object} obj
 */
DO.Subscribe = function(events, selector, fn, data) {
	if (typeof selector === 'function') {
		if(typeof events === 'object') {
			$.each(events, function(i, event) {
				jQuery(document).on(event, selector);
				if (jQuery.inArray(events, DO.OneTimeEvents) !== -1) {
					DO.Fire(events,[]);
				}
			});
		}
		else {
			jQuery(document).on(events, selector);
			if (jQuery.inArray(events, DO.OneTimeEvents) !== -1) {
				DO.Fire(events,[]);
			}
		}
	}
	else {
		if(typeof events === 'array') {
			$.each(events, function(i, event) {
				jQuery(document).on(event, selector, data, fn);
				if (jQuery.inArray(events, DO.OneTimeEvents) !== -1) {
					DO.Fire(events,[]);
				}
			});
		}
		else {
			jQuery(document).on(events, selector, data, fn);
			if (jQuery.inArray(events, DO.OneTimeEvents) !== -1) {
				DO.Fire(events,[]);
			}
		}
	}
};

/**
 * Un subscribe a function callback.
 *
 * See (http://api.jquery.com/off/)
 *
 * @param {mixed} string || array
 * @param {string}
 */
DO.Unsubscribe = function(events, selector) {
	if (typeof events == 'string') {
		events = [ events ];
	}

	jQuery(document).off(events, selector);
};

/**
 * Trigger a new application event.
 *
 * Global events should be namespaced to app. These include functions
 * like app:ready. Specific page actions should be namespaced to their
 * areas. This includes app:table:update and friends. jQuery will always
 * be passed to the subscribed function.
 *
 * @param {string}
 * @param {array}
 */
DO.Fire = function(e, args, oneTimeEvent) {
	DO.Log('firing ' + e);

	if(typeof args !== "object") {
		args = [];
	}

	args.unshift(jQuery);
	jQuery(document).trigger(e, args);

	if (oneTimeEvent){
		DO.OneTimeEvents.push(e);
	}

};

/**
 * Log a given message to the console if it exists and the application is in
 * debug mode
 *
 * @param {string}
 * @param {string}
 */
DO.Log = function(msg, level) {
	if(DO.Debug !== false) {
		if(typeof level == "undefined") {
			level = 'log';
		}
		if(console) {
			switch(level) {
				case 'log': console.log(msg); break;
				case 'info': console.info(msg); break;
				case 'debug': console.debug(msg); break;
				case 'error': console.error(msg); break;
			}
		}
	}
};

/**
 * Retrieve the current breakpoint name.
 *
 * @returns {string}
 */
DO.CurrentBreakpoint = function() {
	return $.fn.whim('currentBreakpoint');
}

"use strict";

DO.Subscribe('app:ready', function(e, $) {

	// detect js
	var html = $('html');
	html.removeClass('no-js');

	// detect android
	if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
		html.addClass('android');
		if(navigator.userAgent.toLowerCase().indexOf('android 2') > -1 || navigator.userAgent.toLowerCase().indexOf('android 3') > -1) {
			html.addClass('android_old');
		}
	}
	if (navigator.userAgent.toLowerCase().indexOf('windows') > -1) {
		// needed to normalise fonts
		html.addClass('windows');
	}
	if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		// needed to normalise fonts
		html.addClass('firefox');
	}
	if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
		// needed to normalise fonts
		html.addClass('webkit');
	}
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		// needed to normalise CSS animations in plan carousel
		html.addClass('chrome');
	}
	if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
		// needed to normalise CSS animations in plan carousel
		html.addClass('safari');
	}
	if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1) {
		// needed to disable animation
		html.addClass('ios ipad');
	}
	if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
		// needed to disable animation
		html.addClass('ios iphone');
	}
	if (navigator.userAgent.toLowerCase().indexOf('msie 10') > -1) {
		html.addClass('ie ie10');
	}
	if (navigator.userAgent.toLowerCase().indexOf('trident/7.0') > -1) {
		html.addClass('ie ie11');
	}
	if (Modernizr.mq('only all')) {
		// needed so lower IE doesn't get retina styles
		html.addClass('mq');
	} else {
		html.addClass('no-mq');
	}

	if ($('html').hasClass('lte8')) {
		Modernizr.load([{
			load: '/app/build/global/js/vendor/respond.src.js'
		}]);
	} else {
		DO.Fire('app:css_loaded', [], true);
	}

});
/**
 *
 */
DO.Subscribe('app:ready', function(e, $) {

	// fix for browsers that don't properly move focus
	$('.skiplinks a').on('click', function() {
		var link = $(this).attr('href');
		$(link).focus();
	});

});

(function ($) {
	"use strict";

	window.savedBreakpoint = 'base';

	var	methods = {
		bodyFontSize: function () {
			if (!$.fn.whim.settings.body) {
				$.fn.whim.settings.body = $('body');
			}
			return parseInt($.fn.whim.settings.body.css('font-size'), 10);
		},

		virtualPx: function () {
			return Response.viewportW() / this.whim('bodyFontSize') * $.fn.whim.settings.baseFontSize;
		},

		actualPx: function (virtual) {
			return virtual / $.fn.whim.settings.baseFontSize * this.whim('bodyFontSize');
		},

		currentBreakpoint : function () {
			var breakpoint = null,
				breakPoints = $(window).data('breakpoints').x,
				breakPointsLabels = [],
				labels = ['base', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge', 'xxxxlarge'],
				i = 0;

			$(breakPoints).each(function () {
				breakPointsLabels[i] = [this, labels[i]];
				i = i + 1;
			});

			// makes operation more effiecient cos we stop as soon as it's true
			breakPointsLabels.reverse();
			for (i = 0; i < $(breakPointsLabels).length; i = i + 1) {
				if (Response.band(this.whim('actualPx', breakPointsLabels[i][0]))) {
					breakpoint = breakPointsLabels[i][1];
					break;
				}
			}

			return breakpoint;
		},

		trigger: function (breakpoint) {
			if (breakpoint === this.whim('currentBreakpoint')) {
				return false;
			}
			window.savedBreakpoint = this.whim('currentBreakpoint');
			return window.savedBreakpoint;
		}
	};

	$.fn.whim = function (method) {
		var returnData;
		if (methods[method]) {
			returnData = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			returnData = methods.init.apply(this, arguments);
		} else {
			returnData = $.error('Method ' +  method + ' does not exist on jQuery.whim');
		}
		return returnData;

	};

	$.fn.whim.settings = {
		baseFontSize: 10,
		body: null
	};

})(jQuery);
$(window).data('breakpoints', {
	x: [0, 480, 750, /*900,*/ 944, 1056, 1160, 1280, 1440]
});

DO.Subscribe('app:ready', function(e, $) {

	var html = $('html'),
		breakpoint = DO.CurrentBreakpoint();

	Response.create({
		mode: 'src',
		prefix: 'src',
		breakpoints: $(window).data('breakpoints').x
	});

	Response.action(function() {
		if(DO.CurrentBreakpoint() !== breakpoint) {
			DO.Fire('app:breakpointchange');

			var from = breakpoint;
			breakpoint = DO.CurrentBreakpoint();

			if(!/large$/.test(from) && /large$/.test(breakpoint)) {
				DO.Fire('app:breakpointchangetodesktop');
			}

			if(/large$/.test(from) && !/large$/.test(breakpoint)) {
				DO.Fire('app:breakpointchangetomobile');
			}

			if((!/small$/.test(from) && !/base$/.test(from)) && (/small$/.test(breakpoint) || /base$/.test(breakpoint) )) {
				DO.Fire('app:breakpointchangetophone');
			}

			if((/small$/.test(from) || /base$/.test(from)) && (!/small$/.test(breakpoint) && !/base$/.test(breakpoint))) {
				DO.Fire('app:breakpointchangetotablet');
			}
		}
	});

});

DO.Subscribe('ajax:success', function(e, $) {
	Response.create({
		mode: 'src',
		prefix: 'src',
		breakpoints: $(window).data('breakpoints').x
	});
});

DO.Subscribe(['app:breakpointchange', 'app:ready'], function(e, $) {
	var html = $("html");

	html.attr('class',
		html.attr('class')
			.replace(/response_[\w]*(\s|\w$)/g, '')
			.replace(/[\s]+/g, ' ')
	);

	html.addClass('response_'+ DO.CurrentBreakpoint());
});

// https://github.com/remy/polyfills
// Polyfill for classlist


(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

var prototype = Array.prototype,
	push = prototype.push,
	splice = prototype.splice,
	join = prototype.join;

function DOMTokenList(el) {
  this.el = el;
  // The className needs to be trimmed and split on whitespace
  // to retrieve a list of classes.
  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
	push.call(this, classes[i]);
  }
};

DOMTokenList.prototype = {
  add: function(token) {
	if(this.contains(token)) return;
	push.call(this, token);
	this.el.className = this.toString();
  },
  contains: function(token) {
	return this.el.className.indexOf(token) != -1;
  },
  item: function(index) {
	return this[index] || null;
  },
  remove: function(token) {
	if (!this.contains(token)) return;
	for (var i = 0; i < this.length; i++) {
	  if (this[i] == token) break;
	}
	splice.call(this, i, 1);
	this.el.className = this.toString();
  },
  toString: function() {
	return join.call(this, ' ');
  },
  toggle: function(token) {
	if (!this.contains(token)) {
	  this.add(token);
	} else {
	  this.remove(token);
	}

	return this.contains(token);
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
	if (Object.defineProperty) {
		Object.defineProperty(obj, prop,{
			get : getter
		});
	} else {
		obj.__defineGetter__(prop, getter);
	}
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);
});

})();

/*
 *	jQuery dotdotdot 1.7.4
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Licensed under the MIT license.
 *	http://en.wikipedia.org/wiki/MIT_License
 */

(function( $, undef )
{
	if ( $.fn.dotdotdot )
	{
		return;
	}

	$.fn.dotdotdot = function( o )
	{
		if ( this.length == 0 )
		{
			$.fn.dotdotdot.debug( 'No element found for "' + this.selector + '".' );
			return this;
		}
		if ( this.length > 1 )
		{
			return this.each(
				function()
				{
					$(this).dotdotdot( o );
				}
			);
		}


		var $dot = this;

		if ( $dot.data( 'dotdotdot' ) )
		{
			$dot.trigger( 'destroy.dot' );
		}

		$dot.data( 'dotdotdot-style', $dot.attr( 'style' ) || '' );
		$dot.css( 'word-wrap', 'break-word' );
		if ($dot.css( 'white-space' ) === 'nowrap')
		{
			$dot.css( 'white-space', 'normal' );
		}

		$dot.bind_events = function()
		{
			$dot.bind(
				'update.dot',
				function( e, c )
				{
					$dot.removeClass("is-truncated");
					e.preventDefault();
					e.stopPropagation();

					switch( typeof opts.height )
					{
						case 'number':
							opts.maxHeight = opts.height;
							break;

						case 'function':
							opts.maxHeight = opts.height.call( $dot[ 0 ] );
							break;

						default:
							opts.maxHeight = getTrueInnerHeight( $dot );
							break;
					}

					opts.maxHeight += opts.tolerance;

					if ( typeof c != 'undefined' )
					{
						if ( typeof c == 'string' || ('nodeType' in c && c.nodeType === 1) )
						{
							 c = $('<div />').append( c ).contents();
						}
						if ( c instanceof $ )
						{
							orgContent = c;
						}
					}

					$inr = $dot.wrapInner( '<div class="dotdotdot" />' ).children();
					$inr.contents()
						.detach()
						.end()
						.append( orgContent.clone( true ) )
						.find( 'br' )
						.replaceWith( '  <br />  ' )
						.end()
						.css({
							'height'	: 'auto',
							'width'		: 'auto',
							'border'	: 'none',
							'padding'	: 0,
							'margin'	: 0
						});

					var after = false,
						trunc = false;

					if ( conf.afterElement )
					{
						after = conf.afterElement.clone( true );
						after.show();
						conf.afterElement.detach();
					}

					if ( test( $inr, opts ) )
					{
						if ( opts.wrap == 'children' )
						{
							trunc = children( $inr, opts, after );
						}
						else
						{
							trunc = ellipsis( $inr, $dot, $inr, opts, after );
						}
					}
					$inr.replaceWith( $inr.contents() );
					$inr = null;

					if ( $.isFunction( opts.callback ) )
					{
						opts.callback.call( $dot[ 0 ], trunc, orgContent );
					}

					conf.isTruncated = trunc;


					return trunc;
				}

			).bind(
				'isTruncated.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], conf.isTruncated );
					}
					return conf.isTruncated;
				}

			).bind(
				'originalContent.dot',
				function( e, fn )
				{
					e.preventDefault();
					e.stopPropagation();

					if ( typeof fn == 'function' )
					{
						fn.call( $dot[ 0 ], orgContent );
					}
					return orgContent;
				}

			).bind(
				'destroy.dot',
				function( e )
				{
					e.preventDefault();
					e.stopPropagation();

					$dot.unwatch()
						.unbind_events()
						.contents()
						.detach()
						.end()
						.append( orgContent )
						.attr( 'style', $dot.data( 'dotdotdot-style' ) || '' )
						.data( 'dotdotdot', false );
				}
			);
			return $dot;
		};	//	/bind_events

		$dot.unbind_events = function()
		{
			$dot.unbind('.dot');
			return $dot;
		};	//	/unbind_events

		$dot.watch = function()
		{
			$dot.unwatch();
			if ( opts.watch == 'window' )
			{
				var $window = $(window),
					_wWidth = $window.width(),
					_wHeight = $window.height();

				$window.bind(
					'resize.dot' + conf.dotId,
					function()
					{
						if ( _wWidth != $window.width() || _wHeight != $window.height() || !opts.windowResizeFix )
						{
							_wWidth = $window.width();
							_wHeight = $window.height();

							if ( watchInt )
							{
								clearInterval( watchInt );
							}
							watchInt = setTimeout(
								function()
								{
									$dot.trigger( 'update.dot' );
								}, 100
							);
						}
					}
				);
			}
			else
			{
				watchOrg = getSizes( $dot );
				watchInt = setInterval(
					function()
					{
						if ( $dot.is( ':visible' ) )
						{
							var watchNew = getSizes( $dot );
							if ( watchOrg.width  != watchNew.width ||
								 watchOrg.height != watchNew.height )
							{
								$dot.trigger( 'update.dot' );
								watchOrg = watchNew;
							}
						}
					}, 500
				);
			}
			return $dot;
		};
		$dot.unwatch = function()
		{
			$(window).unbind( 'resize.dot' + conf.dotId );
			if ( watchInt )
			{
				clearInterval( watchInt );
			}
			return $dot;
		};

		var	orgContent	= $dot.contents(),
			opts 		= $.extend( true, {}, $.fn.dotdotdot.defaults, o ),
			conf		= {},
			watchOrg	= {},
			watchInt	= null,
			$inr		= null;


		if ( !( opts.lastCharacter.remove instanceof Array ) )
		{
			opts.lastCharacter.remove = $.fn.dotdotdot.defaultArrays.lastCharacter.remove;
		}
		if ( !( opts.lastCharacter.noEllipsis instanceof Array ) )
		{
			opts.lastCharacter.noEllipsis = $.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis;
		}


		conf.afterElement	= getElement( opts.after, $dot );
		conf.isTruncated	= false;
		conf.dotId			= dotId++;


		$dot.data( 'dotdotdot', true )
			.bind_events()
			.trigger( 'update.dot' );

		if ( opts.watch )
		{
			$dot.watch();
		}

		return $dot;
	};


	//	public
	$.fn.dotdotdot.defaults = {
		'ellipsis'			: '... ',
		'wrap'				: 'word',
		'fallbackToLetter'	: true,
		'lastCharacter'		: {},
		'tolerance'			: 0,
		'callback'			: null,
		'after'				: null,
		'height'			: null,
		'watch'				: false,
		'windowResizeFix'	: true
	};
	$.fn.dotdotdot.defaultArrays = {
		'lastCharacter'		: {
			'remove'			: [ ' ', '\u3000', ',', ';', '.', '!', '?' ],
			'noEllipsis'		: []
		}
	};
	$.fn.dotdotdot.debug = function( msg ) {};


	//	private
	var dotId = 1;

	function children( $elem, o, after )
	{
		var $elements 	= $elem.children(),
			isTruncated	= false;

		$elem.empty();

		for ( var a = 0, l = $elements.length; a < l; a++ )
		{
			var $e = $elements.eq( a );
			$elem.append( $e );
			if ( after )
			{
				$elem.append( after );
			}
			if ( test( $elem, o ) )
			{
				$e.remove();
				isTruncated = true;
				break;
			}
			else
			{
				if ( after )
				{
					after.detach();
				}
			}
		}
		return isTruncated;
	}
	function ellipsis( $elem, $d, $i, o, after )
	{
		var isTruncated	= false;

		//	Don't put the ellipsis directly inside these elements
		var notx = 'a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style';

		//	Don't remove these elements even if they are after the ellipsis
		var noty = 'script, .dotdotdot-keep';

		$elem
			.contents()
			.detach()
			.each(
				function()
				{

					var e	= this,
						$e	= $(e);

					if ( typeof e == 'undefined' )
					{
						return true;
					}
					else if ( $e.is( noty ) )
					{
						$elem.append( $e );
					}
					else if ( isTruncated )
					{
						return true;
					}
					else
					{
						$elem.append( $e );
						if ( after && !$e.is( o.after ) && !$e.find( o.after ).length  )
						{
							$elem[ $elem.is( notx ) ? 'after' : 'append' ]( after );
						}
						if ( test( $i, o ) )
						{
							if ( e.nodeType == 3 ) // node is TEXT
							{
								isTruncated = ellipsisElement( $e, $d, $i, o, after );
							}
							else
							{
								isTruncated = ellipsis( $e, $d, $i, o, after );
							}

							if ( !isTruncated )
							{
								$e.detach();
								isTruncated = true;
							}
						}

						if ( !isTruncated )
						{
							if ( after )
							{
								after.detach();
							}
						}
					}
				}
			);
		$d.addClass("is-truncated");
		return isTruncated;
	}
	function ellipsisElement( $e, $d, $i, o, after )
	{
		var e = $e[ 0 ];

		if ( !e )
		{
			return false;
		}

		var txt			= getTextContent( e ),
			space		= ( txt.indexOf(' ') !== -1 ) ? ' ' : '\u3000',
			separator	= ( o.wrap == 'letter' ) ? '' : space,
			textArr		= txt.split( separator ),
			position 	= -1,
			midPos		= -1,
			startPos	= 0,
			endPos		= textArr.length - 1;


		//	Only one word
		if ( o.fallbackToLetter && startPos == 0 && endPos == 0 )
		{
			separator	= '';
			textArr		= txt.split( separator );
			endPos		= textArr.length - 1;
		}

		while ( startPos <= endPos && !( startPos == 0 && endPos == 0 ) )
		{
			var m = Math.floor( ( startPos + endPos ) / 2 );
			if ( m == midPos )
			{
				break;
			}
			midPos = m;

			setTextContent( e, textArr.slice( 0, midPos + 1 ).join( separator ) + o.ellipsis );
			$i.children()
				.each(
					function()
					{
						$(this).toggle().toggle();
					}
				);

			if ( !test( $i, o ) )
			{
				position = midPos;
				startPos = midPos;
			}
			else
			{
				endPos = midPos;

				//	Fallback to letter
				if (o.fallbackToLetter && startPos == 0 && endPos == 0 )
				{
					separator	= '';
					textArr		= textArr[ 0 ].split( separator );
					position	= -1;
					midPos		= -1;
					startPos	= 0;
					endPos		= textArr.length - 1;
				}
			}
		}

		if ( position != -1 && !( textArr.length == 1 && textArr[ 0 ].length == 0 ) )
		{
			txt = addEllipsis( textArr.slice( 0, position + 1 ).join( separator ), o );
			setTextContent( e, txt );
		}
		else
		{
			var $w = $e.parent();
			$e.detach();

			var afterLength = ( after && after.closest($w).length ) ? after.length : 0;

			if ( $w.contents().length > afterLength )
			{
				e = findLastTextNode( $w.contents().eq( -1 - afterLength ), $d );
			}
			else
			{
				e = findLastTextNode( $w, $d, true );
				if ( !afterLength )
				{
					$w.detach();
				}
			}
			if ( e )
			{
				txt = addEllipsis( getTextContent( e ), o );
				setTextContent( e, txt );
				if ( afterLength && after )
				{
					$(e).parent().append( after );
				}
			}
		}

		return true;
	}
	function test( $i, o )
	{
		return $i.innerHeight() > o.maxHeight;
	}
	function addEllipsis( txt, o )
	{
		while( $.inArray( txt.slice( -1 ), o.lastCharacter.remove ) > -1 )
		{
			txt = txt.slice( 0, -1 );
		}
		if ( $.inArray( txt.slice( -1 ), o.lastCharacter.noEllipsis ) < 0 )
		{
			txt += o.ellipsis;
		}
		return txt;
	}
	function getSizes( $d )
	{
		return {
			'width'	: $d.innerWidth(),
			'height': $d.innerHeight()
		};
	}
	function setTextContent( e, content )
	{
		if ( e.innerText )
		{
			e.innerText = content;
		}
		else if ( e.nodeValue )
		{
			e.nodeValue = content;
		}
		else if (e.textContent)
		{
			e.textContent = content;
		}

	}
	function getTextContent( e )
	{
		if ( e.innerText )
		{
			return e.innerText;
		}
		else if ( e.nodeValue )
		{
			return e.nodeValue;
		}
		else if ( e.textContent )
		{
			return e.textContent;
		}
		else
		{
			return "";
		}
	}
	function getPrevNode( n )
	{
		do
		{
			n = n.previousSibling;
		}
		while ( n && n.nodeType !== 1 && n.nodeType !== 3 );

		return n;
	}
	function findLastTextNode( $el, $top, excludeCurrent )
	{
		var e = $el && $el[ 0 ], p;
		if ( e )
		{
			if ( !excludeCurrent )
			{
				if ( e.nodeType === 3 )
				{
					return e;
				}
				if ( $.trim( $el.text() ) )
				{
					return findLastTextNode( $el.contents().last(), $top );
				}
			}
			p = getPrevNode( e );
			while ( !p )
			{
				$el = $el.parent();
				if ( $el.is( $top ) || !$el.length )
				{
					return false;
				}
				p = getPrevNode( $el[0] );
			}
			if ( p )
			{
				return findLastTextNode( $(p), $top );
			}
		}
		return false;
	}
	function getElement( e, $i )
	{
		if ( !e )
		{
			return false;
		}
		if ( typeof e === 'string' )
		{
			e = $(e, $i);
			return ( e.length )
				? e
				: false;
		}
		return !e.jquery
			? false
			: e;
	}
	function getTrueInnerHeight( $el )
	{
		var h = $el.innerHeight(),
			a = [ 'paddingTop', 'paddingBottom' ];

		for ( var z = 0, l = a.length; z < l; z++ )
		{
			var m = parseInt( $el.css( a[ z ] ), 10 );
			if ( isNaN( m ) )
			{
				m = 0;
			}
			h -= m;
		}
		return h;
	}


	//	override jQuery.html
	var _orgHtml = $.fn.html;
	$.fn.html = function( str )
	{
		if ( str != undef && !$.isFunction( str ) && this.data( 'dotdotdot' ) )
		{
			return this.trigger( 'update', [ str ] );
		}
		return _orgHtml.apply( this, arguments );
	};


	//	override jQuery.text
	var _orgText = $.fn.text;
	$.fn.text = function( str )
	{
		if ( str != undef && !$.isFunction( str ) && this.data( 'dotdotdot' ) )
		{
			str = $( '<div />' ).text( str ).html();
			return this.trigger( 'update', [ str ] );
		}
		return _orgText.apply( this, arguments );
	};


})( jQuery );

/*!
 * jQuery Placeholder Plugin v2.3.1
 * https://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {

    /****
     * Allows plugin behavior simulation in modern browsers for easier debugging. 
     * When setting to true, use attribute "placeholder-x" rather than the usual "placeholder" in your inputs/textareas 
     * i.e. <input type="text" placeholder-x="my placeholder text" />
     */
    var debugMode = false; 

    // Opera Mini v7 doesn't support placeholder although its DOM seems to indicate so
    var isOperaMini = Object.prototype.toString.call(window.operamini) === '[object OperaMini]';
    var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini && !debugMode;
    var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini && !debugMode;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;
    var settings = {};

    if (isInputSupported && isTextareaSupported) {

        placeholder = $.fn.placeholder = function() {
            return this;
        };

        placeholder.input = true;
        placeholder.textarea = true;

    } else {

        placeholder = $.fn.placeholder = function(options) {

            var defaults = {customClass: 'placeholder'};
            settings = $.extend({}, defaults, options);

            return this.filter((isInputSupported ? 'textarea' : ':input') + '[' + (debugMode ? 'placeholder-x' : 'placeholder') + ']')
                .not('.'+settings.customClass)
                .not(':radio, :checkbox, [type=hidden]')
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {

                var $element = $(element);
                var $passwordInput = $element.data('placeholder-password');

                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass(settings.customClass) ? '' : element.value;
            },
            'set': function(element, value) {

                var $element = $(element);
                var $replacement;
                var $passwordInput;

                if (value !== '') {

                    $replacement = $element.data('placeholder-textinput');
                    $passwordInput = $element.data('placeholder-password');

                    if ($replacement) {
                        clearPlaceholder.call($replacement[0], true, value) || (element.value = value);
                        $replacement[0].value = value;

                    } else if ($passwordInput) {
                        clearPlaceholder.call(element, true, value) || ($passwordInput[0].value = value);
                        element.value = value;
                    }
                }

                if (!$element.data('placeholder-enabled')) {
                    element.value = value;
                    return $element;
                }

                if (value === '') {
                    
                    element.value = value;
                    
                    // Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }

                } else {
                    
                    if ($element.hasClass(settings.customClass)) {
                        clearPlaceholder.call(element);
                    }

                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }

        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.'+settings.customClass, this).each(function() {
                    clearPlaceholder.call(this, true, '');
                });

                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {

            var clearPlaceholders = true;

            try {
                // Prevent IE javascript:void(0) anchors from causing cleared values
                if (document.activeElement.toString() === 'javascript:void(0)') {
                    clearPlaceholders = false;
                }
            } catch (exception) { }

            if (clearPlaceholders) {
                $('.'+settings.customClass).each(function() {
                    this.value = '';
                });
            }
        });
    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;

        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });

        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        
        var input = this;
        var $input = $(this);
        
        if (input.value === $input.attr((debugMode ? 'placeholder-x' : 'placeholder')) && $input.hasClass(settings.customClass)) {
            
            input.value = '';
            $input.removeClass(settings.customClass);

            if ($input.data('placeholder-password')) {

                $input = $input.hide().nextAll('input[type="password"]:first').show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    $input[0].value = value;

                    return value;
                }

                $input.focus();

            } else {
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder(event) {
        var $replacement;
        var input = this;
        var $input = $(this);
        var id = input.id;

        // If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
        if (event && event.type === 'blur' && $input.hasClass(settings.customClass)) {
            return;
        }

        if (input.value === '') {
            if (input.type === 'password') {
                if (!$input.data('placeholder-textinput')) {
                    
                    try {
                        $replacement = $input.clone().prop({ 'type': 'text' });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                    }

                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-enabled': true,
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);

                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }

                input.value = '';
                $input = $input.removeAttr('id').hide().prevAll('input[type="text"]:first').attr('id', $input.data('placeholder-id')).show();

            } else {
                
                var $passwordInput = $input.data('placeholder-password');

                if ($passwordInput) {
                    $passwordInput[0].value = '';
                    $input.attr('id', $input.data('placeholder-id')).show().nextAll('input[type="password"]:last').hide().removeAttr('id');
                }
            }

            $input.addClass(settings.customClass);
            $input[0].value = $input.attr((debugMode ? 'placeholder-x' : 'placeholder'));

        } else {
            $input.removeClass(settings.customClass);
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        try {
            return document.activeElement;
        } catch (exception) {}
    }
}));

/*!
 * Shim for MutationObserver interface
 * Author: Graeme Yeates (github.com/megawac)
 * Repository: https://github.com/megawac/MutationObserver.js
 * License: WTFPL V2, 2004 (wtfpl.net).
 * Though credit and staring the repo will make me feel pretty, you can modify and redistribute as you please.
 * Attempts to follow spec (http:// www.w3.org/TR/dom/#mutation-observers) as closely as possible for native javascript
 * See https://github.com/WebKit/webkit/blob/master/Source/WebCore/dom/MutationObserver.cpp for current webkit source c++ implementation
 */

/**
 * prefix bugs:
	- https://bugs.webkit.org/show_bug.cgi?id=85161
	- https://bugzilla.mozilla.org/show_bug.cgi?id=749920
 * Don't use WebKitMutationObserver as Safari (6.0.5-6.1) use a buggy implementation
*/
window.MutationObserver = window.MutationObserver || (function(undefined) {
	"use strict";
	/**
	 * @param {function(Array.<MutationRecord>, MutationObserver)} listener
	 * @constructor
	 */
	function MutationObserver(listener) {
		/**
		 * @type {Array.<Object>}
		 * @private
		 */
		this._watched = [];
		/** @private */
		this._listener = listener;
	}

	/**
	 * Start a recursive timeout function to check all items being observed for mutations
	 * @type {MutationObserver} observer
	 * @private
	 */
	function startMutationChecker(observer) {
		(function check() {
			var mutations = observer.takeRecords();

			if (mutations.length) { // fire away
				// calling the listener with context is not spec but currently consistent with FF and WebKit
				observer._listener(mutations, observer);
			}
			/** @private */
			observer._timeout = setTimeout(check, MutationObserver._period);
		})();
	}

	/**
	 * Period to check for mutations (~32 times/sec)
	 * @type {number}
	 * @expose
	 */
	MutationObserver._period = 30 /*ms+runtime*/ ;

	/**
	 * Exposed API
	 * @expose
	 * @final
	 */
	MutationObserver.prototype = {
		/**
		 * see http:// dom.spec.whatwg.org/#dom-mutationobserver-observe
		 * not going to throw here but going to follow the current spec config sets
		 * @param {Node|null} $target
		 * @param {Object|null} config : MutationObserverInit configuration dictionary
		 * @expose
		 * @return undefined
		 */
		observe: function($target, config) {
			/**
			 * Using slightly different names so closure can go ham
			 * @type {!Object} : A custom mutation config
			 */
			var settings = {
				attr: !! (config.attributes || config.attributeFilter || config.attributeOldValue),

				// some browsers enforce that subtree must be set with childList, attributes or characterData.
				// We don't care as spec doesn't specify this rule.
				kids: !! config.childList,
				descendents: !! config.subtree,
				charData: !! (config.characterData || config.characterDataOldValue)
			};

			var watched = this._watched;

			// remove already observed target element from pool
			for (var i = 0; i < watched.length; i++) {
				if (watched[i].tar === $target) watched.splice(i, 1);
			}

			if (config.attributeFilter) {
				/**
				 * converts to a {key: true} dict for faster lookup
				 * @type {Object.<String,Boolean>}
				 */
				settings.afilter = reduce(config.attributeFilter, function(a, b) {
					a[b] = true;
					return a;
				}, {});
			}

			watched.push({
				tar: $target,
				fn: createMutationSearcher($target, settings)
			});

			// reconnect if not connected
			if (!this._timeout) {
				startMutationChecker(this);
			}
		},

		/**
		 * Finds mutations since last check and empties the "record queue" i.e. mutations will only be found once
		 * @expose
		 * @return {Array.<MutationRecord>}
		 */
		takeRecords: function() {
			var mutations = [];
			var watched = this._watched;

			for (var i = 0; i < watched.length; i++) {
				watched[i].fn(mutations);
			}

			return mutations;
		},

		/**
		 * @expose
		 * @return undefined
		 */
		disconnect: function() {
			this._watched = []; // clear the stuff being observed
			clearTimeout(this._timeout); // ready for garbage collection
			/** @private */
			this._timeout = null;
		}
	};

	/**
	 * Simple MutationRecord pseudoclass. No longer exposing as its not fully compliant
	 * @param {Object} data
	 * @return {Object} a MutationRecord
	 */
	function MutationRecord(data) {
		var settings = { // technically these should be on proto so hasOwnProperty will return false for non explicitly props
			type: null,
			target: null,
			addedNodes: [],
			removedNodes: [],
			previousSibling: null,
			nextSibling: null,
			attributeName: null,
			attributeNamespace: null,
			oldValue: null
		};
		for (var prop in data) {
			if (has(settings, prop) && data[prop] !== undefined) settings[prop] = data[prop];
		}
		return settings;
	}

	/**
	 * Creates a func to find all the mutations
	 *
	 * @param {Node} $target
	 * @param {!Object} config : A custom mutation config
	 */
	function createMutationSearcher($target, config) {
		/** type {Elestuct} */
		var $oldstate = clone($target, config); // create the cloned datastructure

		/**
		 * consumes array of mutations we can push to
		 *
		 * @param {Array.<MutationRecord>} mutations
		 */
		return function(mutations) {
			var olen = mutations.length, dirty;

			// Alright we check base level changes in attributes... easy
			if (config.attr && $oldstate.attr) {
				findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
			}

			// check childlist or subtree for mutations
			if (config.kids || config.descendents) {
				dirty = searchSubtree(mutations, $target, $oldstate, config);
			}

			// reclone data structure if theres changes
			if (dirty || mutations.length !== olen) {
				/** type {Elestuct} */
				$oldstate = clone($target, config);
			}
		};
	}

	/* attributes + attributeFilter helpers */

	// Check if the environment has the attribute bug (#4) which cause
	// element.attributes.style to always be null.
	var hasAttributeBug = document.createElement("i");
	hasAttributeBug.style.top = 0;
	hasAttributeBug = hasAttributeBug.attributes.style.value != "null";

	/**
	 * Gets an attribute value in an environment without attribute bug
	 *
	 * @param {Node} el
	 * @param {Attr} attr
	 * @return {String} an attribute value
	 */
	function getAttributeSimple(el, attr) {
		// There is a potential for a warning to occur here if the attribute is a
		// custom attribute in IE<9 with a custom .toString() method. This is
		// just a warning and doesn't affect execution (see #21)
		return attr.value;
	}

	/**
	 * Gets an attribute value with special hack for style attribute (see #4)
	 *
	 * @param {Node} el
	 * @param {Attr} attr
	 * @return {String} an attribute value
	 */
	function getAttributeWithStyleHack(el, attr) {
		// As with getAttributeSimple there is a potential warning for custom attribtues in IE7.
		return attr.name !== "style" ? attr.value : el.style.cssText;
	}

	var getAttributeValue = hasAttributeBug ? getAttributeSimple : getAttributeWithStyleHack;

	/**
	 * fast helper to check to see if attributes object of an element has changed
	 * doesnt handle the textnode case
	 *
	 * @param {Array.<MutationRecord>} mutations
	 * @param {Node} $target
	 * @param {Object.<string, string>} $oldstate : Custom attribute clone data structure from clone
	 * @param {Object} filter
	 */
	function findAttributeMutations(mutations, $target, $oldstate, filter) {
		var checked = {};
		var attributes = $target.attributes;
		var attr;
		var name;
		var i = attributes.length;
		while (i--) {
			attr = attributes[i];
			name = attr.name;
			if (!filter || has(filter, name)) {
				if (getAttributeValue($target, attr) !== $oldstate[name]) {
					// The pushing is redundant but gzips very nicely
					mutations.push(MutationRecord({
						type: "attributes",
						target: $target,
						attributeName: name,
						oldValue: $oldstate[name],
						attributeNamespace: attr.namespaceURI // in ie<8 it incorrectly will return undefined
					}));
				}
				checked[name] = true;
			}
		}
		for (name in $oldstate) {
			if (!(checked[name])) {
				mutations.push(MutationRecord({
					target: $target,
					type: "attributes",
					attributeName: name,
					oldValue: $oldstate[name]
				}));
			}
		}
	}

	/**
	 * searchSubtree: array of mutations so far, element, element clone, bool
	 * synchronous dfs comparision of two nodes
	 * This function is applied to any observed element with childList or subtree specified
	 * Sorry this is kind of confusing as shit, tried to comment it a bit...
	 * codereview.stackexchange.com/questions/38351 discussion of an earlier version of this func
	 *
	 * @param {Array} mutations
	 * @param {Node} $target
	 * @param {!Object} $oldstate : A custom cloned node from clone()
	 * @param {!Object} config : A custom mutation config
	 */
	function searchSubtree(mutations, $target, $oldstate, config) {
		// Track if the tree is dirty and has to be recomputed (#14).
		var dirty;
		/*
		 * Helper to identify node rearrangment and stuff...
		 * There is no gaurentee that the same node will be identified for both added and removed nodes
		 * if the positions have been shuffled.
		 * conflicts array will be emptied by end of operation
		 */
		function resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes) {
			// the distance between the first conflicting node and the last
			var distance = conflicts.length - 1;
			// prevents same conflict being resolved twice consider when two nodes switch places.
			// only one should be given a mutation event (note -~ is used as a math.ceil shorthand)
			var counter = -~((distance - numAddedNodes) / 2);
			var $cur;
			var oldstruct;
			var conflict;
			while ((conflict = conflicts.pop())) {
				$cur = $kids[conflict.i];
				oldstruct = $oldkids[conflict.j];

				// attempt to determine if there was node rearrangement... won't gaurentee all matches
				// also handles case where added/removed nodes cause nodes to be identified as conflicts
				if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
					mutations.push(MutationRecord({
						type: "childList",
						target: node,
						addedNodes: [$cur],
						removedNodes: [$cur],
						// haha don't rely on this please
						nextSibling: $cur.nextSibling,
						previousSibling: $cur.previousSibling
					}));
					counter--; // found conflict
				}

				// Alright we found the resorted nodes now check for other types of mutations
				if (config.attr && oldstruct.attr) findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
				if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
					mutations.push(MutationRecord({
						type: "characterData",
						target: $cur
					}));
				}
				// now look @ subtree
				if (config.descendents) findMutations($cur, oldstruct);
			}
		}

		/**
		 * Main worker. Finds and adds mutations if there are any
		 * @param {Node} node
		 * @param {!Object} old : A cloned data structure using internal clone
		 */
		function findMutations(node, old) {
			var $kids = node.childNodes;
			var $oldkids = old.kids;
			var klen = $kids.length;
			// $oldkids will be undefined for text and comment nodes
			var olen = $oldkids ? $oldkids.length : 0;
			// if (!olen && !klen) return; // both empty; clearly no changes

			// we delay the intialization of these for marginal performance in the expected case (actually quite signficant on large subtrees when these would be otherwise unused)
			// map of checked element of ids to prevent registering the same conflict twice
			var map;
			// array of potential conflicts (ie nodes that may have been re arranged)
			var conflicts;
			var id; // element id from getElementId helper
			var idx; // index of a moved or inserted element

			var oldstruct;
			// current and old nodes
			var $cur;
			var $old;
			// track the number of added nodes so we can resolve conflicts more accurately
			var numAddedNodes = 0;

			// iterate over both old and current child nodes at the same time
			var i = 0, j = 0;
			// while there is still anything left in $kids or $oldkids (same as i < $kids.length || j < $oldkids.length;)
			while( i < klen || j < olen ) {
				// current and old nodes at the indexs
				$cur = $kids[i];
				oldstruct = $oldkids[j];
				$old = oldstruct && oldstruct.node;

				if ($cur === $old) { // expected case - optimized for this case
					// check attributes as specified by config
					if (config.attr && oldstruct.attr) /* oldstruct.attr instead of textnode check */findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
					// check character data if node is a comment or textNode and it's being observed
					if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
						mutations.push(MutationRecord({
							type: "characterData",
							target: $cur
						}));
					}

					// resolve conflicts; it will be undefined if there are no conflicts - otherwise an array
					if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);

					// recurse on next level of children. Avoids the recursive call when there are no children left to iterate
					if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) findMutations($cur, oldstruct);

					i++;
					j++;
				} else { // (uncommon case) lookahead until they are the same again or the end of children
					dirty = true;
					if (!map) { // delayed initalization (big perf benefit)
						map = {};
						conflicts = [];
					}
					if ($cur) {
						// check id is in the location map otherwise do a indexOf search
						if (!(map[id = getElementId($cur)])) { // to prevent double checking
							// mark id as found
							map[id] = true;
							// custom indexOf using comparitor checking oldkids[i].node === $cur
							if ((idx = indexOfCustomNode($oldkids, $cur, j)) === -1) {
								if (config.kids) {
									mutations.push(MutationRecord({
										type: "childList",
										target: node,
										addedNodes: [$cur], // $cur is a new node
										nextSibling: $cur.nextSibling,
										previousSibling: $cur.previousSibling
									}));
									numAddedNodes++;
								}
							} else {
								conflicts.push({ // add conflict
									i: i,
									j: idx
								});
							}
						}
						i++;
					}

					if ($old &&
					   // special case: the changes may have been resolved: i and j appear congurent so we can continue using the expected case
					   $old !== $kids[i]
					) {
						if (!(map[id = getElementId($old)])) {
							map[id] = true;
							if ((idx = indexOf($kids, $old, i)) === -1) {
								if (config.kids) {
									mutations.push(MutationRecord({
										type: "childList",
										target: old.node,
										removedNodes: [$old],
										nextSibling: $oldkids[j + 1], // praise no indexoutofbounds exception
										previousSibling: $oldkids[j - 1]
									}));
									numAddedNodes--;
								}
							} else {
								conflicts.push({
									i: idx,
									j: j
								});
							}
						}
						j++;
					}
				}// end uncommon case
			}// end loop

			// resolve any remaining conflicts
			if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
		}
		findMutations($target, $oldstate);
		return dirty;
	}

	/**
	 * Utility
	 * Cones a element into a custom data structure designed for comparision. https://gist.github.com/megawac/8201012
	 *
	 * @param {Node} $target
	 * @param {!Object} config : A custom mutation config
	 * @return {!Object} : Cloned data structure
	 */
	function clone($target, config) {
		var recurse = true; // set true so childList we'll always check the first level
		return (function copy($target) {
			var elestruct = {
				/** @type {Node} */
				node: $target
			};

			// Store current character data of target text or comment node if the config requests
			// those properties to be observed.
			if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
				elestruct.charData = $target.nodeValue;
			}
			// its either a element, comment, doc frag or document node
			else {
				// Add attr only if subtree is specified or top level and avoid if
				// attributes is a document object (#13).
				if (config.attr && recurse && $target.nodeType === 1) {
					/**
					 * clone live attribute list to an object structure {name: val}
					 * @type {Object.<string, string>}
					 */
					elestruct.attr = reduce($target.attributes, function(memo, attr) {
						if (!config.afilter || config.afilter[attr.name]) {
							memo[attr.name] = getAttributeValue($target, attr);
						}
						return memo;
					}, {});
				}

				// whether we should iterate the children of $target node
				if (recurse && ((config.kids || config.charData) || (config.attr && config.descendents)) ) {
					/** @type {Array.<!Object>} : Array of custom clone */
					elestruct.kids = map($target.childNodes, copy);
				}

				recurse = config.descendents;
			}
			return elestruct;
		})($target);
	}

	/**
	 * indexOf an element in a collection of custom nodes
	 *
	 * @param {NodeList} set
	 * @param {!Object} $node : A custom cloned node
	 * @param {number} idx : index to start the loop
	 * @return {number}
	 */
	function indexOfCustomNode(set, $node, idx) {
		return indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
	}

	// using a non id (eg outerHTML or nodeValue) is extremely naive and will run into issues with nodes that may appear the same like <li></li>
	var counter = 1; // don't use 0 as id (falsy)
	/** @const */
	var expando = "mo_id";

	/**
	 * Attempt to uniquely id an element for hashing. We could optimize this for legacy browsers but it hopefully wont be called enough to be a concern
	 *
	 * @param {Node} $ele
	 * @return {(string|number)}
	 */
	function getElementId($ele) {
		try {
			return $ele.id || ($ele[expando] = $ele[expando] || counter++);
		} catch (o_O) { // ie <8 will throw if you set an unknown property on a text node
			try {
				return $ele.nodeValue; // naive
			} catch (shitie) { // when text node is removed: https://gist.github.com/megawac/8355978 :(
				return counter++;
			}
		}
	}

	/**
	 * **map** Apply a mapping function to each item of a set
	 * @param {Array|NodeList} set
	 * @param {Function} iterator
	 */
	function map(set, iterator) {
		var results = [];
		for (var index = 0; index < set.length; index++) {
			results[index] = iterator(set[index], index, set);
		}
		return results;
	}

	/**
	 * **Reduce** builds up a single result from a list of values
	 * @param {Array|NodeList|NamedNodeMap} set
	 * @param {Function} iterator
	 * @param {*} [memo] Initial value of the memo.
	 */
	function reduce(set, iterator, memo) {
		for (var index = 0; index < set.length; index++) {
			memo = iterator(memo, set[index], index, set);
		}
		return memo;
	}

	/**
	 * **indexOf** find index of item in collection.
	 * @param {Array|NodeList} set
	 * @param {Object} item
	 * @param {number} idx
	 * @param {string} [prop] Property on set item to compare to item
	 */
	function indexOf(set, item, idx, prop) {
		for (/*idx = ~~idx*/; idx < set.length; idx++) {// start idx is always given as this is internal
			if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
		}
		return -1;
	}

	/**
	 * @param {Object} obj
	 * @param {(string|number)} prop
	 * @return {boolean}
	 */
	function has(obj, prop) {
		return obj[prop] !== undefined; // will be nicely inlined by gcc
	}

	// GCC hack see http:// stackoverflow.com/a/23202438/1517919
	function JSCompiler_renameProperty(a) {
		return a;
	}

	return MutationObserver;
})(void 0);

// Generated by CoffeeScript 1.6.3
/*
HTML5 Number polyfill | Jonathan Stipe | https://github.com/jonstipe/number-polyfill
*/


(function() {
  (function($) {
	var i, numberPolyfill;
	i = document.createElement("input");
	i.setAttribute("type", "number");
	if (i.type === "text") {
	  $.fn.inputNumber = function() {
		$(this).filter(function() {
		  var $this;
		  $this = $(this);
		  return $this.is('input[type="number"]') && !($this.parent().is("span") && $this.next().is("div.number-spin-btn-container") && $this.next().children().first().is("div.number-spin-btn-up") && $this.next().children().eq(1).is("div.number-spin-btn-down"));
		}).each(function() {
		  numberPolyfill.polyfills.push(new numberPolyfill(this));
		});
		return $(this);
	  };
	  numberPolyfill = function(elem) {
		var $fieldContainer, MutationObserver, attrObserver, halfHeight,
		  _this = this;
		this.elem = $(elem);
		if (!(this.elem.is(":root *") && this.elem.height() > 0)) {
		  throw new Error("Element must be in DOM and displayed so that its height can be measured.");
		}
		halfHeight = (this.elem.outerHeight() / 2) + 'px';
		this.upBtn = $('<div/>', {
		  "class": 'number-spin-btn number-spin-btn-up',
		  style: "height: " + halfHeight
		});
		this.downBtn = $('<div/>', {
		  "class": 'number-spin-btn number-spin-btn-down',
		  style: "height: " + halfHeight
		});
		this.btnContainer = $('<div/>', {
		  "class": 'number-spin-btn-container'
		});
		$fieldContainer = $('<span/>', {
		  style: "white-space: nowrap"
		});
		this.upBtn.appendTo(this.btnContainer);
		this.downBtn.appendTo(this.btnContainer);
		this.elem.wrap($fieldContainer);
		this.btnContainer.insertAfter(this.elem);
		this.elem.on({
		  focus: function(e) {
			_this.elem.on({
			  DOMMouseScroll: numberPolyfill.domMouseScrollHandler,
			  mousewheel: numberPolyfill.mouseWheelHandler
			}, {
			  p: _this
			});
		  },
		  blur: function(e) {
			_this.elem.off({
			  DOMMouseScroll: numberPolyfill.domMouseScrollHandler,
			  mousewheel: numberPolyfill.mouseWheelHandler
			});
		  }
		});
		this.elem.on({
		  keypress: numberPolyfill.elemKeypressHandler,
		  change: numberPolyfill.elemChangeHandler
		}, {
		  p: this
		});
		this.upBtn.on("mousedown", {
		  p: this,
		  func: "increment"
		}, numberPolyfill.elemBtnMousedownHandler);
		this.downBtn.on("mousedown", {
		  p: this,
		  func: "decrement"
		}, numberPolyfill.elemBtnMousedownHandler);
		this.elem.css("textAlign", 'right');
		this.attrMutationHandler("class");
		if ((typeof WebKitMutationObserver !== "undefined" && WebKitMutationObserver !== null) || (typeof MutationObserver !== "undefined" && MutationObserver !== null)) {
		  if ((typeof WebKitMutationObserver !== "undefined" && WebKitMutationObserver !== null) && (typeof MutationObserver === "undefined" || MutationObserver === null)) {
			MutationObserver = WebKitMutationObserver;
		  }
		  attrObserver = new MutationObserver(function(mutations, observer) {
			var mutation, _i, _len;
			for (_i = 0, _len = mutations.length; _i < _len; _i++) {
			  mutation = mutations[_i];
			  if (mutation.type === "attributes") {
				_this.attrMutationHandler(mutation.attributeName, mutation.oldValue, _this.elem.attr(mutation.attributeName));
			  }
			}
		  });
		  attrObserver.observe(elem, {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: ["class", "style", "min", "max", "step"]
		  });
		} else if (typeof MutationEvent !== "undefined" && MutationEvent !== null) {
		  this.elem.on("DOMAttrModified", function(evt) {
			_this.attrMutationHandler(evt.originalEvent.attrName, evt.originalEvent.prevValue, evt.originalEvent.newValue);
		  });
		}
	  };
	  numberPolyfill.polyfills = [];
	  numberPolyfill.isNumber = function(input) {
		if ((input != null) && typeof input.toString === "function") {
		  return /^-?\d+(?:\.\d+)?$/.test(input.toString());
		} else {
		  return false;
		}
	  };
	  numberPolyfill.isFloat = function(input) {
		if ((input != null) && typeof input.toString === "function") {
		  return /^-?\d+\.\d+$/.test(input.toString());
		} else {
		  return false;
		}
	  };
	  numberPolyfill.isInt = function(input) {
		if ((input != null) && typeof input.toString === "function") {
		  return /^-?\d+$/.test(input.toString());
		} else {
		  return false;
		}
	  };
	  numberPolyfill.isNegative = function(input) {
		if ((input != null) && typeof input.toString === "function") {
		  return /^-\d+(?:\.\d+)?$/.test(input.toString());
		} else {
		  return false;
		}
	  };
	  numberPolyfill.raiseNum = function(num) {
		var a, numi, nump;
		if (typeof num === "number" || (typeof num === "object" && num instanceof Number)) {
		  if (num % 1) {
			return {
			  num: num.toString(),
			  precision: 0
			};
		  } else {
			return numberPolyfill.raiseNum(num.toString());
		  }
		} else if (typeof num === "string" || (typeof num === "object" && num instanceof String)) {
		  if (numberPolyfill.isFloat(num)) {
			num = num.replace(/(\.\d)0+$/, "$1");
			nump = numberPolyfill.getPrecision(num);
			numi = num.slice(0, -(nump + 1)) + num.slice(-nump);
			numi = numi.replace(/^(-?)0+(\d+)/, "$1$2");
			a = {
			  num: numi,
			  precision: nump
			};
			return a;
		  } else if (numberPolyfill.isInt(num)) {
			return {
			  num: num,
			  precision: 0
			};
		  }
		}
	  };
	  numberPolyfill.raiseNumPrecision = function(rNum, newPrecision) {
		var _i, _ref;
		if (rNum.precision < newPrecision) {
		  for (i = _i = _ref = rNum.precision; _ref <= newPrecision ? _i < newPrecision : _i > newPrecision; i = _ref <= newPrecision ? ++_i : --_i) {
			rNum.num += "0";
		  }
		  rNum.precision = newPrecision;
		}
	  };
	  numberPolyfill.lowerNum = function(num) {
		if (num.precision > 0) {
		  while (num.num.length < (num.precision + 1)) {
			if (numberPolyfill.isNegative(num.num)) {
			  num.num = num.num.slice(0, 1) + "0" + num.num.slice(1);
			} else {
			  num.num = "0" + num.num;
			}
		  }
		  return (num.num.slice(0, -num.precision) + "." + num.num.slice(-num.precision)).replace(/\.?0+$/, '').replace(/^(-?)(\.)/, "$10$2");
		} else {
		  return num.num;
		}
	  };
	  numberPolyfill.preciseAdd = function(num1, num2) {
		var num1i, num2i, result;
		if ((typeof num1 === "number" || (typeof num1 === "object" && num1 instanceof Number)) && (typeof num2 === "number" || (typeof num2 === "object" && num2 instanceof Number))) {
		  if (num1 % 1 === 0 && num2 % 1 === 0) {
			return (num1 + num2).toString();
		  } else {
			return numberPolyfill.preciseAdd(num1.toString(), num2.toString());
		  }
		} else if ((typeof num1 === "string" || (typeof num1 === "object" && num1 instanceof String)) && (typeof num2 === "string" || (typeof num2 === "object" && num2 instanceof String))) {
		  if (numberPolyfill.isNumber(num1)) {
			if (numberPolyfill.isNumber(num2)) {
			  if (numberPolyfill.isInt(num1)) {
				if (numberPolyfill.isInt(num2)) {
				  return numberPolyfill.preciseAdd(parseInt(num1, 10), parseInt(num2, 10));
				} else if (numberPolyfill.isFloat(num2)) {
				  num1 += ".0";
				}
			  } else if (numberPolyfill.isFloat(num1)) {
				if (numberPolyfill.isInt(num2)) {
				  num2 += ".0";
				}
			  }
			  num1i = numberPolyfill.raiseNum(num1);
			  num2i = numberPolyfill.raiseNum(num2);
			  if (num1i.precision < num2i.precision) {
				numberPolyfill.raiseNumPrecision(num1i, num2i.precision);
			  } else if (num1i.precision > num2i.precision) {
				numberPolyfill.raiseNumPrecision(num2i, num1i.precision);
			  }
			  result = (parseInt(num1i.num, 10) + parseInt(num2i.num, 10)).toString();
			  if (num1i.precision > 0) {
				if (numberPolyfill.isNegative(result)) {
				  while (num1i.precision > (result.length - 1)) {
					result = "-0" + result.slice(1);
				  }
				} else {
				  while (num1i.precision > result.length) {
					result = "0" + result;
				  }
				}
				result = numberPolyfill.lowerNum({
				  num: result,
				  precision: num1i.precision
				});
			  }
			  result = result.replace(/^(-?)\./, '$10.');
			  if (numberPolyfill.isFloat(result)) {
				result = result.replace(/0+$/, '');
			  }
			  return result;
			} else {
			  throw new SyntaxError("Argument \"" + num2 + "\" is not a number.");
			}
		  } else {
			throw new SyntaxError("Argument \"" + num1 + "\" is not a number.");
		  }
		} else {
		  return numberPolyfill.preciseAdd(num1.toString(), num2.toString());
		}
	  };
	  numberPolyfill.preciseSubtract = function(num1, num2) {
		if (typeof num2 === "number" || (typeof num2 === "object" && num2 instanceof Number)) {
		  return numberPolyfill.preciseAdd(num1, -num2);
		} else if (typeof num2 === "string" || (typeof num2 === "object" && num2 instanceof String)) {
		  if (numberPolyfill.isNegative(num2)) {
			return numberPolyfill.preciseAdd(num1, num2.slice(1));
		  } else {
			return numberPolyfill.preciseAdd(num1, "-" + num2);
		  }
		}
	  };
	  numberPolyfill.getPrecision = function(num) {
		var k, kNum;
		if (typeof num === "number") {
		  k = 0;
		  kNum = num;
		  while (kNum !== Math.floor(kNum)) {
			kNum = num * Math.pow(10, ++k);
		  }
		  return k;
		} else if (typeof num === "string") {
		  if (numberPolyfill.isNumber(num)) {
			if (numberPolyfill.isFloat(num)) {
			  return /^-?\d+(?:\.(\d+))?$/.exec(num)[1].length;
			} else {
			  return 0;
			}
		  }
		}
	  };
	  numberPolyfill.prototype.getParams = function() {
		var max, min, step, val;
		step = this.elem.attr('step');
		min = this.elem.attr('min');
		max = this.elem.attr('max');
		val = this.elem.val();
		if (!numberPolyfill.isNumber(step)) {
		  step = null;
		}
		if (!numberPolyfill.isNumber(min)) {
		  min = null;
		}
		if (!numberPolyfill.isNumber(max)) {
		  max = null;
		}
		if (!numberPolyfill.isNumber(val)) {
		  val = min || 0;
		}
		return {
		  min: (min != null) ? min : null,
		  max: (max != null) ? max : null,
		  step: (step != null) ? step : "1",
		  val: (val != null) ? val : null
		};
	  };
	  numberPolyfill.prototype.clipValues = function(value, min, max) {
		if ((max != null) && parseFloat(value) > parseFloat(max)) {
		  return max;
		} else if ((min != null) && parseFloat(value) < parseFloat(min)) {
		  return min;
		} else {
		  return value;
		}
	  };
	  numberPolyfill.prototype.stepNormalize = function(value) {
		var cValue, min, params, sn, step;
		params = this.getParams();
		step = params['step'];
		min = params['min'];
		if (step == null) {
		  return value;
		} else {
		  step = numberPolyfill.raiseNum(step);
		  cValue = numberPolyfill.raiseNum(value);
		  if (cValue.precision > step.precision) {
			numberPolyfill.raiseNumPrecision(step, cValue.precision);
		  } else if (cValue.precision < step.precision) {
			numberPolyfill.raiseNumPrecision(cValue, step.precision);
		  }
		  if (min != null) {
			cValue = numberPolyfill.raiseNum(numberPolyfill.preciseSubtract(value, min));
			numberPolyfill.raiseNumPrecision(cValue, step.precision);
		  }
		  if (parseFloat(cValue.num) % parseFloat(step.num) === 0) {
			return value;
		  } else {
			cValue = numberPolyfill.lowerNum({
			  num: (Math.round(parseFloat(cValue.num) / (sn = parseFloat(step.num))) * sn).toString(),
			  precision: cValue.precision
			});
			if (min != null) {
			  cValue = numberPolyfill.preciseAdd(cValue, min);
			}
			return cValue;
		  }
		}
	  };
	  numberPolyfill.domMouseScrollHandler = function(evt) {
		var p;
		p = evt.data.p;
		evt.preventDefault();
		if (evt.originalEvent.detail < 0) {
		  p.increment();
		} else {
		  p.decrement();
		}
	  };
	  numberPolyfill.mouseWheelHandler = function(evt) {
		var p;
		p = evt.data.p;
		evt.preventDefault();
		if (evt.originalEvent.wheelDelta > 0) {
		  p.increment();
		} else {
		  p.decrement();
		}
	  };
	  numberPolyfill.elemKeypressHandler = function(evt) {
		var p, _ref, _ref1;
		p = evt.data.p;
		if (evt.keyCode === 38) {
		  p.increment();
		} else if (evt.keyCode === 40) {
		  p.decrement();
		} else if (((_ref = evt.keyCode) !== 8 && _ref !== 9 && _ref !== 35 && _ref !== 36 && _ref !== 37 && _ref !== 39 && _ref !== 46) && ((_ref1 = evt.which) !== 45 && _ref1 !== 46 && _ref1 !== 48 && _ref1 !== 49 && _ref1 !== 50 && _ref1 !== 51 && _ref1 !== 52 && _ref1 !== 53 && _ref1 !== 54 && _ref1 !== 55 && _ref1 !== 56 && _ref1 !== 57)) {
		  evt.preventDefault();
		}
	  };
	  numberPolyfill.elemChangeHandler = function(evt) {
		var min, newVal, p, params;
		p = evt.data.p;
		if (p.elem.val() !== "") {
		  if (numberPolyfill.isNumber(p.elem.val())) {
			params = p.getParams();
			newVal = p.clipValues(params['val'], params['min'], params['max']);
			newVal = p.stepNormalize(newVal);
			if (newVal.toString() !== p.elem.val()) {
			  p.elem.val(newVal).change();
			}
		  } else {
			min = p.elem.attr('min');
			p.elem.val((min != null) && numberPolyfill.isNumber(min) ? min : "0").change();
		  }
		}
	  };
	  numberPolyfill.elemBtnMousedownHandler = function(evt) {
		var func, p, releaseFunc, timeoutFunc,
		  _this = this;
		p = evt.data.p;
		func = evt.data.func;
		p[func]();
		timeoutFunc = function(incFunc) {
		  p[func]();
		  p.timeoutID = window.setTimeout(timeoutFunc, 10);
		};
		releaseFunc = function(e) {
		  window.clearTimeout(p.timeoutID);
		  $(document).off('mouseup', releaseFunc);
		  $(_this).off('mouseleave', releaseFunc);
		};
		$(document).on('mouseup', releaseFunc);
		$(this).on('mouseleave', releaseFunc);
		p.timeoutID = window.setTimeout(timeoutFunc, 700);
	  };
	  numberPolyfill.prototype.attrMutationHandler = function(name, oldValue, newValue) {
		var ei, h, _i, _len, _ref;
		if (name === "class" || name === "style") {
		  h = {};
		  ei = null;
		  _ref = ["opacity", "visibility", "-moz-transition-property", "-moz-transition-duration", "-moz-transition-timing-function", "-moz-transition-delay", "-webkit-transition-property", "-webkit-transition-duration", "-webkit-transition-timing-function", "-webkit-transition-delay", "-o-transition-property", "-o-transition-duration", "-o-transition-timing-function", "-o-transition-delay", "transition-property", "transition-duration", "transition-timing-function", "transition-delay"];
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			i = _ref[_i];
			if ((ei = this.elem.css(i)) !== this.btnContainer.css(i)) {
			  h[i] = ei;
			}
		  }
		  if (this.elem.css("display") === "none") {
			h["display"] = "none";
		  } else {
			h["display"] = "inline-block";
		  }
		  this.btnContainer.css(h);
		} else if (name === "min" || name === "max" || name === "step") {
		  this.elem.change();
		}
	  };
	  numberPolyfill.prototype.increment = function() {
		var newVal, params;
		if (!(this.elem.is(":disabled") || this.elem.is("[readonly]"))) {
		  params = this.getParams();
		  newVal = numberPolyfill.preciseAdd(params['val'], params['step']);
		  if ((params['max'] != null) && parseFloat(newVal) > parseFloat(params['max'])) {
			newVal = params['max'];
		  }
		  newVal = this.stepNormalize(newVal);
		  this.elem.val(newVal).change();
		}
	  };
	  numberPolyfill.prototype.decrement = function() {
		var newVal, params;
		if (!(this.elem.is(":disabled") || this.elem.is("[readonly]"))) {
		  params = this.getParams();
		  newVal = numberPolyfill.preciseSubtract(params['val'], params['step']);
		  if ((params['min'] != null) && parseFloat(newVal) < parseFloat(params['min'])) {
			newVal = params['min'];
		  }
		  newVal = this.stepNormalize(newVal);
		  this.elem.val(newVal).change();
		}
	  };
	} else {
	  $.fn.inputNumber = function() {
		return $(this);
	  };
	  return;
	}
	$(function() {
	  $('input[type="number"]').inputNumber();
	});
  })(jQuery);

}).call(this);

// Scroll Width Polyfill version 1.1
// Github: https://github.com/gregwhitworth/scrollWidthPolyfill
// License: MIT License (http://opensource.org/licenses/MIT)
var polyScrollWidth = (function (document, window) {

	var polyScrollWidth = window.polyScrollWidth || {
		"needsPoly": false,
		"usedPoly": false,
		"version": 1.1
	};

	var origScrollWidth = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollWidth') !== undefined ? Object.getOwnPropertyDescriptor(Element.prototype, 'scrollWidth').get : false;

	if(!origScrollWidth) {
		return;
	}
	
	init();

	// Init
	// ---------------------------------------------
	// This initializes the polyfill and checks to see
	// if the scrollWidth method is producing a reasonable
	// result, if so then no need to polyfill.
	function init() {
	   var needsPoly = featureDetect();
	   if(!needsPoly) {
		   polyScrollWidth.needsPoly = false;
		   return polyScrollWidth;
	   } else {
		   polyScrollWidth.needsPoly = true;
	   }

	   // Create new polyfill for scrollWidth since we need to polyfill it
	   Object.defineProperty(Element.prototype, "scrollWidth", { configurable: true, enumerable: true, get: getScrollWidth });
	}

	// Feature Detect
	// ---------------------------------------------
	// Unfortunately we're making this polyfill for interop reasons, so we
	// need to do a quick test to ensure that it is implemented correctly.
	// Because of this we will create two ghost elements and then match them
	// to see if they return reasonable results for scrollWidth
	function featureDetect() {
	   var needsPoly = false;
	   var overrideStyles = [
			 {
				   "name":"float",
				   "value":"left"
			 },
			 {
				   "name":"paddingLeft",
				   "value":"0px"
			 },
			 {
				   "name":"paddingRight",
				   "value":"0px"
			 },
			 {
				   "name":"position",
				   "value":"absolute"
			 },
			 {
				 "name":"width",
				 "value":"0px"
			 },
			 {
				 "name":"borderRightWidth",
				 "value":"0px"
			 },
			 {
				 "name":"borderLeftWidth",
				 "value":"0px"
			 },
			 {
				 "name":"visibility",
				 "value":"hidden"
			 }
	   ];

	   var ghostMeasureInput = createGhostElement("input", null, overrideStyles, "Test", true);

	   // Check within +/- 2 pixels for reasonable results of scrollWidth in comparison to clientWidth [both should include padding]
	   if(ghostMeasureInput.scrollWidth == 0) {
			 needsPoly = true;
	   }

	   return needsPoly;
	}

	// Create Ghost Element
	// ---------------------------------------------
	// This will create the ghost items and then return the measured results. It also
	// deletes the node and removes the HTML after it's done.
	// <param name="elType"" type="string">This is the type of element you want to create, for example a div</param>
	// <param name="computedStyles" type="CSSStyleDeclaration">These are the computed styles of the element you're wanting your ghost element to match</param>
	// <param name="overrideStyles" type="[{name, value}]">These are the styles you want to override on the new element (eg: [{"name":"visibility", "value":"hidden"}])</param>
	// <param name="content" type="string">This is the content that you want to be included in the element for measurement</param>
	// <param name="callScrollWidth" type="bool">Do you want to call scrollWidth, if you set this to true and the polyfill has been set you'll end up in a loop</param>
	// <return name="ghostMeasure" type="{"scrollWidth", "clientWidth"}">These are the two widths that we care about and will pass these back to the methods that want to do something with them</param>
	function createGhostElement(elType, computedStyles, /* [{ name, value }] */ overrideStyles,  content, callScrollWidth) {
		  var id, el, ghostMeasure;
		  elType = elType.toLowerCase();

		  id = "swMeasure-" + Date.now();
		  el = document.createElement(elType);
		  el.id = id;

		  var initStyle = el.style;

		  if(computedStyles !== null) {
			  if(typeof computedStyles.__proto__ === 'object') {
				  var csKeys = Object.keys(computedStyles.__proto__);
				  csKeys.forEach(function(prop) {
					  initStyle[prop] = computedStyles[prop];
				  })
				  el.style = initStyle;
			  }
		  }

		  overrideStyles.forEach(function(overrideStyle) {
				el.style[overrideStyle.name] = overrideStyle.value;
		  });

		  if(elType == "input" || elType == "textarea") {
				el.value = content;
		  }
		  else {
			el.textContent = content;
		  }

		  document.getElementsByTagName('body')[0].appendChild(el);

		  el = document.getElementById(id);

		  ghostMeasure = {
				"scrollWidth": (callScrollWidth) ? el.scrollWidth : 0,
				"clientWidth": parseInt(el.clientWidth, 10)
		  };

		  el.outerHTML = "";
		  delete el;

		  return ghostMeasure;
	}

	// Get Scroll Width
	// --------------------------------------------------------
	// Will get all necessary information from the input to
	// completely polyfill el.scrollWidth
	// <return type="int">The max of the element width or the clientWidth</return>
	function getScrollWidth() {
	  if(this.nodeName != "INPUT" && this.nodeName != "TEXTAREA") return origScrollWidth.call(this);

	  polyScrollWidth.usedPoly = true;
	  var width = "auto";
	  var computedStyles = window.getComputedStyle(this, null);

	  // We only want to set the width of the container if it is a textarea since
	  // that will need accurate wrapping. For any other input we just want the
	  // length of the text as one long string so width should be ""
	  if(this.nodeName == "TEXTAREA") width = computedStyles.width;

	  var overrideStyles = [
		{
			"name": "position",
			"value": "absolute"
		},
		{
		   "name": "float",
		   "value": "left"
		},
		{
		   "name":"visibility",
		   "value":"hidden"
		},
		// We don't want the width set
		{
			"name":"width",
			"value": width
		}
	  ];

	  var ghost = createGhostElement("div", computedStyles, overrideStyles, this.value, false);

	  return Math.max(parseInt(computedStyles.width, 10), ghost.clientWidth); //scrollWidth returns the max of content or element width
	}

	return polyScrollWidth;
})(document, window);

/*
 * JavaScript Templates
 * https://github.com/blueimp/JavaScript-Templates
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Inspired by John Resig's JavaScript Micro-Templating:
 * http://ejohn.org/blog/javascript-micro-templating/
 */

/*jshint evil: true */
/*global document, define, module */

(function ($) {
	"use strict";
	var tmpl = function (str, data) {
		var f = !/[^\w\-\.:]/.test(str) ? tmpl.cache[str] = tmpl.cache[str] ||
				tmpl(tmpl.load(str)) :
					new Function(
						tmpl.arg + ",tmpl",
						"var _e=tmpl.encode" + tmpl.helper + ",_s='" +
							str.replace(tmpl.regexp, tmpl.func) +
							"';return _s;"
					);
		return data ? f(data, tmpl) : function (data) {
			return f(data, tmpl);
		};
	};
	tmpl.cache = {};
	tmpl.load = function (id) {
		return document.getElementById(id).innerHTML;
	};
	tmpl.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g;
	tmpl.func = function (s, p1, p2, p3, p4, p5) {
		if (p1) { // whitespace, quote and backspace in HTML context
			return {
				"\n": "\\n",
				"\r": "\\r",
				"\t": "\\t",
				" " : " "
			}[p1] || "\\" + p1;
		}
		if (p2) { // interpolation: {%=prop%}, or unescaped: {%#prop%}
			if (p2 === "=") {
				return "'+_e(" + p3 + ")+'";
			}
			return "'+(" + p3 + "==null?'':" + p3 + ")+'";
		}
		if (p4) { // evaluation start tag: {%
			return "';";
		}
		if (p5) { // evaluation end tag: %}
			return "_s+='";
		}
	};
	tmpl.encReg = /[<>&"'\x00]/g;
	tmpl.encMap = {
		"<"   : "&lt;",
		">"   : "&gt;",
		"&"   : "&amp;",
		"\""  : "&quot;",
		"'"   : "&#39;"
	};
	tmpl.encode = function (s) {
		/*jshint eqnull:true */
		return (s == null ? "" : "" + s).replace(
			tmpl.encReg,
			function (c) {
				return tmpl.encMap[c] || "";
			}
		);
	};
	tmpl.arg = "o";
	tmpl.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);}" +
		",include=function(s,d){_s+=tmpl(s,d);}";
	if (typeof define === "function" && define.amd) {
		define(function () {
			return tmpl;
		});
	} else if (typeof module === "object" && module.exports) {
		module.exports = tmpl;
	} else {
		$.tmpl = tmpl;
	}
}(this));

// https://github.com/NV/flying-focus/blob/gh-pages/standalone/flying-focus.js

(function() {
	if (!window.addEventListener) {
		return;
	}

	'use strict';

var DURATION = 150;

var ringElem = null;
var movingId = 0;
var prevFocused = null;
var keyDownTime = 0;

var win = window;
var doc = document;
var docElem = doc.documentElement;
var body = doc.body;


docElem.addEventListener('keydown', function(event) {
	var code = event.which;
	// Show animation only upon Tab or Arrow keys press.
	if (code === 9 || (code > 36 && code < 41)) {
		keyDownTime = Date.now();
	}
}, false);


docElem.addEventListener('focus resize', function(event) {
	var target = event.target;
	if (target.id === 'flying-focus') {
		return;
	}

	var isFirstFocus = false;
	if (!ringElem) {
		isFirstFocus = true;
		initialize();
	}

	var offset = offsetOf(target);
	ringElem.style.left = offset.left + 'px';
	ringElem.style.top = offset.top + 'px';
	ringElem.style.width = target.offsetWidth + 'px';
	ringElem.style.height = target.offsetHeight + 'px';

	if (isFirstFocus || !isJustPressed()) {
		return;
	}

	onEnd();
	target.classList.add('flying-focus_target');
	ringElem.classList.add('flying-focus_visible');
	prevFocused = target;
	movingId = setTimeout(onEnd, DURATION);
}, true);


docElem.addEventListener('blur', function() {
	onEnd();
}, true);


function initialize() {
	ringElem = doc.createElement('flying-focus'); // use uniq element name to decrease the chances of a conflict with website styles
	ringElem.id = 'flying-focus';
	ringElem.style.transitionDuration = ringElem.style.WebkitTransitionDuration = DURATION / 1000 + 's';
	body.appendChild(ringElem);
}


function onEnd() {
	if (!movingId) {
		return;
	}
	clearTimeout(movingId);
	movingId = 0;
	ringElem.classList.remove('flying-focus_visible');
	prevFocused.classList.remove('flying-focus_target');
	prevFocused = null;
}


function isJustPressed() {
	return Date.now() - keyDownTime < 42
}


function offsetOf(elem) {
	var rect = elem.getBoundingClientRect();
	var clientLeft = docElem.clientLeft || body.clientLeft;
	var clientTop  = docElem.clientTop  || body.clientTop;
	var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
	var scrollTop  = win.pageYOffset || docElem.scrollTop  || body.scrollTop;
	var left = rect.left + scrollLeft - clientLeft;
	var top =  rect.top  + scrollTop  - clientTop;
	return {
		top: top || 0,
		left: left || 0
	};
}


	var style = doc.createElement('style');
	style.textContent = "#flying-focus {\
	position: absolute;\
	margin: 0;\
	background: transparent;\
	-webkit-transition-property: left, top, width, height;\
	transition-property: left, top, width, height;\
	-webkit-transition-timing-function: cubic-bezier(0,1,0,1);\
	transition-timing-function: cubic-bezier(0,1,0,1);\
	visibility: hidden;\
	pointer-events: none;\
	box-shadow: 0 0 2px 3px #78aeda, 0 0 2px #78aeda inset; border-radius: 2px;\
}\
#flying-focus.flying-focus_visible {\
	visibility: visible;\
	z-index: 9999;\
}\
.flying-focus_target {\
	outline: none !important; /* Doesn't work in Firefox :( */\
}\
/* http://stackoverflow.com/questions/71074/how-to-remove-firefoxs-dotted-outline-on-buttons-as-well-as-links/199319 */\
.flying-focus_target::-moz-focus-inner {\
	border: 0 !important;\
}\
/* Replace it with @supports rule when browsers catch up */\
@media screen and (-webkit-min-device-pixel-ratio: 0) {\
	#flying-focus {\
		box-shadow: none;\
		outline: 1px dotted #ccc;\
		outline-offset: -3px;\
	}\
}\
";
	body.appendChild(style);
})();

// DNA:  edited to remove prevent default, and add back as data attribute
// also added attributes to the Mutation observer

/**
* Toggles & Switches
* ------------------
* A declarative pattern for applying CSS states
* and animations based on user interaction
*
* @author Digital Surgeons
*/

(function() {

	"use strict";

	// switch constructor
	function Switch(opts) {

		this.type = opts.type;
		this.element = opts.element;
		this.target = opts.target;
		this.event = opts.event || 'click';
		this.onEvent = opts.onEvent || false;
		this.offEvent = opts.offEvent || false;
		this.className = opts.class || 'active';
		this.add = opts.add || 'active';
		this.remove = opts.remove || 'inactive';
		this.self = opts.self || false;
		this.stopPropagation = opts.stopPropagation || false;
		this.preventDefault = opts.preventDefault || false;
		this.events = {};

		// if target is empty default to element itself
		this.target = this.target ? document.querySelectorAll(this.target) : [this.element];

		// mark this element as initialised
		this.element.setAttribute('data-toggle-switch', 'switch');

		// set up switch custom events
		_createCustomEvents.apply(this);

		// set up switch event listeners
		this.bindEventListeners();
	}

	// toggle constructor
	function Toggle(opts) {

		this.type = opts.type;
		this.element = opts.element;
		this.target = opts.target;
		this.className = opts.class || 'active';
		this.add = opts.add || 'active';
		this.remove = opts.remove || 'inactive';
		this.event = opts.event || 'click';
		this.self = opts.self || false;
		this.stopPropagation = opts.stopPropagation || false;
		this.preventDefault = opts.preventDefault || false;
		this.events = {};

		// if target is empty default to element itself
		this.target = this.target ? document.querySelectorAll(this.target) : [this.element];

		// mark this element as initialised
		this.element.setAttribute('data-toggle-switch', 'toggle');

		// set up toggle custom events
		_createCustomEvents.apply(this);

		// set up toggle event listeners
		this.bindEventListeners();
	}

	// initialize custom events
	// spotty support for CustomEvent :/
	function _createCustomEvents() {
		// create 4 types of event
		this.events = {
			'toggled' : document.createEvent('Event'),
			'added' : document.createEvent('Event'),
			'removed' : document.createEvent('Event'),
			'replaced' : document.createEvent('Event')
		};

		this.events.toggled.initEvent('ToggleSwitch.toggled', true, true);
		this.events.added.initEvent('ToggleSwitch.added', true, true);
		this.events.removed.initEvent('ToggleSwitch.removed', true, true);
		this.events.replaced.initEvent('ToggleSwitch.replaced', true, true);
	}

	// cross browser event trigger
	function _triggerEvent(event) {
		// no event name supplied or invalid
		// instance has no element
		if(!event || typeof event !== 'string' || !this.element) {
			return false;
		}

		// check event exists
		var evt = this.events[event];
		if(!evt) {
			return false;
		}

		// trigger event
		this.element.dispatchEvent(evt);
	}

	// bind a single event listener
	function _bindEventListener(event) {
		this.element.addEventListener(event, function(e) {

			// optional propagation halt
			if(this.stopPropagation) {
				e.stopPropagation();
			}

			if(this.preventDefault) {
				e.preventDefault(); // added by DNA
			}

			this.fire();
		}.bind(this));
	}

	// add class of className to target
	function _addClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el) {
			if(el.classList.contains(this.className)) {
				return false;
			}

			el.classList.add(this.className);
			_triggerEvent.apply(this, ['added']);
		}.bind(this));

		// optionally add class to element itself
		if(this.self) {
			this.element.classList.add(this.className);
		}
	}

	// remove class of className from target
	function _removeClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el) {
			if(!el.classList.contains(this.className)) {
				return false;
			}

			el.classList.remove(this.className);
			_triggerEvent.apply(this, ['removed']);
		}.bind(this));

		// optionally add class to element itself
		if(this.self) {
			this.element.classList.remove(this.className);
		}
	}

	// toggle class of className on target
	function _toggleClass() {
		// could be single or multiple targets
		[].forEach.call(this.target, function(el) {
			el.classList.toggle(this.className);
			_triggerEvent.apply(this, ['toggled']);
		}.bind(this));

		// optionally add class to element itself
		if(this.self) {
			this.element.classList.toggle(this.className);
		}
	}

	Switch.prototype.bindEventListeners = function() {

		var events;

		// custom on switch events
		if(this.type === 'on' && this.onEvent) {

			events = this.onEvent.split(',');

		// custom off switch events
		} else if(this.type === 'off' && this.offEvent) {

			events = this.offEvent.split(',');

		// shared on/off events
		} else {
			events = this.event.split(',');
		}

		// will be array of length 1 if single event
		events.forEach(function(event) {
			_bindEventListener.apply(this, [event]);
		}.bind(this));
	};

	// switch specific replace class logic
	Switch.prototype.replaceClass = function() {
		[].forEach.call(this.target, function(el) {
			el.classList.remove(this.remove);
			el.classList.add(this.add);
			_triggerEvent.apply(this, ['replaced']);
		}.bind(this));
	};

	Toggle.prototype.bindEventListeners = function() {
		var events = this.event.split(',');

		// will be array of length 1 if single event
		events.forEach(function(event) {
			_bindEventListener.apply(this, [event]);
		}.bind(this));
	};

	// toggle specific replace class logic
	Toggle.prototype.replaceClass = function() {
		[].forEach.call(this.target, function(el) {
			// element contains neither class
			// or element contains class that should be removed
			if((!el.classList.contains(this.remove) && !el.classList.contains(this.add)) ||
				el.classList.contains(this.remove)) {

				el.classList.remove(this.remove);
				el.classList.add(this.add);

			// element contains that was added so reverse logic
			} else if(el.classList.contains(this.add)) {
				el.classList.add(this.remove);
				el.classList.remove(this.add);
			}

			_triggerEvent.apply(this, ['replaced']);
		}.bind(this));
	};

	// fire switch
	Switch.prototype.fire = function() {
		// this is a replace switch so replace
		if(this.type === 'replace') {

			this.replaceClass();

		// class not applied this is an on switch so add
		} else if(this.type === 'on') {

			_addClass.apply(this);

		// class applied this is an off switch so remove
		} else if(this.type === 'off') {

			_removeClass.apply(this);
		}
	};

	// fire toggle
	Toggle.prototype.fire = function() {

		if(this.type === 'replace') {
			this.replaceClass();
		} else {
			_toggleClass.apply(this);
		}
	};

	// data attr API initializers
	var initializers = {
		toggles: function(t) {
			// required params
			var opts = {
				element: t,
				target: t.getAttribute('data-toggle')
			};

			// optional params
			if(t.hasAttribute('data-toggle-class')) {
				opts.class = t.getAttribute('data-toggle-class');
			}

			if(t.hasAttribute('data-toggle-event')) {
				opts.event = t.getAttribute('data-toggle-event');
			}

			if(t.hasAttribute('data-toggle-self')) {
				opts.self = true;
			}

			if(t.hasAttribute('data-toggle-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if(t.hasAttribute('data-preventdefault')) {
				opts.preventDefault = true;
			}

			new Toggle(opts);
		},

		togglesReplace: function(t) {
			// required params
			var opts = {
				type: 'replace',
				element: t,
				target: t.getAttribute('data-toggle-replace'),
				add: t.getAttribute('data-toggle-add'),
				remove: t.getAttribute('data-toggle-remove')
			};

			// optional params
			if(t.hasAttribute('data-toggle-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if(t.hasAttribute('data-preventdefault')) {
				opts.preventDefault = true;
			}

			if(t.hasAttribute('data-toggle-event')) {
				opts.event = t.getAttribute('data-toggle-event');
			}

			new Toggle(opts);
		},

		switchesOn: function(s) {
			// required params
			var opts = {
				type: 'on',
				element: s,
				target: s.getAttribute('data-switch-on')
			};

			// optional params
			if(s.hasAttribute('data-switch-class')) {
				opts.class = s.getAttribute('data-switch-class');
			}

			if(s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			if(s.hasAttribute('data-switch-on-event')) {
				opts.onEvent = s.getAttribute('data-switch-on-event');
			}

			if(s.hasAttribute('data-switch-self')) {
				opts.self = true;
			}

			if(s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if(s.hasAttribute('data-preventdefault')) {
				opts.preventDefault = true;
			}

			new Switch(opts);
		},

		switchesOff: function(s) {
			// required params
			var opts = {
				type: 'off',
				element: s,
				target: s.getAttribute('data-switch-off')
			};

			// optional params
			if(s.hasAttribute('data-switch-class')) {
				opts.class = s.getAttribute('data-switch-class');
			}

			if(s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			if(s.hasAttribute('data-switch-off-event')) {
				opts.offEvent = s.getAttribute('data-switch-off-event');
			}

			if(s.hasAttribute('data-switch-self')) {
				opts.self = true;
			}

			if(s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if(s.hasAttribute('data-preventdefault')) {
				opts.preventDefault = true;
			}

			new Switch(opts);
		},

		switchesReplace: function(s) {
			// required params
			var opts = {
				type: 'replace',
				element: s,
				target: s.getAttribute('data-switch-replace'),
				add: s.getAttribute('data-switch-add'),
				remove: s.getAttribute('data-switch-remove')
			};

			// optional params
			if(s.hasAttribute('data-switch-stop-propagation')) {
				opts.stopPropagation = true;
			}

			if(s.hasAttribute('data-preventdefault')) {
				opts.preventDefault = true;
			}

			if(s.hasAttribute('data-switch-event')) {
				opts.event = s.getAttribute('data-switch-event');
			}

			new Switch(opts);
		}
	};

	// select all toggles & switches in provided node and initialize
	function initialize(containerNode) {
		var // use not selector to ensure initialized toggles & switches aren't touched
			notInitialized = ':not([data-toggle-switch])',
			toggles = containerNode.querySelectorAll('[data-toggle]'+notInitialized),
			togglesReplace = containerNode.querySelectorAll('[data-toggle-replace]'+notInitialized),
			switchesOn = containerNode.querySelectorAll('[data-switch-on]'+notInitialized),
			switchesOff = containerNode.querySelectorAll('[data-switch-off]'+notInitialized),
			switchesReplace = containerNode.querySelectorAll('[data-switch-replace]'+notInitialized);

		// set up toggles & switches
		[].forEach.call(toggles, initializers.toggles);
		[].forEach.call(togglesReplace, initializers.togglesReplace);
		[].forEach.call(switchesOn, initializers.switchesOn);
		[].forEach.call(switchesOff, initializers.switchesOff);
		[].forEach.call(switchesReplace, initializers.switchesReplace);
	}

	// create mutation observers for watchers
	(function() {
		// check for mutation observers before using, IE11 only
		if(window.MutationObserver == undefined) {
			return;
		}

		[].forEach.call(document.querySelectorAll('[data-toggle-switch-watch]'), function(w) {
			var observer = new MutationObserver(function(mutations) {
				// target will match between all mutations so just use first
				initialize(mutations[0].target);
			});

			observer.observe(w, {
				childList: true,
				attributes: true, // added attributes to it will observe attributes as well.
				subtree: true // needed to handle items added
			});
		});
	})();

	// initialize toggles & switches in entire document
	initialize(document);

})();

/*
AccDC API - 3.2 for jQuery (10/17/2016)
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/
(function(pL){var accDCVersion="3.2 (10/17/2016)",getEl=function(e){if(document.getElementById){return document.getElementById(e)}else{if(document.all){return document.all[e]}else{return null}}},createEl=function(t){var o=document.createElement(t);if(arguments.length===1){return o}if(arguments[1]){setAttr(o,arguments[1])}if(arguments[2]){css(o,arguments[2])}if(arguments[3]){addClass(o,arguments[3])}if(arguments[4]){o.appendChild(arguments[4])}return o},createText=function(s){return document.createTextNode(s)},createAttr=function(a){return document.createAttribute(a)},getAttr=function(e,n){if(!e){return null}var a;if(e.getAttribute){a=e.getAttribute(n)}if(!a&&e.getAttributeNode){a=e.getAttributeNode(n)}if(!a&&e[n]){a=e[n]}return a},remAttr=function(e,n){if(!e){return false}var a=isArray(n)?n:[n];for(var i=0;i<a.length;i++){if(e.removeAttribute){e.removeAttribute(a[i])}}return e},getText=function(n){if(!n){return""}return n.innerText||n.textContent||pL.find.getText([n])||""},css=function(obj,p,v){if(!obj){return null}if(obj.nodeName&&typeof p==="string"&&!v){return obj.style&&obj.style[p]?obj.style[p]:xGetComputedStyle(obj,p)}var o=isArray(obj)?obj:[obj],check="top left bottom right width height";for(var i=0;i<o.length;i++){if(typeof p==="string"){try{o[i].style[xCamelize(p)]=check.indexOf(p)!==-1&&typeof v==="number"?v+"px":v}catch(ex){
/*@cc_on
@if (@_jscript_version <= 5.7) // IE7 and down
if (p != 'display') continue;
var s = '',
t = o[i].nodeName.toLowerCase();
switch(t){
case 'table' :
case 'tr' :
case 'td' :
case 'li' :
s = 'block';
break;
case 'caption' :
s = 'inline';
break;
}
o[i].style[p] = s;
@end @*/
}}else{if(typeof p==="object"){for(var a=1;a<arguments.length;a++){for(var n in arguments[a]){try{o[i].style[xCamelize(n)]=check.indexOf(n)!==-1&&typeof arguments[a][n]==="number"?arguments[a][n]+"px":arguments[a][n]}catch(ex){
/*@cc_on
@if (@_jscript_version <= 5.7) // IE7 and down
if (n != 'display') continue;
var s = '',
t = o[i].nodeName.toLowerCase();
switch(t){
case 'table' :
case 'tr' :
case 'td' :
case 'li' :
s = 'block';
break;
case 'caption' :
s = 'inline';
break;
}
o[i].style[n] = s;
@end @*/
}}}}}}return obj},trim=function(str){return str.replace(/^\s+|\s+$/g,"")},setAttr=function(obj,name,value){if(!obj){return null}if(typeof name==="string"){obj.setAttribute(name,value)}else{if(typeof name==="object"){for(n in name){obj.setAttribute(n,name[n])}}}return obj},isArray=function(v){return v&&typeof v==="object"&&typeof v.length==="number"&&typeof v.splice==="function"&&!(v.propertyIsEnumerable("length"))},inArray=function(search,stack){if(stack.indexOf){return stack.indexOf(search)}for(var i=0;i<stack.length;i++){if(stack[i]===search){return i}}return -1},hasClass=function(obj,cn){if(!obj||!obj.className){return false}var names=cn.split(" "),i=0;for(var n=0;n<names.length;n++){if(obj.className.indexOf(names[n])!==-1){i+=1}}if(i===names.length){return true}return false},addClass=function(obj,cn){if(!obj){return null}pL(obj).addClass(cn);return obj},remClass=function(obj,cn){if(!obj){return null}pL(obj).removeClass(cn);return obj},firstChild=function(e,t){var e=e?e.firstChild:null;while(e){if(e.nodeType===1&&(!t||t.toLowerCase()===e.nodeName.toLowerCase())){break}e=e.nextSibling}return e},lastChild=function(e,t){var e=e?e.lastChild:null;while(e){if(e.nodeType===1&&(!t||t.toLowerCase()===e.nodeName.toLowerCase())){break}e=e.previousSibling}return e},insertBefore=function(f,s){if(!f){return s}f.parentNode.insertBefore(s,f);return s},nowI=0,now=function(v){return new Date().getTime()+(nowI++)},sraCSS={position:"absolute",clip:"rect(1px 1px 1px 1px)",clip:"rect(1px, 1px, 1px, 1px)",clipPath:"inset(50%)",padding:0,border:0,height:"1px",width:"1px",overflow:"hidden",whiteSpace:"nowrap"},sraCSSClear=function(o){css(o,{position:"",clip:"auto",clipPath:"none",padding:"",height:"",width:"",overflow:"",whiteSpace:"normal"});return o},getWin=function(){return{width:window.document.documentElement.clientWidth||window.document.body.clientWidth,height:window.document.documentElement.clientHeight||window.document.body.clientHeight}},transition=function(ele,targ,config){if(!ele){return}var uTotalTime=config.duration,iTargetY=targ.top,iTargetX=targ.left,startY=xTop(ele),startX=xLeft(ele);var dispX=iTargetX-startX,dispY=iTargetY-startY,freq=Math.PI/(2*uTotalTime),startTime=new Date().getTime(),tmr=setInterval(function(){var elapsedTime=new Date().getTime()-startTime;if(elapsedTime<uTotalTime){var f=Math.abs(Math.sin(elapsedTime*freq));xTop(ele,Math.round(f*dispY+startY));xLeft(ele,Math.round(f*dispX+startX));config.step.apply(ele)}else{clearInterval(tmr);xLeft(ele,iTargetX);xTop(ele,iTargetY);config.complete.apply(ele)}},10)},xOffset=function(c,p,isR){if(isR){return{top:c.offsetTop,left:c.offsetLeft}}var o={left:0,top:0},p=p||document.body;while(c&&c!=p){o.left+=c.offsetLeft;o.top+=c.offsetTop;c=c.offsetParent}return o},xCamelize=function(cssPropStr){var i,c,a,s;a=cssPropStr.split("-");s=a[0];for(i=1;i<a.length;i++){c=a[i].charAt(0);s+=a[i].replace(c,c.toUpperCase())}return s},xGetComputedStyle=function(e,p,i){if(!e){return null}var s,v="undefined",dv=document.defaultView;if(dv&&dv.getComputedStyle){if(e==document){e=document.body}s=dv.getComputedStyle(e,"");if(s){v=s.getPropertyValue(p)}}else{if(e.currentStyle){v=e.currentStyle[xCamelize(p)]}else{return null}}return i?(parseInt(v)||0):v},xNum=function(){for(var i=0;i<arguments.length;i++){if(isNaN(arguments[i])||typeof arguments[i]!=="number"){return false}}return true},xDef=function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]==="undefined"){return false}}return true},xStr=function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]!=="string"){return false}}return true},xHeight=function(e,h){var css,pt=0,pb=0,bt=0,bb=0;if(!e){return 0}if(xNum(h)){if(h<0){h=0}else{h=Math.round(h)}}else{h=-1}css=xDef(e.style);if(css&&xDef(e.offsetHeight)&&xStr(e.style.height)){if(h>=0){if(document.compatMode=="CSS1Compat"){pt=xGetComputedStyle(e,"padding-top",1);if(pt!==null){pb=xGetComputedStyle(e,"padding-bottom",1);bt=xGetComputedStyle(e,"border-top-width",1);bb=xGetComputedStyle(e,"border-bottom-width",1)}else{if(xDef(e.offsetHeight,e.style.height)){e.style.height=h+"px";pt=e.offsetHeight-h}}}h-=(pt+pb+bt+bb);if(isNaN(h)||h<0){return}else{e.style.height=h+"px"}}h=e.offsetHeight}else{if(css&&xDef(e.style.pixelHeight)){if(h>=0){e.style.pixelHeight=h}h=e.style.pixelHeight}}return h},xWidth=function(e,w){var css,pl=0,pr=0,bl=0,br=0;if(!e){return 0}if(xNum(w)){if(w<0){w=0}else{w=Math.round(w)}}else{w=-1}css=xDef(e.style);if(css&&xDef(e.offsetWidth)&&xStr(e.style.width)){if(w>=0){if(document.compatMode=="CSS1Compat"){pl=xGetComputedStyle(e,"padding-left",1);if(pl!==null){pr=xGetComputedStyle(e,"padding-right",1);bl=xGetComputedStyle(e,"border-left-width",1);br=xGetComputedStyle(e,"border-right-width",1)}else{if(xDef(e.offsetWidth,e.style.width)){e.style.width=w+"px";pl=e.offsetWidth-w}}}w-=(pl+pr+bl+br);if(isNaN(w)||w<0){return}else{e.style.width=w+"px"}}w=e.offsetWidth}else{if(css&&xDef(e.style.pixelWidth)){if(w>=0){e.style.pixelWidth=w}w=e.style.pixelWidth}}return w},xTop=function(e,iY){if(!e){return 0}var css=xDef(e.style);if(css&&xStr(e.style.top)){if(xNum(iY)){e.style.top=iY+"px"}else{iY=parseInt(e.style.top);if(isNaN(iY)){iY=xGetComputedStyle(e,"top",1)}if(isNaN(iY)){iY=0}}}else{if(css&&xDef(e.style.pixelTop)){if(xNum(iY)){e.style.pixelTop=iY}else{iY=e.style.pixelTop}}}return iY},xLeft=function(e,iX){if(!e){return 0}var css=xDef(e.style);if(css&&xStr(e.style.left)){if(xNum(iX)){e.style.left=iX+"px"}else{iX=parseInt(e.style.left);if(isNaN(iX)){iX=xGetComputedStyle(e,"left",1)}if(isNaN(iX)){iX=0}}}else{if(css&&xDef(e.style.pixelLeft)){if(xNum(iX)){e.style.pixelLeft=iX}else{iX=e.style.pixelLeft}}}return iX};var $A=function(dc,dcA,dcI,onReady,disableAsync){if(typeof dc==="object"&&!isArray(dc)&&"id" in dc){}else{disableAsync=onReady;onReady=dcI;dcI=dcA;dcA=dc;dc=null}var fn=function(){if(disableAsync){pL.ajaxSetup({async:false})}pL.accDC(dcA,dcI,dc);if(disableAsync){pL.ajaxSetup({async:true})}};if(onReady){pL(fn)}else{fn()}};$A.reg={};$A.fn={globalDC:{},wheel:{},debug:false};pL.extend($A,{xOffset:xOffset,xHeight:xHeight,xWidth:xWidth,xTop:xTop,xLeft:xLeft,transition:transition,isArray:isArray,internal:pL,version:accDCVersion,sraCSS:sraCSS,sraCSSClear:sraCSSClear,getEl:getEl,createEl:createEl,getAttr:getAttr,remAttr:remAttr,getText:getText,css:css,setAttr:setAttr,inArray:inArray,hasClass:hasClass,addClass:addClass,remClass:remClass,globalDCMerge:function(){$A.find("*",function(dc){pL.extend(true,dc,$A.fn.globalDC)})},genId:function(id){return now(id||"AccDC")},announce:function(str,noRepeat,aggr){if(typeof str!=="string"){str=getText(str)}return String.prototype.announce.apply(str,[str,null,noRepeat,aggr])},query:function(sel,con,call){if(con&&typeof con==="function"){call=con;con=null}var r=[];if(isArray(sel)){r=sel}else{if(typeof sel!=="string"){r.push(sel)}else{pL.find(sel,con,r)}}if(call&&typeof call==="function"){pL.each(r,call)}return r},find:function(ids,fn){var ids=ids.split(",");for(var id in $A.reg){if(ids[0]==="*"||inArray(id,ids)!==-1){fn.apply($A.reg[id],[$A.reg[id]])}}},destroy:function(id,p){if(!$A.reg[id]){return false}var r=$A.reg[id],a=r.accDCObj,c=r.containerDiv;if(p&&r.loaded){var lc=lastChild(c);while(lc){pL(a).after(lc);lc=lastChild(c)}}if(r.loaded){pL(a).remove()}r.accDCObj=r.containerDiv=a=c=null;var iv=r.indexVal,wh=r.siblings;wh.splice(iv,1);for(var i=0;i<wh.length;i++){wh[i].indexVal=i;wh[i].siblings=wh}if($A.reg[id].parent&&$A.reg[id].parent.children&&$A.reg[id].parent.children.length){var pc=-1,cn=$A.reg[id].parent.children;for(var i=0;i<cn.length;i++){if(cn[i].id==id){pc=i}}if(pc>=0){$A.reg[id].parent.children.splice(pc,1)}}delete $A.reg[id]},morph:function(dc,obj,dcI){if(dc.nodeType===1&&dc.nodeName){dcI=obj;obj=dc;dc=null}var c={fn:{morph:true,morphObj:obj},autoStart:true};pL.extend(c,dcI);pL.accDC([c],null,dc)},setFocus:function(o){var oTI=null;if(getAttr(o,"tabindex")){oTI=getAttr(o,"tabindex")}setAttr(o,"tabindex",-1);o.focus();if(oTI){setAttr(o,"tabindex",oTI)}else{remAttr(o,"tabindex")}return o}});$A.load=function(target,source,hLoadData,callback){return pL(target).load(source,hLoadData,callback)};$A.get=function(source,hGetData,callback,hGetType){return pL.get(source,hGetData,callback,hGetType)};$A.getJSON=function(source,hJSONData,callback){return pL.getJSON(source,hJSONData,callback)};$A.getScript=function(source,callback,disableAsync){if(typeof callback==="boolean"){disableAsync=callback;callback=null}if(disableAsync){pL.ajaxSetup({async:false})}pL.getScript(source,callback);if(disableAsync){pL.ajaxSetup({async:true})}};$A.post=function(source,hPostData,callback,hPostType){return pL.post(source,hPostData,callback,hPostType)};$A.ajax=function(ajaxOptions){return pL.ajax(ajaxOptions)};$A.bind=function(ta,e,fn){if(e=="load"&&(ta=="body"||ta==window||ta==document||ta==document.body)){pL(document).ready(function(ev){fn(ev)})}else{pL(ta).bind(e,fn)}return ta};$A.unbind=function(ta,e){pL(ta).unbind(e);return ta};$A.trigger=function(ta,e){pL(ta).trigger(e);return ta};window[(window.AccDCNamespace?window.AccDCNamespace:"$A")]=$A;var calcPosition=function(dc,objArg,posVal){var obj=objArg||dc.posAnchor;if(obj&&typeof obj=="string"){obj=pL(obj).get(0)}else{if(!obj){obj=dc.triggerObj}}if(!obj){return}var autoPosition=posVal||dc.autoPosition,pos={},aPos={height:xHeight(dc.accDCObj),width:xWidth(dc.accDCObj)},oPos=xOffset(obj),position=css(dc.accDCObj,"position");if(position=="relative"){oPos=xOffset(obj,null,true)}else{if(position=="fixed"&&css(obj,"position")=="fixed"){oPos.top=obj.offsetTop}}oPos.height=xHeight(obj);oPos.width=xWidth(obj);if(autoPosition==1){pos.left=oPos.left;pos.top=oPos.top-aPos.height}else{if(autoPosition==2){pos.left=oPos.left+oPos.width;pos.top=oPos.top-aPos.height}else{if(autoPosition==3){pos.left=oPos.left+oPos.width;pos.top=oPos.top}else{if(autoPosition==4){pos.left=oPos.left+oPos.width;pos.top=oPos.top+oPos.height}else{if(autoPosition==5){pos.left=oPos.left;pos.top=oPos.top+oPos.height}else{if(autoPosition==6){pos.left=oPos.left-aPos.width;pos.top=oPos.top+oPos.height}else{if(autoPosition==7){pos.left=oPos.left-aPos.width;pos.top=oPos.top}else{if(autoPosition==8){pos.left=oPos.left-aPos.width;pos.top=oPos.top-aPos.height}else{if(autoPosition==9){pos.left=oPos.left;pos.top=oPos.top}else{if(autoPosition==10){pos.left=oPos.left+oPos.width-aPos.width;pos.top=oPos.top-aPos.height}else{if(autoPosition==11){pos.left=oPos.left+oPos.width-aPos.width;pos.top=oPos.top}else{if(autoPosition==12){pos.left=oPos.left+oPos.width-aPos.width;pos.top=oPos.top+oPos.height}}}}}}}}}}}}if(typeof dc.offsetTop==="number"&&(dc.offsetTop<0||dc.offsetTop>0)){pos.top+=dc.offsetTop}if(typeof dc.offsetLeft==="number"&&(dc.offsetLeft<0||dc.offsetLeft>0)){pos.left+=dc.offsetLeft}css(dc.accDCObj,pos)};String.prototype.announce=function announce(strm,loop,noRep,aggr){if(String.announce.loaded){if(!String.announce.liveRendered&&!aggr&&String.announce.placeHolder){String.announce.liveRendered=true;document.body.appendChild(String.announce.placeHolder)}if(!String.announce.alertRendered&&aggr&&String.announce.placeHolder2){String.announce.alertRendered=true;document.body.appendChild(String.announce.placeHolder2)}}if(strm&&strm.nodeName&&strm.nodeType===1){strm=getText(strm)}var obj=strm||this,str=strm?strm:this.toString();if(typeof str!=="string"){return obj}if(!loop&&inArray(str,String.announce.alertMsgs)===-1){String.announce.alertMsgs.push(str)}if((String.announce.alertMsgs.length==1||loop)){var timeLength=String.announce.baseDelay+(String.announce.iterate(String.announce.alertMsgs[0],/\s|\,|\.|\:|\;|\!|\(|\)|\/|\?|\@|\#|\$|\%|\^|\&|\*|\\|\-|\_|\+|\=/g)*String.announce.charMultiplier);if(!(noRep&&String.announce.lastMsg==String.announce.alertMsgs[0])){String.announce.lastMsg=String.announce.alertMsgs[0];if(aggr){String.announce.placeHolder2.innerHTML=String.announce.alertMsgs[0]}else{String.announce.placeHolder.innerHTML=String.announce.alertMsgs[0]}}String.announce.alertTO=setTimeout(function(){String.announce.placeHolder.innerHTML=String.announce.placeHolder2.innerHTML="";String.announce.alertMsgs.shift();if(String.announce.alertMsgs.length>=1){String.prototype.announce(String.announce.alertMsgs[0],true,noRep,aggr)}},timeLength)}return obj};String.announce={alertMsgs:[],clear:function(){if(this.alertTO){clearTimeout(this.alertTO)}this.alertMsgs=[]},baseDelay:1000,charMultiplier:10,lastMsg:"",iterate:function(str,regExp){var iCount=0;str.replace(regExp,function(){iCount++});return iCount},loaded:false,liveRendered:false,alertRendered:false};$A.bind(window,"load",function(){if(!String.announce.placeHolder){String.announce.placeHolder=createEl("div",{"aria-live":"polite"},sraCSS);String.announce.placeHolder2=createEl("div",{role:"alert"},sraCSS)}String.announce.loaded=true});pL.accDC=function(accDCObjects,gImport,parentDC){var wheel=[],ids=[],getScript=function(dc,u,f){pL.ajax({async:false,type:"GET",url:u,data:null,success:function(){if(f){return f.apply(dc,arguments)}},dataType:"script"})},changeTabs=function(dc,isClose){var dc=wheel[dc.indexVal];if(dc.isTab){if(dc.tabState){for(var w=0;w<wheel.length;w++){var wl=wheel[w];if(wl.isTab){var ss=pL(wl.triggerObj).data("sra");if(ss){if(wl.loaded){pL(ss).html("<span>&nbsp;"+wl.tabRole+"&nbsp;"+wl.tabState+"</span>")}else{pL(ss).html("<span>&nbsp;"+wl.tabRole+"</span>")}}}}$A.query(dc.trigger,function(){if(this!=dc.triggerObj){pL(pL(this).data("sra")).html("<span>&nbsp;"+dc.tabRole+"</span>")}})}}else{if(dc.isToggle){if(dc.toggleState){$A.query(dc.trigger,function(){var ss=pL(this).data("sra");if(ss){if(!isClose){pL(ss).html("<span>&nbsp;"+dc.toggleRole+"&nbsp;"+dc.toggleState+"</span>")}else{pL(ss).html("<span>&nbsp;"+dc.toggleRole+"</span>")}}})}}}return wheel[dc.indexVal]=dc},loadAccDCObj=function(dc){var dc=wheel[dc.indexVal];if((dc.loaded&&!dc.allowReopen&&!dc.isToggle)||dc.fn.override||dc.lock||dc.loading||dc.closing){return dc}else{if(dc.loaded&&(dc.allowReopen||dc.isToggle)){dc.fn.bypass=true;closeAccDCObj(dc);dc.fn.bypass=false;if(dc.isToggle){return dc}}}dc.cancel=false;dc.content="";var nid=now();dc.accDCObjId=dc.fn.accDCObjId="AccDC"+nid;dc.closeId="AccDC"+(nid+(nowI+=1));dc.containerId=dc.containerDivId="AccDC"+(nid+(nowI+=1));if(dc.importCSS){dc.fn.importCSSId="AccDC"+(nid+(nowI+=1))}dc.fn.sraStart=createEl("div",null,sraCSS);dc.fn.sraEnd=createEl("div",null,sraCSS);dc.containerDiv=createEl("div",{id:dc.containerId});dc.accDCObj=createEl("div",{id:dc.fn.accDCObjId});if(dc.className){addClass(dc.accDCObj,dc.className)}pL(dc.accDCObj).append(dc.fn.sraStart).append(dc.containerDiv).append(dc.fn.sraEnd);var events={mouseOver:function(ev){dc.mouseOver.apply(this,[ev,dc])},mouseOut:function(ev){dc.mouseOut.apply(this,[ev,dc])},resize:function(ev){dc.resize.apply(this,[ev,dc])},scroll:function(ev){dc.scroll.apply(this,[ev,dc])},click:function(ev){dc.click.apply(this,[ev,dc])},dblClick:function(ev){dc.dblClick.apply(this,[ev,dc])},mouseDown:function(ev){dc.mouseDown.apply(this,[ev,dc])},mouseUp:function(ev){dc.mouseUp.apply(this,[ev,dc])},mouseMove:function(ev){dc.mouseMove.apply(this,[ev,dc])},mouseEnter:function(ev){dc.mouseEnter.apply(this,[ev,dc])},mouseLeave:function(ev){dc.mouseLeave.apply(this,[ev,dc])},keyDown:function(ev){dc.keyDown.apply(this,[ev,dc])},keyPress:function(ev){dc.keyPress.apply(this,[ev,dc])},keyUp:function(ev){dc.keyUp.apply(this,[ev,dc])},error:function(ev){dc.error.apply(this,[ev,dc])},focusIn:function(ev){dc.focusIn.apply(this,[ev,dc])},focusOut:function(ev){dc.focusOut.apply(this,[ev,dc])}},toBind={};for(var ev in events){if(dc[ev]&&typeof dc[ev]==="function"){toBind[ev.toLowerCase()]=events[ev]}}$A.bind(dc.accDCObj,toBind);if(!dc.ranJSOnceBefore){dc.ranJSOnceBefore=true;if(dc.reverseJSOrder){dc.runOnceBefore.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runOnceBefore){dc.fn.proto.runOnceBefore.apply(dc,[dc])}if($A.fn.globalDC.runOnceBefore){$A.fn.globalDC.runOnceBefore.apply(dc,[dc])}}dc.reverseJSOrderPass=true}if(dc.runJSOnceBefore.length){for(var j=0;j<dc.runJSOnceBefore.length;j++){getScript(dc,dc.runJSOnceBefore[j])}}if(dc.allowCascade){if(dc.fn.proto.runJSOnceBefore&&dc.fn.proto.runJSOnceBefore.length){for(var j=0;j<dc.fn.proto.runJSOnceBefore.length;j++){getScript(dc,dc.fn.proto.runJSOnceBefore[j])}}if($A.fn.globalDC.runJSOnceBefore&&$A.fn.globalDC.runJSOnceBefore.length){for(var j=0;j<$A.fn.globalDC.runJSOnceBefore.length;j++){getScript(dc,$A.fn.globalDC.runJSOnceBefore[j])}}}if(!dc.reverseJSOrder&&!dc.reverseJSOrderPass){dc.runOnceBefore.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runOnceBefore){dc.fn.proto.runOnceBefore.apply(dc,[dc])}if($A.fn.globalDC.runOnceBefore){$A.fn.globalDC.runOnceBefore.apply(dc,[dc])}}}else{dc.reverseJSOrderPass=false}}if(dc.reverseJSOrder){dc.runBefore.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runBefore){dc.fn.proto.runBefore.apply(dc,[dc])}if($A.fn.globalDC.runBefore){$A.fn.globalDC.runBefore.apply(dc,[dc])}}dc.reverseJSOrderPass=true}if(dc.runJSBefore.length){for(var j=0;j<dc.runJSBefore.length;j++){getScript(dc,dc.runJSBefore[j])}}if(dc.allowCascade){if(dc.fn.proto.runJSBefore&&dc.fn.proto.runJSBefore.length){for(var j=0;j<dc.fn.proto.runJSBefore.length;j++){getScript(dc,dc.fn.proto.runJSBefore[j])}}if($A.fn.globalDC.runJSBefore&&$A.fn.globalDC.runJSBefore.length){for(var j=0;j<$A.fn.globalDC.runJSBefore.length;j++){getScript(dc,$A.fn.globalDC.runJSBefore[j])}}}if(!dc.reverseJSOrder&&!dc.reverseJSOrderPass){dc.runBefore.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runBefore){dc.fn.proto.runBefore.apply(dc,[dc])}if($A.fn.globalDC.runBefore){$A.fn.globalDC.runBefore.apply(dc,[dc])}}}else{dc.reverseJSOrderPass=false}if(dc.cancel){dc.cancel=dc.loading=false;return dc}dc.loading=true;if(dc.showHiddenBounds){setAttr(dc.fn.sraStart,{id:"h"+now(),role:"heading","aria-level":dc.ariaLevel});pL(dc.fn.sraStart).append("<span>"+dc.role+"&nbsp;"+dc.accStart+"</span>");if(dc.showHiddenClose){dc.fn.closeLink=createEl("a",{id:dc.closeId,href:"#"},dc.sraCSS,dc.closeClassName);dc.fn.closeLink.innerHTML=dc.accClose;insertBefore(dc.fn.sraEnd,dc.fn.closeLink);if(dc.displayHiddenClose){$A.bind(dc.fn.closeLink,{focus:function(){sraCSSClear(this)},blur:function(){css(this,dc.sraCSS)}})}else{setAttr(dc.fn.closeLink,"tabindex","-1")}}pL(dc.fn.sraEnd).append("<span>"+dc.role+"&nbsp;"+dc.accEnd+"</span>")}if(dc.forceFocus){setAttr(dc.fn.sraStart,"tabindex",-1);css(dc.fn.sraStart,"outline","none")}if(dc.displayInline){css([dc.accDCObj,dc.containerDiv],"display","inline")}switch(dc.mode){case 1:pL(dc.containerDiv).load(dc.source,dc.hLoadData,function(responseText,textStatus,XMLHttpRequest){dc.hLoad(responseText,textStatus,XMLHttpRequest,dc);parseRemaining(dc)});break;case 2:dc.request=pL.get(dc.source,dc.hGetData,function(source,textStatus){dc.hGet(source,textStatus,dc);dc.hSource(dc.content);parseRemaining(dc)},dc.hGetType);break;case 3:dc.request=pL.getJSON(dc.source,dc.hJSONData,function(source,textStatus){dc.hJSON(source,textStatus,dc);dc.hSource(dc.content);parseRemaining(dc)});break;case 4:dc.request=pL.getScript(dc.source,function(source,textStatus){dc.hScript(source,textStatus,dc);dc.hSource(dc.content);parseRemaining(dc)});break;case 5:dc.request=pL.post(dc.source,dc.hPostData,function(source,textStatus){dc.hPost(source,textStatus,dc);dc.hSource(dc.content);parseRemaining(dc)},dc.hPostType);break;case 6:dc.request=pL.ajax(dc.ajaxOptions);break;default:dc.hSource(dc.source);parseRemaining(dc)}return wheel[dc.indexVal]=dc},parseRemaining=function(dc){var dc=wheel[dc.indexVal];dc.runDuring.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runDuring){dc.fn.proto.runDuring.apply(dc,[dc])}if($A.fn.globalDC.runDuring){$A.fn.globalDC.runDuring.apply(dc,[dc])}}if(dc.cancel){dc.cancel=dc.loading=false;return dc}for(var w=0;w<wheel.length;w++){var wl=wheel[w];if(wl.loaded&&!wl.allowMultiple){wl.fn.bypass=true;dc.close(wl);wl.fn.bypass=false}}css(dc.accDCObj,dc.cssObj);if(dc.autoFix){setAutoFix(dc)}if(dc.fn.morph&&dc.fn.morphObj){pL(dc.fn.morphObj).after(dc.accDCObj);pL(dc.containerDiv).append(dc.fn.morphObj);dc.fn.morph=false}else{if(dc.isStatic){if(dc.append){pL(dc.isStatic).append(dc.accDCObj)}else{if(dc.prepend){if(!firstChild(pL(dc.isStatic).get(0))){pL(dc.isStatic).append(dc.accDCObj)}else{insertBefore(firstChild(pL(dc.isStatic).get(0)),dc.accDCObj)}}else{pL(dc.isStatic).html(dc.accDCObj)}}}else{if(dc.targetObj&&(!dc.returnFocus||dc.triggerObj)){pL(dc.targetObj).after(dc.accDCObj)}else{if(dc.triggerObj){pL(dc.triggerObj).after(dc.accDCObj)}else{if($A.fn.debug){alert("Error: The dc.triggerObj property must be programatically set if no trigger or targetObj is specified during setup. View the Traversal and Manipulation section in the WhatSock.com Core API documentation for additional details.")}}}}}if(dc.importCSS){dc.fn.cssLink=createEl("link",{id:dc.fn.importCSSId,rel:"stylesheet",type:"text/css",href:dc.importCSS});dc.accDCObj.appendChild(dc.fn.cssLink)}if(dc.isDraggable&&dc.drag.persist&&dc.drag.x&&dc.drag.y){css(dc.accDCObj,{left:dc.drag.x,top:dc.drag.y})}else{if(dc.autoPosition>0&&!dc.isStatic&&!dc.autoFix){calcPosition(dc)}}var forceFocus=dc.forceFocus;dc.loading=false;dc.loaded=true;if(dc.isTab||dc.isToggle){changeTabs(dc)}$A.query("."+dc.closeClassName,dc.accDCObj,function(){$A.bind(this,"click",function(ev){dc.close();ev.preventDefault()})});$A.bind(dc.fn.closeLink,"focus",function(ev){dc.tabOut(ev,dc)});if(dc.timeoutVal){dc.timer=setTimeout(function(){dc.timeout(dc)},dc.timeoutVal)}if(dc.dropTarget&&dc.accDD.on){dc.accDD.dropTargets=[];dc.accDD.dropAnchors=[];$A.query(dc.dropTarget,function(){dc.accDD.dropAnchors.push(this);dc.accDD.dropTargets.push(this)})}if(!dc.ranJSOnceAfter){dc.ranJSOnceAfter=true;if(dc.reverseJSOrder){dc.runOnceAfter.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runOnceAfter){dc.fn.proto.runOnceAfter.apply(dc,[dc])}if($A.fn.globalDC.runOnceAfter){$A.fn.globalDC.runOnceAfter.apply(dc,[dc])}}dc.reverseJSOrderPass=true}if(dc.runJSOnceAfter.length){for(var j=0;j<dc.runJSOnceAfter.length;j++){getScript(dc,dc.runJSOnceAfter[j])}}if(dc.allowCascade){if(dc.fn.proto.runJSOnceAfter&&dc.fn.proto.runJSOnceAfter.length){for(var j=0;j<dc.fn.proto.runJSOnceAfter.length;j++){getScript(dc,dc.fn.proto.runJSOnceAfter[j])}}if($A.fn.globalDC.runJSOnceAfter&&$A.fn.globalDC.runJSOnceAfter.length){for(var j=0;j<$A.fn.globalDC.runJSOnceAfter.length;j++){getScript(dc,$A.fn.globalDC.runJSOnceAfter[j])}}}if(!dc.reverseJSOrder&&!dc.reverseJSOrderPass){dc.runOnceAfter.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runOnceAfter){dc.fn.proto.runOnceAfter.apply(dc,[dc])}if($A.fn.globalDC.runOnceAfter){$A.fn.globalDC.runOnceAfter.apply(dc,[dc])}}}else{dc.reverseJSOrderPass=false}}if(dc.reverseJSOrder){dc.runAfter.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runAfter){dc.fn.proto.runAfter.apply(dc,[dc])}if($A.fn.globalDC.runAfter){$A.fn.globalDC.runAfter.apply(dc,[dc])}}dc.reverseJSOrderPass=true}if(dc.runJSAfter.length){for(var j=0;j<dc.runJSAfter.length;j++){getScript(dc,dc.runJSAfter[j])}}if(dc.allowCascade){if(dc.fn.proto.runJSAfter&&dc.fn.proto.runJSAfter.length){for(var j=0;j<dc.fn.proto.runJSAfter.length;j++){getScript(dc,dc.fn.proto.runJSAfter[j])}}if($A.fn.globalDC.runJSAfter&&$A.fn.globalDC.runJSAfter.length){for(var j=0;j<$A.fn.globalDC.runJSAfter.length;j++){getScript(dc,$A.fn.globalDC.runJSAfter[j])}}}if(!dc.reverseJSOrder&&!dc.reverseJSOrderPass){dc.runAfter.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runAfter){dc.fn.proto.runAfter.apply(dc,[dc])}if($A.fn.globalDC.runAfter){$A.fn.globalDC.runAfter.apply(dc,[dc])}}}else{dc.reverseJSOrderPass=false}if((parseInt(dc.shadow.horizontal)||parseInt(dc.shadow.vertical))&&dc.shadow.color){setShadow(dc)}if(dc.autoFix&&(!dc.isDraggable||!dc.drag.persist||!dc.drag.x||!dc.drag.y)){sizeAutoFix(dc)}if(dc.isDraggable){setDrag(dc)}if(forceFocus){$A.setFocus(dc.fn.sraStart)}if($A.fn.debug&&!getEl(dc.containerId)){alert("Error: The Automatic Accessibility Framework has been overwritten within the AccDC Dynamic Content Object with id="+dc.id+'. New content should be added in a proper manner using the "source", "containerDiv", or "content" properties to ensure accessibility. View the Setup, Traversal and Manipulation, and Mode Handlers sections in the WhatSock.com Core API documentation for additional details.')}if(dc.announce){$A.announce(dc.containerDiv)}if($A.bootstrap){$A.bootstrap(dc.containerDiv)}return wheel[dc.indexVal]=dc},closeAccDCObj=function(dc){var dc=wheel[dc.indexVal];dc.runBeforeClose.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runBeforeClose){dc.fn.proto.runBeforeClose.apply(dc,[dc])}if($A.fn.globalDC.runBeforeClose){$A.fn.globalDC.runBeforeClose.apply(dc,[dc])}}if(!dc.loaded||dc.lock){return dc}dc.closing=true;if(dc.isDraggable){unsetDrag(dc)}pL(dc.accDCObj).remove();if(dc.fn.containsFocus&&!dc.fn.bypass){dc.fn.toggleFocus=true}dc.fn.override=true;if(dc.returnFocus&&dc.triggerObj&&!dc.fn.bypass){if(dc.triggerObj.nodeName.toLowerCase()=="form"){var s=pL(dc.triggerObj).find('*[type="submit"]').get(0);if(s&&s.focus){s.focus()}}else{if(dc.triggerObj.focus){dc.triggerObj.focus()}else{$A.setFocus(dc.triggerObj)}}}dc.loaded=dc.fn.override=false;if(dc.isTab||dc.isToggle){changeTabs(dc,true)}dc.fn.triggerObj=dc.triggerObj;dc.closing=false;dc.runAfterClose.apply(dc,[dc]);if(dc.allowCascade){if(dc.fn.proto.runAfterClose){dc.fn.proto.runAfterClose.apply(dc,[dc])}if($A.fn.globalDC.runAfterClose){$A.fn.globalDC.runAfterClose.apply(dc,[dc])}}return wheel[dc.indexVal]=dc},unsetTrigger=function(dc){var dc=wheel[dc.indexVal];$A.query(dc.fn.triggerB,function(){$A.unbind(this,dc.fn.bindB);if(dc.isTab||dc.isToggle){pL(this).data("sra").remove()}});dc.fn.triggerB=dc.fn.bindB="";return wheel[dc.indexVal]=dc},setTrigger=function(dc){var dc=wheel[dc.indexVal];unsetTrigger(dc);return wheel[dc.indexVal]=setBindings(dc)},setAutoFix=function(dc){var dc=wheel[dc.indexVal];if(!dc.loading&&!dc.loaded){return dc}var cs={position:"fixed",right:"",bottom:"",top:"",left:""};switch(dc.autoFix){case 1:cs.top=0;cs.left="40%";break;case 2:cs.top=0;cs.right=0;break;case 3:cs.top="40%";cs.right=0;break;case 4:cs.bottom=0;cs.right=0;break;case 5:cs.bottom=0;cs.left="40%";break;case 6:cs.bottom=0;cs.left=0;break;case 7:cs.top="40%";cs.left=0;break;case 8:cs.top=0;cs.left=0;break;case 9:cs.top="40%";cs.left="40%";default:cs=dc.cssObj}css(dc.accDCObj,cs);return wheel[dc.indexVal]=dc},sizeAutoFix=function(dc){var dc=wheel[dc.indexVal];if(!dc.loading&&!dc.loaded){return dc}var win=getWin();var bodyW=win.width,bodyH=win.height,aW=xWidth(dc.accDCObj),aH=xHeight(dc.accDCObj);if(bodyW>aW){var npw=parseInt(aW/bodyW*100/2)}else{var npw=50}if(bodyH>aH){var nph=parseInt(aH/bodyH*100/2)}else{var nph=50}switch(dc.autoFix){case 1:case 5:css(dc.accDCObj,"left",50-npw+"%");break;case 3:case 7:css(dc.accDCObj,"top",50-nph+"%");break;case 9:css(dc.accDCObj,{left:50-npw+"%",top:50-nph+"%"})}if(dc.offsetTop<0||dc.offsetTop>0||dc.offsetLeft<0||dc.offsetLeft>0){var cs=xOffset(dc.accDCObj);cs.top=dc.accDCObj.offsetTop;cs.top+=dc.offsetTop;cs.left+=dc.offsetLeft;css(dc.accDCObj,cs)}return wheel[dc.indexVal]=dc},setShadow=function(dc){var dc=wheel[dc.indexVal];css(dc.accDCObj,{"box-shadow":dc.shadow.horizontal+" "+dc.shadow.vertical+" "+dc.shadow.blur+" "+dc.shadow.color,"-webkit-box-shadow":dc.shadow.horizontal+" "+dc.shadow.vertical+" "+dc.shadow.blur+" "+dc.shadow.color,"-moz-box-shadow":dc.shadow.horizontal+" "+dc.shadow.vertical+" "+dc.shadow.blur+" "+dc.shadow.color});return wheel[dc.indexVal]=dc},setDrag=function(dc){var dc=wheel[dc.indexVal];if((!dc.loading&&!dc.loaded)||dc.fn.isDragSet){return dc}dc.fn.isDragSet=true;var opts={},save={};if(dc.drag.handle){opts.handle=pL(dc.drag.handle).get(0)}if(css(dc.accDCObj,"position")=="relative"){opts.relative=true}if(dc.drag.minDistance&&dc.drag.minDistance>0){opts.distance=dc.drag.minDistance}dc.drag.confineToN=null;pL(dc.accDCObj).drag("init",function(ev,dd){dc.fn.isDragging=true;var cssPos=css(this,"position"),objos=xOffset(this);if(cssPos=="fixed"){objos.top=this.offsetTop}else{if(cssPos=="relative"){objos=xOffset(this,null,true)}}objos.right="";objos.bottom="";css(this,objos);if(typeof dc.drag.confineTo==="string"){dc.drag.confineToN=$A.query(dc.drag.confineTo)[0]}else{if(dc.drag.confineTo&&dc.drag.confineTo.nodeName){dc.drag.confineToN=dc.drag.confineTo}}if(dc.drag.confineToN&&dc.drag.confineToN.nodeName){save.nFixed=false;var cssNPos=css(dc.drag.confineToN,"position"),objNos=xOffset(dc.drag.confineToN);if(cssPos=="relative"&&this.offsetParent==dc.drag.confineToN){objNos=dd.limit={top:0,left:0}}else{if(cssPos=="fixed"&&cssNPos=="fixed"){objNos.top=dc.drag.confineToN.offsetTop;save.nFixed=true;dd.limit=objNos}else{dd.limit=objNos}}dd.limit.bottom=dd.limit.top+xHeight(dc.drag.confineToN);dd.limit.right=dd.limit.left+xWidth(dc.drag.confineToN)}setAttr(dc.accDCObj,"aria-grabbed","true");if(dc.drag.init&&typeof dc.drag.init==="function"){dc.drag.init.apply(this,[ev,dd,dc])}}).drag("start",function(ev,dd){dc.onDragStart.apply(this,[ev,dd,dc])}).drag(function(ev,dd){if(save.y!=dd.offsetY||save.x!=dd.offsetX){var position=css(this,"position");if(dc.drag.override&&typeof dc.drag.override==="function"){dc.drag.override.apply(this,[ev,dd,dc])}else{if(dc.drag.confineToN&&dc.drag.confineToN.nodeName){var n={top:dd.offsetY,left:dd.offsetX},height=xHeight(this),width=xWidth(this);if(n.top<dd.limit.top){n.top=dd.limit.top}if((n.top+height)>dd.limit.bottom){n.top=dd.limit.bottom}if(n.left<dd.limit.left){n.left=dd.limit.left}if((n.left+width)>dd.limit.right){n.left=dd.limit.right}if(n.top>=dd.limit.top&&(n.top+height)<=dd.limit.bottom){xTop(this,n.top)}if(n.left>=dd.limit.left&&(n.left+width)<=dd.limit.right){xLeft(this,n.left)}}else{if(typeof dc.drag.maxX==="number"||typeof dc.drag.maxY==="number"){if(typeof dc.drag.maxX==="number"&&((dd.originalX<dd.offsetX&&(dd.offsetX-dd.originalX)<=dc.drag.maxX)||(dd.originalX>dd.offsetX&&(dd.originalX-dd.offsetX)<=dc.drag.maxX))){xLeft(this,dd.offsetX)}if(typeof dc.drag.maxY==="number"&&((dd.originalY<dd.offsetY&&(dd.offsetY-dd.originalY)<=dc.drag.maxY)||(dd.originalY>dd.offsetY&&(dd.originalY-dd.offsetY)<=dc.drag.maxY))){xTop(this,dd.offsetY)}}else{xTop(this,dd.offsetY);xLeft(this,dd.offsetX)}}}dc.onDrag.apply(this,[ev,dd,dc]);save.y=dd.offsetY;save.x=dd.offsetX}}).drag("end",function(ev,dd){dc.fn.isDragging=false;dc.drag.y=dd.offsetY;dc.drag.x=dd.offsetX;setAttr(dc.accDCObj,"aria-grabbed","false");dc.onDragEnd.apply(this,[ev,dd,dc])},opts);if(dc.dropTarget){pL(dc.dropTarget).drop("init",function(ev,dd){if(dc.fn.isDragging){if(dc.dropInit&&typeof dc.dropInit==="function"){dc.dropInit.apply(this,[ev,dd,dc])}}}).drop("start",function(ev,dd){if(dc.fn.isDragging){dc.onDropStart.apply(this,[ev,dd,dc])}}).drop(function(ev,dd){if(dc.fn.isDragging){dc.onDrop.apply(this,[ev,dd,dc])}}).drop("end",function(ev,dd){if(dc.fn.isDragging){dc.onDropEnd.apply(this,[ev,dd,dc])}});pL.drop(dc.drop);if(dc.accDD.on){dc.accDD.dropTargets=[];dc.accDD.dropAnchors=[];dc.accDD.dropLinks=[];$A.query(dc.dropTarget,function(i,v){dc.accDD.dropAnchors[i]=v;dc.accDD.dropTargets[i]=v;setAttr(v,"aria-dropeffect",dc.accDD.dropEffect);dc.accDD.dropLinks[i]=createEl("a",{href:"#"},dc.sraCSS,dc.accDD.dragClassName,createText(dc.accDD.dragText+" "+dc.role+" "+dc.accDD.toText+" "+getAttr(v,"data-label")));dc.containerDiv.appendChild(dc.accDD.dropLinks[i]);$A.bind(dc.accDD.dropLinks[i],{focus:function(ev){css(sraCSSClear(this),{position:"relative",zIndex:1000},dc.accDD.dragLinkStyle)},blur:function(ev){css(this,dc.sraCSS)},click:function(ev){if(!dc.accDD.isDragging){dc.accDD.isDragging=true;css(this,dc.sraCSS);setAttr(dc.accDCObj,"aria-grabbed","true");$A.announce(dc.accDD.actionText);dc.accDD.fireDrag.apply(dc.accDCObj,[ev,dc]);dc.accDD.fireDrop.apply(dc.accDD.dropTargets[i],[ev,dc])}ev.preventDefault()}})});setAttr(dc.accDCObj,"aria-grabbed","false")}}return wheel[dc.indexVal]=dc},unsetDrag=function(dc,uDrop){var dc=wheel[dc.indexVal];if(!dc.closing&&!dc.loaded){return dc}$A.unbind(dc.drag.handle?dc.drag.handle:dc.accDCObj,"draginit dragstart dragend drag");remAttr(dc.accDCObj,"aria-grabbed");if(dc.dropTarget){if(uDrop){$A.unbind(dc.dropTarget,"dropinit dropstart dropend drop");$A.query(dc.dropTarget,function(i,v){remAttr(v,"aria-dropeffect")})}if(dc.accDD.on){pL.each(dc.accDD.dropLinks,function(i,v){if(v.parentNode){v.parentNode.removeChild(v)}})}}dc.fn.isDragSet=false;return wheel[dc.indexVal]=dc},autoStart=[],setBindings=function(dc){dc.fn.toggleFocus=dc.fn.containsFocus=false;dc.bind=dc.binders||dc.bind;if(inArray("focus",dc.bind.split(" "))>=0){dc.fn.containsFocus=true}dc.fn.triggerB=dc.trigger;dc.fn.bindB=dc.bind;$A.query(dc.trigger,function(){if(this.nodeName.toLowerCase()=="a"&&!this.href){setAttr(this,"href","#")}pL(this).bind(dc.bind,function(ev){dc.triggerObj=this;dc.open();ev.preventDefault()});if((dc.isTab&&(dc.tabRole||dc.tabState))||(dc.isToggle&&(dc.toggleRole||dc.toggleState))){var ss=createEl("span",null,sraCSS);pL(this).append(ss);pL(this).data("sra",ss);dc.fn.sraCSSObj=ss}if(dc.isTab){pL(ss).html(dc.loaded?("<span>&nbsp;"+dc.tabRole+"&nbsp;"+dc.tabState+"</span>"):("<span>&nbsp;"+dc.tabRole+"</span>"))}else{if(dc.isToggle){pL(ss).html(dc.loaded?("<span>&nbsp;"+dc.toggleRole+"&nbsp;"+dc.toggleState+"</span>"):("<span>&nbsp;"+dc.toggleRole+"</span>"))}}});return dc},AccDCInit=function(dc){dc=setBindings(dc);dc.sraCSS=sraCSS;dc.sraCSSClear=sraCSSClear;var f=function(){};f.prototype=dc;return window[(window.AccDCNamespace?window.AccDCNamespace:"$A")].reg[dc.id]=$A.reg[dc.id]=new f()},svs=["runJSOnceBefore","runOnceBefore","runJSBefore","runBefore","runDuring","runJSOnceAfter","runOnceAfter","runJSAfter","runAfter","runBeforeClose","runAfterClose"];for(var a=0;a<accDCObjects.length;a++){var dc={id:"",fn:{},trigger:"",setTrigger:function(dc){var dc=dc||this;if(!dc.trigger||!dc.bind){if($A.fn.debug){alert("Error: Both of the dc.trigger and dc.bind properties must be set before this function can be used. View the Setup section in the WhatSock.com Core API documentation for additional details.")}return dc}return setTrigger(dc)},unsetTrigger:function(dc){var dc=dc||this;if(!dc.fn.triggerB||!dc.fn.bindB){return dc}return unsetTrigger(dc)},targetObj:null,role:"",accStart:"Start",accEnd:"End",accClose:"Close",ariaLevel:2,showHiddenClose:true,displayHiddenClose:true,showHiddenBounds:true,source:"",bind:"",displayInline:false,allowCascade:false,reverseJSOrder:false,runJSOnceBefore:[],runOnceBefore:function(dc){},runJSBefore:[],runBefore:function(dc){},runDuring:function(dc){},runJSOnceAfter:[],runOnceAfter:function(dc){},runJSAfter:[],runAfter:function(dc){},runBeforeClose:function(dc){},runAfterClose:function(dc){},allowMultiple:false,allowReopen:false,isToggle:false,toggleRole:"",toggleState:"",forceFocus:false,returnFocus:true,isStatic:"",prepend:false,append:false,isTab:false,tabRole:"Tab",tabState:"Selected",autoStart:false,announce:false,lock:false,mode:0,hSource:function(source,dc){var dc=dc||this;pL(dc.containerDiv).html(source);return dc},hLoadData:"",hLoad:function(responseText,textStatus,XMLHttpRequest,dc){},hGetData:{},hGetType:"",hGet:function(data,textStatus,dc){},hJSONData:{},hJSON:function(data,textStatus,dc){},hScript:function(data,textStatus,dc){},hPostData:{},hPostType:"",hPost:function(data,textStatus,dc){},ajaxOptions:{beforeSend:function(XMLHttpRequest){dc.hBeforeSend(this,XMLHttpRequest,dc)},success:function(source,textStatus,XMLHttpRequest){dc.hSuccess(this,source,textStatus,XMLHttpRequest,dc);dc.hSource(dc.content);parseRemaining(dc)},complete:function(XMLHttpRequest,textStatus){dc.hComplete(this,XMLHttpRequest,textStatus,dc)},error:function(XMLHttpRequest,textStatus,errorThrown){dc.hError(this,XMLHttpRequest,textStatus,errorThrown,dc)}},hBeforeSend:function(options,XMLHttpRequest,dc){},hSuccess:function(options,data,textStatus,XMLHttpRequest,dc){dc.content=data},hComplete:function(options,XMLHttpRequest,textStatus,dc){},hError:function(options,XMLHttpRequest,textStatus,errorThrown,dc){},open:function(dc){var dc=dc||this;if(dc.fn.toggleFocus){dc.fn.toggleFocus=false}else{loadAccDCObj(dc)}return dc},close:function(dc){var dc=dc||this;return closeAccDCObj(dc)},isDraggable:false,drag:{handle:null,maxX:null,maxY:null,persist:false,x:null,y:null,confineTo:null,init:null,override:null},onDragStart:function(ev,dd,dc){},onDragEnd:function(ev,dd,dc){},onDrag:function(ev,dd,dc){},dropTarget:null,dropInit:null,drop:{},onDropStart:function(ev,dd,dc){},onDrop:function(ev,dd,dc){},onDropEnd:function(ev,dd,dc){},setDrag:function(dc){var dc=dc||this;return setDrag(dc)},unsetDrag:function(dc,uDrop){if(dc&&typeof dc==="boolean"){uDrop=dc;dc=this}else{var dc=dc||this}unsetDrag(dc,uDrop);return dc},accDD:{on:false,dragText:"Move",toText:"to",dropTargets:[],dropEffect:"move",actionText:"Dragging",returnFocusTo:"",isDragging:false,dragClassName:"",dragLinkStyle:{},duration:500,fireDrag:function(ev,dc){var os=xOffset(this);dc.accDD.dragDD={drag:this,proxy:this,drop:dc.accDD.dropTargets,available:dc.accDD.dropTargets,startX:os.left+(xWidth(this)/2),startY:os.top+(xHeight(this)/2),deltaX:0,deltaY:0,originalX:os.left,originalY:os.top,offsetX:0,offsetY:0};dc.accDD.dragDD.target=pL(dc.drag.handle).get(0)||this;var position=css(this,"position");if(position=="fixed"){dc.accDD.dragDD.originalY=this.offsetTop}else{if(position=="relative"){var xos=xOffset(this,null,true);dc.accDD.dragDD.originalY=xos.top;dc.accDD.dragDD.originalX=xos.left}}dc.onDragStart.apply(this,[ev,dc.accDD.dragDD,dc])},fireDrop:function(ev,dc){var that=this,os=xOffset(this);dc.accDD.dropDD={target:this,drag:dc.accDD.dragDD.drag,proxy:dc.accDD.dragDD.proxy,drop:dc.accDD.dragDD.drop,available:dc.accDD.dragDD.available,startX:dc.accDD.dragDD.startX,startY:dc.accDD.dragDD.startY,originalX:dc.accDD.dragDD.originalX,originalY:dc.accDD.dragDD.originalY,deltaX:0,deltaY:0,offsetX:os.left,offsetY:os.top};var position=css(this,"position");if(position=="fixed"){dc.accDD.dropDD.offsetY=this.offsetTop}else{if(position=="relative"){var xos=xOffset(this,null,true);dc.accDD.dropDD.offsetY=xos.top;dc.accDD.dropDD.offsetX=xos.left}}function update(){var position=css(dc.accDD.dragDD.drag,"position"),os=xOffset(dc.accDD.dragDD.drag);dc.accDD.dragDD.offsetY=os.top;dc.accDD.dragDD.offsetX=os.left;if(position=="fixed"){dc.accDD.dragDD.offsetY=dc.accDD.dragDD.drag.offsetTop}else{if(position=="relative"){var xos=xOffset(dc.accDD.dragDD.drag,null,true);dc.accDD.dragDD.offsetY=xos.top;dc.accDD.dragDD.offsetX=xos.left}}}transition(dc.accDD.dragDD.drag,{top:dc.accDD.dropDD.offsetY,left:dc.accDD.dropDD.offsetX},{duration:dc.accDD.duration,step:function(){update();dc.onDrag.apply(dc.accDD.dragDD.drag,[ev,dc.accDD.dragDD,dc])},complete:function(){update();if(dc.accDD.dragDD.originalY<=dc.accDD.dragDD.offsetY){dc.accDD.dragDD.deltaY=dc.accDD.dropDD.deltaY=dc.accDD.dragDD.originalY-dc.accDD.dragDD.offsetY}else{if(dc.accDD.dragDD.originalY>=dc.accDD.dragDD.offsetY){dc.accDD.dragDD.deltaY=dc.accDD.dropDD.deltaY=0-(dc.accDD.dragDD.offsetY-dc.accDD.dragDD.originalY)}}if(dc.accDD.dragDD.originalX<=dc.accDD.dragDD.offsetX){dc.accDD.dragDD.deltaX=dc.accDD.dropDD.deltaX=dc.accDD.dragDD.originalX-dc.accDD.dragDD.offsetX}else{if(dc.accDD.dragDD.originalX>=dc.accDD.dragDD.offsetX){dc.accDD.dragDD.deltaX=dc.accDD.dropDD.deltaX=0-(dc.accDD.dragDD.offsetX-dc.accDD.dragDD.originalX)}}var rft=dc.accDD.returnFocusTo;dc.onDropStart.apply(that,[ev,dc.accDD.dropDD,dc]);dc.onDrop.apply(that,[ev,dc.accDD.dropDD,dc]);dc.onDropEnd.apply(that,[ev,dc.accDD.dropDD,dc]);dc.onDragEnd.apply(dc.accDD.dragDD.drag,[ev,dc.accDD.dragDD,dc]);$A.setFocus((rft.nodeType===1?rft:pL(rft).get(0))||dc.accDCObj);dc.accDD.isDragging=false;setAttr(dc.accDCObj,"aria-grabbed","false")}})}},tabOut:function(ev,dc){},timeoutVal:0,timeout:function(dc){},className:"",closeClassName:"accDCCloseCls",cssObj:{},importCSS:"",css:function(prop,val,mergeCSS,dc){var dc=dc||this;if(typeof prop==="string"&&val){if(mergeCSS){dc.cssObj[prop]=val}css(dc.accDCObj,prop,val);return dc}else{if(prop&&typeof prop==="object"){if(val&&typeof val==="boolean"){pL.extend(dc.cssObj,prop)}css(dc.accDCObj,prop);return dc}else{if(prop&&typeof prop==="string"){return css(dc.accDCObj,prop)}}}},children:[],parent:null,autoPosition:0,offsetTop:0,offsetLeft:0,offsetParent:null,posAnchor:null,setPosition:function(obj,posVal,save,dc){if(typeof obj==="number"){dc=save;save=posVal;posVal=obj}var dc=dc||this;if(save){dc.posAnchor=obj||dc.posAnchor;dc.autoPosition=posVal||dc.autoPosition}calcPosition(dc,obj,posVal);return dc},applyFix:function(val,dc){var dc=dc||this;if(val){dc.autoFix=val}setAutoFix(dc);if(dc.autoFix>0){sizeAutoFix(dc)}return dc},shadow:{horizontal:"0px",vertical:"0px",blur:"0px",color:""},setShadow:function(dc,shadow){if(arguments.length===1&&!("id" in dc)){shadow=dc;dc=this}if(shadow){pL.extend(dc.shadow,shadow)}return setShadow(dc)},AccDCInit:function(){return this}},aO=accDCObjects[a],gImport=gImport||{},gO={},iO={};if(aO.mode==6){var ajaxOptions=dc.ajaxOptions}if(typeof aO.allowCascade!=="boolean"){aO.allowCascade=gImport.allowCascade}if(typeof aO.allowCascade!=="boolean"){aO.allowCascade=$A.fn.globalDC.allowCascade||dc.allowCascade}if(aO.allowCascade){for(var s=0;s<svs.length;s++){gO[svs[s]]=$A.fn.globalDC[svs[s]];iO[svs[s]]=gImport[svs[s]]}}if(!pL.isEmptyObject($A.fn.globalDC)){pL.extend(true,dc,$A.fn.globalDC)}if(!pL.isEmptyObject(gImport)){pL.extend(true,dc,gImport)}pL.extend(true,dc,aO);if(aO.mode==6&&ajaxOptions){pL.extend(dc.ajaxOptions,ajaxOptions)}if(dc.allowCascade){for(var s=0;s<svs.length;s++){$A.fn.globalDC[svs[s]]=gO[svs[s]]}dc.fn.proto=iO}if(dc.id&&dc.role){ids.push(dc.id);if(dc.autoStart){autoStart.push(dc.id)}dc.indexVal=wheel.length;wheel[dc.indexVal]=AccDCInit(dc);if(parentDC){var chk=-1,p=$A.reg[parentDC.id],c=$A.reg[wheel[dc.indexVal].id];for(var i=0;i<p.children.length;i++){if(c.id===p.children[i].id){chk=i}}if(chk>=0){p.children.slice(chk,1,c)}else{p.children.push(c)}c.parent=p;var t=c;while(t.parent){t=t.parent}c.top=t}else{wheel[dc.indexVal].top=wheel[dc.indexVal]}}else{if($A.fn.debug){alert("Error: To ensure both proper functionality and accessibility, every AccDC Dynamic Content Object must have a unique ID and an informative ROLE. View the Setup and Automatic Accessibility Framework sections in the WhatSock.com Core API documentation for additional details.")}}}for(var a=0;a<wheel.length;a++){wheel[a].siblings=wheel}for(var s=0;s<autoStart.length;s++){var dc=$A.reg[autoStart[s]];var t=pL(dc.trigger).get(0);dc.triggerObj=t?t:null;dc.open()}};if(window.InitAccDC&&window.InitAccDC.length){pL.ajaxSetup({async:false});for(var i=0;i<window.InitAccDC.length;i++){$A.getScript(window.InitAccDC[i])}pL.ajaxSetup({async:true})}})($);


/*
ARIA Calendar Module R1.14
Copyright 2010-2016 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/
(function(){$A.setCalendar=function(i,c,k,l,n,d){var d=d||{},h=n&&typeof n==="function"?n:function(p,o){k.value=o.range.wDays[o.range.current.wDay].lng+" "+o.range[o.range.current.month].name+" "+o.range.current.mDay+", "+o.range.current.year;o.close()},m={alt:true,ctrl:false,shift:false},f={},e=function(o){f.alt=o.altKey;f.ctrl=o.ctrlKey;f.shift=o.shiftKey};$A([{id:i,role:d.role||"Calendar",trigger:c,bind:"opendatepicker",allowReopen:true,showHiddenClose:l&&d.editor&&d.editor.show?false:true,controlType:"DatePicker",tooltipTxt:d.tooltipTxt||"Press Escape to cancel",disabledTxt:d.disabledTxt||"Disabled",commentedTxt:d.commentedTxt||"Has Comment",prevTxt:d.prevTxt||"Previous",nextTxt:d.nextTxt||"Next",monthTxt:d.monthTxt||"Month",yearTxt:d.yearTxt||"Year",autoPosition:isNaN(d.autoPosition)?9:d.autoPosition,offsetTop:isNaN(d.offsetTop)?0:d.offsetTop,offsetLeft:isNaN(d.offsetLeft)?0:d.offsetLeft,posAnchor:d.posAnchor,targetObj:d.targetObj,cssObj:d.cssObj||{position:"absolute",zIndex:1},className:d.className||"calendar",range:{0:{name:d.months&&d.months[0]?d.months[0]:"January",max:31,disabled:{},comments:{}},1:{name:d.months&&d.months[1]?d.months[1]:"February",max:28,disabled:{},comments:{}},2:{name:d.months&&d.months[2]?d.months[2]:"March",max:31,disabled:{},comments:{}},3:{name:d.months&&d.months[3]?d.months[3]:"April",max:30,disabled:{},comments:{}},4:{name:d.months&&d.months[4]?d.months[4]:"May",max:31,disabled:{},comments:{}},5:{name:d.months&&d.months[5]?d.months[5]:"June",max:30,disabled:{},comments:{}},6:{name:d.months&&d.months[6]?d.months[6]:"July",max:31,disabled:{},comments:{}},7:{name:d.months&&d.months[7]?d.months[7]:"August",max:31,disabled:{},comments:{}},8:{name:d.months&&d.months[8]?d.months[8]:"September",max:30,disabled:{},comments:{}},9:{name:d.months&&d.months[9]?d.months[9]:"October",max:31,disabled:{},comments:{}},10:{name:d.months&&d.months[10]?d.months[10]:"November",max:30,disabled:{},comments:{}},11:{name:d.months&&d.months[11]?d.months[11]:"December",max:31,disabled:{},comments:{}},wDays:[{shrt:d.days&&d.days[0]?d.days[0].s:"S",lng:d.days&&d.days[0]?d.days[0].l:"Sunday"},{shrt:d.days&&d.days[1]?d.days[1].s:"M",lng:d.days&&d.days[1]?d.days[1].l:"Monday"},{shrt:d.days&&d.days[2]?d.days[2].s:"T",lng:d.days&&d.days[2]?d.days[2].l:"Tuesday"},{shrt:d.days&&d.days[3]?d.days[3].s:"W",lng:d.days&&d.days[3]?d.days[3].l:"Wednesday"},{shrt:d.days&&d.days[4]?d.days[4].s:"T",lng:d.days&&d.days[4]?d.days[4].l:"Thursday"},{shrt:d.days&&d.days[5]?d.days[5].s:"F",lng:d.days&&d.days[5]?d.days[5].l:"Friday"},{shrt:d.days&&d.days[6]?d.days[6].s:"S",lng:d.days&&d.days[6]?d.days[6].l:"Saturday"}],wdOffset:isNaN(d.wdOffset)?0:d.wdOffset},getWDay:function(p,t,q){var t=typeof t==="number"?t:p.range.current.wDay,s=p.range.wdOffset;if(s<0){t=(t+s)<0?7+s:t+s}else{if(s>0){t=(t+s)>6?-1+((t+s)-6):t+s}}if(q){t=6-t}return t},setFocus:function(t,r,q){if(!t){return}this.current=t;$A.query("td.day.selected",this.containerDiv,function(o,s){$A.setAttr(s,{tabindex:"-1"});$A.remClass(s,"selected")});$A.addClass(t,"selected");$A.setAttr(t,{tabindex:"0"});if(!q){t.focus()}},setCurrent:function(o){o.range.current={mDay:o.date.getDate(),month:o.date.getMonth(),year:o.date.getFullYear(),wDay:o.date.getDay()}},runOnceBefore:function(o){o.date=new Date();o.setCurrent(o)},runBefore:function(E){if(d.ajax&&typeof d.ajax==="function"&&!E.stopAjax&&!E.ajaxLoading){E.ajaxLoading=E.cancel=true;d.ajax.apply(E,[E,false])}if(E.range.current.month===1){E.range[1].max=(new Date(E.range.current.year,1,29).getMonth()==1)?29:28}E.baseId="b"+$A.genId();E.prevBtnId=E.baseId+"p";E.nextBtnId=E.baseId+"n";E.source='<table role="application" class="calendar" aria-label="'+E.role+'"><tr role="presentation"><td class="nav" accesskey="1" title="'+E.prevTxt.replace(/<|>|\"/g,"")+" "+E.yearTxt.replace(/<|>|\"/g,"")+'" aria-label="'+E.prevTxt.replace(/<|>|\"/g,"")+" "+E.yearTxt.replace(/<|>|\"/g,"")+'" role="button" id="'+E.prevBtnId+'Y" tabindex="0"><span aria-hidden="true">&#8656;</span></td><td title="'+E.tooltipTxt.replace(/<|>|\"/g,"")+'" colspan="5" class="year" role="presentation"><span>'+E.range.current.year+'</span></td><td class="nav" accesskey="2" title="'+E.nextTxt.replace(/<|>|\"/g,"")+" "+E.yearTxt.replace(/<|>|\"/g,"")+'" aria-label="'+E.nextTxt.replace(/<|>|\"/g,"")+" "+E.yearTxt.replace(/<|>|\"/g,"")+'" role="button" id="'+E.nextBtnId+'Y" tabindex="0"><span aria-hidden="true">&#8658;</span></td></tr><tr role="presentation"><td class="nav" accesskey="3" title="'+E.prevTxt.replace(/<|>|\"/g,"")+" "+E.monthTxt.replace(/<|>|\"/g,"")+'" aria-label="'+E.prevTxt.replace(/<|>|\"/g,"")+" "+E.monthTxt.replace(/<|>|\"/g,"")+'" role="button" id="'+E.prevBtnId+'" tabindex="0"><span aria-hidden="true">&#8592;</span></td><td colspan="5" class="month" role="presentation"><span>'+E.range[E.range.current.month].name+'</span></td><td class="nav" accesskey="4" title="'+E.nextTxt.replace(/<|>|\"/g,"")+" "+E.monthTxt.replace(/<|>|\"/g,"")+'" aria-label="'+E.nextTxt.replace(/<|>|\"/g,"")+" "+E.monthTxt.replace(/<|>|\"/g,"")+'" role="button" id="'+E.nextBtnId+'" tabindex="0"><span aria-hidden="true">&#8594;</span></td></tr><tr role="presentation">';var C=E.range.current.month>0?E.range.current.month-1:11,o=E.range.current.month<11?E.range.current.month+1:0;E.iter=0;for(var s=0;s<7;s++){var B=E.getWDay(E,s),A=E.range.wDays[B];if(!s){E.iter=E.iterE=(B+6)>6?-1+B:B+6;E.iterS=B}E.source+='<th class="week" title="'+A.lng+'" role="presentation"><span>'+A.shrt+"</span></th>"}E.source+='</tr><tr role="presentation">';var q=new Date();q.setDate(1);q.setMonth(E.range.current.month);q.setFullYear(E.range.current.year);var x=q.getDay();q.setDate(E.range[E.range.current.month].max);var y=q.getDay(),D=E.iterS;while(D!=x){D=(D+1)>6?0:D+1;E.source+='<td class="empty" role="presentation"><span>&nbsp;</span></td>'}E.range.track={};var r=E.range[E.range.current.month].disabled[E.range.current.year],v=E.range[E.range.current.month].disabled["*"],u=E.range[E.range.current.month].comments[E.range.current.year],t=E.range[E.range.current.month].comments["*"];for(var s=1;s<=E.range[E.range.current.month].max;s++){E.range.track[E.baseId+s]=s;q.setDate(s);var p=(r&&$A.inArray(s,r)!==-1)||(v&&$A.inArray(s,v)!==-1)?true:false,z="";if(u&&u[s]){z=u[s]}else{if(t&&t[s]){z=t[s]}}E.source+="<td ";if(p){E.source+='aria-disabled="true" '}E.source+='aria-label="';if(z){E.source+=E.commentedTxt.replace(/<|>|\"/g,"")+" "}E.source+=s+", "+E.range.wDays[q.getDay()].lng+" "+E.range[E.range.current.month].name+" "+E.range.current.year;if(z){E.source+=z.replace(/<|>|\n/g," ").replace(/\"/g,'"')}E.source+='" role="link" tabindex="-1" class="day';if(p){E.source+=" disabled"}if(z){E.source+=" comment"}E.source+='" title="';if(p){E.source+=E.disabledTxt.replace(/<|>|\"/g,"")}if(z){E.source+=" "+E.commentedTxt.replace(/<|>|\"/g,"")}E.source+='" id="'+E.baseId+s+'"><span aria-hidden="true">'+s+"</span></td>";q.setDate(s);var D=q.getDay();if(D==E.iter&&s<E.range[E.range.current.month].max){E.source+='</tr><tr role="presentation">'}}while(y!=E.iter){y=(y+1)>6?0:y+1;E.source+='<td class="empty" role="presentation"><span>&nbsp;</span></td>'}E.source+="</tr></table>";$A.find("*",function(w){if(w.controlType&&w.controlType=="DatePicker"&&w.loaded){w.close()}})},click:function(p,o){p.stopPropagation()},runDuring:function(o){o.datepickerLoaded=false;$A.bind("body","click.datepicker",function(p){if(o.datepickerLoaded){o.close()}});$A.setAttr(o.accDCObj,{role:"dialog","aria-label":o.role});o.fn.sraStart.innerHTML=o.fn.sraEnd.innerHTML="";$A.setAttr(o.fn.sraStart,{"aria-hidden":"true"});$A.setAttr(o.fn.sraEnd,{"aria-hidden":"true"})},runAfter:function(o){var r=function(){var v=o.range.current.month==11?0:o.range.current.month+1,u=v>0?o.range.current.year:o.range.current.year+1,t=o.range.current.mDay>o.range[v].max?o.range[v].max:o.range.current.mDay;o.date=new Date(u,v,t);o.setCurrent(o);o.reopen=true;o.open()},p=function(){var v=o.range.current.month<1?11:o.range.current.month-1,u=v<11?o.range.current.year:o.range.current.year-1,t=o.range.current.mDay>o.range[v].max?o.range[v].max:o.range.current.mDay;o.date=new Date(u,v,t);o.setCurrent(o);o.reopen=true;o.open()},q=function(u){var w=o.range.current.month,v=u?o.range.current.year+1:o.range.current.year-1;if(w===1){o.range[1].max=28}var t=o.range.current.mDay>o.range[w].max?o.range[w].max:o.range.current.mDay;o.date=new Date(v,w,t);o.setCurrent(o);o.reopen=true;o.open()};var s=false;$A.bind("#"+o.containerDivId+" td.day",{focus:function(w){if($A.hasClass(this,"comment")){var x=o.children[0],v=o.range[o.range.current.month].comments[o.range.current.year],u=o.range[o.range.current.month].comments["*"],t="";if(v&&v[o.range.current.mDay]){t=v[o.range.current.mDay]}else{if(u&&u[o.range.current.mDay]){t=u[o.range.current.mDay]}}t=a(t.replace(/<|>/g,""));if(t){x.source=t;x.open()}}else{if(o.children[0].loaded){o.children[0].close()}}if(o.children[1].openEditor){o.children[1].openEditor=false;o.children[1].reset()}},click:function(t){o.date.setDate(o.range.track[this.id]);o.setCurrent(o);if($A.hasClass(this,"selected")||(!l&&!$A.hasClass(this,"comment"))){if($A.inArray(o.range.current.mDay,o.range[o.range.current.month].disabled[o.range.current.year]||o.range[o.range.current.month].disabled["*"]||[])===-1){h.apply(this,[t,o,k])}else{t.stopPropagation();t.preventDefault()}}else{o.setFocus(this)}t.preventDefault()},keydown:function(x){e(x);var u=x.which||x.keyCode;if(u==13){s=true;if($A.inArray(o.range.current.mDay,o.range[o.range.current.month].disabled[o.range.current.year]||o.range[o.range.current.month].disabled["*"]||[])===-1){h.apply(this,[x,o,k])}x.preventDefault()}else{if(u==32&&l&&d.editor&&d.editor.show&&!o.children[1].openEditor){o.children[1].openEditor=true;o.children[1].reset();x.preventDefault()}}if((u>=37&&u<=40)||u==27||(u>=33&&u<=36)){var w=o.range.current.wDay;if(u==37){if(w!=o.iterS&&o.range.current.mDay>1){o.range.current.mDay--;o.range.current.wDay=(w-1)<0?6:w-1;o.setFocus(o.range.index[o.range.current.mDay-1],this)}else{if(w!=o.iterS&&o.range.current.mDay==1&&w>0){var y=o.range.current.month<1?11:o.range.current.month-1,v=y<11?o.range.current.year:o.range.current.year-1,t=o.range[y].max;if(y===1){t=(new Date(v,1,29).getMonth()==1)?29:28}o.date=new Date(v,y,t);o.setCurrent(o);o.reopen=true;o.open()}}}else{if(u==39){if(w!=o.iterE&&o.range.current.mDay<o.range[o.range.current.month].max){o.range.current.mDay++;o.range.current.wDay=(w+1)>6?0:w+1;o.setFocus(o.range.index[o.range.current.mDay-1],this)}else{if(w!=o.iterE&&o.range.current.mDay==o.range[o.range.current.month].max&&w<6){var y=o.range.current.month==11?0:o.range.current.month+1,v=y>0?o.range.current.year:o.range.current.year+1;o.date=new Date(v,y,1);o.setCurrent(o);o.reopen=true;o.open()}}}else{if(u==38){if((o.range.current.mDay-7)>0){o.range.current.mDay-=7;o.setFocus(o.range.index[o.range.current.mDay-1],this)}else{var y=o.range.current.month<1?11:o.range.current.month-1,v=y<11?o.range.current.year:o.range.current.year-1;if(y===1&&(new Date(v,1,29).getMonth()==1)){o.range[y].max=29}else{if(y===1){o.range[y].max=28}}var t=o.range[y].max+(o.range.current.mDay-7);o.date=new Date(v,y,t);o.setCurrent(o);o.reopen=true;o.open()}}else{if(u==40){if((o.range.current.mDay+7)<=o.range[o.range.current.month].max){o.range.current.mDay+=7;o.setFocus(o.range.index[o.range.current.mDay-1],this)}else{var y=o.range.current.month==11?0:o.range.current.month+1,v=y>0?o.range.current.year:o.range.current.year+1,t=o.range.current.mDay+7-o.range[o.range.current.month].max;o.date=new Date(v,y,t);o.setCurrent(o);o.reopen=true;o.open()}}else{if(u==27){o.close()}else{if(u==33){if(f.alt){q(true)}else{r()}}else{if(u==34){if(f.alt){q()}else{p()}}else{if(u==36){if(w!=o.iterS&&o.range.current.mDay>1){while(o.range.current.wDay!=o.iterS&&$A.getEl(o.baseId+(o.range.current.mDay-1))){o.range.current.wDay=(o.range.current.wDay-1)<0?6:o.range.current.wDay-1;o.range.current.mDay--}o.setFocus(o.range.index[o.range.current.mDay-1],this)}}else{if(u==35){if(w!=o.iterE&&o.range.current.mDay<o.range[o.range.current.month].max){while(o.range.current.wDay!=o.iterE&&$A.getEl(o.baseId+(o.range.current.mDay+1))){o.range.current.wDay=(o.range.current.wDay+1)>6?0:o.range.current.wDay+1;o.range.current.mDay++}o.setFocus(o.range.index[o.range.current.mDay-1],this)}}}}}}}}}}x.preventDefault()}},keyup:function(u){e(u);var t=u.which||u.keyCode;if(t==13&&!s){if($A.inArray(o.range.current.mDay,o.range[o.range.current.month].disabled[o.range.current.year]||o.range[o.range.current.month].disabled["*"]||[])===-1){if(!o.setFocus.firstOpen){h.apply(this,[u,o,k])}}u.preventDefault()}s=o.setFocus.firstOpen=false}});$A.bind("#"+o.prevBtnId,{click:function(t){p();t.preventDefault()},keydown:function(u){e(u);var t=u.which||u.keyCode;if(t==13||t==32){p();u.preventDefault()}if(t==27){o.close();u.preventDefault()}},keyup:function(t){e(t)}});$A.bind("#"+o.nextBtnId,{click:function(t){r();t.preventDefault()},keydown:function(u){e(u);var t=u.which||u.keyCode;if(t==13||t==32){r();u.preventDefault()}if(t==27){o.close();u.preventDefault()}},keyup:function(t){e(t)}});$A.bind("#"+o.prevBtnId+"Y",{click:function(t){q();t.preventDefault()},keydown:function(u){e(u);var t=u.which||u.keyCode;if(t==13||t==32){q();u.preventDefault()}if(t==27){o.close();u.preventDefault()}},keyup:function(t){e(t)}});$A.bind("#"+o.nextBtnId+"Y",{click:function(t){q(true);t.preventDefault()},keydown:function(u){e(u);var t=u.which||u.keyCode;if(t==13||t==32){q(true);u.preventDefault()}if(t==27){o.close();u.preventDefault()}},keyup:function(t){e(t)}});o.range.index=$A.query("td.day",o.containerDiv);o.setFocus.firstOpen=true;o.setFocus(o.range.index[o.range.current.mDay-1]);if(l&&d.editor&&d.editor.show){o.children[1].open()}$A.bind(window,"resize.datepicker",function(t){o.setPosition()});$A.setAttr(o.triggerObj,"aria-expanded","true");setTimeout(function(){o.datepickerLoaded=true},750)},tabOut:function(p,o){o.close()},runAfterClose:function(o){if(!o.reopen){if(d.resetCurrent){o.date=new Date();o.setCurrent(o)}if(l){o.children[0].close()}if(l&&d.editor&&d.editor.show){o.children[1].lock=false;o.children[1].close()}}else{o.reopen=false}if(d.ajax&&typeof d.ajax==="function"){o.lock=o.ajaxLoading=false}$A.unbind(window,".datepicker");$A.unbind("body",".datepicker");$A.setAttr(o.triggerObj,"aria-expanded","false")}}]);$A.setAttr(c,"aria-expanded","false");var b=$A.reg[i],g=false,j=function(){g=false};$A.bind(c,"click",function(o){if(!g&&!b.loaded){g=true;$A.trigger(this,"opendatepicker");setTimeout(j,1000)}else{if(!g&&b.loaded){g=true;b.close();setTimeout(j,1000)}}o.preventDefault()});$A($A.reg[i],[{id:i+"commentTooltip",role:d.comments&&d.comments.role||"Comment",returnFocus:false,showHiddenClose:false,allowReopen:true,autoPosition:isNaN(d.comments&&d.comments.autoPosition)?1:d.comments.autoPosition,offsetTop:isNaN(d.comments&&d.comments.offsetTop)?0:d.comments.offsetTop,offsetLeft:isNaN(d.comments&&d.comments.offsetLeft)?0:d.comments.offsetLeft,cssObj:{position:"absolute",zIndex:$A.reg[i].cssObj.zIndex},className:d.comments&&d.comments.className||"commentTooltip",runBefore:function(o){o.triggerObj=o.parent.accDCObj}}]);$A($A.reg[i],[{id:i+"commentAdd",role:d.editor&&d.editor.role||"Edit",returnFocus:false,allowReopen:true,autoPosition:isNaN(d.editor&&d.editor.autoPosition)?6:d.editor.autoPosition,offsetTop:isNaN(d.editor&&d.editor.offsetTop)?0:d.editor.offsetTop,offsetLeft:isNaN(d.editor&&d.editor.offsetLeft)?0:d.editor.offsetLeft,cssObj:{position:"absolute",zIndex:$A.reg[i].cssObj.zIndex},className:d.editor&&d.editor.className||"commentAdd",openEditor:false,source:'<textarea style="visibility: hidden; display: none;" class="commentTa" title="'+$A.reg[i+"commentTooltip"].role+'"></textarea><button title="'+(d.editor&&d.editor.role||"Edit")+" "+$A.reg[i+"commentTooltip"].role+'" class="commentBtn">'+(d.editor&&d.editor.role||"Edit")+"</button>",runBefore:function(o){o.triggerObj=o.parent.accDCObj},click:function(p,o){p.stopPropagation()},runDuring:function(o){$A.setAttr(o.accDCObj,{role:"dialog","aria-label":o.role});$A.setAttr(o.containerDiv,"role","application");o.fn.sraStart.innerHTML=o.fn.sraEnd.innerHTML="";$A.setAttr(o.fn.sraStart,{"aria-hidden":"true"});$A.setAttr(o.fn.sraEnd,{"aria-hidden":"true"})},add:function(o){var p=a(o.textarea.value.replace(/<|>|\n/g," "));if(!o.comments[o.parent.range.current.year]){o.comments[o.parent.range.current.year]={}}o.comments[o.parent.range.current.year][o.parent.range.current.mDay]=p;var q=o.parent.range.current.mDay+", "+o.parent.range.wDays[o.parent.range.current.wDay].lng+" "+o.parent.range[o.parent.range.current.month].name+" "+o.parent.range.current.year,r="";if((o.parent.range[o.parent.range.current.month].disabled[o.parent.range.current.year]&&$A.inArray(o.parent.range.current.mDay,o.parent.range[o.parent.range.current.month].disabled[o.parent.range.current.year])!==-1)||(o.parent.range[o.parent.range.current.month].disabled["*"]&&$A.inArray(o.parent.range.current.mDay,o.parent.range[o.parent.range.current.month].disabled["*"])!==-1)){r+=o.parent.disabledTxt.replace(/<|>|\"/g,"")+" "}if(!p){$A.remClass(o.parent.current,"comment")}else{$A.addClass(o.parent.current,"comment");r+=o.parent.commentedTxt.replace(/<|>|\"/g,"")+" "}q=r+q;$A.setAttr(o.parent.current,{title:a(r),"aria-label":q+" "+p.replace(/\"/g,'"')})},reset:function(){var o=this;if(o.openEditor){o.comments=o.parent.range[o.parent.range.current.month].comments;if(!o.textarea){o.textarea=$A.query("textarea",o.containerDiv,function(){$A.css(this,{visibility:"",display:""});o.css("left",o.parent.accDCObj.offsetLeft);$A.bind(this,{focus:function(p){if(o.parent.children[0].loaded){o.parent.children[0].close()}},keydown:function(q){var p=q.which||q.keyCode;if(this.value.length>800){this.value=this.value.substring(0,799)}if(p==13){o.add.apply(this,[o]);o.parent.current.focus();o.openEditor=false;o.reset();q.preventDefault()}else{if(p==27){o.parent.current.focus();o.openEditor=false;o.reset();q.preventDefault()}}}})})[0]}else{$A.css(o.textarea,{visibility:"",display:""});o.css("left",o.parent.accDCObj.offsetLeft)}$A.setAttr(o.textarea,{title:o.parent.range.current.mDay+", "+o.parent.range.wDays[o.parent.range.current.wDay].lng+" "+o.parent.range[o.parent.range.current.month].name+" "+o.parent.range.current.year}).focus();if(o.comments[o.parent.range.current.year]&&o.comments[o.parent.range.current.year][o.parent.range.current.mDay]){o.textarea.value=o.comments[o.parent.range.current.year][o.parent.range.current.mDay]}$A.setAttr(o.commentBtn,{title:(d.editor&&d.editor.action1||"Save")+" "+$A.reg[i+"commentTooltip"].role}).innerHTML=d.editor&&d.editor.action1||"Save"}else{if(o.textarea){o.textarea.value="";$A.css(o.textarea,{visibility:"hidden",display:"none"})}o.css("left",o.parent.accDCObj.offsetLeft+o.parent.accDCObj.offsetWidth-o.accDCObj.offsetWidth);$A.setAttr(o.commentBtn,{title:(d.editor&&d.editor.role||"Edit")+" "+$A.reg[i+"commentTooltip"].role}).innerHTML=d.editor&&d.editor.role||"Edit"}},runAfter:function(o){$A.query("button",o.containerDiv,function(){o.commentBtn=this;$A.bind(this,{focus:function(p){if(o.parent.children[0].loaded){o.parent.children[0].close()}},click:function(p){if(o.openEditor){o.add.apply(this,[o]);o.parent.current.focus();o.openEditor=false;o.reset()}else{o.openEditor=true;o.reset()}p.preventDefault()},keydown:function(q){var p=q.which||q.keyCode;if(p==27){if(o.openEditor){o.parent.current.focus();o.openEditor=false;o.reset()}else{o.parent.close()}q.preventDefault()}}})});o.reset();o.lock=true;$A.bind(window,"resize.dateeditor",function(p){o.setPosition();o.reset()})},tabOut:function(p,o){o.parent.close()},runBeforeClose:function(o){o.openEditor=false;o.textarea=null;$A.unbind(window,"resize.dateeditor");if(d.ajax&&typeof d.ajax==="function"){d.ajax.apply(o.parent,[o.parent,true])}o.parent.setFocus.firstOpen=true},lock:l&&d.editor&&d.editor.show?false:true}])};var a=function(b){return b.replace(/^\s+|\s+$/g,"")}})();

/*
 * Edited by DNA so that only certain fields stretch
 *
 * Stretchy: Form element autosizing, the way it should be.
 * by Lea Verou http://lea.verou.me
 * MIT license
 */
(function() {

if (!self.Element) {
	return; // super old browser
}

if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || null;
}

if (!Element.prototype.matches) {
	return;
}

function $$(expr, con) {
	return expr instanceof Node || expr instanceof Window? [expr] :
		   [].slice.call(typeof expr == "string"? (con || document).querySelectorAll(expr) : expr || []);
}

var _ = self.Stretchy = {
	selectors: {
		base: '[data-stretch] textarea, [data-stretch] select:not([size]), [data-stretch] input:not([type]), [data-stretch] input[type="' + "text url email number tel".split(" ").join('"], [data-stretch] input[type="') + '"]',
		filter: "*"
	},

	// Script element this was included with, if any
	script: document.currentScript || $$("script").pop(),

	// Autosize one element. The core of Stretchy.
	resize: function(element) {
		if (!_.resizes(element)) {
			return;
		}

		var cs = getComputedStyle(element);
		var offset = 0;

		if (!element.value && element.placeholder) {
			var empty = true;
			element.value = element.placeholder;
		}

		var type = element.nodeName.toLowerCase();

		if (type == "textarea") {
			element.style.height = "0";

			if (cs.boxSizing == "border-box") {
				offset = element.offsetHeight;
			}
			else if (cs.boxSizing == "content-box") {
				offset = -element.clientHeight;
			}

			element.style.height = element.scrollHeight + offset + "px";
		}
		else if(type == "input") {
			element.style.width = "0";

			if (cs.boxSizing == "border-box") {
				offset = element.offsetWidth;
			}
			else if (cs.boxSizing == "padding-box") {
				offset = element.clientWidth;
			}

			// Safari misreports scrollWidth, so we will instead set scrollLeft to a
			// huge number, and read that back to see what it was clipped to
			element.scrollLeft = 1e+10;

			var width = Math.max(element.scrollLeft + offset, element.scrollWidth - element.clientWidth) + 35;

			if(empty){
				width = element.placeholder.length * 25;
			}

			element.style.width = width + "px";
		}
		else if (type == "select") {
			// Need to use dummy element to measure :(
			if(element.options[element.selectedIndex] === undefined) {
				return;
			}
			var option = document.createElement("_");
			option.textContent = element.options[element.selectedIndex].textContent;
			element.parentNode.insertBefore(option, element.nextSibling);

			// The name of the appearance property, as it might be prefixed
			var appearance;

			for (var property in cs) {
				if (!/^(width|webkitLogicalWidth)$/.test(property)) {
					//console.log(property, option.offsetWidth, cs[property]);
					option.style[property] = cs[property];

					if (/appearance$/i.test(property)) {
						appearance = property;
					}
				}
			}

			option.style.width = "";

			if (option.offsetWidth > 0) {
				element.style.width = option.offsetWidth + "px";

				if (!cs[appearance] || cs[appearance] !== "none") {
					// Account for arrow
					element.style.width = "calc(" + element.style.width + " + 2em)";
				}
			}

			option.parentNode.removeChild(option);
			option = null;
		}

		if (empty) {
			element.value = "";
		}
	},

	// Autosize multiple elements
	resizeAll: function(elements) {
		$$(elements || _.selectors.base).forEach(function (element) {
			_.resize(element);
		});
	},

	active: true,

	// Will stretchy do anything for this element?
	resizes: function(element) {
		return element &&
			   element.parentNode &&
			   element.matches &&
			   element.matches(_.selectors.base) &&
			   element.matches(_.selectors.filter);
	},

	init: function(){
		_.selectors.filter = _.script.getAttribute("data-filter") ||
							 ($$("[data-stretchy-filter]").pop() || document.body).getAttribute("data-stretchy-filter") || "*";

		_.resizeAll();
	},

	$$: $$
};

// Autosize all elements once the DOM is loaded

// DOM already loaded?
if (document.readyState !== "loading") {
	_.init();
}
else {
	// Wait for it
	document.addEventListener("DOMContentLoaded", _.init);
}

// Listen for changes
var listener = function(evt) {
	if (_.active) {
		_.resize(evt.target);
	}
};

document.body.addEventListener("input", listener);

// Firefox fires a change event instead of an input event
document.body.addEventListener("change", listener);

// Listen for new elements
if (self.MutationObserver) {
	(new MutationObserver(function(mutations) {
		if (_.active) {
			mutations.forEach(function(mutation) {
				if (mutation.type == "childList") {
					Stretchy.resizeAll(mutation.addedNodes);
				}
			});
		}
	})).observe(document.body, {
		childList: true,
		subtree: true
	});
}

})();

/*!
* Parsley.js
* Version 2.2.0-rc4 - built Thu, Oct 29th 2015, 4:25 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/

// The source code below is generated by babel as
// Parsley is written in ECMAScript 6
//
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : global.parsley = factory(global.jQuery);
})(this, function ($) {
  'use strict';

  var globalID = 1;
  var pastWarnings = {};

  var ParsleyUtils__ParsleyUtils = {
	// Parsley DOM-API
	// returns object from dom attributes and values
	attr: function attr($element, namespace, obj) {
	  var i;
	  var attribute;
	  var attributes;
	  var regex = new RegExp('^' + namespace, 'i');

	  if ('undefined' === typeof obj) obj = {};else {
		// Clear all own properties. This won't affect prototype's values
		for (i in obj) {
		  if (obj.hasOwnProperty(i)) delete obj[i];
		}
	  }

	  if ('undefined' === typeof $element || 'undefined' === typeof $element[0]) return obj;

	  attributes = $element[0].attributes;
	  for (i = attributes.length; i--;) {
		attribute = attributes[i];

		if (attribute && attribute.specified && regex.test(attribute.name)) {
		  obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
		}
	  }

	  return obj;
	},

	checkAttr: function checkAttr($element, namespace, _checkAttr) {
	  return $element.is('[' + namespace + _checkAttr + ']');
	},

	setAttr: function setAttr($element, namespace, attr, value) {
	  $element[0].setAttribute(this.dasherize(namespace + attr), String(value));
	},

	generateID: function generateID() {
	  return '' + globalID++;
	},

	/** Third party functions **/
	// Zepto deserialize function
	deserializeValue: function deserializeValue(value) {
	  var num;

	  try {
		return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
	  } catch (e) {
		return value;
	  }
	},

	// Zepto camelize function
	camelize: function camelize(str) {
	  return str.replace(/-+(.)?/g, function (match, chr) {
		return chr ? chr.toUpperCase() : '';
	  });
	},

	// Zepto dasherize function
	dasherize: function dasherize(str) {
	  return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	},

	warn: function warn() {
	  if (window.console && 'function' === typeof window.console.warn) window.console.warn.apply(window.console, arguments);
	},

	warnOnce: function warnOnce(msg) {
	  if (!pastWarnings[msg]) {
		pastWarnings[msg] = true;
		this.warn.apply(this, arguments);
	  }
	},

	_resetWarnings: function _resetWarnings() {
	  pastWarnings = {};
	},

	trimString: function trimString(string) {
	  return string.replace(/^\s+|\s+$/g, '');
	},

	// Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
	objectCreate: Object.create || (function () {
	  var Object = function Object() {};
	  return function (prototype) {
		if (arguments.length > 1) {
		  throw Error('Second argument not supported');
		}
		if (typeof prototype != 'object') {
		  throw TypeError('Argument must be an object');
		}
		Object.prototype = prototype;
		var result = new Object();
		Object.prototype = null;
		return result;
	  };
	})()
  };

  var ParsleyUtils__default = ParsleyUtils__ParsleyUtils;

  // All these options could be overriden and specified directly in DOM using
  // `data-parsley-` default DOM-API
  // eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
  // eg: `data-parsley-stop-on-first-failing-constraint="false"`

  var ParsleyDefaults = {
	// ### General

	// Default data-namespace for DOM API
	namespace: 'data-parsley-',

	// Supported inputs by default
	inputs: 'input, textarea, select',

	// Excluded inputs by default
	excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',

	// Stop validating field on highest priority failing constraint
	priorityEnabled: true,

	// ### Field only

	// identifier used to group together inputs (e.g. radio buttons...)
	multiple: null,

	// identifier (or array of identifiers) used to validate only a select group of inputs
	group: null,

	// ### UI
	// Enable\Disable error messages
	uiEnabled: true,

	// Key events threshold before validation
	validationThreshold: 3,

	// Focused field on form validation error. 'first'|'last'|'none'
	focus: 'first',

	// `$.Event()` that will trigger validation. eg: `keyup`, `change`...
	trigger: false,

	// Class that would be added on every failing validation Parsley field
	errorClass: 'parsley-error',

	// Same for success validation
	successClass: 'parsley-success',

	// Return the `$element` that will receive these above success or error classes
	// Could also be (and given directly from DOM) a valid selector like `'#div'`
	classHandler: function classHandler(ParsleyField) {},

	// Return the `$element` where errors will be appended
	// Could also be (and given directly from DOM) a valid selector like `'#div'`
	errorsContainer: function errorsContainer(ParsleyField) {},

	// ul elem that would receive errors' list
	errorsWrapper: '<ul class="parsley-errors-list"></ul>',

	// li elem that would receive error message
	errorTemplate: '<li></li>'
  };

  var ParsleyAbstract = function ParsleyAbstract() {};

  ParsleyAbstract.prototype = {
	asyncSupport: true, // Deprecated

	actualizeOptions: function actualizeOptions() {
	  ParsleyUtils__default.attr(this.$element, this.options.namespace, this.domOptions);
	  if (this.parent && this.parent.actualizeOptions) this.parent.actualizeOptions();
	  return this;
	},

	_resetOptions: function _resetOptions(initOptions) {
	  this.domOptions = ParsleyUtils__default.objectCreate(this.parent.options);
	  this.options = ParsleyUtils__default.objectCreate(this.domOptions);
	  // Shallow copy of ownProperties of initOptions:
	  for (var i in initOptions) {
		if (initOptions.hasOwnProperty(i)) this.options[i] = initOptions[i];
	  }
	  this.actualizeOptions();
	},

	_listeners: null,

	// Register a callback for the given event name.
	// Callback is called with context as the first argument and the `this`.
	// The context is the current parsley instance, or window.Parsley if global.
	// A return value of `false` will interrupt the calls
	on: function on(name, fn) {
	  this._listeners = this._listeners || {};
	  var queue = this._listeners[name] = this._listeners[name] || [];
	  queue.push(fn);

	  return this;
	},

	// Deprecated. Use `on` instead.
	subscribe: function subscribe(name, fn) {
	  $.listenTo(this, name.toLowerCase(), fn);
	},

	// Unregister a callback (or all if none is given) for the given event name
	off: function off(name, fn) {
	  var queue = this._listeners && this._listeners[name];
	  if (queue) {
		if (!fn) {
		  delete this._listeners[name];
		} else {
		  for (var i = queue.length; i--;) if (queue[i] === fn) queue.splice(i, 1);
		}
	  }
	  return this;
	},

	// Deprecated. Use `off`
	unsubscribe: function unsubscribe(name, fn) {
	  $.unsubscribeTo(this, name.toLowerCase());
	},

	// Trigger an event of the given name.
	// A return value of `false` interrupts the callback chain.
	// Returns false if execution was interrupted.
	trigger: function trigger(name, target, extraArg) {
	  target = target || this;
	  var queue = this._listeners && this._listeners[name];
	  var result;
	  var parentResult;
	  if (queue) {
		for (var i = queue.length; i--;) {
		  result = queue[i].call(target, target, extraArg);
		  if (result === false) return result;
		}
	  }
	  if (this.parent) {
		return this.parent.trigger(name, target, extraArg);
	  }
	  return true;
	},

	// Reset UI
	reset: function reset() {
	  // Field case: just emit a reset event for UI
	  if ('ParsleyForm' !== this.__class__) return this._trigger('reset');

	  // Form case: emit a reset event for each field
	  for (var i = 0; i < this.fields.length; i++) this.fields[i]._trigger('reset');

	  this._trigger('reset');
	},

	// Destroy Parsley instance (+ UI)
	destroy: function destroy() {
	  // Field case: emit destroy event to clean UI and then destroy stored instance
	  if ('ParsleyForm' !== this.__class__) {
		this.$element.removeData('Parsley');
		this.$element.removeData('ParsleyFieldMultiple');
		this._trigger('destroy');

		return;
	  }

	  // Form case: destroy all its fields and then destroy stored instance
	  for (var i = 0; i < this.fields.length; i++) this.fields[i].destroy();

	  this.$element.removeData('Parsley');
	  this._trigger('destroy');
	},

	asyncIsValid: function asyncIsValid() {
	  ParsleyUtils__default.warnOnce("asyncIsValid is deprecated; please use whenIsValid instead");
	  return this.whenValid.apply(this, arguments);
	},

	_findRelatedMultiple: function _findRelatedMultiple() {
	  return this.parent.$element.find('[' + this.options.namespace + 'multiple="' + this.options.multiple + '"]');
	}
  };

  var requirementConverters = {
	string: function string(_string) {
	  return _string;
	},
	integer: function integer(string) {
	  if (isNaN(string)) throw 'Requirement is not an integer: "' + string + '"';
	  return parseInt(string, 10);
	},
	number: function number(string) {
	  if (isNaN(string)) throw 'Requirement is not a number: "' + string + '"';
	  return parseFloat(string);
	},
	reference: function reference(string) {
	  // Unused for now
	  var result = $(string);
	  if (result.length === 0) throw 'No such reference: "' + string + '"';
	  return result;
	},
	boolean: function boolean(string) {
	  return string !== 'false';
	},
	object: function object(string) {
	  return ParsleyUtils__default.deserializeValue(string);
	},
	regexp: function regexp(_regexp) {
	  var flags = '';

	  // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
	  if (/^\/.*\/(?:[gimy]*)$/.test(_regexp)) {
		// Replace the regexp literal string with the first match group: ([gimy]*)
		// If no flag is present, this will be a blank string
		flags = _regexp.replace(/.*\/([gimy]*)$/, '$1');
		// Again, replace the regexp literal string with the first match group:
		// everything excluding the opening and closing slashes and the flags
		_regexp = _regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
	  } else {
		// Anchor regexp:
		_regexp = '^' + _regexp + '$';
	  }
	  return new RegExp(_regexp, flags);
	}
  };

  var convertArrayRequirement = function convertArrayRequirement(string, length) {
	var m = string.match(/^\s*\[(.*)\]\s*$/);
	if (!m) throw 'Requirement is not an array: "' + string + '"';
	var values = m[1].split(',').map(ParsleyUtils__default.trimString);
	if (values.length !== length) throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
	return values;
  };

  var convertRequirement = function convertRequirement(requirementType, string) {
	var converter = requirementConverters[requirementType || 'string'];
	if (!converter) throw 'Unknown requirement specification: "' + requirementType + '"';
	return converter(string);
  };

  var convertExtraOptionRequirement = function convertExtraOptionRequirement(requirementSpec, string, extraOptionReader) {
	var main = null;
	var extra = {};
	for (var key in requirementSpec) {
	  if (key) {
		var value = extraOptionReader(key);
		if ('string' === typeof value) value = convertRequirement(requirementSpec[key], value);
		extra[key] = value;
	  } else {
		main = convertRequirement(requirementSpec[key], string);
	  }
	}
	return [main, extra];
  };

  // A Validator needs to implement the methods `validate` and `parseRequirements`

  var ParsleyValidator = function ParsleyValidator(spec) {
	$.extend(true, this, spec);
  };

  ParsleyValidator.prototype = {
	// Returns `true` iff the given `value` is valid according the given requirements.
	validate: function validate(value, requirementFirstArg) {
	  if (this.fn) {
		// Legacy style validator

		if (arguments.length > 3) // If more args then value, requirement, instance...
		  requirementFirstArg = [].slice.call(arguments, 1, -1); // Skip first arg (value) and last (instance), combining the rest
		return this.fn.call(this, value, requirementFirstArg);
	  }

	  if ($.isArray(value)) {
		if (!this.validateMultiple) throw 'Validator `' + this.name + '` does not handle multiple values';
		return this.validateMultiple.apply(this, arguments);
	  } else {
		if (this.validateNumber) {
		  if (isNaN(value)) return false;
		  arguments[0] = parseFloat(arguments[0]);
		  return this.validateNumber.apply(this, arguments);
		}
		if (this.validateString) {
		  return this.validateString.apply(this, arguments);
		}
		throw 'Validator `' + this.name + '` only handles multiple values';
	  }
	},

	// Parses `requirements` into an array of arguments,
	// according to `this.requirementType`
	parseRequirements: function parseRequirements(requirements, extraOptionReader) {
	  if ('string' !== typeof requirements) {
		// Assume requirement already parsed
		// but make sure we return an array
		return $.isArray(requirements) ? requirements : [requirements];
	  }
	  var type = this.requirementType;
	  if ($.isArray(type)) {
		var values = convertArrayRequirement(requirements, type.length);
		for (var i = 0; i < values.length; i++) values[i] = convertRequirement(type[i], values[i]);
		return values;
	  } else if ($.isPlainObject(type)) {
		return convertExtraOptionRequirement(type, requirements, extraOptionReader);
	  } else {
		return [convertRequirement(type, requirements)];
	  }
	},
	// Defaults:
	requirementType: 'string',

	priority: 2

  };

  var ParsleyValidatorRegistry = function ParsleyValidatorRegistry(validators, catalog) {
	this.__class__ = 'ParsleyValidatorRegistry';

	// Default Parsley locale is en
	this.locale = 'en';

	this.init(validators || {}, catalog || {});
  };

  var typeRegexes = {
	email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

	number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,

	integer: /^-?\d+$/,

	digits: /^\d+$/,

	alphanum: /^\w+$/i,

	url: new RegExp("^" +
	// protocol identifier
	"(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
	// user:pass authentication
	"(?:\\S+(?::\\S*)?@)?" + "(?:" +
	// IP address exclusion
	// private & local networks
	// "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
	// "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
	// "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
	// IP address dotted notation octets
	// excludes loopback network 0.0.0.0
	// excludes reserved space >= 224.0.0.0
	// excludes network & broacast addresses
	// (first & last IP address of each class)
	"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
	// host name
	'(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
	// domain name
	'(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
	// TLD identifier
	'(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' + ")" +
	// port number
	"(?::\\d{2,5})?" +
	// resource path
	"(?:/\\S*)?" + "$", 'i')
  };
  typeRegexes.range = typeRegexes.number;

  ParsleyValidatorRegistry.prototype = {
	init: function init(validators, catalog) {
	  this.catalog = catalog;
	  // Copy prototype's validators:
	  this.validators = $.extend({}, this.validators);

	  for (var name in validators) this.addValidator(name, validators[name].fn, validators[name].priority);

	  window.Parsley.trigger('parsley:validator:init');
	},

	// Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
	setLocale: function setLocale(locale) {
	  if ('undefined' === typeof this.catalog[locale]) throw new Error(locale + ' is not available in the catalog');

	  this.locale = locale;

	  return this;
	},

	// Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
	addCatalog: function addCatalog(locale, messages, set) {
	  if ('object' === typeof messages) this.catalog[locale] = messages;

	  if (true === set) return this.setLocale(locale);

	  return this;
	},

	// Add a specific message for a given constraint in a given locale
	addMessage: function addMessage(locale, name, message) {
	  if ('undefined' === typeof this.catalog[locale]) this.catalog[locale] = {};

	  this.catalog[locale][name] = message;

	  return this;
	},

	// Add messages for a given locale
	addMessages: function addMessages(locale, nameMessageObject) {
	  for (var name in nameMessageObject) this.addMessage(locale, name, nameMessageObject[name]);

	  return this;
	},

	// Add a new validator
	//
	//    addValidator('custom', {
	//        requirementType: ['integer', 'integer'],
	//        validateString: function(value, from, to) {},
	//        priority: 22,
	//        messages: {
	//          en: "Hey, that's no good",
	//          fr: "Aye aye, pas bon du tout",
	//        }
	//    })
	//
	// Old API was addValidator(name, function, priority)
	//
	addValidator: function addValidator(name, arg1, arg2) {
	  if (this.validators[name]) ParsleyUtils__default.warn('Validator "' + name + '" is already defined.');else if (ParsleyDefaults.hasOwnProperty(name)) {
		ParsleyUtils__default.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
		return;
	  }
	  return this._setValidator.apply(this, arguments);
	},

	updateValidator: function updateValidator(name, arg1, arg2) {
	  if (!this.validators[name]) {
		ParsleyUtils__default.warn('Validator "' + name + '" is not already defined.');
		return this.addValidator.apply(this, arguments);
	  }
	  return this._setValidator(this, arguments);
	},

	removeValidator: function removeValidator(name) {
	  if (!this.validators[name]) ParsleyUtils__default.warn('Validator "' + name + '" is not defined.');

	  delete this.validators[name];

	  return this;
	},

	_setValidator: function _setValidator(name, validator, priority) {
	  if ('object' !== typeof validator) {
		// Old style validator, with `fn` and `priority`
		validator = {
		  fn: validator,
		  priority: priority
		};
	  }
	  if (!validator.validate) {
		validator = new ParsleyValidator(validator);
	  }
	  this.validators[name] = validator;

	  for (var locale in validator.messages || {}) this.addMessage(locale, name, validator.messages[locale]);

	  return this;
	},

	getErrorMessage: function getErrorMessage(constraint) {
	  var message;

	  // Type constraints are a bit different, we have to match their requirements too to find right error message
	  if ('type' === constraint.name) {
		var typeMessages = this.catalog[this.locale][constraint.name] || {};
		message = typeMessages[constraint.requirements];
	  } else message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);

	  return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
	},

	// Kind of light `sprintf()` implementation
	formatMessage: function formatMessage(string, parameters) {
	  if ('object' === typeof parameters) {
		for (var i in parameters) string = this.formatMessage(string, parameters[i]);

		return string;
	  }

	  return 'string' === typeof string ? string.replace(new RegExp('%s', 'i'), parameters) : '';
	},

	// Here is the Parsley default validators list.
	// A validator is an object with the following key values:
	//  - priority: an integer
	//  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
	//  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
	// Alternatively, a validator can be a function that returns such an object
	//
	validators: {
	  notblank: {
		validateString: function validateString(value) {
		  return (/\S/.test(value)
		  );
		},
		priority: 2
	  },
	  required: {
		validateMultiple: function validateMultiple(values) {
		  return values.length > 0;
		},
		validateString: function validateString(value) {
		  return (/\S/.test(value)
		  );
		},
		priority: 512
	  },
	  type: {
		validateString: function validateString(value, type) {
		  var regex = typeRegexes[type];
		  if (!regex) throw new Error('validator type `' + type + '` is not supported');
		  return regex.test(value);
		},
		priority: 256
	  },
	  pattern: {
		validateString: function validateString(value, regexp) {
		  return regexp.test(value);
		},
		requirementType: 'regexp',
		priority: 64
	  },
	  minlength: {
		validateString: function validateString(value, requirement) {
		  return value.length >= requirement;
		},
		requirementType: 'integer',
		priority: 30
	  },
	  maxlength: {
		validateString: function validateString(value, requirement) {
		  return value.length <= requirement;
		},
		requirementType: 'integer',
		priority: 30
	  },
	  length: {
		validateString: function validateString(value, min, max) {
		  return value.length >= min && value.length <= max;
		},
		requirementType: ['integer', 'integer'],
		priority: 30
	  },
	  mincheck: {
		validateMultiple: function validateMultiple(values, requirement) {
		  return values.length >= requirement;
		},
		requirementType: 'integer',
		priority: 30
	  },
	  maxcheck: {
		validateMultiple: function validateMultiple(values, requirement) {
		  return values.length <= requirement;
		},
		requirementType: 'integer',
		priority: 30
	  },
	  check: {
		validateMultiple: function validateMultiple(values, min, max) {
		  return values.length >= min && values.length <= max;
		},
		requirementType: ['integer', 'integer'],
		priority: 30
	  },
	  min: {
		validateNumber: function validateNumber(value, requirement) {
		  return value >= requirement;
		},
		requirementType: 'number',
		priority: 30
	  },
	  max: {
		validateNumber: function validateNumber(value, requirement) {
		  return value <= requirement;
		},
		requirementType: 'number',
		priority: 30
	  },
	  range: {
		validateNumber: function validateNumber(value, min, max) {
		  return value >= min && value <= max;
		},
		requirementType: ['number', 'number'],
		priority: 30
	  },
	  equalto: {
		validateString: function validateString(value, refOrValue) {
		  var $reference = $(refOrValue);
		  if ($reference.length) return value === $reference.val();else return value === refOrValue;
		},
		priority: 256
	  }
	}
  };

  var ParsleyUI = function ParsleyUI(options) {
	this.__class__ = 'ParsleyUI';
  };

  ParsleyUI.prototype = {
	listen: function listen() {
	  var that = this;
	  window.Parsley.on('form:init', function () {
		that.setupForm(this);
	  }).on('field:init', function () {
		that.setupField(this);
	  }).on('field:validated', function () {
		that.reflow(this);
	  }).on('form:validated', function () {
		that.focus(this);
	  }).on('field:reset', function () {
		that.reset(this);
	  }).on('form:destroy', function () {
		that.destroy(this);
	  }).on('field:destroy', function () {
		that.destroy(this);
	  });

	  return this;
	},

	reflow: function reflow(fieldInstance) {
	  // If this field has not an active UI (case for multiples) don't bother doing something
	  if ('undefined' === typeof fieldInstance._ui || false === fieldInstance._ui.active) return;

	  // Diff between two validation results
	  var diff = this._diff(fieldInstance.validationResult, fieldInstance._ui.lastValidationResult);

	  // Then store current validation result for next reflow
	  fieldInstance._ui.lastValidationResult = fieldInstance.validationResult;

	  // Field have been validated at least once if here. Useful for binded key events...
	  fieldInstance._ui.validatedOnce = true;

	  // Handle valid / invalid / none field class
	  this.manageStatusClass(fieldInstance);

	  // Add, remove, updated errors messages
	  this.manageErrorsMessages(fieldInstance, diff);

	  // Triggers impl
	  this.actualizeTriggers(fieldInstance);

	  // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
	  if ((diff.kept.length || diff.added.length) && true !== fieldInstance._ui.failedOnce) this.manageFailingFieldTrigger(fieldInstance);
	},

	// Returns an array of field's error message(s)
	getErrorsMessages: function getErrorsMessages(fieldInstance) {
	  // No error message, field is valid
	  if (true === fieldInstance.validationResult) return [];

	  var messages = [];

	  for (var i = 0; i < fieldInstance.validationResult.length; i++) messages.push(fieldInstance.validationResult[i].errorMessage || this._getErrorMessage(fieldInstance, fieldInstance.validationResult[i].assert));

	  return messages;
	},

	manageStatusClass: function manageStatusClass(fieldInstance) {
	  if (fieldInstance.hasConstraints() && fieldInstance.needsValidation() && true === fieldInstance.validationResult) this._successClass(fieldInstance);else if (fieldInstance.validationResult.length > 0) this._errorClass(fieldInstance);else this._resetClass(fieldInstance);
	},

	manageErrorsMessages: function manageErrorsMessages(fieldInstance, diff) {
	  if ('undefined' !== typeof fieldInstance.options.errorsMessagesDisabled) return;

	  // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
	  if ('undefined' !== typeof fieldInstance.options.errorMessage) {
		if (diff.added.length || diff.kept.length) {
		  this._insertErrorWrapper(fieldInstance);

		  if (0 === fieldInstance._ui.$errorsWrapper.find('.parsley-custom-error-message').length) fieldInstance._ui.$errorsWrapper.append($(fieldInstance.options.errorTemplate).addClass('parsley-custom-error-message'));

		  return fieldInstance._ui.$errorsWrapper.addClass('filled').find('.parsley-custom-error-message').html(fieldInstance.options.errorMessage);
		}

		return fieldInstance._ui.$errorsWrapper.removeClass('filled').find('.parsley-custom-error-message').remove();
	  }

	  // Show, hide, update failing constraints messages
	  for (var i = 0; i < diff.removed.length; i++) this.removeError(fieldInstance, diff.removed[i].assert.name, true);

	  for (i = 0; i < diff.added.length; i++) this.addError(fieldInstance, diff.added[i].assert.name, diff.added[i].errorMessage, diff.added[i].assert, true);

	  for (i = 0; i < diff.kept.length; i++) this.updateError(fieldInstance, diff.kept[i].assert.name, diff.kept[i].errorMessage, diff.kept[i].assert, true);
	},

	// TODO: strange API here, intuitive for manual usage with addError(pslyInstance, 'foo', 'bar')
	// but a little bit complex for above internal usage, with forced undefined parameter...
	addError: function addError(fieldInstance, name, message, assert, doNotUpdateClass) {
	  this._insertErrorWrapper(fieldInstance);
	  fieldInstance._ui.$errorsWrapper.addClass('filled').append($(fieldInstance.options.errorTemplate).addClass('parsley-' + name).html(message || this._getErrorMessage(fieldInstance, assert)));

	  if (true !== doNotUpdateClass) this._errorClass(fieldInstance);
	},

	// Same as above
	updateError: function updateError(fieldInstance, name, message, assert, doNotUpdateClass) {
	  fieldInstance._ui.$errorsWrapper.addClass('filled').find('.parsley-' + name).html(message || this._getErrorMessage(fieldInstance, assert));

	  if (true !== doNotUpdateClass) this._errorClass(fieldInstance);
	},

	// Same as above twice
	removeError: function removeError(fieldInstance, name, doNotUpdateClass) {
	  fieldInstance._ui.$errorsWrapper.removeClass('filled').find('.parsley-' + name).remove();

	  // edge case possible here: remove a standard Parsley error that is still failing in fieldInstance.validationResult
	  // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
	  if (true !== doNotUpdateClass) this.manageStatusClass(fieldInstance);
	},

	focus: function focus(formInstance) {
	  formInstance._focusedField = null;

	  if (true === formInstance.validationResult || 'none' === formInstance.options.focus) return null;

	  for (var i = 0; i < formInstance.fields.length; i++) {
		var field = formInstance.fields[i];
		if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
		  formInstance._focusedField = field.$element;
		  if ('first' === formInstance.options.focus) break;
		}
	  }

	  if (null === formInstance._focusedField) return null;

	  return formInstance._focusedField.focus();
	},

	_getErrorMessage: function _getErrorMessage(fieldInstance, constraint) {
	  var customConstraintErrorMessage = constraint.name + 'Message';

	  if ('undefined' !== typeof fieldInstance.options[customConstraintErrorMessage]) return window.Parsley.formatMessage(fieldInstance.options[customConstraintErrorMessage], constraint.requirements);

	  return window.Parsley.getErrorMessage(constraint);
	},

	_diff: function _diff(newResult, oldResult, deep) {
	  var added = [];
	  var kept = [];

	  for (var i = 0; i < newResult.length; i++) {
		var found = false;

		for (var j = 0; j < oldResult.length; j++) if (newResult[i].assert.name === oldResult[j].assert.name) {
		  found = true;
		  break;
		}

		if (found) kept.push(newResult[i]);else added.push(newResult[i]);
	  }

	  return {
		kept: kept,
		added: added,
		removed: !deep ? this._diff(oldResult, newResult, true).added : []
	  };
	},

	setupForm: function setupForm(formInstance) {
	  formInstance.$element.on('submit.Parsley', false, $.proxy(formInstance.onSubmitValidate, formInstance));
	  formInstance.$element.on('click.Parsley', 'input[type="submit"], button[type="submit"]', $.proxy(formInstance.onSubmitButton, formInstance));

	  // UI could be disabled
	  if (false === formInstance.options.uiEnabled) return;

	  formInstance.$element.attr('novalidate', '');
	},

	setupField: function setupField(fieldInstance) {
	  var _ui = { active: false };

	  // UI could be disabled
	  if (false === fieldInstance.options.uiEnabled) return;

	  _ui.active = true;

	  // Give field its Parsley id in DOM
	  fieldInstance.$element.attr(fieldInstance.options.namespace + 'id', fieldInstance.__id__);

	  /** Generate important UI elements and store them in fieldInstance **/
	  // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
	  _ui.$errorClassHandler = this._manageClassHandler(fieldInstance);

	  // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
	  _ui.errorsWrapperId = 'parsley-id-' + (fieldInstance.options.multiple ? 'multiple-' + fieldInstance.options.multiple : fieldInstance.__id__);
	  _ui.$errorsWrapper = $(fieldInstance.options.errorsWrapper).attr('id', _ui.errorsWrapperId);

	  // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
	  _ui.lastValidationResult = [];
	  _ui.validatedOnce = false;
	  _ui.validationInformationVisible = false;

	  // Store it in fieldInstance for later
	  fieldInstance._ui = _ui;

	  // Bind triggers first time
	  this.actualizeTriggers(fieldInstance);
	},

	// Determine which element will have `parsley-error` and `parsley-success` classes
	_manageClassHandler: function _manageClassHandler(fieldInstance) {
	  // An element selector could be passed through DOM with `data-parsley-class-handler=#foo`
	  if ('string' === typeof fieldInstance.options.classHandler && $(fieldInstance.options.classHandler).length) return $(fieldInstance.options.classHandler);

	  // Class handled could also be determined by function given in Parsley options
	  var $handler = fieldInstance.options.classHandler(fieldInstance);

	  // If this function returned a valid existing DOM element, go for it
	  if ('undefined' !== typeof $handler && $handler.length) return $handler;

	  // Otherwise, if simple element (input, texatrea, select...) it will perfectly host the classes
	  if (!fieldInstance.options.multiple || fieldInstance.$element.is('select')) return fieldInstance.$element;

	  // But if multiple element (radio, checkbox), that would be their parent
	  return fieldInstance.$element.parent();
	},

	_insertErrorWrapper: function _insertErrorWrapper(fieldInstance) {
	  var $errorsContainer;

	  // Nothing to do if already inserted
	  if (0 !== fieldInstance._ui.$errorsWrapper.parent().length) return fieldInstance._ui.$errorsWrapper.parent();

	  if ('string' === typeof fieldInstance.options.errorsContainer) {
		if ($(fieldInstance.options.errorsContainer).length) return $(fieldInstance.options.errorsContainer).append(fieldInstance._ui.$errorsWrapper);else ParsleyUtils__default.warn('The errors container `' + fieldInstance.options.errorsContainer + '` does not exist in DOM');
	  } else if ('function' === typeof fieldInstance.options.errorsContainer) $errorsContainer = fieldInstance.options.errorsContainer(fieldInstance);

	  if ('undefined' !== typeof $errorsContainer && $errorsContainer.length) return $errorsContainer.append(fieldInstance._ui.$errorsWrapper);

	  var $from = fieldInstance.$element;
	  if (fieldInstance.options.multiple) $from = $from.parent();
	  return $from.after(fieldInstance._ui.$errorsWrapper);
	},

	actualizeTriggers: function actualizeTriggers(fieldInstance) {
	  var $toBind = fieldInstance.$element;
	  if (fieldInstance.options.multiple) $toBind = $('[' + fieldInstance.options.namespace + 'multiple="' + fieldInstance.options.multiple + '"]');

	  // Remove Parsley events already binded on this field
	  $toBind.off('.Parsley');

	  // If no trigger is set, all good
	  if (false === fieldInstance.options.trigger) return;

	  var triggers = fieldInstance.options.trigger.replace(/^\s+/g, '').replace(/\s+$/g, '');

	  if ('' === triggers) return;

	  // Bind fieldInstance.eventValidate if exists (for parsley.ajax for example), ParsleyUI.eventValidate otherwise
	  $toBind.on(triggers.split(' ').join('.Parsley ') + '.Parsley', $.proxy('function' === typeof fieldInstance.eventValidate ? fieldInstance.eventValidate : this.eventValidate, fieldInstance));
	},

	// Called through $.proxy with fieldInstance. `this` context is ParsleyField
	eventValidate: function eventValidate(event) {
	  // For keyup, keypress, keydown... events that could be a little bit obstrusive
	  // do not validate if val length < min threshold on first validation. Once field have been validated once and info
	  // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
	  if (new RegExp('key').test(event.type)) if (!this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold) return;

	  this._ui.validatedOnce = true;
	  this.validate();
	},

	manageFailingFieldTrigger: function manageFailingFieldTrigger(fieldInstance) {
	  fieldInstance._ui.failedOnce = true;

	  // Radio and checkboxes fields must bind every field multiple
	  if (fieldInstance.options.multiple) $('[' + fieldInstance.options.namespace + 'multiple="' + fieldInstance.options.multiple + '"]').each(function () {
		if (!new RegExp('change', 'i').test($(this).parsley().options.trigger || '')) return $(this).on('change.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));
	  });

	  // Select case
	  if (fieldInstance.$element.is('select')) if (!new RegExp('change', 'i').test(fieldInstance.options.trigger || '')) return fieldInstance.$element.on('change.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));

	  // All other inputs fields
	  if (!new RegExp('keyup', 'i').test(fieldInstance.options.trigger || '')) return fieldInstance.$element.on('keyup.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));
	},

	reset: function reset(parsleyInstance) {
	  // Reset all event listeners
	  this.actualizeTriggers(parsleyInstance);
	  parsleyInstance.$element.off('.ParsleyFailedOnce');

	  // Nothing to do if UI never initialized for this field
	  if ('undefined' === typeof parsleyInstance._ui) return;

	  if ('ParsleyForm' === parsleyInstance.__class__) return;

	  // Reset all errors' li
	  parsleyInstance._ui.$errorsWrapper.removeClass('filled').children().remove();

	  // Reset validation class
	  this._resetClass(parsleyInstance);

	  // Reset validation flags and last validation result
	  parsleyInstance._ui.validatedOnce = false;
	  parsleyInstance._ui.lastValidationResult = [];
	  parsleyInstance._ui.validationInformationVisible = false;
	  parsleyInstance._ui.failedOnce = false;
	},

	destroy: function destroy(parsleyInstance) {
	  this.reset(parsleyInstance);

	  if ('ParsleyForm' === parsleyInstance.__class__) return;

	  if ('undefined' !== typeof parsleyInstance._ui) parsleyInstance._ui.$errorsWrapper.remove();

	  delete parsleyInstance._ui;
	},

	_successClass: function _successClass(fieldInstance) {
	  fieldInstance._ui.validationInformationVisible = true;
	  fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.errorClass).addClass(fieldInstance.options.successClass);
	},
	_errorClass: function _errorClass(fieldInstance) {
	  fieldInstance._ui.validationInformationVisible = true;
	  fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.successClass).addClass(fieldInstance.options.errorClass);
	},
	_resetClass: function _resetClass(fieldInstance) {
	  fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.successClass).removeClass(fieldInstance.options.errorClass);
	}
  };

  var ParsleyForm = function ParsleyForm(element, domOptions, options) {
	this.__class__ = 'ParsleyForm';
	this.__id__ = ParsleyUtils__default.generateID();

	this.$element = $(element);
	this.domOptions = domOptions;
	this.options = options;
	this.parent = window.Parsley;

	this.fields = [];
	this.validationResult = null;
  };

  var ParsleyForm__statusMapping = { pending: null, resolved: true, rejected: false };

  ParsleyForm.prototype = {
	onSubmitValidate: function onSubmitValidate(event) {
	  var that = this;

	  // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
	  if (true === event.parsley) return;

	  // If we didn't come here through a submit button, use the first one in the form
	  this._$submitSource = this._$submitSource || this.$element.find('input[type="submit"], button[type="submit"]').first();

	  if (this._$submitSource.is('[formnovalidate]')) {
		this._$submitSource = null;
		return;
	  }

	  // Because some validations might be asynchroneous,
	  // we cancel this submit and will fake it after validation.
	  event.stopImmediatePropagation();
	  event.preventDefault();

	  this.whenValidate(undefined, undefined, event).done(function () {
		that._submit();
	  }).always(function () {
		that._$submitSource = null;
	  });

	  return this;
	},

	onSubmitButton: function onSubmitButton(event) {
	  this._$submitSource = $(event.target);
	},
	// internal
	// _submit submits the form, this time without going through the validations.
	// Care must be taken to "fake" the actual submit button being clicked.
	_submit: function _submit() {
	  if (false === this._trigger('submit')) return;
	  this.$element.find('.parsley_synthetic_submit_button').remove();
	  // Add submit button's data
	  if (this._$submitSource) {
		$('<input class="parsley_synthetic_submit_button" type="hidden">').attr('name', this._$submitSource.attr('name')).attr('value', this._$submitSource.attr('value')).appendTo(this.$element);
	  }
	  //
	  this.$element.trigger($.extend($.Event('submit'), { parsley: true }));
	},

	// Performs validation on fields while triggering events.
	// @returns `true` if al validations succeeds, `false`
	// if a failure is immediately detected, or `null`
	// if dependant on a promise.
	// Prefer `whenValidate`.
	validate: function validate(group, force, event) {
	  return ParsleyForm__statusMapping[this.whenValidate(group, force, event).state()];
	},

	whenValidate: function whenValidate(group, force, event) {
	  var that = this;
	  this.submitEvent = event;
	  this.validationResult = true;

	  // fire validate event to eventually modify things before very validation
	  this._trigger('validate');

	  // Refresh form DOM options and form's fields that could have changed
	  this._refreshFields();

	  var promises = this._withoutReactualizingFormOptions(function () {
		return $.map(this.fields, function (field) {
		  // do not validate a field if not the same as given validation group
		  if (!group || that._isFieldInGroup(field, group)) return field.whenValidate(force);
		});
	  });

	  var promiseBasedOnValidationResult = function promiseBasedOnValidationResult() {
		var r = $.Deferred();
		if (false === that.validationResult) r.reject();
		return r.resolve().promise();
	  };

	  return $.when.apply($, promises).done(function () {
		that._trigger('success');
	  }).fail(function () {
		that.validationResult = false;that._trigger('error');
	  }).always(function () {
		that._trigger('validated');
	  }).pipe(promiseBasedOnValidationResult, promiseBasedOnValidationResult);
	},

	// Iterate over refreshed fields, and stop on first failure.
	// Returns `true` if all fields are valid, `false` if a failure is detected
	// or `null` if the result depends on an unresolved promise.
	// Prefer using `whenValid` instead.
	isValid: function isValid(group, force) {
	  return ParsleyForm__statusMapping[this.whenValid(group, force).state()];
	},

	// Iterate over refreshed fields and validate them.
	// Returns a promise.
	// A validation that immediately fails will interrupt the validations.
	whenValid: function whenValid(group, force) {
	  var that = this;
	  this._refreshFields();

	  var promises = this._withoutReactualizingFormOptions(function () {
		return $.map(this.fields, function (field) {
		  // do not validate a field if not the same as given validation group
		  if (!group || that._isFieldInGroup(field, group)) return field.whenValid(force);
		});
	  });
	  return $.when.apply($, promises);
	},

	_isFieldInGroup: function _isFieldInGroup(field, group) {
	  if ($.isArray(field.options.group)) return -1 !== $.inArray(group, field.options.group);
	  return field.options.group === group;
	},

	_refreshFields: function _refreshFields() {
	  return this.actualizeOptions()._bindFields();
	},

	_bindFields: function _bindFields() {
	  var self = this;
	  var oldFields = this.fields;

	  this.fields = [];
	  this.fieldsMappedById = {};

	  this._withoutReactualizingFormOptions(function () {
		this.$element.find(this.options.inputs).not(this.options.excluded).each(function () {
		  var fieldInstance = new window.Parsley.Factory(this, {}, self);

		  // Only add valid and not excluded `ParsleyField` and `ParsleyFieldMultiple` children
		  if (('ParsleyField' === fieldInstance.__class__ || 'ParsleyFieldMultiple' === fieldInstance.__class__) && true !== fieldInstance.options.excluded) if ('undefined' === typeof self.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__]) {
			self.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__] = fieldInstance;
			self.fields.push(fieldInstance);
		  }
		});

		$(oldFields).not(self.fields).each(function () {
		  this._trigger('reset');
		});
	  });
	  return this;
	},

	// Internal only.
	// Looping on a form's fields to do validation or similar
	// will trigger reactualizing options on all of them, which
	// in turn will reactualize the form's options.
	// To avoid calling actualizeOptions so many times on the form
	// for nothing, _withoutReactualizingFormOptions temporarily disables
	// the method actualizeOptions on this form while `fn` is called.
	_withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(fn) {
	  var oldActualizeOptions = this.actualizeOptions;
	  this.actualizeOptions = function () {
		return this;
	  };
	  var result = fn.call(this); // Keep the current `this`.
	  this.actualizeOptions = oldActualizeOptions;
	  return result;
	},

	// Internal only.
	// Shortcut to trigger an event
	// Returns true iff event is not interrupted and default not prevented.
	_trigger: function _trigger(eventName) {
	  return this.trigger('form:' + eventName);
	}

  };

  var ConstraintFactory = function ConstraintFactory(parsleyField, name, requirements, priority, isDomConstraint) {
	if (!new RegExp('ParsleyField').test(parsleyField.__class__)) throw new Error('ParsleyField or ParsleyFieldMultiple instance expected');

	var validatorSpec = window.Parsley._validatorRegistry.validators[name];
	var validator = new ParsleyValidator(validatorSpec);

	$.extend(this, {
	  validator: validator,
	  name: name,
	  requirements: requirements,
	  priority: priority || parsleyField.options[name + 'Priority'] || validator.priority,
	  isDomConstraint: true === isDomConstraint
	});
	this._parseRequirements(parsleyField.options);
  };

  var capitalize = function capitalize(str) {
	var cap = str[0].toUpperCase();
	return cap + str.slice(1);
  };

  ConstraintFactory.prototype = {
	validate: function validate(value, instance) {
	  var args = this.requirementList.slice(0); // Make copy
	  args.unshift(value);
	  args.push(instance);
	  return this.validator.validate.apply(this.validator, args);
	},

	_parseRequirements: function _parseRequirements(options) {
	  var that = this;
	  this.requirementList = this.validator.parseRequirements(this.requirements, function (key) {
		return options[that.name + capitalize(key)];
	  });
	}
  };

  var ParsleyField = function ParsleyField(field, domOptions, options, parsleyFormInstance) {
	this.__class__ = 'ParsleyField';
	this.__id__ = ParsleyUtils__default.generateID();

	this.$element = $(field);

	// Set parent if we have one
	if ('undefined' !== typeof parsleyFormInstance) {
	  this.parent = parsleyFormInstance;
	}

	this.options = options;
	this.domOptions = domOptions;

	// Initialize some properties
	this.constraints = [];
	this.constraintsByName = {};
	this.validationResult = [];

	// Bind constraints
	this._bindConstraints();
  };

  var parsley_field__statusMapping = { pending: null, resolved: true, rejected: false };

  ParsleyField.prototype = {
	// # Public API
	// Validate field and trigger some events for mainly `ParsleyUI`
	// @returns `true`, an array of the validators that failed, or
	// `null` if validation is not finished. Prefer using whenValidate
	validate: function validate(force) {
	  var promise = this.whenValidate(force);
	  switch (promise.state()) {
		case 'pending':
		  return null;
		case 'resolved':
		  return true;
		case 'rejected':
		  return this.validationResult;
	  }
	},

	// Validate field and trigger some events for mainly `ParsleyUI`
	// @returns a promise that succeeds only when all validations do.
	whenValidate: function whenValidate(force) {
	  var that = this;

	  this.value = this.getValue();

	  // Field Validate event. `this.value` could be altered for custom needs
	  this._trigger('validate');

	  return this.whenValid(force, this.value).done(function () {
		that._trigger('success');
	  }).fail(function () {
		that._trigger('error');
	  }).always(function () {
		that._trigger('validated');
	  });
	},

	hasConstraints: function hasConstraints() {
	  return 0 !== this.constraints.length;
	},

	// An empty optional field does not need validation
	needsValidation: function needsValidation(value) {
	  if ('undefined' === typeof value) value = this.getValue();

	  // If a field is empty and not required, it is valid
	  // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
	  if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty) return false;

	  return true;
	},

	// Just validate field. Do not trigger any event.
	// Returns `true` iff all constraints pass, `false` if there are failures,
	// or `null` if the result can not be determined yet (depends on a promise)
	// See also `whenValid`.
	isValid: function isValid(force, value) {
	  return parsley_field__statusMapping[this.whenValid(force, value).state()];
	},

	// Just validate field. Do not trigger any event.
	// @returns a promise that succeeds only when all validations do.
	// The argument `force` is optional, defaults to `false`.
	// The argument `value` is optional. If given, it will be validated instead of the value of the input.
	whenValid: function whenValid(force, value) {
	  // Recompute options and rebind constraints to have latest changes
	  this.refreshConstraints();
	  this.validationResult = true;

	  // A field without constraint is valid
	  if (!this.hasConstraints()) return $.when();

	  // Make `force` argument optional
	  if ('boolean' !== typeof force && 'undefined' === typeof value) {
		value = force;
		force = false;
	  }
	  // Value could be passed as argument, needed to add more power to 'parsley:field:validate'
	  if ('undefined' === typeof value || null === value) value = this.getValue();

	  if (!this.needsValidation(value) && true !== force) return $.when();

	  var groupedConstraints = this._getGroupedConstraints();
	  var promises = [];
	  var that = this;
	  $.each(groupedConstraints, function (_, constraints) {
		// Process one group of constraints at a time, we validate the constraints
		// and combine the promises together.
		var promise = $.when.apply($, $.map(constraints, $.proxy(that, '_validateConstraint', value)));
		promises.push(promise);
		if (promise.state() === 'rejected') return false; // Interrupt processing if a group has already failed
	  });
	  return $.when.apply($, promises);
	},

	// @returns a promise
	_validateConstraint: function _validateConstraint(value, constraint) {
	  var that = this;
	  var result = constraint.validate(value, this);
	  // Map false to a failed promise
	  if (false === result) result = $.Deferred().reject();
	  // Make sure we return a promise and that we record failures
	  return $.when(result).fail(function (errorMessage) {
		if (true === that.validationResult) that.validationResult = [];
		that.validationResult.push({
		  assert: constraint,
		  errorMessage: 'string' === typeof errorMessage && errorMessage
		});
	  });
	},

	// @returns Parsley field computed value that could be overrided or configured in DOM
	getValue: function getValue() {
	  var value;

	  // Value could be overriden in DOM or with explicit options
	  if ('function' === typeof this.options.value) value = this.options.value(this);else if ('undefined' !== typeof this.options.value) value = this.options.value;else value = this.$element.val();

	  // Handle wrong DOM or configurations
	  if ('undefined' === typeof value || null === value) return '';

	  return this._handleWhitespace(value);
	},

	// Actualize options that could have change since previous validation
	// Re-bind accordingly constraints (could be some new, removed or updated)
	refreshConstraints: function refreshConstraints() {
	  return this.actualizeOptions()._bindConstraints();
	},

	/**
	* Add a new constraint to a field
	*
	* @param {String}   name
	* @param {Mixed}    requirements      optional
	* @param {Number}   priority          optional
	* @param {Boolean}  isDomConstraint   optional
	*/
	addConstraint: function addConstraint(name, requirements, priority, isDomConstraint) {

	  if (window.Parsley._validatorRegistry.validators[name]) {
		var constraint = new ConstraintFactory(this, name, requirements, priority, isDomConstraint);

		// if constraint already exist, delete it and push new version
		if ('undefined' !== this.constraintsByName[constraint.name]) this.removeConstraint(constraint.name);

		this.constraints.push(constraint);
		this.constraintsByName[constraint.name] = constraint;
	  }

	  return this;
	},

	// Remove a constraint
	removeConstraint: function removeConstraint(name) {
	  for (var i = 0; i < this.constraints.length; i++) if (name === this.constraints[i].name) {
		this.constraints.splice(i, 1);
		break;
	  }
	  delete this.constraintsByName[name];
	  return this;
	},

	// Update a constraint (Remove + re-add)
	updateConstraint: function updateConstraint(name, parameters, priority) {
	  return this.removeConstraint(name).addConstraint(name, parameters, priority);
	},

	// # Internals

	// Internal only.
	// Bind constraints from config + options + DOM
	_bindConstraints: function _bindConstraints() {
	  var constraints = [];
	  var constraintsByName = {};

	  // clean all existing DOM constraints to only keep javascript user constraints
	  for (var i = 0; i < this.constraints.length; i++) if (false === this.constraints[i].isDomConstraint) {
		constraints.push(this.constraints[i]);
		constraintsByName[this.constraints[i].name] = this.constraints[i];
	  }

	  this.constraints = constraints;
	  this.constraintsByName = constraintsByName;

	  // then re-add Parsley DOM-API constraints
	  for (var name in this.options) this.addConstraint(name, this.options[name], undefined, true);

	  // finally, bind special HTML5 constraints
	  return this._bindHtml5Constraints();
	},

	// Internal only.
	// Bind specific HTML5 constraints to be HTML5 compliant
	_bindHtml5Constraints: function _bindHtml5Constraints() {
	  // html5 required
	  if (this.$element.hasClass('required') || this.$element.attr('required')) this.addConstraint('required', true, undefined, true);

	  // html5 pattern
	  if ('string' === typeof this.$element.attr('pattern')) this.addConstraint('pattern', this.$element.attr('pattern'), undefined, true);

	  // range
	  if ('undefined' !== typeof this.$element.attr('min') && 'undefined' !== typeof this.$element.attr('max')) this.addConstraint('range', [this.$element.attr('min'), this.$element.attr('max')], undefined, true);

	  // HTML5 min
	  else if ('undefined' !== typeof this.$element.attr('min')) this.addConstraint('min', this.$element.attr('min'), undefined, true);

		// HTML5 max
		else if ('undefined' !== typeof this.$element.attr('max')) this.addConstraint('max', this.$element.attr('max'), undefined, true);

	  // length
	  if ('undefined' !== typeof this.$element.attr('minlength') && 'undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('length', [this.$element.attr('minlength'), this.$element.attr('maxlength')], undefined, true);

	  // HTML5 minlength
	  else if ('undefined' !== typeof this.$element.attr('minlength')) this.addConstraint('minlength', this.$element.attr('minlength'), undefined, true);

		// HTML5 maxlength
		else if ('undefined' !== typeof this.$element.attr('maxlength')) this.addConstraint('maxlength', this.$element.attr('maxlength'), undefined, true);

	  // html5 types
	  var type = this.$element.attr('type');

	  if ('undefined' === typeof type) return this;

	  // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
	  if ('number' === type) {
		if ('undefined' === typeof this.$element.attr('step') || 0 === parseFloat(this.$element.attr('step')) % 1) {
		  return this.addConstraint('type', 'integer', undefined, true);
		} else {
		  return this.addConstraint('type', 'number', undefined, true);
		}
		// Regular other HTML5 supported types
	  } else if (/^(email|url|range)$/i.test(type)) {
		  return this.addConstraint('type', type, undefined, true);
		}
	  return this;
	},

	// Internal only.
	// Field is required if have required constraint without `false` value
	_isRequired: function _isRequired() {
	  if ('undefined' === typeof this.constraintsByName.required) return false;

	  return false !== this.constraintsByName.required.requirements;
	},

	// Internal only.
	// Shortcut to trigger an event
	_trigger: function _trigger(eventName) {
	  return this.trigger('field:' + eventName);
	},

	// Internal only
	// Handles whitespace in a value
	// Use `data-parsley-whitespace="squish"` to auto squish input value
	// Use `data-parsley-whitespace="trim"` to auto trim input value
	_handleWhitespace: function _handleWhitespace(value) {
	  if (true === this.options.trimValue) ParsleyUtils__default.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');

	  if ('squish' === this.options.whitespace) value = value.replace(/\s{2,}/g, ' ');

	  if ('trim' === this.options.whitespace || 'squish' === this.options.whitespace || true === this.options.trimValue) value = ParsleyUtils__default.trimString(value);

	  return value;
	},

	// Internal only.
	// Returns the constraints, grouped by descending priority.
	// The result is thus an array of arrays of constraints.
	_getGroupedConstraints: function _getGroupedConstraints() {
	  if (false === this.options.priorityEnabled) return [this.constraints];

	  var groupedConstraints = [];
	  var index = {};

	  // Create array unique of priorities
	  for (var i = 0; i < this.constraints.length; i++) {
		var p = this.constraints[i].priority;
		if (!index[p]) groupedConstraints.push(index[p] = []);
		index[p].push(this.constraints[i]);
	  }
	  // Sort them by priority DESC
	  groupedConstraints.sort(function (a, b) {
		return b[0].priority - a[0].priority;
	  });

	  return groupedConstraints;
	}

  };

  var parsley_field = ParsleyField;

  var ParsleyMultiple = function ParsleyMultiple() {
	this.__class__ = 'ParsleyFieldMultiple';
  };

  ParsleyMultiple.prototype = {
	// Add new `$element` sibling for multiple field
	addElement: function addElement($element) {
	  this.$elements.push($element);

	  return this;
	},

	// See `ParsleyField.refreshConstraints()`
	refreshConstraints: function refreshConstraints() {
	  var fieldConstraints;

	  this.constraints = [];

	  // Select multiple special treatment
	  if (this.$element.is('select')) {
		this.actualizeOptions()._bindConstraints();

		return this;
	  }

	  // Gather all constraints for each input in the multiple group
	  for (var i = 0; i < this.$elements.length; i++) {

		// Check if element have not been dynamically removed since last binding
		if (!$('html').has(this.$elements[i]).length) {
		  this.$elements.splice(i, 1);
		  continue;
		}

		fieldConstraints = this.$elements[i].data('ParsleyFieldMultiple').refreshConstraints().constraints;

		for (var j = 0; j < fieldConstraints.length; j++) this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
	  }

	  return this;
	},

	// See `ParsleyField.getValue()`
	getValue: function getValue() {
	  // Value could be overriden in DOM
	  if ('undefined' !== typeof this.options.value) return this.options.value;

	  // Radio input case
	  if (this.$element.is('input[type=radio]')) return this._findRelatedMultiple().filter(':checked').val() || '';

	  // checkbox input case
	  if (this.$element.is('input[type=checkbox]')) {
		var values = [];

		this._findRelatedMultiple().filter(':checked').each(function () {
		  values.push($(this).val());
		});

		return values;
	  }

	  // Select multiple case
	  if (this.$element.is('select') && null === this.$element.val()) return [];

	  // Default case that should never happen
	  return this.$element.val();
	},

	_init: function _init() {
	  this.$elements = [this.$element];

	  return this;
	}
  };

  var ParsleyFactory = function ParsleyFactory(element, options, parsleyFormInstance) {
	this.$element = $(element);

	// If the element has already been bound, returns its saved Parsley instance
	var savedparsleyFormInstance = this.$element.data('Parsley');
	if (savedparsleyFormInstance) {

	  // If the saved instance has been bound without a ParsleyForm parent and there is one given in this call, add it
	  if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
		savedparsleyFormInstance.parent = parsleyFormInstance;
		savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
	  }

	  return savedparsleyFormInstance;
	}

	// Parsley must be instantiated with a DOM element or jQuery $element
	if (!this.$element.length) throw new Error('You must bind Parsley on an existing element.');

	if ('undefined' !== typeof parsleyFormInstance && 'ParsleyForm' !== parsleyFormInstance.__class__) throw new Error('Parent instance must be a ParsleyForm instance');

	this.parent = parsleyFormInstance || window.Parsley;
	return this.init(options);
  };

  ParsleyFactory.prototype = {
	init: function init(options) {
	  this.__class__ = 'Parsley';
	  this.__version__ = '@@version';
	  this.__id__ = ParsleyUtils__default.generateID();

	  // Pre-compute options
	  this._resetOptions(options);

	  // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
	  if (this.$element.is('form') || ParsleyUtils__default.checkAttr(this.$element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)) return this.bind('parsleyForm');

	  // Every other element is bound as a `ParsleyField` or `ParsleyFieldMultiple`
	  return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
	},

	isMultiple: function isMultiple() {
	  return this.$element.is('input[type=radio], input[type=checkbox]') || this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple');
	},

	// Multiples fields are a real nightmare :(
	// Maybe some refactoring would be appreciated here...
	handleMultiple: function handleMultiple() {
	  var that = this;
	  var name;
	  var multiple;
	  var parsleyMultipleInstance;

	  // Handle multiple name
	  if (this.options.multiple) ; // We already have our 'multiple' identifier
	  else if ('undefined' !== typeof this.$element.attr('name') && this.$element.attr('name').length) this.options.multiple = name = this.$element.attr('name');else if ('undefined' !== typeof this.$element.attr('id') && this.$element.attr('id').length) this.options.multiple = this.$element.attr('id');

	  // Special select multiple input
	  if (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple')) {
		this.options.multiple = this.options.multiple || this.__id__;
		return this.bind('parsleyFieldMultiple');

		// Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
	  } else if (!this.options.multiple) {
		  ParsleyUtils__default.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
		  return this;
		}

	  // Remove special chars
	  if (typeof this.options.multiple !== "string")
		this.options.multiple = String(this.options.multiple);
	  this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');

	  // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
	  if ('undefined' !== typeof name) {
		$('input[name="' + name + '"]').each(function () {
		  if ($(this).is('input[type=radio], input[type=checkbox]')) $(this).attr(that.options.namespace + 'multiple', that.options.multiple);
		});
	  }

	  // Check here if we don't already have a related multiple instance saved
	  var $previouslyRelated = this._findRelatedMultiple();
	  for (var i = 0; i < $previouslyRelated.length; i++) {
		parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
		if ('undefined' !== typeof parsleyMultipleInstance) {

		  if (!this.$element.data('ParsleyFieldMultiple')) {
			parsleyMultipleInstance.addElement(this.$element);
		  }

		  break;
		}
	  }

	  // Create a secret ParsleyField instance for every multiple field. It will be stored in `data('ParsleyFieldMultiple')`
	  // And will be useful later to access classic `ParsleyField` stuff while being in a `ParsleyFieldMultiple` instance
	  this.bind('parsleyField', true);

	  return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
	},

	// Return proper `ParsleyForm`, `ParsleyField` or `ParsleyFieldMultiple`
	bind: function bind(type, doNotStore) {
	  var parsleyInstance;

	  switch (type) {
		case 'parsleyForm':
		  parsleyInstance = $.extend(new ParsleyForm(this.$element, this.domOptions, this.options), window.ParsleyExtend)._bindFields();
		  break;
		case 'parsleyField':
		  parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), window.ParsleyExtend);
		  break;
		case 'parsleyFieldMultiple':
		  parsleyInstance = $.extend(new parsley_field(this.$element, this.domOptions, this.options, this.parent), new ParsleyMultiple(), window.ParsleyExtend)._init();
		  break;
		default:
		  throw new Error(type + 'is not a supported Parsley type');
	  }

	  if (this.options.multiple) ParsleyUtils__default.setAttr(this.$element, this.options.namespace, 'multiple', this.options.multiple);

	  if ('undefined' !== typeof doNotStore) {
		this.$element.data('ParsleyFieldMultiple', parsleyInstance);

		return parsleyInstance;
	  }

	  // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
	  this.$element.data('Parsley', parsleyInstance);

	  // Tell the world we have a new ParsleyForm or ParsleyField instance!
	  parsleyInstance._trigger('init');

	  return parsleyInstance;
	}
  };

  var vernums = $.fn.jquery.split('.');
  if (parseInt(vernums[0]) <= 1 && parseInt(vernums[1]) < 8) {
	throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
  }
  if (!vernums.forEach) {
	ParsleyUtils__default.warn('Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim');
  }
  // Inherit `on`, `off` & `trigger` to Parsley:
  var Parsley = $.extend(new ParsleyAbstract(), {
	$element: $(document),
	actualizeOptions: null,
	_resetOptions: null,
	Factory: ParsleyFactory,
	version: '@@version'
  });

  // Supplement ParsleyField and Form with ParsleyAbstract
  // This way, the constructors will have access to those methods
  $.extend(parsley_field.prototype, ParsleyAbstract.prototype);
  $.extend(ParsleyForm.prototype, ParsleyAbstract.prototype);
  // Inherit actualizeOptions and _resetOptions:
  $.extend(ParsleyFactory.prototype, ParsleyAbstract.prototype);

  // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
  $.fn.parsley = $.fn.psly = function (options) {
	if (this.length > 1) {
	  var instances = [];

	  this.each(function () {
		instances.push($(this).parsley(options));
	  });

	  return instances;
	}

	// Return undefined if applied to non existing DOM element
	if (!$(this).length) {
	  ParsleyUtils__default.warn('You must bind Parsley on an existing element.');

	  return;
	}

	return new ParsleyFactory(this, options);
  };

  // ### ParsleyField and ParsleyForm extension
  // Ensure the extension is now defined if it wasn't previously
  if ('undefined' === typeof window.ParsleyExtend) window.ParsleyExtend = {};

  // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values
  Parsley.options = $.extend(ParsleyUtils__default.objectCreate(ParsleyDefaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options

  // ### Globals
  window.Parsley = window.psly = Parsley;
  window.ParsleyUtils = ParsleyUtils__default;

  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
  var registry = window.Parsley._validatorRegistry = new ParsleyValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator'.split(' '), function (i, method) {
	window.Parsley[method] = $.proxy(registry, method);
	window.ParsleyValidator[method] = function () {
	  ParsleyUtils__default.warnOnce('Accessing the method \'' + method + '\' through ParsleyValidator is deprecated. Simply call \'window.Parsley.' + method + '(...)\'');
	  return window.Parsley[method].apply(window.Parsley, arguments);
	};
  });

  // ### ParsleyUI
  // UI is a separate class that only listens to some events and then modifies the DOM accordingly
  // Could be overriden by defining a `window.ParsleyConfig.ParsleyUI` appropriate class (with `listen()` method basically)
  window.ParsleyUI = 'function' === typeof window.ParsleyConfig.ParsleyUI ? new window.ParsleyConfig.ParsleyUI().listen() : new ParsleyUI().listen();

  // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
  if (false !== window.ParsleyConfig.autoBind) {
	$(function () {
	  // Works only on `data-parsley-validate`.
	  if ($('[data-parsley-validate]').length) $('[data-parsley-validate]').parsley();
	});
  }

  var o = $({});
  var deprecated = function deprecated() {
	ParsleyUtils__default.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  };

  // Returns an event handler that calls `fn` with the arguments it expects
  function adapt(fn, context) {
	// Store to allow unbinding
	if (!fn.parsleyAdaptedCallback) {
	  fn.parsleyAdaptedCallback = function () {
		var args = Array.prototype.slice.call(arguments, 0);
		args.unshift(this);
		fn.apply(context || o, args);
	  };
	}
	return fn.parsleyAdaptedCallback;
  }

  var eventPrefix = 'parsley:';
  // Converts 'parsley:form:validate' into 'form:validate'
  function eventName(name) {
	if (name.lastIndexOf(eventPrefix, 0) === 0) return name.substr(eventPrefix.length);
	return name;
  }

  // $.listen is deprecated. Use Parsley.on instead.
  $.listen = function (name, callback) {
	var context;
	deprecated();
	if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
	  context = arguments[1];
	  callback = arguments[2];
	}

	if ('function' !== typeof callback) throw new Error('Wrong parameters');

	window.Parsley.on(eventName(name), adapt(callback, context));
  };

  $.listenTo = function (instance, name, fn) {
	deprecated();
	if (!(instance instanceof parsley_field) && !(instance instanceof ParsleyForm)) throw new Error('Must give Parsley instance');

	if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong parameters');

	instance.on(eventName(name), adapt(fn));
  };

  $.unsubscribe = function (name, fn) {
	deprecated();
	if ('string' !== typeof name || 'function' !== typeof fn) throw new Error('Wrong arguments');
	window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };

  $.unsubscribeTo = function (instance, name) {
	deprecated();
	if (!(instance instanceof parsley_field) && !(instance instanceof ParsleyForm)) throw new Error('Must give Parsley instance');
	instance.off(eventName(name));
  };

  $.unsubscribeAll = function (name) {
	deprecated();
	window.Parsley.off(eventName(name));
	$('form,input,textarea,select').each(function () {
	  var instance = $(this).data('Parsley');
	  if (instance) {
		instance.off(eventName(name));
	  }
	});
  };

  // $.emit is deprecated. Use jQuery events instead.
  $.emit = function (name, instance) {
	deprecated();
	var instanceGiven = instance instanceof parsley_field || instance instanceof ParsleyForm;
	var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
	args.unshift(eventName(name));
	if (!instanceGiven) {
	  instance = window.Parsley;
	}
	instance.trigger.apply(instance, args);
  };

  var pubsub = {};

  $.extend(true, Parsley, {
	asyncValidators: {
	  'default': {
		fn: function fn(xhr) {
		  // By default, only status 2xx are deemed successful.
		  // Note: we use status instead of state() because responses with status 200
		  // but invalid messages (e.g. an empty body for content type set to JSON) will
		  // result in state() === 'rejected'.
		  return xhr.status >= 200 && xhr.status < 300;
		},
		url: false
	  },
	  reverse: {
		fn: function fn(xhr) {
		  // If reverse option is set, a failing ajax request is considered successful
		  return xhr.status < 200 || xhr.status >= 300;
		},
		url: false
	  }
	},

	addAsyncValidator: function addAsyncValidator(name, fn, url, options) {
	  Parsley.asyncValidators[name] = {
		fn: fn,
		url: url || false,
		options: options || {}
	  };

	  return this;
	},

	eventValidate: function eventValidate(event) {
	  // For keyup, keypress, keydown.. events that could be a little bit obstrusive
	  // do not validate if val length < min threshold on first validation. Once field have been validated once and info
	  // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
	  if (new RegExp('key').test(event.type)) if (!this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold) return;

	  this._ui.validatedOnce = true;
	  this.whenValidate();
	}
  });

  Parsley.addValidator('remote', {
	requirementType: {
	  '': 'string',
	  'validator': 'string',
	  'reverse': 'boolean',
	  'options': 'object'
	},

	validateString: function validateString(value, url, options, instance) {
	  var data = {};
	  var ajaxOptions;
	  var csr;
	  var validator = options.validator || (true === options.reverse ? 'reverse' : 'default');

	  if ('undefined' === typeof Parsley.asyncValidators[validator]) throw new Error('Calling an undefined async validator: `' + validator + '`');

	  url = Parsley.asyncValidators[validator].url || url;

	  // Fill current value
	  if (url.indexOf('{value}') > -1) {
		url = url.replace('{value}', encodeURIComponent(value));
	  } else {
		data[instance.$element.attr('name') || instance.$element.attr('id')] = value;
	  }

	  // Merge options passed in from the function with the ones in the attribute
	  var remoteOptions = $.extend(true, options.options || {}, Parsley.asyncValidators[validator].options);

	  // All `$.ajax(options)` could be overridden or extended directly from DOM in `data-parsley-remote-options`
	  ajaxOptions = $.extend(true, {}, {
		url: url,
		data: data,
		type: 'GET'
	  }, remoteOptions);

	  // Generate store key based on ajax options
	  instance.trigger('field:ajaxoptions', instance, ajaxOptions);

	  csr = $.param(ajaxOptions);

	  // Initialise querry cache
	  if ('undefined' === typeof Parsley._remoteCache) Parsley._remoteCache = {};

	  // Try to retrieve stored xhr
	  var xhr = Parsley._remoteCache[csr] = Parsley._remoteCache[csr] || $.ajax(ajaxOptions);

	  var handleXhr = function handleXhr() {
		var result = Parsley.asyncValidators[validator].fn.call(instance, xhr, url, options);
		if (!result) // Map falsy results to rejected promise
		  result = $.Deferred().reject();
		return $.when(result);
	  };

	  return xhr.then(handleXhr, handleXhr);
	},

	priority: -1
  });

  Parsley.on('form:submit', function () {
	Parsley._remoteCache = {};
  });

  window.ParsleyExtend.addAsyncValidator = function () {
	ParsleyUtils.warnOnce('Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`');
	return Parsley.apply(Parsley.addAsyncValidator, arguments);
  };

  // This is bundled with the Parsley library
  Parsley.addMessages('en', {
	defaultMessage: "This value seems to be invalid.",
	type: {
	  email: "This value should be a valid email.",
	  url: "This value should be a valid url.",
	  number: "This value should be a valid number.",
	  integer: "This value should be a valid integer.",
	  digits: "This value should be digits.",
	  alphanum: "This value should be alphanumeric."
	},
	notblank: "This value should not be blank.",
	required: "This value is required.",
	pattern: "This value seems to be invalid.",
	min: "This value should be greater than or equal to %s.",
	max: "This value should be lower than or equal to %s.",
	range: "This value should be between %s and %s.",
	minlength: "This value is too short. It should have %s characters or more.",
	maxlength: "This value is too long. It should have %s characters or fewer.",
	length: "This value length is invalid. It should be between %s and %s characters long.",
	mincheck: "You must select at least %s choices.",
	maxcheck: "You must select %s choices or fewer.",
	check: "You must select between %s and %s choices.",
	equalto: "This value should be the same."
  });

  Parsley.setLocale('en');

  var parsley = Parsley;

  return parsley;
});

/*! PhotoSwipe Default UI - 4.1.0 - 2015-07-11
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
/**
*
* UI on top of main sliding area (caption, arrows, close button, etc.).
* Built just using public methods/properties of PhotoSwipe.
*
*/
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.PhotoSwipeUI_Default = factory();
	}
})(this, function () {

	'use strict';



var PhotoSwipeUI_Default =
 function(pswp, framework) {

	var ui = this;
	var _overlayUIUpdated = false,
		_controlsVisible = true,
		_fullscrenAPI,
		_controls,
		_captionContainer,
		_fakeCaptionContainer,
		_indexIndicator,
		_shareButton,
		_shareModal,
		_shareModalHidden = true,
		_initalCloseOnScrollValue,
		_isIdle,
		_listen,

		_loadingIndicator,
		_loadingIndicatorHidden,
		_loadingIndicatorTimeout,

		_galleryHasOneSlide,

		_options,
		_defaultUIOptions = {
			barsSize: {top:44, bottom:'auto'},
			closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
			timeToIdle: 4000,
			timeToIdleOutside: 1000,
			loadingIndicatorDelay: 1000, // 2s

			addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
				if(!item.title) {
					captionEl.children[0].innerHTML = '';
					return false;
				}
				captionEl.children[0].innerHTML = item.title;
				return true;
			},

			closeEl:true,
			captionEl: true,
			fullscreenEl: true,
			zoomEl: true,
			shareEl: true,
			counterEl: true,
			arrowEl: true,
			preloaderEl: true,

			tapToClose: false,
			tapToToggleControls: true,

			clickToCloseNonZoomable: true,

			shareButtons: [
				{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
				{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
				{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
													'?url={{url}}&media={{image_url}}&description={{text}}'},
				{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
			],
			getImageURLForShare: function( /* shareButtonData */ ) {
				return pswp.currItem.src || '';
			},
			getPageURLForShare: function( /* shareButtonData */ ) {
				return window.location.href;
			},
			getTextForShare: function( /* shareButtonData */ ) {
				return pswp.currItem.title || '';
			},

			indexIndicatorSep: ' / '

		},
		_blockControlsTap,
		_blockControlsTapTimeout;



	var _onControlsTap = function(e) {
			if(_blockControlsTap) {
				return true;
			}


			e = e || window.event;

			if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
				// reset idle timer
				_onIdleMouseMove();
			}


			var target = e.target || e.srcElement,
				uiElement,
				clickedClass = target.className,
				found;

			for(var i = 0; i < _uiElements.length; i++) {
				uiElement = _uiElements[i];
				if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
					uiElement.onTap();
					found = true;

				}
			}

			if(found) {
				if(e.stopPropagation) {
					e.stopPropagation();
				}
				_blockControlsTap = true;

				// Some versions of Android don't prevent ghost click event
				// when preventDefault() was called on touchstart and/or touchend.
				//
				// This happens on v4.3, 4.2, 4.1,
				// older versions strangely work correctly,
				// but just in case we add delay on all of them)
				var tapDelay = framework.features.isOldAndroid ? 600 : 30;
				_blockControlsTapTimeout = setTimeout(function() {
					_blockControlsTap = false;
				}, tapDelay);
			}

		},
		_fitControlsInViewport = function() {
			return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > 1200;
		},
		_togglePswpClass = function(el, cName, add) {
			framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
		},

		// add class when there is just one item in the gallery
		// (by default it hides left/right arrows and 1ofX counter)
		_countNumItems = function() {
			var hasOneSlide = (_options.getNumItemsFn() === 1);

			if(hasOneSlide !== _galleryHasOneSlide) {
				_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
				_galleryHasOneSlide = hasOneSlide;
			}
		},
		_toggleShareModalClass = function() {
			_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
		},
		_toggleShareModal = function() {

			_shareModalHidden = !_shareModalHidden;


			if(!_shareModalHidden) {
				_toggleShareModalClass();
				setTimeout(function() {
					if(!_shareModalHidden) {
						framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
					}
				}, 30);
			} else {
				framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
				setTimeout(function() {
					if(_shareModalHidden) {
						_toggleShareModalClass();
					}
				}, 300);
			}

			if(!_shareModalHidden) {
				_updateShareURLs();
			}
			return false;
		},

		_openWindowPopup = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			pswp.shout('shareLinkClick', e, target);

			if(!target.href) {
				return false;
			}

			if( target.hasAttribute('download') ) {
				return true;
			}

			window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
										'location=yes,width=550,height=420,top=100,left=' +
										(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );

			if(!_shareModalHidden) {
				_toggleShareModal();
			}

			return false;
		},
		_updateShareURLs = function() {
			var shareButtonOut = '',
				shareButtonData,
				shareURL,
				image_url,
				page_url,
				share_text;

			for(var i = 0; i < _options.shareButtons.length; i++) {
				shareButtonData = _options.shareButtons[i];

				image_url = _options.getImageURLForShare(shareButtonData);
				page_url = _options.getPageURLForShare(shareButtonData);
				share_text = _options.getTextForShare(shareButtonData);

				shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
									.replace('{{image_url}}', encodeURIComponent(image_url) )
									.replace('{{raw_image_url}}', image_url )
									.replace('{{text}}', encodeURIComponent(share_text) );

				shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
									'class="pswp__share--' + shareButtonData.id + '"' +
									(shareButtonData.download ? 'download' : '') + '>' +
									shareButtonData.label + '</a>';

				if(_options.parseShareButtonOut) {
					shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
				}
			}
			_shareModal.children[0].innerHTML = shareButtonOut;
			_shareModal.children[0].onclick = _openWindowPopup;

		},
		_hasCloseClass = function(target) {
			for(var  i = 0; i < _options.closeElClasses.length; i++) {
				if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
					return true;
				}
			}
		},
		_idleInterval,
		_idleTimer,
		_idleIncrement = 0,
		_onIdleMouseMove = function() {
			clearTimeout(_idleTimer);
			_idleIncrement = 0;
			if(_isIdle) {
				ui.setIdle(false);
			}
		},
		_onMouseLeaveWindow = function(e) {
			e = e ? e : window.event;
			var from = e.relatedTarget || e.toElement;
			if (!from || from.nodeName === 'HTML') {
				clearTimeout(_idleTimer);
				_idleTimer = setTimeout(function() {
					ui.setIdle(true);
				}, _options.timeToIdleOutside);
			}
		},
		_setupFullscreenAPI = function() {
			if(_options.fullscreenEl) {
				if(!_fullscrenAPI) {
					_fullscrenAPI = ui.getFullscreenAPI();
				}
				if(_fullscrenAPI) {
					framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
					ui.updateFullscreen();
					framework.addClass(pswp.template, 'pswp--supports-fs');
				} else {
					framework.removeClass(pswp.template, 'pswp--supports-fs');
				}
			}
		},
		_setupLoadingIndicator = function() {
			// Setup loading indicator
			if(_options.preloaderEl) {

				_toggleLoadingIndicator(true);

				_listen('beforeChange', function() {

					clearTimeout(_loadingIndicatorTimeout);

					// display loading indicator with delay
					_loadingIndicatorTimeout = setTimeout(function() {

						if(pswp.currItem && pswp.currItem.loading) {

							if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
								// show preloader if progressive loading is not enabled,
								// or image width is not defined yet (because of slow connection)
								_toggleLoadingIndicator(false);
								// items-controller.js function allowProgressiveImg
							}

						} else {
							_toggleLoadingIndicator(true); // hide preloader
						}

					}, _options.loadingIndicatorDelay);

				});
				_listen('imageLoadComplete', function(index, item) {
					if(pswp.currItem === item) {
						_toggleLoadingIndicator(true);
					}
				});

			}
		},
		_toggleLoadingIndicator = function(hide) {
			if( _loadingIndicatorHidden !== hide ) {
				_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
				_loadingIndicatorHidden = hide;
			}
		},
		_applyNavBarGaps = function(item) {
			var gap = item.vGap;

			if( _fitControlsInViewport() ) {

				var bars = _options.barsSize;
				if(_options.captionEl && bars.bottom === 'auto') {
					if(!_fakeCaptionContainer) {
						_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
						_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
						_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
						framework.addClass(_controls, 'pswp__ui--fit');
					}
					if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {

						var captionSize = _fakeCaptionContainer.clientHeight;
						gap.bottom = parseInt(captionSize,10) || 44;
					} else {
						gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
					}
				} else {
					gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
				}

				// height of top bar is static, no need to calculate it
				gap.top = bars.top;
			} else {
				gap.top = gap.bottom = 0;
			}
		},
		_setupIdle = function() {
			// Hide controls when mouse is used
			if(_options.timeToIdle) {
				_listen('mouseUsed', function() {

					framework.bind(document, 'mousemove', _onIdleMouseMove);
					framework.bind(document, 'mouseout', _onMouseLeaveWindow);

					_idleInterval = setInterval(function() {
						_idleIncrement++;
						if(_idleIncrement === 2) {
							ui.setIdle(true);
						}
					}, _options.timeToIdle / 2);
				});
			}
		},
		_setupHidingControlsDuringGestures = function() {

			// Hide controls on vertical drag
			_listen('onVerticalDrag', function(now) {
				if(_controlsVisible && now < 0.95) {
					ui.hideControls();
				} else if(!_controlsVisible && now >= 0.95) {
					ui.showControls();
				}
			});

			// Hide controls when pinching to close
			var pinchControlsHidden;
			_listen('onPinchClose' , function(now) {
				if(_controlsVisible && now < 0.9) {
					ui.hideControls();
					pinchControlsHidden = true;
				} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
					ui.showControls();
				}
			});

			_listen('zoomGestureEnded', function() {
				pinchControlsHidden = false;
				if(pinchControlsHidden && !_controlsVisible) {
					ui.showControls();
				}
			});

		};



	var _uiElements = [
		{
			name: 'caption',
			option: 'captionEl',
			onInit: function(el) {
				_captionContainer = el;
			}
		},
		{
			name: 'share-modal',
			option: 'shareEl',
			onInit: function(el) {
				_shareModal = el;
			},
			onTap: function() {
				_toggleShareModal();
			}
		},
		{
			name: 'button--share',
			option: 'shareEl',
			onInit: function(el) {
				_shareButton = el;
			},
			onTap: function() {
				_toggleShareModal();
			}
		},
		{
			name: 'button--zoom',
			option: 'zoomEl',
			onTap: pswp.toggleDesktopZoom
		},
		{
			name: 'counter',
			option: 'counterEl',
			onInit: function(el) {
				_indexIndicator = el;
			}
		},
		{
			name: 'button--close',
			option: 'closeEl',
			onTap: pswp.close
		},
		{
			name: 'button--arrow--left',
			option: 'arrowEl',
			onTap: pswp.prev
		},
		{
			name: 'button--arrow--right',
			option: 'arrowEl',
			onTap: pswp.next
		},
		{
			name: 'button--fs',
			option: 'fullscreenEl',
			onTap: function() {
				if(_fullscrenAPI.isFullscreen()) {
					_fullscrenAPI.exit();
				} else {
					_fullscrenAPI.enter();
				}
			}
		},
		{
			name: 'preloader',
			option: 'preloaderEl',
			onInit: function(el) {
				_loadingIndicator = el;
			}
		}

	];

	var _setupUIElements = function() {
		var item,
			classAttr,
			uiElement;

		var loopThroughChildElements = function(sChildren) {
			if(!sChildren) {
				return;
			}

			var l = sChildren.length;
			for(var i = 0; i < l; i++) {
				item = sChildren[i];
				classAttr = item.className;

				for(var a = 0; a < _uiElements.length; a++) {
					uiElement = _uiElements[a];

					if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {

						if( _options[uiElement.option] ) { // if element is not disabled from options

							framework.removeClass(item, 'pswp__element--disabled');
							if(uiElement.onInit) {
								uiElement.onInit(item);
							}

							//item.style.display = 'block';
						} else {
							framework.addClass(item, 'pswp__element--disabled');
							//item.style.display = 'none';
						}
					}
				}
			}
		};
		loopThroughChildElements(_controls.children);

		var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
		if(topBar) {
			loopThroughChildElements( topBar.children );
		}
	};




	ui.init = function() {

		// extend options
		framework.extend(pswp.options, _defaultUIOptions, true);

		// create local link for fast access
		_options = pswp.options;

		// find pswp__ui element
		_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

		// create local link
		_listen = pswp.listen;


		_setupHidingControlsDuringGestures();

		// update controls when slides change
		_listen('beforeChange', ui.update);

		// toggle zoom on double-tap
		_listen('doubleTap', function(point) {
			var initialZoomLevel = pswp.currItem.initialZoomLevel;
			if(pswp.getZoomLevel() !== initialZoomLevel) {
				pswp.zoomTo(initialZoomLevel, point, 333);
			} else {
				pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
			}
		});

		// Allow text selection in caption
		_listen('preventDragEvent', function(e, isDown, preventObj) {
			var t = e.target || e.srcElement;
			if(
				t &&
				t.className && e.type.indexOf('mouse') > -1 &&
				( t.className.indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) )
			) {
				preventObj.prevent = false;
			}
		});

		// bind events for UI
		_listen('bindEvents', function() {
			framework.bind(_controls, 'pswpTap click', _onControlsTap);
			framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

			if(!pswp.likelyTouchDevice) {
				framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
			}
		});

		// unbind events for UI
		_listen('unbindEvents', function() {
			if(!_shareModalHidden) {
				_toggleShareModal();
			}

			if(_idleInterval) {
				clearInterval(_idleInterval);
			}
			framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
			framework.unbind(document, 'mousemove', _onIdleMouseMove);
			framework.unbind(_controls, 'pswpTap click', _onControlsTap);
			framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
			framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

			if(_fullscrenAPI) {
				framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
				if(_fullscrenAPI.isFullscreen()) {
					_options.hideAnimationDuration = 0;
					_fullscrenAPI.exit();
				}
				_fullscrenAPI = null;
			}
		});


		// clean up things when gallery is destroyed
		_listen('destroy', function() {
			if(_options.captionEl) {
				if(_fakeCaptionContainer) {
					_controls.removeChild(_fakeCaptionContainer);
				}
				framework.removeClass(_captionContainer, 'pswp__caption--empty');
			}

			if(_shareModal) {
				_shareModal.children[0].onclick = null;
			}
			framework.removeClass(_controls, 'pswp__ui--over-close');
			framework.addClass( _controls, 'pswp__ui--hidden');
			ui.setIdle(false);
		});


		if(!_options.showAnimationDuration) {
			framework.removeClass( _controls, 'pswp__ui--hidden');
		}
		_listen('initialZoomIn', function() {
			if(_options.showAnimationDuration) {
				framework.removeClass( _controls, 'pswp__ui--hidden');
			}
		});
		_listen('initialZoomOut', function() {
			framework.addClass( _controls, 'pswp__ui--hidden');
		});

		_listen('parseVerticalMargin', _applyNavBarGaps);

		_setupUIElements();

		if(_options.shareEl && _shareButton && _shareModal) {
			_shareModalHidden = true;
		}

		_countNumItems();

		_setupIdle();

		_setupFullscreenAPI();

		_setupLoadingIndicator();
	};

	ui.setIdle = function(isIdle) {
		_isIdle = isIdle;
		_togglePswpClass(_controls, 'ui--idle', isIdle);
	};

	ui.update = function() {
		// Don't update UI if it's hidden
		if(_controlsVisible && pswp.currItem) {

			ui.updateIndexIndicator();

			if(_options.captionEl) {
				_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

				_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
			}

			_overlayUIUpdated = true;

		} else {
			_overlayUIUpdated = false;
		}

		if(!_shareModalHidden) {
			_toggleShareModal();
		}

		_countNumItems();
	};

	ui.updateFullscreen = function(e) {

		if(e) {
			// some browsers change window scroll position during the fullscreen
			// so PhotoSwipe updates it just in case
			setTimeout(function() {
				pswp.setScrollOffset( 0, framework.getScrollY() );
			}, 50);
		}

		// toogle pswp--fs class on root element
		framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
	};

	ui.updateIndexIndicator = function() {
		if(_options.counterEl) {
			_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) +
										_options.indexIndicatorSep +
										_options.getNumItemsFn();
		}
	};

	ui.onGlobalTap = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		if(_blockControlsTap) {
			return;
		}

		if(e.detail && e.detail.pointerType === 'mouse') {

			// close gallery if clicked outside of the image
			if(_hasCloseClass(target)) {
				pswp.close();
				return;
			}

			if(framework.hasClass(target, 'pswp__img')) {
				if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
					if(_options.clickToCloseNonZoomable) {
						pswp.close();
					}
				} else {
					pswp.toggleDesktopZoom(e.detail.releasePoint);
				}
			}

		} else {

			// tap anywhere (except buttons) to toggle visibility of controls
			if(_options.tapToToggleControls) {
				if(_controlsVisible) {
					ui.hideControls();
				} else {
					ui.showControls();
				}
			}

			// tap to close gallery
			if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
				pswp.close();
				return;
			}

		}
	};
	ui.onMouseOver = function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;

		// add class when mouse is over an element that should close the gallery
		_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
	};

	ui.hideControls = function() {
		framework.addClass(_controls,'pswp__ui--hidden');
		_controlsVisible = false;
	};

	ui.showControls = function() {
		_controlsVisible = true;
		if(!_overlayUIUpdated) {
			ui.update();
		}
		framework.removeClass(_controls,'pswp__ui--hidden');
	};

	ui.supportsFullscreen = function() {
		var d = document;
		return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
	};

	ui.getFullscreenAPI = function() {
		var dE = document.documentElement,
			api,
			tF = 'fullscreenchange';

		if (dE.requestFullscreen) {
			api = {
				enterK: 'requestFullscreen',
				exitK: 'exitFullscreen',
				elementK: 'fullscreenElement',
				eventK: tF
			};

		} else if(dE.mozRequestFullScreen ) {
			api = {
				enterK: 'mozRequestFullScreen',
				exitK: 'mozCancelFullScreen',
				elementK: 'mozFullScreenElement',
				eventK: 'moz' + tF
			};



		} else if(dE.webkitRequestFullscreen) {
			api = {
				enterK: 'webkitRequestFullscreen',
				exitK: 'webkitExitFullscreen',
				elementK: 'webkitFullscreenElement',
				eventK: 'webkit' + tF
			};

		} else if(dE.msRequestFullscreen) {
			api = {
				enterK: 'msRequestFullscreen',
				exitK: 'msExitFullscreen',
				elementK: 'msFullscreenElement',
				eventK: 'MSFullscreenChange'
			};
		}

		if(api) {
			api.enter = function() {
				// disable close-on-scroll in fullscreen
				_initalCloseOnScrollValue = _options.closeOnScroll;
				_options.closeOnScroll = false;

				if(this.enterK === 'webkitRequestFullscreen') {
					pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
				} else {
					return pswp.template[this.enterK]();
				}
			};
			api.exit = function() {
				_options.closeOnScroll = _initalCloseOnScrollValue;

				return document[this.exitK]();

			};
			api.isFullscreen = function() { return document[this.elementK]; };
		}

		return api;
	};



};
return PhotoSwipeUI_Default;


});

/*! PhotoSwipe - v4.1.0 - 2015-07-11
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
(function (root, factory) { 
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.PhotoSwipe = factory();
	}
})(this, function () {

	'use strict';
	var PhotoSwipe = function(template, UiClass, items, options){

/*>>framework-bridge*/
/**
 *
 * Set of generic functions used by gallery.
 * 
 * You're free to modify anything here as long as functionality is kept.
 * 
 */
var framework = {
	features: null,
	bind: function(target, type, listener, unbind) {
		var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
		type = type.split(' ');
		for(var i = 0; i < type.length; i++) {
			if(type[i]) {
				target[methodName]( type[i], listener, false);
			}
		}
	},
	isArray: function(obj) {
		return (obj instanceof Array);
	},
	createEl: function(classes, tag) {
		var el = document.createElement(tag || 'div');
		if(classes) {
			el.className = classes;
		}
		return el;
	},
	getScrollY: function() {
		var yOffset = window.pageYOffset;
		return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
	},
	unbind: function(target, type, listener) {
		framework.bind(target,type,listener,true);
	},
	removeClass: function(el, className) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
	},
	addClass: function(el, className) {
		if( !framework.hasClass(el,className) ) {
			el.className += (el.className ? ' ' : '') + className;
		}
	},
	hasClass: function(el, className) {
		return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
	},
	getChildByClass: function(parentEl, childClassName) {
		var node = parentEl.firstChild;
		while(node) {
			if( framework.hasClass(node, childClassName) ) {
				return node;
			}
			node = node.nextSibling;
		}
	},
	arraySearch: function(array, value, key) {
		var i = array.length;
		while(i--) {
			if(array[i][key] === value) {
				return i;
			} 
		}
		return -1;
	},
	extend: function(o1, o2, preventOverwrite) {
		for (var prop in o2) {
			if (o2.hasOwnProperty(prop)) {
				if(preventOverwrite && o1.hasOwnProperty(prop)) {
					continue;
				}
				o1[prop] = o2[prop];
			}
		}
	},
	easing: {
		sine: {
			out: function(k) {
				return Math.sin(k * (Math.PI / 2));
			},
			inOut: function(k) {
				return - (Math.cos(Math.PI * k) - 1) / 2;
			}
		},
		cubic: {
			out: function(k) {
				return --k * k * k + 1;
			}
		}
		/*
			elastic: {
				out: function ( k ) {

					var s, a = 0.1, p = 0.4;
					if ( k === 0 ) return 0;
					if ( k === 1 ) return 1;
					if ( !a || a < 1 ) { a = 1; s = p / 4; }
					else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
					return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

				},
			},
			back: {
				out: function ( k ) {
					var s = 1.70158;
					return --k * k * ( ( s + 1 ) * k + s ) + 1;
				}
			}
		*/
	},

	/**
	 * 
	 * @return {object}
	 * 
	 * {
	 *  raf : request animation frame function
	 *  caf : cancel animation frame function
	 *  transfrom : transform property key (with vendor), or null if not supported
	 *  oldIE : IE8 or below
	 * }
	 * 
	 */
	detectFeatures: function() {
		if(framework.features) {
			return framework.features;
		}
		var helperEl = framework.createEl(),
			helperStyle = helperEl.style,
			vendor = '',
			features = {};

		// IE8 and below
		features.oldIE = document.all && !document.addEventListener;

		features.touch = 'ontouchstart' in window;

		if(window.requestAnimationFrame) {
			features.raf = window.requestAnimationFrame;
			features.caf = window.cancelAnimationFrame;
		}

		features.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;

		// fix false-positive detection of old Android in new IE
		// (IE11 ua string contains "Android 4.0")
		
		if(!features.pointerEvent) { 

			var ua = navigator.userAgent;

			// Detect if device is iPhone or iPod and if it's older than iOS 8
			// http://stackoverflow.com/a/14223920
			// 
			// This detection is made because of buggy top/bottom toolbars
			// that don't trigger window.resize event.
			// For more info refer to _isFixedPosition variable in core.js

			if (/iP(hone|od)/.test(navigator.platform)) {
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				if(v && v.length > 0) {
					v = parseInt(v[1], 10);
					if(v >= 1 && v < 8 ) {
						features.isOldIOSPhone = true;
					}
				}
			}

			// Detect old Android (before KitKat)
			// due to bugs related to position:fixed
			// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
			
			var match = ua.match(/Android\s([0-9\.]*)/);
			var androidversion =  match ? match[1] : 0;
			androidversion = parseFloat(androidversion);
			if(androidversion >= 1 ) {
				if(androidversion < 4.4) {
					features.isOldAndroid = true; // for fixed position bug & performance
				}
				features.androidVersion = androidversion; // for touchend bug
			}	
			features.isMobileOpera = /opera mini|opera mobi/i.test(ua);

			// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
		}
		
		var styleChecks = ['transform', 'perspective', 'animationName'],
			vendors = ['', 'webkit','Moz','ms','O'],
			styleCheckItem,
			styleName;

		for(var i = 0; i < 4; i++) {
			vendor = vendors[i];

			for(var a = 0; a < 3; a++) {
				styleCheckItem = styleChecks[a];

				// uppercase first letter of property name, if vendor is present
				styleName = vendor + (vendor ? 
										styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : 
										styleCheckItem);
			
				if(!features[styleCheckItem] && styleName in helperStyle ) {
					features[styleCheckItem] = styleName;
				}
			}

			if(vendor && !features.raf) {
				vendor = vendor.toLowerCase();
				features.raf = window[vendor+'RequestAnimationFrame'];
				if(features.raf) {
					features.caf = window[vendor+'CancelAnimationFrame'] || 
									window[vendor+'CancelRequestAnimationFrame'];
				}
			}
		}
			
		if(!features.raf) {
			var lastTime = 0;
			features.raf = function(fn) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { fn(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
			features.caf = function(id) { clearTimeout(id); };
		}

		// Detect SVG support
		features.svg = !!document.createElementNS && 
						!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

		framework.features = features;

		return features;
	}
};

framework.detectFeatures();

// Override addEventListener for old versions of IE
if(framework.features.oldIE) {

	framework.bind = function(target, type, listener, unbind) {
		
		type = type.split(' ');

		var methodName = (unbind ? 'detach' : 'attach') + 'Event',
			evName,
			_handleEv = function() {
				listener.handleEvent.call(listener);
			};

		for(var i = 0; i < type.length; i++) {
			evName = type[i];
			if(evName) {

				if(typeof listener === 'object' && listener.handleEvent) {
					if(!unbind) {
						listener['oldIE' + evName] = _handleEv;
					} else {
						if(!listener['oldIE' + evName]) {
							return false;
						}
					}

					target[methodName]( 'on' + evName, listener['oldIE' + evName]);
				} else {
					target[methodName]( 'on' + evName, listener);
				}

			}
		}
	};
	
}

/*>>framework-bridge*/

/*>>core*/
//function(template, UiClass, items, options)

var self = this;

/**
 * Static vars, don't change unless you know what you're doing.
 */
var DOUBLE_TAP_RADIUS = 25, 
	NUM_HOLDERS = 3;

/**
 * Options
 */
var _options = {
	allowPanToNext:true,
	spacing: 0.12,
	bgOpacity: 1,
	mouseUsed: false,
	loop: true,
	pinchToClose: true,
	closeOnScroll: true,
	closeOnVerticalDrag: true,
	verticalDragRange: 0.75,
	hideAnimationDuration: 333,
	showAnimationDuration: 333,
	showHideOpacity: false,
	focus: true,
	escKey: true,
	arrowKeys: true,
	mainScrollEndFriction: 0.35,
	panEndFriction: 0.35,
	isClickableElement: function(el) {
        return el.tagName === 'A';
    },
    getDoubleTapZoom: function(isMouseClick, item) {
    	if(isMouseClick) {
    		return 1;
    	} else {
    		return item.initialZoomLevel < 0.7 ? 1 : 1.33;
    	}
    },
    maxSpreadZoom: 1.33,
	modal: true,

	// not fully implemented yet
	scaleMode: 'fit', // TODO
	alwaysFadeIn: false // TODO
};
framework.extend(_options, options);


/**
 * Private helper variables & functions
 */

var _getEmptyPoint = function() { 
		return {x:0,y:0}; 
	};

var _isOpen,
	_isDestroying,
	_closedByScroll,
	_currentItemIndex,
	_containerStyle,
	_containerShiftIndex,
	_currPanDist = _getEmptyPoint(),
	_startPanOffset = _getEmptyPoint(),
	_panOffset = _getEmptyPoint(),
	_upMoveEvents, // drag move, drag end & drag cancel events array
	_downEvents, // drag start events array
	_globalEventHandlers,
	_viewportSize = {},
	_currZoomLevel,
	_startZoomLevel,
	_translatePrefix,
	_translateSufix,
	_updateSizeInterval,
	_itemsNeedUpdate,
	_currPositionIndex = 0,
	_offset = {},
	_slideSize = _getEmptyPoint(), // size of slide area, including spacing
	_itemHolders,
	_prevItemIndex,
	_indexDiff = 0, // difference of indexes since last content update
	_dragStartEvent,
	_dragMoveEvent,
	_dragEndEvent,
	_dragCancelEvent,
	_transformKey,
	_pointerEventEnabled,
	_isFixedPosition = true,
	_likelyTouchDevice,
	_modules = [],
	_requestAF,
	_cancelAF,
	_initalClassName,
	_initalWindowScrollY,
	_oldIE,
	_currentWindowScrollY,
	_features,
	_windowVisibleSize = {},
	_renderMaxResolution = false,

	// Registers PhotoSWipe module (History, Controller ...)
	_registerModule = function(name, module) {
		framework.extend(self, module.publicMethods);
		_modules.push(name);
	},

	_getLoopedId = function(index) {
		var numSlides = _getNumItems();
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	
	// Micro bind/trigger
	_listeners = {},
	_listen = function(name, fn) {
		if(!_listeners[name]) {
			_listeners[name] = [];
		}
		return _listeners[name].push(fn);
	},
	_shout = function(name) {
		var listeners = _listeners[name];

		if(listeners) {
			var args = Array.prototype.slice.call(arguments);
			args.shift();

			for(var i = 0; i < listeners.length; i++) {
				listeners[i].apply(self, args);
			}
		}
	},

	_getCurrentTime = function() {
		return new Date().getTime();
	},
	_applyBgOpacity = function(opacity) {
		_bgOpacity = opacity;
		self.bg.style.opacity = opacity * _options.bgOpacity;
	},

	_applyZoomTransform = function(styleObj,x,y,zoom,item) {
		if(!_renderMaxResolution || (item && item !== self.currItem) ) {
			zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);	
		}
			
		styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
	},
	_applyCurrentZoomPan = function( allowRenderResolution ) {
		if(_currZoomElementStyle) {

			if(allowRenderResolution) {
				if(_currZoomLevel > self.currItem.fitRatio) {
					if(!_renderMaxResolution) {
						_setImageSize(self.currItem, false, true);
						_renderMaxResolution = true;
					}
				} else {
					if(_renderMaxResolution) {
						_setImageSize(self.currItem);
						_renderMaxResolution = false;
					}
				}
			}
			

			_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
		}
	},
	_applyZoomPanToItem = function(item) {
		if(item.container) {

			_applyZoomTransform(item.container.style, 
								item.initialPosition.x, 
								item.initialPosition.y, 
								item.initialZoomLevel,
								item);
		}
	},
	_setTranslateX = function(x, elStyle) {
		elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
	},
	_moveMainScroll = function(x, dragging) {

		if(!_options.loop && dragging) {
			// if of current item during scroll (float)
			var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x)/_slideSize.x; 
			var delta = Math.round(x - _mainScrollPos.x);

			if( (newSlideIndexOffset < 0 && delta > 0) || 
				(newSlideIndexOffset >= _getNumItems()-1 && delta < 0) ) {
				x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
			} 
		}
		
		_mainScrollPos.x = x;
		_setTranslateX(x, _containerStyle);
	},
	_calculatePanOffset = function(axis, zoomLevel) {
		var m = _midZoomPoint[axis] - _offset[axis];
		return _startPanOffset[axis] + _currPanDist[axis] + m - m * ( zoomLevel / _startZoomLevel );
	},
	
	_equalizePoints = function(p1, p2) {
		p1.x = p2.x;
		p1.y = p2.y;
		if(p2.id) {
			p1.id = p2.id;
		}
	},
	_roundPoint = function(p) {
		p.x = Math.round(p.x);
		p.y = Math.round(p.y);
	},

	_mouseMoveTimeout = null,
	_onFirstMouseMove = function() {
		// Wait until mouse move event is fired at least twice during 100ms
		// We do this, because some mobile browsers trigger it on touchstart
		if(_mouseMoveTimeout ) { 
			framework.unbind(document, 'mousemove', _onFirstMouseMove);
			framework.addClass(template, 'pswp--has_mouse');
			_options.mouseUsed = true;
			_shout('mouseUsed');
		}
		_mouseMoveTimeout = setTimeout(function() {
			_mouseMoveTimeout = null;
		}, 100);
	},

	_bindEvents = function() {
		framework.bind(document, 'keydown', self);

		if(_features.transform) {
			// don't bind click event in browsers that don't support transform (mostly IE8)
			framework.bind(self.scrollWrap, 'click', self);
		}
		

		if(!_options.mouseUsed) {
			framework.bind(document, 'mousemove', _onFirstMouseMove);
		}

		framework.bind(window, 'resize scroll', self);

		_shout('bindEvents');
	},

	_unbindEvents = function() {
		framework.unbind(window, 'resize', self);
		framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
		framework.unbind(document, 'keydown', self);
		framework.unbind(document, 'mousemove', _onFirstMouseMove);

		if(_features.transform) {
			framework.unbind(self.scrollWrap, 'click', self);
		}

		if(_isDragging) {
			framework.unbind(window, _upMoveEvents, self);
		}

		_shout('unbindEvents');
	},
	
	_calculatePanBounds = function(zoomLevel, update) {
		var bounds = _calculateItemSize( self.currItem, _viewportSize, zoomLevel );
		if(update) {
			_currPanBounds = bounds;
		}
		return bounds;
	},
	
	_getMinZoomLevel = function(item) {
		if(!item) {
			item = self.currItem;
		}
		return item.initialZoomLevel;
	},
	_getMaxZoomLevel = function(item) {
		if(!item) {
			item = self.currItem;
		}
		return item.w > 0 ? _options.maxSpreadZoom : 1;
	},

	// Return true if offset is out of the bounds
	_modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
		if(destZoomLevel === self.currItem.initialZoomLevel) {
			destPanOffset[axis] = self.currItem.initialPosition[axis];
			return true;
		} else {
			destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel); 

			if(destPanOffset[axis] > destPanBounds.min[axis]) {
				destPanOffset[axis] = destPanBounds.min[axis];
				return true;
			} else if(destPanOffset[axis] < destPanBounds.max[axis] ) {
				destPanOffset[axis] = destPanBounds.max[axis];
				return true;
			}
		}
		return false;
	},

	_setupTransforms = function() {

		if(_transformKey) {
			// setup 3d transforms
			var allow3dTransform = _features.perspective && !_likelyTouchDevice;
			_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
			_translateSufix = _features.perspective ? ', 0px)' : ')';	
			return;
		}

		// Override zoom/pan/move functions in case old browser is used (most likely IE)
		// (so they use left/top/width/height, instead of CSS transform)
	
		_transformKey = 'left';
		framework.addClass(template, 'pswp--ie');

		_setTranslateX = function(x, elStyle) {
			elStyle.left = x + 'px';
		};
		_applyZoomPanToItem = function(item) {

			var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
				s = item.container.style,
				w = zoomRatio * item.w,
				h = zoomRatio * item.h;

			s.width = w + 'px';
			s.height = h + 'px';
			s.left = item.initialPosition.x + 'px';
			s.top = item.initialPosition.y + 'px';

		};
		_applyCurrentZoomPan = function() {
			if(_currZoomElementStyle) {

				var s = _currZoomElementStyle,
					item = self.currItem,
					zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
					w = zoomRatio * item.w,
					h = zoomRatio * item.h;

				s.width = w + 'px';
				s.height = h + 'px';


				s.left = _panOffset.x + 'px';
				s.top = _panOffset.y + 'px';
			}
			
		};
	},

	_onKeyDown = function(e) {
		var keydownAction = '';
		if(_options.escKey && e.keyCode === 27) { 
			keydownAction = 'close';
		} else if(_options.arrowKeys) {
			if(e.keyCode === 37) {
				keydownAction = 'prev';
			} else if(e.keyCode === 39) { 
				keydownAction = 'next';
			}
		}

		if(keydownAction) {
			// don't do anything if special key pressed to prevent from overriding default browser actions
			// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
			if( !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey ) {
				if(e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				} 
				self[keydownAction]();
			}
		}
	},

	_onGlobalClick = function(e) {
		if(!e) {
			return;
		}

		// don't allow click event to pass through when triggering after drag or some other gesture
		if(_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
			e.preventDefault();
			e.stopPropagation();
		}
	},

	_updatePageScrollOffset = function() {
		self.setScrollOffset(0, framework.getScrollY());		
	};
	


	



// Micro animation engine
var _animations = {},
	_numAnimations = 0,
	_stopAnimation = function(name) {
		if(_animations[name]) {
			if(_animations[name].raf) {
				_cancelAF( _animations[name].raf );
			}
			_numAnimations--;
			delete _animations[name];
		}
	},
	_registerStartAnimation = function(name) {
		if(_animations[name]) {
			_stopAnimation(name);
		}
		if(!_animations[name]) {
			_numAnimations++;
			_animations[name] = {};
		}
	},
	_stopAllAnimations = function() {
		for (var prop in _animations) {

			if( _animations.hasOwnProperty( prop ) ) {
				_stopAnimation(prop);
			} 
			
		}
	},
	_animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
		var startAnimTime = _getCurrentTime(), t;
		_registerStartAnimation(name);

		var animloop = function(){
			if ( _animations[name] ) {
				
				t = _getCurrentTime() - startAnimTime; // time diff
				//b - beginning (start prop)
				//d - anim duration

				if ( t >= d ) {
					_stopAnimation(name);
					onUpdate(endProp);
					if(onComplete) {
						onComplete();
					}
					return;
				}
				onUpdate( (endProp - b) * easingFn(t/d) + b );

				_animations[name].raf = _requestAF(animloop);
			}
		};
		animloop();
	};
	


var publicMethods = {

	// make a few local variables and functions public
	shout: _shout,
	listen: _listen,
	viewportSize: _viewportSize,
	options: _options,

	isMainScrollAnimating: function() {
		return _mainScrollAnimating;
	},
	getZoomLevel: function() {
		return _currZoomLevel;
	},
	getCurrentIndex: function() {
		return _currentItemIndex;
	},
	isDragging: function() {
		return _isDragging;
	},	
	isZooming: function() {
		return _isZooming;
	},
	setScrollOffset: function(x,y) {
		_offset.x = x;
		_currentWindowScrollY = _offset.y = y;
		_shout('updateScrollOffset', _offset);
	},
	applyZoomPan: function(zoomLevel,panX,panY,allowRenderResolution) {
		_panOffset.x = panX;
		_panOffset.y = panY;
		_currZoomLevel = zoomLevel;
		_applyCurrentZoomPan( allowRenderResolution );
	},

	init: function() {

		if(_isOpen || _isDestroying) {
			return;
		}

		var i;

		self.framework = framework; // basic function
		self.template = template; // root DOM element of PhotoSwipe
		self.bg = framework.getChildByClass(template, 'pswp__bg');

		_initalClassName = template.className;
		_isOpen = true;
				
		_features = framework.detectFeatures();
		_requestAF = _features.raf;
		_cancelAF = _features.caf;
		_transformKey = _features.transform;
		_oldIE = _features.oldIE;
		
		self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
		self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');

		_containerStyle = self.container.style; // for fast access

		// Objects that hold slides (there are only 3 in DOM)
		self.itemHolders = _itemHolders = [
			{el:self.container.children[0] , wrap:0, index: -1},
			{el:self.container.children[1] , wrap:0, index: -1},
			{el:self.container.children[2] , wrap:0, index: -1}
		];

		// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
		_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';

		_setupTransforms();

		// Setup global events
		_globalEventHandlers = {
			resize: self.updateSize,
			scroll: _updatePageScrollOffset,
			keydown: _onKeyDown,
			click: _onGlobalClick
		};

		// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
		// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
		var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
		if(!_features.animationName || !_features.transform || oldPhone) {
			_options.showAnimationDuration = _options.hideAnimationDuration = 0;
		}

		// init modules
		for(i = 0; i < _modules.length; i++) {
			self['init' + _modules[i]]();
		}
		
		// init
		if(UiClass) {
			var ui = self.ui = new UiClass(self, framework);
			ui.init();
		}

		_shout('firstUpdate');
		_currentItemIndex = _currentItemIndex || _options.index || 0;
		// validate index
		if( isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems() ) {
			_currentItemIndex = 0;
		}
		self.currItem = _getItemAt( _currentItemIndex );

		
		if(_features.isOldIOSPhone || _features.isOldAndroid) {
			_isFixedPosition = false;
		}
		
		template.setAttribute('aria-hidden', 'false');
		if(_options.modal) {
			if(!_isFixedPosition) {
				template.style.position = 'absolute';
				template.style.top = framework.getScrollY() + 'px';
			} else {
				template.style.position = 'fixed';
			}
		}

		if(_currentWindowScrollY === undefined) {
			_shout('initialLayout');
			_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
		}
		
		// add classes to root element of PhotoSwipe
		var rootClasses = 'pswp--open ';
		if(_options.mainClass) {
			rootClasses += _options.mainClass + ' ';
		}
		if(_options.showHideOpacity) {
			rootClasses += 'pswp--animate_opacity ';
		}
		rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
		rootClasses += _features.animationName ? ' pswp--css_animation' : '';
		rootClasses += _features.svg ? ' pswp--svg' : '';
		framework.addClass(template, rootClasses);

		self.updateSize();

		// initial update
		_containerShiftIndex = -1;
		_indexDiff = null;
		for(i = 0; i < NUM_HOLDERS; i++) {
			_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
		}

		if(!_oldIE) {
			framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
		}	

		_listen('initialZoomInEnd', function() {
			self.setContent(_itemHolders[0], _currentItemIndex-1);
			self.setContent(_itemHolders[2], _currentItemIndex+1);

			_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';

			if(_options.focus) {
				// focus causes layout, 
				// which causes lag during the animation, 
				// that's why we delay it untill the initial zoom transition ends
				template.focus();
			}
			 

			_bindEvents();
		});

		// set content for center slide (first time)
		self.setContent(_itemHolders[1], _currentItemIndex);
		
		self.updateCurrItem();

		_shout('afterInit');

		if(!_isFixedPosition) {

			// On all versions of iOS lower than 8.0, we check size of viewport every second.
			// 
			// This is done to detect when Safari top & bottom bars appear, 
			// as this action doesn't trigger any events (like resize). 
			// 
			// On iOS8 they fixed this.
			// 
			// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.
			
			_updateSizeInterval = setInterval(function() {
				if(!_numAnimations && !_isDragging && !_isZooming && (_currZoomLevel === self.currItem.initialZoomLevel)  ) {
					self.updateSize();
				}
			}, 1000);
		}

		framework.addClass(template, 'pswp--visible');
	},

	// Closes the gallery, then destroy it
	close: function() {
		if(!_isOpen) {
			return;
		}

		_isOpen = false;
		_isDestroying = true;
		_shout('close');
		_unbindEvents();

		_showOrHide( self.currItem, null, true, self.destroy);
	},

	// destroys gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
	destroy: function() {
		_shout('destroy');

		if(_showOrHideTimeout) {
			clearTimeout(_showOrHideTimeout);
		}
		
		template.setAttribute('aria-hidden', 'true');
		template.className = _initalClassName;

		if(_updateSizeInterval) {
			clearInterval(_updateSizeInterval);
		}

		framework.unbind(self.scrollWrap, _downEvents, self);

		// we unbind lost event at the end, as closing animation may depend on it
		framework.unbind(window, 'scroll', self);

		_stopDragUpdateLoop();

		_stopAllAnimations();

		_listeners = null;
	},

	/**
	 * Pan image to position
	 * @param {Number} x     
	 * @param {Number} y     
	 * @param {Boolean} force Will ignore bounds if set to true.
	 */
	panTo: function(x,y,force) {
		if(!force) {
			if(x > _currPanBounds.min.x) {
				x = _currPanBounds.min.x;
			} else if(x < _currPanBounds.max.x) {
				x = _currPanBounds.max.x;
			}

			if(y > _currPanBounds.min.y) {
				y = _currPanBounds.min.y;
			} else if(y < _currPanBounds.max.y) {
				y = _currPanBounds.max.y;
			}
		}
		
		_panOffset.x = x;
		_panOffset.y = y;
		_applyCurrentZoomPan();
	},
	
	handleEvent: function (e) {
		e = e || window.event;
		if(_globalEventHandlers[e.type]) {
			_globalEventHandlers[e.type](e);
		}
	},


	goTo: function(index) {

		index = _getLoopedId(index);

		var diff = index - _currentItemIndex;
		_indexDiff = diff;

		_currentItemIndex = index;
		self.currItem = _getItemAt( _currentItemIndex );
		_currPositionIndex -= diff;
		
		_moveMainScroll(_slideSize.x * _currPositionIndex);
		

		_stopAllAnimations();
		_mainScrollAnimating = false;

		self.updateCurrItem();
	},
	next: function() {
		self.goTo( _currentItemIndex + 1);
	},
	prev: function() {
		self.goTo( _currentItemIndex - 1);
	},

	// update current zoom/pan objects
	updateCurrZoomItem: function(emulateSetContent) {
		if(emulateSetContent) {
			_shout('beforeChange', 0);
		}

		// itemHolder[1] is middle (current) item
		if(_itemHolders[1].el.children.length) {
			var zoomElement = _itemHolders[1].el.children[0];
			if( framework.hasClass(zoomElement, 'pswp__zoom-wrap') ) {
				_currZoomElementStyle = zoomElement.style;
			} else {
				_currZoomElementStyle = null;
			}
		} else {
			_currZoomElementStyle = null;
		}
		
		_currPanBounds = self.currItem.bounds;	
		_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;

		_panOffset.x = _currPanBounds.center.x;
		_panOffset.y = _currPanBounds.center.y;

		if(emulateSetContent) {
			_shout('afterChange');
		}
	},


	invalidateCurrItems: function() {
		_itemsNeedUpdate = true;
		for(var i = 0; i < NUM_HOLDERS; i++) {
			if( _itemHolders[i].item ) {
				_itemHolders[i].item.needsUpdate = true;
			}
		}
	},

	updateCurrItem: function(beforeAnimation) {

		if(_indexDiff === 0) {
			return;
		}

		var diffAbs = Math.abs(_indexDiff),
			tempHolder;

		if(beforeAnimation && diffAbs < 2) {
			return;
		}


		self.currItem = _getItemAt( _currentItemIndex );
		_renderMaxResolution = false;
		
		_shout('beforeChange', _indexDiff);

		if(diffAbs >= NUM_HOLDERS) {
			_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
			diffAbs = NUM_HOLDERS;
		}
		for(var i = 0; i < diffAbs; i++) {
			if(_indexDiff > 0) {
				tempHolder = _itemHolders.shift();
				_itemHolders[NUM_HOLDERS-1] = tempHolder; // move first to last

				_containerShiftIndex++;
				_setTranslateX( (_containerShiftIndex+2) * _slideSize.x, tempHolder.el.style);
				self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
			} else {
				tempHolder = _itemHolders.pop();
				_itemHolders.unshift( tempHolder ); // move last to first

				_containerShiftIndex--;
				_setTranslateX( _containerShiftIndex * _slideSize.x, tempHolder.el.style);
				self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
			}
			
		}

		// reset zoom/pan on previous item
		if(_currZoomElementStyle && Math.abs(_indexDiff) === 1) {

			var prevItem = _getItemAt(_prevItemIndex);
			if(prevItem.initialZoomLevel !== _currZoomLevel) {
				_calculateItemSize(prevItem , _viewportSize );
				_setImageSize(prevItem);
				_applyZoomPanToItem( prevItem ); 				
			}

		}

		// reset diff after update
		_indexDiff = 0;

		self.updateCurrZoomItem();

		_prevItemIndex = _currentItemIndex;

		_shout('afterChange');
		
	},



	updateSize: function(force) {
		
		if(!_isFixedPosition && _options.modal) {
			var windowScrollY = framework.getScrollY();
			if(_currentWindowScrollY !== windowScrollY) {
				template.style.top = windowScrollY + 'px';
				_currentWindowScrollY = windowScrollY;
			}
			if(!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
				return;
			}
			_windowVisibleSize.x = window.innerWidth;
			_windowVisibleSize.y = window.innerHeight;

			//template.style.width = _windowVisibleSize.x + 'px';
			template.style.height = _windowVisibleSize.y + 'px';
		}



		_viewportSize.x = self.scrollWrap.clientWidth;
		_viewportSize.y = self.scrollWrap.clientHeight;

		_updatePageScrollOffset();

		_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
		_slideSize.y = _viewportSize.y;

		_moveMainScroll(_slideSize.x * _currPositionIndex);

		_shout('beforeResize'); // even may be used for example to switch image sources


		// don't re-calculate size on inital size update
		if(_containerShiftIndex !== undefined) {

			var holder,
				item,
				hIndex;

			for(var i = 0; i < NUM_HOLDERS; i++) {
				holder = _itemHolders[i];
				_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, holder.el.style);

				hIndex = _currentItemIndex+i-1;

				if(_options.loop && _getNumItems() > 2) {
					hIndex = _getLoopedId(hIndex);
				}

				// update zoom level on items and refresh source (if needsUpdate)
				item = _getItemAt( hIndex );

				// re-render gallery item if `needsUpdate`,
				// or doesn't have `bounds` (entirely new slide object)
				if( item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds) ) {

					self.cleanSlide( item );
					
					self.setContent( holder, hIndex );

					// if "center" slide
					if(i === 1) {
						self.currItem = item;
						self.updateCurrZoomItem(true);
					}

					item.needsUpdate = false;

				} else if(holder.index === -1 && hIndex >= 0) {
					// add content first time
					self.setContent( holder, hIndex );
				}
				if(item && item.container) {
					_calculateItemSize(item, _viewportSize);
					_setImageSize(item);
					_applyZoomPanToItem( item );
				}
				
			}
			_itemsNeedUpdate = false;
		}	

		_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
		_currPanBounds = self.currItem.bounds;

		if(_currPanBounds) {
			_panOffset.x = _currPanBounds.center.x;
			_panOffset.y = _currPanBounds.center.y;
			_applyCurrentZoomPan( true );
		}
		
		_shout('resize');
	},
	
	// Zoom current item to
	zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
		/*
			if(destZoomLevel === 'fit') {
				destZoomLevel = self.currItem.fitRatio;
			} else if(destZoomLevel === 'fill') {
				destZoomLevel = self.currItem.fillRatio;
			}
		*/

		if(centerPoint) {
			_startZoomLevel = _currZoomLevel;
			_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x ;
			_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y ;
			_equalizePoints(_startPanOffset, _panOffset);
		}

		var destPanBounds = _calculatePanBounds(destZoomLevel, false),
			destPanOffset = {};

		_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
		_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);

		var initialZoomLevel = _currZoomLevel;
		var initialPanOffset = {
			x: _panOffset.x,
			y: _panOffset.y
		};

		_roundPoint(destPanOffset);

		// _startZoomLevel = destZoomLevel;
		var onUpdate = function(now) {
			if(now === 1) {
				_currZoomLevel = destZoomLevel;
				_panOffset.x = destPanOffset.x;
				_panOffset.y = destPanOffset.y;
			} else {
				_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
				_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
				_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
			}

			if(updateFn) {
				updateFn(now);
			}

			_applyCurrentZoomPan( now === 1 );
		};

		if(speed) {
			_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
		} else {
			onUpdate(1);
		}
	}


};


/*>>core*/

/*>>gestures*/
/**
 * Mouse/touch/pointer event handlers.
 * 
 * separated from @core.js for readability
 */

var MIN_SWIPE_DISTANCE = 30,
	DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe

var _gestureStartTime,
	_gestureCheckSpeedTime,

	// pool of objects that are used during dragging of zooming
	p = {}, // first point
	p2 = {}, // second point (for zoom gesture)
	delta = {},
	_currPoint = {},
	_startPoint = {},
	_currPointers = [],
	_startMainScrollPos = {},
	_releaseAnimData,
	_posPoints = [], // array of points during dragging, used to determine type of gesture
	_tempPoint = {},

	_isZoomingIn,
	_verticalDragInitiated,
	_oldAndroidTouchEndTimeout,
	_currZoomedItemIndex = 0,
	_centerPoint = _getEmptyPoint(),
	_lastReleaseTime = 0,
	_isDragging, // at least one pointer is down
	_isMultitouch, // at least two _pointers are down
	_zoomStarted, // zoom level changed during zoom gesture
	_moved,
	_dragAnimFrame,
	_mainScrollShifted,
	_currentPoints, // array of current touch points
	_isZooming,
	_currPointsDistance,
	_startPointsDistance,
	_currPanBounds,
	_mainScrollPos = _getEmptyPoint(),
	_currZoomElementStyle,
	_mainScrollAnimating, // true, if animation after swipe gesture is running
	_midZoomPoint = _getEmptyPoint(),
	_currCenterPoint = _getEmptyPoint(),
	_direction,
	_isFirstMove,
	_opacityChanged,
	_bgOpacity,
	_wasOverInitialZoom,

	_isEqualPoints = function(p1, p2) {
		return p1.x === p2.x && p1.y === p2.y;
	},
	_isNearbyPoints = function(touch0, touch1) {
		return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
	},
	_calculatePointsDistance = function(p1, p2) {
		_tempPoint.x = Math.abs( p1.x - p2.x );
		_tempPoint.y = Math.abs( p1.y - p2.y );
		return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
	},
	_stopDragUpdateLoop = function() {
		if(_dragAnimFrame) {
			_cancelAF(_dragAnimFrame);
			_dragAnimFrame = null;
		}
	},
	_dragUpdateLoop = function() {
		if(_isDragging) {
			_dragAnimFrame = _requestAF(_dragUpdateLoop);
			_renderMovement();
		}
	},
	_canPan = function() {
		return !(_options.scaleMode === 'fit' && _currZoomLevel ===  self.currItem.initialZoomLevel);
	},
	
	// find the closest parent DOM element
	_closestElement = function(el, fn) {
	  	if(!el) {
	  		return false;
	  	}

	  	// don't search elements above pswp__scroll-wrap
	  	if(el.className && el.className.indexOf('pswp__scroll-wrap') > -1 ) {
	  		return false;
	  	}

	  	if( fn(el) ) {
	  		return el;
	  	}

	  	return _closestElement(el.parentNode, fn);
	},

	_preventObj = {},
	_preventDefaultEventBehaviour = function(e, isDown) {
	    _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);

		_shout('preventDragEvent', e, isDown, _preventObj);
		return _preventObj.prevent;

	},
	_convertTouchToPoint = function(touch, p) {
		p.x = touch.pageX;
		p.y = touch.pageY;
		p.id = touch.identifier;
		return p;
	},
	_findCenterOfPoints = function(p1, p2, pCenter) {
		pCenter.x = (p1.x + p2.x) * 0.5;
		pCenter.y = (p1.y + p2.y) * 0.5;
	},
	_pushPosPoint = function(time, x, y) {
		if(time - _gestureCheckSpeedTime > 50) {
			var o = _posPoints.length > 2 ? _posPoints.shift() : {};
			o.x = x;
			o.y = y; 
			_posPoints.push(o);
			_gestureCheckSpeedTime = time;
		}
	},

	_calculateVerticalDragOpacityRatio = function() {
		var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
		return 1 -  Math.abs( yOffset / (_viewportSize.y / 2)  );
	},

	
	// points pool, reused during touch events
	_ePoint1 = {},
	_ePoint2 = {},
	_tempPointsArr = [],
	_tempCounter,
	_getTouchPoints = function(e) {
		// clean up previous points, without recreating array
		while(_tempPointsArr.length > 0) {
			_tempPointsArr.pop();
		}

		if(!_pointerEventEnabled) {
			if(e.type.indexOf('touch') > -1) {

				if(e.touches && e.touches.length > 0) {
					_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
					if(e.touches.length > 1) {
						_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
					}
				}
				
			} else {
				_ePoint1.x = e.pageX;
				_ePoint1.y = e.pageY;
				_ePoint1.id = '';
				_tempPointsArr[0] = _ePoint1;//_ePoint1;
			}
		} else {
			_tempCounter = 0;
			// we can use forEach, as pointer events are supported only in modern browsers
			_currPointers.forEach(function(p) {
				if(_tempCounter === 0) {
					_tempPointsArr[0] = p;
				} else if(_tempCounter === 1) {
					_tempPointsArr[1] = p;
				}
				_tempCounter++;

			});
		}
		return _tempPointsArr;
	},

	_panOrMoveMainScroll = function(axis, delta) {

		var panFriction,
			overDiff = 0,
			newOffset = _panOffset[axis] + delta[axis],
			startOverDiff,
			dir = delta[axis] > 0,
			newMainScrollPosition = _mainScrollPos.x + delta.x,
			mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
			newPanPos,
			newMainScrollPos;

		// calculate fdistance over the bounds and friction
		if(newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
			panFriction = _options.panEndFriction;
			// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
			// Looks not as nice as was expected. Left for history.
			// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
		} else {
			panFriction = 1;
		}
		
		newOffset = _panOffset[axis] + delta[axis] * panFriction;

		// move main scroll or start panning
		if(_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {


			if(!_currZoomElementStyle) {
				
				newMainScrollPos = newMainScrollPosition;

			} else if(_direction === 'h' && axis === 'x' && !_zoomStarted ) {
				
				if(dir) {
					if(newOffset > _currPanBounds.min[axis]) {
						panFriction = _options.panEndFriction;
						overDiff = _currPanBounds.min[axis] - newOffset;
						startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
					}
					
					// drag right
					if( (startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1 ) {
						newMainScrollPos = newMainScrollPosition;
						if(mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
							newMainScrollPos = _startMainScrollPos.x;
						}
					} else {
						if(_currPanBounds.min.x !== _currPanBounds.max.x) {
							newPanPos = newOffset;
						}
						
					}

				} else {

					if(newOffset < _currPanBounds.max[axis] ) {
						panFriction =_options.panEndFriction;
						overDiff = newOffset - _currPanBounds.max[axis];
						startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
					}

					if( (startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1 ) {
						newMainScrollPos = newMainScrollPosition;

						if(mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
							newMainScrollPos = _startMainScrollPos.x;
						}

					} else {
						if(_currPanBounds.min.x !== _currPanBounds.max.x) {
							newPanPos = newOffset;
						}
					}

				}


				//
			}

			if(axis === 'x') {

				if(newMainScrollPos !== undefined) {
					_moveMainScroll(newMainScrollPos, true);
					if(newMainScrollPos === _startMainScrollPos.x) {
						_mainScrollShifted = false;
					} else {
						_mainScrollShifted = true;
					}
				}

				if(_currPanBounds.min.x !== _currPanBounds.max.x) {
					if(newPanPos !== undefined) {
						_panOffset.x = newPanPos;
					} else if(!_mainScrollShifted) {
						_panOffset.x += delta.x * panFriction;
					}
				}

				return newMainScrollPos !== undefined;
			}

		}

		if(!_mainScrollAnimating) {
			
			if(!_mainScrollShifted) {
				if(_currZoomLevel > self.currItem.fitRatio) {
					_panOffset[axis] += delta[axis] * panFriction;
				
				}
			}

			
		}
		
	},

	// Pointerdown/touchstart/mousedown handler
	_onDragStart = function(e) {

		// Allow dragging only via left mouse button.
		// As this handler is not added in IE8 - we ignore e.which
		// 
		// http://www.quirksmode.org/js/events_properties.html
		// https://developer.mozilla.org/en-US/docs/Web/API/event.button
		if(e.type === 'mousedown' && e.button > 0  ) {
			return;
		}

		if(_initialZoomRunning) {
			e.preventDefault();
			return;
		}

		if(_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
			return;
		}

		if(_preventDefaultEventBehaviour(e, true)) {
			e.preventDefault();
		}



		_shout('pointerDown');

		if(_pointerEventEnabled) {
			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
			if(pointerIndex < 0) {
				pointerIndex = _currPointers.length;
			}
			_currPointers[pointerIndex] = {x:e.pageX, y:e.pageY, id: e.pointerId};
		}
		


		var startPointsList = _getTouchPoints(e),
			numPoints = startPointsList.length;

		_currentPoints = null;

		_stopAllAnimations();

		// init drag
		if(!_isDragging || numPoints === 1) {

			

			_isDragging = _isFirstMove = true;
			framework.bind(window, _upMoveEvents, self);

			_isZoomingIn = 
				_wasOverInitialZoom = 
				_opacityChanged = 
				_verticalDragInitiated = 
				_mainScrollShifted = 
				_moved = 
				_isMultitouch = 
				_zoomStarted = false;

			_direction = null;

			_shout('firstTouchStart', startPointsList);

			_equalizePoints(_startPanOffset, _panOffset);

			_currPanDist.x = _currPanDist.y = 0;
			_equalizePoints(_currPoint, startPointsList[0]);
			_equalizePoints(_startPoint, _currPoint);

			//_equalizePoints(_startMainScrollPos, _mainScrollPos);
			_startMainScrollPos.x = _slideSize.x * _currPositionIndex;

			_posPoints = [{
				x: _currPoint.x,
				y: _currPoint.y
			}];

			_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();

			//_mainScrollAnimationEnd(true);
			_calculatePanBounds( _currZoomLevel, true );
			
			// Start rendering
			_stopDragUpdateLoop();
			_dragUpdateLoop();
			
		}

		// init zoom
		if(!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
			_startZoomLevel = _currZoomLevel;
			_zoomStarted = false; // true if zoom changed at least once

			_isZooming = _isMultitouch = true;
			_currPanDist.y = _currPanDist.x = 0;

			_equalizePoints(_startPanOffset, _panOffset);

			_equalizePoints(p, startPointsList[0]);
			_equalizePoints(p2, startPointsList[1]);

			_findCenterOfPoints(p, p2, _currCenterPoint);

			_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
			_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
			_currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
		}


	},

	// Pointermove/touchmove/mousemove handler
	_onDragMove = function(e) {

		e.preventDefault();

		if(_pointerEventEnabled) {
			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
			if(pointerIndex > -1) {
				var p = _currPointers[pointerIndex];
				p.x = e.pageX;
				p.y = e.pageY; 
			}
		}

		if(_isDragging) {
			var touchesList = _getTouchPoints(e);
			if(!_direction && !_moved && !_isZooming) {

				if(_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
					// if main scroll position is shifted – direction is always horizontal
					_direction = 'h';
				} else {
					var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
					// check the direction of movement
					if(Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
						_direction = diff > 0 ? 'h' : 'v';
						_currentPoints = touchesList;
					}
				}
				
			} else {
				_currentPoints = touchesList;
			}
		}	
	},
	// 
	_renderMovement =  function() {

		if(!_currentPoints) {
			return;
		}

		var numPoints = _currentPoints.length;

		if(numPoints === 0) {
			return;
		}

		_equalizePoints(p, _currentPoints[0]);

		delta.x = p.x - _currPoint.x;
		delta.y = p.y - _currPoint.y;

		if(_isZooming && numPoints > 1) {
			// Handle behaviour for more than 1 point

			_currPoint.x = p.x;
			_currPoint.y = p.y;
		
			// check if one of two points changed
			if( !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2) ) {
				return;
			}

			_equalizePoints(p2, _currentPoints[1]);


			if(!_zoomStarted) {
				_zoomStarted = true;
				_shout('zoomGestureStarted');
			}
			
			// Distance between two points
			var pointsDistance = _calculatePointsDistance(p,p2);

			var zoomLevel = _calculateZoomLevel(pointsDistance);

			// slightly over the of initial zoom level
			if(zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
				_wasOverInitialZoom = true;
			}

			// Apply the friction if zoom level is out of the bounds
			var zoomFriction = 1,
				minZoomLevel = _getMinZoomLevel(),
				maxZoomLevel = _getMaxZoomLevel();

			if ( zoomLevel < minZoomLevel ) {
				
				if(_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
					// fade out background if zooming out
					var minusDiff = minZoomLevel - zoomLevel;
					var percent = 1 - minusDiff / (minZoomLevel / 1.2);

					_applyBgOpacity(percent);
					_shout('onPinchClose', percent);
					_opacityChanged = true;
				} else {
					zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
					if(zoomFriction > 1) {
						zoomFriction = 1;
					}
					zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
				}
				
			} else if ( zoomLevel > maxZoomLevel ) {
				// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
				zoomFriction = (zoomLevel - maxZoomLevel) / ( minZoomLevel * 6 );
				if(zoomFriction > 1) {
					zoomFriction = 1;
				}
				zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
			}

			if(zoomFriction < 0) {
				zoomFriction = 0;
			}

			// distance between touch points after friction is applied
			_currPointsDistance = pointsDistance;

			// _centerPoint - The point in the middle of two pointers
			_findCenterOfPoints(p, p2, _centerPoint);
		
			// paning with two pointers pressed
			_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
			_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
			_equalizePoints(_currCenterPoint, _centerPoint);

			_panOffset.x = _calculatePanOffset('x', zoomLevel);
			_panOffset.y = _calculatePanOffset('y', zoomLevel);

			_isZoomingIn = zoomLevel > _currZoomLevel;
			_currZoomLevel = zoomLevel;
			_applyCurrentZoomPan();

		} else {

			// handle behaviour for one point (dragging or panning)

			if(!_direction) {
				return;
			}

			if(_isFirstMove) {
				_isFirstMove = false;

				// subtract drag distance that was used during the detection direction  

				if( Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
					delta.x -= _currentPoints[0].x - _startPoint.x;
				}
				
				if( Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
					delta.y -= _currentPoints[0].y - _startPoint.y;
				}
			}

			_currPoint.x = p.x;
			_currPoint.y = p.y;

			// do nothing if pointers position hasn't changed
			if(delta.x === 0 && delta.y === 0) {
				return;
			}

			if(_direction === 'v' && _options.closeOnVerticalDrag) {
				if(!_canPan()) {
					_currPanDist.y += delta.y;
					_panOffset.y += delta.y;

					var opacityRatio = _calculateVerticalDragOpacityRatio();

					_verticalDragInitiated = true;
					_shout('onVerticalDrag', opacityRatio);

					_applyBgOpacity(opacityRatio);
					_applyCurrentZoomPan();
					return ;
				}
			}

			_pushPosPoint(_getCurrentTime(), p.x, p.y);

			_moved = true;
			_currPanBounds = self.currItem.bounds;
			
			var mainScrollChanged = _panOrMoveMainScroll('x', delta);
			if(!mainScrollChanged) {
				_panOrMoveMainScroll('y', delta);

				_roundPoint(_panOffset);
				_applyCurrentZoomPan();
			}

		}

	},
	
	// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
	_onDragRelease = function(e) {

		if(_features.isOldAndroid ) {

			if(_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
				return;
			}

			// on Android (v4.1, 4.2, 4.3 & possibly older) 
			// ghost mousedown/up event isn't preventable via e.preventDefault,
			// which causes fake mousedown event
			// so we block mousedown/up for 600ms
			if( e.type.indexOf('touch') > -1 ) {
				clearTimeout(_oldAndroidTouchEndTimeout);
				_oldAndroidTouchEndTimeout = setTimeout(function() {
					_oldAndroidTouchEndTimeout = 0;
				}, 600);
			}
			
		}

		_shout('pointerUp');

		if(_preventDefaultEventBehaviour(e, false)) {
			e.preventDefault();
		}

		var releasePoint;

		if(_pointerEventEnabled) {
			var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
			
			if(pointerIndex > -1) {
				releasePoint = _currPointers.splice(pointerIndex, 1)[0];

				if(navigator.pointerEnabled) {
					releasePoint.type = e.pointerType || 'mouse';
				} else {
					var MSPOINTER_TYPES = {
						4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
						2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
						3: 'pen' // event.MSPOINTER_TYPE_PEN
					};
					releasePoint.type = MSPOINTER_TYPES[e.pointerType];

					if(!releasePoint.type) {
						releasePoint.type = e.pointerType || 'mouse';
					}
				}

			}
		}

		var touchList = _getTouchPoints(e),
			gestureType,
			numPoints = touchList.length;

		if(e.type === 'mouseup') {
			numPoints = 0;
		}

		// Do nothing if there were 3 touch points or more
		if(numPoints === 2) {
			_currentPoints = null;
			return true;
		}

		// if second pointer released
		if(numPoints === 1) {
			_equalizePoints(_startPoint, touchList[0]);
		}				


		// pointer hasn't moved, send "tap release" point
		if(numPoints === 0 && !_direction && !_mainScrollAnimating) {
			if(!releasePoint) {
				if(e.type === 'mouseup') {
					releasePoint = {x: e.pageX, y: e.pageY, type:'mouse'};
				} else if(e.changedTouches && e.changedTouches[0]) {
					releasePoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type:'touch'};
				}		
			}

			_shout('touchRelease', e, releasePoint);
		}

		// Difference in time between releasing of two last touch points (zoom gesture)
		var releaseTimeDiff = -1;

		// Gesture completed, no pointers left
		if(numPoints === 0) {
			_isDragging = false;
			framework.unbind(window, _upMoveEvents, self);

			_stopDragUpdateLoop();

			if(_isZooming) {
				// Two points released at the same time
				releaseTimeDiff = 0;
			} else if(_lastReleaseTime !== -1) {
				releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
			}
		}
		_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
		
		if(releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
			gestureType = 'zoom';
		} else {
			gestureType = 'swipe';
		}

		if(_isZooming && numPoints < 2) {
			_isZooming = false;

			// Only second point released
			if(numPoints === 1) {
				gestureType = 'zoomPointerUp';
			}
			_shout('zoomGestureEnded');
		}

		_currentPoints = null;
		if(!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
			// nothing to animate
			return;
		}
	
		_stopAllAnimations();

		
		if(!_releaseAnimData) {
			_releaseAnimData = _initDragReleaseAnimationData();
		}
		
		_releaseAnimData.calculateSwipeSpeed('x');


		if(_verticalDragInitiated) {

			var opacityRatio = _calculateVerticalDragOpacityRatio();

			if(opacityRatio < _options.verticalDragRange) {
				self.close();
			} else {
				var initalPanY = _panOffset.y,
					initialBgOpacity = _bgOpacity;

				_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function(now) {
					
					_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;

					_applyBgOpacity(  (1 - initialBgOpacity) * now + initialBgOpacity );
					_applyCurrentZoomPan();
				});

				_shout('onVerticalDrag', 1);
			}

			return;
		}


		// main scroll 
		if(  (_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
			var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
			if(itemChanged) {
				return;
			}
			gestureType = 'zoomPointerUp';
		}

		// prevent zoom/pan animation when main scroll animation runs
		if(_mainScrollAnimating) {
			return;
		}
		
		// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
		if(gestureType !== 'swipe') {
			_completeZoomGesture();
			return;
		}
	
		// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
		if(!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
			_completePanGesture(_releaseAnimData);
		}
	},


	// Returns object with data about gesture
	// It's created only once and then reused
	_initDragReleaseAnimationData  = function() {
		// temp local vars
		var lastFlickDuration,
			tempReleasePos;

		// s = this
		var s = {
			lastFlickOffset: {},
			lastFlickDist: {},
			lastFlickSpeed: {},
			slowDownRatio:  {},
			slowDownRatioReverse:  {},
			speedDecelerationRatio:  {},
			speedDecelerationRatioAbs:  {},
			distanceOffset:  {},
			backAnimDestination: {},
			backAnimStarted: {},
			calculateSwipeSpeed: function(axis) {
				

				if( _posPoints.length > 1) {
					lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
					tempReleasePos = _posPoints[_posPoints.length-2][axis];
				} else {
					lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
					tempReleasePos = _startPoint[axis];
				}
				s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
				s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
				if(s.lastFlickDist[axis] > 20) {
					s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
				} else {
					s.lastFlickSpeed[axis] = 0;
				}
				if( Math.abs(s.lastFlickSpeed[axis]) < 0.1 ) {
					s.lastFlickSpeed[axis] = 0;
				}
				
				s.slowDownRatio[axis] = 0.95;
				s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
				s.speedDecelerationRatio[axis] = 1;
			},

			calculateOverBoundsAnimOffset: function(axis, speed) {
				if(!s.backAnimStarted[axis]) {

					if(_panOffset[axis] > _currPanBounds.min[axis]) {
						s.backAnimDestination[axis] = _currPanBounds.min[axis];
						
					} else if(_panOffset[axis] < _currPanBounds.max[axis]) {
						s.backAnimDestination[axis] = _currPanBounds.max[axis];
					}

					if(s.backAnimDestination[axis] !== undefined) {
						s.slowDownRatio[axis] = 0.7;
						s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
						if(s.speedDecelerationRatioAbs[axis] < 0.05) {

							s.lastFlickSpeed[axis] = 0;
							s.backAnimStarted[axis] = true;

							_animateProp('bounceZoomPan'+axis,_panOffset[axis], 
								s.backAnimDestination[axis], 
								speed || 300, 
								framework.easing.sine.out, 
								function(pos) {
									_panOffset[axis] = pos;
									_applyCurrentZoomPan();
								}
							);

						}
					}
				}
			},

			// Reduces the speed by slowDownRatio (per 10ms)
			calculateAnimOffset: function(axis) {
				if(!s.backAnimStarted[axis]) {
					s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + 
												s.slowDownRatioReverse[axis] - 
												s.slowDownRatioReverse[axis] * s.timeDiff / 10);

					s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
					s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
					_panOffset[axis] += s.distanceOffset[axis];

				}
			},

			panAnimLoop: function() {
				if ( _animations.zoomPan ) {
					_animations.zoomPan.raf = _requestAF(s.panAnimLoop);

					s.now = _getCurrentTime();
					s.timeDiff = s.now - s.lastNow;
					s.lastNow = s.now;
					
					s.calculateAnimOffset('x');
					s.calculateAnimOffset('y');

					_applyCurrentZoomPan();
					
					s.calculateOverBoundsAnimOffset('x');
					s.calculateOverBoundsAnimOffset('y');


					if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {

						// round pan position
						_panOffset.x = Math.round(_panOffset.x);
						_panOffset.y = Math.round(_panOffset.y);
						_applyCurrentZoomPan();
						
						_stopAnimation('zoomPan');
						return;
					}
				}

			}
		};
		return s;
	},

	_completePanGesture = function(animData) {
		// calculate swipe speed for Y axis (paanning)
		animData.calculateSwipeSpeed('y');

		_currPanBounds = self.currItem.bounds;
		
		animData.backAnimDestination = {};
		animData.backAnimStarted = {};

		// Avoid acceleration animation if speed is too low
		if(Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05 ) {
			animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;

			// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
			animData.calculateOverBoundsAnimOffset('x');
			animData.calculateOverBoundsAnimOffset('y');
			return true;
		}

		// Animation loop that controls the acceleration after pan gesture ends
		_registerStartAnimation('zoomPan');
		animData.lastNow = _getCurrentTime();
		animData.panAnimLoop();
	},


	_finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
		var itemChanged;
		if(!_mainScrollAnimating) {
			_currZoomedItemIndex = _currentItemIndex;
		}


		
		var itemsDiff;

		if(gestureType === 'swipe') {
			var totalShiftDist = _currPoint.x - _startPoint.x,
				isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;

			// if container is shifted for more than MIN_SWIPE_DISTANCE, 
			// and last flick gesture was in right direction
			if(totalShiftDist > MIN_SWIPE_DISTANCE && 
				(isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20) ) {
				// go to prev item
				itemsDiff = -1;
			} else if(totalShiftDist < -MIN_SWIPE_DISTANCE && 
				(isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20) ) {
				// go to next item
				itemsDiff = 1;
			}
		}

		var nextCircle;

		if(itemsDiff) {
			
			_currentItemIndex += itemsDiff;

			if(_currentItemIndex < 0) {
				_currentItemIndex = _options.loop ? _getNumItems()-1 : 0;
				nextCircle = true;
			} else if(_currentItemIndex >= _getNumItems()) {
				_currentItemIndex = _options.loop ? 0 : _getNumItems()-1;
				nextCircle = true;
			}

			if(!nextCircle || _options.loop) {
				_indexDiff += itemsDiff;
				_currPositionIndex -= itemsDiff;
				itemChanged = true;
			}
			

			
		}

		var animateToX = _slideSize.x * _currPositionIndex;
		var animateToDist = Math.abs( animateToX - _mainScrollPos.x );
		var finishAnimDuration;


		if(!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
			// "return to current" duration, e.g. when dragging from slide 0 to -1
			finishAnimDuration = 333; 
		} else {
			finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? 
									animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 
									333;

			finishAnimDuration = Math.min(finishAnimDuration, 400);
			finishAnimDuration = Math.max(finishAnimDuration, 250);
		}

		if(_currZoomedItemIndex === _currentItemIndex) {
			itemChanged = false;
		}
		
		_mainScrollAnimating = true;
		
		_shout('mainScrollAnimStart');

		_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, 
			_moveMainScroll,
			function() {
				_stopAllAnimations();
				_mainScrollAnimating = false;
				_currZoomedItemIndex = -1;
				
				if(itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
					self.updateCurrItem();
				}
				
				_shout('mainScrollAnimComplete');
			}
		);

		if(itemChanged) {
			self.updateCurrItem(true);
		}

		return itemChanged;
	},

	_calculateZoomLevel = function(touchesDistance) {
		return  1 / _startPointsDistance * touchesDistance * _startZoomLevel;
	},

	// Resets zoom if it's out of bounds
	_completeZoomGesture = function() {
		var destZoomLevel = _currZoomLevel,
			minZoomLevel = _getMinZoomLevel(),
			maxZoomLevel = _getMaxZoomLevel();

		if ( _currZoomLevel < minZoomLevel ) {
			destZoomLevel = minZoomLevel;
		} else if ( _currZoomLevel > maxZoomLevel ) {
			destZoomLevel = maxZoomLevel;
		}

		var destOpacity = 1,
			onUpdate,
			initialOpacity = _bgOpacity;

		if(_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
			//_closedByScroll = true;
			self.close();
			return true;
		}

		if(_opacityChanged) {
			onUpdate = function(now) {
				_applyBgOpacity(  (destOpacity - initialOpacity) * now + initialOpacity );
			};
		}

		self.zoomTo(destZoomLevel, 0, 200,  framework.easing.cubic.out, onUpdate);
		return true;
	};


_registerModule('Gestures', {
	publicMethods: {

		initGestures: function() {

			// helper function that builds touch/pointer/mouse events
			var addEventNames = function(pref, down, move, up, cancel) {
				_dragStartEvent = pref + down;
				_dragMoveEvent = pref + move;
				_dragEndEvent = pref + up;
				if(cancel) {
					_dragCancelEvent = pref + cancel;
				} else {
					_dragCancelEvent = '';
				}
			};

			_pointerEventEnabled = _features.pointerEvent;
			if(_pointerEventEnabled && _features.touch) {
				// we don't need touch events, if browser supports pointer events
				_features.touch = false;
			}

			if(_pointerEventEnabled) {
				if(navigator.pointerEnabled) {
					addEventNames('pointer', 'down', 'move', 'up', 'cancel');
				} else {
					// IE10 pointer events are case-sensitive
					addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
				}
			} else if(_features.touch) {
				addEventNames('touch', 'start', 'move', 'end', 'cancel');
				_likelyTouchDevice = true;
			} else {
				addEventNames('mouse', 'down', 'move', 'up');	
			}

			_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent  + ' ' +  _dragCancelEvent;
			_downEvents = _dragStartEvent;

			if(_pointerEventEnabled && !_likelyTouchDevice) {
				_likelyTouchDevice = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1);
			}
			// make variable public
			self.likelyTouchDevice = _likelyTouchDevice; 
			
			_globalEventHandlers[_dragStartEvent] = _onDragStart;
			_globalEventHandlers[_dragMoveEvent] = _onDragMove;
			_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken

			if(_dragCancelEvent) {
				_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
			}

			// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
			if(_features.touch) {
				_downEvents += ' mousedown';
				_upMoveEvents += ' mousemove mouseup';
				_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
				_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
				_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
			}

			if(!_likelyTouchDevice) {
				// don't allow pan to next slide from zoomed state on Desktop
				_options.allowPanToNext = false;
			}
		}

	}
});


/*>>gestures*/

/*>>show-hide-transition*/
/**
 * show-hide-transition.js:
 *
 * Manages initial opening or closing transition.
 *
 * If you're not planning to use transition for gallery at all,
 * you may set options hideAnimationDuration and showAnimationDuration to 0,
 * and just delete startAnimation function.
 * 
 */


var _showOrHideTimeout,
	_showOrHide = function(item, img, out, completeFn) {

		if(_showOrHideTimeout) {
			clearTimeout(_showOrHideTimeout);
		}

		_initialZoomRunning = true;
		_initialContentSet = true;
		
		// dimensions of small thumbnail {x:,y:,w:}.
		// Height is optional, as calculated based on large image.
		var thumbBounds; 
		if(item.initialLayout) {
			thumbBounds = item.initialLayout;
			item.initialLayout = null;
		} else {
			thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
		}

		var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;

		var onComplete = function() {
			_stopAnimation('initialZoom');
			if(!out) {
				_applyBgOpacity(1);
				if(img) {
					img.style.display = 'block';
				}
				framework.addClass(template, 'pswp--animated-in');
				_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
			} else {
				self.template.removeAttribute('style');
				self.bg.removeAttribute('style');
			}

			if(completeFn) {
				completeFn();
			}
			_initialZoomRunning = false;
		};

		// if bounds aren't provided, just open gallery without animation
		if(!duration || !thumbBounds || thumbBounds.x === undefined) {

			var finishWithoutAnimation = function() {
				_shout('initialZoom' + (out ? 'Out' : 'In') );

				_currZoomLevel = item.initialZoomLevel;
				_equalizePoints(_panOffset,  item.initialPosition );
				_applyCurrentZoomPan();

				// no transition
				template.style.opacity = out ? 0 : 1;
				_applyBgOpacity(1);

				onComplete();
			};
			finishWithoutAnimation();
			
			return;
		}

		var startAnimation = function() {
			var closeWithRaf = _closedByScroll,
				fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
			
			// apply hw-acceleration to image
			if(item.miniImg) {
				item.miniImg.style.webkitBackfaceVisibility = 'hidden';
			}

			if(!out) {
				_currZoomLevel = thumbBounds.w / item.w;
				_panOffset.x = thumbBounds.x;
				_panOffset.y = thumbBounds.y - _initalWindowScrollY;

				self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
				_applyCurrentZoomPan();
			}

			_registerStartAnimation('initialZoom');
			
			if(out && !closeWithRaf) {
				framework.removeClass(template, 'pswp--animated-in');
			}

			if(fadeEverything) {
				if(out) {
					framework[ (closeWithRaf ? 'remove' : 'add') + 'Class' ](template, 'pswp--animate_opacity');
				} else {
					setTimeout(function() {
						framework.addClass(template, 'pswp--animate_opacity');
					}, 30);
				}
			}

			_showOrHideTimeout = setTimeout(function() {

				_shout('initialZoom' + (out ? 'Out' : 'In') );
				

				if(!out) {

					// "in" animation always uses CSS transitions (instead of rAF).
					// CSS transition work faster here, 
					// as developer may also want to animate other things, 
					// like ui on top of sliding area, which can be animated just via CSS
					
					_currZoomLevel = item.initialZoomLevel;
					_equalizePoints(_panOffset,  item.initialPosition );
					_applyCurrentZoomPan();
					_applyBgOpacity(1);

					if(fadeEverything) {
						template.style.opacity = 1;
					} else {
						_applyBgOpacity(1);
					}

					_showOrHideTimeout = setTimeout(onComplete, duration + 20);
				} else {

					// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
					var destZoomLevel = thumbBounds.w / item.w,
						initialPanOffset = {
							x: _panOffset.x,
							y: _panOffset.y
						},
						initialZoomLevel = _currZoomLevel,
						initalBgOpacity = _bgOpacity,
						onUpdate = function(now) {
							
							if(now === 1) {
								_currZoomLevel = destZoomLevel;
								_panOffset.x = thumbBounds.x;
								_panOffset.y = thumbBounds.y  - _currentWindowScrollY;
							} else {
								_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
								_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
								_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
							}
							
							_applyCurrentZoomPan();
							if(fadeEverything) {
								template.style.opacity = 1 - now;
							} else {
								_applyBgOpacity( initalBgOpacity - now * initalBgOpacity );
							}
						};

					if(closeWithRaf) {
						_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
					} else {
						onUpdate(1);
						_showOrHideTimeout = setTimeout(onComplete, duration + 20);
					}
				}
			
			}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
					// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
					// Which avoids lag at the beginning of scale transition.
		};
		startAnimation();

		
	};

/*>>show-hide-transition*/

/*>>items-controller*/
/**
*
* Controller manages gallery items, their dimensions, and their content.
* 
*/

var _items,
	_tempPanAreaSize = {},
	_imagesToAppendPool = [],
	_initialContentSet,
	_initialZoomRunning,
	_controllerDefaultOptions = {
		index: 0,
		errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
		forceProgressiveLoading: false, // TODO
		preload: [1,1],
		getNumItemsFn: function() {
			return _items.length;
		}
	};


var _getItemAt,
	_getNumItems,
	_initialIsLoop,
	_getZeroBounds = function() {
		return {
			center:{x:0,y:0}, 
			max:{x:0,y:0}, 
			min:{x:0,y:0}
		};
	},
	_calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH ) {
		var bounds = item.bounds;

		// position of element when it's centered
		bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
		bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;

		// maximum pan position
		bounds.max.x = (realPanElementW > _tempPanAreaSize.x) ? 
							Math.round(_tempPanAreaSize.x - realPanElementW) : 
							bounds.center.x;
		
		bounds.max.y = (realPanElementH > _tempPanAreaSize.y) ? 
							Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : 
							bounds.center.y;
		
		// minimum pan position
		bounds.min.x = (realPanElementW > _tempPanAreaSize.x) ? 0 : bounds.center.x;
		bounds.min.y = (realPanElementH > _tempPanAreaSize.y) ? item.vGap.top : bounds.center.y;
	},
	_calculateItemSize = function(item, viewportSize, zoomLevel) {

		if (item.src && !item.loadError) {
			var isInitial = !zoomLevel;
			
			if(isInitial) {
				if(!item.vGap) {
					item.vGap = {top:0,bottom:0};
				}
				// allows overriding vertical margin for individual items
				_shout('parseVerticalMargin', item);
			}


			_tempPanAreaSize.x = viewportSize.x;
			_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;

			if (isInitial) {
				var hRatio = _tempPanAreaSize.x / item.w;
				var vRatio = _tempPanAreaSize.y / item.h;

				item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
				//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;

				var scaleMode = _options.scaleMode;

				if (scaleMode === 'orig') {
					zoomLevel = 1;
				} else if (scaleMode === 'fit') {
					zoomLevel = item.fitRatio;
				}

				if (zoomLevel > 1) {
					zoomLevel = 1;
				}

				item.initialZoomLevel = zoomLevel;
				
				if(!item.bounds) {
					// reuse bounds object
					item.bounds = _getZeroBounds(); 
				}
			}

			if(!zoomLevel) {
				return;
			}

			_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);

			if (isInitial && zoomLevel === item.initialZoomLevel) {
				item.initialPosition = item.bounds.center;
			}

			return item.bounds;
		} else {
			item.w = item.h = 0;
			item.initialZoomLevel = item.fitRatio = 1;
			item.bounds = _getZeroBounds();
			item.initialPosition = item.bounds.center;

			// if it's not image, we return zero bounds (content is not zoomable)
			return item.bounds;
		}
		return false;
	},

	


	_appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
		

		if(item.loadError) {
			return;
		}

		if(img) {

			item.imageAppended = true;
			_setImageSize(item, img);
			
			baseDiv.appendChild(img);

			if(keepPlaceholder) {
				setTimeout(function() {
					if(item && item.loaded && item.placeholder) {
						item.placeholder.style.display = 'none';
						item.placeholder = null;
					}
				}, 500);
			}
		}
	},
	


	_preloadImage = function(item) {
		item.loading = true;
		item.loaded = false;
		var img = item.img = framework.createEl('pswp__img', 'img');
		var onComplete = function() {
			item.loading = false;
			item.loaded = true;

			if(item.loadComplete) {
				item.loadComplete(item);
			} else {
				item.img = null; // no need to store image object
			}
			img.onload = img.onerror = null;
			img = null;
		};
		img.onload = onComplete;
		img.onerror = function() {
			item.loadError = true;
			onComplete();
		};		

		img.src = item.src;// + '?a=' + Math.random();

		return img;
	},
	_checkForError = function(item, cleanUp) {
		if(item.src && item.loadError && item.container) {

			if(cleanUp) {
				item.container.innerHTML = '';
			}

			item.container.innerHTML = _options.errorMsg.replace('%url%',  item.src );
			return true;
			
		}
	},
	_setImageSize = function(item, img, maxRes) {
		if(!item.src) {
			return;
		}

		if(!img) {
			img = item.container.lastChild;
		}

		var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
			h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
		
		if(item.placeholder && !item.loaded) {
			item.placeholder.style.width = w + 'px';
			item.placeholder.style.height = h + 'px';
		}

		img.style.width = w + 'px';
		img.style.height = h + 'px';
	},
	_appendImagesPool = function() {

		if(_imagesToAppendPool.length) {
			var poolItem;

			for(var i = 0; i < _imagesToAppendPool.length; i++) {
				poolItem = _imagesToAppendPool[i];
				if( poolItem.holder.index === poolItem.index ) {
					_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
				}
			}
			_imagesToAppendPool = [];
		}
	};
	


_registerModule('Controller', {

	publicMethods: {

		lazyLoadItem: function(index) {
			index = _getLoopedId(index);
			var item = _getItemAt(index);

			if(!item || item.loaded || item.loading) {
				return;
			}

			_shout('gettingData', index, item);

			if (!item.src) {
				return;
			}

			_preloadImage(item);
		},
		initController: function() {
			framework.extend(_options, _controllerDefaultOptions, true);
			self.items = _items = items;
			_getItemAt = self.getItemAt;
			_getNumItems = _options.getNumItemsFn; //self.getNumItems;



			_initialIsLoop = _options.loop;
			if(_getNumItems() < 3) {
				_options.loop = false; // disable loop if less then 3 items
			}

			_listen('beforeChange', function(diff) {

				var p = _options.preload,
					isNext = diff === null ? true : (diff > 0),
					preloadBefore = Math.min(p[0], _getNumItems() ),
					preloadAfter = Math.min(p[1], _getNumItems() ),
					i;


				for(i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
					self.lazyLoadItem(_currentItemIndex+i);
				}
				for(i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
					self.lazyLoadItem(_currentItemIndex-i);
				}
			});

			_listen('initialLayout', function() {
				self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
			});

			_listen('mainScrollAnimComplete', _appendImagesPool);
			_listen('initialZoomInEnd', _appendImagesPool);



			_listen('destroy', function() {
				var item;
				for(var i = 0; i < _items.length; i++) {
					item = _items[i];
					// remove reference to DOM elements, for GC
					if(item.container) {
						item.container = null; 
					}
					if(item.placeholder) {
						item.placeholder = null;
					}
					if(item.img) {
						item.img = null;
					}
					if(item.preloader) {
						item.preloader = null;
					}
					if(item.loadError) {
						item.loaded = item.loadError = false;
					}
				}
				_imagesToAppendPool = null;
			});
		},


		getItemAt: function(index) {
			if (index >= 0) {
				return _items[index] !== undefined ? _items[index] : false;
			}
			return false;
		},

		allowProgressiveImg: function() {
			// 1. Progressive image loading isn't working on webkit/blink 
			//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
			//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
			//    
			// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
			//    That's why it's disabled on touch devices (mainly because of swipe transition)
			//    
			// 3. Progressive image loading sometimes doesn't work in IE (up to 11).

			// Don't allow progressive loading on non-large touch devices
			return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200; 
			// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
		},

		setContent: function(holder, index) {

			if(_options.loop) {
				index = _getLoopedId(index);
			}

			var prevItem = self.getItemAt(holder.index);
			if(prevItem) {
				prevItem.container = null;
			}
	
			var item = self.getItemAt(index),
				img;
			
			if(!item) {
				holder.el.innerHTML = '';
				return;
			}

			// allow to override data
			_shout('gettingData', index, item);

			holder.index = index;
			holder.item = item;

			// base container DIV is created only once for each of 3 holders
			var baseDiv = item.container = framework.createEl('pswp__zoom-wrap'); 

			

			if(!item.src && item.html) {
				if(item.html.tagName) {
					baseDiv.appendChild(item.html);
				} else {
					baseDiv.innerHTML = item.html;
				}
			}

			_checkForError(item);

			_calculateItemSize(item, _viewportSize);
			
			if(item.src && !item.loadError && !item.loaded) {

				item.loadComplete = function(item) {

					// gallery closed before image finished loading
					if(!_isOpen) {
						return;
					}

					// check if holder hasn't changed while image was loading
					if(holder && holder.index === index ) {
						if( _checkForError(item, true) ) {
							item.loadComplete = item.img = null;
							_calculateItemSize(item, _viewportSize);
							_applyZoomPanToItem(item);

							if(holder.index === _currentItemIndex) {
								// recalculate dimensions
								self.updateCurrZoomItem();
							}
							return;
						}
						if( !item.imageAppended ) {
							if(_features.transform && (_mainScrollAnimating || _initialZoomRunning) ) {
								_imagesToAppendPool.push({
									item:item,
									baseDiv:baseDiv,
									img:item.img,
									index:index,
									holder:holder,
									clearPlaceholder:true
								});
							} else {
								_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
							}
						} else {
							// remove preloader & mini-img
							if(!_initialZoomRunning && item.placeholder) {
								item.placeholder.style.display = 'none';
								item.placeholder = null;
							}
						}
					}

					item.loadComplete = null;
					item.img = null; // no need to store image element after it's added

					_shout('imageLoadComplete', index, item);
				};

				if(framework.features.transform) {
					
					var placeholderClassName = 'pswp__img pswp__img--placeholder'; 
					placeholderClassName += (item.msrc ? '' : ' pswp__img--placeholder--blank');

					var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
					if(item.msrc) {
						placeholder.src = item.msrc;
					}
					
					_setImageSize(item, placeholder);

					baseDiv.appendChild(placeholder);
					item.placeholder = placeholder;

				}
				

				

				if(!item.loading) {
					_preloadImage(item);
				}


				if( self.allowProgressiveImg() ) {
					// just append image
					if(!_initialContentSet && _features.transform) {
						_imagesToAppendPool.push({
							item:item, 
							baseDiv:baseDiv, 
							img:item.img, 
							index:index, 
							holder:holder
						});
					} else {
						_appendImage(index, item, baseDiv, item.img, true, true);
					}
				}
				
			} else if(item.src && !item.loadError) {
				// image object is created every time, due to bugs of image loading & delay when switching images
				img = framework.createEl('pswp__img', 'img');
				img.style.opacity = 1;
				img.src = item.src;
				_setImageSize(item, img);
				_appendImage(index, item, baseDiv, img, true);
			}
			

			if(!_initialContentSet && index === _currentItemIndex) {
				_currZoomElementStyle = baseDiv.style;
				_showOrHide(item, (img ||item.img) );
			} else {
				_applyZoomPanToItem(item);
			}

			holder.el.innerHTML = '';
			holder.el.appendChild(baseDiv);
		},

		cleanSlide: function( item ) {
			if(item.img ) {
				item.img.onload = item.img.onerror = null;
			}
			item.loaded = item.loading = item.img = item.imageAppended = false;
		}

	}
});

/*>>items-controller*/

/*>>tap*/
/**
 * tap.js:
 *
 * Displatches tap and double-tap events.
 * 
 */

var tapTimer,
	tapReleasePoint = {},
	_dispatchTapEvent = function(origEvent, releasePoint, pointerType) {		
		var e = document.createEvent( 'CustomEvent' ),
			eDetail = {
				origEvent:origEvent, 
				target:origEvent.target, 
				releasePoint: releasePoint, 
				pointerType:pointerType || 'touch'
			};

		e.initCustomEvent( 'pswpTap', true, true, eDetail );
		origEvent.target.dispatchEvent(e);
	};

_registerModule('Tap', {
	publicMethods: {
		initTap: function() {
			_listen('firstTouchStart', self.onTapStart);
			_listen('touchRelease', self.onTapRelease);
			_listen('destroy', function() {
				tapReleasePoint = {};
				tapTimer = null;
			});
		},
		onTapStart: function(touchList) {
			if(touchList.length > 1) {
				clearTimeout(tapTimer);
				tapTimer = null;
			}
		},
		onTapRelease: function(e, releasePoint) {
			if(!releasePoint) {
				return;
			}

			if(!_moved && !_isMultitouch && !_numAnimations) {
				var p0 = releasePoint;
				if(tapTimer) {
					clearTimeout(tapTimer);
					tapTimer = null;

					// Check if taped on the same place
					if ( _isNearbyPoints(p0, tapReleasePoint) ) {
						_shout('doubleTap', p0);
						return;
					}
				}

				if(releasePoint.type === 'mouse') {
					_dispatchTapEvent(e, releasePoint, 'mouse');
					return;
				}

				var clickedTagName = e.target.tagName.toUpperCase();
				// avoid double tap delay on buttons and elements that have class pswp__single-tap
				if(clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap') ) {
					_dispatchTapEvent(e, releasePoint);
					return;
				}

				_equalizePoints(tapReleasePoint, p0);

				tapTimer = setTimeout(function() {
					_dispatchTapEvent(e, releasePoint);
					tapTimer = null;
				}, 300);
			}
		}
	}
});

/*>>tap*/

/*>>desktop-zoom*/
/**
 *
 * desktop-zoom.js:
 *
 * - Binds mousewheel event for paning zoomed image.
 * - Manages "dragging", "zoomed-in", "zoom-out" classes.
 *   (which are used for cursors and zoom icon)
 * - Adds toggleDesktopZoom function.
 * 
 */

var _wheelDelta;
	
_registerModule('DesktopZoom', {

	publicMethods: {

		initDesktopZoom: function() {

			if(_oldIE) {
				// no zoom for old IE (<=8)
				return;
			}

			if(_likelyTouchDevice) {
				// if detected hardware touch support, we wait until mouse is used,
				// and only then apply desktop-zoom features
				_listen('mouseUsed', function() {
					self.setupDesktopZoom();
				});
			} else {
				self.setupDesktopZoom(true);
			}

		},

		setupDesktopZoom: function(onInit) {

			_wheelDelta = {};

			var events = 'wheel mousewheel DOMMouseScroll';
			
			_listen('bindEvents', function() {
				framework.bind(template, events,  self.handleMouseWheel);
			});

			_listen('unbindEvents', function() {
				if(_wheelDelta) {
					framework.unbind(template, events, self.handleMouseWheel);
				}
			});

			self.mouseZoomedIn = false;

			var hasDraggingClass,
				updateZoomable = function() {
					if(self.mouseZoomedIn) {
						framework.removeClass(template, 'pswp--zoomed-in');
						self.mouseZoomedIn = false;
					}
					if(_currZoomLevel < 1) {
						framework.addClass(template, 'pswp--zoom-allowed');
					} else {
						framework.removeClass(template, 'pswp--zoom-allowed');
					}
					removeDraggingClass();
				},
				removeDraggingClass = function() {
					if(hasDraggingClass) {
						framework.removeClass(template, 'pswp--dragging');
						hasDraggingClass = false;
					}
				};

			_listen('resize' , updateZoomable);
			_listen('afterChange' , updateZoomable);
			_listen('pointerDown', function() {
				if(self.mouseZoomedIn) {
					hasDraggingClass = true;
					framework.addClass(template, 'pswp--dragging');
				}
			});
			_listen('pointerUp', removeDraggingClass);

			if(!onInit) {
				updateZoomable();
			}
			
		},

		handleMouseWheel: function(e) {

			if(_currZoomLevel <= self.currItem.fitRatio) {
				if( _options.modal ) {

					if (!_options.closeOnScroll || _numAnimations || _isDragging) {
						e.preventDefault();
					} else if(_transformKey && Math.abs(e.deltaY) > 2) {
						// close PhotoSwipe
						// if browser supports transforms & scroll changed enough
						_closedByScroll = true;
						self.close();
					}

				}
				return true;
			}

			// allow just one event to fire
			e.stopPropagation();

			// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
			_wheelDelta.x = 0;

			if('deltaX' in e) {
				if(e.deltaMode === 1 /* DOM_DELTA_LINE */) {
					// 18 - average line height
					_wheelDelta.x = e.deltaX * 18;
					_wheelDelta.y = e.deltaY * 18;
				} else {
					_wheelDelta.x = e.deltaX;
					_wheelDelta.y = e.deltaY;
				}
			} else if('wheelDelta' in e) {
				if(e.wheelDeltaX) {
					_wheelDelta.x = -0.16 * e.wheelDeltaX;
				}
				if(e.wheelDeltaY) {
					_wheelDelta.y = -0.16 * e.wheelDeltaY;
				} else {
					_wheelDelta.y = -0.16 * e.wheelDelta;
				}
			} else if('detail' in e) {
				_wheelDelta.y = e.detail;
			} else {
				return;
			}

			_calculatePanBounds(_currZoomLevel, true);

			var newPanX = _panOffset.x - _wheelDelta.x,
				newPanY = _panOffset.y - _wheelDelta.y;

			// only prevent scrolling in nonmodal mode when not at edges
			if (_options.modal ||
				(
				newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x &&
				newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y
				) ) {
				e.preventDefault();
			}

			// TODO: use rAF instead of mousewheel?
			self.panTo(newPanX, newPanY);
		},

		toggleDesktopZoom: function(centerPoint) {
			centerPoint = centerPoint || {x:_viewportSize.x/2 + _offset.x, y:_viewportSize.y/2 + _offset.y };

			var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
			var zoomOut = _currZoomLevel === doubleTapZoomLevel;
			
			self.mouseZoomedIn = !zoomOut;

			self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
			framework[ (!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
		}

	}
});


/*>>desktop-zoom*/

/*>>history*/
/**
 *
 * history.js:
 *
 * - Back button to close gallery.
 * 
 * - Unique URL for each slide: example.com/&pid=1&gid=3
 *   (where PID is picture index, and GID and gallery index)
 *   
 * - Switch URL when slides change.
 * 
 */


var _historyDefaultOptions = {
	history: true,
	galleryUID: 1
};

var _historyUpdateTimeout,
	_hashChangeTimeout,
	_hashAnimCheckTimeout,
	_hashChangedByScript,
	_hashChangedByHistory,
	_hashReseted,
	_initialHash,
	_historyChanged,
	_closedFromURL,
	_urlChangedOnce,
	_windowLoc,

	_supportsPushState,

	_getHash = function() {
		return _windowLoc.hash.substring(1);
	},
	_cleanHistoryTimeouts = function() {

		if(_historyUpdateTimeout) {
			clearTimeout(_historyUpdateTimeout);
		}

		if(_hashAnimCheckTimeout) {
			clearTimeout(_hashAnimCheckTimeout);
		}
	},

	// pid - Picture index
	// gid - Gallery index
	_parseItemIndexFromURL = function() {
		var hash = _getHash(),
			params = {};

		if(hash.length < 5) { // pid=1
			return params;
		}

		var i, vars = hash.split('&');
		for (i = 0; i < vars.length; i++) {
			if(!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');	
			if(pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}
		if(_options.galleryPIDs) {
			// detect custom pid in hash and search for it among the items collection
			var searchfor = params.pid;
			params.pid = 0; // if custom pid cannot be found, fallback to the first item
			for(i = 0; i < _items.length; i++) {
				if(_items[i].pid === searchfor) {
					params.pid = i;
					break;
				}
			}
		} else {
			params.pid = parseInt(params.pid,10)-1;
		}
		if( params.pid < 0 ) {
			params.pid = 0;
		}
		return params;
	},
	_updateHash = function() {

		if(_hashAnimCheckTimeout) {
			clearTimeout(_hashAnimCheckTimeout);
		}


		if(_numAnimations || _isDragging) {
			// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
			// that's why we update hash only when no animations running
			_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
			return;
		}
		
		if(_hashChangedByScript) {
			clearTimeout(_hashChangeTimeout);
		} else {
			_hashChangedByScript = true;
		}


		var pid = (_currentItemIndex + 1);
		var item = _getItemAt( _currentItemIndex );
		if(item.hasOwnProperty('pid')) {
			// carry forward any custom pid assigned to the item
			pid = item.pid;
		}
		var newHash = _initialHash + '&'  +  'gid=' + _options.galleryUID + '&' + 'pid=' + pid;

		if(!_historyChanged) {
			if(_windowLoc.hash.indexOf(newHash) === -1) {
				_urlChangedOnce = true;
			}
			// first time - add new hisory record, then just replace
		}

		var newURL = _windowLoc.href.split('#')[0] + '#' +  newHash;

		if( _supportsPushState ) {

			if('#' + newHash !== window.location.hash) {
				history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
			}

		} else {
			if(_historyChanged) {
				_windowLoc.replace( newURL );
			} else {
				_windowLoc.hash = newHash;
			}
		}
		
		

		_historyChanged = true;
		_hashChangeTimeout = setTimeout(function() {
			_hashChangedByScript = false;
		}, 60);
	};



	

_registerModule('History', {

	

	publicMethods: {
		initHistory: function() {

			framework.extend(_options, _historyDefaultOptions, true);

			if( !_options.history ) {
				return;
			}


			_windowLoc = window.location;
			_urlChangedOnce = false;
			_closedFromURL = false;
			_historyChanged = false;
			_initialHash = _getHash();
			_supportsPushState = ('pushState' in history);


			if(_initialHash.indexOf('gid=') > -1) {
				_initialHash = _initialHash.split('&gid=')[0];
				_initialHash = _initialHash.split('?gid=')[0];
			}
			

			_listen('afterChange', self.updateURL);
			_listen('unbindEvents', function() {
				framework.unbind(window, 'hashchange', self.onHashChange);
			});


			var returnToOriginal = function() {
				_hashReseted = true;
				if(!_closedFromURL) {

					if(_urlChangedOnce) {
						history.back();
					} else {

						if(_initialHash) {
							_windowLoc.hash = _initialHash;
						} else {
							if (_supportsPushState) {

								// remove hash from url without refreshing it or scrolling to top
								history.pushState('', document.title,  _windowLoc.pathname + _windowLoc.search );
							} else {
								_windowLoc.hash = '';
							}
						}
					}
					
				}

				_cleanHistoryTimeouts();
			};


			_listen('unbindEvents', function() {
				if(_closedByScroll) {
					// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
					// this is done to keep the scroll position
					returnToOriginal();
				}
			});
			_listen('destroy', function() {
				if(!_hashReseted) {
					returnToOriginal();
				}
			});
			_listen('firstUpdate', function() {
				_currentItemIndex = _parseItemIndexFromURL().pid;
			});

			

			
			var index = _initialHash.indexOf('pid=');
			if(index > -1) {
				_initialHash = _initialHash.substring(0, index);
				if(_initialHash.slice(-1) === '&') {
					_initialHash = _initialHash.slice(0, -1);
				}
			}
			

			setTimeout(function() {
				if(_isOpen) { // hasn't destroyed yet
					framework.bind(window, 'hashchange', self.onHashChange);
				}
			}, 40);
			
		},
		onHashChange: function() {

			if(_getHash() === _initialHash) {

				_closedFromURL = true;
				self.close();
				return;
			}
			if(!_hashChangedByScript) {

				_hashChangedByHistory = true;
				self.goTo( _parseItemIndexFromURL().pid );
				_hashChangedByHistory = false;
			}
			
		},
		updateURL: function() {

			// Delay the update of URL, to avoid lag during transition, 
			// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often
			
			_cleanHistoryTimeouts();
			

			if(_hashChangedByHistory) {
				return;
			}

			if(!_historyChanged) {
				_updateHash(); // first time
			} else {
				_historyUpdateTimeout = setTimeout(_updateHash, 800);
			}
		}
	
	}
});


/*>>history*/
	framework.extend(self, publicMethods); };
	return PhotoSwipe;
});
/// VERSION WITH DESTROY METHODS -> cf https://github.com/woothemes/FlexSlider/pull/1172/files



/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options, instanceId) {
	var slider = $(el);

	// making variables public
	slider.vars = $.extend({}, $.flexslider.defaults, options);

	var namespace = slider.vars.namespace,
		msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
		touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
		// depricating this idea, as devices are being released with both of these events
		//eventType = (touch) ? "touchend" : "click",
		eventType= "click" + slider.vars.eventNamespace + " touchend" + slider.vars.eventNamespace + "  MSPointerUp" + slider.vars.eventNamespace,
		watchedEvent = "",
		watchedEventClearTimer,
		vertical = slider.vars.direction === "vertical",
		reverse = slider.vars.reverse,
		carousel = (slider.vars.itemWidth > 0),
		fade = slider.vars.animation === "fade",
		asNav = slider.vars.asNavFor !== "",
		methods = {},
		focused = true;

	var instanceId = ( typeof instanceId !== 'undefined' ) ? instanceId++ : 0

	// Store a reference to the slider object
	$.data(el, "flexslider", slider);

	// Private slider methods
	methods = {
	  init: function() {
		slider.id = instanceId;
		slider.animating = false;
		// Get current slide and make sure it is a number
		slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
		if ( isNaN( slider.currentSlide ) ) slider.currentSlide = 0;
		slider.animatingTo = slider.currentSlide;
		slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
		slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
		slider.slides = $(slider.vars.selector, slider);
		slider.container = $(slider.containerSelector, slider);
		slider.count = slider.slides.length;
		// SYNC:
		slider.syncExists = $(slider.vars.sync).length > 0;
		// SLIDE:
		if (slider.vars.animation === "slide") slider.vars.animation = "swing";
		slider.prop = (vertical) ? "top" : "marginLeft";
		slider.args = {};
		// SLIDESHOW:
		slider.manualPause = false;
		slider.stopped = false;
		//PAUSE WHEN INVISIBLE
		slider.started = false;
		slider.startTimeout = null;
		// TOUCH/USECSS:
		slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
		  var obj = document.createElement('div'),
			  props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
		  for (var i in props) {
			if ( obj.style[ props[i] ] !== undefined ) {
			  slider.pfx = props[i].replace('Perspective','').toLowerCase();
			  slider.prop = "-" + slider.pfx + "-transform";
			  return true;
			}
		  }
		  return false;
		}());
		// CONTROLSCONTAINER:
		if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
		// MANUAL:
		if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

		// RANDOMIZE:
		if (slider.vars.randomize) {
		  slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
		  slider.container.empty().append(slider.slides);
		}

		slider.doMath();

		// INIT
		slider.setup("init");

		// CONTROLNAV:
		if (slider.vars.controlNav) methods.controlNav.setup();

		// DIRECTIONNAV:
		if (slider.vars.directionNav) methods.directionNav.setup();

		// KEYBOARD:
		if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
		  $(document).bind('keyup' + slider.vars.eventNamespace + "-" + slider.id, function(event) {
			var keycode = event.keyCode;
			if (!slider.animating && (keycode === 39 || keycode === 37)) {
			  var target = (keycode === 39) ? slider.getTarget('next') :
						   (keycode === 37) ? slider.getTarget('prev') : false;
			  slider.flexAnimate(target, slider.vars.pauseOnAction);
			}
		  });
		}
		// MOUSEWHEEL:
		if (slider.vars.mousewheel) {
		  slider.bind('mousewheel' + slider.vars.eventNamespace, function(event, delta, deltaX, deltaY) {
			event.preventDefault();
			var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
			slider.flexAnimate(target, slider.vars.pauseOnAction);
		  });
		}

		// PAUSEPLAY
		if (slider.vars.pausePlay) methods.pausePlay.setup();

		//PAUSE WHEN INVISIBLE
		if (slider.vars.slideshow && slider.vars.pauseInvisible) methods.pauseInvisible.init();

		// SLIDSESHOW
		if (slider.vars.slideshow) {
		  if (slider.vars.pauseOnHover) {
			slider.hover(function() {
			  if (!slider.manualPlay && !slider.manualPause) slider.pause();
			}, function() {
			  if (!slider.manualPause && !slider.manualPlay && !slider.stopped) slider.play();
			});
		  }
		  // initialize animation
		  //If we're visible, or we don't use PageVisibility API
		  if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
			(slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
		  }
		}

		// ASNAV:
		if (asNav) methods.asNav.setup();

		// TOUCH
		if (touch && slider.vars.touch) methods.touch();

		// FADE&&SMOOTHHEIGHT || SLIDE:
		if (!fade || (fade && slider.vars.smoothHeight)) $(window).bind("resize" + slider.vars.eventNamespace + "-" + slider.id + " orientationchange" + slider.vars.eventNamespace + "-" + slider.id + " focus" + slider.vars.eventNamespace + "-" + slider.id, methods.resize);

		slider.find("img").attr("draggable", "false");

		// API: start() Callback
		setTimeout(function(){
		  slider.vars.start(slider);
		}, 200);
	  },
	  asNav: {
		setup: function() {
		  slider.asNav = true;
		  slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
		  slider.currentItem = slider.currentSlide;
		  slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
		  if(!msGesture){
			  slider.slides.on(eventType, function(e){
				e.preventDefault();
				var $slide = $(this),
					target = $slide.index();
				var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
				if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
				  slider.flexAnimate(slider.getTarget("prev"), true);
				} else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
				  slider.direction = (slider.currentItem < target) ? "next" : "prev";
				  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
				}
			  });
		  }else{
			  el._slider = slider;
			  slider.slides.each(function (){
				  var that = this;
				  that._gesture = new MSGesture();
				  that._gesture.target = that;
				  that.addEventListener("MSPointerDown", function (e){
					  e.preventDefault();
					  if(e.currentTarget._gesture)
						  e.currentTarget._gesture.addPointer(e.pointerId);
				  }, false);
				  that.addEventListener("MSGestureTap", function (e){
					  e.preventDefault();
					  var $slide = $(this),
						  target = $slide.index();
					  if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
						  slider.direction = (slider.currentItem < target) ? "next" : "prev";
						  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
					  }
				  });
			  });
		  }
		}
	  },
	  controlNav: {
		setup: function() {
		  if (!slider.manualControls) {
			methods.controlNav.setupPaging();
		  } else { // MANUALCONTROLS:
			methods.controlNav.setupManual();
		  }
		},
		setupPaging: function() {
		  var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
			  j = 1,
			  item,
			  slide;

		  slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

		  if (slider.pagingCount > 1) {
			for (var i = 0; i < slider.pagingCount; i++) {
			  slide = slider.slides.eq(i);
			  item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"/>' : '<a>' + j + '</a>';
			  if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
				var captn = slide.attr( 'data-thumbcaption' );
				if ( '' != captn && undefined != captn ) item += '<span class="' + namespace + 'caption">' + captn + '</span>';
			  }
			  slider.controlNavScaffold.append('<li>' + item + '</li>');
			  j++;
			}
		  }

		  // CONTROLSCONTAINER:
		  (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
		  methods.controlNav.set();

		  methods.controlNav.active();

		  slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
			event.preventDefault();

			if (watchedEvent === "" || watchedEvent === event.type) {
			  var $this = $(this),
				  target = slider.controlNav.index($this);

			  if (!$this.hasClass(namespace + 'active')) {
				slider.direction = (target > slider.currentSlide) ? "next" : "prev";
				slider.flexAnimate(target, slider.vars.pauseOnAction);
			  }
			}

			// setup flags to prevent event duplication
			if (watchedEvent === "") {
			  watchedEvent = event.type;
			}
			methods.setToClearWatchedEvent();

		  });
		},
		setupManual: function() {
		  slider.controlNav = slider.manualControls;
		  methods.controlNav.active();

		  slider.controlNav.bind(eventType, function(event) {
			event.preventDefault();

			if (watchedEvent === "" || watchedEvent === event.type) {
			  var $this = $(this),
				  target = slider.controlNav.index($this);

			  if (!$this.hasClass(namespace + 'active')) {
				(target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
				slider.flexAnimate(target, slider.vars.pauseOnAction);
			  }
			}

			// setup flags to prevent event duplication
			if (watchedEvent === "") {
			  watchedEvent = event.type;
			}
			methods.setToClearWatchedEvent();
		  });
		},
		set: function() {
		  var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
		  slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
		},
		active: function() {
		  slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
		},
		update: function(action, pos) {
		  if (slider.pagingCount > 1 && action === "add") {
			slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
		  } else if (slider.pagingCount === 1) {
			slider.controlNavScaffold.find('li').remove();
		  } else {
			slider.controlNav.eq(pos).closest('li').remove();
		  }
		  methods.controlNav.set();
		  (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
		}
	  },
	  directionNav: {
		setup: function() {
		  var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

		  // CONTROLSCONTAINER:
		  if (slider.controlsContainer) {
			$(slider.controlsContainer).append(directionNavScaffold);
			slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
		  } else {
			slider.append(directionNavScaffold);
			slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
		  }

		  methods.directionNav.update();

		  slider.directionNav.bind(eventType, function(event) {
			event.preventDefault();
			var target;

			if (watchedEvent === "" || watchedEvent === event.type) {
			  target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
			  slider.flexAnimate(target, slider.vars.pauseOnAction);
			}

			// setup flags to prevent event duplication
			if (watchedEvent === "") {
			  watchedEvent = event.type;
			}
			methods.setToClearWatchedEvent();
		  });
		},
		update: function() {
		  var disabledClass = namespace + 'disabled';
		  if (slider.pagingCount === 1) {
			slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
		  } else if (!slider.vars.animationLoop) {
			if (slider.animatingTo === 0) {
			  slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
			} else if (slider.animatingTo === slider.last) {
			  slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
			} else {
			  slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
			}
		  } else {
			slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
		  }
		}
	  },
	  pausePlay: {
		setup: function() {
		  var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

		  // CONTROLSCONTAINER:
		  if (slider.controlsContainer) {
			slider.controlsContainer.append(pausePlayScaffold);
			slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
		  } else {
			slider.append(pausePlayScaffold);
			slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
		  }

		  methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

		  slider.pausePlay.bind(eventType, function(event) {
			event.preventDefault();

			if (watchedEvent === "" || watchedEvent === event.type) {
			  if ($(this).hasClass(namespace + 'pause')) {
				slider.manualPause = true;
				slider.manualPlay = false;
				slider.pause();
			  } else {
				slider.manualPause = false;
				slider.manualPlay = true;
				slider.play();
			  }
			}

			// setup flags to prevent event duplication
			if (watchedEvent === "") {
			  watchedEvent = event.type;
			}
			methods.setToClearWatchedEvent();
		  });
		},
		update: function(state) {
		  (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
		}
	  },
	  touch: function() {
		var startX,
		  startY,
		  offset,
		  cwidth,
		  dx,
		  startT,
		  scrolling = false,
		  localX = 0,
		  localY = 0,
		  accDx = 0;

		if(!msGesture){
			el.addEventListener('touchstart', onTouchStart, false);

			function onTouchStart(e) {
			  if (slider.animating) {
				e.preventDefault();
			  } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
				slider.pause();
				// CAROUSEL:
				cwidth = (vertical) ? slider.h : slider. w;
				startT = Number(new Date());
				// CAROUSEL:

				// Local vars for X and Y points.
				localX = e.touches[0].pageX;
				localY = e.touches[0].pageY;

				offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
						 (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
						 (carousel && slider.currentSlide === slider.last) ? slider.limit :
						 (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
						 (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
				startX = (vertical) ? localY : localX;
				startY = (vertical) ? localX : localY;

				el.addEventListener('touchmove', onTouchMove, false);
				el.addEventListener('touchend', onTouchEnd, false);
			  }
			}

			function onTouchMove(e) {
			  // Local vars for X and Y points.

			  localX = e.touches[0].pageX;
			  localY = e.touches[0].pageY;

			  dx = (vertical) ? startX - localY : startX - localX;
			  scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

			  var fxms = 500;

			  if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
				e.preventDefault();
				if (!fade && slider.transitions) {
				  if (!slider.vars.animationLoop) {
					dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
				  }
				  slider.setProps(offset + dx, "setTouch");
				}
			  }
			}

			function onTouchEnd(e) {
			  // finish the touch by undoing the touch session
			  el.removeEventListener('touchmove', onTouchMove, false);

			  if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
				var updateDx = (reverse) ? -dx : dx,
					target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

				if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
				  slider.flexAnimate(target, slider.vars.pauseOnAction);
				} else {
				  if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
				}
			  }
			  el.removeEventListener('touchend', onTouchEnd, false);

			  startX = null;
			  startY = null;
			  dx = null;
			  offset = null;
			}
		}else{
			el.style.msTouchAction = "none";
			el._gesture = new MSGesture();
			el._gesture.target = el;
			el.addEventListener("MSPointerDown", onMSPointerDown, false);
			el._slider = slider;
			el.addEventListener("MSGestureChange", onMSGestureChange, false);
			el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

			function onMSPointerDown(e){
				e.stopPropagation();
				if (slider.animating) {
					e.preventDefault();
				}else{
					slider.pause();
					el._gesture.addPointer(e.pointerId);
					accDx = 0;
					cwidth = (vertical) ? slider.h : slider. w;
					startT = Number(new Date());
					// CAROUSEL:

					offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
						(carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
							(carousel && slider.currentSlide === slider.last) ? slider.limit :
								(carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
									(reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
				}
			}

			function onMSGestureChange(e) {
				e.stopPropagation();
				var slider = e.target._slider;
				if(!slider){
					return;
				}
				var transX = -e.translationX,
					transY = -e.translationY;

				//Accumulate translations.
				accDx = accDx + ((vertical) ? transY : transX);
				dx = accDx;
				scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

				if(e.detail === e.MSGESTURE_FLAG_INERTIA){
					setImmediate(function (){
						el._gesture.stop();
					});

					return;
				}

				if (!scrolling || Number(new Date()) - startT > 500) {
					e.preventDefault();
					if (!fade && slider.transitions) {
						if (!slider.vars.animationLoop) {
							dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
						}
						slider.setProps(offset + dx, "setTouch");
					}
				}
			}

			function onMSGestureEnd(e) {
				e.stopPropagation();
				var slider = e.target._slider;
				if(!slider){
					return;
				}
				if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
					var updateDx = (reverse) ? -dx : dx,
						target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

					if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
						slider.flexAnimate(target, slider.vars.pauseOnAction);
					} else {
						if (!fade) slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);
					}
				}

				startX = null;
				startY = null;
				dx = null;
				offset = null;
				accDx = 0;
			}
		}
	  },
	  resize: function() {
		if (!slider.animating && slider.is(':visible')) {
		  if (!carousel) slider.doMath();

		  if (fade) {
			// SMOOTH HEIGHT:
			methods.smoothHeight();
		  } else if (carousel) { //CAROUSEL:
			slider.slides.width(slider.computedW);
			slider.update(slider.pagingCount);
			slider.setProps();
		  }
		  else if (vertical) { //VERTICAL:
			slider.viewport.height(slider.h);
			slider.setProps(slider.h, "setTotal");
		  } else {
			// SMOOTH HEIGHT:
			if (slider.vars.smoothHeight) methods.smoothHeight();
			slider.newSlides.width(slider.computedW);
			slider.setProps(slider.computedW, "setTotal");
		  }
		}
	  },
	  smoothHeight: function(dur) {
		if (!vertical || fade) {
		  var $obj = (fade) ? slider : slider.viewport;
		  (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
		}
	  },
	  sync: function(action) {
		var $obj = $(slider.vars.sync).data("flexslider"),
			target = slider.animatingTo;

		switch (action) {
		  case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
		  case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
		  case "pause": $obj.pause(); break;
		}
	  },
	  uniqueID: function($clone) {
		$clone.find( '[id]' ).each(function() {
		  var $this = $(this);
		  $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
		});
		return $clone;
	  },
	  pauseInvisible: {
		visProp: null,
		init: function() {
		  var prefixes = ['webkit','moz','ms','o'];

		  if ('hidden' in document) return 'hidden';
		  for (var i = 0; i < prefixes.length; i++) {
			if ((prefixes[i] + 'Hidden') in document)
			methods.pauseInvisible.visProp = prefixes[i] + 'Hidden';
		  }
		  if (methods.pauseInvisible.visProp) {
			var evtname = methods.pauseInvisible.visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
			document.addEventListener(evtname, function() {
			  if (methods.pauseInvisible.isHidden()) {
				if(slider.startTimeout) clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
				else slider.pause(); //Or just pause
			  }
			  else {
				if(slider.started) slider.play(); //Initiated before, just play
				else (slider.vars.initDelay > 0) ? setTimeout(slider.play, slider.vars.initDelay) : slider.play(); //Didn't init before: simply init or wait for it
			  }
			});
		  }
		},
		isHidden: function() {
		  return document[methods.pauseInvisible.visProp] || false;
		}
	  },
	  setToClearWatchedEvent: function() {
		clearTimeout(watchedEventClearTimer);
		watchedEventClearTimer = setTimeout(function() {
		  watchedEvent = "";
		}, 3000);
	  }
	};

	// public methods
	slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
	  if (!slider.vars.animationLoop && target !== slider.currentSlide) {
		slider.direction = (target > slider.currentSlide) ? "next" : "prev";
	  }

	  if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

	  if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
		if (asNav && withSync) {
		  var master = $(slider.vars.asNavFor).data('flexslider');
		  slider.atEnd = target === 0 || target === slider.count - 1;
		  master.flexAnimate(target, true, false, true, fromNav);
		  slider.direction = (slider.currentItem < target) ? "next" : "prev";
		  master.direction = slider.direction;

		  if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
			slider.currentItem = target;
			slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
			target = Math.floor(target/slider.visible);
		  } else {
			slider.currentItem = target;
			slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
			return false;
		  }
		}

		slider.animating = true;
		slider.animatingTo = target;

		// SLIDESHOW:
		if (pause) slider.pause();

		// API: before() animation Callback
		slider.vars.before(slider);

		// SYNC:
		if (slider.syncExists && !fromNav) methods.sync("animate");

		// CONTROLNAV
		if (slider.vars.controlNav) methods.controlNav.active();

		// !CAROUSEL:
		// CANDIDATE: slide active class (for add/remove slide)
		if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');

		// INFINITE LOOP:
		// CANDIDATE: atEnd
		slider.atEnd = target === 0 || target === slider.last;

		// DIRECTIONNAV:
		if (slider.vars.directionNav) methods.directionNav.update();

		if (target === slider.last) {
		  // API: end() of cycle Callback
		  slider.vars.end(slider);
		  // SLIDESHOW && !INFINITE LOOP:
		  if (!slider.vars.animationLoop) slider.pause();
		}

		// SLIDE:
		if (!fade) {
		  var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
			  margin, slideString, calcNext;

		  // INFINITE LOOP / REVERSE:
		  if (carousel) {
			//margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
			margin = slider.vars.itemMargin;
			calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
			slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
		  } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
			slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
		  } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
			slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
		  } else {
			slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
		  }
		  slider.setProps(slideString, "", slider.vars.animationSpeed);
		  if (slider.transitions) {
			if (!slider.vars.animationLoop || !slider.atEnd) {
			  slider.animating = false;
			  slider.currentSlide = slider.animatingTo;
			}
			slider.container.unbind("webkitTransitionEnd" + slider.vars.eventNamespace + " transitionend" + slider.vars.eventNamespace);
			slider.container.bind("webkitTransitionEnd" + slider.vars.eventNamespace + " transitionend" + slider.vars.eventNamespace, function() {
			  slider.wrapup(dimension);
			});
		  } else {
			slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
			  slider.wrapup(dimension);
			});
		  }
		} else { // FADE:
		  if (!touch) {
			//slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
			//slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

			slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
			slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

		  } else {
			slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
			slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
			slider.wrapup(dimension);
		  }
		}
		// SMOOTH HEIGHT:
		if (slider.vars.smoothHeight) methods.smoothHeight(slider.vars.animationSpeed);
	  }
	};
	slider.wrapup = function(dimension) {
	  // SLIDE:
	  if (!fade && !carousel) {
		if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
		  slider.setProps(dimension, "jumpEnd");
		} else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
		  slider.setProps(dimension, "jumpStart");
		}
	  }
	  slider.animating = false;
	  slider.currentSlide = slider.animatingTo;
	  // API: after() animation Callback
	  slider.vars.after(slider);
	};

	// SLIDESHOW:
	slider.animateSlides = function() {
	  if (!slider.animating && focused ) slider.flexAnimate(slider.getTarget("next"));
	};
	// SLIDESHOW:
	slider.pause = function() {
	  clearInterval(slider.animatedSlides);
	  slider.animatedSlides = null;
	  slider.playing = false;
	  // PAUSEPLAY:
	  if (slider.vars.pausePlay) methods.pausePlay.update("play");
	  // SYNC:
	  if (slider.syncExists) methods.sync("pause");
	};
	// SLIDESHOW:
	slider.play = function() {
	  if (slider.playing) clearInterval(slider.animatedSlides);
	  slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
	  slider.started = slider.playing = true;
	  // PAUSEPLAY:
	  if (slider.vars.pausePlay) methods.pausePlay.update("pause");
	  // SYNC:
	  if (slider.syncExists) methods.sync("play");
	};
	// STOP:
	slider.stop = function () {
	  slider.pause();
	  slider.stopped = true;
	};
	slider.canAdvance = function(target, fromNav) {
	  // ASNAV:
	  var last = (asNav) ? slider.pagingCount - 1 : slider.last;
	  return (fromNav) ? true :
			 (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
			 (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
			 (target === slider.currentSlide && !asNav) ? false :
			 (slider.vars.animationLoop) ? true :
			 (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
			 (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
			 true;
	};
	slider.getTarget = function(dir) {
	  slider.direction = dir;
	  if (dir === "next") {
		return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
	  } else {
		return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
	  }
	};

	// SLIDE:
	slider.setProps = function(pos, special, dur) {
	  var target = (function() {
		var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
			posCalc = (function() {
			  if (carousel) {
				return (special === "setTouch") ? pos :
					   (reverse && slider.animatingTo === slider.last) ? 0 :
					   (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
					   (slider.animatingTo === slider.last) ? slider.limit : posCheck;
			  } else {
				switch (special) {
				  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
				  case "setTouch": return (reverse) ? pos : pos;
				  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
				  case "jumpStart": return (reverse) ? slider.count * pos : pos;
				  default: return pos;
				}
			  }
			}());

			return (posCalc * -1) + "px";
		  }());

	  if (slider.transitions) {
		target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
		dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
		slider.container.css("-" + slider.pfx + "-transition-duration", dur);
		 slider.container.css("transition-duration", dur);
	  }

	  slider.args[slider.prop] = target;
	  if (slider.transitions || dur === undefined) slider.container.css(slider.args);

	  slider.container.css('transform',target);
	};

	slider.setup = function(type) {
	  // SLIDE:
	  if (!fade) {
		var sliderOffset, arr;

		if (type === "init") {
		  slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
		  // INFINITE LOOP:
		  slider.cloneCount = 0;
		  slider.cloneOffset = 0;
		  // REVERSE:
		  if (reverse) {
			arr = $.makeArray(slider.slides).reverse();
			slider.slides = $(arr);
			slider.container.empty().append(slider.slides);
		  }
		}
		// INFINITE LOOP && !CAROUSEL:
		if (slider.vars.animationLoop && !carousel) {
		  slider.cloneCount = 2;
		  slider.cloneOffset = 1;
		  // clear out old clones
		  if (type !== "init") slider.container.find('.clone').remove();
		  slider.container.append(slider.slides.first().clone().addClass('clone').attr('aria-hidden', 'true')).prepend(slider.slides.last().clone().addClass('clone').attr('aria-hidden', 'true'));
			  methods.uniqueID( slider.slides.first().clone().addClass('clone') ).appendTo( slider.container );
			  methods.uniqueID( slider.slides.last().clone().addClass('clone') ).prependTo( slider.container );
		}
		slider.newSlides = $(slider.vars.selector, slider);

		sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
		// VERTICAL:
		if (vertical && !carousel) {
		  slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
		  setTimeout(function(){
			slider.newSlides.css({"display": "block"});
			slider.doMath();
			slider.viewport.height(slider.h);
			slider.setProps(sliderOffset * slider.h, "init");
		  }, (type === "init") ? 100 : 0);
		} else {
		  slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
		  slider.setProps(sliderOffset * slider.computedW, "init");
		  setTimeout(function(){
			slider.doMath();
			slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
			// SMOOTH HEIGHT:
			if (slider.vars.smoothHeight) methods.smoothHeight();
		  }, (type === "init") ? 100 : 0);
		}
	  } else { // FADE:
		slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
		if (type === "init") {
		  if (!touch) {
			//slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
			slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
		  } else {
			slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
		  }
		}
		// SMOOTH HEIGHT:
		if (slider.vars.smoothHeight) methods.smoothHeight();
	  }
	  // !CAROUSEL:
	  // CANDIDATE: active slide
	  if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");

	  //FlexSlider: init() Callback
	  slider.vars.init(slider);
	};

	slider.doMath = function() {
	  var slide = slider.slides.first(),
		  slideMargin = slider.vars.itemMargin,
		  minItems = slider.vars.minItems,
		  maxItems = slider.vars.maxItems;

	  slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
	  slider.h = slide.height();
	  slider.boxPadding = slide.outerWidth() - slide.width();

	  // CAROUSEL:
	  if (carousel) {
		slider.itemT = slider.vars.itemWidth + slideMargin;
		slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
		slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
		slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
					   (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
					   (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

		slider.visible = Math.floor(slider.w/(slider.itemW));
		slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
		slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
		slider.last =  slider.pagingCount - 1;
		slider.limit = (slider.pagingCount === 1) ? 0 :
					   (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
	  } else {
		slider.itemW = slider.w;
		slider.pagingCount = slider.count;
		slider.last = slider.count - 1;
	  }
	  slider.computedW = slider.itemW - slider.boxPadding;
	};

	slider.update = function(pos, action) {
	  slider.doMath();

	  // update currentSlide and slider.animatingTo if necessary
	  if (!carousel) {
		if (pos < slider.currentSlide) {
		  slider.currentSlide += 1;
		} else if (pos <= slider.currentSlide && pos !== 0) {
		  slider.currentSlide -= 1;
		}
		slider.animatingTo = slider.currentSlide;
	  }

	  // update controlNav
	  if (slider.vars.controlNav && !slider.manualControls) {
		if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
		  methods.controlNav.update("add");
		} else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
		  if (carousel && slider.currentSlide > slider.last) {
			slider.currentSlide -= 1;
			slider.animatingTo -= 1;
		  }
		  methods.controlNav.update("remove", slider.last);
		}
	  }
	  // update directionNav
	  if (slider.vars.directionNav) methods.directionNav.update();

	};

	slider.addSlide = function(obj, pos) {
	  var $obj = $(obj);

	  slider.count += 1;
	  slider.last = slider.count - 1;

	  // append new slide
	  if (vertical && reverse) {
		(pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
	  } else {
		(pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
	  }

	  // update currentSlide, animatingTo, controlNav, and directionNav
	  slider.update(pos, "add");

	  // update slider.slides
	  slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
	  // re-setup the slider to accomdate new slide
	  slider.setup();

	  //FlexSlider: added() Callback
	  slider.vars.added(slider);
	};
	slider.removeSlide = function(obj) {
	  var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

	  // update count
	  slider.count -= 1;
	  slider.last = slider.count - 1;

	  // remove slide
	  if (isNaN(obj)) {
		$(obj, slider.slides).remove();
	  } else {
		(vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
	  }

	  // update currentSlide, animatingTo, controlNav, and directionNav
	  slider.doMath();
	  slider.update(pos, "remove");

	  // update slider.slides
	  slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
	  // re-setup the slider to accomdate new slide
	  slider.setup();

	  // FlexSlider: removed() Callback
	  slider.vars.removed(slider);
	};

	slider.destroy = function() {
		var classNamespace = '.' + slider.vars.namespace; // Namespaced class selector
		if (slider.vars.controlNav) slider.controlNav.closest(classNamespace + 'control-nav').remove(); // Remove control elements if present
		if (slider.vars.directionNav) slider.directionNav.closest(classNamespace + 'direction-nav').remove(); // Remove direction-nav elements if present
		if (slider.vars.pausePlay) slider.pausePlay.closest(classNamespace + 'pauseplay').remove(); // Remove pauseplay elements if present
		slider.find('.clone').remove(); // Remove any flexslider clones
		slider.unbind(slider.vars.eventNamespace); // Remove events on slider
		if ( slider.vars.animation != "fade" ) slider.container.unwrap(); // Remove the .flex-viewport div
		slider.container.removeAttr('style') // Remove generated CSS (could collide with 3rd parties)
		slider.container.unbind(slider.vars.eventNamespace); // Remove events on slider
		slider.slides.removeAttr('style'); // Remove generated CSS (could collide with 3rd parties)
		slider.slides.filter(classNamespace + 'active-slide').removeClass(slider.vars.namespace + 'active-slide'); // Remove slide active class
		slider.slides.unbind(slider.vars.eventNamespace); // Remove events on slides
		$(document).unbind(slider.vars.eventNamespace + "-" + slider.id); // Remove events from document for this instance only
		$(window).unbind(slider.vars.eventNamespace + "-" + slider.id); // Remove events from window for this instance only
		slider.stop(); // Stop the interval
		slider.removeData('flexslider'); // Remove data
	}

	//FlexSlider: Initialize
	methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
	focused = false;
  }).focus( function ( e ) {
	focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
	namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
	eventNamespace: '.flexslider',   //{NEW} String: Event namespace string attached to all element events generated by the plugin. The period at the start of the string is required.
	selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
	animation: "fade",              //String: Select your animation type, "fade" or "slide"
	easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
	direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
	reverse: false,                 //{NEW} Boolean: Reverse the animation direction
	animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
	smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
	startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
	slideshow: true,                //Boolean: Animate slider automatically
	slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
	animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
	initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
	randomize: false,               //Boolean: Randomize slide order
	thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

	// Usability features
	pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
	pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
	pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
	useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
	touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
	video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

	// Primary Controls
	controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
	directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
	prevText: "Previous",           //String: Set the text for the "previous" directionNav item
	nextText: "Next",               //String: Set the text for the "next" directionNav item

	// Secondary Navigation
	keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
	multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
	mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
	pausePlay: false,               //Boolean: Create pause/play dynamic element
	pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
	playText: "Play",               //String: Set the text for the "play" pausePlay item

	// Special properties
	controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
	manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
	sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
	asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

	// Carousel Options
	itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
	itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
	minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
	maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
	move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
	allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

	// Callback API
	start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
	before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
	after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
	end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
	added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
	removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
	init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  var instanceId = 0;

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
	if (options === undefined) options = {};

	if (typeof options === "object") {
	  return this.each(function() {
		var $this = $(this),
			selector = (options.selector) ? options.selector : ".slides > li",
			$slides = $this.find(selector);

	  if ( ( $slides.length === 1 && options.allowOneSlide === true ) || $slides.length === 0 ) {
		  $slides.fadeIn(400);
		  if (options.start) options.start($this);
		} else if ($this.data('flexslider') === undefined) {
		  new $.flexslider(this, options, instanceId++);
		}
	  });
	} else {
	  // Helper strings to quickly perform functions on the slider
	  var $slider = $(this).data('flexslider');
	  switch (options) {
		case "play": $slider.play(); break;
		case "pause": $slider.pause(); break;
		case "stop": $slider.stop(); break;
		case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
		case "prev":
		case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
		case "destroy": $slider.destroy(); break;
		default: if (typeof options === "number") $slider.flexAnimate(options, true);
	  }
	}
  };
})(jQuery);

/*!
 * Select2 4.0.1
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
	// AMD. Register as an anonymous module.
	define(['jquery'], factory);
  } else if (typeof exports === 'object') {
	// Node/CommonJS
	factory(require('jquery'));
  } else {
	// Browser globals
	factory(jQuery);
  }
}(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
	var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
	var main, req, makeMap, handlers,
		defined = {},
		waiting = {},
		config = {},
		defining = {},
		hasOwn = Object.prototype.hasOwnProperty,
		aps = [].slice,
		jsSuffixRegExp = /\.js$/;

	function hasProp(obj, prop) {
		return hasOwn.call(obj, prop);
	}

	/**
	 * Given a relative module name, like ./something, normalize it to
	 * a real name that can be mapped to a path.
	 * @param {String} name the relative name
	 * @param {String} baseName a real name that the name arg is relative
	 * to.
	 * @returns {String} normalized name
	 */
	function normalize(name, baseName) {
		var nameParts, nameSegment, mapValue, foundMap, lastIndex,
			foundI, foundStarMap, starI, i, j, part,
			baseParts = baseName && baseName.split("/"),
			map = config.map,
			starMap = (map && map['*']) || {};

		//Adjust any relative paths.
		if (name && name.charAt(0) === ".") {
			//If have a base name, try to normalize against it,
			//otherwise, assume it is a top-level require that will
			//be relative to baseUrl in the end.
			if (baseName) {
				name = name.split('/');
				lastIndex = name.length - 1;

				// Node .js allowance:
				if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
					name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
				}

				//Lop off the last part of baseParts, so that . matches the
				//"directory" and not name of the baseName's module. For instance,
				//baseName of "one/two/three", maps to "one/two/three.js", but we
				//want the directory, "one/two" for this normalization.
				name = baseParts.slice(0, baseParts.length - 1).concat(name);

				//start trimDots
				for (i = 0; i < name.length; i += 1) {
					part = name[i];
					if (part === ".") {
						name.splice(i, 1);
						i -= 1;
					} else if (part === "..") {
						if (i === 1 && (name[2] === '..' || name[0] === '..')) {
							//End of the line. Keep at least one non-dot
							//path segment at the front so it can be mapped
							//correctly to disk. Otherwise, there is likely
							//no path mapping for a path starting with '..'.
							//This can still fail, but catches the most reasonable
							//uses of ..
							break;
						} else if (i > 0) {
							name.splice(i - 1, 2);
							i -= 2;
						}
					}
				}
				//end trimDots

				name = name.join("/");
			} else if (name.indexOf('./') === 0) {
				// No baseName, so this is ID is resolved relative
				// to baseUrl, pull off the leading dot.
				name = name.substring(2);
			}
		}

		//Apply map config if available.
		if ((baseParts || starMap) && map) {
			nameParts = name.split('/');

			for (i = nameParts.length; i > 0; i -= 1) {
				nameSegment = nameParts.slice(0, i).join("/");

				if (baseParts) {
					//Find the longest baseName segment match in the config.
					//So, do joins on the biggest to smallest lengths of baseParts.
					for (j = baseParts.length; j > 0; j -= 1) {
						mapValue = map[baseParts.slice(0, j).join('/')];

						//baseName segment has  config, find if it has one for
						//this name.
						if (mapValue) {
							mapValue = mapValue[nameSegment];
							if (mapValue) {
								//Match, update name to the new value.
								foundMap = mapValue;
								foundI = i;
								break;
							}
						}
					}
				}

				if (foundMap) {
					break;
				}

				//Check for a star map match, but just hold on to it,
				//if there is a shorter segment match later in a matching
				//config, then favor over this star map.
				if (!foundStarMap && starMap && starMap[nameSegment]) {
					foundStarMap = starMap[nameSegment];
					starI = i;
				}
			}

			if (!foundMap && foundStarMap) {
				foundMap = foundStarMap;
				foundI = starI;
			}

			if (foundMap) {
				nameParts.splice(0, foundI, foundMap);
				name = nameParts.join('/');
			}
		}

		return name;
	}

	function makeRequire(relName, forceSync) {
		return function () {
			//A version of a require function that passes a moduleName
			//value for items that may need to
			//look up paths relative to the moduleName
			var args = aps.call(arguments, 0);

			//If first arg is not require('string'), and there is only
			//one arg, it is the array form without a callback. Insert
			//a null so that the following concat is correct.
			if (typeof args[0] !== 'string' && args.length === 1) {
				args.push(null);
			}
			return req.apply(undef, args.concat([relName, forceSync]));
		};
	}

	function makeNormalize(relName) {
		return function (name) {
			return normalize(name, relName);
		};
	}

	function makeLoad(depName) {
		return function (value) {
			defined[depName] = value;
		};
	}

	function callDep(name) {
		if (hasProp(waiting, name)) {
			var args = waiting[name];
			delete waiting[name];
			defining[name] = true;
			main.apply(undef, args);
		}

		if (!hasProp(defined, name) && !hasProp(defining, name)) {
			throw new Error('No ' + name);
		}
		return defined[name];
	}

	//Turns a plugin!resource to [plugin, resource]
	//with the plugin being undefined if the name
	//did not have a plugin prefix.
	function splitPrefix(name) {
		var prefix,
			index = name ? name.indexOf('!') : -1;
		if (index > -1) {
			prefix = name.substring(0, index);
			name = name.substring(index + 1, name.length);
		}
		return [prefix, name];
	}

	/**
	 * Makes a name map, normalizing the name, and using a plugin
	 * for normalization if necessary. Grabs a ref to plugin
	 * too, as an optimization.
	 */
	makeMap = function (name, relName) {
		var plugin,
			parts = splitPrefix(name),
			prefix = parts[0];

		name = parts[1];

		if (prefix) {
			prefix = normalize(prefix, relName);
			plugin = callDep(prefix);
		}

		//Normalize according
		if (prefix) {
			if (plugin && plugin.normalize) {
				name = plugin.normalize(name, makeNormalize(relName));
			} else {
				name = normalize(name, relName);
			}
		} else {
			name = normalize(name, relName);
			parts = splitPrefix(name);
			prefix = parts[0];
			name = parts[1];
			if (prefix) {
				plugin = callDep(prefix);
			}
		}

		//Using ridiculous property names for space reasons
		return {
			f: prefix ? prefix + '!' + name : name, //fullName
			n: name,
			pr: prefix,
			p: plugin
		};
	};

	function makeConfig(name) {
		return function () {
			return (config && config.config && config.config[name]) || {};
		};
	}

	handlers = {
		require: function (name) {
			return makeRequire(name);
		},
		exports: function (name) {
			var e = defined[name];
			if (typeof e !== 'undefined') {
				return e;
			} else {
				return (defined[name] = {});
			}
		},
		module: function (name) {
			return {
				id: name,
				uri: '',
				exports: defined[name],
				config: makeConfig(name)
			};
		}
	};

	main = function (name, deps, callback, relName) {
		var cjsModule, depName, ret, map, i,
			args = [],
			callbackType = typeof callback,
			usingExports;

		//Use name if no relName
		relName = relName || name;

		//Call the callback to define the module, if necessary.
		if (callbackType === 'undefined' || callbackType === 'function') {
			//Pull out the defined dependencies and pass the ordered
			//values to the callback.
			//Default to [require, exports, module] if no deps
			deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
			for (i = 0; i < deps.length; i += 1) {
				map = makeMap(deps[i], relName);
				depName = map.f;

				//Fast path CommonJS standard dependencies.
				if (depName === "require") {
					args[i] = handlers.require(name);
				} else if (depName === "exports") {
					//CommonJS module spec 1.1
					args[i] = handlers.exports(name);
					usingExports = true;
				} else if (depName === "module") {
					//CommonJS module spec 1.1
					cjsModule = args[i] = handlers.module(name);
				} else if (hasProp(defined, depName) ||
						   hasProp(waiting, depName) ||
						   hasProp(defining, depName)) {
					args[i] = callDep(depName);
				} else if (map.p) {
					map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
					args[i] = defined[depName];
				} else {
					throw new Error(name + ' missing ' + depName);
				}
			}

			ret = callback ? callback.apply(defined[name], args) : undefined;

			if (name) {
				//If setting exports via "module" is in play,
				//favor that over return value and exports. After that,
				//favor a non-undefined return value over exports use.
				if (cjsModule && cjsModule.exports !== undef &&
						cjsModule.exports !== defined[name]) {
					defined[name] = cjsModule.exports;
				} else if (ret !== undef || !usingExports) {
					//Use the return value from the function.
					defined[name] = ret;
				}
			}
		} else if (name) {
			//May just be an object definition for the module. Only
			//worry about defining if have a module name.
			defined[name] = callback;
		}
	};

	requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
		if (typeof deps === "string") {
			if (handlers[deps]) {
				//callback in this case is really relName
				return handlers[deps](callback);
			}
			//Just return the module wanted. In this scenario, the
			//deps arg is the module name, and second arg (if passed)
			//is just the relName.
			//Normalize module name, if it contains . or ..
			return callDep(makeMap(deps, callback).f);
		} else if (!deps.splice) {
			//deps is a config object, not an array.
			config = deps;
			if (config.deps) {
				req(config.deps, config.callback);
			}
			if (!callback) {
				return;
			}

			if (callback.splice) {
				//callback is an array, which means it is a dependency list.
				//Adjust args if there are dependencies
				deps = callback;
				callback = relName;
				relName = null;
			} else {
				deps = undef;
			}
		}

		//Support require(['a'])
		callback = callback || function () {};

		//If relName is a function, it is an errback handler,
		//so remove it.
		if (typeof relName === 'function') {
			relName = forceSync;
			forceSync = alt;
		}

		//Simulate async callback;
		if (forceSync) {
			main(undef, deps, callback, relName);
		} else {
			//Using a non-zero value because of concern for what old browsers
			//do, and latest browsers "upgrade" to 4 if lower value is used:
			//http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
			//If want a value immediately, use require('id') instead -- something
			//that works in almond on the global level, but not guaranteed and
			//unlikely to work in other AMD implementations.
			setTimeout(function () {
				main(undef, deps, callback, relName);
			}, 4);
		}

		return req;
	};

	/**
	 * Just drops the config on the floor, but returns req in case
	 * the config return value is used.
	 */
	req.config = function (cfg) {
		return req(cfg);
	};

	/**
	 * Expose module registry for debugging and tooling
	 */
	requirejs._defined = defined;

	define = function (name, deps, callback) {
		if (typeof name !== 'string') {
			throw new Error('See almond README: incorrect module build, no module name');
		}

		//This module may not have dependencies
		if (!deps.splice) {
			//deps is not an array, so probably means
			//an object literal or factory function for
			//the value. Adjust args.
			callback = deps;
			deps = [];
		}

		if (!hasProp(defined, name) && !hasProp(waiting, name)) {
			waiting[name] = [name, deps, callback];
		}
	};

	define.amd = {
		jQuery: true
	};
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
	console.error(
	  'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
	  'found. Make sure that you are including jQuery before Select2 on your ' +
	  'web page.'
	);
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
	var __hasProp = {}.hasOwnProperty;

	function BaseConstructor () {
	  this.constructor = ChildClass;
	}

	for (var key in SuperClass) {
	  if (__hasProp.call(SuperClass, key)) {
		ChildClass[key] = SuperClass[key];
	  }
	}

	BaseConstructor.prototype = SuperClass.prototype;
	ChildClass.prototype = new BaseConstructor();
	ChildClass.__super__ = SuperClass.prototype;

	return ChildClass;
  };

  function getMethods (theClass) {
	var proto = theClass.prototype;

	var methods = [];

	for (var methodName in proto) {
	  var m = proto[methodName];

	  if (typeof m !== 'function') {
		continue;
	  }

	  if (methodName === 'constructor') {
		continue;
	  }

	  methods.push(methodName);
	}

	return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
	var decoratedMethods = getMethods(DecoratorClass);
	var superMethods = getMethods(SuperClass);

	function DecoratedClass () {
	  var unshift = Array.prototype.unshift;

	  var argCount = DecoratorClass.prototype.constructor.length;

	  var calledConstructor = SuperClass.prototype.constructor;

	  if (argCount > 0) {
		unshift.call(arguments, SuperClass.prototype.constructor);

		calledConstructor = DecoratorClass.prototype.constructor;
	  }

	  calledConstructor.apply(this, arguments);
	}

	DecoratorClass.displayName = SuperClass.displayName;

	function ctr () {
	  this.constructor = DecoratedClass;
	}

	DecoratedClass.prototype = new ctr();

	for (var m = 0; m < superMethods.length; m++) {
		var superMethod = superMethods[m];

		DecoratedClass.prototype[superMethod] =
		  SuperClass.prototype[superMethod];
	}

	var calledMethod = function (methodName) {
	  // Stub out the original method if it's not decorating an actual method
	  var originalMethod = function () {};

	  if (methodName in DecoratedClass.prototype) {
		originalMethod = DecoratedClass.prototype[methodName];
	  }

	  var decoratedMethod = DecoratorClass.prototype[methodName];

	  return function () {
		var unshift = Array.prototype.unshift;

		unshift.call(arguments, originalMethod);

		return decoratedMethod.apply(this, arguments);
	  };
	};

	for (var d = 0; d < decoratedMethods.length; d++) {
	  var decoratedMethod = decoratedMethods[d];

	  DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
	}

	return DecoratedClass;
  };

  var Observable = function () {
	this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
	this.listeners = this.listeners || {};

	if (event in this.listeners) {
	  this.listeners[event].push(callback);
	} else {
	  this.listeners[event] = [callback];
	}
  };

  Observable.prototype.trigger = function (event) {
	var slice = Array.prototype.slice;

	this.listeners = this.listeners || {};

	if (event in this.listeners) {
	  this.invoke(this.listeners[event], slice.call(arguments, 1));
	}

	if ('*' in this.listeners) {
	  this.invoke(this.listeners['*'], arguments);
	}
  };

  Observable.prototype.invoke = function (listeners, params) {
	for (var i = 0, len = listeners.length; i < len; i++) {
	  listeners[i].apply(this, params);
	}
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
	var chars = '';

	for (var i = 0; i < length; i++) {
	  var randomChar = Math.floor(Math.random() * 36);
	  chars += randomChar.toString(36);
	}

	return chars;
  };

  Utils.bind = function (func, context) {
	return function () {
	  func.apply(context, arguments);
	};
  };

  Utils._convertData = function (data) {
	for (var originalKey in data) {
	  var keys = originalKey.split('-');

	  var dataLevel = data;

	  if (keys.length === 1) {
		continue;
	  }

	  for (var k = 0; k < keys.length; k++) {
		var key = keys[k];

		// Lowercase the first letter
		// By default, dash-separated becomes camelCase
		key = key.substring(0, 1).toLowerCase() + key.substring(1);

		if (!(key in dataLevel)) {
		  dataLevel[key] = {};
		}

		if (k == keys.length - 1) {
		  dataLevel[key] = data[originalKey];
		}

		dataLevel = dataLevel[key];
	  }

	  delete data[originalKey];
	}

	return data;
  };

  Utils.hasScroll = function (index, el) {
	// Adapted from the function created by @ShadowScripter
	// and adapted by @BillBarry on the Stack Exchange Code Review website.
	// The original code can be found at
	// http://codereview.stackexchange.com/q/13338
	// and was designed to be used with the Sizzle selector engine.

	var $el = $(el);
	var overflowX = el.style.overflowX;
	var overflowY = el.style.overflowY;

	//Check both x and y declarations
	if (overflowX === overflowY &&
		(overflowY === 'hidden' || overflowY === 'visible')) {
	  return false;
	}

	if (overflowX === 'scroll' || overflowY === 'scroll') {
	  return true;
	}

	return ($el.innerHeight() < el.scrollHeight ||
	  $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
	var replaceMap = {
	  '\\': '&#92;',
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#39;',
	  '/': '&#47;'
	};

	// Do not try to escape the markup if it's not a string
	if (typeof markup !== 'string') {
	  return markup;
	}

	return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
	  return replaceMap[match];
	});
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
	// jQuery 1.7.x does not support $.fn.append() with an array
	// Fall back to a jQuery object collection using $.fn.add()
	if ($.fn.jquery.substr(0, 3) === '1.7') {
	  var $jqNodes = $();

	  $.map($nodes, function (node) {
		$jqNodes = $jqNodes.add(node);
	  });

	  $nodes = $jqNodes;
	}

	$element.append($nodes);
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
	this.$element = $element;
	this.data = dataAdapter;
	this.options = options;

	Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
	var $results = $(
	  '<ul class="select2-results__options" role="tree"></ul>'
	);

	if (this.options.get('multiple')) {
	  $results.attr('aria-multiselectable', 'true');
	}

	this.$results = $results;

	return $results;
  };

  Results.prototype.clear = function () {
	this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
	var escapeMarkup = this.options.get('escapeMarkup');

	this.clear();
	this.hideLoading();

	var $message = $(
	  '<li role="treeitem" aria-live="assertive"' +
	  ' class="select2-results__option"></li>'
	);

	var message = this.options.get('translations').get(params.message);

	$message.append(
	  escapeMarkup(
		message(params.args)
	  )
	);

	$message[0].className += ' select2-results__message';

	this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
	this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
	this.hideLoading();

	var $options = [];

	if (data.results == null || data.results.length === 0) {
	  if (this.$results.children().length === 0) {
		this.trigger('results:message', {
		  message: 'noResults'
		});
	  }

	  return;
	}

	data.results = this.sort(data.results);

	for (var d = 0; d < data.results.length; d++) {
	  var item = data.results[d];

	  var $option = this.option(item);

	  $options.push($option);
	}

	this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
	var $resultsContainer = $dropdown.find('.select2-results');
	$resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
	var sorter = this.options.get('sorter');

	return sorter(data);
  };

  Results.prototype.setClasses = function () {
	var self = this;

	this.data.current(function (selected) {
	  var selectedIds = $.map(selected, function (s) {
		return s.id.toString();
	  });

	  var $options = self.$results
		.find('.select2-results__option[aria-selected]');

	  $options.each(function () {
		var $option = $(this);

		var item = $.data(this, 'data');

		// id needs to be converted to a string when comparing
		var id = '' + item.id;

		if ((item.element != null && item.element.selected) ||
			(item.element == null && $.inArray(id, selectedIds) > -1)) {
		  $option.attr('aria-selected', 'true');
		} else {
		  $option.attr('aria-selected', 'false');
		}
	  });

	  var $selected = $options.filter('[aria-selected=true]');

	  // Check if there are any selected options
	  if ($selected.length > 0) {
		// If there are selected options, highlight the first
		$selected.first().trigger('mouseenter');
	  } else {
		// If there are no selected options, highlight the first option
		// in the dropdown
		$options.first().trigger('mouseenter');
	  }
	});
  };

  Results.prototype.showLoading = function (params) {
	this.hideLoading();

	var loadingMore = this.options.get('translations').get('searching');

	var loading = {
	  disabled: true,
	  loading: true,
	  text: loadingMore(params)
	};
	var $loading = this.option(loading);
	$loading.className += ' loading-results';

	this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
	this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
	var option = document.createElement('li');
	option.className = 'select2-results__option';

	var attrs = {
	  'role': 'treeitem',
	  'aria-selected': 'false'
	};

	if (data.disabled) {
	  delete attrs['aria-selected'];
	  attrs['aria-disabled'] = 'true';
	}

	if (data.id == null) {
	  delete attrs['aria-selected'];
	}

	if (data._resultId != null) {
	  option.id = data._resultId;
	}

	if (data.title) {
	  option.title = data.title;
	}

	if (data.children) {
	  attrs.role = 'group';
	  attrs['aria-label'] = data.text;
	  delete attrs['aria-selected'];
	}

	for (var attr in attrs) {
	  var val = attrs[attr];

	  option.setAttribute(attr, val);
	}

	if (data.children) {
	  var $option = $(option);

	  var label = document.createElement('strong');
	  label.className = 'select2-results__group';

	  var $label = $(label);
	  this.template(data, label);

	  var $children = [];

	  for (var c = 0; c < data.children.length; c++) {
		var child = data.children[c];

		var $child = this.option(child);

		$children.push($child);
	  }

	  var $childrenContainer = $('<ul></ul>', {
		'class': 'select2-results__options select2-results__options--nested'
	  });

	  $childrenContainer.append($children);

	  $option.append(label);
	  $option.append($childrenContainer);
	} else {
	  this.template(data, option);
	}

	$.data(option, 'data', data);

	return option;
  };

  Results.prototype.bind = function (container, $container) {
	var self = this;

	var id = container.id + '-results';

	this.$results.attr('id', id);

	container.on('results:all', function (params) {
	  self.clear();
	  self.append(params.data);

	  if (container.isOpen()) {
		self.setClasses();
	  }
	});

	container.on('results:append', function (params) {
	  self.append(params.data);

	  if (container.isOpen()) {
		self.setClasses();
	  }
	});

	container.on('query', function (params) {
	  self.hideMessages();
	  self.showLoading(params);
	});

	container.on('select', function () {
	  if (!container.isOpen()) {
		return;
	  }

	  self.setClasses();
	});

	container.on('unselect', function () {
	  if (!container.isOpen()) {
		return;
	  }

	  self.setClasses();
	});

	container.on('open', function () {
	  // When the dropdown is open, aria-expended="true"
	  self.$results.attr('aria-expanded', 'true');
	  self.$results.attr('aria-hidden', 'false');

	  self.setClasses();
	  self.ensureHighlightVisible();
	});

	container.on('close', function () {
	  // When the dropdown is closed, aria-expended="false"
	  self.$results.attr('aria-expanded', 'false');
	  self.$results.attr('aria-hidden', 'true');
	  self.$results.removeAttr('aria-activedescendant');
	});

	container.on('results:toggle', function () {
	  var $highlighted = self.getHighlightedResults();

	  if ($highlighted.length === 0) {
		return;
	  }

	  $highlighted.trigger('mouseup');
	});

	container.on('results:select', function () {
	  var $highlighted = self.getHighlightedResults();

	  if ($highlighted.length === 0) {
		return;
	  }

	  var data = $highlighted.data('data');

	  if ($highlighted.attr('aria-selected') == 'true') {
		self.trigger('close', {});
	  } else {
		self.trigger('select', {
		  data: data
		});
	  }
	});

	container.on('results:previous', function () {
	  var $highlighted = self.getHighlightedResults();

	  var $options = self.$results.find('[aria-selected]');

	  var currentIndex = $options.index($highlighted);

	  // If we are already at te top, don't move further
	  if (currentIndex === 0) {
		return;
	  }

	  var nextIndex = currentIndex - 1;

	  // If none are highlighted, highlight the first
	  if ($highlighted.length === 0) {
		nextIndex = 0;
	  }

	  var $next = $options.eq(nextIndex);

	  $next.trigger('mouseenter');

	  var currentOffset = self.$results.offset().top;
	  var nextTop = $next.offset().top;
	  var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

	  if (nextIndex === 0) {
		self.$results.scrollTop(0);
	  } else if (nextTop - currentOffset < 0) {
		self.$results.scrollTop(nextOffset);
	  }
	});

	container.on('results:next', function () {
	  var $highlighted = self.getHighlightedResults();

	  var $options = self.$results.find('[aria-selected]');

	  var currentIndex = $options.index($highlighted);

	  var nextIndex = currentIndex + 1;

	  // If we are at the last option, stay there
	  if (nextIndex >= $options.length) {
		return;
	  }

	  var $next = $options.eq(nextIndex);

	  $next.trigger('mouseenter');

	  var currentOffset = self.$results.offset().top +
		self.$results.outerHeight(false);
	  var nextBottom = $next.offset().top + $next.outerHeight(false);
	  var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

	  if (nextIndex === 0) {
		self.$results.scrollTop(0);
	  } else if (nextBottom > currentOffset) {
		self.$results.scrollTop(nextOffset);
	  }
	});

	container.on('results:focus', function (params) {
	  params.element.addClass('select2-results__option--highlighted');
	});

	container.on('results:message', function (params) {
	  self.displayMessage(params);
	});

	if ($.fn.mousewheel) {
	  this.$results.on('mousewheel', function (e) {
		var top = self.$results.scrollTop();

		var bottom = (
		  self.$results.get(0).scrollHeight -
		  self.$results.scrollTop() +
		  e.deltaY
		);

		var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
		var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

		if (isAtTop) {
		  self.$results.scrollTop(0);

		  e.preventDefault();
		  e.stopPropagation();
		} else if (isAtBottom) {
		  self.$results.scrollTop(
			self.$results.get(0).scrollHeight - self.$results.height()
		  );

		  e.preventDefault();
		  e.stopPropagation();
		}
	  });
	}

	this.$results.on('mouseup', '.select2-results__option[aria-selected]',
	  function (evt) {
	  var $this = $(this);

	  var data = $this.data('data');

	  if ($this.attr('aria-selected') === 'true') {
		if (self.options.get('multiple')) {
		  self.trigger('unselect', {
			originalEvent: evt,
			data: data
		  });
		} else {
		  self.trigger('close', {});
		}

		return;
	  }

	  self.trigger('select', {
		originalEvent: evt,
		data: data
	  });
	});

	this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
	  function (evt) {
	  var data = $(this).data('data');

	  self.getHighlightedResults()
		  .removeClass('select2-results__option--highlighted');

	  self.trigger('results:focus', {
		data: data,
		element: $(this)
	  });
	});
  };

  Results.prototype.getHighlightedResults = function () {
	var $highlighted = this.$results
	.find('.select2-results__option--highlighted');

	return $highlighted;
  };

  Results.prototype.destroy = function () {
	this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
	var $highlighted = this.getHighlightedResults();

	if ($highlighted.length === 0) {
	  return;
	}

	var $options = this.$results.find('[aria-selected]');

	var currentIndex = $options.index($highlighted);

	var currentOffset = this.$results.offset().top;
	var nextTop = $highlighted.offset().top;
	var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

	var offsetDelta = nextTop - currentOffset;
	nextOffset -= $highlighted.outerHeight(false) * 2;

	if (currentIndex <= 2) {
	  this.$results.scrollTop(0);
	} else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
	  this.$results.scrollTop(nextOffset);
	}
  };

  Results.prototype.template = function (result, container) {
	var template = this.options.get('templateResult');
	var escapeMarkup = this.options.get('escapeMarkup');

	var content = template(result, container);

	if (content == null) {
	  container.style.display = 'none';
	} else if (typeof content === 'string') {
	  container.innerHTML = escapeMarkup(content);
	} else {
	  $(container).append(content);
	}
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	ESC: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
	this.$element = $element;
	this.options = options;

	BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
	var $selection = $(
	  '<span class="select2-selection" role="combobox" ' +
	  ' aria-haspopup="true" aria-expanded="false">' +
	  '</span>'
	);

	this._tabindex = 0;

	if (this.$element.data('old-tabindex') != null) {
	  this._tabindex = this.$element.data('old-tabindex');
	} else if (this.$element.attr('tabindex') != null) {
	  this._tabindex = this.$element.attr('tabindex');
	}

	$selection.attr('title', this.$element.attr('title'));
	$selection.attr('tabindex', this._tabindex);

	this.$selection = $selection;

	return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
	var self = this;

	var id = container.id + '-container';
	var resultsId = container.id + '-results';

	this.container = container;

	this.$selection.on('focus', function (evt) {
	  self.trigger('focus', evt);
	});

	this.$selection.on('blur', function (evt) {
	  self._handleBlur(evt);
	});

	this.$selection.on('keydown', function (evt) {
	  self.trigger('keypress', evt);

	  if (evt.which === KEYS.SPACE) {
		evt.preventDefault();
	  }
	});

	container.on('results:focus', function (params) {
	  self.$selection.attr('aria-activedescendant', params.data._resultId);
	});

	container.on('selection:update', function (params) {
	  self.update(params.data);
	});

	container.on('open', function () {
	  // When the dropdown is open, aria-expanded="true"
	  self.$selection.attr('aria-expanded', 'true');
	  self.$selection.attr('aria-owns', resultsId);

	  self._attachCloseHandler(container);
	});

	container.on('close', function () {
	  // When the dropdown is closed, aria-expanded="false"
	  self.$selection.attr('aria-expanded', 'false');
	  self.$selection.removeAttr('aria-activedescendant');
	  self.$selection.removeAttr('aria-owns');

	  self.$selection.focus();

	  self._detachCloseHandler(container);
	});

	container.on('enable', function () {
	  self.$selection.attr('tabindex', self._tabindex);
	});

	container.on('disable', function () {
	  self.$selection.attr('tabindex', '-1');
	});
  };

  BaseSelection.prototype._handleBlur = function (evt) {
	var self = this;

	// This needs to be delayed as the active element is the body when the tab
	// key is pressed, possibly along with others.
	window.setTimeout(function () {
	  // Don't trigger `blur` if the focus is still in the selection
	  if (
		(document.activeElement == self.$selection[0]) ||
		($.contains(self.$selection[0], document.activeElement))
	  ) {
		return;
	  }

	  self.trigger('blur', evt);
	}, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
	var self = this;

	$(document.body).on('mousedown.select2.' + container.id, function (e) {
	  var $target = $(e.target);

	  var $select = $target.closest('.select2');

	  var $all = $('.select2.select2-container--open');

	  $all.each(function () {
		var $this = $(this);

		if (this == $select[0]) {
		  return;
		}

		var $element = $this.data('element');

		$element.select2('close');
	  });
	});
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
	$(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
	var $selectionContainer = $container.find('.selection');
	$selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
	this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
	throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
	SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
	var $selection = SingleSelection.__super__.render.call(this);

	$selection.addClass('select2-selection--single');

	$selection.html(
	  '<span class="select2-selection__rendered"></span>' +
	  '<span class="select2-selection__arrow" role="presentation">' +
		'<b role="presentation"></b>' +
	  '</span>'
	);

	return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
	var self = this;

	SingleSelection.__super__.bind.apply(this, arguments);

	var id = container.id + '-container';

	this.$selection.find('.select2-selection__rendered').attr('id', id);
	this.$selection.attr('aria-labelledby', id);

	this.$selection.on('mousedown', function (evt) {
	  // Only respond to left clicks
	  if (evt.which !== 1) {
		return;
	  }

	  self.trigger('toggle', {
		originalEvent: evt
	  });
	});

	this.$selection.on('focus', function (evt) {
	  // User focuses on the container
	});

	this.$selection.on('blur', function (evt) {
	  // User exits the container
	});

	container.on('selection:update', function (params) {
	  self.update(params.data);
	});
  };

  SingleSelection.prototype.clear = function () {
	this.$selection.find('.select2-selection__rendered').empty();
  };

  SingleSelection.prototype.display = function (data, container) {
	var template = this.options.get('templateSelection');
	var escapeMarkup = this.options.get('escapeMarkup');

	return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
	return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
	if (data.length === 0) {
	  this.clear();
	  return;
	}

	var selection = data[0];

	var $rendered = this.$selection.find('.select2-selection__rendered');
	var formatted = this.display(selection, $rendered);

	$rendered.empty().append(formatted);
	$rendered.prop('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
	MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
	var $selection = MultipleSelection.__super__.render.call(this);

	$selection.addClass('select2-selection--multiple');

	$selection.html(
	  '<ul class="select2-selection__rendered"></ul>'
	);

	return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
	var self = this;

	MultipleSelection.__super__.bind.apply(this, arguments);

	this.$selection.on('click', function (evt) {
	  self.trigger('toggle', {
		originalEvent: evt
	  });
	});

	this.$selection.on(
	  'click',
	  '.select2-selection__choice__remove',
	  function (evt) {
		// Ignore the event if it is disabled
		if (self.options.get('disabled')) {
		  return;
		}

		var $remove = $(this);
		var $selection = $remove.parent();

		var data = $selection.data('data');

		self.trigger('unselect', {
		  originalEvent: evt,
		  data: data
		});
	  }
	);
  };

  MultipleSelection.prototype.clear = function () {
	this.$selection.find('.select2-selection__rendered').empty();
  };

  MultipleSelection.prototype.display = function (data, container) {
	var template = this.options.get('templateSelection');
	var escapeMarkup = this.options.get('escapeMarkup');

	return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
	var $container = $(
	  '<li class="select2-selection__choice">' +
		'<span class="select2-selection__choice__remove" role="presentation">' +
		  '&times;' +
		'</span>' +
	  '</li>'
	);

	return $container;
  };

  MultipleSelection.prototype.update = function (data) {
	this.clear();

	if (data.length === 0) {
	  return;
	}

	var $selections = [];

	for (var d = 0; d < data.length; d++) {
	  var selection = data[d];

	  var $selection = this.selectionContainer();
	  var formatted = this.display(selection, $selection);

	  $selection.append(formatted);
	  $selection.prop('title', selection.title || selection.text);

	  $selection.data('data', selection);

	  $selections.push($selection);
	}

	var $rendered = this.$selection.find('.select2-selection__rendered');

	Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
	this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

	decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
	if (typeof placeholder === 'string') {
	  placeholder = {
		id: '',
		text: placeholder
	  };
	}

	return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
	var $placeholder = this.selectionContainer();

	$placeholder.html(this.display(placeholder));
	$placeholder.addClass('select2-selection__placeholder')
				.removeClass('select2-selection__choice');

	return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
	var singlePlaceholder = (
	  data.length == 1 && data[0].id != this.placeholder.id
	);
	var multipleSelections = data.length > 1;

	if (multipleSelections || singlePlaceholder) {
	  return decorated.call(this, data);
	}

	this.clear();

	var $placeholder = this.createPlaceholder(this.placeholder);

	this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys'
], function ($, KEYS) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	if (this.placeholder == null) {
	  if (this.options.get('debug') && window.console && console.error) {
		console.error(
		  'Select2: The `allowClear` option should be used in combination ' +
		  'with the `placeholder` option.'
		);
	  }
	}

	this.$selection.on('mousedown', '.select2-selection__clear',
	  function (evt) {
		self._handleClear(evt);
	});

	container.on('keypress', function (evt) {
	  self._handleKeyboardClear(evt, container);
	});
  };

  AllowClear.prototype._handleClear = function (_, evt) {
	// Ignore the event if it is disabled
	if (this.options.get('disabled')) {
	  return;
	}

	var $clear = this.$selection.find('.select2-selection__clear');

	// Ignore the event if nothing has been selected
	if ($clear.length === 0) {
	  return;
	}

	evt.stopPropagation();

	var data = $clear.data('data');

	for (var d = 0; d < data.length; d++) {
	  var unselectData = {
		data: data[d]
	  };

	  // Trigger the `unselect` event, so people can prevent it from being
	  // cleared.
	  this.trigger('unselect', unselectData);

	  // If the event was prevented, don't clear it out.
	  if (unselectData.prevented) {
		return;
	  }
	}

	this.$element.val(this.placeholder.id).trigger('change');

	this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
	if (container.isOpen()) {
	  return;
	}

	if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
	  this._handleClear(evt);
	}
  };

  AllowClear.prototype.update = function (decorated, data) {
	decorated.call(this, data);

	if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
		data.length === 0) {
	  return;
	}

	var $remove = $(
	  '<span class="select2-selection__clear">' +
		'&times;' +
	  '</span>'
	);
	$remove.data('data', data);

	this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
	decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
	var $search = $(
	  '<li class="select2-search select2-search--inline">' +
		'<input class="select2-search__field" type="search" tabindex="-1"' +
		' autocomplete="off" autocorrect="off" autocapitalize="off"' +
		' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
	  '</li>'
	);

	this.$searchContainer = $search;
	this.$search = $search.find('input');

	var $rendered = decorated.call(this);

	this._transferTabIndex();

	return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	container.on('open', function () {
	  self.$search.trigger('focus');
	});

	container.on('close', function () {
	  self.$search.val('');
	  self.$search.removeAttr('aria-activedescendant');
	  self.$search.trigger('focus');
	});

	container.on('enable', function () {
	  self.$search.prop('disabled', false);

	  self._transferTabIndex();
	});

	container.on('disable', function () {
	  self.$search.prop('disabled', true);
	});

	container.on('focus', function (evt) {
	  self.$search.trigger('focus');
	});

	container.on('results:focus', function (params) {
	  self.$search.attr('aria-activedescendant', params.id);
	});

	this.$selection.on('focusin', '.select2-search--inline', function (evt) {
	  self.trigger('focus', evt);
	});

	this.$selection.on('focusout', '.select2-search--inline', function (evt) {
	  self._handleBlur(evt);
	});

	this.$selection.on('keydown', '.select2-search--inline', function (evt) {
	  evt.stopPropagation();

	  self.trigger('keypress', evt);

	  self._keyUpPrevented = evt.isDefaultPrevented();

	  var key = evt.which;

	  if (key === KEYS.BACKSPACE && self.$search.val() === '') {
		var $previousChoice = self.$searchContainer
		  .prev('.select2-selection__choice');

		if ($previousChoice.length > 0) {
		  var item = $previousChoice.data('data');

		  self.searchRemoveChoice(item);

		  evt.preventDefault();
		}
	  }
	});

	// Try to detect the IE version should the `documentMode` property that
	// is stored on the document. This is only implemented in IE and is
	// slightly cleaner than doing a user agent check.
	// This property is not available in Edge, but Edge also doesn't have
	// this bug.
	var msie = document.documentMode;
	var disableInputEvents = msie && msie <= 11;

	// Workaround for browsers which do not support the `input` event
	// This will prevent double-triggering of events for browsers which support
	// both the `keyup` and `input` events.
	this.$selection.on(
	  'input.searchcheck',
	  '.select2-search--inline',
	  function (evt) {
		// IE will trigger the `input` event when a placeholder is used on a
		// search box. To get around this issue, we are forced to ignore all
		// `input` events in IE and keep using `keyup`.
		if (disableInputEvents) {
		  self.$selection.off('input.search input.searchcheck');
		  return;
		}

		// Unbind the duplicated `keyup` event
		self.$selection.off('keyup.search');
	  }
	);

	this.$selection.on(
	  'keyup.search input.search',
	  '.select2-search--inline',
	  function (evt) {
		// IE will trigger the `input` event when a placeholder is used on a
		// search box. To get around this issue, we are forced to ignore all
		// `input` events in IE and keep using `keyup`.
		if (disableInputEvents && evt.type === 'input') {
		  self.$selection.off('input.search input.searchcheck');
		  return;
		}

		var key = evt.which;

		// We can freely ignore events from modifier keys
		if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
		  return;
		}

		// Tabbing will be handled during the `keydown` phase
		if (key == KEYS.TAB) {
		  return;
		}

		self.handleSearch(evt);
	  }
	);
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
	this.$search.attr('tabindex', this.$selection.attr('tabindex'));
	this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
	this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
	var searchHadFocus = this.$search[0] == document.activeElement;

	this.$search.attr('placeholder', '');

	decorated.call(this, data);

	this.$selection.find('.select2-selection__rendered')
				   .append(this.$searchContainer);

	this.resizeSearch();
	if (searchHadFocus) {
	  this.$search.focus();
	}
  };

  Search.prototype.handleSearch = function () {
	this.resizeSearch();

	if (!this._keyUpPrevented) {
	  var input = this.$search.val();

	  this.trigger('query', {
		term: input
	  });
	}

	this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
	this.trigger('unselect', {
	  data: item
	});

	this.$search.val(item.text);
	this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
	this.$search.css('width', '25px');

	var width = '';

	if (this.$search.attr('placeholder') !== '') {
	  width = this.$selection.find('.select2-selection__rendered').innerWidth();
	} else {
	  var minimumWidth = this.$search.val().length + 1;

	  width = (minimumWidth * 0.75) + 'em';
	}

	this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
	var self = this;
	var relayEvents = [
	  'open', 'opening',
	  'close', 'closing',
	  'select', 'selecting',
	  'unselect', 'unselecting'
	];

	var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

	decorated.call(this, container, $container);

	container.on('*', function (name, params) {
	  // Ignore events that should not be relayed
	  if ($.inArray(name, relayEvents) === -1) {
		return;
	  }

	  // The parameters should always be an object
	  params = params || {};

	  // Generate the jQuery event for the Select2 event
	  var evt = $.Event('select2:' + name, {
		params: params
	  });

	  self.$element.trigger(evt);

	  // Only handle preventable events if it was one
	  if ($.inArray(name, preventableEvents) === -1) {
		return;
	  }

	  params.prevented = evt.isDefaultPrevented();
	});
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
	this.dict = dict || {};
  }

  Translation.prototype.all = function () {
	return this.dict;
  };

  Translation.prototype.get = function (key) {
	return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
	this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
	if (!(path in Translation._cache)) {
	  var translations = require(path);

	  Translation._cache[path] = translations;
	}

	return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
	'\u24B6': 'A',
	'\uFF21': 'A',
	'\u00C0': 'A',
	'\u00C1': 'A',
	'\u00C2': 'A',
	'\u1EA6': 'A',
	'\u1EA4': 'A',
	'\u1EAA': 'A',
	'\u1EA8': 'A',
	'\u00C3': 'A',
	'\u0100': 'A',
	'\u0102': 'A',
	'\u1EB0': 'A',
	'\u1EAE': 'A',
	'\u1EB4': 'A',
	'\u1EB2': 'A',
	'\u0226': 'A',
	'\u01E0': 'A',
	'\u00C4': 'A',
	'\u01DE': 'A',
	'\u1EA2': 'A',
	'\u00C5': 'A',
	'\u01FA': 'A',
	'\u01CD': 'A',
	'\u0200': 'A',
	'\u0202': 'A',
	'\u1EA0': 'A',
	'\u1EAC': 'A',
	'\u1EB6': 'A',
	'\u1E00': 'A',
	'\u0104': 'A',
	'\u023A': 'A',
	'\u2C6F': 'A',
	'\uA732': 'AA',
	'\u00C6': 'AE',
	'\u01FC': 'AE',
	'\u01E2': 'AE',
	'\uA734': 'AO',
	'\uA736': 'AU',
	'\uA738': 'AV',
	'\uA73A': 'AV',
	'\uA73C': 'AY',
	'\u24B7': 'B',
	'\uFF22': 'B',
	'\u1E02': 'B',
	'\u1E04': 'B',
	'\u1E06': 'B',
	'\u0243': 'B',
	'\u0182': 'B',
	'\u0181': 'B',
	'\u24B8': 'C',
	'\uFF23': 'C',
	'\u0106': 'C',
	'\u0108': 'C',
	'\u010A': 'C',
	'\u010C': 'C',
	'\u00C7': 'C',
	'\u1E08': 'C',
	'\u0187': 'C',
	'\u023B': 'C',
	'\uA73E': 'C',
	'\u24B9': 'D',
	'\uFF24': 'D',
	'\u1E0A': 'D',
	'\u010E': 'D',
	'\u1E0C': 'D',
	'\u1E10': 'D',
	'\u1E12': 'D',
	'\u1E0E': 'D',
	'\u0110': 'D',
	'\u018B': 'D',
	'\u018A': 'D',
	'\u0189': 'D',
	'\uA779': 'D',
	'\u01F1': 'DZ',
	'\u01C4': 'DZ',
	'\u01F2': 'Dz',
	'\u01C5': 'Dz',
	'\u24BA': 'E',
	'\uFF25': 'E',
	'\u00C8': 'E',
	'\u00C9': 'E',
	'\u00CA': 'E',
	'\u1EC0': 'E',
	'\u1EBE': 'E',
	'\u1EC4': 'E',
	'\u1EC2': 'E',
	'\u1EBC': 'E',
	'\u0112': 'E',
	'\u1E14': 'E',
	'\u1E16': 'E',
	'\u0114': 'E',
	'\u0116': 'E',
	'\u00CB': 'E',
	'\u1EBA': 'E',
	'\u011A': 'E',
	'\u0204': 'E',
	'\u0206': 'E',
	'\u1EB8': 'E',
	'\u1EC6': 'E',
	'\u0228': 'E',
	'\u1E1C': 'E',
	'\u0118': 'E',
	'\u1E18': 'E',
	'\u1E1A': 'E',
	'\u0190': 'E',
	'\u018E': 'E',
	'\u24BB': 'F',
	'\uFF26': 'F',
	'\u1E1E': 'F',
	'\u0191': 'F',
	'\uA77B': 'F',
	'\u24BC': 'G',
	'\uFF27': 'G',
	'\u01F4': 'G',
	'\u011C': 'G',
	'\u1E20': 'G',
	'\u011E': 'G',
	'\u0120': 'G',
	'\u01E6': 'G',
	'\u0122': 'G',
	'\u01E4': 'G',
	'\u0193': 'G',
	'\uA7A0': 'G',
	'\uA77D': 'G',
	'\uA77E': 'G',
	'\u24BD': 'H',
	'\uFF28': 'H',
	'\u0124': 'H',
	'\u1E22': 'H',
	'\u1E26': 'H',
	'\u021E': 'H',
	'\u1E24': 'H',
	'\u1E28': 'H',
	'\u1E2A': 'H',
	'\u0126': 'H',
	'\u2C67': 'H',
	'\u2C75': 'H',
	'\uA78D': 'H',
	'\u24BE': 'I',
	'\uFF29': 'I',
	'\u00CC': 'I',
	'\u00CD': 'I',
	'\u00CE': 'I',
	'\u0128': 'I',
	'\u012A': 'I',
	'\u012C': 'I',
	'\u0130': 'I',
	'\u00CF': 'I',
	'\u1E2E': 'I',
	'\u1EC8': 'I',
	'\u01CF': 'I',
	'\u0208': 'I',
	'\u020A': 'I',
	'\u1ECA': 'I',
	'\u012E': 'I',
	'\u1E2C': 'I',
	'\u0197': 'I',
	'\u24BF': 'J',
	'\uFF2A': 'J',
	'\u0134': 'J',
	'\u0248': 'J',
	'\u24C0': 'K',
	'\uFF2B': 'K',
	'\u1E30': 'K',
	'\u01E8': 'K',
	'\u1E32': 'K',
	'\u0136': 'K',
	'\u1E34': 'K',
	'\u0198': 'K',
	'\u2C69': 'K',
	'\uA740': 'K',
	'\uA742': 'K',
	'\uA744': 'K',
	'\uA7A2': 'K',
	'\u24C1': 'L',
	'\uFF2C': 'L',
	'\u013F': 'L',
	'\u0139': 'L',
	'\u013D': 'L',
	'\u1E36': 'L',
	'\u1E38': 'L',
	'\u013B': 'L',
	'\u1E3C': 'L',
	'\u1E3A': 'L',
	'\u0141': 'L',
	'\u023D': 'L',
	'\u2C62': 'L',
	'\u2C60': 'L',
	'\uA748': 'L',
	'\uA746': 'L',
	'\uA780': 'L',
	'\u01C7': 'LJ',
	'\u01C8': 'Lj',
	'\u24C2': 'M',
	'\uFF2D': 'M',
	'\u1E3E': 'M',
	'\u1E40': 'M',
	'\u1E42': 'M',
	'\u2C6E': 'M',
	'\u019C': 'M',
	'\u24C3': 'N',
	'\uFF2E': 'N',
	'\u01F8': 'N',
	'\u0143': 'N',
	'\u00D1': 'N',
	'\u1E44': 'N',
	'\u0147': 'N',
	'\u1E46': 'N',
	'\u0145': 'N',
	'\u1E4A': 'N',
	'\u1E48': 'N',
	'\u0220': 'N',
	'\u019D': 'N',
	'\uA790': 'N',
	'\uA7A4': 'N',
	'\u01CA': 'NJ',
	'\u01CB': 'Nj',
	'\u24C4': 'O',
	'\uFF2F': 'O',
	'\u00D2': 'O',
	'\u00D3': 'O',
	'\u00D4': 'O',
	'\u1ED2': 'O',
	'\u1ED0': 'O',
	'\u1ED6': 'O',
	'\u1ED4': 'O',
	'\u00D5': 'O',
	'\u1E4C': 'O',
	'\u022C': 'O',
	'\u1E4E': 'O',
	'\u014C': 'O',
	'\u1E50': 'O',
	'\u1E52': 'O',
	'\u014E': 'O',
	'\u022E': 'O',
	'\u0230': 'O',
	'\u00D6': 'O',
	'\u022A': 'O',
	'\u1ECE': 'O',
	'\u0150': 'O',
	'\u01D1': 'O',
	'\u020C': 'O',
	'\u020E': 'O',
	'\u01A0': 'O',
	'\u1EDC': 'O',
	'\u1EDA': 'O',
	'\u1EE0': 'O',
	'\u1EDE': 'O',
	'\u1EE2': 'O',
	'\u1ECC': 'O',
	'\u1ED8': 'O',
	'\u01EA': 'O',
	'\u01EC': 'O',
	'\u00D8': 'O',
	'\u01FE': 'O',
	'\u0186': 'O',
	'\u019F': 'O',
	'\uA74A': 'O',
	'\uA74C': 'O',
	'\u01A2': 'OI',
	'\uA74E': 'OO',
	'\u0222': 'OU',
	'\u24C5': 'P',
	'\uFF30': 'P',
	'\u1E54': 'P',
	'\u1E56': 'P',
	'\u01A4': 'P',
	'\u2C63': 'P',
	'\uA750': 'P',
	'\uA752': 'P',
	'\uA754': 'P',
	'\u24C6': 'Q',
	'\uFF31': 'Q',
	'\uA756': 'Q',
	'\uA758': 'Q',
	'\u024A': 'Q',
	'\u24C7': 'R',
	'\uFF32': 'R',
	'\u0154': 'R',
	'\u1E58': 'R',
	'\u0158': 'R',
	'\u0210': 'R',
	'\u0212': 'R',
	'\u1E5A': 'R',
	'\u1E5C': 'R',
	'\u0156': 'R',
	'\u1E5E': 'R',
	'\u024C': 'R',
	'\u2C64': 'R',
	'\uA75A': 'R',
	'\uA7A6': 'R',
	'\uA782': 'R',
	'\u24C8': 'S',
	'\uFF33': 'S',
	'\u1E9E': 'S',
	'\u015A': 'S',
	'\u1E64': 'S',
	'\u015C': 'S',
	'\u1E60': 'S',
	'\u0160': 'S',
	'\u1E66': 'S',
	'\u1E62': 'S',
	'\u1E68': 'S',
	'\u0218': 'S',
	'\u015E': 'S',
	'\u2C7E': 'S',
	'\uA7A8': 'S',
	'\uA784': 'S',
	'\u24C9': 'T',
	'\uFF34': 'T',
	'\u1E6A': 'T',
	'\u0164': 'T',
	'\u1E6C': 'T',
	'\u021A': 'T',
	'\u0162': 'T',
	'\u1E70': 'T',
	'\u1E6E': 'T',
	'\u0166': 'T',
	'\u01AC': 'T',
	'\u01AE': 'T',
	'\u023E': 'T',
	'\uA786': 'T',
	'\uA728': 'TZ',
	'\u24CA': 'U',
	'\uFF35': 'U',
	'\u00D9': 'U',
	'\u00DA': 'U',
	'\u00DB': 'U',
	'\u0168': 'U',
	'\u1E78': 'U',
	'\u016A': 'U',
	'\u1E7A': 'U',
	'\u016C': 'U',
	'\u00DC': 'U',
	'\u01DB': 'U',
	'\u01D7': 'U',
	'\u01D5': 'U',
	'\u01D9': 'U',
	'\u1EE6': 'U',
	'\u016E': 'U',
	'\u0170': 'U',
	'\u01D3': 'U',
	'\u0214': 'U',
	'\u0216': 'U',
	'\u01AF': 'U',
	'\u1EEA': 'U',
	'\u1EE8': 'U',
	'\u1EEE': 'U',
	'\u1EEC': 'U',
	'\u1EF0': 'U',
	'\u1EE4': 'U',
	'\u1E72': 'U',
	'\u0172': 'U',
	'\u1E76': 'U',
	'\u1E74': 'U',
	'\u0244': 'U',
	'\u24CB': 'V',
	'\uFF36': 'V',
	'\u1E7C': 'V',
	'\u1E7E': 'V',
	'\u01B2': 'V',
	'\uA75E': 'V',
	'\u0245': 'V',
	'\uA760': 'VY',
	'\u24CC': 'W',
	'\uFF37': 'W',
	'\u1E80': 'W',
	'\u1E82': 'W',
	'\u0174': 'W',
	'\u1E86': 'W',
	'\u1E84': 'W',
	'\u1E88': 'W',
	'\u2C72': 'W',
	'\u24CD': 'X',
	'\uFF38': 'X',
	'\u1E8A': 'X',
	'\u1E8C': 'X',
	'\u24CE': 'Y',
	'\uFF39': 'Y',
	'\u1EF2': 'Y',
	'\u00DD': 'Y',
	'\u0176': 'Y',
	'\u1EF8': 'Y',
	'\u0232': 'Y',
	'\u1E8E': 'Y',
	'\u0178': 'Y',
	'\u1EF6': 'Y',
	'\u1EF4': 'Y',
	'\u01B3': 'Y',
	'\u024E': 'Y',
	'\u1EFE': 'Y',
	'\u24CF': 'Z',
	'\uFF3A': 'Z',
	'\u0179': 'Z',
	'\u1E90': 'Z',
	'\u017B': 'Z',
	'\u017D': 'Z',
	'\u1E92': 'Z',
	'\u1E94': 'Z',
	'\u01B5': 'Z',
	'\u0224': 'Z',
	'\u2C7F': 'Z',
	'\u2C6B': 'Z',
	'\uA762': 'Z',
	'\u24D0': 'a',
	'\uFF41': 'a',
	'\u1E9A': 'a',
	'\u00E0': 'a',
	'\u00E1': 'a',
	'\u00E2': 'a',
	'\u1EA7': 'a',
	'\u1EA5': 'a',
	'\u1EAB': 'a',
	'\u1EA9': 'a',
	'\u00E3': 'a',
	'\u0101': 'a',
	'\u0103': 'a',
	'\u1EB1': 'a',
	'\u1EAF': 'a',
	'\u1EB5': 'a',
	'\u1EB3': 'a',
	'\u0227': 'a',
	'\u01E1': 'a',
	'\u00E4': 'a',
	'\u01DF': 'a',
	'\u1EA3': 'a',
	'\u00E5': 'a',
	'\u01FB': 'a',
	'\u01CE': 'a',
	'\u0201': 'a',
	'\u0203': 'a',
	'\u1EA1': 'a',
	'\u1EAD': 'a',
	'\u1EB7': 'a',
	'\u1E01': 'a',
	'\u0105': 'a',
	'\u2C65': 'a',
	'\u0250': 'a',
	'\uA733': 'aa',
	'\u00E6': 'ae',
	'\u01FD': 'ae',
	'\u01E3': 'ae',
	'\uA735': 'ao',
	'\uA737': 'au',
	'\uA739': 'av',
	'\uA73B': 'av',
	'\uA73D': 'ay',
	'\u24D1': 'b',
	'\uFF42': 'b',
	'\u1E03': 'b',
	'\u1E05': 'b',
	'\u1E07': 'b',
	'\u0180': 'b',
	'\u0183': 'b',
	'\u0253': 'b',
	'\u24D2': 'c',
	'\uFF43': 'c',
	'\u0107': 'c',
	'\u0109': 'c',
	'\u010B': 'c',
	'\u010D': 'c',
	'\u00E7': 'c',
	'\u1E09': 'c',
	'\u0188': 'c',
	'\u023C': 'c',
	'\uA73F': 'c',
	'\u2184': 'c',
	'\u24D3': 'd',
	'\uFF44': 'd',
	'\u1E0B': 'd',
	'\u010F': 'd',
	'\u1E0D': 'd',
	'\u1E11': 'd',
	'\u1E13': 'd',
	'\u1E0F': 'd',
	'\u0111': 'd',
	'\u018C': 'd',
	'\u0256': 'd',
	'\u0257': 'd',
	'\uA77A': 'd',
	'\u01F3': 'dz',
	'\u01C6': 'dz',
	'\u24D4': 'e',
	'\uFF45': 'e',
	'\u00E8': 'e',
	'\u00E9': 'e',
	'\u00EA': 'e',
	'\u1EC1': 'e',
	'\u1EBF': 'e',
	'\u1EC5': 'e',
	'\u1EC3': 'e',
	'\u1EBD': 'e',
	'\u0113': 'e',
	'\u1E15': 'e',
	'\u1E17': 'e',
	'\u0115': 'e',
	'\u0117': 'e',
	'\u00EB': 'e',
	'\u1EBB': 'e',
	'\u011B': 'e',
	'\u0205': 'e',
	'\u0207': 'e',
	'\u1EB9': 'e',
	'\u1EC7': 'e',
	'\u0229': 'e',
	'\u1E1D': 'e',
	'\u0119': 'e',
	'\u1E19': 'e',
	'\u1E1B': 'e',
	'\u0247': 'e',
	'\u025B': 'e',
	'\u01DD': 'e',
	'\u24D5': 'f',
	'\uFF46': 'f',
	'\u1E1F': 'f',
	'\u0192': 'f',
	'\uA77C': 'f',
	'\u24D6': 'g',
	'\uFF47': 'g',
	'\u01F5': 'g',
	'\u011D': 'g',
	'\u1E21': 'g',
	'\u011F': 'g',
	'\u0121': 'g',
	'\u01E7': 'g',
	'\u0123': 'g',
	'\u01E5': 'g',
	'\u0260': 'g',
	'\uA7A1': 'g',
	'\u1D79': 'g',
	'\uA77F': 'g',
	'\u24D7': 'h',
	'\uFF48': 'h',
	'\u0125': 'h',
	'\u1E23': 'h',
	'\u1E27': 'h',
	'\u021F': 'h',
	'\u1E25': 'h',
	'\u1E29': 'h',
	'\u1E2B': 'h',
	'\u1E96': 'h',
	'\u0127': 'h',
	'\u2C68': 'h',
	'\u2C76': 'h',
	'\u0265': 'h',
	'\u0195': 'hv',
	'\u24D8': 'i',
	'\uFF49': 'i',
	'\u00EC': 'i',
	'\u00ED': 'i',
	'\u00EE': 'i',
	'\u0129': 'i',
	'\u012B': 'i',
	'\u012D': 'i',
	'\u00EF': 'i',
	'\u1E2F': 'i',
	'\u1EC9': 'i',
	'\u01D0': 'i',
	'\u0209': 'i',
	'\u020B': 'i',
	'\u1ECB': 'i',
	'\u012F': 'i',
	'\u1E2D': 'i',
	'\u0268': 'i',
	'\u0131': 'i',
	'\u24D9': 'j',
	'\uFF4A': 'j',
	'\u0135': 'j',
	'\u01F0': 'j',
	'\u0249': 'j',
	'\u24DA': 'k',
	'\uFF4B': 'k',
	'\u1E31': 'k',
	'\u01E9': 'k',
	'\u1E33': 'k',
	'\u0137': 'k',
	'\u1E35': 'k',
	'\u0199': 'k',
	'\u2C6A': 'k',
	'\uA741': 'k',
	'\uA743': 'k',
	'\uA745': 'k',
	'\uA7A3': 'k',
	'\u24DB': 'l',
	'\uFF4C': 'l',
	'\u0140': 'l',
	'\u013A': 'l',
	'\u013E': 'l',
	'\u1E37': 'l',
	'\u1E39': 'l',
	'\u013C': 'l',
	'\u1E3D': 'l',
	'\u1E3B': 'l',
	'\u017F': 'l',
	'\u0142': 'l',
	'\u019A': 'l',
	'\u026B': 'l',
	'\u2C61': 'l',
	'\uA749': 'l',
	'\uA781': 'l',
	'\uA747': 'l',
	'\u01C9': 'lj',
	'\u24DC': 'm',
	'\uFF4D': 'm',
	'\u1E3F': 'm',
	'\u1E41': 'm',
	'\u1E43': 'm',
	'\u0271': 'm',
	'\u026F': 'm',
	'\u24DD': 'n',
	'\uFF4E': 'n',
	'\u01F9': 'n',
	'\u0144': 'n',
	'\u00F1': 'n',
	'\u1E45': 'n',
	'\u0148': 'n',
	'\u1E47': 'n',
	'\u0146': 'n',
	'\u1E4B': 'n',
	'\u1E49': 'n',
	'\u019E': 'n',
	'\u0272': 'n',
	'\u0149': 'n',
	'\uA791': 'n',
	'\uA7A5': 'n',
	'\u01CC': 'nj',
	'\u24DE': 'o',
	'\uFF4F': 'o',
	'\u00F2': 'o',
	'\u00F3': 'o',
	'\u00F4': 'o',
	'\u1ED3': 'o',
	'\u1ED1': 'o',
	'\u1ED7': 'o',
	'\u1ED5': 'o',
	'\u00F5': 'o',
	'\u1E4D': 'o',
	'\u022D': 'o',
	'\u1E4F': 'o',
	'\u014D': 'o',
	'\u1E51': 'o',
	'\u1E53': 'o',
	'\u014F': 'o',
	'\u022F': 'o',
	'\u0231': 'o',
	'\u00F6': 'o',
	'\u022B': 'o',
	'\u1ECF': 'o',
	'\u0151': 'o',
	'\u01D2': 'o',
	'\u020D': 'o',
	'\u020F': 'o',
	'\u01A1': 'o',
	'\u1EDD': 'o',
	'\u1EDB': 'o',
	'\u1EE1': 'o',
	'\u1EDF': 'o',
	'\u1EE3': 'o',
	'\u1ECD': 'o',
	'\u1ED9': 'o',
	'\u01EB': 'o',
	'\u01ED': 'o',
	'\u00F8': 'o',
	'\u01FF': 'o',
	'\u0254': 'o',
	'\uA74B': 'o',
	'\uA74D': 'o',
	'\u0275': 'o',
	'\u01A3': 'oi',
	'\u0223': 'ou',
	'\uA74F': 'oo',
	'\u24DF': 'p',
	'\uFF50': 'p',
	'\u1E55': 'p',
	'\u1E57': 'p',
	'\u01A5': 'p',
	'\u1D7D': 'p',
	'\uA751': 'p',
	'\uA753': 'p',
	'\uA755': 'p',
	'\u24E0': 'q',
	'\uFF51': 'q',
	'\u024B': 'q',
	'\uA757': 'q',
	'\uA759': 'q',
	'\u24E1': 'r',
	'\uFF52': 'r',
	'\u0155': 'r',
	'\u1E59': 'r',
	'\u0159': 'r',
	'\u0211': 'r',
	'\u0213': 'r',
	'\u1E5B': 'r',
	'\u1E5D': 'r',
	'\u0157': 'r',
	'\u1E5F': 'r',
	'\u024D': 'r',
	'\u027D': 'r',
	'\uA75B': 'r',
	'\uA7A7': 'r',
	'\uA783': 'r',
	'\u24E2': 's',
	'\uFF53': 's',
	'\u00DF': 's',
	'\u015B': 's',
	'\u1E65': 's',
	'\u015D': 's',
	'\u1E61': 's',
	'\u0161': 's',
	'\u1E67': 's',
	'\u1E63': 's',
	'\u1E69': 's',
	'\u0219': 's',
	'\u015F': 's',
	'\u023F': 's',
	'\uA7A9': 's',
	'\uA785': 's',
	'\u1E9B': 's',
	'\u24E3': 't',
	'\uFF54': 't',
	'\u1E6B': 't',
	'\u1E97': 't',
	'\u0165': 't',
	'\u1E6D': 't',
	'\u021B': 't',
	'\u0163': 't',
	'\u1E71': 't',
	'\u1E6F': 't',
	'\u0167': 't',
	'\u01AD': 't',
	'\u0288': 't',
	'\u2C66': 't',
	'\uA787': 't',
	'\uA729': 'tz',
	'\u24E4': 'u',
	'\uFF55': 'u',
	'\u00F9': 'u',
	'\u00FA': 'u',
	'\u00FB': 'u',
	'\u0169': 'u',
	'\u1E79': 'u',
	'\u016B': 'u',
	'\u1E7B': 'u',
	'\u016D': 'u',
	'\u00FC': 'u',
	'\u01DC': 'u',
	'\u01D8': 'u',
	'\u01D6': 'u',
	'\u01DA': 'u',
	'\u1EE7': 'u',
	'\u016F': 'u',
	'\u0171': 'u',
	'\u01D4': 'u',
	'\u0215': 'u',
	'\u0217': 'u',
	'\u01B0': 'u',
	'\u1EEB': 'u',
	'\u1EE9': 'u',
	'\u1EEF': 'u',
	'\u1EED': 'u',
	'\u1EF1': 'u',
	'\u1EE5': 'u',
	'\u1E73': 'u',
	'\u0173': 'u',
	'\u1E77': 'u',
	'\u1E75': 'u',
	'\u0289': 'u',
	'\u24E5': 'v',
	'\uFF56': 'v',
	'\u1E7D': 'v',
	'\u1E7F': 'v',
	'\u028B': 'v',
	'\uA75F': 'v',
	'\u028C': 'v',
	'\uA761': 'vy',
	'\u24E6': 'w',
	'\uFF57': 'w',
	'\u1E81': 'w',
	'\u1E83': 'w',
	'\u0175': 'w',
	'\u1E87': 'w',
	'\u1E85': 'w',
	'\u1E98': 'w',
	'\u1E89': 'w',
	'\u2C73': 'w',
	'\u24E7': 'x',
	'\uFF58': 'x',
	'\u1E8B': 'x',
	'\u1E8D': 'x',
	'\u24E8': 'y',
	'\uFF59': 'y',
	'\u1EF3': 'y',
	'\u00FD': 'y',
	'\u0177': 'y',
	'\u1EF9': 'y',
	'\u0233': 'y',
	'\u1E8F': 'y',
	'\u00FF': 'y',
	'\u1EF7': 'y',
	'\u1E99': 'y',
	'\u1EF5': 'y',
	'\u01B4': 'y',
	'\u024F': 'y',
	'\u1EFF': 'y',
	'\u24E9': 'z',
	'\uFF5A': 'z',
	'\u017A': 'z',
	'\u1E91': 'z',
	'\u017C': 'z',
	'\u017E': 'z',
	'\u1E93': 'z',
	'\u1E95': 'z',
	'\u01B6': 'z',
	'\u0225': 'z',
	'\u0240': 'z',
	'\u2C6C': 'z',
	'\uA763': 'z',
	'\u0386': '\u0391',
	'\u0388': '\u0395',
	'\u0389': '\u0397',
	'\u038A': '\u0399',
	'\u03AA': '\u0399',
	'\u038C': '\u039F',
	'\u038E': '\u03A5',
	'\u03AB': '\u03A5',
	'\u038F': '\u03A9',
	'\u03AC': '\u03B1',
	'\u03AD': '\u03B5',
	'\u03AE': '\u03B7',
	'\u03AF': '\u03B9',
	'\u03CA': '\u03B9',
	'\u0390': '\u03B9',
	'\u03CC': '\u03BF',
	'\u03CD': '\u03C5',
	'\u03CB': '\u03C5',
	'\u03B0': '\u03C5',
	'\u03C9': '\u03C9',
	'\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
	BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
	throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
	throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
	// Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
	// Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
	var id = container.id + '-result-';

	id += Utils.generateChars(4);

	if (data.id != null) {
	  id += '-' + data.id.toString();
	} else {
	  id += '-' + Utils.generateChars(4);
	}
	return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
	this.$element = $element;
	this.options = options;

	SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
	var data = [];
	var self = this;

	this.$element.find(':selected').each(function () {
	  var $option = $(this);

	  var option = self.item($option);

	  data.push(option);
	});

	callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
	var self = this;

	data.selected = true;

	// If data.element is a DOM node, use it instead
	if ($(data.element).is('option')) {
	  data.element.selected = true;

	  this.$element.trigger('change');

	  return;
	}

	if (this.$element.prop('multiple')) {
	  this.current(function (currentData) {
		var val = [];

		data = [data];
		data.push.apply(data, currentData);

		for (var d = 0; d < data.length; d++) {
		  var id = data[d].id;

		  if ($.inArray(id, val) === -1) {
			val.push(id);
		  }
		}

		self.$element.val(val);
		self.$element.trigger('change');
	  });
	} else {
	  var val = data.id;

	  this.$element.val(val);
	  this.$element.trigger('change');
	}
  };

  SelectAdapter.prototype.unselect = function (data) {
	var self = this;

	if (!this.$element.prop('multiple')) {
	  return;
	}

	data.selected = false;

	if ($(data.element).is('option')) {
	  data.element.selected = false;

	  this.$element.trigger('change');

	  return;
	}

	this.current(function (currentData) {
	  var val = [];

	  for (var d = 0; d < currentData.length; d++) {
		var id = currentData[d].id;

		if (id !== data.id && $.inArray(id, val) === -1) {
		  val.push(id);
		}
	  }

	  self.$element.val(val);

	  self.$element.trigger('change');
	});
  };

  SelectAdapter.prototype.bind = function (container, $container) {
	var self = this;

	this.container = container;

	container.on('select', function (params) {
	  self.select(params.data);
	});

	container.on('unselect', function (params) {
	  self.unselect(params.data);
	});
  };

  SelectAdapter.prototype.destroy = function () {
	// Remove anything added to child elements
	this.$element.find('*').each(function () {
	  // Remove any custom data set by Select2
	  $.removeData(this, 'data');
	});
  };

  SelectAdapter.prototype.query = function (params, callback) {
	var data = [];
	var self = this;

	var $options = this.$element.children();

	$options.each(function () {
	  var $option = $(this);

	  if (!$option.is('option') && !$option.is('optgroup')) {
		return;
	  }

	  var option = self.item($option);

	  var matches = self.matches(params, option);

	  if (matches !== null) {
		data.push(matches);
	  }
	});

	callback({
	  results: data
	});
  };

  SelectAdapter.prototype.addOptions = function ($options) {
	Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
	var option;

	if (data.children) {
	  option = document.createElement('optgroup');
	  option.label = data.text;
	} else {
	  option = document.createElement('option');

	  if (option.textContent !== undefined) {
		option.textContent = data.text;
	  } else {
		option.innerText = data.text;
	  }
	}

	if (data.id) {
	  option.value = data.id;
	}

	if (data.disabled) {
	  option.disabled = true;
	}

	if (data.selected) {
	  option.selected = true;
	}

	if (data.title) {
	  option.title = data.title;
	}

	var $option = $(option);

	var normalizedData = this._normalizeItem(data);
	normalizedData.element = option;

	// Override the option's data with the combined data
	$.data(option, 'data', normalizedData);

	return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
	var data = {};

	data = $.data($option[0], 'data');

	if (data != null) {
	  return data;
	}

	if ($option.is('option')) {
	  data = {
		id: $option.val(),
		text: $option.text(),
		disabled: $option.prop('disabled'),
		selected: $option.prop('selected'),
		title: $option.prop('title')
	  };
	} else if ($option.is('optgroup')) {
	  data = {
		text: $option.prop('label'),
		children: [],
		title: $option.prop('title')
	  };

	  var $children = $option.children('option');
	  var children = [];

	  for (var c = 0; c < $children.length; c++) {
		var $child = $($children[c]);

		var child = this.item($child);

		children.push(child);
	  }

	  data.children = children;
	}

	data = this._normalizeItem(data);
	data.element = $option[0];

	$.data($option[0], 'data', data);

	return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
	if (!$.isPlainObject(item)) {
	  item = {
		id: item,
		text: item
	  };
	}

	item = $.extend({}, {
	  text: ''
	}, item);

	var defaults = {
	  selected: false,
	  disabled: false
	};

	if (item.id != null) {
	  item.id = item.id.toString();
	}

	if (item.text != null) {
	  item.text = item.text.toString();
	}

	if (item._resultId == null && item.id && this.container != null) {
	  item._resultId = this.generateResultId(this.container, item);
	}

	return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
	var matcher = this.options.get('matcher');

	return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
	var data = options.get('data') || [];

	ArrayAdapter.__super__.constructor.call(this, $element, options);

	this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
	var $option = this.$element.find('option').filter(function (i, elm) {
	  return elm.value == data.id.toString();
	});

	if ($option.length === 0) {
	  $option = this.option(data);

	  this.addOptions($option);
	}

	ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
	var self = this;

	var $existing = this.$element.find('option');
	var existingIds = $existing.map(function () {
	  return self.item($(this)).id;
	}).get();

	var $options = [];

	// Filter out all items except for the one passed in the argument
	function onlyItem (item) {
	  return function () {
		return $(this).val() == item.id;
	  };
	}

	for (var d = 0; d < data.length; d++) {
	  var item = this._normalizeItem(data[d]);

	  // Skip items which were pre-loaded, only merge the data
	  if ($.inArray(item.id, existingIds) >= 0) {
		var $existingOption = $existing.filter(onlyItem(item));

		var existingData = this.item($existingOption);
		var newData = $.extend(true, {}, item, existingData);

		var $newOption = this.option(newData);

		$existingOption.replaceWith($newOption);

		continue;
	  }

	  var $option = this.option(item);

	  if (item.children) {
		var $children = this.convertToOptions(item.children);

		Utils.appendMany($option, $children);
	  }

	  $options.push($option);
	}

	return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
	this.ajaxOptions = this._applyDefaults(options.get('ajax'));

	if (this.ajaxOptions.processResults != null) {
	  this.processResults = this.ajaxOptions.processResults;
	}

	AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
	var defaults = {
	  data: function (params) {
		return $.extend({}, params, {
		  q: params.term
		});
	  },
	  transport: function (params, success, failure) {
		var $request = $.ajax(params);

		$request.then(success);
		$request.fail(failure);

		return $request;
	  }
	};

	return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
	return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
	var matches = [];
	var self = this;

	if (this._request != null) {
	  // JSONP requests cannot always be aborted
	  if ($.isFunction(this._request.abort)) {
		this._request.abort();
	  }

	  this._request = null;
	}

	var options = $.extend({
	  type: 'GET'
	}, this.ajaxOptions);

	if (typeof options.url === 'function') {
	  options.url = options.url.call(this.$element, params);
	}

	if (typeof options.data === 'function') {
	  options.data = options.data.call(this.$element, params);
	}

	function request () {
	  var $request = options.transport(options, function (data) {
		var results = self.processResults(data, params);

		if (self.options.get('debug') && window.console && console.error) {
		  // Check to make sure that the response included a `results` key.
		  if (!results || !results.results || !$.isArray(results.results)) {
			console.error(
			  'Select2: The AJAX results did not return an array in the ' +
			  '`results` key of the response.'
			);
		  }
		}

		callback(results);
	  }, function () {
		self.trigger('results:message', {
		  message: 'errorLoading'
		});
	  });

	  self._request = $request;
	}

	if (this.ajaxOptions.delay && params.term !== '') {
	  if (this._queryTimeout) {
		window.clearTimeout(this._queryTimeout);
	  }

	  this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
	} else {
	  request();
	}
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
	var tags = options.get('tags');

	var createTag = options.get('createTag');

	if (createTag !== undefined) {
	  this.createTag = createTag;
	}

	var insertTag = options.get('insertTag');

	if (insertTag !== undefined) {
		this.insertTag = insertTag;
	}

	decorated.call(this, $element, options);

	if ($.isArray(tags)) {
	  for (var t = 0; t < tags.length; t++) {
		var tag = tags[t];
		var item = this._normalizeItem(tag);

		var $option = this.option(item);

		this.$element.append($option);
	  }
	}
  }

  Tags.prototype.query = function (decorated, params, callback) {
	var self = this;

	this._removeOldTags();

	if (params.term == null || params.page != null) {
	  decorated.call(this, params, callback);
	  return;
	}

	function wrapper (obj, child) {
	  var data = obj.results;

	  for (var i = 0; i < data.length; i++) {
		var option = data[i];

		var checkChildren = (
		  option.children != null &&
		  !wrapper({
			results: option.children
		  }, true)
		);

		var checkText = option.text === params.term;

		if (checkText || checkChildren) {
		  if (child) {
			return false;
		  }

		  obj.data = data;
		  callback(obj);

		  return;
		}
	  }

	  if (child) {
		return true;
	  }

	  var tag = self.createTag(params);

	  if (tag != null) {
		var $option = self.option(tag);
		$option.attr('data-select2-tag', true);

		self.addOptions([$option]);

		self.insertTag(data, tag);
	  }

	  obj.results = data;

	  callback(obj);
	}

	decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
	var term = $.trim(params.term);

	if (term === '') {
	  return null;
	}

	return {
	  id: term,
	  text: term
	};
  };

  Tags.prototype.insertTag = function (_, data, tag) {
	data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
	var tag = this._lastTag;

	var $options = this.$element.find('option[data-select2-tag]');

	$options.each(function () {
	  if (this.selected) {
		return;
	  }

	  $(this).remove();
	});
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
	var tokenizer = options.get('tokenizer');

	if (tokenizer !== undefined) {
	  this.tokenizer = tokenizer;
	}

	decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
	decorated.call(this, container, $container);

	this.$search =  container.dropdown.$search || container.selection.$search ||
	  $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
	var self = this;

	function select (data) {
	  self.trigger('select', {
		data: data
	  });
	}

	params.term = params.term || '';

	var tokenData = this.tokenizer(params, this.options, select);

	if (tokenData.term !== params.term) {
	  // Replace the search term if we have the search box
	  if (this.$search.length) {
		this.$search.val(tokenData.term);
		this.$search.focus();
	  }

	  params.term = tokenData.term;
	}

	decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
	var separators = options.get('tokenSeparators') || [];
	var term = params.term;
	var i = 0;

	var createTag = this.createTag || function (params) {
	  return {
		id: params.term,
		text: params.term
	  };
	};

	while (i < term.length) {
	  var termChar = term[i];

	  if ($.inArray(termChar, separators) === -1) {
		i++;

		continue;
	  }

	  var part = term.substr(0, i);
	  var partParams = $.extend({}, params, {
		term: part
	  });

	  var data = createTag(partParams);

	  if (data == null) {
		i++;
		continue;
	  }

	  callback(data);

	  // Reset the term to not include the tokenized portion
	  term = term.substr(i + 1) || '';
	  i = 0;
	}

	return {
	  term: term
	};
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
	this.minimumInputLength = options.get('minimumInputLength');

	decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
	params.term = params.term || '';

	if (params.term.length < this.minimumInputLength) {
	  this.trigger('results:message', {
		message: 'inputTooShort',
		args: {
		  minimum: this.minimumInputLength,
		  input: params.term,
		  params: params
		}
	  });

	  return;
	}

	decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
	this.maximumInputLength = options.get('maximumInputLength');

	decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
	params.term = params.term || '';

	if (this.maximumInputLength > 0 &&
		params.term.length > this.maximumInputLength) {
	  this.trigger('results:message', {
		message: 'inputTooLong',
		args: {
		  maximum: this.maximumInputLength,
		  input: params.term,
		  params: params
		}
	  });

	  return;
	}

	decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
	this.maximumSelectionLength = options.get('maximumSelectionLength');

	decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
	function (decorated, params, callback) {
	  var self = this;

	  this.current(function (currentData) {
		var count = currentData != null ? currentData.length : 0;
		if (self.maximumSelectionLength > 0 &&
		  count >= self.maximumSelectionLength) {
		  self.trigger('results:message', {
			message: 'maximumSelected',
			args: {
			  maximum: self.maximumSelectionLength
			}
		  });
		  return;
		}
		decorated.call(self, params, callback);
	  });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
	this.$element = $element;
	this.options = options;

	Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
	var $dropdown = $(
	  '<span class="select2-dropdown">' +
		'<span class="select2-results"></span>' +
	  '</span>'
	);

	$dropdown.attr('dir', this.options.get('dir'));

	this.$dropdown = $dropdown;

	return $dropdown;
  };

  Dropdown.prototype.bind = function () {
	// Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
	// Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
	// Remove the dropdown from the DOM
	this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
	var $rendered = decorated.call(this);

	var $search = $(
	  '<span class="select2-search select2-search--dropdown">' +
		'<input class="select2-search__field" type="search" tabindex="-1"' +
		' autocomplete="off" autocorrect="off" autocapitalize="off"' +
		' spellcheck="false" role="textbox" />' +
	  '</span>'
	);

	this.$searchContainer = $search;
	this.$search = $search.find('input');

	$rendered.prepend($search);

	return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	this.$search.on('keydown', function (evt) {
	  self.trigger('keypress', evt);

	  self._keyUpPrevented = evt.isDefaultPrevented();
	});

	// Workaround for browsers which do not support the `input` event
	// This will prevent double-triggering of events for browsers which support
	// both the `keyup` and `input` events.
	this.$search.on('input', function (evt) {
	  // Unbind the duplicated `keyup` event
	//   $(this).off('keyup');
	});

	this.$search.on('keyup input', function (evt) {
	  self.handleSearch(evt);
	});

	container.on('open', function () {
	  self.$search.attr('tabindex', 0);

	  self.$search.focus();

	  window.setTimeout(function () {
		self.$search.focus();
	  }, 0);
	});

	container.on('close', function () {
	  self.$search.attr('tabindex', -1);

	  self.$search.val('');
	});

	container.on('results:all', function (params) {
	  if (params.query.term == null || params.query.term === '') {
		var showSearch = self.showSearch(params);

		if (showSearch) {
		  self.$searchContainer.removeClass('select2-search--hide');
		} else {
		  self.$searchContainer.addClass('select2-search--hide');
		}
	  }
	});
  };

  Search.prototype.handleSearch = function (evt) {
	if (!this._keyUpPrevented) {
	  var input = this.$search.val();

	  this.trigger('query', {
		term: input
	  });
	}

	this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
	return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
	this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

	decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
	data.results = this.removePlaceholder(data.results);

	decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
	if (typeof placeholder === 'string') {
	  placeholder = {
		id: '',
		text: placeholder
	  };
	}

	return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
	var modifiedData = data.slice(0);

	for (var d = data.length - 1; d >= 0; d--) {
	  var item = data[d];

	  if (this.placeholder.id === item.id) {
		modifiedData.splice(d, 1);
	  }
	}

	return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
	this.lastParams = {};

	decorated.call(this, $element, options, dataAdapter);

	this.$loadingMore = this.createLoadingMore();
	this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
	this.$loadingMore.remove();
	this.loading = false;

	decorated.call(this, data);

	if (this.showLoadingMore(data)) {
	  this.$results.append(this.$loadingMore);
	}
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	container.on('query', function (params) {
	  self.lastParams = params;
	  self.loading = true;
	});

	container.on('query:append', function (params) {
	  self.lastParams = params;
	  self.loading = true;
	});

	this.$results.on('scroll', function () {
	  var isLoadMoreVisible = $.contains(
		document.documentElement,
		self.$loadingMore[0]
	  );

	  if (self.loading || !isLoadMoreVisible) {
		return;
	  }

	  var currentOffset = self.$results.offset().top +
		self.$results.outerHeight(false);
	  var loadingMoreOffset = self.$loadingMore.offset().top +
		self.$loadingMore.outerHeight(false);

	  if (currentOffset + 50 >= loadingMoreOffset) {
		self.loadMore();
	  }
	});
  };

  InfiniteScroll.prototype.loadMore = function () {
	this.loading = true;

	var params = $.extend({}, {page: 1}, this.lastParams);

	params.page++;

	this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
	return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
	var $option = $(
	  '<li ' +
	  'class="select2-results__option select2-results__option--load-more"' +
	  'role="treeitem" aria-disabled="true"></li>'
	);

	var message = this.options.get('translations').get('loadingMore');

	$option.html(message(this.lastParams));

	return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') ? $(options.get('dropdownParent')) : $(document.body);

	decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
	var self = this;

	var setupResultsEvents = false;

	decorated.call(this, container, $container);

	container.on('open', function () {
	  self._showDropdown();
	  self._attachPositioningHandler(container);

	  if (!setupResultsEvents) {
		setupResultsEvents = true;

		container.on('results:all', function () {
		  self._positionDropdown();
		  self._resizeDropdown();
		});

		container.on('results:append', function () {
		  self._positionDropdown();
		  self._resizeDropdown();
		});
	  }
	});

	container.on('close', function () {
	  self._hideDropdown();
	  self._detachPositioningHandler(container);
	});

	this.$dropdownContainer.on('mousedown', function (evt) {
	  evt.stopPropagation();
	});
  };

  AttachBody.prototype.destroy = function (decorated) {
	decorated.call(this);

	this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
	// Clone all of the container classes
	$dropdown.attr('class', $container.attr('class'));

	$dropdown.removeClass('select2');
	$dropdown.addClass('select2-container--open');

	$dropdown.css({
	  position: 'absolute',
	  top: -999999
	});

	this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
	var $container = $('<span></span>');

	var $dropdown = decorated.call(this);
	$container.append($dropdown);

	this.$dropdownContainer = $container;

	return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
	this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
	  function (decorated, container) {
	var self = this;

	var scrollEvent = 'scroll.select2.' + container.id;
	var resizeEvent = 'resize.select2.' + container.id;
	var orientationEvent = 'orientationchange.select2.' + container.id;

	var $watchers = this.$container.parents().filter(Utils.hasScroll);
	$watchers.each(function () {
	  $(this).data('select2-scroll-position', {
		x: $(this).scrollLeft(),
		y: $(this).scrollTop()
	  });
	});

	$watchers.on(scrollEvent, function (ev) {
	  var position = $(this).data('select2-scroll-position');
	  $(this).scrollTop(position.y);
	});

	$(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
	  function (e) {
	  self._positionDropdown();
	  self._resizeDropdown();
	});
  };

  AttachBody.prototype._detachPositioningHandler =
	  function (decorated, container) {
	var scrollEvent = 'scroll.select2.' + container.id;
	var resizeEvent = 'resize.select2.' + container.id;
	var orientationEvent = 'orientationchange.select2.' + container.id;

	var $watchers = this.$container.parents().filter(Utils.hasScroll);
	$watchers.off(scrollEvent);

	$(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
	var $window = $(window);

	var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
	var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

	var newDirection = null;

	var offset = this.$container.offset();

	offset.bottom = offset.top + this.$container.outerHeight(false);

	var container = {
	  height: this.$container.outerHeight(false)
	};

	container.top = offset.top;
	container.bottom = offset.top + container.height;

	var dropdown = {
	  height: this.$dropdown.outerHeight(false)
	};

	var viewport = {
	  top: $window.scrollTop(),
	  bottom: $window.scrollTop() + $window.height()
	};

	var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
	var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

	var css = {
	  left: offset.left,
	  top: container.bottom
	};

	// Determine what the parent element is to use for calciulating the offset
	var $offsetParent = this.$dropdownParent;

	// For statically positoned elements, we need to get the element
	// that is determining the offset
	if ($offsetParent.css('position') === 'static') {
	  $offsetParent = $offsetParent.offsetParent();
	}

	var parentOffset = $offsetParent.offset();

	css.top -= parentOffset.top;
	css.left -= parentOffset.left;

	if (!isCurrentlyAbove && !isCurrentlyBelow) {
	  newDirection = 'below';
	}

	if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
	  newDirection = 'above';
	} else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
	  newDirection = 'below';
	}

	if (newDirection == 'above' ||
	  (isCurrentlyAbove && newDirection !== 'below')) {
	  css.top = container.top - parentOffset.top - dropdown.height;
	}

	if (newDirection != null) {
	  this.$dropdown
		.removeClass('select2-dropdown--below select2-dropdown--above')
		.addClass('select2-dropdown--' + newDirection);
	  this.$container
		.removeClass('select2-container--below select2-container--above')
		.addClass('select2-container--' + newDirection);
	}

	this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
	var css = {
	  width: this.$container.outerWidth(false) + 'px'
	};

	if (this.options.get('dropdownAutoWidth')) {
	  css.minWidth = css.width;
	  css.width = 'auto';
	}

	this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
	this.$dropdownContainer.appendTo(this.$dropdownParent);

	this._positionDropdown();
	this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
	var count = 0;

	for (var d = 0; d < data.length; d++) {
	  var item = data[d];

	  if (item.children) {
		count += countResults(item.children);
	  } else {
		count++;
	  }
	}

	return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
	this.minimumResultsForSearch = options.get('minimumResultsForSearch');

	if (this.minimumResultsForSearch < 0) {
	  this.minimumResultsForSearch = Infinity;
	}

	decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
	if (countResults(params.data.results) < this.minimumResultsForSearch) {
	  return false;
	}

	return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[

], function () {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	container.on('close', function () {
	  self._handleSelectOnClose();
	});
  };

  SelectOnClose.prototype._handleSelectOnClose = function () {
	var $highlightedResults = this.getHighlightedResults();

	// Only select highlighted results
	if ($highlightedResults.length < 1) {
	  return;
	}

	var data = $highlightedResults.data('data');

	// Don't re-select already selected resulte
	if (
	  (data.element != null && data.element.selected) ||
	  (data.element == null && data.selected)
	) {
	  return;
	}

	this.trigger('select', {
		data: data
	});
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
	var self = this;

	decorated.call(this, container, $container);

	container.on('select', function (evt) {
	  self._selectTriggered(evt);
	});

	container.on('unselect', function (evt) {
	  self._selectTriggered(evt);
	});
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
	var originalEvent = evt.originalEvent;

	// Don't close if the control key is being held
	if (originalEvent && originalEvent.ctrlKey) {
	  return;
	}

	this.trigger('close', {});
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
	errorLoading: function () {
	  return 'The results could not be loaded.';
	},
	inputTooLong: function (args) {
	  var overChars = args.input.length - args.maximum;

	  var message = 'Please delete ' + overChars + ' character';

	  if (overChars != 1) {
		message += 's';
	  }

	  return message;
	},
	inputTooShort: function (args) {
	  var remainingChars = args.minimum - args.input.length;

	  var message = 'Please enter ' + remainingChars + ' or more characters';

	  return message;
	},
	loadingMore: function () {
	  return 'Loading more results…';
	},
	maximumSelected: function (args) {
	  var message = 'You can only select ' + args.maximum + ' item';

	  if (args.maximum != 1) {
		message += 's';
	  }

	  return message;
	},
	noResults: function () {
	  return 'No results found';
	},
	searching: function () {
	  return 'Searching…';
	}
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

			 ResultsList,

			 SingleSelection, MultipleSelection, Placeholder, AllowClear,
			 SelectionSearch, EventRelay,

			 Utils, Translation, DIACRITICS,

			 SelectData, ArrayData, AjaxData, Tags, Tokenizer,
			 MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

			 Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
			 AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

			 EnglishTranslation) {
  function Defaults () {
	this.reset();
  }

  Defaults.prototype.apply = function (options) {
	options = $.extend({}, this.defaults, options);

	if (options.dataAdapter == null) {
	  if (options.ajax != null) {
		options.dataAdapter = AjaxData;
	  } else if (options.data != null) {
		options.dataAdapter = ArrayData;
	  } else {
		options.dataAdapter = SelectData;
	  }

	  if (options.minimumInputLength > 0) {
		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  MinimumInputLength
		);
	  }

	  if (options.maximumInputLength > 0) {
		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  MaximumInputLength
		);
	  }

	  if (options.maximumSelectionLength > 0) {
		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  MaximumSelectionLength
		);
	  }

	  if (options.tags) {
		options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
	  }

	  if (options.tokenSeparators != null || options.tokenizer != null) {
		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  Tokenizer
		);
	  }

	  if (options.query != null) {
		var Query = require(options.amdBase + 'compat/query');

		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  Query
		);
	  }

	  if (options.initSelection != null) {
		var InitSelection = require(options.amdBase + 'compat/initSelection');

		options.dataAdapter = Utils.Decorate(
		  options.dataAdapter,
		  InitSelection
		);
	  }
	}

	if (options.resultsAdapter == null) {
	  options.resultsAdapter = ResultsList;

	  if (options.ajax != null) {
		options.resultsAdapter = Utils.Decorate(
		  options.resultsAdapter,
		  InfiniteScroll
		);
	  }

	  if (options.placeholder != null) {
		options.resultsAdapter = Utils.Decorate(
		  options.resultsAdapter,
		  HidePlaceholder
		);
	  }

	  if (options.selectOnClose) {
		options.resultsAdapter = Utils.Decorate(
		  options.resultsAdapter,
		  SelectOnClose
		);
	  }
	}

	if (options.dropdownAdapter == null) {
	  if (options.multiple) {
		options.dropdownAdapter = Dropdown;
	  } else {
		var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

		options.dropdownAdapter = SearchableDropdown;
	  }

	  if (options.minimumResultsForSearch !== 0) {
		options.dropdownAdapter = Utils.Decorate(
		  options.dropdownAdapter,
		  MinimumResultsForSearch
		);
	  }

	  if (options.closeOnSelect) {
		options.dropdownAdapter = Utils.Decorate(
		  options.dropdownAdapter,
		  CloseOnSelect
		);
	  }

	  if (
		options.dropdownCssClass != null ||
		options.dropdownCss != null ||
		options.adaptDropdownCssClass != null
	  ) {
		var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

		options.dropdownAdapter = Utils.Decorate(
		  options.dropdownAdapter,
		  DropdownCSS
		);
	  }

	  options.dropdownAdapter = Utils.Decorate(
		options.dropdownAdapter,
		AttachBody
	  );
	}

	if (options.selectionAdapter == null) {
	  if (options.multiple) {
		options.selectionAdapter = MultipleSelection;
	  } else {
		options.selectionAdapter = SingleSelection;
	  }

	  // Add the placeholder mixin if a placeholder was specified
	  if (options.placeholder != null) {
		options.selectionAdapter = Utils.Decorate(
		  options.selectionAdapter,
		  Placeholder
		);
	  }

	  if (options.allowClear) {
		options.selectionAdapter = Utils.Decorate(
		  options.selectionAdapter,
		  AllowClear
		);
	  }

	  if (options.multiple) {
		options.selectionAdapter = Utils.Decorate(
		  options.selectionAdapter,
		  SelectionSearch
		);
	  }

	  if (
		options.containerCssClass != null ||
		options.containerCss != null ||
		options.adaptContainerCssClass != null
	  ) {
		var ContainerCSS = require(options.amdBase + 'compat/containerCss');

		options.selectionAdapter = Utils.Decorate(
		  options.selectionAdapter,
		  ContainerCSS
		);
	  }

	  options.selectionAdapter = Utils.Decorate(
		options.selectionAdapter,
		EventRelay
	  );
	}

	if (typeof options.language === 'string') {
	  // Check if the language is specified with a region
	  if (options.language.indexOf('-') > 0) {
		// Extract the region information if it is included
		var languageParts = options.language.split('-');
		var baseLanguage = languageParts[0];

		options.language = [options.language, baseLanguage];
	  } else {
		options.language = [options.language];
	  }
	}

	if ($.isArray(options.language)) {
	  var languages = new Translation();
	  options.language.push('en');

	  var languageNames = options.language;

	  for (var l = 0; l < languageNames.length; l++) {
		var name = languageNames[l];
		var language = {};

		try {
		  // Try to load it with the original name
		  language = Translation.loadPath(name);
		} catch (e) {
		  try {
			// If we couldn't load it, check if it wasn't the full path
			name = this.defaults.amdLanguageBase + name;
			language = Translation.loadPath(name);
		  } catch (ex) {
			// The translation could not be loaded at all. Sometimes this is
			// because of a configuration problem, other times this can be
			// because of how Select2 helps load all possible translation files.
			if (options.debug && window.console && console.warn) {
			  console.warn(
				'Select2: The language file for "' + name + '" could not be ' +
				'automatically loaded. A fallback will be used instead.'
			  );
			}

			continue;
		  }
		}

		languages.extend(language);
	  }

	  options.translations = languages;
	} else {
	  var baseTranslation = Translation.loadPath(
		this.defaults.amdLanguageBase + 'en'
	  );
	  var customTranslation = new Translation(options.language);

	  customTranslation.extend(baseTranslation);

	  options.translations = customTranslation;
	}

	return options;
  };

  Defaults.prototype.reset = function () {
	function stripDiacritics (text) {
	  // Used 'uni range + named function' from http://jsperf.com/diacritics/18
	  function match(a) {
		return DIACRITICS[a] || a;
	  }

	  return text.replace(/[^\u0000-\u007E]/g, match);
	}

	function matcher (params, data) {
	  // Always return the object if there is nothing to compare
	  if ($.trim(params.term) === '') {
		return data;
	  }

	  // Do a recursive check for options with children
	  if (data.children && data.children.length > 0) {
		// Clone the data object if there are children
		// This is required as we modify the object to remove any non-matches
		var match = $.extend(true, {}, data);

		// Check each child of the option
		for (var c = data.children.length - 1; c >= 0; c--) {
		  var child = data.children[c];

		  var matches = matcher(params, child);

		  // If there wasn't a match, remove the object in the array
		  if (matches == null) {
			match.children.splice(c, 1);
		  }
		}

		// If any children matched, return the new object
		if (match.children.length > 0) {
		  return match;
		}

		// If there were no matching children, check just the plain object
		return matcher(params, match);
	  }

	  var original = stripDiacritics(data.text).toUpperCase();
	  var term = stripDiacritics(params.term).toUpperCase();

	  // Check if the text contains the term
	  if (original.indexOf(term) > -1) {
		return data;
	  }

	  // If it doesn't contain the term, don't return anything
	  return null;
	}

	this.defaults = {
	  amdBase: './',
	  amdLanguageBase: './i18n/',
	  closeOnSelect: true,
	  debug: false,
	  dropdownAutoWidth: false,
	  escapeMarkup: Utils.escapeMarkup,
	  language: EnglishTranslation,
	  matcher: matcher,
	  minimumInputLength: 0,
	  maximumInputLength: 0,
	  maximumSelectionLength: 0,
	  minimumResultsForSearch: 0,
	  selectOnClose: false,
	  sorter: function (data) {
		return data;
	  },
	  templateResult: function (result) {
		return result.text;
	  },
	  templateSelection: function (selection) {
		return selection.text;
	  },
	  theme: 'default',
	  width: 'resolve'
	};
  };

  Defaults.prototype.set = function (key, value) {
	var camelKey = $.camelCase(key);

	var data = {};
	data[camelKey] = value;

	var convertedData = Utils._convertData(data);

	$.extend(this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
	this.options = options;

	if ($element != null) {
	  this.fromElement($element);
	}

	this.options = Defaults.apply(this.options);

	if ($element && $element.is('input')) {
	  var InputCompat = require(this.get('amdBase') + 'compat/inputData');

	  this.options.dataAdapter = Utils.Decorate(
		this.options.dataAdapter,
		InputCompat
	  );
	}
  }

  Options.prototype.fromElement = function ($e) {
	var excludedData = ['select2'];

	if (this.options.multiple == null) {
	  this.options.multiple = $e.prop('multiple');
	}

	if (this.options.disabled == null) {
	  this.options.disabled = $e.prop('disabled');
	}

	if (this.options.language == null) {
	  if ($e.prop('lang')) {
		this.options.language = $e.prop('lang').toLowerCase();
	  } else if ($e.closest('[lang]').prop('lang')) {
		this.options.language = $e.closest('[lang]').prop('lang');
	  }
	}

	if (this.options.dir == null) {
	  if ($e.prop('dir')) {
		this.options.dir = $e.prop('dir');
	  } else if ($e.closest('[dir]').prop('dir')) {
		this.options.dir = $e.closest('[dir]').prop('dir');
	  } else {
		this.options.dir = 'ltr';
	  }
	}

	$e.prop('disabled', this.options.disabled);
	$e.prop('multiple', this.options.multiple);

	if ($e.data('select2Tags')) {
	  if (this.options.debug && window.console && console.warn) {
		console.warn(
		  'Select2: The `data-select2-tags` attribute has been changed to ' +
		  'use the `data-data` and `data-tags="true"` attributes and will be ' +
		  'removed in future versions of Select2.'
		);
	  }

	  $e.data('data', $e.data('select2Tags'));
	  $e.data('tags', true);
	}

	if ($e.data('ajaxUrl')) {
	  if (this.options.debug && window.console && console.warn) {
		console.warn(
		  'Select2: The `data-ajax-url` attribute has been changed to ' +
		  '`data-ajax--url` and support for the old attribute will be removed' +
		  ' in future versions of Select2.'
		);
	  }

	  $e.attr('ajax--url', $e.data('ajaxUrl'));
	  $e.data('ajax--url', $e.data('ajaxUrl'));
	}

	var dataset = {};

	// Prefer the element's `dataset` attribute if it exists
	// jQuery 1.x does not correctly handle data attributes with multiple dashes
	if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
	  dataset = $.extend(true, {}, $e[0].dataset, $e.data());
	} else {
	  dataset = $e.data();
	}

	var data = $.extend(true, {}, dataset);

	data = Utils._convertData(data);

	for (var key in data) {
	  if ($.inArray(key, excludedData) > -1) {
		continue;
	  }

	  if ($.isPlainObject(this.options[key])) {
		$.extend(this.options[key], data[key]);
	  } else {
		this.options[key] = data[key];
	  }
	}

	return this;
  };

  Options.prototype.get = function (key) {
	return this.options[key];
  };

  Options.prototype.set = function (key, val) {
	this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
	if ($element.data('select2') != null) {
	  $element.data('select2').destroy();
	}

	this.$element = $element;

	this.id = this._generateId($element);

	options = options || {};

	this.options = new Options(options, $element);

	Select2.__super__.constructor.call(this);

	// Set up the tabindex

	var tabindex = $element.attr('tabindex') || 0;
	$element.data('old-tabindex', tabindex);
	$element.attr('tabindex', '-1');

	// Set up containers and adapters

	var DataAdapter = this.options.get('dataAdapter');
	this.dataAdapter = new DataAdapter($element, this.options);

	var $container = this.render();

	this._placeContainer($container);

	var SelectionAdapter = this.options.get('selectionAdapter');
	this.selection = new SelectionAdapter($element, this.options);
	this.$selection = this.selection.render();

	this.selection.position(this.$selection, $container);

	var DropdownAdapter = this.options.get('dropdownAdapter');
	this.dropdown = new DropdownAdapter($element, this.options);
	this.$dropdown = this.dropdown.render();

	this.dropdown.position(this.$dropdown, $container);

	var ResultsAdapter = this.options.get('resultsAdapter');
	this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
	this.$results = this.results.render();

	this.results.position(this.$results, this.$dropdown);

	// Bind events

	var self = this;

	// Bind the container to all of the adapters
	this._bindAdapters();

	// Register any DOM event handlers
	this._registerDomEvents();

	// Register any internal event handlers
	this._registerDataEvents();
	this._registerSelectionEvents();
	this._registerDropdownEvents();
	this._registerResultsEvents();
	this._registerEvents();

	// Set the initial state
	this.dataAdapter.current(function (initialData) {
	  self.trigger('selection:update', {
		data: initialData
	  });
	});

	// Hide the original select
	$element.addClass('select2-hidden-accessible');
	$element.attr('aria-hidden', 'true');

	// Synchronize any monitored attributes
	this._syncAttributes();

	$element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
	var id = '';

	if ($element.attr('id') != null) {
	  id = $element.attr('id');
	} else if ($element.attr('name') != null) {
	  id = $element.attr('name') + '-' + Utils.generateChars(2);
	} else {
	  id = Utils.generateChars(4);
	}

	id = 'select2-' + id;

	return id;
  };

  Select2.prototype._placeContainer = function ($container) {
	$container.insertAfter(this.$element);

	var width = this._resolveWidth(this.$element, this.options.get('width'));

	if (width != null) {
	  $container.css('width', width);
	}
  };

  Select2.prototype._resolveWidth = function ($element, method) {
	var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

	if (method == 'resolve') {
	  var styleWidth = this._resolveWidth($element, 'style');

	  if (styleWidth != null) {
		return styleWidth;
	  }

	  return this._resolveWidth($element, 'element');
	}

	if (method == 'element') {
	  var elementWidth = $element.outerWidth(false);

	  if (elementWidth <= 0) {
		return 'auto';
	  }

	  return elementWidth + 'px';
	}

	if (method == 'style') {
	  var style = $element.attr('style');

	  if (typeof(style) !== 'string') {
		return null;
	  }

	  var attrs = style.split(';');

	  for (var i = 0, l = attrs.length; i < l; i = i + 1) {
		var attr = attrs[i].replace(/\s/g, '');
		var matches = attr.match(WIDTH);

		if (matches !== null && matches.length >= 1) {
		  return matches[1];
		}
	  }

	  return null;
	}

	return method;
  };

  Select2.prototype._bindAdapters = function () {
	this.dataAdapter.bind(this, this.$container);
	this.selection.bind(this, this.$container);

	this.dropdown.bind(this, this.$container);
	this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
	var self = this;

	this.$element.on('change.select2', function () {
	  self.dataAdapter.current(function (data) {
		self.trigger('selection:update', {
		  data: data
		});
	  });
	});

	this._sync = Utils.bind(this._syncAttributes, this);

	if (this.$element[0].attachEvent) {
	  this.$element[0].attachEvent('onpropertychange', this._sync);
	}

	var observer = window.MutationObserver ||
	  window.WebKitMutationObserver ||
	  window.MozMutationObserver
	;

	if (observer != null) {
	  this._observer = new observer(function (mutations) {
		$.each(mutations, self._sync);
	  });
	  this._observer.observe(this.$element[0], {
		attributes: true,
		subtree: false
	  });
	} else if (this.$element[0].addEventListener) {
	  this.$element[0].addEventListener('DOMAttrModified', self._sync, false);
	}
  };

  Select2.prototype._registerDataEvents = function () {
	var self = this;

	this.dataAdapter.on('*', function (name, params) {
	  self.trigger(name, params);
	});
  };

  Select2.prototype._registerSelectionEvents = function () {
	var self = this;
	var nonRelayEvents = ['toggle', 'focus'];

	this.selection.on('toggle', function () {
	  self.toggleDropdown();
	});

	this.selection.on('focus', function (params) {
	  self.focus(params);
	});

	this.selection.on('*', function (name, params) {
	  if ($.inArray(name, nonRelayEvents) !== -1) {
		return;
	  }

	  self.trigger(name, params);
	});
  };

  Select2.prototype._registerDropdownEvents = function () {
	var self = this;

	this.dropdown.on('*', function (name, params) {
	  self.trigger(name, params);
	});
  };

  Select2.prototype._registerResultsEvents = function () {
	var self = this;

	this.results.on('*', function (name, params) {
	  self.trigger(name, params);
	});
  };

  Select2.prototype._registerEvents = function () {
	var self = this;

	this.on('open', function () {
	  self.$container.addClass('select2-container--open');
	});

	this.on('close', function () {
	  self.$container.removeClass('select2-container--open');
	});

	this.on('enable', function () {
	  self.$container.removeClass('select2-container--disabled');
	});

	this.on('disable', function () {
	  self.$container.addClass('select2-container--disabled');
	});

	this.on('blur', function () {
	  self.$container.removeClass('select2-container--focus');
	});

	this.on('query', function (params) {
	  if (!self.isOpen()) {
		self.trigger('open', {});
	  }

	  this.dataAdapter.query(params, function (data) {
		self.trigger('results:all', {
		  data: data,
		  query: params
		});
	  });
	});

	this.on('query:append', function (params) {
	  this.dataAdapter.query(params, function (data) {
		self.trigger('results:append', {
		  data: data,
		  query: params
		});
	  });
	});

	this.on('keypress', function (evt) {
	  var key = evt.which;

	  if (self.isOpen()) {
		if (key === KEYS.ESC || key === KEYS.TAB ||
			(key === KEYS.UP && evt.altKey)) {
		  self.close();

		  evt.preventDefault();
		} else if (key === KEYS.ENTER) {
		  self.trigger('results:select', {});

		  evt.preventDefault();
		} else if ((key === KEYS.SPACE && evt.ctrlKey)) {
		  self.trigger('results:toggle', {});

		  evt.preventDefault();
		} else if (key === KEYS.UP) {
		  self.trigger('results:previous', {});

		  evt.preventDefault();
		} else if (key === KEYS.DOWN) {
		  self.trigger('results:next', {});

		  evt.preventDefault();
		}
	  } else {
		if (key === KEYS.ENTER || key === KEYS.SPACE ||
			(key === KEYS.DOWN && evt.altKey)) {
		  self.open();

		  evt.preventDefault();
		}
	  }
	});
  };

  Select2.prototype._syncAttributes = function () {
	this.options.set('disabled', this.$element.prop('disabled'));

	if (this.options.get('disabled')) {
	  if (this.isOpen()) {
		this.close();
	  }

	  this.trigger('disable', {});
	} else {
	  this.trigger('enable', {});
	}
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
	var actualTrigger = Select2.__super__.trigger;
	var preTriggerMap = {
	  'open': 'opening',
	  'close': 'closing',
	  'select': 'selecting',
	  'unselect': 'unselecting'
	};

	if (args === undefined) {
	  args = {};
	}

	if (name in preTriggerMap) {
	  var preTriggerName = preTriggerMap[name];
	  var preTriggerArgs = {
		prevented: false,
		name: name,
		args: args
	  };

	  actualTrigger.call(this, preTriggerName, preTriggerArgs);

	  if (preTriggerArgs.prevented) {
		args.prevented = true;

		return;
	  }
	}

	actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
	if (this.options.get('disabled')) {
	  return;
	}

	if (this.isOpen()) {
	  this.close();
	} else {
	  this.open();
	}
  };

  Select2.prototype.open = function () {
	if (this.isOpen()) {
	  return;
	}

	this.trigger('query', {});
  };

  Select2.prototype.close = function () {
	if (!this.isOpen()) {
	  return;
	}

	this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
	return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
	return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
	// No need to re-trigger focus events if we are already focused
	if (this.hasFocus()) {
	  return;
	}

	this.$container.addClass('select2-container--focus');
	this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
	if (this.options.get('debug') && window.console && console.warn) {
	  console.warn(
		'Select2: The `select2("enable")` method has been deprecated and will' +
		' be removed in later Select2 versions. Use $element.prop("disabled")' +
		' instead.'
	  );
	}

	if (args == null || args.length === 0) {
	  args = [true];
	}

	var disabled = !args[0];

	this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
	if (this.options.get('debug') &&
		arguments.length > 0 && window.console && console.warn) {
	  console.warn(
		'Select2: Data can no longer be set using `select2("data")`. You ' +
		'should consider setting the value instead using `$element.val()`.'
	  );
	}

	var data = [];

	this.dataAdapter.current(function (currentData) {
	  data = currentData;
	});

	return data;
  };

  Select2.prototype.val = function (args) {
	if (this.options.get('debug') && window.console && console.warn) {
	  console.warn(
		'Select2: The `select2("val")` method has been deprecated and will be' +
		' removed in later Select2 versions. Use $element.val() instead.'
	  );
	}

	if (args == null || args.length === 0) {
	  return this.$element.val();
	}

	var newVal = args[0];

	if ($.isArray(newVal)) {
	  newVal = $.map(newVal, function (obj) {
		return obj.toString();
	  });
	}

	this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
	this.$container.remove();

	if (this.$element[0].detachEvent) {
	  this.$element[0].detachEvent('onpropertychange', this._sync);
	}

	if (this._observer != null) {
	  this._observer.disconnect();
	  this._observer = null;
	} else if (this.$element[0].removeEventListener) {
	  this.$element[0]
		.removeEventListener('DOMAttrModified', this._sync, false);
	}

	this._sync = null;

	this.$element.off('.select2');
	this.$element.attr('tabindex', this.$element.data('old-tabindex'));

	this.$element.removeClass('select2-hidden-accessible');
	this.$element.attr('aria-hidden', 'false');
	this.$element.removeData('select2');

	this.dataAdapter.destroy();
	this.selection.destroy();
	this.dropdown.destroy();
	this.results.destroy();

	this.dataAdapter = null;
	this.selection = null;
	this.dropdown = null;
	this.results = null;
  };

  Select2.prototype.render = function () {
	var $container = $(
	  '<span class="select2 select2-container">' +
		'<span class="selection"></span>' +
		'<span class="dropdown-wrapper" aria-hidden="true"></span>' +
	  '</span>'
	);

	$container.attr('dir', this.options.get('dir'));

	this.$container = $container;

	this.$container.addClass('select2-container--' + this.options.get('theme'));

	$container.data('element', this.$element);

	return $container;
  };

  return Select2;
});

S2.define('select2/compat/utils',[
  'jquery'
], function ($) {
  function syncCssClasses ($dest, $src, adapter) {
	var classes, replacements = [], adapted;

	classes = $.trim($dest.attr('class'));

	if (classes) {
	  classes = '' + classes; // for IE which returns object

	  $(classes.split(/\s+/)).each(function () {
		// Save all Select2 classes
		if (this.indexOf('select2-') === 0) {
		  replacements.push(this);
		}
	  });
	}

	classes = $.trim($src.attr('class'));

	if (classes) {
	  classes = '' + classes; // for IE which returns object

	  $(classes.split(/\s+/)).each(function () {
		// Only adapt non-Select2 classes
		if (this.indexOf('select2-') !== 0) {
		  adapted = adapter(this);

		  if (adapted != null) {
			replacements.push(adapted);
		  }
		}
	  });
	}

	$dest.attr('class', replacements.join(' '));
  }

  return {
	syncCssClasses: syncCssClasses
  };
});

S2.define('select2/compat/containerCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _containerAdapter (clazz) {
	return null;
  }

  function ContainerCSS () { }

  ContainerCSS.prototype.render = function (decorated) {
	var $container = decorated.call(this);

	var containerCssClass = this.options.get('containerCssClass') || '';

	if ($.isFunction(containerCssClass)) {
	  containerCssClass = containerCssClass(this.$element);
	}

	var containerCssAdapter = this.options.get('adaptContainerCssClass');
	containerCssAdapter = containerCssAdapter || _containerAdapter;

	if (containerCssClass.indexOf(':all:') !== -1) {
	  containerCssClass = containerCssClass.replace(':all:', '');

	  var _cssAdapter = containerCssAdapter;

	  containerCssAdapter = function (clazz) {
		var adapted = _cssAdapter(clazz);

		if (adapted != null) {
		  // Append the old one along with the adapted one
		  return adapted + ' ' + clazz;
		}

		return clazz;
	  };
	}

	var containerCss = this.options.get('containerCss') || {};

	if ($.isFunction(containerCss)) {
	  containerCss = containerCss(this.$element);
	}

	CompatUtils.syncCssClasses($container, this.$element, containerCssAdapter);

	$container.css(containerCss);
	$container.addClass(containerCssClass);

	return $container;
  };

  return ContainerCSS;
});

S2.define('select2/compat/dropdownCss',[
  'jquery',
  './utils'
], function ($, CompatUtils) {
  // No-op CSS adapter that discards all classes by default
  function _dropdownAdapter (clazz) {
	return null;
  }

  function DropdownCSS () { }

  DropdownCSS.prototype.render = function (decorated) {
	var $dropdown = decorated.call(this);

	var dropdownCssClass = this.options.get('dropdownCssClass') || '';

	if ($.isFunction(dropdownCssClass)) {
	  dropdownCssClass = dropdownCssClass(this.$element);
	}

	var dropdownCssAdapter = this.options.get('adaptDropdownCssClass');
	dropdownCssAdapter = dropdownCssAdapter || _dropdownAdapter;

	if (dropdownCssClass.indexOf(':all:') !== -1) {
	  dropdownCssClass = dropdownCssClass.replace(':all:', '');

	  var _cssAdapter = dropdownCssAdapter;

	  dropdownCssAdapter = function (clazz) {
		var adapted = _cssAdapter(clazz);

		if (adapted != null) {
		  // Append the old one along with the adapted one
		  return adapted + ' ' + clazz;
		}

		return clazz;
	  };
	}

	var dropdownCss = this.options.get('dropdownCss') || {};

	if ($.isFunction(dropdownCss)) {
	  dropdownCss = dropdownCss(this.$element);
	}

	CompatUtils.syncCssClasses($dropdown, this.$element, dropdownCssAdapter);

	$dropdown.css(dropdownCss);
	$dropdown.addClass(dropdownCssClass);

	return $dropdown;
  };

  return DropdownCSS;
});

S2.define('select2/compat/initSelection',[
  'jquery'
], function ($) {
  function InitSelection (decorated, $element, options) {
	if (options.get('debug') && window.console && console.warn) {
	  console.warn(
		'Select2: The `initSelection` option has been deprecated in favor' +
		' of a custom data adapter that overrides the `current` method. ' +
		'This method is now called multiple times instead of a single ' +
		'time when the instance is initialized. Support will be removed ' +
		'for the `initSelection` option in future versions of Select2'
	  );
	}

	this.initSelection = options.get('initSelection');
	this._isInitialized = false;

	decorated.call(this, $element, options);
  }

  InitSelection.prototype.current = function (decorated, callback) {
	var self = this;

	if (this._isInitialized) {
	  decorated.call(this, callback);

	  return;
	}

	this.initSelection.call(null, this.$element, function (data) {
	  self._isInitialized = true;

	  if (!$.isArray(data)) {
		data = [data];
	  }

	  callback(data);
	});
  };

  return InitSelection;
});

S2.define('select2/compat/inputData',[
  'jquery'
], function ($) {
  function InputData (decorated, $element, options) {
	this._currentData = [];
	this._valueSeparator = options.get('valueSeparator') || ',';

	if ($element.prop('type') === 'hidden') {
	  if (options.get('debug') && console && console.warn) {
		console.warn(
		  'Select2: Using a hidden input with Select2 is no longer ' +
		  'supported and may stop working in the future. It is recommended ' +
		  'to use a `<select>` element instead.'
		);
	  }
	}

	decorated.call(this, $element, options);
  }

  InputData.prototype.current = function (_, callback) {
	function getSelected (data, selectedIds) {
	  var selected = [];

	  if (data.selected || $.inArray(data.id, selectedIds) !== -1) {
		data.selected = true;
		selected.push(data);
	  } else {
		data.selected = false;
	  }

	  if (data.children) {
		selected.push.apply(selected, getSelected(data.children, selectedIds));
	  }

	  return selected;
	}

	var selected = [];

	for (var d = 0; d < this._currentData.length; d++) {
	  var data = this._currentData[d];

	  selected.push.apply(
		selected,
		getSelected(
		  data,
		  this.$element.val().split(
			this._valueSeparator
		  )
		)
	  );
	}

	callback(selected);
  };

  InputData.prototype.select = function (_, data) {
	if (!this.options.get('multiple')) {
	  this.current(function (allData) {
		$.map(allData, function (data) {
		  data.selected = false;
		});
	  });

	  this.$element.val(data.id);
	  this.$element.trigger('change');
	} else {
	  var value = this.$element.val();
	  value += this._valueSeparator + data.id;

	  this.$element.val(value);
	  this.$element.trigger('change');
	}
  };

  InputData.prototype.unselect = function (_, data) {
	var self = this;

	data.selected = false;

	this.current(function (allData) {
	  var values = [];

	  for (var d = 0; d < allData.length; d++) {
		var item = allData[d];

		if (data.id == item.id) {
		  continue;
		}

		values.push(item.id);
	  }

	  self.$element.val(values.join(self._valueSeparator));
	  self.$element.trigger('change');
	});
  };

  InputData.prototype.query = function (_, params, callback) {
	var results = [];

	for (var d = 0; d < this._currentData.length; d++) {
	  var data = this._currentData[d];

	  var matches = this.matches(params, data);

	  if (matches !== null) {
		results.push(matches);
	  }
	}

	callback({
	  results: results
	});
  };

  InputData.prototype.addOptions = function (_, $options) {
	var options = $.map($options, function ($option) {
	  return $.data($option[0], 'data');
	});

	this._currentData.push.apply(this._currentData, options);
  };

  return InputData;
});

S2.define('select2/compat/matcher',[
  'jquery'
], function ($) {
  function oldMatcher (matcher) {
	function wrappedMatcher (params, data) {
	  var match = $.extend(true, {}, data);

	  if (params.term == null || $.trim(params.term) === '') {
		return match;
	  }

	  if (data.children) {
		for (var c = data.children.length - 1; c >= 0; c--) {
		  var child = data.children[c];

		  // Check if the child object matches
		  // The old matcher returned a boolean true or false
		  var doesMatch = matcher(params.term, child.text, child);

		  // If the child didn't match, pop it off
		  if (!doesMatch) {
			match.children.splice(c, 1);
		  }
		}

		if (match.children.length > 0) {
		  return match;
		}
	  }

	  if (matcher(params.term, data.text, data)) {
		return match;
	  }

	  return null;
	}

	return wrappedMatcher;
  }

  return oldMatcher;
});

S2.define('select2/compat/query',[

], function () {
  function Query (decorated, $element, options) {
	if (options.get('debug') && window.console && console.warn) {
	  console.warn(
		'Select2: The `query` option has been deprecated in favor of a ' +
		'custom data adapter that overrides the `query` method. Support ' +
		'will be removed for the `query` option in future versions of ' +
		'Select2.'
	  );
	}

	decorated.call(this, $element, options);
  }

  Query.prototype.query = function (_, params, callback) {
	params.callback = callback;

	var query = this.options.get('query');

	query.call(null, params);
  };

  return Query;
});

S2.define('select2/dropdown/attachContainer',[

], function () {
  function AttachContainer (decorated, $element, options) {
	decorated.call(this, $element, options);
  }

  AttachContainer.prototype.position =
	function (decorated, $dropdown, $container) {
	var $dropdownContainer = $container.find('.dropdown-wrapper');
	$dropdownContainer.append($dropdown);

	$dropdown.addClass('select2-dropdown--below');
	$container.addClass('select2-container--below');
  };

  return AttachContainer;
});

S2.define('select2/dropdown/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
	decorated.call(this, container, $container);

	var stoppedEvents = [
	'blur',
	'change',
	'click',
	'dblclick',
	'focus',
	'focusin',
	'focusout',
	'input',
	'keydown',
	'keyup',
	'keypress',
	'mousedown',
	'mouseenter',
	'mouseleave',
	'mousemove',
	'mouseover',
	'mouseup',
	'search',
	'touchend',
	'touchstart'
	];

	this.$dropdown.on(stoppedEvents.join(' '), function (evt) {
	  evt.stopPropagation();
	});
  };

  return StopPropagation;
});

S2.define('select2/selection/stopPropagation',[

], function () {
  function StopPropagation () { }

  StopPropagation.prototype.bind = function (decorated, container, $container) {
	decorated.call(this, container, $container);

	var stoppedEvents = [
	  'blur',
	  'change',
	  'click',
	  'dblclick',
	  'focus',
	  'focusin',
	  'focusout',
	  'input',
	  'keydown',
	  'keyup',
	  'keypress',
	  'mousedown',
	  'mouseenter',
	  'mouseleave',
	  'mousemove',
	  'mouseover',
	  'mouseup',
	  'search',
	  'touchend',
	  'touchstart'
	];

	this.$selection.on(stoppedEvents.join(' '), function (evt) {
	  evt.stopPropagation();
	});
  };

  return StopPropagation;
});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
	if ( typeof S2.define === 'function' && S2.define.amd ) {
		// AMD. Register as an anonymous module.
		S2.define('jquery-mousewheel',['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
					['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		slice  = Array.prototype.slice,
		nullLowestDeltaTimeout, lowestDelta;

	if ( $.event.fixHooks ) {
		for ( var i = toFix.length; i; ) {
			$.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
		}
	}

	var special = $.event.special.mousewheel = {
		version: '3.1.12',

		setup: function() {
			if ( this.addEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.addEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = handler;
			}
			// Store the line height and page height for this particular element
			$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
			$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
		},

		teardown: function() {
			if ( this.removeEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.removeEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = null;
			}
			// Clean up the data we added to the element
			$.removeData(this, 'mousewheel-line-height');
			$.removeData(this, 'mousewheel-page-height');
		},

		getLineHeight: function(elem) {
			var $elem = $(elem),
				$parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
			if (!$parent.length) {
				$parent = $('body');
			}
			return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
		},

		getPageHeight: function(elem) {
			return $(elem).height();
		},

		settings: {
			adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
			normalizeOffset: true  // calls getBoundingClientRect for each event
		}
	};

	$.fn.extend({
		mousewheel: function(fn) {
			return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
		},

		unmousewheel: function(fn) {
			return this.unbind('mousewheel', fn);
		}
	});


	function handler(event) {
		var orgEvent   = event || window.event,
			args       = slice.call(arguments, 1),
			delta      = 0,
			deltaX     = 0,
			deltaY     = 0,
			absDelta   = 0,
			offsetX    = 0,
			offsetY    = 0;
		event = $.event.fix(orgEvent);
		event.type = 'mousewheel';

		// Old school scrollwheel delta
		if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
		if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
		if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
		if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

		// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
		if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
			deltaX = deltaY * -1;
			deltaY = 0;
		}

		// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
		delta = deltaY === 0 ? deltaX : deltaY;

		// New school wheel delta (wheel event)
		if ( 'deltaY' in orgEvent ) {
			deltaY = orgEvent.deltaY * -1;
			delta  = deltaY;
		}
		if ( 'deltaX' in orgEvent ) {
			deltaX = orgEvent.deltaX;
			if ( deltaY === 0 ) { delta  = deltaX * -1; }
		}

		// No change actually happened, no reason to go any further
		if ( deltaY === 0 && deltaX === 0 ) { return; }

		// Need to convert lines and pages to pixels if we aren't already in pixels
		// There are three delta modes:
		//   * deltaMode 0 is by pixels, nothing to do
		//   * deltaMode 1 is by lines
		//   * deltaMode 2 is by pages
		if ( orgEvent.deltaMode === 1 ) {
			var lineHeight = $.data(this, 'mousewheel-line-height');
			delta  *= lineHeight;
			deltaY *= lineHeight;
			deltaX *= lineHeight;
		} else if ( orgEvent.deltaMode === 2 ) {
			var pageHeight = $.data(this, 'mousewheel-page-height');
			delta  *= pageHeight;
			deltaY *= pageHeight;
			deltaX *= pageHeight;
		}

		// Store lowest absolute delta to normalize the delta values
		absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

		if ( !lowestDelta || absDelta < lowestDelta ) {
			lowestDelta = absDelta;

			// Adjust older deltas if necessary
			if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
				lowestDelta /= 40;
			}
		}

		// Adjust older deltas if necessary
		if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
			// Divide all the things by 40!
			delta  /= 40;
			deltaX /= 40;
			deltaY /= 40;
		}

		// Get a whole, normalized value for the deltas
		delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
		deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
		deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

		// Normalise offsetX and offsetY properties
		if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
			var boundingRect = this.getBoundingClientRect();
			offsetX = event.clientX - boundingRect.left;
			offsetY = event.clientY - boundingRect.top;
		}

		// Add information to the event object
		event.deltaX = deltaX;
		event.deltaY = deltaY;
		event.deltaFactor = lowestDelta;
		event.offsetX = offsetX;
		event.offsetY = offsetY;
		// Go ahead and set deltaMode to 0 since we converted to pixels
		// Although this is a little odd since we overwrite the deltaX/Y
		// properties with normalized deltas.
		event.deltaMode = 0;

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		// Clearout lowestDelta after sometime to better
		// handle multiple device types that give different
		// a different lowestDelta
		// Ex: trackpad = 3 and mouse wheel = 120
		if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
		nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta() {
		lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta) {
		// If this is an older event and the delta is divisable by 120,
		// then we are assuming that the browser is treating this as an
		// older mouse wheel event and that we should divide the deltas
		// by 40 to try and get a more usable deltaFactor.
		// Side note, this actually impacts the reported scroll distance
		// in older browsers and can cause scrolling to be slower than native.
		// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
		return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}

}));

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults'
], function ($, _, Select2, Defaults) {
  if ($.fn.select2 == null) {
	// All methods that should return the element
	var thisMethods = ['open', 'close', 'destroy'];

	$.fn.select2 = function (options) {
	  options = options || {};

	  if (typeof options === 'object') {
		this.each(function () {
		  var instanceOptions = $.extend(true, {}, options);

		  var instance = new Select2($(this), instanceOptions);
		});

		return this;
	  } else if (typeof options === 'string') {
		var ret;

		this.each(function () {
		  var instance = $(this).data('select2');

		  if (instance == null && window.console && console.error) {
			console.error(
			  'The select2(\'' + options + '\') method was called on an ' +
			  'element that is not using Select2.'
			);
		  }

		  var args = Array.prototype.slice.call(arguments, 1);

		  ret = instance[options].apply(instance, args);
		});

		// Check if we should be returning `this`
		if ($.inArray(options, thisMethods) > -1) {
		  return this;
		}

		return ret;
	  } else {
		throw new Error('Invalid arguments for Select2: ' + options);
	  }
	};
  }

  if ($.fn.select2.defaults == null) {
	$.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
	define: S2.define,
	require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

// Generated by CoffeeScript 1.6.3

/*
	Note: we have made some minor modifications to this library for better usabilty in our design context
	This is what we have changed:

	$sidenote.prepend($('<a/>', { //changed from a span by DNA
		"class": this.refMarkClass
	}).html('<span class="sr-only">Footnote </span> ' + ref));
*/

(function() {
  var __slice = [].slice;

  (function($, window, document) {
	var Sidenote, SidenoteGroup, SidenotesPlugin, escapeExpression;
	$.fn.extend({
	  sidenotes: function() {
		var args, option;
		option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
		return this.each(function() {
		  var $this, plugin, _ref;
		  $this = $(this);
		  plugin = (_ref = $this.data('sidenotes')) != null ? _ref : $this.data('sidenotes', new SidenotesPlugin(this, option));
		  if (typeof option === 'string') {
			plugin[option].apply(plugin, args);
			if (option === 'destroy') {
			  $this.removeData('sidenotes');
			}
		  }
		  return true;
		});
	  }
	});
	SidenotesPlugin = (function() {
	  SidenotesPlugin.prototype.options = {
		footnoteContainerSelector: '.footnotes',
		footnoteSelector: '> ol > li',
		initiallyHidden: false,
		removeRefMarkRegex: /(?!)/,
		refMarkClass: 'ref-mark',
		sidenoteClass: 'sidenote',
		sidenoteGroupClass: 'sidenote-group',
		sidenoteElement: 'aside',
		sidenoteGroupElement: 'div',
		sidenotePlacement: 'before',
		hideFootnoteContainer: true,
		formatSidenote: function(footnoteHtml, id, ref) {
		  var $sidenote;
		  $sidenote = $("<" + this.sidenoteElement + "/>", {
			"class": this.sidenoteClass
		  }).html(footnoteHtml).attr('id', id);
		  if (ref != null) {
			$sidenote.attr('data-ref', ref);
			$sidenote.prepend($('<a/>', { //changed from a span by DNA
			  "class": this.refMarkClass
		  }).html('<span class="sr-only">Footnote </span> ' + ref));
		  }
		  return $sidenote;
		},
		formatSidenoteID: function(footnoteID) {
		  return footnoteID.replace(/^f/, 's');
		},
		hide: function($el) {
		  return $el.hide();
		},
		show: function($el) {
		  return $el.show();
		}
	  };

	  function SidenotesPlugin(scope, options) {
		var plugin, refCounter;
		this.options = $.extend({}, this.options, options);
		this.options.sidenotePlacement = this.options.placement || this.options.sidenotePlacement;
		if (this.options.hideFootnoteContainer) {
		  this.$footnoteContainer = $(this.options.footnoteContainerSelector, scope);
		}
		this.$footnoteContainer = this.$footnoteContainer.size() !== 0 ? this.$footnoteContainer : null;
		this.$postContainer = this.$footnoteContainer.parent();
		this.$footnotes = $(this.options.footnoteContainerSelector + ' ' + this.options.footnoteSelector, this.$postContainer);
		this.sidenotesAfterRef = this.options.sidenotePlacement === 'after';
		refCounter = 1;
		this.sidenotes = [];
		this.groups = [];
		plugin = this;
		this.$footnotes.each(function() {
		  var footnoteEl, footnoteID, group, noRef, previous, sidenote, _ref;
		  footnoteEl = this;
		  footnoteID = footnoteEl.id;
		  noRef = plugin.options.removeRefMarkRegex.test(footnoteID);
		  sidenote = new Sidenote(footnoteEl, (noRef ? null : refCounter++), plugin);
		  plugin.sidenotes.push(sidenote);
		  previous = (_ref = plugin.sidenotes[plugin.sidenotes.length - 2]) != null ? _ref : null;
		  if (previous != null ? previous.$pivot.is(sidenote.$pivot) : void 0) {
			if (previous.hasGroup()) {
			  return previous.group.push(sidenote);
			} else {
			  group = new SidenoteGroup([previous, sidenote], plugin);
			  return plugin.groups.push(group);
			}
		  }
		});
		this.isHidden = this.options.initiallyHidden;
		if (this.isHidden) {
		  this.hide(true);
		} else {
		  this.show(true);
		}
	  }

	  SidenotesPlugin.prototype.show = function(force) {
		var group, sidenote, _i, _j, _len, _len1, _ref, _ref1;
		if (this.isHidden || force) {
		  _ref = this.sidenotes;
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			sidenote = _ref[_i];
			if (force && !sidenote.hasGroup()) {
			  sidenote.$pivot[this.sidenotePlacement()](sidenote.$sidenote);
			}
			sidenote.show();
		  }
		  _ref1 = this.groups;
		  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
			group = _ref1[_j];
			if (force) {
			  group.$pivot[this.sidenotePlacement()](group.$group);
			}
			group.show();
		  }
		  if ((this.$footnoteContainer != null) && this.options.hideFootnoteContainer) {
			this.options.hide(this.$footnoteContainer);
		  }
		  return this.isHidden = false;
		}
	  };

	  SidenotesPlugin.prototype.hide = function(force) {
		var group, sidenote, _i, _j, _len, _len1, _ref, _ref1;
		if (!this.isHidden || force) {
		  _ref = this.sidenotes;
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			sidenote = _ref[_i];
			if (force && !sidenote.hasGroup()) {
			  sidenote.$pivot[this.sidenotePlacement()](sidenote.$sidenote);
			}
			sidenote.hide();
		  }
		  _ref1 = this.groups;
		  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
			group = _ref1[_j];
			if (force) {
			  group.$pivot[this.sidenotePlacement()](group.$group);
			}
			group.hide();
		  }
		  if (this.$footnoteContainer != null) {
			this.options.show(this.$footnoteContainer);
		  }
		  return this.isHidden = true;
		}
	  };

	  SidenotesPlugin.prototype.sidenotePlacement = function(placement, force) {
		var group, sidenote, _i, _j, _len, _len1, _ref, _ref1;
		if ((placement === 'before' || placement === 'after') && (placement !== this.sidenotePlacement() || force)) {
		  _ref = this.sidenotes;
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			sidenote = _ref[_i];
			if (!sidenote.hasGroup()) {
			  sidenote.$pivot[placement](sidenote.$sidenote);
			}
		  }
		  _ref1 = this.groups;
		  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
			group = _ref1[_j];
			group.$pivot[placement](group.$group);
		  }
		  return this.sidenotesAfterRef = placement === 'after';
		} else {
		  if (this.sidenotesAfterRef) {
			return 'after';
		  } else {
			return 'before';
		  }
		}
	  };

	  SidenotesPlugin.prototype.placement = function(placement, force) {
		return this.sidenotePlacement(placement, force);
	  };

	  SidenotesPlugin.prototype.destroy = function() {
		var group, sidenote, _i, _j, _len, _len1, _ref, _ref1, _results;
		this.hide();
		_ref = this.sidenotes;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		  sidenote = _ref[_i];
		  sidenote.$sidenote.remove();
		}
		_ref1 = this.groups;
		_results = [];
		for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
		  group = _ref1[_j];
		  _results.push(group.$group.remove());
		}
		return _results;
	  };

	  return SidenotesPlugin;

	})();
	Sidenote = (function() {
	  function Sidenote(footnoteEl, ref, owner) {
		var $backArrow, $referringFootnote, sidenote, _i, _len, _ref;
		this.$footnote = $(footnoteEl);
		this.owner = owner;
		this.footnoteID = footnoteEl.id;
		this.sidenoteID = this.owner.options.formatSidenoteID(this.footnoteID);
		this.ref = ref > 0 ? ref : null;
		this.$refMarkAnchor = $("a[href='#" + (escapeExpression(this.footnoteID)) + "']", this.owner.$postContainer);
		this.$refMarkSup = this.$refMarkAnchor.parent('sup');
		this.$refMarkSup = this.$refMarkSup.size() !== 0 ? this.$refMarkSup : null;
		this.isNested = $.contains(this.owner.$footnoteContainer.get(0), this.refMark().get(0));
		if (this.isNested) {
		  $referringFootnote = this.refMark().closest(this.owner.$footnotes);
		  _ref = this.owner.sidenotes;
		  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			sidenote = _ref[_i];
			if (sidenote.$footnote.is($referringFootnote)) {
			  this.referringSidenote = sidenote;
			  break;
			}
		  }
		}
		this.refMarkID = this.refMark().attr('id');
		this.originalRef = this.$refMarkAnchor.html();
		this.$sidenote = this.owner.options.formatSidenote(this.$footnote.html(), this.sidenoteID, this.ref);
		this.$pivot = !this.isNested ? this.refMark().parentsUntil(this.owner.$postContainer).last() : this.referringSidenote.$pivot;
		this.group = null;

		$backArrow = $("a[href='#" + (escapeExpression(this.refMarkID)) + "']", this.$sidenote);
		if (($backArrow != null) && this.noMark()) {
		  this.owner.options.hide($backArrow);
		}
		this.owner.options.hide(this.$sidenote);
		this.isHidden = true;
	  }

	  Sidenote.prototype.noMark = function() {
		return this.ref == null;
	  };

	  Sidenote.prototype.hasGroup = function() {
		return this.group != null;
	  };

	  Sidenote.prototype.show = function(force) {
		if (this.isHidden || force) {
		  if (this.noMark()) {
			this.owner.options.hide(this.refMark());
		  } else {
			this.$refMarkAnchor.html(this.ref);
			this.$refMarkAnchor.attr('href', "#" + this.sidenoteID);
		  }
		  this.owner.options.show(this.$sidenote);
		  this.owner.options.hide(this.$footnote);
		  return this.isHidden = false;
		}
	  };

	  Sidenote.prototype.hide = function(force) {
		if (!this.isHidden || force) {
		  this.$refMarkAnchor.html(this.originalRef);
		  this.$refMarkAnchor.attr('href', "#" + this.footnoteID);
		  this.owner.options.show(this.refMark());
		  this.owner.options.hide(this.$sidenote);
		  this.owner.options.show(this.$footnote);
		  return this.isHidden = true;
		}
	  };

	  Sidenote.prototype.refMark = function() {
		var _ref;
		return (_ref = this.$refMarkSup) != null ? _ref : this.$refMarkAnchor;
	  };

	  return Sidenote;

	})();
	SidenoteGroup = (function() {
	  function SidenoteGroup(sidenotes, owner) {
		var _ref;
		this.sidenotes = [];
		this.owner = owner;
		this.$group = $("<" + this.owner.options.sidenoteGroupElement + "/>", {
		  "class": this.owner.options.sidenoteGroupClass
		});
		this.push(sidenotes);
		this.$pivot = (_ref = this.sidenotes[0]) != null ? _ref.$pivot : void 0;
		this.owner.options.hide(this.$group);
		this.isHidden = true;
	  }

	  SidenoteGroup.prototype.push = function(s) {
		var sidenote, sidenotes, _i, _len, _ref;
		sidenotes = s instanceof Array ? s : [s];
		(_ref = this.sidenotes).push.apply(_ref, sidenotes);
		for (_i = 0, _len = sidenotes.length; _i < _len; _i++) {
		  sidenote = sidenotes[_i];
		  this.$group.append(sidenote.$sidenote);
		  sidenote.group = this;
		}
		return this.$pivot != null ? this.$pivot : this.$pivot = this.sidenotes[0].pivot;
	  };

	  SidenoteGroup.prototype.show = function() {
		if (this.isHidden) {
		  this.owner.options.show(this.$group);
		  return this.isHidden = false;
		}
	  };

	  SidenoteGroup.prototype.hide = function() {
		if (!this.isHidden) {
		  this.owner.options.hide(this.$group);
		  return this.isHidden = true;
		}
	  };

	  return SidenoteGroup;

	})();
	return escapeExpression = function(str) {
	  return str.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, '\\$1');
	};
  })(jQuery, window, document);

}).call(this);

/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT / GPLv2 License.*/(function(a){function m(){d.setAttribute("content",g),h=!0}function n(){d.setAttribute("content",f),h=!1}function o(b){l=b.accelerationIncludingGravity,i=Math.abs(l.x),j=Math.abs(l.y),k=Math.abs(l.z),(!a.orientation||a.orientation===180)&&(i>7||(k>6&&j<8||k<8&&j>6)&&i>5)?h&&n():h||m()}var b=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(b)&&b.indexOf("AppleWebKit")>-1))return;var c=a.document;if(!c.querySelector)return;var d=c.querySelector("meta[name=viewport]"),e=d&&d.getAttribute("content"),f=e+",maximum-scale=1",g=e+",maximum-scale=10",h=!0,i,j,k,l;if(!d)return;a.addEventListener("orientationchange",m,!1),a.addEventListener("devicemotion",o,!1)})(this);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=9c49008a17999599ee81)
 * Config saved to config.json and https://gist.github.com/9c49008a17999599ee81
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

  /* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null
    this.inState.click = false;

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/**
 * Component to handle ellipsis on multiline overflowing text
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

	function init() {
		setupEllipsis();
		attachEvents();

		// reinit after data has loaded
		$(document).on('natlang:loaded', function() {
			$('[data-ellipsis]').off();
			$('[data-ellipsis]').trigger("destroy");
			setupEllipsis();
			attachEvents();
		});
	}

	function setupEllipsis() {
		if($('[data-ellipsis]').length > 0) {

			var after = $('[data-ellipsis-after]').length > 0 ? $('[data-ellipsis-after]') : null;

			$('[data-ellipsis]').dotdotdot({
				watch: window,

				wrap: 'word',
				after: after
			});
		}
	}


	function attachEvents (){
		var target = $('.linkgrid_item').length > 0 ? $('.linkgrid_item') : $('[data-ellipsis-parent]'),
			focusParent =  $('.linkgrid_item').length > 0 ? true : false;

		attachHover(target, true);
		attachFocus(target, focusParent);
	}

	/**
	 * On hover we sometimjes need to render the full text
	 * This initizes the update on mouseneter and again on mouseleave
	 *
	 * @param target | DOMObject, isParent | Boolean
	 */
	function attachHover(target, isParent) {
		target.on('mouseenter', function(e) {
			e.stopPropagation();
			doHover($(this), isParent);
		}).on('mouseleave', function(){
			doHover($(this), isParent);
		});
	}

	/**
	 * @param self | DOMObject, isParent | Boolean (Whetehr we apply to the current element or a child element)
	 */
	function doHover(self, isParent) {

		if(isParent) {
			self = self.find('[data-ellipsis]');
		}

		self.css('height', '');
		updateEllipsis(self);

		//repeat in case calculation happens too fast
		setTimeout(function() {
			updateEllipsis(self);
		}, 200);
	}

	/**
	 * @param target | DOMObject
	 */
	function updateEllipsis(target) {
		target.trigger("update.dot");
	}

	/**
	 * On focus we sometimes need to render the full text
	 *
	 * @param target | DOMObject
	 */
	function attachFocus(target, hasFocusParent) {
		var focusEl,
			i;

		for(i = 0; i < target.length; i = i + 1) {

			if (hasFocusParent) {
				focusEl = $(target[i]).closest(focusable);
			} else {
				focusEl = $(target[i]).find(focusable);
			}

			if(focusEl.length > 0) {
				focusEl.on('focus', function() {
					var target = $(this).find('[data-ellipsis]').length > 0 ? $(this).find('[data-ellipsis]') : $(this).closest('[data-ellipsis-parent]').find('[data-ellipsis]');
					updateEllipsis(target);

					//repeat in case calculation happens too fast
					setTimeout(function(){
						updateEllipsis(target);
					}, 200);

				}).on('blur', function() {
					var target = $(this).find('[data-ellipsis]');
					updateEllipsis(target);
				});
			}
		}
	}


	init();

});

/**
 * Component to handle placeholders in ie9 etc
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	$('input, textarea').placeholder();

});

DO.Subscribe('app:ready', function(e, $) {

	var isSwitch = false;

	function init () {
		setup($(document));
	}

	function setup(scope) {
		accessibilityFixes(scope);
		attachEvents(scope);
		setAllHeights(scope);
	}

	function setAllHeights(scope) {
		var open = scope.find('.accordion_content_container.active, .question_evidence.active'),
			closed = scope.find('.accordion_content_container:not(.active), .question_evidence:not(.active)');

		if(open) {
			setHeights(open, false);
		}

		if(closed) {
			setHeightClosed(closed, false);
		}
	}

	/**
	 * @param targets | Dom collapsible element,
	 * @param animate | Boolean setting to true gives time for animation to work
	 */
	function setHeightClosed(targets, animate) {
		isSwitch = false; // reset switch value

		$(targets).css({'display': '', 'height': ''});

		if(animate) {
			setTimeout(function() {
				$(targets).css('display', 'none');
			}, 300);
		} else {
			$(targets).css('display', 'none');
		}
	}

	/**
	 * @param targets | Dom collapsible element,
	 * @param animate | Boolean setting to true gives time for animation to work
	 */
	function setHeights(targets, animate) {
		var i,
			newHeight;

		isSwitch = false; // reset switch value

		$(targets).css({'display': '', 'height': 'auto'});

		for(i = 0; i < targets.length; i = i + 1) {
			newHeight = targets[i].scrollHeight;

			if(animate) {
				$(targets[i]).height(0);
			}
			$(targets[i]).height(newHeight);

			/*
			Receiving Center Details payment methods:
			Set a nested accordian's parent to height auto so it doesn't get cut off when expanded
			*/

			/*
			if($(targets[i]).find('.rcd_wrap').length > 0){
				var accordParent = $(targets[i]);
				setTimeout(function(){
						accordParent.height('auto');
				}, 333);
			}
			*/

			var accordParent = $(targets[i]);
			if(accordParent.find('.rcd_wrap').length > 0 || accordParent.find('.process_downloads').length > 0){
				setTimeout(function(){
						accordParent.height('auto');
				}, 333);
				//Hide any open accords below selected
				if(!accordParent.hasClass('mobile_accord')){
					accordParent.find('.question_evidencetrigger, .question_evidence').removeClass('active');
				}

			}


		}
	}

	function accessibilityFixes(scope) {
		scope.find('.accordion_trigger').attr('tabindex', '0');

		// Enable mobile accordion activation when clicking on titles, not just arrows
		$('.rcd_wrap .content_listing_title, .mobile_accordion .process_heading, .mobile_accordion .process_title').unbind('click').on('click', function(){
			$(this).closest('.row').find('.question_evidencetrigger').trigger('click');
		});
		$('.content_list_heading').unbind('click').on('click', function(){
			$(this).closest('.row').find('.content_list_trigger').trigger('click');
		});
	}

	function attachEvents(scope) {
		var target = scope.find('.accordion_trigger, .question_evidencetrigger, .process_accordian_trigger');

		$(target).on('click', function() {
			var self = $(this);

			if(self.hasClass('accordinate__trigger_all')){
				self.siblings('.accordinate__trigger_all').focus();
			}else{
				//Add class to parent div so we can hide border if necessary to fix double border issue
				self.closest('.question_input').toggleClass('opened');
				//Add class to row if on fees page
				if(self.closest('.fees_row').length > 0){
					self.closest('.fees_row').toggleClass('expanded');
				}
			}

			handleToggleHeights(self);
			isAllOpen(self);
			isAllClosed(self);

		});

		/*------------------
		Calling the handleResize() function was breaking nested accordions on fees pages, hence it's now disabled
		-------------------*/
		//handleResize();

		// Attach events to our filter form if it exists
		if ( $('form[data-inpagefilters]').length ) {
			handleFilterResize();
		}

		displayLogicAfterShow();

		if(scope.is(document)) {
			$(document).on('ajaxpages:contentloaded', function(e, data) {
				setup(data.target);
			});
		}
	}

	function isAllOpen(self) {
		var group = self.closest('.toggle-group-parent').find('.toggle-group'),
			containers = group.find('.accordion_content_container, .question .checkbox:not(.inactive) ~ .question_evidence'),
			active = group.find('.accordion_content_container.active, .question .checkbox:not(.inactive) ~ .question_evidence.active');

		if(active.length === containers.length){
			group.siblings('.cta_show').addClass('active');
		}
	}

	function isAllClosed(self) {
		var group = self.closest('.toggle-group-parent').find('.toggle-group'),
			active = group.find('.accordion_content_container.active, .question .checkbox:not(.inactive) ~ .question_evidence.active');

		if(active.length === 0) {
			group.siblings('.cta_show').removeClass('active');
		}
	}

	function getTargets(self) {
		var targets = $(self.data('toggle'));

		//handle switch class (note: we can't currently handle multiple)
		if(self.data('switch-on')){
			targets = $(self.data('switch-on'));
			isSwitch = "show";
		} else if (self.data('switch-off')) {
			targets = $(self.data('switch-off'));
			isSwitch = "hide";
		}

		if(targets == "undefined") { return false; }

		return targets;
	}

	/**
	 * For sliding effect we need to set a height
	 */
	function handleToggleHeights(self){
		var i, j,
			targets = getTargets(self),
			opening = false,
			switchValue = isSwitch;

		if(!targets) {
			return false;
		}

		for(i = 0; i < targets.length; i = i + 1) {
			if(!$(targets[i]).hasClass('accordion_content_container') && !$(targets[i]).hasClass('question_evidence')) {
				continue;
			}


			if(switchValue) {
				if(switchValue === "show") {
					setHeights($(targets[i]), true);
				} else {
					setHeightClosed($(targets[i]), true);
				}
			} else {
				if($(targets[i]).height() === 0) {
					setHeights($(targets[i]), true);
				} else {
					setHeightClosed($(targets[i]), true);
				}
			}
		}
	}

	/**
	 * Function to listen to resize event,
	 * Makes sure the event firing is throttled to every half second
	 * so performance isn't hurt too much
	 */
	function handleResize() {
		var resize;

		$(window).on('resize', function(event) {
			resize = true;
		});

		setInterval(function() {
			if (resize) {
				setAllHeights($(document));
				setTimeout(function() {
					resize = false;
				}, 500);
			}
		}, 500);
	}

	/**
	 * Attach a listener to the filter form so on submission
	 * we resize the accordions if they're open which fixes any overflow
	 * issues that arise from adding/hiding content based on filters
	 */
	function handleFilterResize() {
		$('form[data-inpagefilters]').on('submit', function() {
			setTimeout(function() {
				setAllHeights($(document));
			}, 100);
		});
	}

	/**
	 * Attach listener to displaylogic to reset val and broken placeholder
	 */
	function displayLogicAfterShow() {
		DO.Subscribe(['app:dl_afterShow'], function(e, $, element) {
			setTimeout(function() {
				setAllHeights($(document));
			}, 100);
		});
	}



	init();

});

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	function init() {
		$('.accordion_group').first().find('.accordion_heading').addClass('open');
		$('.accordion_group').first().find('.accordion_body').addClass('open');

		attachEvents();
	}

	function attachEvents() {
		$('.accordion_heading').on('click', function() {
			var el = $(this),
				parent = el.parent();

			parent.siblings().find('.open').removeClass('open');
			el.toggleClass('open');
			el.siblings().toggleClass('open');
		});
	}

	init();

});

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	function init() {
		attachEvents();
	}

	function attachEvents() {
		$('.banner_dismiss').click(function(e) {
			$(this).closest('.banner').removeClass('open');
		});

		$('.banner_readmore').click(function(e) {
			$(this).siblings('.banner_text').children('.banner_textcopy').addClass('open');
			$(this).addClass('invisible');
		});
	}

	init();

});

/**
 * Button action handlers
 *
 * This can include any link or button element that has an action
 *
 * # 1. data-action-select - this is a button, or link element that takes its
 * 		value from a related select element. eg:
 * 		<button data-action-select="#applyfor">View Details</button>
 *
 * # 2. data-toggle="toggle-active"- This is handled by toggles-switches.js, but we need
 * 		a modifier that will close on document click (with .js-temp)
 *
 * # 3. data-btntoggle-disable="#buttonID" - this is on an input, or select field and toggles visibility
 * 		of a button dependent on the value of the form field
 */

DO.Subscribe(['app:ready', 'ajax:success'], function(e, $) {

	"use strict";

	var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
		focusableNative = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed';

	/**
	 * Initialize Button actions
	 */
	function init() {
		if($('[data-templated]').length > 0) {
			$(document).on('aftertemplates', function() {
				setup($(document));
			});
		} else {
			setup($(document));
		}
	}

	/**
	 * Apply setup to our newly loaded area (document, or scope)
	 *
	 * @param scope | DOMObject - the area of the page we are applying this functionality to
	 */
	function setup(scope) {
		// if aria hidden, we shouldn't be able to focus
		scope.find('[aria-hidden="true"]').find(focusable).attr('tabindex', '-1');

		attachEvents(scope);
		attachDependencies(scope);
	}

	/**
	 * If an accessible hidden element has a child that gets focus, we want it to be shown.
	 * to do this we can include (eg) data-showonfocus="#trigger" on our hidden element
	 * @param scope | DOMObject
	 */
	function showOnFocus(scope) {
		scope.find('[data-showonfocus]').on('focus', focusable, function() {
			// if already shown, do nothing
			if($(this).closest('[data-showonfocus]').hasClass('active')) {
				return;
			}

			// we are acting on a child focus element, find our showonfocus parent
			var target = $(this).closest('[data-showonfocus]').data('showonfocus');
			$(target).trigger('click');
		});
	}

	/**
	 * When using showonfocus we need to make sure that the panel we have marked as visible
	 * becomes focussed on. Otherwise our focus is going to resume somewhere else on the page
	 * and potentially close a panel we just opened.
	 * @param scope | DOMObject
	 */
	function focusVisible(scope) {
		var target = scope.find('[data-showonfocus]'),
			button,
			i;

		for (i = 0; i < target.length; i = i + 1) {

			button = $(target[i]).data('showonfocus');

			$(button).on('click', function() {
				if(!$(this).hasClass('active')) {
					return;
				}

				var panel = $('[data-showonfocus="#' + $(this).attr('id') + '"]').first(),
					target = $(panel).find(focusable).first();



				//fake focus for select2 elements
				if(target.hasClass('js-select2')) {
					target.select2('open');
					target.select2('close');
				} else {
					//allow to work withopen and close panels on android
					setTimeout(function(){
						target.focus();
					}, 300);

				}
			});
		}

	}


	/**
	 * If a action has a dependency, modify its state appropriately when the
	 * dependency changes. For example, select actions are only useful if an
	 * option has been selected, so we set the button state to disabled until
	 * this has happened
	 * @param scope | DOMObject
	 */
	function attachDependencies(scope) {
		var selectList = scope.find("[data-action-select]"),
			select,
			i;

		for(i = 0; i < selectList.length; i++) {

			select = $(selectList[i]).attr('data-action-select');

			$(select).on('change', function() {
				var target = actionSelect(this);

				// We need the settimeout to avoid other things stealing
				// and reallocating focus
				setTimeout(function(){
					DO.Fire('app:dl_afterShow', [{'item' : target}]);
					target.focus();
				}, 100);
			});

			actionSelect($(select));
		}

	}
	/**
	 * Control disabled state of every select relationed to self
	 * @param self | DOMObject
	 */
	function actionSelect(self) {
		var target = $('[data-action-select="#'+ $(self).attr('id') + '"]');

		if($(self).val() === null || $(self).val() === undefined ||  $(self).val() === "") {
			target.attr('disabled', true);
			target.addClass('disabled');
		} else {
			target.attr('disabled', false);
			target.removeClass('disabled');
		}
		return target;
	}


	/**
	 * Attach toggle event to the window if the element is intended to unset itself on click
	 */
	function attachRemoveActive() {

		$(document).on('click', function(e) {

			var selector = $('.js-temp[data-toggle]'),
				target,
				i;

			for(i = 0; i < selector.length; i = i + 1 ) {

				if(selector[i] !== e.target && selector[i] !== $(e.target).closest("[data-toggle]")[0]) {

					target = $(selector[i]).attr("data-toggle");

					if(target.length > 0){
						target.removeClass('active');
					} else {
						$(selector[i]).removeClass('active');
					}
				}
			}
		});
	}

	/**
	 * If an element has the attribute data-toggle-aria we want to toggle the
	 * aria-hidden attribute of the data-toggle-aria value and the tabindex of
	 * all focusable children.
	 * @param scope | DOMObject
	 */
	function attachAriaHide(scope) {
		var targets = scope.find("[data-toggle-aria]"),
			i;

		// Set aria hidden and tabindex -1
		targets.on('click', function() {
			var target = $(this).data('toggle-aria'),
				value = $(target).attr('aria-hidden') == "false" ? "true" : "false",
				tabindex = value == "false" ? "0" : "-1";

			$(target).attr('aria-hidden', value);
			$(target).find(focusable).attr('tabindex', tabindex);
		});
	}

	/**
	 * Controls enabling and disabling a button with inputs
	 * @param scope | DOMObject
	 */
	function attachBtnToggleDisable(scope) {
		scope.find('[data-btntoggle-disable]').on('input change', function() {
			var target = $($(this).attr('data-btntoggle-disable')),
				trigger = $('[data-btntoggle-disable="' + $(this).attr('data-btntoggle-disable') + '"]'),
				i,
				show = false;

			// if any of the triggers have a value, we should show the button
			// n.b. there may be multiple triggers for the same button
			if(trigger.length > 0) {
				for(i = 0; i < trigger.length; i = i + 1) {
					show = $(trigger[i]).val() && $(trigger[i]).val() !== '';

					if($.isArray($(trigger[i]).val())){
						show = $(trigger[i]).val()[$(trigger[i]).val().length - 1] !=='';
					}

					if(show){
						target.prop("disabled", false);
						break;
					}
				}
			}

			if(!show) {
				target.prop("disabled", 'disabled');
			}
		});
	}

	/**
	 * Attach events
	 * @param scope | DOMObject
	 */
	function attachEvents(scope) {
		scope.find("button[data-action-select], a[data-action-select]").on('click', function() {
			handleSelectAction(this, e);
		});

		attachBtnToggleDisable(scope);
		attachAriaHide(scope);

		scope.find('.js-contain').on('click', function(e) {
			e.stopPropagation();
		});

		showOnFocus(scope);

		focusVisible(scope);

		//make sure we get the order of our events right
		setTimeout(function(){
			keyboardFocus(scope);
		}, 1000);

		if(scope.is(document)) {

			attachRemoveActive(scope);

			$(document).on('ajaxpages:contentloaded', function(e, data) {
				setup(data.target);
			});
		}
	}

	/**
	 * Allow a focus state that only appears for people using keyboards to navigate
	 * @param scope | DOMObject
	 */
	function keyboardFocus(scope) {
		scope.find(focusable).on('keyup',function(e) {
			$(e.target).addClass("hasfocus");

			if($(e.target).is(focusableNative)){
				return;
			}

			//trigger click if this element doesn't usually support click
			if(e.keyCode == 13) {
				e.preventDefault();
				e.stopPropagation();
				$(e.target).trigger('click');
			}

		}).on('blur focusout',function(e) {
			$(e.target).removeClass("hasfocus");
		});
	}

	/**
	 * Links and buttons with the data-action-select need to find a select, get the
	 * current selected element, and follow the link.
	 * If the button has the data-action-get attribute, use an ajax query to retrieve data
	 * Note, a target may also have a valid rendering template attached (eg data-ajax-template="tmpl-ajax-result")
	 *
	 * @param self | DOMObject, e | Event Object
	 */
	function handleSelectAction(self, e) {
		var baseURL = $('[data-base-href]').length > 0 ? $('[data-base-href]').attr('data-base-href') : '',
			target = $(self).attr('data-action-select'),
			url = $(target).val();

		if (e.namespace === "") {

			if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
				url = baseURL + url;
			}

			if($(self).attr('data-action-get') !== undefined) {
				makeRequest($(self), url);
			} else {
				window.location = url;
			}
		}
	}

	/**
	 * Construct an ajax request for the contents of a page to be loaded into an existing page area
	 *
	 * @param self | DOMObject, url | The page we want to request
	 */
	function makeRequest(self, url) {
		$.ajax({
			type: 'GET',
			url: url,
			cache: true,
			success: function(data,status) {
				//handle success
				updatePage(data, self, true);
			},
			error: function (xhr, desc, err) {
				var response = xhr.responseText,
					html = $(response.substring(response.indexOf('<body>')));

				updatePage(html, self, false);
			}
		});
	}

	/**
	 * Update an area of a page with html
	 * data-action-get contains the area of the page we wish to load content into
	 * Note, a target may also have a valid rendering template attached (eg data-ajax-template="tmpl-ajax-result")
	 * If a template is supplied we will use the template, otherwise we're just goign to inject the result into the page
	 *
	 * @param data | HMTL, target | The area of the page we are replacing
	 */
	function updatePage(data, self, status) {
		var target = $(self.data('action-get')),
			template = target.data('ajax-template');

		if(template !== undefined) {
			target.html(tmpl(template, {data : data, success: status}));
		} else {
			target.html(data);
		}

		if(status) {
			target.find('h1').addClass('h2'); //make sure all h1's look like h2s. Note: They are allowed to _be_ h1, as they appear in a section
		}

		// delay so templates can finish rendering
		setTimeout(function() {
			$(document).trigger('ajaxpages:contentloaded', {target: target});
		}, 5);
	}

	init();

});

/*
 * Methods used by the Visa Calculator and Natural language
 *
 * This includes:
 * 1. Visa Calculator: Tracking the visa points gained from each question
 *  - We use the value of inputs and options to calculate points totals, and adjust data-calculate-total
 *    and data-calculate-subtotal. data-calculate-group is used to define the groups for the subtotals -
 *    all inputs found in the group are added or removed from the subtotal
 *
 * 2. Visa Calculator & Natural Language: Logic for showing and hiding questions based on how other questions are answered
 *
 * There are two mechanisms for this:
 *
 *	  - handleConditionalChildren();
 *      This is a shortcut, and the simplest showing and hiding option. It binds a child directly to an input or select
 *      if the input/selected is chosen, then the child is shown, otherwise it is hidden.
 *      Children are specified on the form element itself with (eg) data-children="#Q2a, #Q2b"
 *      NOTE: If you require multiple parent elements, use handleShowpoints() or you will encounter bugs
 *
 *    - handleShowpoints();  [use this for options, and for complex logic]
 *		This relies on numeric values for showing and hiding and allows for more complex logic, or multiple 'parents'
 *
 *      For instance if a question (Qd) will only show if Qa + (Qb || Qc), we can define that using:
 *  	 - data-show='[{"has" : "0", "requires" : "3"}]' on the item we want to show.
 *       - On 'Qa' we can set a points value of 2: data-showpoints='[{"#Qa" : "2"}]'
 * 		 - Qb & Qc can each contribute a point each: data-showpoints='[{"#Qa" : "1"}]'
 *
 *      This will mean that in order for Qd to show, Qa must be selected, and one of Qb or Qc must be selected.
 *
 *      This can be used for less complex logic too. For instance, setting the data-show 'requires' parameter to 1 has much
 * 		the same effect as data-children, but could allow for multiple parents each contributing 1.
 *      This is also how we set showing and hiding based on option choices
 *
 *		We can use this for straight Qa || Qb by using negative showpoints eg:
 *		 - id="Qa" data-showpoints='[{"#Qb" : "-1"}]' data-show='[{"has" : "1", "requires" : "1"}]'
 *       - id="Qb" data-showpoints='[{"#Qa" : "-1"}]' data-show='[{"has" : "1", "requires" : "1"}]'
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	// Our total. Note: there can only be one of these on a page.
	var total = $('[data-calculate-total]'),
		isDebugMode = false,
		isAnimating = false,
		triggerUpdate = true,
		natlang = $('[data-natlang]').length > 0;


	function init() {

		if ($('[data-calculate]').length < 1) {
			return false;
		}

		// if we are rendering templates, wait until they are loaded
		if($('[data-templated]').length > 0) {

			$(document).on('aftertemplates', function() {
				clearForm($('form[data-calculate]'));
				setUp();
			});

		} else {

			clearForm($('form[data-calculate]'));
			setUp();
		}
	}

	function setUp() {

		var input = $('[data-calculate] input'),
			select = $('[data-calculate] select');

		// this is how we track amounts added by each element
		// this is neccesary to avoid recalculating everytime
		input.data('added', 0);
		select.data('added', 0);

		// if group, add subtotal indicator
		if($('[data-calculate-group]').length > 0) {
			$('[data-calculate-group] .question_input').append(
				'<div class="calculate_subtotal inactive" data-calculate-subtotal="0">0<span class="calculate_subtotaltext">pts</span></div>'
			);
		}

		attachEvents(input, select);

		isTestMode();// to be disabled post-dev
	}

	/**
	 * Handle toggling of testmode
	 */
	function isTestMode() {

		var cmdDown = false,
			cmdKey = 91,
			optionKey = 16,
			testKey = 84;

		$(document).keydown(function(e){

			if (e.keyCode == cmdKey) {
				cmdDown = true;
			}

		}).keyup(function(e) {
			if (e.keyCode == cmdKey) {
				cmdDown = false;
			}
		});

		$(document).keydown(function(e) {
			if (cmdDown && e.keyCode == testKey) {

				if(isDebugMode) {
					//debug mode is on, disable
					$('.debugging-QID').remove();
					isDebugMode = false;
					return;
				}

				if(natlang){
					DebugNatLang();
				} else {
					DebugQuestions();
				}
			}
		});

	}

	/**
	 * Natural language: If enabled we will see the query ID in the query label
	 * This is intended to make debugging and testing question behaviour easier
	 */
	function DebugNatLang() {
		var i,
			query = $('.query'),
			id;

		for(i = 0; i < query.length; i = i + 1 ){
			id = $(query[i]).attr('id');
			$(query[i]).prepend('<strong class="debugging-QID" style="display:inline-block; padding-right:15px;">' + id + ' </strong> ');
		}

		isDebugMode = true;
	}

	/**
	 * Points Indicator: If enabled we will see the question ID in the question label
	 * This is intended to make debugging and testing question behaviour easier
	 */
	function DebugQuestions() {

		var i,
			questions = $('.question_option'),
			option,
			id;

		for(i = 0; i < questions.length; i = i + 1 ){
			option = $(questions[i]).find('input');
			if(option.length > 0){
				id = $(option[0]).attr('id');
				$($(questions[i]).find('label')[0]).prepend('<strong class="debugging-QID" style="display:inline-block; padding-right:15px;">' + id + ' </strong> ');
			}
		}

		isDebugMode = true;
	}


	/**
	 *  Watch input and select components for changes
	 *  This needs to happen after any filters have been set, so we can correctly hide
	 * 	empty question sets
	 *
	 *  @param input | DOMObject, select | DOMObject
	 */
	function attachEvents(input, select) {

		$(document).on('afterfilters', function() {
			input.on('input change', function() {
				triggerEvidence($(this));
				triggerConditionals($(this));
				doCalculate($(this));
				pollViewChanges();
			});

			select.on('change', function() {
				triggerConditionals($(this));
				doCalculate($(this));
				pollViewChanges();
			});
		});

		$('[data-reset]').on('click', function(e) {
			e.preventDefault();

			var form = $(this).closest($(this).data('reset')),
			topBefore = $(this).position().top;

			clearForm(form);
			handleViewReset(topBefore, form, $(this));
		});
	}

	/**
	 * Adjust window back to where the user was looking
	 *
	 * @params form | form to be cleared
	 */
	function clearForm(form) {
		var inputs = form.find('input'),
			selects = form.find('select');

		if(inputs.length > 0) {
			inputs.prop('checked', false).trigger('change');
		}

		if(selects.length > 0) {
			selects.val('');
		}
	}

	/**
	 * Adjust window back to where the user was looking
	 *
	 * @params form | form being cleared, resetButton | DOMElement button
	 */
	function handleViewReset(topBefore, form, resetButton) {

		$('.stickybar').addClass('animating');

		setTimeout(function(){

			if (resetButton.position().top !== topBefore) {
				$("html, body").animate({'scrollTop' : form.position().top - $('.stickybar').height() + 1 + 'px'}, 100);
			}

			setTimeout(function(){
				$('.stickybar').removeClass('animating');
			}, 200);

		}, 100);
	}

	/**
	 * After a change has been triggered we need to give enough time for
	 * all the view maths to complete before initating animations for changes
	 */
	function pollViewChanges() {
		if (triggerUpdate) {
			triggerUpdate = false;
			setTimeout(function(){
				triggerShowHide();
				handleEmpty();
				triggerUpdate = true;
			}, 30);
		}
	}


	/*
	 * Calculate the calculator points totals.
	 * - remove any previously added value eg if data-added="10", we take away 10 from our total
	 * - store the new amount added in data-added
	 * - update the subtotal for a calculate-group
	 * - update the element containing calculate-total
	 *
	 * @param self | DOMObject
	 */
	function doCalculate(self) {
		var accessibleTotal = $('.accessible_total .total'),
			oldAdded = parseInt(self.data('added'), 10),
			newAdded = 0,
			oldTotal = parseInt(total.data('calculate-total'), 10),
			totalValue = oldTotal;

		totalValue = totalValue - oldAdded;

		// update totalValue  if applicable
		if(self.is('select') && self.val() !== ''){
			newAdded = parseInt(self.val(), 10);
			totalValue = totalValue + newAdded;

		} else if(self.is(':checked')) {
			newAdded = parseInt(self.val(), 10);
			totalValue = totalValue + newAdded;
		}

		updateSubtotal(self, oldAdded, newAdded);

		self.data('added', newAdded);
		total.data('calculate-total', totalValue);
		total.text(totalValue);

		if(accessibleTotal.length > 0){
			accessibleTotal.text(totalValue + " points");
		}
	}



	/**
	 * Calculate smooth animation time
	 * @param oldTotal | Int, totalValue | Int
	 */
	function getAnimationTime(oldTotal, totalValue) {
		var diff = Math.abs(oldTotal - totalValue),
			secEach = 40;

		if(diff > 59) {
			secEach = 30;
		}

		if(diff < 20) {
			secEach = 60;
		}

		return diff * secEach;
	}


	/**
	 * Update the subtotal for a calculate-group
	 * @param self | DOMObject, oldAdded | Int, newAdded Int
	 */
	function updateSubtotal(self, oldAdded, newAdded) {
		if(self.closest('[data-calculate-group]').length < 1) {
			return false;
		}

		var group = self.closest('[data-calculate-group]'),
			subtotal = group.find('[data-calculate-subtotal]'),
			subtotalValue = (parseInt(subtotal.data('calculate-subtotal'), 10) - oldAdded) + newAdded;

		subtotal.html(subtotalValue + '<span class="calculate_subtotaltext">pts</span>');
		subtotal.data('calculate-subtotal', subtotalValue);

		if(subtotalValue > 0) {
			subtotal.removeClass('inactive');
		} else {
			subtotal.addClass('inactive');
		}
	}


	/**
	 * Change the visibility of a question based on its visible children
	 * Hide when all child inputs are hidden. Show when any are visible
	 */
	function handleEmpty() {
		var question = $('.question'),
			i;

		for(i = 0; i < question.length; i = i + 1) {
			if($(question[i]).find('input').not('.inactive, .inactive-animate').length < 1) {
				$(question[i]).addClass('inactive').attr('aria-hidden', true);
			} else {
				$(question[i]).removeClass('inactive').attr('aria-hidden', false);
			}
		}
	}

	/**
	 * Find all related conditionals and call their handlers.
	 *
	 * @param self | DOMObject Input (checkbox) or Select
	 */
	function triggerConditionals(self) {
		var i,
			children = $(self.data('children')),
			showpoints = self.data('showpoints') || {},
			options = self.find('option[data-showpoints]');

		if(showpoints !== 'undefined' && showpoints.length > 0) {
			handleShowpoints(showpoints[0], self);
			DO.Fire('app:dl_afterShow', [{'item' : showpoints[0]}]);
		}

		// do again for each option with a showpoints data attribute
		if(options.length > 0) {
			for (i = 0; i < options.length; i = i + 1) {
				handleShowpoints($(options[i]).data('showpoints')[0], $(options[i]));
				DO.Fire('app:dl_afterShow', [{'item' : $(options[i]).data('showpoints')[0]}]);
			}
		}

		// shortcut for simple show hide (for showing / hiding based on options selected, or with multiple parents see handleShowpoints)
		if(children !== 'undefined' && children.length > 0) {
			handleConditionalChildren(children, self);
			DO.Fire('app:dl_afterShow', [{'item' : children}]);
		}
	}

	/**
	 *
	 * @param self | DOMObject Input (checkbox)
	 */
	function triggerEvidence(self) {
		var isChecked = self.is(':checked'),
			target = self.siblings('.question_input').find('.question_evidencetrigger').first();

		// open if evidence is closed we are checking the box
		// close if evidence is open and we are unchecking
		if((isChecked && !target.hasClass('active')) || (!isChecked && target.hasClass('active'))) {
			target.trigger('click');

			setTimeout(function(){
				DO.Fire('app:dl_afterShow', [{'item' : target}]);
			}, 100);
		}
	}

	/**
	 * We can do more complex showing and hiding logic by supplying a json object
	 * in our dataobject and adding points. Checking this againt the required points to show or hide a target option
	 * eg. <input data-showpoints="[{'#Q3_3' : '5', '#Q3_5' : '2'}]">
	 *
	 * @param self | DOMObject Input (checkbox) or Select
	 */
	function handleShowpoints(showpoints, self) {
		var key,
			allTargets = '',
			last = self.val().length - 1, // sometimes we deal with arrays (faux multiselects)
			isChecked = self.is(':checked'),
			isSelected = self.is('select') && self.val() !== "0" && self.val() !== "" && self.val()[last] !== "",
			isSelectedOption = self.is('option:selected'),
			hasInput = self.is('input:not([type="checkbox"])') && self.val() !== "" ? true : false,
			active = isSelectedOption || isChecked || isSelected || hasInput ? true : false; // to do option based

		// iterate through object, add points
		for (key in showpoints) {
			if(showpoints.hasOwnProperty(key)) {
				calculateShow(key, showpoints, active, self);

				// Make sure we bump any children
				if($(key).data('children') !== undefined) {
					handleConditionalChildren($($(key).data('children')), $(key));
				}
			}
		}
	}

	/**
	 * Uses the data-show='[{"has" : "0", "requires" : "3"}]' property of a form element.
	 * Add or remove points from show.has. If the total is >= 'requires' enable the
	 * question, else disable the question.
	 *
	 * Update data-show and store the current show points added in data-showadded-[id],
	 * so they can be removed later
	 *
	 * @param key | String - the ID of our target, showpoints | JSON containing our data-showpoints array
	 * @param active | Boolean - selected/checked or not, self | DOMObject Input (checkbox) or Select
	 */
	function calculateShow(key, showpoints, active, self) {
		var	mypoints = parseInt(showpoints[key], 10),
			data = $(key).data('show') || [{"has" : "1", "requires" : "1"}],
			currentpoints = parseInt(data[0].has, 10),
			requires = parseInt(data[0].requires, 10),
			total = currentpoints,
			prevAdded = self.data('data-showadded-' + key);

		if(prevAdded === undefined) {
			prevAdded = false;
		}

		if(active && !prevAdded) {
			total = currentpoints + mypoints;
			self.data('data-showadded-' + key, true);
		} else if(!active && prevAdded) {
			total = currentpoints - mypoints;
			self.data('data-showadded-' + key, false);
		}

		$(key).data('show', [{"has" : total, "requires" : requires}]);
	}

	/**
	 * Find all objects with data-show attribute and run caclulation to decide
	 * whether object should be showen or hidden
	 */
	function triggerShowHide() {
		var i = 0,
			targets = $('[data-show]'),
			currentpoints = 0,
			requires = 1,
			data;

		for (i = 0; i < targets.length; i = i + 1) {
			data = $(targets[i]).data('show');
			currentpoints = parseInt(data[0].has, 10);
			requires = parseInt(data[0].requires, 10);

			showAtPoints($(targets[i]), currentpoints, requires);
		}
	}

	/**
	 * Compare total to required and adjust display in DOM
	 *
	 * @param target | DOMObject Input or Select, total | Int, requires | Int
	 */
	function showAtPoints(target, total, requires) {
		target.removeClass('inactive-animate').siblings().css({'display': ''});


		if(total >= requires) {
			target.siblings().stop(true, true);

			if(target.hasClass('inactive')) {
				target.removeClass('inactive');
				if(target.is('p')) {
					// can be a select, or a text field type
					var num = target.find('input[type="number"]');
					if(num.length > 0){
						Stretchy.resize(num[0]); //manually call resize, as it doesn't seem to trigger correctly
					}
				}
			}
		} else {
			if(!target.hasClass('inactive')) {

				if(isAnimating || target.closest('[data-natlang]').length > 0 || target.closest('[data-noanimate]').length > 0){
					target.addClass('inactive');
					target.removeClass('inactive-animate');
					target.siblings().css({'display': ''});
				} else {
					isAnimating = true;
					target.addClass('inactive-animate'); // make sure our fieldset still knows we are inactive
					target.siblings().stop(true, true).slideUp({
						duration: 300,
						easing: "linear",
						queue: false,
						complete: function () {
							target.addClass('inactive');
							target.removeClass('inactive-animate');
							$(this).css({'display': ''});
							isAnimating = false;
						}
					});
				}
			}
			clearField(target);
		}
	}

	function clearField(target) {
		if(target.is('select')) {
			target.val('').trigger('change');
		} else if(target.is(':checked')) {
			target.prop('checked', false).trigger('change');
		} else if(target.is('p')) {
			// can be a select, or a text field type
			target.find(':input').val('').trigger('change');
		}
	}

	function resetFields(fields) {
		var i;

		for (i = 0; i < fields.length; i = i + 1) {
			if($(fields[i]).is('select')) {
				$(fields[i]).val('');
			} else if($(fields[i]).is(':checked')) {
				$(fields[i]).prop('checked', false);
			}
		}
		fields.trigger('change');
	}

	/**
	 * Reset all child form elements.
	 * Child form elements can be specified in html by assigning selectors to
	 * the data-children attribute of an element
	 * eg. <input data-children="#agerange, .child-elements" name="age" type="checkbox" value="10" />
	 *
	 * @param self | DOMObject
	 */
	function handleConditionalChildren(children, self) {
		if((self.is('select') && self.val() !== "0" && self.val() !== "") || self.is(':checked')) {
			children.removeClass('inactive').attr('aria-hidden', false);
		} else {
			resetFields(children); // only reset children if parent is not active
			children.addClass('inactive').attr('aria-hidden', true);
		}
	}

	init();

});

/**
 * Browser fixes for comparision table
 */
DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	function init() {
		var table = $('table.comparison');
		attachEvents(table);
	}

	/**
	 * Attach IE fixes to the event that shows the table, so that we have the
	 * correct height calculations.
	 *
	 * @params table | DOMElement Table
	 */
	function attachEvents(table) {
		$(document).on('natlang:loaded', function() {
			//apply to all and use as padding (also fixes ie11)
			table.find('td, th').wrapInner('<span class="cell_wrapper"></span>');

			$('.comparisonaccordion_itemtitle').on('click', function() {
				var el = $(this),
					parent = el.parents('.comparisonaccordion_item').first();

				parent.toggleClass('open').siblings('.open').removeClass('open');
			})
		});

		table.on('comparetable:show', function(){
			if($('.ie9, .ie10').length > 0) {
				resetHeights($(this));
				oldIE($(this));
			}
		});
	}

	/**
	 * Make sure we reset the table heigth values each tinme the table is opened,
	 * as the hieghts may have changed
	 *
	 * @params table | DOMElement Table
	 */
	function resetHeights(table) {
		table.css('height', '');
		table.find('.cell_wrapper').css('height', '');
	}

	/**
	 * IE has a bug where pseudo elements @100% take the height of the text rather than
	 * the height of the containing td. IE11 can be fixed by using cell_wrapper instead,
	 * but < IE11 has more specialier needs.
	 *
	 * @params table | DOMElement Table
	 */
	function oldIE(table) {
		var i,
			rows = table.find('tr');

		table.height($('table.comparison').outerHeight());

		for (i = 0; i < rows.length; i = i + 1) {
			$(rows[i]).find('.cell_wrapper').height($(rows[i]).height() - 40);
		}
	}


	init();
});

/*
* Javascript for the contact form
*/
DO.Subscribe('app:ready', function(e, $) {

	var form = $('[data-contact-offices]'),
		offices = {};

	function init() {

		if(form.length < 1) {
			return;
		}

		var countries = inz.findAnOffice.getCountries();

		if(typeof countries === "undefined") {
			return;
		}

		renderCountries(countries);

		setTimeout(function(){
			attachEvents();
		}, 100);
	}

	/**
	 * Clear all fields dependent on data (everything except the first select), and disable the button
	 */
	function clearDependencies() {
		offices = {};

		var button = form.find('button');
		button.prop('disabled', true).removeClass('active');
		$(button.attr('[data-toggle]')).removeClass('active');

		$('[data-contact-country-offices]').html('');
		$('[data-contact-results]').html('');
	}

	/**
	 * Define events. Note: these are attached to elements that already exists,
	 * but may watch our created elements.
	 */
	function attachEvents() {
		$(document).on('change', '[data-trigger-offices]', function(){
			handleTriggerOffices(this);
		});

		form.on("click", 'button', function(e) {
			e.preventDefault();

			var target = $(this).data('toggle');
			$(target).addClass('active');
			$(this).addClass('active');
		});

		$(document).on('click', '.btn__popout_close', function() {
			var target = $(this).closest('.popout'),
				id = target.attr('id');

			target.removeClass('active').attr('aria-hidden', "true");
			$('[data-toggle="#' + id + '"]').removeClass('active');
		});
	}

	/**
	 * When a country is chosen, we need to render our offices and attach events to it.
	 * @param self | DOMObject select
	 */
	function handleTriggerOffices(self) {
		clearDependencies();

		if($(self).val() === "" || $(self).val() === " ") {
			return;
		}

		var offices = inz.findAnOffice.getOfficesForCountry($(self).val());
		renderOffices(offices);
	}

	/**
	 * Render countries into a dropdown, and trigger all related events attachment
	 * @param data | JSONObject
	 */
	function renderCountries(data) {
		$('[data-contact-country]').html(tmpl("tmpl-contact-country", data));
		$(document).trigger('aftertemplates');
		$(document).trigger('afterfilters');
	}

	/**
	 * When there is more than one office, render offices into a dropdown.
	 * Otherwise enable a show button
	 *
	 * @param data | JSONObject
	 */
	function renderOffices(data) {
		offices = data; // store the offcies data for later

		if (data.length === 1) {
			form.find('button').prop('disabled', false);
			renderDetails(data[0]);
			return;
		}

		$('[data-contact-country-offices]').html(tmpl("tmpl-contact-country-offices", data));
		$('[data-contact-country-offices] select').trigger('newselectadded');
		attachOfficeEvents();
	}

	/**
	 * When an office is chosen we need to render the office details and
	 * enable the show button
	 */
	function attachOfficeEvents() {
		$('[data-contact-country-offices] select').on('change', function() {

			if($(this).val() === "" || $(this).val() === " ") {
				return;
			}

			var data = offices[$(this).val()],
				button = form.find('button');

			form.find('button').prop('disabled', false).removeClass('active');
			$(button.attr('[data-toggle]')).removeClass('active');
			renderDetails(data);
		});
	}

	/**
	 * Render the office details into the popover
	 *
	 * @param data | JSONObject
	 */
	function renderDetails(data) {
		if(data.address) {
			data.address = nl2br(data.address);
		}

		$('[data-contact-results]').html(tmpl("tmpl-contact-results", data));

	}

	/**
	 * Helper function to convert \n to <br> tags
	 *
	 * @param string | String
	 * @return HTML
	 */
	function nl2br(string) {
		return string.replace(/\n/g, "<br />");
	}


	init();

});

/*
* Javascript for the currency converter
*/
DO.Subscribe('app:ready', function(e, $) {

	function init() {

		if($('[data-currency-converter]').length < 1 || typeof inz.currency.convert === "undefined") {
			return;
		}

		attachCurrencyEvents();
	}

	function attachCurrencyEvents() {
		$('[data-currency-converter] select').on('change', function(e) {
			var self = this,
				from = 'NZD',
				to = $(this).val(),
				amount = $(this).attr('data-currency-value'),
				callback = function(result) {
					var parts = result.split('.'),
						html = parts[0] + '<sub>.' + parts[1] + '</sub>';
					$(self).parents('.currencyconverter').find('.currencyconverter_value').html(html);
				};

			inz.currency.convert(from, to, amount, callback);
		});

	}

	init();

});

/*
* Javascript for the datepicker
http://whatsock.com/tsg/Coding%20Arena/ARIA%20Date%20Pickers/ARIA%20Date%20Picker%20(Basic)/demo.htm
Modified by GT to handle multiple calendars (08.12.16)
*/
DO.Subscribe('app:ready', function(e, $) {

	function loadDatepickers(){

		//Loop through each calendar and set it up
		$('.calendarWrap').each(function(){

			var cWrap = $(this);
			var cLink = cWrap.find('.datePicker');
			var cInput = cWrap.find('.input');

			//Instantiate calendar
			$A.bind(window, 'load', function(){
				// Syntax : setCalendar( ID , TriggeringElement , TargetEditField , EnableComments , clickHandler , config )
				$A.setCalendar(cWrap.attr('id'), cLink[0], cInput[0], false,
					function(ev, dc, targ){ // targ is the Input field

						// Save the desired date string
						//targ.value = dc.range.current.mDay + ' ' + dc.range[dc.range.current.month].name + ' ' + dc.range.current.year;

						// The above doesn't work in IE9. Set the value like this instead:
						dateVal = dc.range.current.mDay + ' ' + dc.range[dc.range.current.month].name + ' ' + dc.range.current.year;
						$(targ).val(dateVal);

						/*
						targ.value = dc.range.wDays[dc.range.current.wDay].lng + ' ' + dc.range[dc.range.current.month].name + ' '
							+ dc.range.current.mDay + ', ' + dc.range.current.year;
						*/

						//Remove error message if exists when date is selected
						var field = $(targ).closest('.form_field');
						//if(field.hasClass('parsley-error')){
							field.removeClass('parsley-error').addClass('parsley-success');
							$(targ).parent().find('.err-msg').remove();
						//}
						
						// Then close the date picker
						dc.close();
					},
					{
						ajax: function(dc, save){
							// Run before the datepicker renders
							if (!$(cLink[0]).data('dependant')) {
								// no data attr
								dc.open();
								return;
							}
							var dependentInput = $('#' + $(cLink[0]).data('dependant'));
							if (dependentInput.length == 0) {
								// ID doesn't exist
								dc.open();
								return;
							}
							var dependantDateString = dependentInput.val();
							if (dependantDateString == '') {
								// dependant value hasn't been set
								dc.open();
								return;
							}
							var dependentDate = new Date(Date.parse(dependantDateString));

							var dependentCurrent = {
								day: dependentDate.getDate(),
								month: dependentDate.getMonth(),
								year: dependentDate.getFullYear(),
								weekDay: dependentDate.getDay()
							};

							// clear out disabled ranges
							dc.range[dc.range.current.month].disabled[dc.range.current.year] = [];
							// Disable all dates prior to the current day
							if (dependentCurrent.year > dc.range.current.year || (dependentCurrent.year === dc.range.current.year && dependentCurrent.month > dc.range.current.month)){
								// console.log('disable all');
								dc.range[dc.range.current.month].disabled[dc.range.current.year] =
									[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
							}

							if (dependentCurrent.year === dc.range.current.year && dependentCurrent.month === dc.range.current.month){
								for (var day = 1; day <= dependentCurrent.day; day++){
									dc.range[dc.range.current.month].disabled[dc.range.current.year].push(day);
								}
							}

							dc.open();
						},
						autoPosition: 0,
						offsetTop: 0,
						offsetLeft: 0,
						months:[
							'Jan',
							'Feb',
							'Mar',
							'Apr',
							'May',
							'Jun',
							'Jul',
							'Aug',
							'Sep',
							'Oct',
							'Nov',
							'Dec'
						],
						days:[
							{
								s: 'Su',
								l: 'Sunday'
							},
							{
								s: 'Mo',
								l: 'Monday'
							},
							{
								s: 'Tu',
								l: 'Tuesday'
							},
							{
								s: 'We',
								l: 'Wednesday'
							},
							{
								s: 'Th',
								l: 'Thursday'
							},
							{
								s: 'Fr',
								l: 'Friday'
							},
							{
								s: 'Sa',
								l: 'Saturday'
							}
						]
					}
				);
			});

		});
	}

	loadDatepickers();

});

/**
 * Slide-in docks
 *
 * Works with bootstraps modal html structure with modifications:
 * * replace modal classes with a dock class to the modal
 * * Use data-toggle="dock" for the trigger (rather than data-toggle="modal")
 * * Use data-dismiss="dock" to the modal's close button (rather than data-dismiss="modal")
 *
 */

DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	var focusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
		dock = $('#docked_sliding_panel'),
		initTrigger = false,
		location = window.location.href.split('#')[0],
		hasHistory = false; // whether we've manipulated history or not

	function init() {
		setup($(document));
	}

	/**
	* Called on page load, and after an ajax area has loaded.
	* @param scope | DOMObject - define what the area is that we are setting up
	*/
	function setup(scope) {
		prepLinks(scope);
		attachEvents(scope);

		if(scope.is(document)) {
			loadDockUrl();
		}
	}

	/**
	* @param scope | DOMObject - define what the area is that we are setting up
	*/
	function attachEvents(scope) {

		scope.find('.js-dock-trigger').on('click', function(e) {
			e.preventDefault();
			showDock(e); // Open form here even though it's currently empty (its quicker)
			makeRequest($(this).attr('data-href'));
			pushHistory($(this).attr('data-href'));
		});

		scope.find('.js-dock-trigger').on('keydown',function(e) {
			if(e.which === 13) {
				e.preventDefault();
				showDock(e); // Open form here even though it's currently empty (its quicker)
				makeRequest($(this).attr('data-href'));
				pushHistory($(this).attr('data-href'));
			}
		});

		scope.find(focusable).on('keydown', function(e) {
			if($(e.target).closest('.dock').length > 0 && e.which === 9) {
				trapFocus(e);
			}
		});

		if(scope.is(document)) {
			attachOnLoadEvents();

			if ($('.ie9').length < 1) {
				$(window).on('popstate', function(e) {
					handleHistory(e);
				});
			}
		} else {
			if(scope.find('.sidenote-trigger').length < 1) {
				handleAnchors(scope);
			} else {
				scope.on('sidenotes:ready', function() {
					handleAnchors(scope);
				});
			}
		}
	}

	function handleAnchors(scope) {

		scope.find('a').on('click', function(e) {
			var href = $(this).attr('href'),
				target,
				id;

			if(/^#/.test(href) === true) {
				e.preventDefault();

				id = href.split('#')[1];
				target = document.getElementById(id); // use vanilla js as jquery doesn't work with footnote ids. eg: #sn:thing

				if(target !== null) {
					target.scrollIntoView(true);
				}
			}
		});
	}

	/**
	 * Events that only need to be called when a document is loaded
	 */
	function attachOnLoadEvents() {
		$('[data-dismiss="dock"]').on('click', function(e){
			e.preventDefault();
			replaceWindowHistory();
			hideDock();
		});

		$('.dock_dialog').on('click', function(e){
			e.stopPropagation();
		});

		$('.dock').on('click', function(e){
			$(this).find('[data-dismiss="dock"]').trigger('click');
		});

		$(document).on('ajaxpages:contentloaded', function(e, data) {
			setup(data.target);
			$('input, textarea').placeholder();
		});
	}

	/**
	 *  We want to treat the docks as pages - so when a user presses the back button,
	 *  they should return to a docked page if that is what is in the history stack
	 *
	 * @param e | Event
	 */
	function handleHistory(e) {
		var state = e.originalEvent.state !== undefined ? e.originalEvent.state : e.state;

		// State empty if a. the page first loaded at the dock link or b. this is not a dock link
		if(state === null || state === undefined) {
			if(loadDockUrl() === null) {
				if(!$('.dock').hasClass('closed')) {
					// this is a page, hide the dock
					hideDock();
				}
				return;
			}
			return;
		}

		// this is a dock link, reload it
		if(state.type === 'dock') {
			showDock(false); // Open form here even though it's currently empty (its quicker)
			makeRequest(state.url);
		}
	}

	/**
	 * Load a dock from a url, when applicable
	 *
	 * Case a: page load - the user has loaded a page with a possible dock url
	 * Case b: history - the user has hit the back button and we may have hit a dock url
	 *
	 * @return string (if this was a dock url) or null (if this is not a dock url)
	 */
	function loadDockUrl() {
		var urlHash = window.location.hash.substr(1),
			linkTrigger;

		if(urlHash !== '') {
			if(validateURL(urlHash) && urlHash.indexOf('/') !== -1) { // this probably means we were looking at a deeper link
				setTimeout(function() {
					// on very first dock load, we need to place our base page under our current url
					if(!hasHistory) {
						replaceWindowHistory();
						pushHistory(urlHash);
					}

					showDock(false);
					makeRequest(urlHash);
				}, 300);
				return 'dock';
			}
		}

		return null;
	}

	/**
	 * Track our pages as if they were real links
	 * @param url | String
	 */
	function pushHistory(url) {
		if ($('.ie9').length < 1) {
			history.pushState({url: url, type: 'dock'}, 'dock', location + '#' + url);
		}
	}

	/**
	 * On initial load, in certain cases, we want to replace the original history
	 */
	function replaceWindowHistory() {
		if ($('.ie9').length < 1) {
			//reset history only if we are actually
			history.replaceState(null, null, window.location.pathname + window.location.search);
			hasHistory = true;
		}
	}

	/**
	 * Clear the dock urls (used when we close the dock using the close trigger)
	 */
	function pushWindowHistory() {
		if ($('.ie9').length < 1) {
			//reset history only if we are actually
			history.pushState(null, null, window.location.pathname + window.location.search);
		}
	}


	/**
	 * Uses a regex to test whether a url is valid
	 * @param textval | String - potential url
	 */
	function validateURL(textval) {
		//var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        // modified regex to limit this to inz domains
        var urlregex = /^https:\/\/([A-Z0-9]([A-Z0-9.-]*[A-Z0-9])?.)?immigration.govt.nz\/.*$/i;
		return urlregex.test(textval);
	}

	/**
	* Adjust markup of links
	* @param scope | DOMObject - define what the area is that we are setting up
	*/
	function prepLinks(scope) {
		var targets = scope.find('a[target="slider"]'),
			i,
			url;

		for(i = 0; i < targets.length; i = i + 1) {
			url = $(targets[i]).attr('data-href');
			$(targets[i]).addClass('js-dock-trigger');
		}

		$(document).trigger('ajaxpages:urlsupdated', {scope : scope, targets: targets});
	}


	/**
	 * When the dock is open we want to make sure all tabbing stays within the dock
	 * @params e | Event Object
	 */
	function trapFocus(e) {
		var allFocus = dock.find(focusable).filter(':visible'),
			first = dock.find('[data-dismiss="dock"]'),
			last = allFocus.last(),
			isLast = $(e.target).is(last),
			isFirst = $(e.target).is(first);

		// if last and going forward
		if (isLast && !e.shiftKey) {
			e.preventDefault();
			first.focus();
		}

		// if first and going back
		if (isFirst && e.shiftKey) {
			e.preventDefault();
			last.focus();
		}
	}

	/**
	* Request a page form the url supplied (this is a version of a current page with a stripped-down template)
	* @param scope | DOMObject - define what the area is that we are setting up
	*/
	function makeRequest(url) {
		$.ajax({
			type: 'GET',
			url: url,
			cache: true,
			success: function(data,status) {
				//handle success
				updateDock(data, url);
			},
			error: function (xhr, desc, err) {
				var response = xhr.responseText,
					html = $(response.substring(response.indexOf('<body>')));

				updateDock(html, url);
			}
		});
	}

	/**
	* Handles the content updates for the dock, and any animation effects
	* @param content | HTML
	*/
	function updateDock(content, url) {
		var target = dock.find('.dock_bodywrap');

		target.attr('data-url', url);

		target.fadeOut(0).html(content);

		// delay fadein for effect
		setTimeout(function() {
			$('.dock_loading').fadeOut(300, function() {
				$(this).remove();
			});
			target.fadeIn(1000);
			$(document).trigger('ajaxpages:contentloaded', {target : target});
		}, 500);
	}

	/*
	 * Control the hiding of our dock and trigger the necessary events
	 */
	function hideDock() {

		var top = $('body').position().top;

		$('.dock').each( function() {
			$(this).removeClass('active');
			$(this).addClass('closed');
		});

		$('body').css('top', -top + 'px');
		$('html').removeClass('dock__open');
		$(document).scrollTop(top*=-1);

		$(initTrigger).focus();
	}

	/**
	 * Control showing dock and trigger the necessary events
	 * @param e | Event or Boolean(false) when triggered programmatically
	 */
	function showDock(e) {
		var target = dock.find('.dock_content'),
			content = getLoadingIndicator(),
			top = $(document).scrollTop();

		dock.find('.dock_bodywrap').html('');

		target.prepend(content);

		// we only need to reposition stuff if the dock isn't already open
		if(dock.hasClass('closed')) {

			initTrigger = e ? e.target : false;

			// Prevent disappearing scroll bars from interfering with smooth animation
			$('body').width($('body').width());

			dock.removeClass('closed').addClass('active');

			// Once animation is complete, remove body width adjust body position and classes
			setTimeout(function(){
				$('body').css('top', -top + 'px');
				$('html').addClass('dock__open');
				dock.find('.tools_close').focus();
			}, 300);

			setTimeout(function(){
				$('body').width('100%');
			}, 400);
		}
	}

	/**
	 * Construct the markup for our loading indictor
	 */
	function getLoadingIndicator() {
		return '<div class="dock_loading"><span class="loader">&nbsp;</span><span class="loader_text">Loading</span></div>';
	}

	init();
});

/**
* Fees specific js
*/
DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	function init() {
		accordToggles();
	}

	function accordToggles(){
		//Ensure 'downloads' and 'receving centre details' are not open at the same time
		$('.question_evidencetrigger').click(function(){

			var button = $(this);

			if(!button.hasClass('downloads_trigger') && !button.hasClass('rcd_trigger')){
				return;
			}

			//Close sibling accord if this one has just been activated
			if(button.hasClass('active')){
				var siblingRows = button.closest('.row').siblings('.row');
				siblingRows.each(function(){
					var row = $(this);
					row.find('.question_evidencetrigger, .question_evidence').removeClass('active');
				});
			}

		});
	}

	init();

});

/**
* Field specific js
*/
DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	function init() {
		attachEvents();

		if($('.ie9, .ie10').length > 0) {
			Stretchy.resize();
		}
	}

	function attachEvents() {

		// restrict length of fields
		$(document).on('keydown', '[maxlength]', function(e) {
			if($(this).val().length >= parseInt($(this).attr('maxlength'), 10)) {
				//allow enter, tab, backspace, and delete
				if (e.keyCode !== 13 && e.keyCode !== 9 && e.keyCode !== 8 && e.keyCode !== 46) {
					e.preventDefault();
				}
			}
		});
	}

	init();
});

/**
 * Page filters related javascript
 * Filters are applied based on a json object stored in a data attribute. eg:
 * <div data-filters='[{"Nationality" : "Japan", "Residence" : "Japan", "Others" : ["family", "partner"]}]'>
 * Items can be hidden on page load by applying the attibute "inactive"
 * data-showonfilter html attributes should be a string of comma separated values. eg "nationality-NZ, residence-NZ, family, partner, family|partner"
 *
 * There are varius types of in page filter forms (set with <form data-inpagefilters>). These can apply various types of filters to the page:
 * *
 * * subtractive (i.e filtering) - hides info which is shown by default [default in page form setting]  OR
 * * additive  - shows additional info which is hidden by default [set on from with data-filtertype="additive"]
 * *
 * * AND:
 *
 * * any - can match _any_ of the set filters [set on from with data-inpagefilters="any"] OR
 * * all - must match _all_ of the set filters [default in page form setting]
 *
 * Both additive and subtractive  types use data-showonfilter="family, partner"
 * in order to show or hide content respectively. However addictive filters also
 * have data-hideonfilter="no" in order to hide objects within otherwise additive logic.
 * Yes, it would make more sense to move subtractive filters to use data-hideonfilter, and remove
 * the form level definitions, but this might be quite difficult at this point.
 *
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var digitTest = /^\d+$/,
		keyBreaker = /([^\[\]]+)|(\[\])/g,
		plus = /\+/g,
		paramTest = /([^?#]*)(#.*)?$/,
		isDebugMode;


	function init() {
		var dataObject = constructFilters();

		if(dataObject) {
			applyFiltersAny(dataObject); // these are independantly hidden objects that we want to show.
		}

		if($('form[data-inpagefilters]') && $('[data-action="filter"]')) {
			attachEvents();
		}

		isTestMode();// to be disabled post-dev
		if($('[data-templated]').length < 1) {
			// delay until after templates have been setup
			$(document).trigger('afterfilters');
		}
	}

	/**
	 * Attach all DOM events
	 */
	function attachEvents() {
		$('form[data-inpagefilters]').on('submit', function(e) {
			e.preventDefault();
			filterFormSubmit($(this));
		});

		if($('[data-action="filters-reset"]')) {
			$('[data-action="filters-reset"]').on('click', function(e) {
				e.preventDefault();

				var filterType = 'subtractive';

				if($('[data-filtertype]').length > 0) {
					filterType = $('[data-filtertype]').data('filtertype');
				}

				handleFilterReset(filterType);
			});
		}
	}

	/**
	 * Clear the form, show all filtered items, hide summary row
	 * @param filterType | string either subtractive (hiding information/filtering) or additive (showing extra information)
	 */
	function handleFilterReset(filterType) {

		if(filterType === 'additive') {
			$('[data-showonfilter]').addClass('inactive').attr('aria-hidden', "true");
			$('[data-hideonfilter]').removeClass('inactive').attr('aria-hidden', "false");
		} else {
			$('[data-showonfilter]').removeClass('inactive').attr('aria-hidden', "false");
		}

		$('[data-results-summary]').addClass('results_summary_hidden').attr('aria-hidden', "true");
		$('[data-inpagefilters] select').val(0).trigger('change');
		$('[data-noresults]').addClass('hidden');

		if($('[data-action="filters-reset"]').length > 0) {
			$('[data-action="filters-reset"]').attr('tabindex', '-1');
		}
	}

	/**
	 * Process and apply filters to current page
	 * This is triggered by inpage filters, where we want to apply filters
	 * in succession to remove items from the visible page.
	 *
	 * @param form | Form DOMobject
	 */
	function filterFormSubmit(form) {
		var params = $(form).serialize(),
			filters = queryStringToJSON(params),
			formIsEmpty = isFormEmpty(filters);

		if(formIsEmpty) {
			return;
		}

		hideAllSpecific();

		if(form.data('inpagefilters') === 'any') {
			applyFiltersAny(filters);
		} else {
			applyFiltersAll(filters);
		}

		updateResultsSummary();
	}

	function updateResultsSummary() {
		if($('[data-results-summary]').length > 0) {
			$('[data-results-summary]').removeClass('results_summary_hidden').attr('aria-hidden', "false");

			if($('[data-action="filters-reset"]').length > 0) {
				$('[data-action="filters-reset"]').attr('tabindex', '0');
			}
		}
	}

	/**
	 * Check if our current filter object has any set values.
	 *
	 * @param filters | JSON object generated from filter form
	 */
	function isFormEmpty(filters) {
		var key;
		for (key in filters) {
			if(filters.hasOwnProperty(key)) {
				if(filters[key] !== "") {
					return false; //not empty, exit early
				}
			}
		}
		//is empty
		return true;
	}

	/**
	 * Hide all objects with showonfilter data attribute that isn't "all"
	 *
	 * @param filters | JSON object generated from filter form
	 */
	function hideAllSpecific() {
		$('[data-showonfilter]').not('[data-showonfilter="all"]').addClass('inactive').attr('aria-hidden', "true");
	}


	/**
	 * Show/Hide hidden (inactive) elements that match _ANY_  of the current filters
	 * For hiding items that don't match _ALL_ filters, see applyFiltersAll
	 *
	 * @param filters | JSON
	 */
	function applyFiltersAny(filters) {
		var i,
			key;

		// iterate through object, and show objects with filter
		// inclusive
		for (key in filters) {
			if(filters.hasOwnProperty(key)) {

				if(typeof filters[key] === 'string') {
					setFiltered(filters[key]);
				} else {
					for(i = 0; i < filters[key].length; i = i + 1) {
						setFiltered(filters[key][i]);
					}
				}
			}
		}
	}

	/**
	 * Show hidden (inactive) elements that match _ALL_ supplied filters
	 * For showing items that match _ANY_ filter, see applyFiltersAny
	 *
	 * @param filters | JSON
	 */
	function applyFiltersAll(filters) {
		var i,
			key,
			count = $('[data-showonfilter*="all"]').length || 0,
			results = false,
			filter;

		// iterate through object, and show objects with filter
		for (key in filters) {
			if(filters.hasOwnProperty(key)) {
				if(typeof filters[key] === 'string') {
					results = filterResults(filters[key], results);
				}
			}
		}

		// show all results
		results.removeClass('inactive').attr('aria-hidden', "false");

		// update visual results counter
		if($('[data-filter-count]')) {
			$('[data-filter-count]').text(count + results.length);

			if(count + results.length === 0) {
				$('[data-noresults]').removeClass('hidden');
			} else {
				$('[data-noresults]').addClass('hidden');
			}
		}
	}

	/**
	 * Get results object filtered by newest filter
	 *
	 * @param filters | JSON, results | Object
	 */
	function filterResults(filter, results) {
		if(filter === '') {
			return results;
		}

		if(!results) {
			return $('[data-showonfilter*="' + filter + '"]');
		} else {
			return results.filter('[data-showonfilter*="' + filter + '"]');
		}
	}


	/**
	* Simple if has filter -> show logic (or hide)
	* data-showonfilter, data-hideonfilter on the html should be a string of comma separated values.
	* @param filter | string
	*/
	function setFiltered(filter) {
		$('[data-showonfilter*="' + filter + '"]').removeClass('inactive').attr('aria-hidden', "false");
		$('[data-hideonfilter*="' + filter + '"]').addClass('inactive').attr('aria-hidden', "true");
	}

	/**
	* @param filter | string
	*/
	function unsetFiltered(filter) {
		$('[data-showonfilter*="' + filter + '"]').addClass('inactive').attr('aria-hidden', "true");
		$('[data-hideonfilter*="' + filter + '"]').removeClass('inactive').attr('aria-hidden', "false");

	}

	function constructFilters () {
		var params = location.search.slice(1);

		if(params && paramTest.test(params)) {
			return queryStringToJSON(params + '');
		} else if($('[data-filters]').length > 0) {
			return $('[data-filters]').data('filters')[0]; // onpage filters, filled from backend
		}

		return false;
	}

	/**
	 * Turn a serilized query string into a json object
	 * @param params | Serialized query string
	 */
	function queryStringToJSON(params) {
		var data = {},
			pairs = params.split('&'),
			pair,
			current,
			part,
			lastPart,
			newKey,
			key, value, parts,
			i, j, k;

		for(i = 0; i < pairs.length; i = i + 1) {
			current = data;
			pair = pairs[i].split('=');

			// if we find foo=1+1=2
			if(pair.length != 2) {
				pair = [pair[0], pair.slice(1).join("=")]
			}

			key = decodeURIComponent(pair[0].replace(plus, " "));
			value = decodeURIComponent(pair[1].replace(plus, " "));
			parts = key.match(keyBreaker);

			for (j = 0; j < parts.length - 1; j++ ) {
				part = parts[j];
				if (!current[part] ) {
					// if what we are pointing to looks like an array
					current[part] = digitTest.test(parts[j+1]) || parts[j+1] == "[]" ? [] : {}
				}
				current = current[part];
			}

			lastPart = parts[parts.length - 1];

			// handle multiple options with |
			value = value.split("|");

			for (k = 0; k < value.length; k = k + 1) {
				if(value.length > 1) {
					newKey = lastPart + k;
				} else {
					newKey = lastPart;
				}
				if(lastPart == "[]") { //first time
					current.push(value[k])
				} else {
					current[newKey] = value[k];
				}
			}
		}

		return data;
	}

	/**
	 * Handle toggling of testmode
	 */
	function isTestMode() {

		var cmdDown = false,
			cmdKey = 91,
			optionKey = 16,
			testKey = 84;

		$(document).keydown(function(e){

			if (e.keyCode == cmdKey) {
				cmdDown = true;
			}

		}).keyup(function(e) {
			if (e.keyCode == cmdKey) {
				cmdDown = false;
			}
		});

		$(document).keydown(function(e) {
			if (cmdDown && e.keyCode == testKey) {
				DebugFilters();
			}
		});

	}

	/**
	 * If enabled we will see the question ID in the question label
	 * This is intended to make debugging and testing question behaviour easier
	 */
	function DebugFilters() {

		if(isDebugMode) {
			//debug mode is on, disable
			$('.debugging-filter').remove();
			isDebugMode = false;
			return;
		}
		var i,
			el = $('[data-showonfilter]'),
			filter;

		for(i = 0; i < el.length; i = i + 1 ){
			if($(el[i]).length > 0){
				filter = $(el[i]).data('showonfilter');
				$(el[i]).append('<strong class="debugging-filter" style="display:inline-block; padding-right:15px;">' + filter + ' </strong> ');
			}
		}

		isDebugMode = true;
	}



	init();

});

DO.Subscribe('app:ready', function(e, $) {
	$('.footer_list_link__slide_trigger').on('click', function() {
		var el = $(this),
			parent = el.parent();

		el.toggleClass('open');
		$(el.attr('data-target')).toggleClass('open');
		parent.siblings().children('.open').removeClass('open');
	});
});

/**
* Parsley form validation initi and customizatiosn
*/
DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	function init() {
		if($('form').length > 0) {
			setup($('form'));
		}
		attachEvents();
	}

	function setup(form) {
		form.parsley(getConfig());
	}

	function getConfig() {
		return {
			classHandler: function (el) {
				return el.$element.closest(".form_field");
			},
			errorsContainer: function (el) {
				return el.$element.closest(".form_field");
			},
			errorsWrapper: '<span class="banner__alert field__error" role="alert"></span>',
			errorTemplate: '<span></span>',
			focus: 'none'
		};
	}

	function attachEvents() {
		$(document).on('newformadded', 'form', function() {
			setup($(this));
		});

		$(document).on('ajaxpages:contentloaded', function(e, data) {
			var form = data.target.find('form');

			if(form.length > 0) {
				setup(form);
			}
		});
	};

	init();
});

DO.Subscribe('app:ready', function(e, $) {

	//flag for index is scrolling
	var glossaryScrolling = false,
		glossaryAdjust = $('.header').outerHeight(true);


	function init() {

		if($('.glossary_index').length < 1) {
			return;
		}

		setupGlossary();
		// We need to wrap this in a timeout as the heights are not calculated
		// correctly for the offsets and we need to recalculate these

		setTimeout(function() {
			adjustSideGlossary();
			attachEvents();
			// goto hash on load
			scrollGlossary(window.location.hash);
		}, 100);

	}

	function setupGlossary() {
		// affix settings
		$('[data-glossaryindex-top]').affix({
			offset: {
				top: function () {
					var top = (this.top = $('.glossary_index__top').offset().top);
					return top;
				}
			}
		});

		$('[data-glossaryindex-side]').affix({
			offset: {
				top: function() {
					var top = (this.top = $('.glossary_index__side').offset().top);
					return top;
				},
				bottom: function() {
					var bottom = (this.bottom = $('.footer').outerHeight(true));
					return bottom;
				}
			}
		});

	}

	function attachEvents() {
		$(window).on('resize', function() {
			adjustSideGlossary();
		});
		// handle click of index item
		$('.glossary_index a').on('click', function(e) {
			e.preventDefault();
			var parts = $(this).attr('href').split('#'),
				hash = '#' + ((typeof parts[1] !== "undefined") ? parts[1] : parts[0]);

			scrollGlossary(hash);
		});

		// update hash as user scrolls through glossary
		$(window).on('scroll', function(e) {
			handleScroll();
		});

		$('a[href*="#"]:not([href="#"])').on('click', function() {
			handleAnchors(this);
		});
	}

	function handleScroll() {
		if(!glossaryScrolling) {
			var win = $(window), adjust = 60;
			$('.glossary_group').each(function() {
				if($(this).offset().top < win.scrollTop() + adjust
					&& $(this).offset().top + $(this).height() > win.scrollTop() + adjust) {
						updateGlossaryIndex($(this).attr('id'));
				}
			});
		}
	}


	// get glossary settings
	function getConfig() {
		return {
			onAfter: function() {
				setTimeout(function() {
					glossaryScrolling = false;
				}, 300);
			},
			offset: {
				top: ($('.glossary_index__side').is(':visible')) ? 0 : -59
			}
		}
	}


	/**
	 * Intercept anchor links and move to position
	 * Used to fix sticky header offset issues
	 *
	 * @param self | DOMObject a href
	 */
	function handleAnchors(self) {

		if (location.pathname.replace(/^\//,'') === self.pathname.replace(/^\//,'') && location.hostname === self.hostname) {

			var target = $(self.hash);

			target = target.length ? target : $('[name=' + self.hash.slice(1) +']');

			if (target.length) {

				setTimeout(function() {
					$(window).scrollTo(target, 300, getConfig());
				}, 50);


				return false;
			}
		}
	}

	// set the height of the mobile side index
	function adjustSideGlossary() {
		// remove .header height to make it full height of screen
		var h = $(window).height() - $('.header').outerHeight(true),
			side = $('.glossary_index__side');

		side.css({height: h});
		side.affix('checkPosition');

		// For some real odd reason applying the offset previously doesn't work
		// We need to set it again here for our bottom positioning to be applied correctly
		side.data('bs.affix').options.offset.top = side.offset().top;
		side.data('bs.affix').options.offset.bottom = $('.footer').outerHeight();
	};

	// set glossary index items to active
	function updateGlossaryIndex(id) {
		$('.glossary_index li').removeClass('active');
		$('.glossary_index li[data-target="' + id.replace('#','') + '"]').addClass('active');
	}

	// do the glossary scroll
	function scrollGlossary(hash) {
		if(hash.length && $(hash).length) {
			glossaryScrolling = true;

			setTimeout(function() {
				$(window).scrollTo($(hash), 300, getConfig());
			}, 50);

			updateGlossaryIndex(hash);
		}
	}

	init();

});

/*
 * Initilization of photoswipe and preperation of images.
 * Note: This is dependent on the photoswipe component
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var pswpEl = $('.pswp')[0],
		toggleLink = '<a class="toggle-link outer-link" href="#"><span class="sr-only">Show whole caption</span></a>',
		initButton = null;

	function init() {
		setup($(document));
	}

	function setup(scope) {
		attachEvents(scope);
		markup(scope);
	}

	function markup(scope) {
		var images = scope.find('figure.image'),
			i;

		if(images.length < 1){
			return;
		}

		for(i = 0; i < images.length; i = i + 1) {
			if($(images[i]).find('figcaption').length > 0 ){
				$(images[i]).addClass('image__hascaption');
			}
		}
	}


	function getOptions(mainClass) {
		return {
			history: false,
			focus: true,
			mainClass: mainClass,
			bgOpacity: 0.98,
			tapToClose: false,
			tapToToggleControls: false,
			closeOnScroll: false
		};
	}

	function attachCaptionToggle() {
		$(document).on('click', '.pswp__caption .toggle-link', function(e) {
			e.preventDefault();
			e.stopPropagation();

			$(this).closest('.pswp__caption').toggleClass('active');
		});
	}

	function attachCaptionClose() {
		$(document).on('click', function(e) {
			var caption = $('.pswp__caption'),
				childOfCaption = $(e.target).closest(caption).length > 0;

			if($(e.target) !== caption && !childOfCaption) {
				$('.pswp__caption').removeClass('active');
			}
		});
	}

	function attachEvents(scope) {
		scope.find('.image .js-toggle-large').on('click', function(e) {
			e.preventDefault();

			initButton = $(this);

			var image = $(this).siblings().find('img');
			createPhotoswipe(image);
			attachCaptionToggle();
		});


		if(scope.is(document)) {
			attachCaptionClose();

			$(document).on('ajaxpages:contentloaded', function(e, data) {
				setup(data.target);
			});
		}
	}

	function createPhotoswipe(self) {
		var item = getItem($(self)),
			mainClass = $(self).closest('.image').hasClass('image__dark') ? 'pswp--minimal--dark' : 'pswp--minimal--light',
			photoswipe = new PhotoSwipe(pswpEl, PhotoSwipeUI_Default, item, getOptions(mainClass));

		photoswipe.init();

		photoswipe.listen('destroy', function() {
			//delay so we can be sure the focus gets set
			setTimeout(function(){
				initButton.focus();
			}, 500);
		});

	}

	function getItem(self) {
		var content = false,
			caption = self.closest('.image').find('.image_caption_inner');

		if(caption.length > 0){
			caption = caption.html();
			content = toggleLink + caption;
		}
		return [{
			src: self.attr('src'),
			w: self[0].naturalWidth,
			h: self[0].naturalHeight,
			title: content,
			pid: self.attr('data-pid')
		}];
	}

	init();

});

/**
* Javascript for the situation info panel
*/
DO.Subscribe('app:ready', function(e, $) {

	var form = $('[data-infopathway-form]'),
		situation = {},
		error = false;

	function init() {

		if(form.length < 1) {
			return;
		}

		var type = inz.findVisaInfo.getVisaType();

		if(typeof type === "undefined") {
			return;
		}

		renderType(type);

		setTimeout(function(){
			attachEvents();
		}, 100);
	}

	/**
	 * Clear all fields dependent on data (everything except the first select), and disable the button
	 */
	function clearDependencies() {
		situation = {};

		var button = form.find('button');
		button.prop('disabled', true).removeClass('active');
		$(button.attr('[data-toggle]')).removeClass('active');

		$('[data-infopathway-error]').html('');
		$('[data-infopathway-result]').html('');
		$('[data-infopathway-situation]').html('');
	}

	/**
	 * Define events. Note: these are attached to elements that already exists,
	 * but may watch our created elements.
	 */
	function attachEvents() {
		$(document).on('change', '[data-trigger-situation]', function(){
			handleTriggerSituation(this);
		});

		form.on("click", 'button', function(e) {
			e.preventDefault();

			var target = $(this).data('toggle');
			$(target).addClass('active');

			if(error) {
				$(this).removeClass('active').prop('disabled', true);
			} else {
				$(this).addClass('active').prop('disabled', false);
			}
		});
	}

	/**
	 * When a visa type is chosen, we need to render our situations and attach events.
	 * @param self | DOMObject select
	 */
	function handleTriggerSituation(self) {
		clearDependencies();

		if($(self).val() === "" || $(self).val() === " ") {
			return;
		}

		var data = inz.findVisaInfo.getInfoForVisaType($(self).val());
		renderSituation(data);
	}

	/**
	 * Render Visa Types into a dropdown, and trigger all related events attachment
	 * @param data | JSONObject
	 */
	function renderType(data) {
		$('[data-infopathway-type]').html(tmpl("tmpl-infopathway-type", data));
		$(document).trigger('aftertemplates');
		$(document).trigger('afterfilters');
	}

	/**
	 * Render "situations" into a dropdown.
	 *
	 * @param data | JSONObject
	 */
	function renderSituation(data) {
		situation = data.situations; // store the situations data for later

		$('[data-infopathway-situation]').html(tmpl("tmpl-infopathway-situation", situation));
		$('[data-infopathway-situation] select').trigger('newselectadded');
		attachSituationEvents();
	}

	/**
	 * When an office is chosen we need to render the office details and
	 * enable the show button
	 */
	function attachSituationEvents() {
		$('[data-infopathway-situation] select').on('change', function() {

			$('[data-infopathway-error]').html('');
			$('[data-infopathway-result]').html('');

			if($(this).val() === "" || $(this).val() === " ") {
				return;
			}

			var data = situation[$(this).val()],
				button = form.find('button');

			form.find('button').prop('disabled', false).addClass('active');
			$(button.attr('data-toggle')).removeClass('active');

			renderResults(data);
		});
	}

	/**
	 * Render the Results or Message
	 *
	 * @param data | JSONObject
	 */
	function renderResults(data) {

		if(data.message) {
			error = true;
			$('[data-infopathway-error]').html(tmpl("tmpl-infopathway-error", data.message));
		} else {
			error = false;
			$('[data-infopathway-result]').html(tmpl("tmpl-infopathway-result", data.content));
		}

	}

	init();

});

/**
* Javascript for the knowledgebase
*/
DO.Subscribe('app:ready', function(e, $) {

	var searchForm = $('[data-knowledgebase-form]'),
		searchQuery = false;

	function init() {

		if(searchForm.length < 1) {
			return;
		}
		attachEvents();
	}

	/**
	 * Define events.
	 */
	function attachEvents() {
		searchForm.on("submit", function(e) {
			e.preventDefault();

			$('[data-knowledgebase-queryresult]').html('');// clear any previous message

			searchQuery = $(this);
			inz.knowledgeBase.doSearch($(this));
		});


		$(document).on('inz:aftersearch', function(e, params) {
			$('[data-knowledgebase-queryform]').html('').removeClass('active'); //make sure we clear
			renderQueryForm(params);

			if(params.error) {
				var top = $('[data-knowledgebase-form] .field').first().position().top;

				$('[data-knowledgebase-results] .banner').focus(); //accessibility

				$(window).animate({scrollTop: top}, 500); //move view so we have a chance of the bottom section being in view
			}
		});

		$(document).on("inz:afterquerysubmit", function(e, params) {
			formSubmitted(params);
		});
	}

	/**
	 * Define events attached to the query form
	 * @param form | DOMElement - query form
	 */
	function attachEvents_QueryForm(form) {

		form.on("submit", function(e) {
			e.preventDefault();

			$(this).find(':input').prop('disabled', true);

			inz.knowledgeBase.submitQuery($(this));
		});
	}

	/**
	 * After a query form has been submitted we need to reenable all form fields
	 * if the submit was successful, we also need to hide the form again
	 * @params
	 */
	function formSubmitted(params) {
		var form = $('[data-knowledgebase-queryform] form'),
			top = $('[data-knowledgebase-queryresult] .banner').first().position().top;

		form.find(':input').prop('disabled', false);

		$('[data-knowledgebase-queryresult] .banner').focus();

		// on successful submit, close form and empty values
		if(params.error) {
			$(window).animate({scrollTop: top}, 500); //move view so we have a chance of the bottom section being in view
		} else {
			$('#btn_showform').addClass('active');

			if($('.response_small, .response_base').length < 1) {
				$('[data-knowledgebase-queryform]').slideUp({
					duration: 500,
					easing: "swing",
					complete: function() {
						hideQueryForm($(this));
					}
				});
			} else {
				hideQueryForm($('[data-knowledgebase-queryform]'));
			}
		}
	}

	/**
	 * @param self | DOMObject
	 */
	function hideQueryForm(self) {
		var top,
			form = $('[data-knowledgebase-queryform] form');

		form.find(':input').val('').trigger('change');
		self.removeClass('active');
		self.css('display', '');

		top = $('[data-knowledgebase-queryresult] .banner').first().position().top - 200;
		$(window).animate({scrollTop: top}, 500); //move view so we have a chance of the bottom section being in view
	}



	/**
	 * This renders the contact form ("Can't find answers to your questions")
	 * @params params | JSON - event parameters passed back to us
	 */
	function renderQueryForm(params) {
		var queryFormSection = $('[data-knowledgebase-queryform]'),
			data = {
				"topic": searchQuery.find('#topic_search').val(),
				"query": searchQuery.find('#question_search').val()
			},
			template = tmpl("tmpl-knowledgebase-queryform", data);

			queryFormSection.html(template);

		setTimeout(function() {
			initQueryForm(queryFormSection, params);
		}, 1); // enough time for the template to render
	}

	/**
	 * Initialise form objects and show form
	 * @params formSection | DOMObject, params | JSON - event parameters
	 */
	function initQueryForm(formSection, params) {
		//init new select2's
		formSection.find('form').trigger('newformadded');
		formSection.find('select').trigger('newselectadded');

		formSection.find('input, textarea').placeholder();

		// Surprise, surprise!
		if($('.ie9').length > 0) {
			$('#btn_showform').on('click', function(e){
				e.preventDefault();
				$('[data-queryform-wrapper]').addClass('active');
				$(this).removeClass('active');
			});
		}


		// if there's an error we want the form to show automagically
		if(params.error) {
			formSection.find('#btn_showform > .btn').trigger('click');
		}

		attachEvents_QueryForm(formSection.find('form'));

		setTimeout(function() {
			formSection.slideDown(300, function() {
				$(this).addClass('active');
				$(this).css('display', '');
			});
		}, 100);
	}

	/**
	 * Helper function to check if a value is empty
	 */
	function hasValue(value) {
		return value !== 0 && value !== "" && value !== " ";
	}

	init();

});

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	$('.linkgrid_item').keyup(function(event) {
		//trigger click if this element doesn't usually support click
		if(event.keyCode == 13) {
			e.preventDefault();
			window.location = $(this).find('> a').attr('href');
		}

	});


});

mapJSLoaded = false;

var inz = inz || {};
inz.apps = inz.apps || {};

var mapPluginsLoaded = false;
var googleMapsLoaded = false;
var setGoogleMapsLoaded = function() {
	googleMapsLoaded = true;
}

inz.apps.Tool = function(scope) {
	this.isTest = false; // set this to true to test google maps API issue handling
	this.scope = scope; // Scope of the tool, required so that tools load correctly in docks etc

	// generic DOM elements
	this.holderEl; // very outer DOM element of the tool
	this.resultsBlockSelector = '[data-tool-resultsblock-lower]';
	this.resultsBlock; // outer DOM element of the tool - upper & lower dependant on tool
	this.loader; // DOM element for the loading spinner
	this.errorEl; // DOM element to load errors into, always below form regardless of tool type

	// form DOM elements
	this.formEl; // DOM element for the form
	this.formFieldsEl; //DOM element to load additinal form fields into
	this.filterTitle; // title above the tool form
	this.filterButton; // action button on the form
	this.resetButton; // reset action button on the form
	this.filterButtonHolder;
	this.actionLabel; // text for the tool form submit/filter button

	// results DOM elements
	this.tools;
	this.listTab; // tab for list view results
	this.mapTab; // tab for map results
	this.listToggle; // toggle for lsit view
	this.mapToggle; // toggle for map view
	this.listSummary; // result summary for list view
	this.mapSummary; // result summary for map view
	this.resultsEl; // DOM element to load results into
	this.resultsTitle; // title loaded above the tool results area
	this.moreButton; // loda more button

	// Map DOM elements
	this.mapLoader; // DOM element for the map loading spinner
	this.mapOuter; // outer DOM element for maps
	this.mapHolder; // inner DOM element for maps

	// app vars
	this.inztool; // inz.tool tool instance for this app instance
	this.primaryField; // primary field for the tool form eg 'country'
	this.state = null; // View state for the tool - list vs maps (if the result have location data)
	this.results = {}; // results incoming from the inz.tool search
	this.currentQuery; // for paged results: the current query that we're searching on
	this.currentPage; // for paged results: the current 1-based page that we're searching for
	this.totalResults = 0; // total number of results
	this.resultsStart = 0; // currently displayed results start for paginating the results
	this.resultsTo = 0;  // currently displayed results count for paginating the results
	this.resultsRows = 10; // number of results to paginate by
	this.mapOptions; // all options forthe maps
	this.hasMap; // ture/false this tool instance has results that can be displayed on a map. Set via the tool search results
	this.countryCode = 'NZ'; // used for loading google maps from google.cn if user is in China
	this.map = null; // reference to the tool map
	this.markers = []; // array of map markers
	this.markerClusterer = null;
	this.selectedMarker; // the currently seelcted map marker
	this.speed = 100; // speed for animations
	this.presetPrimaryField = false;
	this.resultsTmpl = 'tmpl-tool-results'; // default js template for rendering rendering reults. Varies between tool types
	this.mapLoadTime = 0; // counter for the amount of time it has taken to load map resources
	this.maxMapLoadTime = 2500; // (ms) if the map resources load within this time, then the map will be displayed first.
	this.cancelMapLoadTime = 20000; // (ms) if map resources havent loaded in this time frame, give up trying
	this.quotaStatusText = 'OVER_QUERY_LIMIT';
}

/**
 * Setup the DOM elements for the app instance
 */
inz.apps.Tool.prototype.getElements = function() {
	// the target area for results varies between tool types.
	this.resultsBlock = this.scope.find(this.resultsBlockSelector);
	this.resultsBlock.show();

	// generic DOM elements
	this.tools = this.resultsBlock.find('[data-tool-tools]');
	this.holderEl = this.scope.find('[data-tool-holder]');
	this.loader = this.resultsBlock.find('[data-tool-loading]');
	this.errorEl = this.scope.find('[data-tool-error]');

	// form DOM elements
	this.formEl = this.scope.find('[data-tool-form]');
	this.formFieldsEl = this.scope.find('[data-tool-formfields]');
	this.filterTitle = this.scope.find('[data-tool-filtertitle]');
	this.filterButtonHolder = this.scope.find('[data-tool-filterbutton-holder]');
	this.filterButton = this.scope.find('[data-tool-filterbutton]');
	this.resetButton = this.scope.find('[data-tool-resetbutton]');

	// results DOM elements
	this.listTab = this.resultsBlock.find('[data-tool-listtab]');
	this.mapTab = this.resultsBlock.find('[data-tool-maptab]');
	this.viewToggle = this.resultsBlock.find('[data-tool-viewtoggle]');
	this.listToggle = this.resultsBlock.find('[data-tool-listtoggle]');
	this.mapToggle = this.resultsBlock.find('[data-tool-maptoggle]');
	this.listSummary = this.resultsBlock.find('[data-tool-listsummary]');
	this.mapSummary = this.resultsBlock.find('[data-tool-mapsummary]');
	this.resultsEl = this.resultsBlock.find('[data-tool-results]');
	this.resultsTitle = this.resultsBlock.find('[data-tool-resultstitle]');
	this.resultsHeader = this.resultsBlock.find('[data-tool-resultsheader]');
	this.moreButton = this.resultsBlock.find('[data-tool-more]');

	// Map DOM elements
	this.mapLoader = this.mapTab.find('[data-tool-maploading]');
	this.mapOuter = this.mapTab.find('.map_outer');
	this.mapHolder = this.mapTab.find('.map')[0];
}

/**
 * Initialize the tool
 */
inz.apps.Tool.prototype.init = function() {
	var self = this;

	// Get the specific tool variable to be used.
	// This will be a variable in the global scope holding setup data, form fieds, and initial data
	var toolVar = this.scope.attr('data-tool-var');
	if(!toolVar) {
		console.log('INZ tool var not found.');
		return;
	}

	if(typeof window[toolVar] === "undefined") {
		console.log('Could not find data ' + toolVar);
		return;
	}

	this.inztool = window[toolVar];

	// Set the version of the tool
	if(typeof inz.tools.version !== "undefined") {
		$(this.scope).attr('data-tool-version', inz.tools.version);
	}

	if(typeof this.inztool.primaryCategory !== "undefined") {
		this.primaryField = this.inztool.primaryCategory;
	}

	// Other setup
	this.getElements();
	this.setupForm();
	this.attachEvents();
	this.showLoader();
	this.scope.attr('data-tool-initialised', 1);
	this.onInit();
};

/**
 * Callback after initialising the tool
 */
inz.apps.Tool.prototype.onInit = function() {
	var self = this;

	this.tools.show();

	$(document).trigger('aftertemplates', {target: this.scope});

	if(this.inztool.searchOnInit)
	{
		setTimeout(function()
		{
			// auto submit the form to display the results
			self.formEl.trigger('submit.tool_submit');
		}, 500);
	}
	else
	{
		// loader if visible in page by default, so we need to hide it if we're suppressing the on init search
		this.hideLoader();
	}
};


/**
 * Setup the form with fields from the API
 */
inz.apps.Tool.prototype.setupForm = function() {
	var self = this;

    var filtersTitle = this.inztool.getFiltersTitle();
    if(filtersTitle)
    {
        this.filterTitle.text(filtersTitle);
    }
    else
    {
        this.filterTitle.hide();
    }
	this.filterButton.prop('value', this.inztool.getFiltersCallToActionLabel());

	// use Tool instance to get the initial fields
	var fields = this.inztool.getInitialFields();

	// render the fields into the page
	for(var n=0; n<fields.length; n++) {
		if(this.formFieldsEl.find(':input[name='+fields[n].name+']').length) {
			// field is already present! shouldn't happen, but we'll check just in case to make sure we never get any duplicates
			if(this.primaryField && fields[n].name == this.primaryField) {
				this.presetPrimaryField = true;
			}

		} else {
			this.formFieldsEl.append(tmpl('tmpl-toolsfields', fields[n]));
		}
	}

	this.formFieldsEl.find('[data-auto-submit]').each(function()
	{
		$(this).prop('autocomplete', 'off');
		$(this).on('keyup', function(e)
		{
			self.autoSubmit(e);
		});
	});

	// hide reset form button if not present in the API
	if(typeof this.inztool.includeResetButton == "undefined" || !this.inztool.includeResetButton) {
		this.resetButton.remove();
	}

	// re-init plugins for the form scope
	$(document).trigger('ajaxpages:contentloaded', {target: this.formEl});


	// display the foem
	self.formEl.addClass('visible');
};

/**
 * handle form auto-submission
 */
inz.apps.Tool.prototype.autoSubmit = function(e) {
	var field = $(e.target);
	e.stopPropagation();
	e.preventDefault();
	if(field.val().length>=field.data('autoSubmit'))
	{
		field.closest('form').submit();
	}
	else
	{
		this.clearResults();
		this.holderEl.slideUp(this.speed);  // because clearResults doesn't touch the results holder
	}
};

/**
 * when updating the form with new fields, wrap pairs opf fields in a row
 */
inz.apps.Tool.prototype.updateForm = function(data) {
	if(typeof data.fields == "undefined") return;
	var self = this,
		fieldSet = $('<div>').addClass('col-md-12 additional_field_set');

	for(var n=0; n<data.fields.length; n++) {
		fieldSet.append($(tmpl('tmpl-toolsfields-additonal', data.fields[n])));
	}

	if(this.formFieldsEl.find(':input[name="submissionMethod"]').length) {
		fieldSet.insertBefore(this.formFieldsEl.find('.additional_field').last());
	} else {
		this.formFieldsEl.append(fieldSet);
	}

	// bind events to new fields
	$(document).trigger('ajaxpages:contentloaded', {target: this.formFieldsEl});
};

/**
 * setup events
 *  - Form submission handler
 *  - View more handler
 */
inz.apps.Tool.prototype.attachEvents = function() {
	var self = this;

	// form submission
	if(this.formEl) {
		this.formEl.off('submit.tool_submit').on('submit.tool_submit', function(e) {
			e.preventDefault();
			self.handleSubmit();
		});
	}

	this.resetButton.off('click.tool_reset').on('click.tool_reset', function(e) {
		e.preventDefault();
		self.resetForm();
	});

	// load more button
	this.moreButton.off('click.tool_more').on('click.tool_more', function(e) {
		$(this).addClass('results_loadbtn__loading');
		if(self.results.type==='RESULTS_PAGED')
		{
			self.handleSubmit(self.currentPage+1);
		}
		else
		{
			self.renderResults(function()
			{
				self.moreButton.removeClass('results_loadbtn__loading');
			});
		}
	});

	this.listToggle.off('click.list_toggle').on('click.list_toggle', function() {
		self.showList();
	});

	this.mapToggle.off('click.map_toggle').on('click.map_toggle', function() {
		self.showMap();
	});

};


/**
 * handle form reset
 */
inz.apps.Tool.prototype.resetForm = function() {
	this.formEl[0].reset();
	this.formEl.find('select').trigger('change');

	// clear any existing results
	this.clearResults();
	this.holderEl.slideUp(this.speed);

	if(this.searchOnInit)
	{
		this.handleSubmit();
	}
};

/**
 * handle form submission
 */
inz.apps.Tool.prototype.handleSubmit = function(page) {
	var self = this,
		formData = self.formEl.serializeArray();

	if(page)
	{
		formData.push({name: '__page__', value: page});
	}
	else
	{
		// either we're not paged, or this is the first page of a new search, so we want to show the full loader
		this.showLoader();
	}
	var searchCallback = function(data) {
		self.initResults(data);
	}

	this.inztool.search(formData, searchCallback);
};

/**
 * initialise results
 */
inz.apps.Tool.prototype.initResults = function(data) {
	this.results = data;

	if(this.results.type==='RESULTS_PAGED')
	{
		this.currentPage = this.results.currentPage;
	}

	// Perform various actions based on the result from the tool search
	switch(this.results.type) {
		case 'RESULTS':
		case 'RESULTS_PAGED':
			this.clearResults();
			this.prepResults();
			this.initMap();
			this.renderResults();
			break;
		case 'RESULTS OPEN':
			this.prepResults();
			this.renderResults();
			break;
		case 'RESULTS_OFF':
			this.clearResults();
			this.prepResults();
			this.renderResults();
			break;
		case 'VALIDATION FAIL':
			this.clearResults();
			this.errorEl.html(tmpl('tmpl-toolsvalidationfail', this.results));
			this.showError();
			break;
		case 'NO RESULTS':
			this.clearResults();
			this.errorEl.html(tmpl('tmpl-toolserror', this.results));
			this.showError();
			break;
		case 'NO RESULTS FOR CATEGORY':
			this.clearResults();
			this.errorEl.html(tmpl('tmpl-noresultscat', this.results));
			this.showError();
			break;
		case 'FIELDS':
			this.clearResults();
			this.updateForm(data);
			break;
		default:
			this.clearResults();
			this.results.bannertype = 'alert';
			this.errorEl.html(tmpl('tmpl-toolserror', this.results));
			this.showError();
			break;
	}
};

/**
 * Called when the server returns something not interpreted as a success.
 * Renders an error message for the user.
 */
inz.apps.Tool.prototype.handleFailure = function(xhr, desc, err) {
	this.clearSuccessTemplates();
	var data = {'Title': 'Sorry', 'message': xhr.statusText, 'bannertype': 'alert'};
	this.errorEl.html(tmpl('tmpl-toolserror', data));
};

/**
 * Clear all templates
 */
inz.apps.Tool.prototype.clearSuccessTemplates = function() {
	this.listSummary.html('');
	this.mapSummary.html('');
	this.resultsEl.html('');
	this.errorEl.html('');
};

/**
 * Clear results, maps & markers, and reset buttons
 */
inz.apps.Tool.prototype.clearResults = function() {
	if(this.results.type==='RESULTS_PAGED'&&this.currentPage>1)
	{
		return;
	}
	this.resultsStart = 0;
	this.resultsTo = 0;
	this.totalResults = 0;
	this.clearSuccessTemplates();
	this.moreButton.hide().removeClass('results_loadbtn__loading');
};

/**
 * Show the spinner in the results area
 */
inz.apps.Tool.prototype.showLoader = function() {
	this.errorEl.slideUp(this.speed);
	this.holderEl.slideUp(this.speed);
	this.loader.slideDown(this.speed);
};

inz.apps.Tool.prototype.hideLoader = function() {

	this.loader.stop(true,true).slideUp(this.speed);
};

inz.apps.Tool.prototype.removeLoader = function() {

	this.loader.remove();
};

/**
 * Hide errors/loaders and display results
 */
inz.apps.Tool.prototype.showResults = function() {
	this.errorEl.slideUp(this.speed);
	this.holderEl.slideDown(this.speed);
	this.loader.slideUp(this.speed);
};

inz.apps.Tool.prototype.showList = function() {
	this.state = 'list';
	this.mapToggle.removeClass('active');
	this.mapTab.removeClass('active');
	this.mapSummary.removeClass('active');
	this.listToggle.addClass('active');
	this.listTab.addClass('active');
	this.listSummary.addClass('active');
	this.showResults();
};

inz.apps.Tool.prototype.showMap = function() {
	this.state = 'map';
	this.listToggle.removeClass('active');
	this.listTab.removeClass('active');
	this.listSummary.removeClass('active');
	this.mapToggle.addClass('active');
	this.mapTab.addClass('active');
	this.mapSummary.addClass('active');
	this.mapLoader.hide();
	this.showSwitch();
	this.showResults();

	this.renderMap();

	setTimeout(function() {
		// force map redraw when clicking into maps
		$(window).resize();
	}, 200);
};

/**
 * Hide results/loaders and display errors
 */
inz.apps.Tool.prototype.showError = function() {
	this.holderEl.slideUp(this.speed);
	this.loader.slideUp(this.speed);
	this.errorEl.slideDown(this.speed);
};

/**
 * Hide and then remove error messages
 */
inz.apps.Tool.prototype.hideError = function() {
	var self = this;
	this.errorEl.slideUp(this.speed, function() {
		self.errorEl.html('');
	});
};

/**
 * Perform any operations on the result set
 *  - Determine if a map is required
 *  - Get the total results
 */
inz.apps.Tool.prototype.prepResults = function() {
	if(this.results.type==='RESULTS_PAGED')
	{
		// this.results is the latest page of results
		this.hasMap = false;
		this.totalResults = this.results.totalCount;
	}
	else
	{
		// this.results is ALL of the results

		if(this.results.hasGeolocatedResults === "undefined" || this.results.hasGeolocatedResults !== true)
		{
			this.hasMap = false;
		} else
		{
			this.hasMap = true;
		}

		this.totalResults = this.results.data.length;
	}

	// map each item's details so we can reference them easily in the js template
	// used to render markup id's for toggle switches
	for(var i=0; i<this.results.data.length; i++) {
		if(this.results.data[i].id===undefined) {
			// all results should all have an id already so this should never be used
			this.results.data[i].id = i + 1;
		}
		if(this.results.data[i].details && this.results.data[i].details.length > 0) {
			this.results.data[i].mapped = [];

			for(var j=0; j<this.results.data[i].details.length; j++) {
				this.results.data[i].mapped[this.results.data[i].details[j].type] = this.results.data[i].details[j];
			}
		}
	}

	// add emedical data.
	// this needs to be encoded for use as a data attr.
	this.results.glossaryTipEMedical = (typeof this.inztool.glossaryTipEMedical !== "undefined") ?
	 tmpl.encode(this.inztool.glossaryTipEMedical) : null;
};

/**
 * Render the results, paginating by 10 results
 * Call the callback when rendering is complete
 */
inz.apps.Tool.prototype.renderResults = function(callback) {

	var self = this,
		set;

	if(this.results.type==='RESULTS_PAGED')
	{
		set = this.results.data;
		this.resultsTo = ((this.results.currentPage-1) * this.results.pageSize) + this.results.data.length;
	}
	else
	{
		set = this.results.data.slice(this.resultsStart, this.resultsStart + this.resultsRows);
		// append the result set to the result list
		this.resultsTo = this.resultsStart + set.length;
	}


	var tmplData = {
		set: set,
		results: this.results
	}

	if(set.length > 0) {
		this.resultsEl.append(tmpl(this.resultsTmpl, tmplData))
		this.resultsStart = this.resultsStart + this.resultsRows;
	}

	// we've finished loading the results so hide the spinner on the more button if it's present
	this.moreButton.removeClass('results_loadbtn__loading');

	// hide 'show more' button if we have reached the end of the results
	if((this.results.type==='RESULTS_PAGED' && !this.results.hasMoreResults) || (this.results.type!=='RESULTS_PAGED' && (set.length < this.resultsRows || this.totalResults <= 10))) {
		this.moreButton.hide();
	} else {
		this.moreButton.show();
	}

	// update result count text
	this.updateSummaries();

	//renderthe results title (entityTitle)
	if(typeof this.results.entityTitle !== "undefined") {
		this.resultsTitle.text(this.results.entityTitle);
	}

	//render the results header (header)
	if(typeof this.results.header !== "undefined")
	{
		this.resultsHeader.html(this.results.header);
	}
	else
	{
		this.resultsHeader.empty();
	}

	// re-init result scope. Requires a timeout to
	// allow results to load
	setTimeout(function() {
		$(document).trigger('ajaxpages:contentloaded', {target: self.resultsEl});

		// callback for when results are rendered
		if(typeof callback === "function") {
			callback.call();
		}

		self.attachResultEvents();
	}, 250);
};

/**
 * attach events for results
 */
inz.apps.Tool.prototype.attachResultEvents = function() {
}

/**
 * Update the summary information for map and list views
 */
inz.apps.Tool.prototype.updateSummaries = function() {
	this.listSummary.html(tmpl('tmpl-tool-listsummary', {from: 1, to: this.resultsTo, total: this.totalResults}))

	if(this.hasMap) {
		this.mapSummary.html(tmpl('tmpl-tool-mapsummary', {total: this.totalResults}));
	}
};

/**
 * Load in map resources
 * - Get the users countryCode from http://freegeoip.net/json/ as users inside the great firewall of china
 *   need to use a different google maps JS API endpoint (served from Googles servers inside china at google.cn). If
 *   outside China, serve from google.com
 * - Then load in the Google maps API
 * - Then load the google maps plugins for clustering and markers
 * - Note the google maps JS API actually loads a script which then loads other scripts,
 *   so we need to use the google maps JS API callback method which sets a global variable 'googleMapsLoaded'.
 *   Secondly, the plugins also set a global variable 'mapPluginsLoaded' when  it has been loaded
 *   We then check these two variable are true inside an interval, and then fire onMapResourcesloaded
 */
inz.apps.Tool.prototype.initMap = function() {
	var self = this;

	// added as of tools 1.7, kill switch for maps in inztool
	if(this.inztool.disableMaps) {
		this.hasMap = false;
		this.showList();
		return;
	}

	// reset bounds on map if we already have a map (zoom back out)
	if(this.map) {
		this.resetBounds();
	}

	if(!this.hasMap) {
		self.showList();
		return;
	}

	if(window.googlemapsAPIKey == "undefined") {
		console.log('WARNING: Google Maps API Key not set - Maps will not load');
		return;
	}

	if(typeof google !== "undefined" && typeof google.maps !== "undefined") {
		this.onMapResourcesloaded();
		return;
	}

	$.when(
		self.getCountryCode(),
		self.getGoogleMapsJS()
	)

	.done(function(countryResult, apiResult) {
		self.onMapResourcesloaded();
	})

	.fail(function(countryResult, apiResult) {
		console.log('Error loading Map resources');
		self.showList();
	});

	return;
};

/**
 * Get the country code. We need to check if the user is inside China and if so, serve the google maps JS API
 * from inside china.
 * - Allow 3 seconds for doing the lookup
 * - Would be more efficient if this called a local endpoint to get the coutnry code.
 */
inz.apps.Tool.prototype.getCountryCode = function() {
	var self = this,
		isChinaTest = false; // fake our request to be from china

	if(typeof Cookies !== "undefined" && typeof Cookies.get('geoip_user_cc') !== "undefined") {
		var code = Cookies.get('geoip_user_cc');
		if(code && typeof code === "string" && code !== "null") {
			self.countryCode = code.toLowerCase();
			var deferred = new $.Deferred();
			return deferred.resolve();
		}
	}

	return $.ajax({
		type: 'get',
		dataType: 'jsonp',
		url: '//geoip.tungstenweb.com/json/',
		crossDomain: true,
		timeout: 3000,
		url: (function() {
			if(self.isTest) {
				if(isChinaTest) {
					return '/demo_docs/maps.test.php?q=country&country=cn';
				} else {
					return '/demo_docs/maps.test.php?q=country';
				}
			} else {
				return '//geoip.tungstenweb.com/json/';
			}
		})(),
		success: function(data) {
			if(data && typeof data.country_code !== "undefined") {
				self.countryCode = data.country_code;
			}
		}
	});
};

/**
 * Get the Google maps API. Not this then loads more scripts and authenticates the user. We need to
 * wait for all that to happen before initialising any maps.
 * @return {[type]} [description]
 */
inz.apps.Tool.prototype.getGoogleMapsJS = function() {
	var self = this;
	return $.ajax({
		dataType: 'script',
		timeout: 3000,
		url: (function() {
			if(self.isTest) {
				return '/demo_docs/maps.test.php?q=maps&key=' + window.googlemapsAPIKey + '&country=' + self.countryCode;
			} else if(self.countryCode.toLowerCase() == 'cn') {
				return '//maps.googleapis.com/maps/api/js?sensor=false&async=2&callback=setGoogleMapsLoaded&region=CN&language=zh-CN&key=' + window.googlemapsAPIKey;
			} else {
				return '//maps.googleapis.com/maps/api/js?sensor=false&async=2&callback=setGoogleMapsLoaded&key=' + window.googlemapsAPIKey;
			}
		})(),
		success: function(data, status, xhr) {
			if(typeof TEST_OVER_QUERY_LIMIT !== "undefined" && TEST_OVER_QUERY_LIMIT) {
				xhr.statusText = self.quotaStatusText;
			}
			// detect quote limits in statustext
			if(xhr.statusText == self.quotaStatusText) {
				self.hasMap = false;
				self.showList();
				return;
			} else {
				self.getGoogleMapsPlugins();
			}
		}
	});
};

/**
 * Load the map plugins. when loaded, will set a global variable 'mapPluginsLoaded'
 */
inz.apps.Tool.prototype.getGoogleMapsPlugins = function() {

	$.getScript(JS_VENDOR_LOCATION + 'map-plugins.js');
}

/**
 * Call back for when all map resources have been loaded
 * - This will check that the 'googleMapsLoaded' and 'mapPluginsLoaded' have been set to true
 *    before initialising the maps
 * - If loading the map resources has been quick enough (maxMapLoadTime) and there
 *   are more than 10 results, tell the app to switch to the map view, otherwise leave it showing
 *   the lsit view.
 * - If loading the map resources takes longer than 10 seconds, dont bother showing the
 *   map at all.
 * - This is inside a try/catch so that any issues arising from loading the reources will be caught
 *   and the map wont be displayed.
 * - It will also catch any other issues, such as a OVER_QUERY_LIMIT response or user is offline
 * - Also bind the map view switch
 */
inz.apps.Tool.prototype.onMapResourcesloaded = function() {
	var self = this;

	try {

		if(typeof google === "undefined" || typeof google.maps === "undefined") {
			throw('Google undefined');
		}

		// even if the result set states there are geocoordinates,
		// still check to ensure that there are markers. If not, hide the map
		var hasResults = false;
		$.each(this.results.data, function(i,item) {
			if(item.location && item.location.latitude && item.location.longitude) {
				hasResults = true;
			}
		});

		if(!hasResults) {
			this.hasMap = false;
			this.showList();
			return;
		}

		var mapsLoadedCheck = setInterval(function() {
			self.mapLoadTime += 50;

			if(self.state != 'list' && window.googleMapsLoaded == true && window.mapPluginsLoaded == true) {
				clearInterval(mapsLoadedCheck);

				if(self.mapTab.is(':visible')) {
					self.showMap();
				}

				// switch to map view if more than 10 results
				// nut only if the results area is not already visible
				else if(self.totalResults > 10 && self.holderEl.is(':hidden')) {
					self.showMap();
				}

				else if(self.totalResults <= 10 && self.holderEl.is(':hidden')) {
					self.showMap();
				}

				else {
					self.showList();
				}

			}

			else if(self.mapLoadTime > self.maxMapLoadTime) {
				if(self.mapLoadTime > self.cancelMapLoadTime) {
					clearInterval(mapsLoadedCheck);
				}

				self.showList();
			}
		}, 50);

	} catch(ignore) {

		console.log(ignore.message);
		return;
	}
}

/**
 * Show the list/map view switch. This is hidden by default
 */
inz.apps.Tool.prototype.showSwitch = function() {
	this.viewToggle.slideDown(200, function() {
		$(this).css('opacity', 1);
	});
};

/**
 * Render the map
 * Sets up marker clustering and the map instance
 */
inz.apps.Tool.prototype.renderMap = function() {
	var self = this,
		bounds = new google.maps.LatLngBounds(),
		marker, item;

	this.setMapWidth();

	this.selectedMarker = null;

	//remove any open popups
	$('.map_item_detail').remove();

	if(!this.mapOptions) {
		this.mapOptions = this.getMapOptions();
	}

	if(!this.map) {
		this.map = new google.maps.Map(this.mapHolder, this.mapOptions);
	}

	// remove existing markers
	for(var i=0; i<this.markers.length; i++) {
		this.markers[i].setMap(null);
		this.markers[i].setVisible(false); // as MarkerWithLabel setMap(null) still leaves behind DOM elements
	}
	this.markers = [];

	// remove existing markerClusterer
	if(this.markerClusterer) {
		this.markerClusterer.clearMarkers();
	}

	// add a marker for each data set
	for(var i=0; i<this.results.data.length; i++) {
		item = this.results.data[i];

		// only add if item has coords
		if(item.location && item.location.latitude && item.location.longitude) {
			marker = new MarkerWithLabel({
				position: new google.maps.LatLng(parseFloat(item.location.latitude), parseFloat(item.location.longitude)),
				icon: self.mapOptions.markerIcons.default,
				draggable: false,
				map: self.map,
				labelContent: '',
				labelAnchor: new google.maps.Point(-19,26),
				labelClass: 'marker_label',
				labelStyle: {opacity: 1},
				itemData: item,
				isSelected: false
			});

			bounds.extend(marker.getPosition());
			self.attachMarkerClickHandler(marker);
			self.markers.push(marker);
		}
	};

	this.markerClusterer = new MarkerClusterer(this.map, this.markers, this.mapOptions.clusterOptions);

	this.resetBounds();
};

/**
 * Destroy google maps and remove from DOM. Either something went wrong while
 * loading the map resources or the google maps API limit has been reached
 */
inz.apps.Tool.prototype.removeMap = function() {
	this.viewToggle.hide().css('opacity', 0);
	this.mapTab.hide();
	this.mapLoader.hide();
	this.showList();
};

/**
 * Attach events to makers. Opens a detail popupnext to the map when the
 * marker is clicked
 */
inz.apps.Tool.prototype.attachMarkerClickHandler = function(marker) {
	var self = this,
		mapDetailOuter = this.mapTab.find('.map_detail_item_outer');

	marker.addListener('click', function() {

		if(self.selectedMarker) {
			self.selectedMarker.setIcon(self.mapOptions.markerIcons.default);

			if(self.selectedMarker == marker) {
				mapDetailOuter.html('');
				self.selectedMarker = null;
				return;
			}
		}

		marker.setIcon(self.mapOptions.markerIcons.selected);
		marker.isSelected = true;
		self.selectedMarker = marker;

		// add emedical data.
		// this needs to be encoded for use as a data attr.
		marker.itemData.mapped.glossaryTipEMedical = (typeof self.inztool.glossaryTipEMedical !== "undefined") ?
			tmpl.encode(self.inztool.glossaryTipEMedical) : null;

		// switch out contents of map_detail_outer with map details
		mapDetailOuter.html(tmpl('tmpl-tool-mapitemdetail', marker.itemData));

		// reposition the marker to the left of the popup detail,
		// but only if there is reasonable room
		setTimeout(function() {
			var mapDetail = mapDetailOuter.find('.map_item_detail');

			// remove map popup if open
			mapDetailOuter.find('.map_detail_close').on('click', function() {
				mapDetailOuter.html('');
			});

			var x = mapDetail.outerWidth() / 2;
			if(x > 100) {
				self.moveMap(marker.getPosition(),-(x),0);
			} else {
				self.moveMap(marker.getPosition(),0,0);
			}

			// reinit result space
			$(document).trigger('app:inittooltips', {target: mapDetail});

		},200);
	});
};

/**
 * Recenter the map to a given latlng, with the ability to define an x,y ofset in pixels
 * to give space for the map detail popup
 */
inz.apps.Tool.prototype.resetBounds = function(latlng,offsetx,offsety) {
	if(!this.map) return;

	// zoom into a good level
	if(this.map.getZoom() < 4) {
		this.map.setZoom(5);
	}

	if(!this.markers.length) return;

	var self = this;
	var bounds = new google.maps.LatLngBounds();

	for(var i=0; i<self.markers.length; i++) {
		bounds.extend(self.markers[i].position);
	}

	this.map.fitBounds(bounds);
};

inz.apps.Tool.prototype.moveMap = function(latlng,offsetx,offsety) {
	if(!this.map) return;

	// zoom into a good level
	if(this.map.getZoom() < 4) {
		this.map.setZoom(5);
	}

	var point1 = this.map.getProjection().fromLatLngToPoint(
		(latlng instanceof google.maps.LatLng) ? latlng : this.map.getCenter()
	);

	var point2 = new google.maps.Point(
		((typeof(offsetx) == 'number' ? offsetx : 0) / Math.pow(2, this.map.getZoom())) || 0,
		((typeof(offsety) == 'number' ? offsety : 0) / Math.pow(2, this.map.getZoom())) || 0
	);

	this.map.setCenter(this.map.getProjection().fromPointToLatLng(new google.maps.Point(
		point1.x - point2.x,
		point1.y + point2.y
	)));
};

/**
 * Gets the map, cluster and marker options
 */
inz.apps.Tool.prototype.getMapOptions = function() {
	var options = {
		//center: new google.maps.LatLng(0,0),
		//zoom: 2,
		maxZoom: 20,
		minZoom: 2,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_BOTTOM
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		panControl: $(document).width() > 750 ? true : false,
		zoomControl: $(document).width() > 750 ? true : false,
		rotateControl: false,
		draggable: true,
		scrollwheel: false,
		streetViewControl: false,
		styles: [{
			featureType: 'poi',
			stylers: [{ visibility: 'off' }]
		}],
		clusterOptions: {
			maxZoom: 19,
			styles: [{
				url: IMAGES_LOCATION + 'map_cluster_sm.png',
				height: 44,
				width: 44,
				textColor: '#ffffff',
				textSize: 14
			},{
				url: IMAGES_LOCATION + 'map_cluster_md.png',
				height: 54,
				width: 54,
				textColor: '#ffffff',
				textSize: 14,
			},{
				url: IMAGES_LOCATION + 'map_cluster_lg.png',
				height: 64,
				width: 64,
				textColor: '#ffffff',
				textSize: 14,
			}]
		},
		markerIcons: {
			default: {
				// url: IMAGES_LOCATION + 'map_marker_sm.png',
				url: IMAGES_LOCATION + 'map_marker_sm.png',
				labelOrigin: new google.maps.Point(71,43),
			},
			selected: {
				url: IMAGES_LOCATION + 'map_selectedicon.svg',
				labelOrigin: new google.maps.Point(71,43),
			}
		}
	}

	// Older versions of IE cant use SVG's and newer versions of IE as well as safari dont like animated
	// SVG's inside the map canvas so use static/non-animated marker icons instead
	if($('.ie9, .ie10, .ie11, .safari').length > 0) {
		options.markerIcons.selected.url = IMAGES_LOCATION + 'map_selectedicon_static.png'
	}

	return options;
};

/**
 * Handle resizing of the map outer using debounce
 * Keeps the map aligned to the right edge of the browser on the larger breakppoints
 */
inz.apps.Tool.prototype.resizeMap = function() {
	var resize, self = this;
	$(window).on('resize', function(event) {
		resize = true;
	});

	// essentially a debounce method to avoid jank when resizing the window
	setInterval(function() {
		if (resize) {
			self.setMapWidth();
			setTimeout(function() {
				resize = false;
			}, 100);
		}
	}, 100);
};

/**
 * Set the width of the map.
 * Aligns the map to right edge of the browser
 */
inz.apps.Tool.prototype.setMapWidth = function() {

	// Dont change margins if the map is inside a dock
	if(this.mapOuter.closest('.dock_body').length) {
		return;
	}

	var parent = this.mapOuter.closest('.results'),
		mapGap;

	if(this.mapOuter.length && this.mapOuter.is(':visible')) {
		mapGap = -($(window).width() - (parent.position().left + parent.outerWidth()));
		this.mapOuter.css({'margin-right': mapGap});

		if(this.map) {
			google.maps.event.trigger(this.map,'resize')
		}
	}
};


/********************************************
 *
 * Police tool subclass
 *
 ********************************************/

inz.apps.PoliceCertsTool = function(scope) {
	inz.apps.Tool.call(this, scope);
	this.collection = [];
	this.resultsBlockSelector = '[data-tool-resultsblock-upper]';
	this.resultsTmpl = 'tmpl-policetool-results';
	this.primaryField = 'country';
}

inz.apps.PoliceCertsTool.prototype = Object.create(inz.apps.Tool.prototype);

/**
 * Dont need to do anything when PoliceCerts Tools are initialised
 * except set its result template
 */
inz.apps.PoliceCertsTool.prototype.onInit = function() {
	this.removeLoader();
	this.filterButtonHolder.hide();
}

/**
 * More specific form submission handling for PoliceCerts tools
 * Note the primaryField is defined as a data attribute on the tool markup
 */
inz.apps.PoliceCertsTool.prototype.attachEvents = function() {
	var self = this;

	if(this.formEl && this.primaryField) {

		var primaryField = this.formEl.find('select[name="' + this.primaryField + '"]');
		if(primaryField.length) {
			primaryField.on('change.policetool_primary', function(e) {
				self.handlePrimaryField(this)
			});
		}

		this.formEl.on('submit.tool_submit', function(e) {
			e.preventDefault();
			self.handleSubmit();
		});
	}
};

/**
 * Specific submit handler for PoliceCerts tools
 * Calls a search on the api
 */
inz.apps.PoliceCertsTool.prototype.handleSubmit = function() {

	var self = this,
		data = self.formFieldsEl.find(':input').serializeArray();

	var searchCallback = function(data) {
		self.initResults(data);
	}

	self.inztool.search(data, searchCallback);
};

/**
 * Handle a change in the primary field, for PoliceCert tools, this is 'country'
 * Note the primaryField is defined as a data attribute on the tool markup
 */
inz.apps.PoliceCertsTool.prototype.handlePrimaryField = function(select) {
	// remove any additional fields first
	this.formFieldsEl.find('[data-tool-additionalfield]').remove();

	var self = this,
		data = self.formFieldsEl.find(':input').serializeArray(),
		btn = self.formEl.find('[data-tool-filterbutton-holder]');

	// show 'view details' button when a selection is made,
	// or get the additional fields to display
	var searchCallback = function(data) {
		if(data.type == 'FIELDS') {
			btn.hide();
			self.updateForm(data); // update the form, with new fields,
		} else {
			btn.show();
		}
	}

	if($(select).val()) {
		self.inztool.search(data, searchCallback);
	} else {
		btn.hide();
	}
};

/**
 * PoliceCert form requires additional form field events bound each time it
 * is updated
 */
inz.apps.PoliceCertsTool.prototype.updateForm = function(data) {
	inz.apps.Tool.prototype.updateForm.apply(this, [data]);

	// bind Select Events
	this.bindFormEvents();
}

/**
 * Bind additional form field evetns after each update
 * Check that each field has a value and show/hide the filter button as required
 */
inz.apps.PoliceCertsTool.prototype.bindFormEvents = function(callback) {
	var self = this;

	this.formFieldsEl.find('select').off('change.additional_fields').on('change.additional_fields', function() {
		var show = true
		 fields = self.formEl.find('select');

		for(var i=0; i<fields.length; i++) {
			if($(fields[i]).val().length == 0) show = false;
		}

		if(show) {
			self.formEl.find('[data-tool-filterbutton-holder]').show();
		} else {
			self.formEl.find('[data-tool-filterbutton-holder]').hide();
		}
	});
};

/**
 * Always display results immediately
 */
inz.apps.PoliceCertsTool.prototype.prepResults = function() {

	this.holderEl.show();
};

/**
 * Instead of rendering results directly, add the result into the user's collection
 * which will also handle rendering of the result
 */
inz.apps.PoliceCertsTool.prototype.renderResults = function(callback) {
	this.hideError();
	this.addItem(this.results);
};

/**
 * Reset the form back to its original state
 */
inz.apps.PoliceCertsTool.prototype.resetForm = function() {
	this.formFieldsEl.find(':input').val('').trigger('change');
	this.formFieldsEl.find('[data-tool-additionalfield]').remove();
};

/**
 * Add item to the users collection of results
 * - Checks if the item already exists in the collection and re-renders it if it does
 * - Add the item to the collection if it doesnt exist.
 * - This also requires parsely validation destruction, it will be re-init'd on ajaxpages:contentloaded
 */
inz.apps.PoliceCertsTool.prototype.addItem = function(item) {
	var self = this,
		collectionPos = this.getItemPos(item),
		domPos = this.getItemDOMPos(item);

	// close all other items
	//this.resultsEl.find('.policecert_result .content_list_trigger.active').trigger('click');

	item.el = $(tmpl(this.resultsTmpl, item));

	if(collectionPos == -1) {
		this.collection.push(item);
	} else {
		this.collection[collectionPos] = item;
	}

	if(domPos == -1) {
		this.resultsEl.append(item.el);
	} else {
		var existing = this.resultsEl.find('#' + item.id);
		if(existing) {
			existing.slideUp(200, function() {
				existing.replaceWith(item.el);
			});
		}
	}

	// destroy parsley
	item.el.find('form').parsley('reset');

	// refresh the results area
	setTimeout(function() {
		item.el.slideDown();
		self.attachResultEvents(item);
		self.setUpResultForm(item);
		self.resetForm();

		// scroll to item just added, only on mobile
		if($('.response_base').length) {
			setTimeout(function() {
				$('html, body').animate({scrollTop: item.el.offset().top}, 100);
			}, 300);
		}

		$(document).trigger('ajaxpages:contentloaded', {target: item.el});
	}, 250);

	return item;
};

/**
 * store filter form values on construction and enable reseting to these values
 */
inz.apps.PoliceCertsTool.prototype.setUpResultForm = function(item) {
	var fields = item.el.find('form :input');

	for(var i=0; i<fields.length; i++) {
		$(fields[i]).data('ovalue', $(fields[i]).val());
	}

	item.el.find('form').on('cancelfilter', function(e) {
		for(var i=0; i<fields.length; i++) {
			if($(fields[i]).data('ovalue').length) {
				$(fields[i]).val($(fields[i]).data('ovalue'));
				$(fields[i]).trigger('change');
			}
		}
	});
};

/**
 * Attach specifc events to the result item
 */
inz.apps.PoliceCertsTool.prototype.attachResultEvents = function(item) {
	var self = this;
	item.el.find('.policecert_action__remove').on('click', function() {
		self.removeItem(item)
	});

	// change filters handler
	item.el.find('form').first().on('submit.policecert_submitform', function(e) {
		var data = $(this).find(':input').serializeArray();

		var callback = function(data) {
			self.addItem(data);
		}

		self.inztool.search(data, callback);
		return false;
	});

	// cancel change filters handler
	item.el.find('[data-policetoolresult-cancelfilter]').on('click.policecert_cancelfilter', function(e) {
		e.preventDefault();
		$(this).parents('form').trigger('cancelfilter');
	});
};

/**
 * Handle removing of the item from the users collection
 */
inz.apps.PoliceCertsTool.prototype.removeItem = function(item) {

	// remove from DOM
	if(item.el) {
		item.el.slideUp(200, function() {
			item.el.remove();
		});
	}

	// remove from collection
	this.collection = this.collection.filter(function(obj) {
		return obj.id !== item.id;
	});
};

/**
 * Fetch a specific item from the user's collection given the object to fetch
 */
inz.apps.PoliceCertsTool.prototype.getItem = function(item) {
	return this.collection.filter(function(obj) {
		return obj.id === item.id;
	});
	return null;
};

/**
 * Fetch a specific item's position in the user's collection given the object to find
 */
inz.apps.PoliceCertsTool.prototype.getItemPos = function(item) {
	var index =  this.collection.map(function(obj) {
		return obj.id;
	}).indexOf(item.id);
	return index;
};

/**
 * Fetch a specific item's position in the DOM given the object to find
 */
inz.apps.PoliceCertsTool.prototype.getItemDOMPos = function(item) {
	var index = this.resultsEl.find('#' + item.id).index();
	return index;
};


/********************************************
 *
 * Office and fees tool subclass
 *
 ********************************************/

inz.apps.OfficeFeesTool = function(scope) {
	inz.apps.Tool.call(this, scope);
	this.resultsTmpl = 'tmpl-offtool-results';
	this.resultsBlockSelector = '[data-tool-resultsblock-lower]';
	this.primaryField = 'visaOrScheme';
};

inz.apps.OfficeFeesTool.prototype = Object.create(inz.apps.Tool.prototype);

/**
 * on init, trigger a change on the primary field
 */
inz.apps.OfficeFeesTool.prototype.onInit = function() {
	// remove unwanted elements
	this.loader.hide();
	this.resultsTitle.remove();
	var btn = this.formEl.find('[data-tool-filterbutton-holder]');
	btn.hide();

	var primaryField = this.formEl.find(':input[name="' + this.primaryField + '"]');
	if(primaryField.length) {
		primaryField.trigger('change.officetool_primary');
	} else {
		this.formEl.trigger('submit.tool_submit');
	}

};

/**
 * More specific form submission handling for police tools
 */
inz.apps.OfficeFeesTool.prototype.attachEvents = function() {
	var self = this;

	if(this.formEl && this.primaryField) {

		var primaryField = this.formEl.find(':input[name="' + this.primaryField + '"]');
		if(primaryField.length) {
			primaryField.on('change.officetool_primary', function(e) {
				self.handlePrimaryField(this)
			});
		}

		this.formEl.on('submit.tool_submit', function(e) {
			e.preventDefault();
			self.handleSubmit();
		});
	}
};

/**
 * Handle a change in the primary field, for Office & Fees tools, this is 'visaOrScheme'
 * Note the primaryField is defined as a data attribute on the tool markup
 */
inz.apps.OfficeFeesTool.prototype.handlePrimaryField = function(select) {

	// remove any additional fields first
	this.formFieldsEl.find('[data-tool-additionalfield]').remove();

	var self = this,
		data = self.formFieldsEl.find(':input').serializeArray(),
		btn = self.formEl.find('[data-tool-filterbutton-holder]');

	// show 'view details' button when a selection is made,
	// or get the additional fields to display
	var searchCallback = function(data) {

		switch(data.type) {
			case 'FIELDS':
				self.clearResults();
				btn.hide();
				self.updateForm(data);
				break;
			case 'VALIDATION FAIL':
				self.clearResults();
				self.errorEl.html(tmpl('tmpl-toolsvalidationfail', data));
				self.showError();
				btn.hide();
				break;
			case 'ERROR':
				self.clearResults();
				self.results.bannertype = 'alert';
				self.errorEl.html(tmpl('tmpl-toolserror', data));
				self.showError();
				break;
			default:
				btn.show();
				break;
		}
	}

	// perform the search if the select has a value
	if($(select).val()) {
		self.inztool.search(data, searchCallback);
	} else {
		btn.hide();
	}
};

/**
 * Update the form and bind additional events
 */
inz.apps.OfficeFeesTool.prototype.updateForm = function(data) {
	inz.apps.Tool.prototype.updateForm.apply(this, [data]);
	// bind Select Events
	this.bindFormEvents();
};

/**
 * Trigger a search any time an additional field is changed
 * This will unfortunately trigger an unessesary search when the last field is changed.
 */
inz.apps.OfficeFeesTool.prototype.bindFormEvents = function(callback) {
	var self = this;

	this.formFieldsEl.find(':input').off('change.additional_fields').on('change.additional_fields', function() {

		var fieldSet = $(this).parents('.additional_field_set').first();

		if(fieldSet.length) {
			var fields = fieldSet.find(':input');
		} else {
			return;
		}

		var load = true,
			btn = self.formEl.find('[data-tool-filterbutton-holder]');

		//  Office and fees tools can fail validation if the form is udp[ated
		//  without all the required fields.
		var searchCallback = function(data) {
			self.hideLoader();

			switch(data.type) {
				case 'FIELDS':
					self.clearResults();
					btn.hide();
					self.updateForm(data);
					break;
				case 'VALIDATION FAIL':
					self.clearResults();
					self.errorEl.html(tmpl('tmpl-toolsvalidationfail', data));
					self.showError();
					btn.hide();
					break;
				case 'ERROR':
					self.clearResults();
					self.results.bannertype = 'alert';
					self.errorEl.html(tmpl('tmpl-toolserror', data));
					self.showError();
					break;
				default:
					btn.show();
					break;
			}
		}

		for(var i=0; i<fields.length; i++) {

			if($(fields[i]).val().length == 0) {
				load = false;
			}
		}

		if(load) {
			// remvoe all next fields sets and clear results
			fieldSet.nextAll('.additional_field_set').remove();

			self.clearResults();

			var data = self.formFieldsEl.find(':input').serializeArray();
			self.showLoader();
			self.inztool.search(data, searchCallback);
		} else {
			self.hideLoader();
		}

	});
};

/**
 * Prep office and fees tool results
 */
inz.apps.OfficeFeesTool.prototype.prepResults = function(callback) {
	var amount;

	// map each item's details so we can reference them easily in the js template
	// used to render markup id's for toggle switches
	if(this.results && this.results.stages) {
		for(var i=0; i<this.results.stages.length; i++) {

			this.results.stages[i].receivingCentreDetailsMapped = null;

			if(this.results.stages[i].receivingCentreDetails && this.results.stages[i].receivingCentreDetails.length > 0) {
				this.results.stages[i].receivingCentreDetailsMapped = [];

				for(var j=0; j<this.results.stages[i].receivingCentreDetails.length; j++) {
					this.results.stages[i].receivingCentreDetailsMapped[this.results.stages[i].receivingCentreDetails[j].type] = this.results.stages[i].receivingCentreDetails[j];
				}
			}

			// check each immigration cost item for multiple currencies and
			// determine if we need a currency switcher for the immigrationCosts section
			if(this.results.stages[i].immigrationCosts && this.results.stages[i].immigrationCosts.length > 1) {
				for(var j=0; j<this.results.stages[i].immigrationCosts.length; j++) {
					this.results.stages[i].immigrationCosts.hasCurrencyConversion = false;
					for(var k=0; k<this.results.stages[i].immigrationCosts[j].items.length; k++) {

						// amountFrom may have commas, so strip them out
						amount = this.results.stages[i].immigrationCosts[j].items[k].amountFrom;
						if(amount && amount != 0) {
							this.results.stages[i].immigrationCosts.hasCurrencyConversion = true;
						}
					}
				}
			}

			// check each receiving centre fees item for multiple currencies and
			// determine if we need a currency switcher for the receivingCentreFees section
			if(this.results.stages[i].receivingCentreFees && this.results.stages[i].receivingCentreFees.length > 1) {
				for(var j=0; j<this.results.stages[i].receivingCentreFees.length; j++) {
					this.results.stages[i].receivingCentreFees.hasCurrencyConversion = false;

					for(var k=0; k<this.results.stages[i].receivingCentreFees[j].items.length; k++) {

						// amountFrom may have commas, so strip them out
						amount = this.results.stages[i].receivingCentreFees[j].items[k].amountFrom.toString();
						if(amount && amount != 0) {
							this.results.stages[i].receivingCentreFees.hasCurrencyConversion = true;
						}
					}
				}
			}
		}
	}
};

/**
 * Render the results
 */
inz.apps.OfficeFeesTool.prototype.renderResults = function(callback) {
	var self = this;
	this.hideError();
	this.resultsEl.append(tmpl(this.resultsTmpl, this.results));

	setTimeout(function() {
		$(document).trigger('ajaxpages:contentloaded', {target: self.resultsEl});

		self.attachResultEvents();

		// callback for when results are rendered
		if(typeof callback === "function") {
			callback.call();
		}

		self.showList();
	}, 250);
};

/**
 * control which currencies are displayed in the results
 * and allow switching between
 */
inz.apps.OfficeFeesTool.prototype.attachResultEvents = function() {
	this.resultsEl.find('.currencyconverter select').off('change.currency').on('change.currency', function() {
		var curr = $(this).val(),
			holder = $(this).parents('[data-tool-currency-section]');
		holder.find('[data-tool-currency]').hide();
		holder.find('[data-tool-currency="' + curr + '"]').show();
	});
};

/**
 * initialise any tools
 */
DO.Subscribe(['app:ready'], function(e, $) {

	function init() {
		// setup the tools in a given scope
		$(document).on('tools:init ajaxpages:contentloaded', function(e, data) {
			var scope = data.target;

			// init std tool
			var tools = $(scope).find('[data-tool-var]');

			if(tools.length) {
				for(var i=0; i<tools.length; i++) {
					if(!$(tools[i]).data('tool')) {
						var toolVar = $(tools[i]).attr('data-tool-var'),
							toolInst = window[toolVar],
							tool;

						if(typeof inz.tools.PoliceCertsTool !== "undefined" && toolInst instanceof inz.tools.PoliceCertsTool) {
							tool = new inz.apps.PoliceCertsTool($(tools[i]));

						} else if(typeof inz.tools.OFFTool !== "undefined" && toolInst instanceof inz.tools.OFFTool) {
							tool = new inz.apps.OfficeFeesTool($(tools[i]));

						} else if(typeof inz.tools.Tool !== "undefined") {
							tool = new inz.apps.Tool($(tools[i]));
						}

						if(tool) {
							tool.init();
							$(tools[i]).data('tool', tool);
						}
					}
				}
			}
		});
	}

	init();

	$(document).trigger('tools:init', {target: $(document)});

});

DO.Subscribe(['app:ready','app:breakpointchange'], function(e, $) {
	if ($('.motivegrid').length) {
		// Sets a tabindex for each of the grid items based on their cordinates if a tablet or desktop size
		// Using a positive tabindex is necessary to correct for absolute positioning and is preferred to reodering the DOM
		if (!DO.CurrentBreakpoint().match(/^(base|small)$/)) {
			$('.motivegrid').tabIndex = -1;
			$('.motivegrid_item').each( function( i, e ){
			var posv = parseInt(e.getAttribute('data-posv')),
				posh = parseInt(e.getAttribute('data-posh'));

			e.tabIndex = ((posv - 1) * 3) + posh;
			});
		} else { // Sets each item to a default tabindex as the DOM order matches visual order at mobile size
			$('.motivegrid_item').each( function( i, e ){
				e.tabIndex = 0;
			});
		}
	}
});

/**
* Natural langauge specific methods
*/
DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	var form = $('form[data-natlang]'),
		statements = false,
		hasResult = false;

	function init() {
		if(typeof statementSrc === "undefined") {
			return;
		}

		statements = statementSrc;
		if(form.length > 0 && statements) {
			renderStatements();
			setTimeout(function(){
				attachEvents();
			}, 100);
		}
	}

	/**
	 * Render our natural language questions and any associated alternatue pathways
	 *
	 * Note: Alternative pathways in the natural language component are populated
	 * via our natural lanaguage fields JSON object. When the motivation/pathway
	 * is dynamic, the pathway options (work, study, etc) should each include a
	 * "showaltpathway" field that points to the generated id of the alternative pathway
	 * eg: "showaltpathway":"#work_altpathway" (see dataset.natlang.json)
	 *
	 * In the case where the motivation for the page is preset,  "altPathway": <HTML>
	 * should be set on the initial question.
	 */
	function renderStatements() {
		$('[data-natlang-questions]').html(tmpl("tmpl-natlang-questions", statements));

		// Only add alt pathways dynamically when we need to
		if($('[data-natlang-altpathway]').length > 0) {
			$('[data-natlang-altpathway]').html(tmpl("tmpl-natlang-altpathway", statements));
		}

		$(document).trigger('aftertemplates');
		$(document).trigger('afterfilters');
	}

	function attachEvents() {
		form.on('submit', function(e) {
			e.preventDefault();

			handleSubmit($(this));
			hasResult = true;
		});


		form.find(':input').on('input change', function(e) {

			// Make sure results are cleared if the natural language form is changing
			if(hasResult) {
				clearAllResults();
				hasResult = false;
			}

			// handle ellipsis|comma switch
			if($(this).val() !== "" && $(this).val()[$(this).val().length -1] !== "") {
				$(this).closest('p').addClass('hasvalue');
			} else {
				$(this).closest('p').removeClass('hasvalue');
			}

			if(!$(this).attr('data-btntoggle-disable')) {
				$('[data-btntoggle-disable]').trigger('change');
			}

		});

		form.find('select').on('change', function() {
			// inline search selects are actually multiselects, so we need to
			// cater to the second item in an array

			if($.isArray($(this).val()) ){
				selectAutoWidth($(this));
			}

			if($(this).data('children-ifnew')) {
				handleChildrenIfNew($(this));
			}
		});

	}
	/**
	 * In some cases we want to continue on only if a new option has been created by the user
	 * Because we don't have accdess the the underlying options retrived via ajax, we instead
	 * tie the seperate pathways to two hidden fields: childTrigger and buttonTrigger
	 *
	 * @param self | DOMObject
	 */
	function handleChildrenIfNew(self) {
		var value = $.isArray(self.val()) ? self.val()[self.val().length - 1]: self.val(), //false multi selection sometimes has an empty first record
			selected = self.find('option[value="' + value + '"]'),
			parent = self.closest('.query'),
			childTrigger = parent.find('[data-showpoints]'),
			buttonTrigger = parent.find('[data-btntoggle-disable]');


		if (selected.data('select2-tag') === undefined) {
			// show button, hide children
			childTrigger.val('').trigger('change');
			buttonTrigger.val(value).trigger('change');
			parent.addClass('last');

		} else {
			// show child, hide button
			childTrigger.val(value).trigger('change');
			buttonTrigger.val('').trigger('change');

			if(value) {
				parent.addClass('hasvalue').removeClass('last');
			}
		}
	}

	function selectAutoWidth(self) {
		var last = self.val().length - 1,
			empty = self.val().length < 1 || self.val()[last] === "" || self.val()[last].length < 1,
			text = !empty ? $($("option:selected", self)[last]).text() : self.attr('data-placeholder'),
			width = 10,
			el,
			data;

		if(text === 'undefined') { //is a string that says undefined in ie11
			text = $($("option:selected", self)[last]).val() + ' MM'; //add a couple more characters
		}

		form.append('<span class="textmeasure hide-animate" aria-hidden="true"></span>');
		el = form.find('.textmeasure').first();

		if(!text && !empty){
			data = self.select2('data');
			text = data[data.length - 1].name;
		}

		el.text(text);
		width = el.outerWidth() + 50; //room for magnifying glass
		self.siblings('.select2').width(width);

		if(empty) {
			self.siblings('.select2').addClass('setwidth').removeClass('setwidth-value');
		} else {
			self.siblings('.select2').addClass('setwidth setwidth-value');
		}

		$('.textmeasure').remove();
	}

	function handleSubmit(self) {
		$.ajax({
			data: self.serialize(),
			type: self.attr('method'),
			url: self.attr('action'),
			cache: true,
			success: function(data,status) {
				//handle success
				handleSuccess(data, status);
			},
			error: function (xhr, desc, err) {
				handleFailure(xhr, desc, err);
			}
		});
	}

	/*
	* We are going to need to
	* 1. Clear any existing data in (& events attached to) the selectgrid and table
	* 2. Generate/fill the select grid boxes and the table
	* 3. Attach events to these objects
	* 4. Remove the inactive class from selectgrid
	*/
	function handleSuccess(data, status) {
		if(data.result === 'SUCCESS' ) {

			$('[data-natlang-error]').html('');

			$('[data-natlang-selectgridmessage]').html(tmpl("tmpl-selectgridmessage"));
			$('[data-natlang-selectgridactions]').html(tmpl("tmpl-selectgridactions"));
			$('[data-natlang-selectgrid]').html(tmpl("tmpl-selectgrid", data));
			$('[data-natlang-table] thead tr').html(tmpl("tmpl-table-header", data));
			$('[data-natlang-table] tbody').html(tmpl("tmpl-table-row", data));
			$('[data-natlang-table] tfoot tr').html(tmpl("tmpl-table-footer", data));
			$('[data-natlang-accordion]').html(tmpl("tmpl-accordion", data));

			// Hide form action, generate a new button that only shows on mobile
			$('[data-natlang-comparemobile]').html(tmpl("tmpl-comparemobile"));
			form.find('.btn_hidedisabled').prop('disabled', 'disabled');


			$(document).trigger('natlang:loaded');
			$('.selectgrid input').trigger('change');

		} else {
			clearSuccessTemplates();

			if(data.result === "MESSAGE") {
				data.bannertype = "message";
			} else {
				data.bannertype = "alert";
			}
			form.find('.btn_hidedisabled').prop('disabled', 'disabled');
			$('[data-natlang-error]').html(tmpl("tmpl-natlangerror", data));
		}

		$('.alternatepathway__wrapper').removeClass('inactive');
	}

	function clearAllResults() {
		$('[data-natlang-error]').html('');
		clearSuccessTemplates();
		$('.alternatepathway__wrapper').addClass('inactive');
	}

	function clearSuccessTemplates() {
		$('.selectgrid').attr('style', '');
		$('[data-natlang-selectgridmessage]').html('');
		$('[data-natlang-selectgridactions]').html('');
		$('[data-natlang-selectgrid]').html('');
		$('[data-natlang-table] thead tr').html('');
		$('[data-natlang-table] tbody').html('');
		$('[data-natlang-table] tfoot tr').html('');
		$('[data-natlang-accordion]').html('');
		$('[data-natlang-comparemobile]').html('');
	}


	/**
	 * Called when the server returns something not interpreted as a success.
	 * Renders an error message for the user.
	 */
	function handleFailure(xhr, desc, err) {
		clearSuccessTemplates();

		var data = {"title": "Sorry", "message" : xhr.statusText, "bannertype" : 'alert'};
		$('[data-natlang-error]').html(tmpl("tmpl-natlangerror", data));
		$('.alternatepathway__wrapper').removeClass('inactive');
	}

	init();
});

// Template functions must be in the global scope.


function tplNatLangShowPoints(children, action) {
	var i
		result = {};

	for (i = 0; i < children.length; i = i + 1) {
		result['#' + children[i].pathway +'_Q'+ children[i].order] = "1";
	}

	return JSON.stringify(result);
}

function tplNatLangPathwayChild(children, value, altpathway) {
	var i
		result = {};


	for (i = 0; i < children.length; i = i + 1) {
		if(children[i].pathway  === value) {
			result['#' + children[i].pathway +'_Q'+ children[i].order] = "1";
		}
	}

	// when pathways are dynamic, we will have multiple alternative pathways
	// which need to be toggled based on ouer pathway
	if(altpathway !== undefined) {
		result[altpathway] = "1";
	}

	return JSON.stringify(result);
}

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	function triggerCloseNav() {
		var loginTrigger = $('.nav_mobile_trigger__login'),
			search = $('.header_search__mobile'),
			searchTrigger = $('.nav_mobile_trigger__search'),
			navTrigger  = $('.nav_mobile_trigger__nav'),
			navMobile = $('.nav_mobile');

		loginTrigger.removeClass('open');
		searchTrigger.removeClass('open');
		navTrigger.removeClass('open');
		navMobile.removeClass('open');
		search.removeClass('open');

		// is fixed on small, not base
		if (navMobile.css('position') != 'fixed') {
			// we're on base
			if (navMobile.is(':visible')) {
				navMobile.slideUp(function() {
					$(this).removeAttr('style');
				});
			}
		}

		$('.header_login_holder').slideUp();
		$('.container').removeClass('container__restrict').removeClass('container__restrictcontent');
	}

	function showLoginInit(newNav) {
		newNav.children('.header_login:visible').slideUp();
		newNav.children('.header_login__init').slideDown();
		// fake focus by opening and closing
		select2Focus(newNav.children('.header_login__init').find('.select2'));
	}

	function removeTertiaryActive(newNav, self) {

		var activeLink = self.closest('.nav_list').find('.active_link'),
			activeTarget,
			header = $('.header'),
			hasHeaderLogin = newNav.children('.header_login').length > 0,
			hasLoginInit = newNav.children('.header_login__init:visible').length > 0;

		if (hasHeaderLogin && !hasLoginInit) {
			showLoginInit(newNav);
			return;
		}

		// close this & referenced nav
		self.removeClass('current');
		newNav.removeClass('current');

		if(activeLink.length > 0 ) {
			activeTarget = $('#nav__about');
			$(activeTarget).addClass('current');
			activeLink.removeClass('active_link');
		} else {
			header.removeClass('header_grey_bg');
			// restore nav from primary
			$('#nav__primary_links').addClass('current');
		}

		return;
	}

	function handleTertiaryActive(self) {
		var newNav = $(self.attr('href')),
			select = newNav.find('select.js-select2'),
			target = $(self.attr('href')),
			nav_tertiary_triggers = $('.nav__tertiary .nav_trigger').not('.js-nav-false'),
			header = $('.header');

		// Clear the select value so we can use the dropdown menu again
		if (newNav.children('.header_login').length > 0) {
			if(select.val().length > 0) {
				select.val("").trigger('change');
			}
		}

		if (self.hasClass('current')) {
			removeTertiaryActive(newNav, self);
			return;
		}

		// close, or false close, current active
		self.closest('.nav_list').find('.nav_trigger.current.js-nav-false').addClass('active_link');
		nav_tertiary_triggers.removeClass('current');
		$('.nav__secondary .nav_links').removeClass('current');

		self.addClass('current');
		target.addClass('current');
		header.addClass('header_grey_bg');

		// focus input
		target.find('input').trigger('focus');

		if (newNav.find('.header_login').length > 0) {
			// fake focus by opening and closing select2
			select2Focus(newNav.find('select.js-select2'));
		}
	}

	function select2Focus(select) {
		if(select.data('select2')) {
			select.select2("open");
			select.select2("close");
		}
	}

	function attachEvents() {
		$('.nav__tertiary .nav_trigger').not('.js-nav-false').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			handleTertiaryActive($(this));
		});


		$('.container_shader, .container_content, .nav_overlay').on('click', function() {
			triggerCloseNav();
		});
	}

	function init() {
		attachEvents();
	}

	init();
});

DO.Subscribe('app:breakpointchange', function(e, $) {
	$('.container_shader').trigger('click');
});

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var	navOverlay = $('.nav_overlay');

	function init() {
		attachEvents();
	}

	function attachEvents() {

		$('.nav_mobile_trigger__login').on('click', function(e) {
			e.preventDefault();
			triggerLogin(this);
		});

		$('.nav_mobile_trigger__search').on('click', function(e) {
			e.preventDefault();
			triggerSearch();
		});

		$('.nav_mobile_trigger__nav').on('click', function(e) {
			e.preventDefault();
			triggerNav(this);
		});

		$('.nav_mobile_link__back').on('click', function(e) {
			e.preventDefault();
			triggerBack(this);
		});

		$('.nav_mobile_link__drop_trigger').on('click', function(e) {
			triggerExpand(this, e);
		});

		$('.nav_mobile_link__slide_trigger').on('click', function(e) {
			triggerSlide(this);
		});
	}

	function triggerCloseNav() {
		var loginTrigger = $('.nav_mobile_trigger__login'),
			search = $('.header_search__mobile'),
			searchTrigger = $('.nav_mobile_trigger__search'),
			navTrigger  = $('.nav_mobile_trigger__nav'),
			navMobile = $('.nav_mobile'),
			container = $('.container');

		loginTrigger.removeClass('open');
		searchTrigger.removeClass('open');
		navTrigger.removeClass('open');
		navMobile.removeClass('open');
		search.removeClass('open');

		// is fixed on small, not base
		if (navMobile.css('position') != 'fixed') {
			// we're on base
			if (navMobile.is(':visible')) {
				navMobile.slideUp(function() {
					$(this).removeAttr('style');
				});
			}
		}

		$('.header_login_holder').slideUp();
		container.removeClass('container__restrict').removeClass('container__restrictcontent');
	}

	function triggerSearch() {
		var searchTrigger = $('.nav_mobile_trigger__search'),
			search = $('.header_search__mobile');

		if (!searchTrigger.hasClass('open')) {
			triggerCloseNav();
		}

		searchTrigger.toggleClass('open');
		search.toggleClass('open');

		if (search.hasClass('open')) {
			search.find('.header_search_input').first().focus();
		} else {
			search.find('.header_search_input').first().blur();
		}
	}

	function triggerBack(self) {
		$(self).closest('.open').removeClass('open');

		if ($(self).closest('.open').children('.nav_mobile_list__slide').length > 0) {
			$('.nav_mobile_list__l1').css({
				height: $(self).closest('.open').children('.nav_mobile_list__slide').height()
			});
		} else {
			$('.nav_mobile_list__l1').css({
				height: 'auto'
			});
		}
	}

	function triggerNav(self) {
		var navMobile = $('.nav_mobile'),
			container = $('.container');

		if (!$(self).hasClass('open')) {
			triggerCloseNav();
		}

		$(self).toggleClass('open');
		navMobile.toggleClass('open');

		// is fixed on small, not base
		if (navMobile.css('position') != 'fixed') {
			// we're on base
			if (navMobile.hasClass('open')) {
				// is open
				navMobile.slideToggle(function() {
					container.addClass('container__restrictcontent');

					var open = navMobile.find('.open').last();
					// find already open nav and make sure height is updated
					if (open.children('.nav_mobile_wrapper').children('.nav_mobile_link__slide_trigger').length > 0) {
						$('.nav_mobile_list__l1').css({
							height: open.children('.nav_mobile_list').height()
						});
					}
				});
			} else {
				// no longer open
				container.removeClass('container__restrictcontent');
				navMobile.slideToggle(function() {
					$(this).removeAttr('style');
				});
			}
		}
		container.toggleClass('container__restrict');
	}

	function triggerLogin(self) {
		var el = $(self),
			loginHolder = $('.header_login_holder'),
			loginTrigger = $('.nav_mobile_trigger__login'),
			loginSelect = loginHolder.find('select.js-select2'),
			container = $('.container');

		if (!loginTrigger.hasClass('open')) {
			triggerCloseNav();
		}

		// Clear the select value so we can use the dropdown menu again
		if (loginSelect.val()){
			loginSelect.val("").trigger('change');
		}

		if (loginTrigger.hasClass('open')) {
			if (!loginHolder.find('.header_login__init').is(':visible')) {
				// go back to initial state
				loginHolder.find('.header_login:visible').slideUp();
				loginHolder.find('.header_login__init').slideDown();
			} else {
				// on initial, so now close
				loginTrigger.toggleClass('open');
				loginHolder.slideToggle();
				container.removeClass('container__restrict').removeClass('container__restrictcontent');
			}
		} else {
			// open
			loginTrigger.toggleClass('open');
			loginHolder.slideToggle(function() {
				$('.container').addClass('container__restrictcontent');
			});
			container.addClass('container__restrict');
		}
	}

	function triggerExpand(self, e) {
		var parent = $(self).parent(),
			list = $(self).siblings('ul').first();

		if (list.length > 0) {
			e.preventDefault();
			parent.siblings('.open').removeClass('open').children('ul').slideToggle();
			parent.toggleClass('open');
			list.slideToggle();
		}
	}

	function triggerSlide(self) {
		$(self).parent().parent().toggleClass('open');
		$('.nav_mobile_list__l1').css({
			height: $(self).parent().siblings('ul').height()
		});
	}

	init();
});

DO.Subscribe('app:ready', function(e, $) {
	"use strict";

	function init () {
		setup($(document));
	}

	function setup(scope) {
		attachEvents(scope);
	}

	function attachEvents(scope) {

		var tabs = scope.find('.news_tabs_list'),
			tab = tabs.find('li');

		tab.on('click', function(e) {
			e.preventDefault();

			var target = $(this).find('a').attr('href');

			// Toggle active class on tabs
			tab.removeClass('active');
			$(this).addClass('active');

			// Toggle results displayed
			$('.results__news.active').closest('.accordion_group').hide();
			$('.results__news.active').hide().removeClass('active');

			$(target).addClass('active').show();
			$(target).closest('.accordion_group').show();
		});

	}

	init();

});

/*
* Flexbox polyfil for IE9
* This is currently specific to the panels on the contact page
*/


DO.Subscribe('app:ready', function(e, $) {

	var s = document.body || document.documentElement, s = s.style;
	if( s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' ) return true;

	var $row = $('.row_equal__child_fill'),
		$panel = $('.panel_contact'),
		setHeights = function() {
			$panel.css('height', 'auto');

			var perRow = Math.floor($row.width() / $panel.width());

			for (var i = 0, j = $panel.length; i < j; i += perRow) {
				var maxHeight = 0,
					$rows = $panel.slice(i, i + perRow);

				$rows.each(function() {
					var itemHeight = parseInt($(this).outerHeight());
					if (itemHeight > maxHeight) maxHeight = itemHeight;
				});
				$rows.css('height', maxHeight);
			}
		};


	setHeights();
	$(window).on('resize', setHeights);
	$row.find('.js-select2').on('change', setHeights);

});

DO.Subscribe(['app:ready'], function(e, $) {

	function init (){
		// make sure we can tab to clickable elements
		$('.js-process.process__collapsible > div .js-trigger-collapse').attr('tabindex', 0);

		attachEvents();
	}

	function attachEvents() {
		$('.js-process .js-trigger-collapse').on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			toggleOpen(this);
		});

		// make sure clicking a link version of the process opens at mobile, rather than following the link
		$('.js-process > a').on('click', function(e) {

			var mobile = $('.response_small').length > 0 || $('.response_base').length > 0 || $('.response_medium').length > 0,
				open = $(this).find('.process_step.open').length > 0;

			if(mobile && !open) {
				e.stopPropagation();
				e.preventDefault();
				$(this).find('.js-trigger-collapse').trigger('click');
			}
		});
	}

	function toggleOpen(self) {
		var step = $(self).closest('.process_step'),
			process = $(self).closest('.js-process');


		// step is open by default at this media size
		if(step.find('.process_content').height() > 0 && !step.hasClass('open') && !process.hasClass('open')) {
			return;
		}

		// toggle class individually per step, for mobile interaction
		step.toggleClass('open');

		// toggle all
		if (process.hasClass('open')){
			process.removeClass('open');
		} else {
			process.addClass('open');
		}
	}

	init();
});

/**
 * Javascript for process nav
 */
DO.Subscribe('app:ready', function(e, $) {

	function init() {
		if ($('[data-processnav]').length > 0) {

			var mode = getResponsiveMode();
			sliderSetup(mode, false);
			setupAffix();
			attachEvents();
		}
	}

	function sliderSetup(mode, isResize) {
		$("[data-processnav-slider]").flexslider(getConfig(mode, isResize));

		if($('.processnav_direction-nav').length > 0) {
			$('.processnav_prev').attr('role', 'button').attr('aria-hidden', 'true');
			$('.processnav_next').attr('role', 'button').attr('aria-hidden', 'true');
		}
	}

	function getResponsiveMode() {
		if(DO.CurrentBreakpoint() === 'base' || DO.CurrentBreakpoint() === 'small'){
			return 'phone';
		}

		return 'desktop'
	}

	function setupAffix() {
		$('[data-processnav]').affix({
			offset: {
				top: function () {
					var top = (this.top = $('.header').outerHeight(true));
					return top;
				}
			}
		});
	}

	function attachEvents() {
		handleResize();

		DO.Subscribe(['app:breakpointchangetotablet'], function(e) {
			// make sure other things have rendered first
			setTimeout(function() {
				if($('[data-processnav-slider]').data('flexslider') !== undefined) {

					// destroy
					$('[data-processnav-slider]').data('flexslider').destroy();

					// re-init @ desktop
					sliderSetup('desktop', true);
				}
			});
		}, 500);

		DO.Subscribe(['app:breakpointchangetophone'], function(e) {
			// make sure other things have rendered first

			setTimeout(function() {
				if($('[data-processnav-slider]').data('flexslider') !== undefined) {

					// destroy
					$('[data-processnav-slider]').data('flexslider').destroy();

					// re-init @ mobile
					sliderSetup('phone', true);
				}
			}, 500);
		});

		// Prevent bug when the page is too short
		$('[data-processnav]').on('affix.bs.affix', function() {
			fixStickyGlitching($(this));
		});
	}

	function fixStickyGlitching(self) {
		var bodyHeight = $('body').outerHeight(true),
			windowHeight = $(window).height(),
			headerHeight = $('.header').outerHeight(true),
			height = self.outerHeight(true);

		if((bodyHeight - headerHeight - height) <= windowHeight) {
			self.addClass('no-affix');
		} else {
			self.removeClass('no-affix');
		}
	}

	function handleResize() {
		var run;

		$(window).on('resize', function(event) {
			run = true;

			setTimeout(function() {
				if (run) {
					$('[data-processnav]').data('bs.affix').options.offset = $('.header').outerHeight(true);


					//reset pointer to 0 when we don't need it - prevents slider alignment bug
					if(DO.CurrentBreakpoint() !== 'base' && DO.CurrentBreakpoint() !== 'small') {
						$('[data-processnav-slider]').flexslider(0);
						$('[data-processnav-slider]').flexslider(getTargetSlide());
					}

					run = false;
				}
			}, 500);
		});
	}

	/**
	 * Find the first slide we need to move into view in order to move our
	 * active item into view
	 */
	function getTargetSlide() {

		var self = $("[data-processnav]");
			width = self.find("li.processnav_item.active").outerWidth(),
			activeIndex = self.find("li.processnav_item").index(self.find("li.processnav_item.active")),
			index = activeIndex <= 0 ? 1 : activeIndex, // handle -1 case (where no element is active)
			sliderLeft = self.first().offset().left,
			slideRight = sliderLeft + (index * width),
			firstVisibleSlide = slideRight - $(window).width();


		// We don't need to adjust the view in this case
		if (slideRight < $(window).width()) {
			return 0;
		}

		return Math.floor(firstVisibleSlide / width) + 1; //minimum to get this slide into view
	}

	function getConfig(size, isResize) {
		var self = $("[data-processnav]");
			activeIndex = self.find("li.processnav_item").index(self.find("li.processnav_item.active")),
			width = size === 'phone' ? 0 : self.find("li.processnav_item.active").outerWidth(),
			target = size === 'phone' ? activeIndex : getTargetSlide(),
			hasNav = size === 'phone' ? false : true; //not onscreen controls for mobile

		target = target <= 0 ? 0 : target; // deal with negative case

		return {
			namespace: "processnav_",
			selector: ".processnav_items > li",

			animation: "slide",
			animationLoop: false,
			itemWidth: width,

			startAt: target,
			slideshow: false,
			animationSpeed: 300,

			// // Primary Controls
			controlNav: false,
			directionNav: hasNav,
			prevText: '<span class="sr-only">Show previous steps</span>',
			nextText: '<span class="sr-only">Show next steps</span>',
			start: function() {
				//prevents a bug where the slider is misaligned
				if (isResize) {
					$('[data-processnav-slider]').flexslider(0);
					$('[data-processnav-slider]').flexslider(target);
				}
			}
		};
	}

	init();

});

/**
 * Display logic for selects
 * This is used on the visa pathways page as well as the contact page filters
 *
 */
DO.Subscribe('app:ready', function(e, $) {

	function init() {
		var focusTarget = $('select[data-select-focus]').first();

		attachEvents();

		if(focusTarget.length > 0 ) {
			focusFirst(focusTarget);
		}
	}

	function attachEvents() {
		var select = $('[data-show-select]');

		select.on('change', function(e) {
			if ($(this).val() !== "") {
				// Find all following selects, and hide
				var allNext = $(this).nextAll().filter('select.js-select2');
				allNext.addClass('hidden').val("").trigger('change');
				$(allNext.filter('[data-message]').attr('data-message')).find('.select2_message').addClass('hidden');
				show($(this));

				//Add currency symbol to value for currency select menus
				if($(this).closest('.currencyconverter_select').length > 0){
					var currencySymbol = '$';
					switch($(this).val()){
						case 'EUR': currencySymbol = '&euro;'; break;
						case 'GBP': currencySymbol = '&pound;'; break;
						case 'JPY': case 'CNY': currencySymbol = '&yen;'; break;
						case 'KRW': currencySymbol = '&#8361;'; break;
						default: currencySymbol = '$';
					}
					var currValEl = $(this).closest('.currencyconverter_select').siblings('.currencyconverter_value');
					currValEl.find('.currency-symbol').remove();
					currValEl.prepend('<span class="currency-symbol">'+currencySymbol+'</span>');

					//Add currency symbol to any other values in fees panels
					var feesPanel = $(this).closest('.fees_body');
					feesPanel.find('.currency-symbol').html(currencySymbol);
				}
			}
		});
	}


	/**
	 * Uses the show-target property to find the target.
	 * Target may be an id a class, or any other valid selector.
	 *
	 * @param self | DOMObject
	 */
	function show(self) {
		// first look at me, then my children
		var showTarget = self.data('show-target') !== undefined  ? self.data('show-target') : self.find(':selected').data('show-target'),
			focusTarget = $(showTarget).first(),
			val = self.find(':selected').val();

		DO.Fire('app:dl_beforeShow', [{'item' : $(showTarget)}]);

		// add query data to object
		if($(showTarget).data('ajax-url')) {
			$(showTarget).attr('data-query', val);
		}

		// Conditionally check to make sure our target doesn't need to
		// hide any other fields
		if($(showTarget).data('hide-sibling')){
			var hideTarget = $(showTarget).data('hide-sibling');
			$(hideTarget).addClass('hidden');
		}

		$(showTarget).removeClass('hidden');

		focusFirst(focusTarget);

		DO.Fire('app:dl_afterShow', [{'item' : $(showTarget)}]);
	}

	/**
	 * Focus to first shown field. Delayed to let select2 setup
	 * @param target | Select DOMObject
	 */
	function focusFirst(target) {

		setTimeout(function(){
			if(target.width() > 1) {
				target.focus();
			} else {

				$('.select2-container--focus').removeClass('select2-container--focus');
				$(':focus').blur();

				// fake focus by opening and closing
				target.select2("open");
				target.select2("close");

			}
		}, 500);
	}

	init();


});

/**
 * Integration for select2
 *
 * Note: to replicate inline search with select2, we are using the multiple
 * select feature of slect2 combined with some custom js to limit the select to 1.
 *
 * To limit to a single selection with a search field, apply data-maxSelection="1" to your select2 element
 * eg:
 * 	<select class="js-select2 js-select2-theme_transparent"
 *		data-ajax-url="../../demo_docs/dataset.json"
 *		data-maxSelection="1"
 *		data-placeholder="enter a visa name..."
 *	></select>
 */

DO.Subscribe(['app:ready', 'ajax:success'], function(e, $) {

	"use strict";

	var cachequery = {},
		cacheresults = {};

	/**
	 * Initialize select2 and attach all events
	 */
	function init() {
		setup($(document));
		$(document).trigger('afterselect2init');
	}

	function setup(scope) {
		var selects = scope.find(".js-select2").not('.select2-hidden-accessible'),
			i;

		clearSelect(selects);

		for(i =0; i < selects.length; i = i + 1) {
			setupSelect($(selects[i]));
		}

		attachEvents(scope);
	}

	function setupSelect(select) {
		var config = getConfig(select);

		select.select2(config).attr('style','display:block; position:absolute; bottom: 0; left: 0; clip:rect(0,0,0,0);'); // make html validation work
		attachSelectEvents(select);


		if(config.minimumResultsForSearch == "Infinity" && config.ajax !== undefined) {
			setBrokenPlaceholder(select, config);
			// make sure this also happens on displaylogicshow
			displayLogicBeforeShow();
		}

		setSearchPlaceholder(select);

		updateLabels(select);

		// make sure selects still get placeholder in list if values set at pageload
		select.trigger('change');
	}

	/**
	 * In some situations we need to clear the value of a select so a linked
	 * select doesn't appear broken on page refresh
	 */
	function clearSelect() {
		var selects = $('[data-show-select]'),
			i;

		for(i = 0; i < selects.length; i = i + 1) {
			$(selects[i]).val($(selects[i]).find('option[selected]').val());
		}
	}

	/**
	 * Update DOM labels for screen readers
	 * @param Object Select
	 */
	function updateLabels(select) {
		var id = select.attr('id'),
			label = $('label[for="' + id + '"]'),
			labeledBy;

		if(label === undefined) {
			return false;
		}

		label.attr('id', 'label_' + id);
		labeledBy = select.siblings('.select2').find('[aria-labelledby]');

		if(labeledBy.length > 0) {
			labeledBy.attr('aria-labelledby', 'label_' + id);
		} else {
			labeledBy = select.siblings('.select2').find('input');

			if(labeledBy) {
				labeledBy.attr('aria-labelledby', 'label_' + id);
			}
		}

	}

	/**
	 * Patch for edge case: when we use ajax loading with no search option (i.e not multiple)
	 * we don't get a placeholder set properly
	 *
	 * @param select | Select2 instance/Select field, config | JSON Object
	 */
	function setBrokenPlaceholder(self, config) {

		var select2 = $(self).next('.select2'),
			placeholderEl = select2.find('.select2-selection__placeholder');

		if(placeholderEl.length < 1) {
			return;
		}

		placeholderEl.text(config.placeholder);
	}

	/**
	 * Set a placeholder on the search field if present in dropdown
	 *
	 * @param select | Select2 instance/Select field
	 */
	function setSearchPlaceholder(self) {

		var search = $(self).data('select2').$dropdown.find('input');

		if(search.length < 1) {
			return;
		}

		if($('.ie11').length < 1 ) {
			search.attr('placeholder', 'Search');
		}
	}

	/**
	 * Attach listener to displaylogic to reset val and broken placeholder
	 */
	function displayLogicBeforeShow() {
		DO.Subscribe(['app:dl_beforeShow'], function(e, $, element) {
			var item = element.item;

			if($(item).val('') !== '') {
				$(item).val('').trigger('change');
				setBrokenPlaceholder(item, {placeholder : item.attr('data-placeholder')});
			}
		});
	}

	/**
	 * Attach all events to specific select2 instances
	 *
	 * @param select | Select2 instance/Select field
	 */
	function attachSelectEvents(select) {
		select.on("change", function(e) {

			// add a class to container if has value
			//Note: this is a hack, but this version of select2 doesn't seem to have a better way
			if($(this).val()) {
				$(this).data('select2').$dropdown.addClass("has_value");
			} else {
				$(this).data('select2').$dropdown.removeClass("has_value");
			}
		});

		select.on("select2:selecting", function(e) {
			onSelect2Selecting(this);
		});

		select.on("select2:select", function(e) {
			if($(this).attr('data-message')) {
				handleOptionMessages($(this), e.params.data);
			}
		});

		select.on("select2:open", function(e) {
			// handle clearing bug on multiselects by re-filling in value
			if($(this).attr('multiple') && $(this).attr('data-ajax-url') === undefined) {

				var self = $(this),
					searchField = self.data('select2').selection.$search[0];

				if(searchField !== undefined) {
					$(searchField).val('');
				}
			}

			adjustDropdownPosition(this);
		});

		select.on("select2:close", function(e) {

			var self = $(this);

			// handle clearing bug on multiselects by re-filling in value
			if($(this).attr('multiple')) {
				inlineSearchOnClose(self);
			}
		});
	}

	/**
	 * Attach event handlers to sleect related components
	 * @param Object Select
	 */
	function attachEvents(scope) {
		attachFollowLink(scope);


		// for selects that use ajax and have a minimumInputLength of 0, we need
		// to trigger the ajax query on focus
		scope.find('[data-ajax-url][data-minimumInputLength="0"]').on("focus", function () {
			select2Focus($(this).parent().parent().prev());
		});

		// Damn you IE -> how dumb is this?
		scope.find('.select2-selection').on("click", function() {
			// if there is a search field, focus works fine as is.
			if($(this).closest('.select2').siblings('.js-select2-nosearch') > 0) {
				$(this).focus();
			}
		});

		// Disable removing on multiple selects that are actually single selects
		scope.find('.js-select2[data-maxselection="1"]').on("select2:unselecting", function (e) {
			e.preventDefault();
			e.stopPropagation();
			$(this).select2("close");
		});

		// do once
		if(scope.is(document)) {
			attachHeaderSlide();

			window.Parsley.on('field:error', function() {
				// This global callback will be called for any field that fails validation.
				if($(this.$element).hasClass('js-select2') && $(this.$element).hasClass('first')) {
					select2Focus($(this.$element));
				};
			});
			$(document).on('newselectadded', 'select', function() {
				// note - this version ignores attached events
				setupSelect($(this));
			});
			$(document).on('ajaxpages:contentloaded', function(e, data) {
				var selects = data.target.find('select');
				if(selects.length > 0) {
					setup(data.target);
				}
			});
		}
	}

	/**
	 * Make sure droddown is never outside the page
	 *
	 * @param self | Select2 object
	 */
	function adjustDropdownPosition(self) {

		//reset for calculation
		$($(self).data('select2').$dropdown[0]).css('margin-left', '');

		var dropdown = $(self).data('select2').$dropdown[0],
			select = $(self).data('select2').$container[0],
			offset = dropdown.scrollWidth + dropdown.offsetLeft + 20, // extra 20 for space at side
			docWidth = $(document).width();

		if(offset > docWidth) {
			$(dropdown).css('margin-left', - (dropdown.scrollWidth - select.scrollWidth));
		}
	}

	function inlineSearchOnClose(self) {
		var searchField = self.data('select2').selection.$search[0];

		if(searchField === undefined || self.val() === null) {
			return;
		}

		// we have two use cases: prerenders and ajax. The values are stored differently, so we need to access them seperately
		var last = self.val().length - 1,
			text = $($("option:selected", self)[last]).text(),
			name = self.select2('data')[last].name !== undefined ? self.select2('data')[last].name : false,
			value = name ? name : text;

		$(searchField).val(value);

		if($('.webkit').length < 1) {
			searchField.setSelectionRange(0,0); // Set the cursor back to the start of the selection on select (needed for FF and IE)
		}

	}


	/**
	 * Render selection specific messages
	 * Requires a data-message attribute on the select, and message markup. eg:
	 * The select2_message__disabledonerror wrapper is optional, but allows
	 * everything within to be hidden if the error mesage is visible
	 *
	 * 	<select id="reapply_visalist" class="js-select2"
	 *		data-ajax-url="../../demo_docs/reapply.php"
	 *		data-message="#reapply_message">
	 *	</select>
	 *
	 * <div id="reapply_message">
	 * 		<div class="select2_message select2_message__error hidden">
	 * 			<h5 class="js-title"></h5>
	 *			<p class="js-text"></p>
	 *		</div>
	 *
	 *		<div class="select2_message__disabledonerror">
	 *			<p class="select2_message select2_message__notice hidden"><span class="js-text"></span></p>
	 *			 <button data-action-select="#reapply_visalist" class="btn margin-onshow" disabled>
	 *				View details &amp; apply
	 *			</button>
	 *		</div>
	 *	</div>
	 *
	 * @params self | DOMObject, data | JSON
	 */
	function handleOptionMessages(self, data) {
		var message,
			type,
			title = false,
			text,
			target = self.attr('data-message');

		// n.b. not all options will have messages
		$(target + ' .select2_message').addClass('hidden');

		if(data.message !== undefined) {
			message = data.message;
			type = message.type ? message.type : 'notice';
			text = message.text;
			title = message.title !== undefined ? message.title : false;

			$(target + ' .select2_message__' + type).removeClass('hidden').find('.js-text').text(text);

			if(title) {
				$(target + ' .select2_message__' + type).find('.js-title').text(title);
			}

			if(type === 'error' && self.attr('data-onerror') !== undefined) {
				if($(self.attr('data-onerror')).length > 0) {
					$(self.attr('data-onerror')).trigger('click');
				}
			}
		}
	}

	/**
	 * Event fired before the value is set, but after a user selects an
	 * item in select2
	 *
	 * @param select | Select2 instance/Select field
	 */
	function onSelect2Selecting(self) {
		// clear current selection if we have a max selection size of 1
		if ($(self).attr('data-maxSelection') === "1") {
			$(self).val(null);
		}
	}

	/**
	 * Get select2 theme
	 * @param select DOM Object
	 * @return string
	 */
	function getTheme(select) {
		if(select.hasClass('js-select2-theme_dark')){
			return "dark";
		} else if(select.hasClass('js-select2-theme_darkgrey')){
			return "darkgrey";
		} else if(select.hasClass('js-select2-theme_mixed')){
			return "mixed";
		} else if(select.hasClass('js-select2-theme_natlang')){
			return "natlang";
		} else if(select.hasClass('js-select2-theme_transparent')){
			return "transparent";
		} else if(select.hasClass('js-select2-theme_mini')){
			return "mini";
		} else {
			return "light";
		}
	}

	/**
	 * Create config for select2 objects from select attributes
	 * @param select DOM Object
	 */
	function getConfig(select) {
		var config = {
				dropdownCssClass: ':all:',
				closeOnSelect: true,
				language: {}
			};

		config.theme = getTheme(select);

		if(select.closest('.dock').length > 0) {
			config.dropdownParent = select.closest('.content');
			//todo fix scrolling on desktop (involves css). Note: does fix ipad.
		}


		if(select.attr("data-select-class") !== undefined ){
			config.containerCssClass = select.attr("data-select-class");
		}

		if(select.attr('data-placeholder') !== undefined ){
			config.placeholder = select.attr('data-placeholder');
		}

		if(select.hasClass('js-select2-nosearch')){
			config.minimumResultsForSearch = "Infinity";
		} else if (!select.hasClass('js-select2-accessiblesearch')) {
			config.multiple = true;
		}

		// Sort results by query
		config.language.searching = function (params) {
			cachequery = params;
			return '';
		}
		config.sorter = sortBySearchTerm;

		if(select.attr('data-ajax-url') !== undefined) {
			config = getAjaxConfig(config, select.attr('data-ajax-url'), select);
			config.minimumInputLength = select.attr('data-minimumInputLength') ? parseInt(select.attr('data-minimumInputLength'), 10) : 1;
		}

		if(select.attr('data-usercreatedoptions') !== undefined) {
			config = usercreatedoptions(config);
		}

		if(select.hasClass('js-select2-theme_mini')) {
			config.width = 'auto';
		}

		return config;
	}

	/**
	 * Allow manually entered text to be selected as an option in a drop down.
	 *
	 * @param config| JSON - select2 configuration values
	 * @returns config| JSON - select2 configuration values with user created options enabled
	 */
	function usercreatedoptions(config) {
		config.tags = true;
		config.selectOnClose = true;

		config.createTag = function (term, data) {
			var i,
				hasresult = false;

			// test if the user entered input already exists
			if (cacheresults.length > 0) {
				for(i = 0; i < cacheresults.length; i = i + 1){

					if(cacheresults[i].name.toUpperCase().indexOf(term.term.toUpperCase()) !== -1) {
						hasresult = true;
						break;
					}
				}
			}

			// if the result doesn't exists, create it
			if(!hasresult) {
				if ($(data).filter(
					function() {
						return this.text.localeCompare(term.term) === 0;
					}).length===0) {
					return {id:'+ ' + term.term, name: term.term};
				}
			}
		};

		return config;
	}

	/**
	 * Sort select2 search terms by query
	 * Relies on the caching of the query in the language searching function
	 * @params results | Object
	 */
	function sortBySearchTerm (results) {

		if (!results) return;
		// Don't alter the results being passed in, make a copy
		var sorted = results.slice(0);

		if(cachequery.term && sorted){
			// Array.sort is an in-place sort
			sorted.sort(function (first, second) {
				var fText = first.text || first.name,
					sText = second.text || second.name;

				var firstPosition = fText.toUpperCase().indexOf(
					cachequery.term.toUpperCase()
				);
				var secondPosition = sText.toUpperCase().indexOf(
					cachequery.term.toUpperCase()
				);

				if(firstPosition === -1 || secondPosition === -1) {
					return secondPosition - firstPosition; // sorting on lists that don't filter


				} else {
					return firstPosition - secondPosition;
				}
			});
		}

		return sorted;
	}


	/**
	 * Create ajax related configuation
	 *
	 * @param Object Config, String | URL
	 * @return Object | Config
	 */
	function getAjaxConfig(config, url, self) {

		config.ajax =  {
			url: url,
			dataType: 'json',
			delay: 250,
			data: function (params) {
				var query = $(self).attr('data-query') !== undefined ? $(self).attr('data-query') : params.term;

				// make sure tags are always the user's first choice
				if($(this).attr('data-usercreatedoptions') !== undefined) {
					$(this).val('');
				}

				return {
					q: query // search term
				};
			},
			processResults: function (data, page) {

				cacheresults = data; // we need to cache the results so we can check against them later

				if(data.length === 1 && data[0].errorMessage !== undefined) {
					var message = data[0].errorMessage;
					data = JSON.parse('[]');

					// if we need to do anything about the custom error message, hook into this event
					self.trigger('select2ErrorMessage', message);
				}

				return {
					results: data
				};
			},
			cache: true
		};

		config.language.inputTooShort = function () { return ''; };

		config.escapeMarkup = function (markup) { return markup; };// let our custom formatter work
		config.templateResult = formatResult;
		config.templateSelection = formatSelected;

		return config;
	}

	/**
	 * Format the result of an ajax select
	 * @param Object Select
	 */
	function formatResult (data) {
		if (data.loading) return data.text;

		return data.name;
	}

	/**
	 * Format the selected option for a ajax select
	 * @param Object Select
	 */
	function formatSelected (data) {
		return data.name;
	}

	function select2Focus(select) {
		select.select2("open");
		select.select2("close");
	}
	/**
	 * Header login slides down when login select changes value
	 */
	function attachHeaderSlide() {
		$('.dropdown__login select').on('change', function(e) {
			// Make sure we're not trying to clear the select
			if ($(this).val() !== "" ){
				$(this).closest('.header_login__init').slideUp();
				$('#' + $(this).val()).slideDown();
			}
		});
	}

	/**
	 * Redirect to the selected value
	 * Note - the value should be a url in this case
	 * If feeding from ajax - this is the id field
	 */
	function attachFollowLink(scope) {
		scope.find('.js-follow select').on('change', function(e) {
			var baseURL = window.location.origin,
				url = $(this).val();

			if (e.namespace === "") {

				if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
					baseURL = $('[data-base-href]').attr('data-base-href');
					url = baseURL + url;
				}

				window.location = url;
			}
		});
	}

	init();

});

/**
 * Javascript for selecting options to display in a data table
 */
DO.Subscribe('app:ready', function(e, $) {

	var	maxColOptions = {
			'base': 2, //limit issue going from phone to tablet
			'small': 2,
			'medium': 2,
			'large': 2,
			'xlarge': 3,
			'xxlarge': 3,
			'xxxlarge': 3,
			'xxxxlarge': 3
		};

	function init () {
		var grid = $('.selectgrid'),
			table = $(grid.data('table'));

		attachEvents(grid, table);
	}

	function getResponsiveMode() {
		if(DO.CurrentBreakpoint() === 'base' || DO.CurrentBreakpoint() === 'small'){
			return 'phone';
		}

		return 'desktop'
	}

	/**
	 * Attach related events
	 *
	 * @param table | DOMObject, grid | DOMObject
	 */
	function attachEvents(grid, table) {

		$(document).on('natlang:loaded', function() {
			var max = maxColOptions[DO.CurrentBreakpoint()];

			// unbind any existing events
			$(grid).off();
			$(table).off();

			footOddEven(table);

			if(grid.length > 0) {
				grid.removeClass('inactive');
				if (getResponsiveMode() === "phone") {
					//swap to bottom mobile
					swapToBottomMobile($('[data-natlang-accordion]'));
				}  else if(grid.find('.selectgrid_cell').length > max) {
					swapToTop(table, grid);
				} else {
					grid.find('.selectgrid_cell input').prop('checked', true).trigger('change');

					manipulateTable(table, grid);
					swapToBottom(table, grid);
				}
			}

			attachInputEvents(grid);
			attachButtonEvents(table, grid);
			attachResponsive(table, grid);
			fixTextClick();

			attachBreakpointChange(table, grid);
		});

		// @todo remove once natlang is ready
		if($('.selectgrid.static').length > 0) {
			$(document).trigger('natlang:loaded');
		}
	}

	function attachBreakpointChange(table, grid) {
		DO.Subscribe(['app:breakpointchangetotablet'], function(e) {
			// make sure other things have rendered first
			setTimeout(function() {
				swapToTop(table, grid);
			});
		}, 500);

		DO.Subscribe(['app:breakpointchangetophone'], function(e) {
			// make sure other things have rendered first
			setTimeout(function() {
				swapToTopMobile($('[data-natlang-accordion]'));
			}, 500);
		});
	}

	/**
	 * Continue the odd/even count from the tbody into the tfoot
	 * Note: applies the the first row only - but the rest can be done with css if needed
	 *
	 * @param table | DOMElement
	 */
	function footOddEven(table) {
		var rowsCount = table.find('tbody tr').length,
			oddEven = rowsCount % 2 === 0 ? 'odd' : 'even';

		table.find('tfoot tr').addClass(oddEven);
	}

	/**
	 * Make sure we can click teh text to sleect the label
	 */
	function fixTextClick() {
		$('.selectgrid_cell').on('click', function(e) {
			var input = $(this).find('input');
			if(input.is(':disabled')) {
				return;
			}
			input.trigger('click');
		});

		$('.selectgrid_cell label, .selectgrid_cell input').on('click', function(e) {
			e.stopPropagation();
		});
	}


	/**
	 * Attach events to inputs
	 *
	 * @param grid | DOMObject
	 */
	function attachInputEvents(grid) {
		var inputs = grid.find('.selectgrid_cell input');

		inputs.on('change', function(e) {
			var	max = maxColOptions[DO.CurrentBreakpoint()], // maximum number of options we can compare
				self = this;

			maxSelected(max, grid);
			updateButton(grid);

			// Make sure ellipsis still works on update
			setTimeout(function() {
				$(self).closest('[data-ellipsis]').trigger("update.dot");
			}, 300);
		});

	}

	/**
	 * Attach events to buttons
	 *
	 * @param table | DOMObject, grid | DOMObject
	 */
	function attachButtonEvents(table, grid) {
		var swapButton = $('[data-action-swap]'),
			swapButtonMobile = $('[data-action-swapmobile]'),
			compareButtonMobile = $('[data-action-comparemobile]'),
			compareButton = grid.find('[data-action-comparetable]');

		compareButton.on('click', function(e) {
			manipulateTable(table, grid);
			swapToBottom(table, grid);
		});

		compareButtonMobile.on('click', function(e) {
			e.preventDefault(); //because we are in a form
			swapToBottomMobile($('[data-natlang-accordion]'));
		});

		swapButton.on('click', function(e) {
			swapToTop(table, grid);
		});

		swapButtonMobile.on('click', function(e) {
			swapToTopMobile($('[data-natlang-accordion]'));
		});
	}

	/**
	 * Attach resposnsive events
	 * This relates to teh maximum number of items we can compare at once
	 *
	 * @param table | DOMObject Section, grid | DOMObject
	 */
	function attachResponsive(table, grid) {
		DO.Subscribe('app:breakpointchange', function(e) {
			var max = maxColOptions[DO.CurrentBreakpoint()]; // maximum number of options we can compare
			handleMax(max, table, grid);
		});
	}

	/**
	 * Adjust view to hide comparision table
	 * @param table | DOMObject Section, grid | DOMObject
	 */
	function swapToTop(table, grid) {
		var swapButton = $('[data-action-swap]'),
			compareButton = grid.find('[data-action-comparetable]'),
			target = swapButton.data('action-swap');

		swapButton.removeClass('selectgrid_swap__visible');
		$(target).slideDown(function(){
			$(this).removeClass('inactive');
			$(this).attr('style', '');
		});
		table.addClass('inactive').removeClass('show_print');

		table.find('table').trigger('comparetable:hide');

		if(compareButton.attr('disabled') === undefined) {
			setTimeout(function(){
				compareButton.focus(); //move focus for accessibility
				$(window).scrollTop($('.selectgrid').position().top - 80); // scroll so the button is in focus (80 is to account for sticky header)
			}, 300);
		}
	}

	/**
	 * Adjust view to hide accordions
	 * @param toHide | DOMObject
	 */
	function swapToTopMobile(toHide) {
		var swapButton = $('[data-action-swapmobile]'),
			target = swapButton.data('action-swapmobile');

		swapButton.removeClass('selectgrid_swap__visible');
		$(target).slideDown(function(){
			$(this).removeClass('inactive');
			$(this).attr('style', '');
		});
		toHide.addClass('inactive').removeClass('show_print');

		setTimeout(function(){
			$(window).scrollTop($(target).position().top - 80); // scroll so the button is in focus (80 is to account for sticky header)
		}, 300);

	}

	/**
	 * Adjust view to show comparision table
	 * @param table | DOMObject Section, grid | DOMObject
	 */
	function swapToBottom(table, grid) {
		var swapButton = $('[data-action-swap]'),
			target = swapButton.data('action-swap');

		$(target).slideUp(function(){
			$(this).addClass('inactive');
			$(this).attr('style', '');
		});

		table.removeClass('inactive').addClass('show_print');
		table.find('table').trigger('comparetable:show');

		swapButton.addClass('selectgrid_swap__visible').focus(); //move focus for accessibility

		setTimeout(function(){
			$(window).scrollTop(swapButton.position().top - 80); // scroll so the button is in focus (offset is to account for sticky header)
		}, 300);
	}


	/**
	 * Adjust view to show comparision table
	 * @param table | DOMObject Section, grid | DOMObject
	 */
	function swapToBottomMobile(toHide) {
		var swapButton = $('[data-action-swapmobile]'),
			target = swapButton.data('action-swapmobile');

		swapButton.addClass('selectgrid_swap__visible').focus(); //move focus for accessibility
		$(target).slideUp(function(){
			$(this).addClass('inactive');
			$(this).attr('style', '');
		});
		toHide.removeClass('inactive').addClass('show_print');

		setTimeout(function(){
			$(window).scrollTop(swapButton.position().top - 150); // scroll so the button is in focus (offset is to account for sticky header)
		}, 300);

	}



	/**
	 * Handle screen resize where current selected is more than allowed maximum
	 * @param max | int, table | DOMObject, grid | DOMObject
	 */
	function handleMax(max, table, grid) {
		if( max > table.find('thead [data-cell-id]')) {
			uncheck(grid.find('input:checked'), max);
			manipulateTable(table, grid);
		}
	}

	/**
	 * Uncheck input boxes down to a given maximum
	 * @param inputs | DOMObjects input, max | int
	 */
	function uncheck(inputs, max) {
		var i;

		for (i = inputs.length; i > max; i = i - 1) {
			$(inputs[i]).prop('checked', false).trigger('change');
		}
	}

	/**
	 * Show and hide items within table, based on current selections
	 * @param table | DOMObject, grid | DOMObject
	 */
	function manipulateTable(table, grid) {
		var showCols = [],
			checked = grid.find('input:checked'),
			items = table.find('[data-cell-id]'),
			i,
			result;

		items.removeClass('last');

		for(i = 0; i < checked.length; i = i + 1) {
			showCols.push($(checked[i]).val());
		}

		result = items.removeClass('active').filter(function() {
			return showCols.indexOf($(this).data("cell-id")) > -1;
		});

		result.addClass('active');

		table.find('tr').each(function() {
			$(this).find('.active:last').addClass('last');
		});

	}

	/**
	 * If we have hit our maximum number of selections, disable other options
	 * Otherwise, enable all options.
	 * @param max | int, grid | DOMObject
	 */
	function maxSelected(max, grid) {

		var checkedTotal = grid.find('input:checked').length;

		if(checkedTotal >= max) {
			grid.find('input').not(':checked').prop('disabled', true);
		} else {
			grid.find('input').prop('disabled', false);
		}
	}


	/**
	 * Enable button when >=1 | Disable button when 0 options.
	 * Toggle class on multiple selections
	 *
	 * @param grid | DOMObject
	 */
	function updateButton(grid) {
		var optionTotal = grid.find('input:checked').length,
			button = grid.find('[data-action-comparetable]');

		if(optionTotal > 0) {
			button.attr('disabled', false);
			optionTotal > 1 ? button.addClass('multiple') : button.removeClass('multiple');

		} else {
			button.attr('disabled', true);
		}
	}



	init();

});

/*
 * Initilization of sidenotes
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var sidenoteContainer,
		dockbound = false;

	function init() {
		var sidenotes = setup($(document));

		attachEvents();
	}

	function setup(scope) {

		if(scope.find('.sidenote-trigger').length < 1) {
			return false;
		}

		if(scope.is($(document))) {
			sidenoteContainer = $('#main');
		} else {
			sidenoteContainer = $('.dock_body');
			dockbound = true;
		}

		sidenoteContainer.sidenotes(getConfig(scope));
		markup(scope);
		responsive(scope);

		scope.trigger('sidenotes:ready');

		return true;
	}

	function getConfig(scope) {
		return {
			'initiallyHidden': getRespond(scope),
			'sidenotePlacement': 'after',
		}
	}

	function markup(scope) {
		var refMark = scope.find('.ref-mark'),
			i;

		for(i = 0;i < refMark.length; i = i + 1) {
			$(refMark[i]).attr('href', $(refMark[i]).parent().find('.reversefootnote').attr('href'));
		}
	}


	function attachEvents() {
		$(document).on('ajaxpages:contentloaded', function(e, data) {

			if(dockbound) {
				$('.dock_body').sidenotes('destroy');
				dockbound = false;
			}

			setup(data.target);
		});
	}

	function getRespond(scope) {
		if(scope.is($(document))) {
			return Response.band(0, 900);
		}

		return Response.band(0, 1440);
	}

	function responsive(scope) {
		Response.crossover(function() {
		switch (true) {
			case getRespond(scope):
				sidenoteContainer.sidenotes('hide');
				break;
			default:
				sidenoteContainer.sidenotes('show');
				break;
			}
		}, 'width');
	}

	init();

});

DO.Subscribe('app:ready', function(e, $) {

	"use strict";

	var mainBreakpoint = 750;

	function init() {
		if($('.stickybar_btn').length > 0) {
			setupAffix();
			attachEvents();
			circumscribeContent();
		}
	}

	function setupAffix() {
		var el = $('.stickybar');

		el.affix({
			offset: {
				top: function () {
					if(el.closest('.stickybar_holder').length > 0) {
						return (this.top = el.parents('.stickybar_holder').position().top);
					} else if(el.hasClass('stickybar_intab')) {
						return (this.top = el.position().top);
					} else {
						return (this.top = $('.header').outerHeight(true));
					}

				}
			}
		});

	}

	function attachEvents() {
		var run,
		 el = $('.stickybar');

		$(window).on('scroll resize', function(event) {
			run = true;

		});

		setInterval(function() {

			if (run) {
				circumscribeContent();
				hasScrolled();

				if(el.closest('.stickybar_holder').length > 0) {
					el.data('bs.affix').options.offset = el.parents('.stickybar_holder').position().top;
				} else if(el.hasClass('stickybar_intab')) {
					el.data('bs.affix').options.offset = el.parents('.tabs_panel').position().top;
				} else {
					el.data('bs.affix').options.offset = $('.header').outerHeight(true);
				}

				run = false;
			}
		}, 1000);


	}

	function hasScrolled() {
		if($('.stickybar_btn.active').length > 0) {
			$('.stickybar_btn').trigger('click');
		}
		//Make overviw tab active for mobile if none are active
		if($(window).width() < mainBreakpoint){
			if($('.factsheet_content .tabs_accordiontrigger.current').length < 1){
				//$('.factsheet_content .tabs_accordiontrigger:first-child, .factsheet_content .tabs_panel:first-of-type').addClass('current');
			}
		}
	}

	function getStickyPoint(w){
		//Return the point at which the nav sticks based on screen width

		var p = 585;
		if(w < 1160){
			p = 615;
			if(w < 1056){
				p = 520;
				if(w < 944){
					p = 380;
					if(w < 850){
						p = 400;
						if(w < mainBreakpoint){
							//p = 238;
							p = $('.layout_header').outerHeight() + $('.header_mobile').outerHeight() + 1;
							//p = 280;
						}
					}
				}
			}
		}
		return p;
	}

	function circumscribeContent(){
		//Ensure page content doesn't hide underneath sticky elements when they do their sticky thing
		//... fix sticky header too
		var winWidth = $(window).width();
		if($('.stickybar').hasClass('stickybar_intab')){
			var stickyPoint = getStickyPoint(winWidth);
			var stickyBar = $('.stickybar.stickybar_intab');

			//var stickyParent = stickyBar.closest('.stickybar_inpage_outer');
			//var overviewContent = stickyParent.siblings('.contentblock_centered');
			//var criteriaContent = stickyParent.siblings('.row').find('.contentblock_centered');

			var contentDiv = $('.tabs_panel .vf_panel');


			$(window).on('scroll', function(event) {
				var topPos = $(window).scrollTop();

				if(winWidth > mainBreakpoint){
					if(topPos >= stickyPoint){
						stickyBar.addClass('fixed');
						contentDiv.addClass('hasSticky');
						//overviewContent.addClass('hasSticky');
						//criteriaContent.addClass('hasSticky');
					}else{
						stickyBar.removeClass('fixed');
						contentDiv.removeClass('hasSticky');
						//overviewContent.removeClass('hasSticky');
						//criteriaContent.removeClass('hasSticky');
					}
				}else{

					var currentPanel = $('.tabs_panel.current');

					if(topPos >= stickyPoint){
						currentPanel.addClass('stickit');
						//Add extra padding from corresponding content area if blue panel is present
						if(currentPanel.hasClass('has_stickybar')){
							var menuItemHeight = $('.tabs_accordiontrigger.current').outerHeight();
							var panelHeight = currentPanel.find('.stickybar').outerHeight();
							currentPanel.css('padding-top', menuItemHeight + panelHeight + 50);
						}
					}else{
						currentPanel.removeClass('stickit').removeAttr('style');
					}

					if(topPos >= stickyPoint){
						$('.tabs_panel.current').addClass('stickit');
					}else{
						$('.tabs_panel.current').removeClass('stickit');
					}
				}



			});

		}

	}

	init();

});

/**
 * Component to handle oversized and responsive tables
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";


	function init() {
		setup($(document));

		// do this here because every other event relies on tables existing at page load
		$(document).on('ajaxpages:contentloaded', function(e, data) {
			setup(data.target);
		});
	}

	function setup(scope) {
		if(scope.find('table').not('.fullpage').length > 0) {
			markupTable(scope.find('table').not('.fullpage'));// do once
			attachEvents(scope); // do once for each scope
			tableView(scope); // do every time we resize
		}

		if(scope.find('table tfoot').length > 0) {
			var i,
				target = scope.find('table tfoot');

			for(i = 0; i < target.length; i = i + 1) {
				footOddEven($(target[i]).closest('table'));
			}
		}
	}
	/**
	 * Continue the odd/even count from the tbody into the tfoot
	 * Note: applies the the first row only - but the rest can be done with css if needed
	 *
	 * @param table | DOMElement
	 */
	function footOddEven(table) {
		var rowsCount = table.find('tbody tr').length,
			oddEven = rowsCount % 2 === 0 ? 'odd' : 'even';

		table.find('tfoot tr').addClass(oddEven);
	}

	/**
	 * Attach event listeners
	 */
	function attachEvents(scope) {
		handleScroll(scope);
		handleClick(scope);

		// do once
		if(scope.is(document)) {
			handleResize();
		}
	}

	function handleClick(scope) {
		scope.find('.table_indicator').on('click', function(){
			var wrapper = $(this).siblings('.table_wrapper'),
				scroll = wrapper.scrollLeft();

			if ($(this).hasClass('right')){
				wrapper.animate({scrollLeft: scroll + 200}, 200);
			} else {
				wrapper.animate({scrollLeft: scroll - 200}, 200);
			}
		});
	}

	/**
	 * Wrap tables and inject indicator elements to allow for large table scrolling
	 */
	function markupTable(table) {
		table.not('.table-collapsed').wrap('<div class="table_wrapper"></div>');
		table.closest('.table_wrapper').wrap('<div class="table_outer"></div>');
		table.closest('.table_outer').append('<button class="table_indicator left"><span class="sr-only">Scroll table left</span></button>');
		table.closest('.table_outer').append('<button class="table_indicator right"><span class="sr-only">Scroll table right</span></button>');
	}


	/**
	 * Function to listen to resize event,
	 * Makes sure the event firing is throttled  to every half second
	 * so performance isn't hurt too much
	 */
	function handleResize() {
		var resize;

		$(window).on('resize', function(event) {
			resize = true;
		});

		setInterval(function() {
			if (resize) {
				tableView();
				resize = false;
			}
		}, 500);
	}

	/**
	 * When a table wrapper is scrolled to the end, the right scroll indicator should
	 * disappear. When the table is scrolled from the start, the left arrow should appear.
	 * These elements are hidden by default and show when either the .left  or
	 * .right classes are  present on table_wrapper
	 */
	function handleScroll(scope) {
		var fromend = false,
			fromstart = true;

		scope.find('.table_wrapper').on('scroll', function(e) {
			var elem = $(e.currentTarget),
				width = $(this).find('table').width(),
				scrollLeft = $(elem).scrollLeft(),
				scrollEnd = scrollLeft + $(this).width();

			// handle scroll to end
			if (scrollEnd >= (width - 20)) { // allow for a 20px difference for mobile
				$(this).removeClass('right');
				$(this).siblings('.table_indicator.left').focus();
				fromend = true;
			} else if(fromend) {
				$(this).addClass('right');
				fromend = false;
			}

			// handle scroll from start
			if (scrollLeft <= 0) {
				$(this).removeClass('left');
				$(this).siblings('.table_indicator.right').focus();
				fromstart = true;
			} else if(fromstart) {
				$(this).addClass('left');
				fromstart = false;
			}
		});
	}

	/**
	 * Adjust visual display of markers to fit their tables, and add and remove
	 * active class
	 */
	function tableView() {
		var tableOuter = $('.table_outer'),
			i;

		for(i = 0; i < tableOuter.length; i = i + 1) {
			hasOverflow($(tableOuter[i]).find('.table_wrapper'));
			adjustMarkerHeight($(tableOuter[i]));
		}
	}

	/**
	 * Fit the marker to sit between the header and the last row
	 */
	function adjustMarkerHeight(tableWrapper) {
		var target = tableWrapper.find('.table_indicator'),
			top = tableWrapper.find('table tr:first-child').outerHeight() + 1,
			lastChild = tableWrapper.find('table tr:last-child td:first-child'),
			bottom = lastChild.position().top + lastChild.outerHeight();

			target.css({'height': bottom - top, 'top': top});

	}

	/**
	* Check if table end is outside bounds. If it is, add the active class.
	* If it isn't, remove the active class.
	*/
	function hasOverflow(tableWrapper) {
		var wrapWidth = tableWrapper.width(),
			width = tableWrapper.find('table').width();

		if (wrapWidth < width) {
			tableWrapper.addClass('active right');
		} else {
			tableWrapper.removeClass('active');
		}
	}

	init();

});

DO.Subscribe('app:ready', function(e, $) {

	function init(){
		setup();
		attachEvents();
		loadTab();
	}

	function setup(){
		// on mobile, tabs are actually accordians, and are all collapsed by default,
		// so we need to remove the current css class
		if ($('.tabs_panel').length && DO.CurrentBreakpoint().match(/^(base|small)$/)) {
			// don't do it for elements that have a sticky panel, these should be open by default
			$('.tabs_panel.current:not(.has_stickybar)').removeClass('current');
		}
	}

	function loadTab(){
		var hash = window.location.hash;
		if(!hash.length) {
			//$('.tabs button:first').trigger('click');

		} else {
			hash = hash.replace('#', '');
			var trigger = $('[aria-controls="' + hash + '"]');
			if(trigger.length) {
				trigger.trigger('click');
			}
		}
	}

	function attachEvents() {
		$('[data-tab] > [aria-controls]').on('click', function(e) {
				window.location.hash = $(this).attr('aria-controls');
		});
	}

	init();

});



DO.Subscribe('app:ready', function(e, $) {

	function init(){
		setupForms();
	}

	function setupForms(){

		// on submit of first form, scroll to next form
		// show/hide is handled by data-switch
		$('#termination_form_1 .actions .btn').on('click', function(){
			// close the top accordion
			// $('#termination_accordion_1 .accordion_trigger').trigger('click');

			setTimeout(function(){
				$('html, body').animate({'scrollTop': $('#termination_accordion_2').offset().top - 50}, 300);
			}, 300);
		});

		// When termination form is submitted
		$('#termination_form_2 .actions .btn').on('click', function(){

			setTimeout(function(){
				if($('.form_field').hasClass('parsley-error')){
					// Show error banner
					$('#termination_form_2 .banner__alert').removeClass('hidden').addClass('open');

					// Shift individual error messages underneath corresponding form field
					$('.parsley-error .field__error.filled').each(function(){
						shiftError($(this));
					});

					// Scroll up to first occurence of error
					var firstErrPos = $('#termination_form_2 .err-msg:first-of-type').closest('.form_field').offset().top - 200; // room for fixed position process nave
					$('html, body').animate({
						'scrollTop': firstErrPos
					}, 300);
				}
			}, 123);

		});



		// Remove custom validation message when form field value changes
		removeErrorsOnChange();

		// Open date picker when date input field is focused
		setupDatepicker();

		// Reload page when Reset button is clicked
		$('.termination .reset_button').on('click', function(e){
			e.preventDefault();
			location.reload();
		});

		// Hide success panel and show form when new form link is clicked
		$('.termination .new-form-link').on('click', function(e){
			e.preventDefault();
			$('.success_wrap').addClass('hidden');
			$('.form_wrap').removeClass('hidden');
		});

		// Add basic validation to date of birth dropdowns
		validateDOB();
	}

	function getMonth(str){
		return new Date(str+'-1-01').getMonth()+1;
	}

	function validateDOB() {
		$('select[data-dob-validate]').on('change', function() {

			var d = $(this).closest('.multiple_selects').find('.dob_day'),
				m = $(this).closest('.multiple_selects').find('.dob_month'),
				y = $(this).closest('.multiple_selects').find('.dob_year'),
				dVal = d.val(),
				mVal = m.val(),
				yVal = y.val();

			if(!dVal || !mVal || !yVal) return;

			if(mVal=='February' || mVal=='April' || mVal=='June' || mVal=='September' || mVal=='November') {

				if(mVal == 'February') {
					console.log(isLeapYear(yVal), dVal > 29);

					if(isLeapYear(yVal)) {
						if(dVal > 29) {
							console.log('leap')
							d.select2('val', '');
						}
					}
					else if(dVal > 28) {
						d.select2('val', '');
					}

				} else if(dVal == 31) {
					d.select2('val', '');
				}
			}

		});
	}

	function isLeapYear(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	function setupDatepicker() {
		$('.calendarWrap .input').on('focus', function(e){
			if($(window).width() > 980){
				e.preventDefault();
				$(this).parent().find('.datePicker').trigger('click');
			}
		});
	}

	function removeErrorsOnChange() {
		$('.term_form select, .term_form .input').on('change', function(){
			$(this).parent().find('.err-msg').remove();
			// Remove any error from inline select boxes
			$(this).closest('.select-col').removeClass('has-error').find('.err-msg').remove();
		});
		$('.term_form .input').on('keyup', function(){
			$(this).parent().find('.err-msg').remove();
		});
	}

	function shiftError(error) {
		var errorID = error.attr('id').replace('parsley-id-', '');
		var field = $('*[data-parsley-id='+errorID+']');
		// Look for unique error message otherwise use parsley's generic message
		var errorMsg = error.find('.parsley-required').html();
		if(field.data('vmsg')){
			errorMsg = field.data('vmsg');
		}
		// Append error message if there's not already one there
		if(field.parent().find('.err-msg').length < 1){
			field.parent().append('<span class="err-msg">'+errorMsg+'</span>');
		}

		// Add class to individual select field when multiple in same row
		field.parent().addClass('has-error');
	}


	init();

});

/**
 * Component to handle oversized and responsive tables
 */

DO.Subscribe('app:ready', function(e, $) {

	"use strict";


	function init() {
		if($('.tools').length > 0) {
			attachEvents();
		}
	}

	/**
	 * Attach event listeners
	 */
	function attachEvents() {
		$('[data-action="download"]').on('click', function(){
			handleDownload();
		});

		$('[data-action="print"]').on('click', function(){
			printContent($(this));
		});

		if($('.firefox').length > 0) {

			if (window.matchMedia) {
				var mediaQueryList = window.matchMedia('print');
				mediaQueryList.addListener(function(mql) {
					if (mql.matches) {
						mozBeforePrint();
					} else {
						mozAfterPrint();
					}
				});
			}

			window.onbeforeprint = mozBeforePrint;
			window.onafterprint = mozAfterPrint;
		}

	}

	function printContent(self) {
		if ($('.ie9, .ie10, .ie11').length > 0) {
			iePrint(self);
		} else {
			handlePrint(self);
		}
	}

	function iePrint(self) {
		var title= 'Print',
			printWindow = window.open(''),
			content = self.closest('.dock').find('.dock_bodywrap').html(),
			header = false;

		if (self.data('header')) {
			header = $(self.data('header')).clone();
		}

		printWindow.document.write('<!doctype html><html class="ie ie9"><head><title>' + title + '</title>');
		printWindow.document.write('<meta name="viewport" id="printmeta" content="width=device-width,height=device-height,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0">');
		printWindow.document.write('<link href="' + CSS_LOCATION + 'base.min.css" type="text/css" rel="stylesheet">');
		printWindow.document.write('<link rel="stylesheet" type="text/css" href="' + CSS_LOCATION + 'print.css">');
		printWindow.document.write('</head><body class="print_window content">');

		if(header) {
			printWindow.document.write('<header class="header text--center">' + header.html() + '</header>');
		}

		printWindow.document.write('<div class="sans">'+ content + '</div></body></html>');

		printWindow.document.close();
		printWindow.focus();
		// We need a timeout so fonts load correctly.
		setTimeout(function() {
			printWindow.print();
			printWindow.close();
		}, 500);
	}


	/**
	 * Firefox has a nasty issue with printing fieldsets, so repalce with divs
	 * and swap back once print has finished
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=471015
	 *
	 * Firefox also won't print text entered into nunber fields
	 */
	function mozBeforePrint() {
		var targets = $("fieldset").not('[data-natlang-questions]'),
			target,
			fieldsetContent,
			classes, i,
			numberInputs = $('input[type=number]');

		numberInputs.addClass('print-number-input').attr('type','text');

		for (i = 0; i < targets.length; i++) {
			target = $(targets[i]);
			classes = target.attr('class');
			target.wrapInner('<div class="print-fieldset '+ classes +'" data-print-num="'+i+'"></div>');
			$('div[data-print-num="'+ i + '"]').unwrap();
		}
	}

	/**
	 * Firefox has a nasty issue with printing fieldsets, so replace with divs,
	 * and swap back once print has finished
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=471015
	 *
	 * Firefox also won't print text entered into nunber fields
	 */
	function mozAfterPrint() {
		var targets = $(".print-fieldset"),
			target,
			fieldsetContent,
			classes,
			i,
			numberInputs = $('.print-number-input');

		numberInputs.attr('type','number');


		for (i = 0; i < targets.length; i++) {
			target = $(targets[i]);
			classes = target.attr('class');
			target.wrapInner('<fieldset class="'+ classes + '" data-print-num="'+i+'"></fieldset>');
			$('fieldset[data-print-num="'+ i + '"]').unwrap();
			$('fieldset[data-print-num="'+ i + '"]').removeClass('print-fieldset');
		}
	}

	function handlePrint(self) {
		if(self.closest('.dock').length > 0) {

			var iframe = $('#print_dock'),
				printContents = self.closest('.dock').find('.dock_bodywrap').html(),
				contents = iframe.contents();

			contents.find('head').html(
				'<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"> \
				<link href="' + CSS_LOCATION + 'base.min.css" type="text/css" rel="stylesheet"> \
				<link rel="stylesheet" type="text/css" media="print" href="' + CSS_LOCATION + 'print.css">'
			);

			contents.find('body').addClass('print_window content').html(printContents);

			// We need a timeout so fonts load correctly.
			setTimeout(function() {
				iframe.get(0).contentWindow.print();
			}, 300);

		} else {
			window.print();
		}
	}

	function handleDownload() {
		// needs to call something in the backend
		inz.pageTools.downloadFile();
	}

	init();

});

DO.Subscribe(['app:ready', 'ajax:success'], function(e, $) {

	function init() {
		setup($(document));
	}

	function setup(scope) {
		setupTooltips(scope.find('[data-toggle="tooltip"]'), scope);
		setupPopovers(scope.find('[data-toggle="popover"]'), scope);
		attachEvents(scope);

		if(scope.is(document))
		{
			$(document).on('app:inittooltips', function(e, data)
			{
				setup(data.target);
			});
		}
	}

	function setupPopovers(selector, scope) {
		var container = scope.closest('.dock').length == 0 ? 'body' : '.dock_body';

		selector.popover({
			container: container,
			animation: true,
			html: true,
			trigger: 'click'
		});
	}

	function setupTooltips(selector, scope) {

		var isMobile = $('html.touch').length > 0 && (DO.CurrentBreakpoint() === 'base' || DO.CurrentBreakpoint() === 'small' || DO.CurrentBreakpoint() === 'medium' || DO.CurrentBreakpoint() === 'large'),
			container = scope.closest('.dock').length == 0 || isMobile ? 'body' : '.dock_body';

		selector.each(function() {

			var title = '<h4 class="tooltip_title">' + ($(this).attr('tooltip_title') ? $(this).attr('tooltip_title') : $(this).text()) + '</h4>',
				template = '<div class="tooltip tooltip__small" role="tooltip"><div class="tooltip_wrap"><div class="btn btn__tooltip"><span class="sr-only">Close</span></div><div class="tooltip-arrow"></div>' + title+ '<div class="tooltip-inner"></div></div></div>';

			$(this).addClass('tooltip_content').attr('role', 'button').attr('href', '#').removeAttr('target').prepend('<span class="tooltip-sronly">Glossary for </span>');

			if ($(this).closest('.stripe__darkblue').length > 0) {
				template = '<div class="tooltip tooltip__small tooltip__dark" role="tooltip"><div class="tooltip_wrap"><div class="btn btn__tooltip"><span class="sr-only">Close</span></div><div class="tooltip-arrow"></div>' + title+ '<div class="tooltip-inner"></div></div></div>';
			}

			$(this).tooltip({
				container: container,
				animation: true,
				html: true,
				trigger: 'click manual',
				template: template,
				viewport: 'body'
			});
		});
	}

	function closeTooltips(e) {
		var tooltips = $('[data-toggle="tooltip"][aria-describedby]'),
			inCurrentTooltip = $(e.target).closest('.tooltip'),
			i,
			keepOpen = true;

		if(tooltips === "undefined" || tooltips.length < 1) {
			return;
		}

		for(i = 0; i < tooltips.length; i = i + 1) {
			keepOpen = inCurrentTooltip && inCurrentTooltip.attr('id') === $(tooltips[i]).attr('aria-describedby');

			if(keepOpen && !$(e.target).hasClass('btn')) {
				//We are clicking on the tooltip itself - there might be a link, so don't close.
				return;
			}

			// we are clicking a tooltip link, don't close.
			if(tooltips[i] !== e.target) {
				e.stopPropagation();
				e.preventDefault();

				$(tooltips[i]).tooltip('hide');
			}
		}
	}

	function attachEvents(scope) {

		//do once
		if(scope.is(document)) {
			$(document).on('click', function(e) {
				closeTooltips(e);
			});

			// the dock needs to be treated seperately, as we are stoping propagation of events within it
			$('.dock_body').on('click', function(e) {
				closeTooltips(e);
			});

			$(document).on('natlang:loaded', function(e) {
				setupTooltips($('.selectgrid [data-toggle="tooltip"], .comparison_wrapper [data-toggle="tooltip"], .comparisonaccordion [data-toggle="tooltip"]'), scope);
			});

			$(document).on('ajaxpages:contentloaded', function(e, data) {
				setup(data.target);
			});
		}

		scope.find('[data-toggle="tooltip"]').on('click', function(e) {
			e.preventDefault();
		});


		scope.find('[data-toggle="tooltip"]').on('inserted.bs.tooltip', function(a,b,c) {
			$('html').addClass('tooltip_isopen');
			if(scope.closest('.data-tool').length > 0) return;

			var top = $(document).scrollTop();

			// Once animation is complete, remove adjust body position and classes
			$('body').css('top', -top + 'px');

		});

		scope.find('[data-toggle="tooltip"]').on('hide.bs.tooltip', function() {

			$('html').removeClass('tooltip_isopen');

			// dont scroll to top of page if inside a tool
			if(scope.closest('.data-tool').length > 0) return;

			var top = $('body').position().top;
			$('body').css('top', -top + 'px');

			//$(document).scrollTop(top*=-1);
		});

	}

	init();

});

/**
 * Start any application specific calls to via ready to avoid
 * boiler place throughout the core code.
 *
 * Params:
 *	event
 */
jQuery(document).ready(function(e) {
	// prevent caching of ajax GET requests in IE
	$.ajaxSetup({
		cache: false
	});

	DO.Fire('app:ready', [], true);
});
