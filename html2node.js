(function(window, document) {
	var div = document.createElement('div'),
		tagRegex = /^<\s*(\w+)(?:\s+[^>]+)?\s*>/;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	var htmlSerialize = (function(){
		div.innerHTML = '<link/>';
		var flag = !!div.getElementsByTagName('link').length;
		div.innerHTML = '';
		return flag;
	})();

	// copy from jquery, can refer to html spec(find "Contexts in which this element can be used")
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: htmlSerialize ? [ 0, "", "" ] : [1, "X<div>", "</div>"]
	};

	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	

	function html2node(str) {
		if (typeof str !== 'string') return str;
		var originStr = str;
		str = str.replace(/^\s+|\s+$/g, '');
		var parent = div,
			match = str.match(tagRegex),
			tagName = match && match[1] && match[1].toLowerCase(),
			wrap = wrapMap[tagName] || wrapMap._default,
			node,
			nodeList = [],
			childNodes;

		// add the context wrap if element which must used in special context
		level = wrap[0];
		str = wrap[1] + str + wrap[2];

		try{
			div.innerHTML = str;
			// traveral to parent
			for (var i = 0; i < level; i++) {
				parent = parent.lastChild;
			}

			// get the node/nodeList from parent
			childNodes = parent.childNodes;
			for(var i = 0; node=childNodes[i];i++){
				nodeList.push(node);
			}
			// ie7- may create extra node, for example
			// parse 'thead' may automately create 'tbody' to '<table><thead></thead><tbody></tbody></table>'
			if(wrap !== wrapMap._default && nodeList.length > 1){
				nodeList = [parent.getElementsByTagName(tagName)[0]];
			}
			return nodeList.length < 2 ? nodeList[0] : nodeList;
		}catch(e){
			throw new Error('Syntax error, unrecognized expression:' + originStr);
		}
	}
	// support node module, amd module
	if (typeof module === 'object' && typeof exports === 'object' && exports === module.exports) {
		module.exprts = html2node;
	} else {
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return html2node;
			});
		} else {
			window.html2node = html2node;
		}
	}
})(window, document);