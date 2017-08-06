var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var xuanguanshu_mc = (function (_super) {
        __extends(xuanguanshu_mc, _super);
        function xuanguanshu_mc() {
            _super.call(this);
            this.id = 0;
            this.moviecliip = egret.GameMain.instance.getMcByName("mc_xuanguanshu");
            this.addChild(this.moviecliip);
            this.mc = (this.moviecliip.getChildByName("mc"));
            this.zhenzhao = this.moviecliip.getChildByName("zhenzhao");
            return;
        }
        return xuanguanshu_mc;
    })(egret.DisplayObjectContainer);
    egret.xuanguanshu_mc = xuanguanshu_mc;
    xuanguanshu_mc.prototype.__class__ = "egret.xuanguanshu_mc";
})(egret || (egret = {}));
