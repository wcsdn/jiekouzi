var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var GameNum = (function (_super) {
        __extends(GameNum, _super);
        function GameNum(param1) {
            if (param1 === void 0) { param1 = 0; }
            _super.call(this);
            this.id = 100000;
            this.sore = 0;
            this.listNum = new Array();
            this.sore = param1;
            return;
        }
        GameNum.prototype.addnum = function () {
            var numMC;
            var soreStr = this.sore + "";
            var index = 0;
            while (index < soreStr.length) {
                numMC = egret.GameMain.instance.getMcByName("mc_num");
                numMC.x = 45 * index;
                this.addChild(numMC);
                numMC.gotoAndStop((parseInt(soreStr.charAt(index)) + 1));
                this.listNum.push(numMC);
                index++;
            }
        };
        GameNum.prototype.changeNum = function (param1) {
            if (param1 === void 0) { param1 = 0; }
            var index = 0;
            var subSore = param1 + "";
            if (subSore.length != this.id) {
                this.id = subSore.length;
                this.removeNum();
                this.addnum();
            }
            if (param1 <= 9) {
                this.listNum[(this.listNum.length - 1)].gotoAndStop((parseInt(subSore.charAt(index)) + 1));
                this.listNum[0].gotoAndStop(1);
            }
            else {
                index = 0;
                while (index < this.listNum.length) {
                    this.listNum[index].gotoAndStop((parseInt(subSore.charAt(index)) + 1));
                    index++;
                }
            }
        };
        GameNum.prototype.removeNum = function () {
            var num = this.listNum.length - 1;
            while (num >= 0) {
                this.removeChild(this.listNum[num]);
                this.listNum.splice(num, 1);
                num = num - 1;
            }
        };
        return GameNum;
    })(egret.DisplayObjectContainer);
    egret.GameNum = GameNum;
    GameNum.prototype.__class__ = "egret.GameNum";
})(egret || (egret = {}));
