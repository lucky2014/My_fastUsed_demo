(function(){
	var config = {
		base: "../fastUsed_demo/src/",
		alias: {
			"jquery": "common.lib/jquery/jquery-1.8.3.min",
			"handlebars": "common.lib/handlebars/handlebars.seajs.min",
			"engine": "common.lib/setup/engine", //模板引擎
			"setup": "common.lib/setup/setup", //ajax配置
			"swiper": "common.swiper/swiper.min",
			"pagenation": "common.pagenation/jquery.pagination",
			"validator": "common.lib/jquery.ui/jquery.validate", //jQueryUI插件widget
			"datePicker": "common.lib/jquery.ui/datePicker", //jQueryUI日期插件
			"jqueryUiBase": "common.lib/jquery.ui/base", //jQueryUI插件base
			"jqueryUiWidget": "common.lib/jquery.ui/widget", //jQueryUI插件widget
			"PhotoClip": "common.photoClip/PhotoClip",
			"waterfall": "common.lib/boot/bootstrap-waterfall", //瀑布流
		}
	};

	seajs.config(config);
})();