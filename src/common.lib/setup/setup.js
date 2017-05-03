define(function(require, exports, module) {
	var $ = require("jquery");
    var popUp = require("../../common.PopUp/index");

    var setupApp = {
        url:"http://wx.yinnima.com:8088/liujia-enterprise-server/", //测试
        //url: "http://www.iliujia.com/liujia-enterprise-server/", // 正式
        getQueryString: function(name) { //获取URL的参数，isEit
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            //return unescape(r[2]);
            return decodeURI(r[2]);
          }
          return null;
        },
        commonAjax: function(name, params, succCallback, errCallback){
            var me = this;
            $.ajax({  
                type: "post",  
                url: me.url+ name,  
                data: params,
                dataType: "json",  
                success: function(msg){
                    if(msg.resultCode == 1000){
                        //console.log(JSON.stringify(msg,null,2));
                        msg && succCallback(msg.returnObject);
                    }else if(msg.resultCode == 9998){ //系统异常或故障
                        popUp({
                            "title":"错误提示",
                            "content":"卡券创建不成功！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }, 
                complete: function (XHR, TS) { XHR = null },
                error: function (msg) {  
                    //alert(JSON.stringify(msg,null,2));
                    if(errCallback) errCallback(msg); 
                }  
            }); 
        },
        isIE: function(){ //判断浏览器是不是IE,暂时不需要
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
        }
    };

    $.ajaxSetup({
        error: function(jqXHR){  
            switch (jqXHR.status){  
                case(500):        
                    window.location.href="404.html";  
                    break;  
                case(401):
                    if($("body").attr("id") != ("index" || "price")){
                        window.location.href="../login.html";  
                    }else if($("body").attr("id") != ("index" || "price_child")){
                        window.location.href="login.html"; 
                    }
                    break;  
                case(404):  
                    window.location.href="404.html";  
                    break; 
                case(400):

                    var text = $.parseJSON( jqXHR.responseText );
                    text = text.returnObject ;
                    $("body").append('<div class="400Box" style="display:none;">'+text+'</div>');
                    $(".400Box").dialog({
                        modal: true,
                        title: "错误提示",
                        open: function (event, ui) {
                            $(".ui-dialog-titlebar-close", $(this).parent()).hide();
                        }
                    });
                    setTimeout(function(){
                        $(".400Box").dialog("close");
                    },2000);

                    break; 
            } 
        }
    });

    module.exports = setupApp;
});