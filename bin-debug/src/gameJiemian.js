var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var gameJiemian = (function (_super) {
        __extends(gameJiemian, _super);
        function gameJiemian() {
            _super.call(this);
            this.movieclip = egret.GameMain.instance.getMcByName("spr_gameJiemian");
            this.music_btn = (this.movieclip.getChildByName("music_btn"));
            this.hair_mc = (this.movieclip.getChildByName("hair_mc"));
            this.tip_btn = (this.movieclip.getChildByName("tip_btn"));
            this.tip_btn.touchEnabled = true;
            this.bg_mc = (this.movieclip.getChildByName("bg_mc"));
            this.guanqiaTxt = this.movieclip.getChildByName("guanqiaTxt");
            this.guanka_btn = (this.movieclip.getChildByName("guanka_btn"));
            this.body_mc = (this.movieclip.getChildByName("body_mc"));
            this.underwear_mc = (this.movieclip.getChildByName("underwear_mc"));
            this.again_btn = (this.movieclip.getChildByName("again_btn"));
            this.again_btn.touchEnabled = true;
            this.music_btn.touchEnabled = true;
            this.music_btn.stop();
            //this.tip_btn.stop();
            //this.again_btn.stop();
            return;
        }
        return gameJiemian;
    })(egret.DisplayObjectContainer);
    egret.gameJiemian = gameJiemian;
    gameJiemian.prototype.__class__ = "egret.gameJiemian";
})(egret || (egret = {}));
