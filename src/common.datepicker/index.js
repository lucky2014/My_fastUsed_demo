define(function(require,exports,module){
    var $ = require("jquery");
    //日期控件
    require("../../../../common.lib/jquery.ui/datePicker.css");
    //小部件
    require("jqueryUiWidget");
    //base
    require("jqueryUiBase");
    
    function datepicker(sel){
        $(sel).datepicker({
            showOn: "both",
            dateFormat: 'yy-mm-dd', //日期格式
            buttonImage: "images/clock.png",
            buttonImageOnly: true,
            language: "zh-CN",
            zIndex: 1000,
            minDate: 0,
        });
    }
    return datepicker;
});