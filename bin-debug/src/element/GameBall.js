var egret;
(function (egret) {
    var GameBall = (function () {
        function GameBall() {
            this.id = 0;
            this.idX = 0;
            this.idY = 0;
            this.movieclip = egret.GameMain.instance.getMcByName("mc_smallball");
        }
        return GameBall;
    })();
    egret.GameBall = GameBall;
    GameBall.prototype.__class__ = "egret.GameBall";
})(egret || (egret = {}));
