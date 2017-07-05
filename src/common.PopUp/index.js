define(function(require,exports,module){
	var $ = require("jquery");
	
	var Engine = require("engine");
    require("../common.PopUp/index.css");
    var Engine = require("engine");
    var box = Engine.init();
    var mainTpl = require("../common.PopUp/index.tpl");
    box.render($("#pop"), "", mainTpl);
    var pop = require("../common.PopUp/pop.js");
    return pop;
});