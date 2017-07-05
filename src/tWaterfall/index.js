define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    
        require("waterfall");

    var Engine = require("engine");
    var box = Engine.init();
    
    //var formatImg = require("common.formatImg/index");
    var waterfallTpl = require("tWaterfall/data.tpl");
    var data = require("tWaterfall/data");

    var app = {
        init:function(params,url){
            //将内容渲染到DOM
            box.render($("#container"), data.result, waterfallTpl);
            $(".item").css("width",$(window).width()/2-5);

            $("#container").waterfall({
                itemClass: ".item",
                minColCount: 2,
                spacingHeight: 10,
                resizeable: true,
                ajaxCallback: function(success,end) {
                    
                }
            });
        }
    };

    app.init();
});