var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var SoundManage = (function (_super) {
        __extends(SoundManage, _super);
        function SoundManage() {
            _super.call(this);
            return;
        }
        SoundManage.addBgSound = function () {
            // var _loc_1:* = new bgsound();
            // bgCh = _loc_1.play(0, 999);
            return;
        };
        SoundManage.timeOver = function () {
            //var _loc_1:* = new timeover();//倒计时
            // _loc_1.play();
            return;
        };
        SoundManage.bgStop = function () {
            //SoundManage.bgCh.stop();
            return;
        };
        SoundManage.gameOverS = function () {
            //  var _loc_1:* = new oversound();
            //  _loc_1.play();
            return;
        };
        SoundManage.addGsound = function () {
            var _loc_1 = null;
            var _loc_2 = null;
            if (Math.random() < 0.5) {
            }
            else {
            }
            return;
        };
        SoundManage.addjiekais = function () {
            //var _loc_1:* = new jiekai();
            // _loc_1.play();
            return;
        };
        SoundManage.addlin = function () {
            // var _loc_1:* = new linsound();
            // _loc_1.play();
            return;
        };
        return SoundManage;
    })(egret.DisplayObjectContainer);
    egret.SoundManage = SoundManage;
    SoundManage.prototype.__class__ = "egret.SoundManage";
})(egret || (egret = {}));
