define(function(require,exports,module){
	var $ = require("jquery");
    var setup = require("setup");

    //判断是不是编辑
    var cardId = setup.getQueryString("cardId");

    var cardName = "";
    setup.commonAjax("card/getCardInfo.do", {cardId: cardId},function(msg){
        //console.log(JSON.stringify(msg,null,2));
        if(msg){
            //卡券选择
            var cardName = $(".first_cate li[data-type="+msg.tPid+"]").html();
            $(".primary_category i").attr("data-type",msg.tPid).html(cardName);
            $("input[name=primary_category]").hide();
            $(".primary").append('<div class="maskSpan1"></div>'); 
            if(msg.tCid){
                $("#getProduct .second[data-type="+msg.tPid+"]").show().siblings(".second").hide();
                var tCid = $("#getProduct li[data-type="+msg.tCid+"]").html();
                var cost = $("#getProduct li[data-type="+msg.tCid+"]").attr("cost");
                $("#getProduct .second[data-type="+msg.tPid+"]").find("i").attr("data-type",msg.tCid).html(tCid).attr("cost", cost);
                $("input[name=secondary_category]").hide();
                $("input[name=cost]").val(cost);
                $("#cost").hide();
                $("#getProduct").append('<div class="maskSpan"></div>'); 
                $("#getProduct .maskSpan").show();
            }else{
                $("#getProduct .maskSpan,#getProduct .second").hide();
                $("#cost .inputBox .cost").val(msg.cost);
                $("#cost").show();
                $("#getProduct .maskSpan").hide();
            }
            //标题不能改
            $(".tit .maskSpan1").show();
            
            
            //卡券名称
            $(".inputBox .title").val(msg.title);
            
            //有效期
            if(msg.days){
                $(".button1.effectiveType[effectivetype=1]").find("em").removeClass("hide");
                $(".button1.effectiveType[effectivetype=2]").find("em").addClass("hide");
                $(".button1.effectiveType .maskSpan").hide();
                $("#startTime,#endTime").removeAttr("required").val("");
                $("#getCardDaysSec i").html(msg.days+"天").attr("data-type", msg.days);
                $(".second div[effectivetype=2]").addClass("active").siblings(".second div[effectivetype=1]").removeClass("active"); 

            }else if(msg.startTime || msg.endTime){
                 $("#startTime").val(msg.startTime && msg.startTime.slice(0,10));
                 $("#endTime").val(msg.endTime && msg.endTime.slice(0,10));

                //小部件
                require("jqueryUiWidget");
                //base
                require("jqueryUiBase");
                require("datePicker");

                $("#endTime").datepicker({
                    changeMonth: false,
                    numberOfMonths: 1,
                    minDate: new Date(msg.endTime && msg.endTime.slice(0,10)),
                });

                $(".second div[effectivetype=1]").addClass("active").siblings(".second div[effectivetype=2]").removeClass("active");
                $(".button1.effectiveType[effectivetype=1]").find("em").addClass("hide");
                $(".button1.effectiveType[effectivetype=2]").find("em").removeClass("hide");
            }

            //可用时段
            if(msg.limitDays){
                $(".dayLimitParent .but1 em").removeClass("hide");
                $(".dayLimitParent .but2 em").addClass("hide");
                
                var limitDays = msg.limitDays.split(",");
                var limitTimes = msg.limitTimes && msg.limitTimes.split(",");
                $(".dayLimitParent .but2").addClass("active").siblings(".but1").removeClass("active");
                $("#dayLimit, #add").removeClass("hide");
                $("#dayLimit input").each(function(){ 
                    var isLimit = $("#dayLimit input").attr("value");
                    if($.inArray(isLimit, limitDays) == -1){
                        this.attr("checked","");
                    }else{
                        for(var i=0;i<limitDays.length;i++){
                            $("#dayLimit input[value='"+limitDays[i]+"']").attr("checked","checked");
                        }
                    }
                });
                if(limitTimes.length > 0){
                    $("#timeLimit").show();
                    if(limitTimes.length == 1){
                        $(".timeLimit1,#del").show();
                        $("#timeLimit input[name=js_hour_start1]").val(limitTimes[0].split("-")[0]);
                        $("#timeLimit input[name=js_hour_end1]").val(limitTimes[0].split("-")[1]);
                    }else{
                        $(".timeLimit1,.timeLimit2,#del").show();
                        $("#timeLimit input[name=js_hour_start1]").val(limitTimes[0].split("-")[0]);
                        $("#timeLimit input[name=js_hour_end1]").val(limitTimes[0].split("-")[1]);
                        $("#timeLimit input[name=js_hour_start2]").val(limitTimes[1].split("-")[0]);
                        $("#timeLimit input[name=js_hour_end2]").val(limitTimes[1].split("-")[1]);
                    }
                }else{
                    $("#timeLimit").hide();
                }
            }else{
                $(".dayLimitParent .but1 em").addClass("hide");
                $(".dayLimitParent .but2 em").removeClass("hide");
                $(".dayLimitParent .but1").addClass("active").siblings(".but2").removeClass("active");
                $("#dayLimit,.timeLimit1,.timeLimit2,#del").addClass("hide");
            }
            //卡券数量
            $("#cardNum").val(msg.cardNum);
            //领劵限制
            $("#limit").val(msg.getLimit);
            //使用须知
            $(".inputBox .remark").val(msg.remark);

            //卡券颜色
            var colorHtml = $(".first_cate li[data-type="+msg.color+"]").html();
            $(".primary_color i").attr("data-type", msg.color).html(colorHtml);

            $(".cardNumEm").removeClass("hide");
            return msg.cardType;
        }
    });
});