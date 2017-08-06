var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var GameMain = (function (_super) {
        __extends(GameMain, _super);
        function GameMain() {
            _super.call(this);
            this.mouseX = 0;
            this.mouseY = 0;
            GameMain.instance = this;
            this.main1();
        }
        GameMain.prototype.getMcByName = function (nameStr) {
            //var mc:MovieClip =	new (<any><any> <MovieClip><any> ((getDefinitionByName(nameStr)))());
            //mc.stop();
            return Main.instance.getMCByName(nameStr);
        };
        GameMain.prototype.getMcByName2 = function (nameStr) {
            var mc = new (((egret.getDefinitionByName(nameStr)))());
            return mc;
        };
        GameMain.prototype.init1 = function (event) {
            if (event === void 0) { event = null; }
            egret.Vision.visionInit(this);
            this.touchEnabled = true;
            egret.GameView.init();
            egret.GameView.gameLogo();
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init1, this);
        };
        GameMain.prototype.main1 = function () {
            if (this.stage)
                this.init1();
            else
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init1, this);
        };
        GameMain.prototype.setService = function (param1) {
            GameMain.openService = param1;
            return;
        };
        return GameMain;
    })(egret.DisplayObjectContainer);
    egret.GameMain = GameMain;
    GameMain.prototype.__class__ = "egret.GameMain";
})(egret || (egret = {}));
