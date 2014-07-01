describe('Parse html string to DOM node:', function() {
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	it('Parse to text node', function() {
		var str = "xyz";
		var node = html2dom(str);
		expect(node.nodeType).toEqual(3);
		expect(node.nodeValue).toEqual(str);
	});
	it('Parse to node', function() {
		var str = " <Div>123<span>abcd</span></div>";
		var node = html2dom(str);
		expect(node.tagName.toLowerCase()).toEqual('div');
		expect(node.outerHTML.toLowerCase().trim()).toEqual(str.toLowerCase().trim());
	});

	it('Parse the node which must in special context', function() {
		var str = "<td><span>xx</span> 123</td>  ";
		var node = html2dom(str);
		expect(node.tagName.toLowerCase()).toEqual('td');
		expect(node.outerHTML.toLowerCase().trim()).toEqual(str.toLowerCase().trim());

		var tags0 = ['option', 'legend', 'thead', 'tr', 'td', 'optgroup',
						'tbody', 'tfoot', 'colgroup', 'caption','th'
			],
			tags1 = ['area', 'col'],
			tag;
		for (var i = 0; tag = tags0[i]; i++) {
			node = html2dom('<' + tag + '></' + tag + '>');
			expect(node.tagName.toLowerCase()).toEqual(tag);
		}
		node = html2dom('<param name="a" value="1"/>');
		expect(node.tagName.toLowerCase()).toEqual('param');
		for (var i = 0; tag = tags1[i]; i++) {
			node = html2dom('<' + tag + '/>');
			expect(node.tagName.toLowerCase()).toEqual(tag);
		}
	});
	it('Parse to node list', function() {
		var str = "<Div>123</div><span>abcd</span>xxx";
		var node = html2dom(str);
		expect(node.length).toEqual(3);
		expect(node[0].innerHTML.toLowerCase()).toEqual('123');
		expect(node[1].tagName.toLowerCase()).toEqual('span');
		expect(node[2].nodeType).toEqual(3);
	});
});