define(function(require,exports,module){
	var $ = require("jquery");

    //上传有公章受函
    var ajaxFileUpload = require("../common.ajaxfileupload/index");
    $("#content_box").delegate("input[name=protocol]", "change", function() {
        var me = $(this);
        ajaxFileUpload("protocol", "card/uploadProtocol.do"); //activity/mainImgUpload.do  card/uploadLogo.do
    });

});