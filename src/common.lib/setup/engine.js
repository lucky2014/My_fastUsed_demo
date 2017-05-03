define(function(require, exports, module) {
	var Handlebars = require('handlebars');
	var box  = {
		init:function(){
			return box;
		},
		clicked:function(){},
		render:function($dom, data, tpl){
	    	var tplc = Handlebars.compile(tpl);
	    	$dom.append(tplc(data));
	    	box.$dom = $dom;
	    	$dom.click(function() {
	    	  box.clicked && box.clicked();
	    	});
		}
	};
	
	module.exports = box;
});