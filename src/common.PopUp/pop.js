define(function(require,exports,module){
	var $ = require("jquery");
	$("#pop").delegate(".pop_cancel,.cancel","click",function(){
		$(".pop_title").html("");
		$(".pop_confirm").html("确定");
		$(".pop_cancel").html("取消");
		$(".pop_content").html("");
		$(".popUp").hide();
	});
	function popShow(config,callback){
		if(config){
			$(".pop_title").html(config.title);
			$(".pop_content").html(config.content);


			if(config.confirmText){
				$(".pop_confirm").html(config.confirmText)
			}


			if(config.cancelText){
				$(".pop_cancel").html(config.cancelText)
			}
			$(".popUp").show();


			if(config.showCancelButton == "" || config.showConfirmButton == ""){
				$(".pop_foot").hide();
			}else{
				$(".pop_foot").show();
			}

			if(config.timer){
				setTimeout(function(){
					$(".popUp").hide();
				}, config.timer);
			}

			var w = $(".popUp_box").width(),h = $(".popUp_box").height();
			$(".popUp_box").css("top",(window.innerHeight-h)/2-20);
		}
		$(".pop_confirm").unbind();
		$(".pop_confirm").click(function(){
			callback&&callback();
		});
	}
	return popShow;
});