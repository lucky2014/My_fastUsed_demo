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

	Handlebars.registerHelper("templateStatus",function(v){ //"CHECKING" 审核中, "APPROVED" , 已通过；"REJECTED"被驳回, "EXPIRED"协议已过期
		if(v == "0" ){
			return "已领取";
		}else if(v == "1"){
			return "已使用";
		}else if(v == "2"){
			return "已过期";
		}else if(v == "3"){
			return "未领取";
		}else if(v == "4"){
			return "已转赠";
		}else if(v == "5"){
			return "已删除";
		}else{
			return "已占用";
		}
	});
	
	module.exports = box;
});