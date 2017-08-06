var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var gameArithmetic = (function (_super) {
        __extends(gameArithmetic, _super);
        function gameArithmetic() {
            _super.call(this);
        }
        gameArithmetic.addddd = function () {
            var shape;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    shape = new egret.Shape();
                    shape.graphics.beginFill(0xFBFF99);
                    shape.graphics.drawCircle(0, 0, 8);
                    shape.graphics.endFill();
                    shape.x = (63.85 + 26) * i + 290 - 131;
                    shape.y = (63.85 + 15) * j + 220;
                    egret.GameView.lineBallContainer.addChild(shape);
                }
            }
        };
        gameArithmetic.addBall = function () {
            gameArithmetic.linList = new Array();
            gameArithmetic.addBgball();
            gameArithmetic.addddd();
            gameArithmetic.addLine();
        };
        gameArithmetic.addBgball = function () {
            var arr = null;
            var Column = 0;
            var ball;
            var row = 0;
            while (row < 3) {
                arr = new Array();
                Column = 0;
                while (Column < 3) {
                    ball = new egret.GameBall();
                    egret.GameView.ballContainer.addChild(ball.movieclip);
                    arr.push(ball);
                    ball.movieclip.x = (ball.movieclip.width + 25) * row + 290 - 131;
                    ball.movieclip.gotoAndStop(3);
                    ball.idX = row;
                    ball.idY = Column;
                    ball.movieclip.y = (ball.movieclip.height + 15) * Column + 220;
                    Column++;
                }
                gameArithmetic.listBgBall.push(arr);
                row++;
            }
        };
        gameArithmetic.addLine = function () {
            var arr = egret.GameCheckpoint.readData();
            if (arr.length <= 0)
                return;
            gameArithmetic.lastBall = gameArithmetic.listBgBall[arr[1]][arr[2]];
            var line;
            var i = 0;
            var j = 0;
            var index = 2;
            var ball;
            while (index < arr[0] * 2) {
                i = arr[(index + 1)];
                j = arr[index + 2];
                line = new egret.GameLine();
                line.id = index;
                gameArithmetic.linWigth = line.movieclip.width;
                line.movieclip.x = gameArithmetic.lastBall.movieclip.x;
                line.movieclip.y = gameArithmetic.lastBall.movieclip.y;
                line.movieclip.gotoAndStop(2);
                egret.GameView.lineContainer.addChild(line.movieclip);
                egret.GameCheckpoint.linNum++;
                gameArithmetic.linList.push(line);
                ball = gameArithmetic.listBgBall[i][j];
                line.movieclip.rotation = Math.atan2(gameArithmetic.lastBall.movieclip.y - ball.movieclip.y, gameArithmetic.lastBall.movieclip.x - ball.movieclip.x) / Math.PI * 180 + 180;
                line.movieclip.scaleX = Math.sqrt((gameArithmetic.lastBall.movieclip.y - ball.movieclip.y) * (gameArithmetic.lastBall.movieclip.y - ball.movieclip.y) + (gameArithmetic.lastBall.movieclip.x - ball.movieclip.x) * (gameArithmetic.lastBall.movieclip.x - ball.movieclip.x)) / this.linWigth;
                ball.ifoccupy = true;
                gameArithmetic.lastBall.ifoccupy = true;
                gameArithmetic.lastBall = ball;
                index += 2;
            }
        };
        gameArithmetic.listBgBall = new Array();
        return gameArithmetic;
    })(egret.DisplayObjectContainer);
    egret.gameArithmetic = gameArithmetic;
    gameArithmetic.prototype.__class__ = "egret.gameArithmetic";
})(egret || (egret = {}));
