html2node
=========

Covert html string to DOM node, support node which must be used in special context(thead, param, ...).
## Case
```
	var node = html2node('<td><span>123</span></td>');
	node.tagName; 	// 'td'
	node.innerHTML; // '<span>123</span>'

	var nodes = html2node('<div>1</div><p>2</p>');
	nodes.length; 	// 2
	nodes[1].tagName; // 'p'
```

## Test
Using [karma](http://karma-runner.github.io/) as test runner, [jasmine](http://jasmine.github.io/) for test case.
### Prepare for test:
```npm install```
### To test:
```npm test```