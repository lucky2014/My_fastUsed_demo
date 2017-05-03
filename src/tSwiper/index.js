define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");
	var swiper = require("src/common.swiper/swiper");

	setup.commonAjax("getStationInfo", setup.getParams({
        stationId: stationId
    }), function(msg){
    	var banner = msg.pic.split("|");
    	var len = banner.length;
    	swiper.swiperIndexBig(banner);
    });

	//点击返回主页面后重新刷新
	$(".backToIndex").click(function(){
		location.href = "index.html?stationId="+stationId+"&name="+name+"&isBig="+isBig;
	});
});