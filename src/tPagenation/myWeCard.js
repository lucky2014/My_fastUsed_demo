define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");
	var Engine = require("engine");
    var box = Engine.init();
    var cardsList = require("../../src/wx_cardList/cardsList.tpl");
    var Pagenation = require("pagenation");
    
	var myWxCard = {
		PAGEDATA:null,//存贮构造分页对象
        TOTALNUM:0,//一共多少条数据
        PAGESIZE:10,//每页显示的个数
        CURPAGE:1,//当前页
        PAGEBOX:null,//分页对象
		getAjax: function(pageNum, pageSize){
			var me = this;
			var params = {
				cardType: "",
				pageNum: pageNum,
				pageSize: pageSize
			};

			setup.commonAjax("card/qrySubCardList.do", params, function(msg){
				console.log(JSON.stringify(msg,null,2));
				me.TOTALNUM = msg.page.total;

                me.PAGEDATA.setPaging({
                    total: me.TOTALNUM, 
                    page: me.CURPAGE, 
                    size: me.PAGESIZE
                });


            	if(msg && msg.data.length > 0){
            		box.render($("#tab0Parent tbody"), msg, cardsList);  //我的微信卡券列表
            	}else{
            		$("#tab0Parent tbody").html("");
            		$("#tab0Parent .hide").removeClass("hide");
            	}
            });
		},		
		pagenation: function(totalNumber){
			var me=this;
            var _size = me.PAGESIZE, _total = me.TOTALNUM;

            var tar = $("#pagination");

            if(tar.data("pagesize")){
                _size = tar.data("pagesize");
            }else{
                tar.data("pagesize",_size);
            }
            var pageData = new Pagenation(tar, {
                page : me.CURPAGE,
                redirectUrl : '',
                sizeList : [10,15,20],//For pagesize option select setting use!
                type : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size : _size,
                showOnePage:true,
                showQuickTrigger: false,
                onPageChanged:function(page){
                    me.CURPAGE = page;
                    me.PAGESIZE = tar.data("pagesize");
                    me.getAjax(page,10);
                }
            });
            me.PAGEDATA = pageData;
		},
	}
	myWxCard.pagenation(myWxCard.TOTALNUM);  
	myWxCard.getAjax(1, 10);

});
