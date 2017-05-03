(function(){
	var config = {
		//base: "../../",
		alias: {
			"jquery": "jquery/jquery-1.8.3.min",
			"handlebars": "handlebars/handlebars.seajs.min",
			"engine": "setup/engine", //模板引擎
			"setup": "setup/setup", //ajax配置
			"swiper": "src/common.swiper/swiper.min",
			"pagenation": "../../../common.pagenation/jquery.pagination",
			"validator": "jquery.ui/jquery.validate", //jQueryUI插件widget
			"datePicker": "jquery.ui/datePicker", //jQueryUI日期插件
			"jqueryUiBase": "jquery.ui/base", //jQueryUI插件base
			"jqueryUiWidget": "jquery.ui/widget", //jQueryUI插件widget
		}
	};

	seajs.config(config);
})();