var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var GameLine = (function (_super) {
        __extends(GameLine, _super);
        function GameLine() {
            _super.call(this);
            this.id = 0;
            /**
             *占领
             */
            this.ifoccupy = false;
            this.movieclip = egret.GameMain.instance.getMcByName("mc_line");
        }
        Object.defineProperty(GameLine.prototype, "mc", {
            get: function () {
                var mcc = (this.movieclip.getChildAt(0));
                return mcc;
            },
            enumerable: true,
            configurable: true
        });
        return GameLine;
    })(egret.DisplayObjectContainer);
    egret.GameLine = GameLine;
    GameLine.prototype.__class__ = "egret.GameLine";
})(egret || (egret = {}));
