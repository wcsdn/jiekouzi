var egret;
(function (egret) {
    var GameCheckpoint = (function () {
        function GameCheckpoint() {
        }
        GameCheckpoint.ifPassCheckpoint = function () {
            if (GameCheckpoint.nowLin >= GameCheckpoint.linNum) {
                return true;
            }
            return false;
        };
        GameCheckpoint.readBodydtata = function () {
            if (GameCheckpoint.checkPoint > 16) {
                GameCheckpoint.checkPoint = 16;
            }
            else {
                if (GameCheckpoint.checkPoint == 1) {
                    return ((GameCheckpoint.list = new Array(2, 1, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 2) {
                    return ((GameCheckpoint.list = new Array(1, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 3) {
                    return ((GameCheckpoint.list = new Array(1, 1, 3)));
                }
                ;
                if (GameCheckpoint.checkPoint == 4) {
                    return ((GameCheckpoint.list = new Array(1, 4, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 5) {
                    return ((GameCheckpoint.list = new Array(2, 2, 3)));
                }
                ;
                if (GameCheckpoint.checkPoint == 6) {
                    return ((GameCheckpoint.list = new Array(3, 2, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 7) {
                    return ((GameCheckpoint.list = new Array(2, 3, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 8) {
                    return ((GameCheckpoint.list = new Array(2, 2, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 9) {
                    return ((GameCheckpoint.list = new Array(2, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 10) {
                    return ((GameCheckpoint.list = new Array(3, 6, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 11) {
                    return ((GameCheckpoint.list = new Array(2, 5, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 12) {
                    return ((GameCheckpoint.list = new Array(3, 1, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 13) {
                    return ((GameCheckpoint.list = new Array(2, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 14) {
                    return ((GameCheckpoint.list = new Array(4, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 15) {
                    return ((GameCheckpoint.list = new Array(4, 1, 1)));
                }
                ;
            }
            ;
            //0 衣服 0-3
            //1头发 0-5
            //2身体0,2
            return (GameCheckpoint.list = new Array(GameCheckpoint.RandomNumber(1, 4), GameCheckpoint.RandomNumber(1, 6), GameCheckpoint.RandomNumber(1, 3)));
            ;
        };
        GameCheckpoint.RandomNumber = function (startNum, endNum) {
            if (endNum === void 0) { endNum = 0; }
            return Math.round(Math.random() * (endNum - startNum)) + startNum;
        };
        GameCheckpoint.readData = function () {
            if (GameCheckpoint.checkPoint > 16) {
                GameCheckpoint.checkPoint = 16;
            }
            else {
                if (GameCheckpoint.checkPoint == 1) {
                    return ((GameCheckpoint.list = new Array(5, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 2) {
                    return ((GameCheckpoint.list = new Array(7, 0, 0, 1, 1, 2, 2, 2, 1, 2, 0, 1, 0, 0, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 3) {
                    return ((GameCheckpoint.list = new Array(7, 0, 0, 0, 1, 0, 2, 1, 2, 1, 1, 1, 0, 0, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 4) {
                    return ((GameCheckpoint.list = new Array(7, 0, 0, 1, 0, 2, 1, 1, 2, 0, 2, 1, 1, 0, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 5) {
                    return ((GameCheckpoint.list = new Array(9, 0, 0, 0, 1, 0, 2, 1, 2, 1, 1, 1, 0, 2, 0, 2, 1, 2, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 6) {
                    return ((GameCheckpoint.list = new Array(9, 0, 0, 0, 1, 1, 1, 1, 0, 2, 0, 2, 1, 2, 2, 1, 2, 0, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 7) {
                    return ((GameCheckpoint.list = new Array(9, 0, 0, 0, 1, 0, 2, 1, 1, 2, 0, 2, 1, 2, 2, 1, 1, 0, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 8) {
                    return ((GameCheckpoint.list = new Array(13, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 1, 0, 2, 1, 2, 2, 2, 2, 1, 2, 0, 1, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 9) {
                    return ((GameCheckpoint.list = new Array(9, 2, 0, 2, 1, 1, 0, 0, 0, 1, 1, 0, 2, 1, 2, 2, 1, 2, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 10) {
                    return ((GameCheckpoint.list = new Array(14, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 2, 0, 2, 1, 2, 2, 1, 2, 0, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 11) {
                    return ((GameCheckpoint.list = new Array(10, 1, 2, 2, 1, 1, 0, 0, 1, 1, 2, 1, 1, 0, 2, 1, 2, 2, 2, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 12) {
                    return ((GameCheckpoint.list = new Array(12, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1, 0, 0, 1, 1, 2, 0, 2, 0, 1, 1, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 13) {
                    return ((GameCheckpoint.list = new Array(14, 0, 1, 1, 0, 2, 1, 1, 2, 0, 1, 1, 1, 0, 0, 0, 2, 1, 1, 2, 0, 2, 1, 2, 2, 1, 1, 0, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 14) {
                    return ((GameCheckpoint.list = new Array(10, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 1, 2, 0, 1, 0, 0, 1, 0, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 15) {
                    return ((GameCheckpoint.list = new Array(8, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 16) {
                    return ((GameCheckpoint.list = new Array(9, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 2, 0, 2, 2, 1, 1, 0)));
                }
                ;
                if (GameCheckpoint.checkPoint == 18) {
                    return ((GameCheckpoint.list = new Array(7, 14, 0, 1, 4, 6, 5, 2, 0, 3, 1, 6, 3, 5, 4, 0, 5, 8)));
                }
                ;
                if (GameCheckpoint.checkPoint == 19) {
                    return ((GameCheckpoint.list = new Array(7, 1, 0, 2, 5, 6, 3, 0, 1, 4, 2, 1, 3, 4, 5, 1, 6, 0, 5, 10)));
                }
                ;
                if (GameCheckpoint.checkPoint == 20) {
                    return ((GameCheckpoint.list = new Array(7, 1, 0, 2, 4, 6, 5, 3, 1, 0, 4, 5, 1, 2, 6, 3, 0, 6, 1, 4, 3, 2, 15, 5)));
                }
                ;
                if (GameCheckpoint.checkPoint == 21) {
                    return ((GameCheckpoint.list = new Array(8, 1, 4, 7, 6, 4, 0, 1, 3, 4, 5, 2, 4, 1, 2, 7, 1, 6, 3, 0, 14, 7)));
                }
                ;
                if (GameCheckpoint.checkPoint == 22) {
                    return ((GameCheckpoint.list = new Array(8, 2, 0, 2, 1, 4, 7, 5, 6, 3, 0, 6, 7, 1, 0, 5, 1, 6, 2, 5, 3, 2, 4, 5, 19, 1)));
                }
                ;
                if (GameCheckpoint.checkPoint == 23) {
                    return ((GameCheckpoint.list = new Array(8, 1, 5, 4, 1, 0, 2, 7, 6, 4, 3, 2, 1, 3, 6, 2, 11, 4)));
                }
                ;
                if (GameCheckpoint.checkPoint == 24) {
                    return ((GameCheckpoint.list = new Array(8, 1, 0, 1, 4, 5, 6, 7, 3, 0, 2, 1, 5, 2, 6, 3, 2, 3, 7)));
                }
                ;
                if (GameCheckpoint.checkPoint == 25) {
                    return ((GameCheckpoint.list = new Array(8, 1, 0, 1, 5, 6, 7, 4, 0, 2, 5, 3, 6, 4, 3, 2, 1, 6, 0, 3, 15, 10)));
                }
                ;
                if (GameCheckpoint.checkPoint == 26) {
                    return ((GameCheckpoint.list = new Array(8, 2, 0, 1, 3, 5, 7, 6, 4, 2, 0, 5, 6, 0, 7, 2, 1, 6, 2, 5, 1, 4, 3, 6, 2, 15)));
                }
                ;
                if (GameCheckpoint.checkPoint == 27) {
                    return ((GameCheckpoint.list = new Array(8, 2, 2, 5, 4, 0, 3, 5, 6, 7, 4, 2, 1, 0, 6, 4, 1, 6, 2, 3, 7, 1, 5, 2, 14, 3)));
                }
                ;
                if (GameCheckpoint.checkPoint == 28) {
                    return ((GameCheckpoint.list = new Array(9, 1, 5, 4, 2, 1, 0, 8, 7, 6, 4, 3, 1, 6, 3, 2, 6, 10, 7)));
                }
                ;
                if (GameCheckpoint.checkPoint == 29) {
                    return ((GameCheckpoint.list = new Array(9, 2, 1, 2, 3, 4, 5, 6, 1, 5, 8, 4, 0, 3, 7, 2, 0, 1, 4, 7, 8, 6, 0, 5, 7, 20, 2)));
                }
                ;
                if (GameCheckpoint.checkPoint == 30) {
                    return ((GameCheckpoint.list = new Array(9, 2, 5, 6, 1, 4, 5, 0, 3, 6, 7, 8, 5, 2, 1, 0, 7, 5, 1, 3, 7, 4, 3, 2, 7, 15, 19, 10)));
                }
                ;
            }
            ;
            return ((GameCheckpoint.list = new Array(0)));
        };
        GameCheckpoint.linNum = 0;
        GameCheckpoint.nowLin = 0;
        GameCheckpoint.checkPoint = 1;
        GameCheckpoint.passPonint = 1;
        GameCheckpoint.totallevel = 1;
        GameCheckpoint.nowTimer = 90;
        return GameCheckpoint;
    })();
    egret.GameCheckpoint = GameCheckpoint;
    GameCheckpoint.prototype.__class__ = "egret.GameCheckpoint";
})(egret || (egret = {}));
