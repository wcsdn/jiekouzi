var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var Vision = (function (_super) {
        __extends(Vision, _super);
        function Vision() {
            _super.call(this);
        }
        /**
         *层级
         * @param param1
         */
        Vision.visionInit = function (param1) {
            Vision.stage = param1;
            var mainLay = new egret.DisplayObjectContainer();
            param1.addChild(mainLay);
            Vision.DPO_DIC[Vision.MAIN] = mainLay;
            var uiLay = new egret.DisplayObjectContainer();
            param1.addChild(uiLay);
            Vision.DPO_DIC[Vision.UI] = uiLay;
            Vision.TIPSLay = new egret.DisplayObjectContainer();
            param1.addChild(Vision.TIPSLay);
            Vision.DPO_DIC[Vision.TIPS] = Vision.TIPSLay;
            Vision.TIPSLay.touchEnabled = false;
            Vision.TIPSLay.touchChildren = false;
        };
        Vision.addView = function (param1, param2) {
            var obj = Vision.DPO_DIC[param1];
            obj.addChild(param2);
        };
        Vision.removeView = function (param1, param2) {
            var obj = null;
            if (param2 != null && param2.parent != null) {
                obj = Vision.DPO_DIC[param1];
                obj.removeChild(param2);
            }
        };
        Vision.MAIN = "MAIN";
        Vision.UI = "UI";
        Vision.TIPS = "TIPS";
        Vision.DPO_DIC = {};
        return Vision;
    })(egret.DisplayObjectContainer);
    egret.Vision = Vision;
    Vision.prototype.__class__ = "egret.Vision";
})(egret || (egret = {}));
