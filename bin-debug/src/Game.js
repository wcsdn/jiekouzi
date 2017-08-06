var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this);
            this.ifPass = false;
            this.lineId = 0;
            this.num2 = 0;
            this.shape1 = new egret.Shape();
            this.listBgBall = new Array();
            Game.PassList = new Array();
            this.init();
        }
        Game.prototype.init = function () {
            egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
            egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
            this.connectedBallList = new Array();
            this.connectedLineList = new Array();
            egret.GameView.ifComp = false;
            egret.GameView.addGameJm();
        };
        Game.prototype.gameStop = function () {
            if (this.ifStop) {
                this.removeEvent();
                this.ifStop = false;
            }
            else {
                egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
                egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
                egret.Vision.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
                this.ifStop = true;
            }
        };
        Game.prototype.back = function () {
            return;
        };
        Game.prototype.onUp = function (event) {
            this.ifDwon = false;
        };
        Game.prototype.onDown = function (event) {
            this.ifDwon = true;
        };
        Game.prototype.mouseHitBall = function () {
            var conunt1 = egret.gameArithmetic.listBgBall.length;
            if (conunt1 <= 0)
                return false;
            var index1 = 0;
            var index2 = 0;
            var ball;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    ball = egret.gameArithmetic.listBgBall[i][j];
                    if (ball.movieclip.hitTestPoint(Main.instance.gameMain.mouseX, Main.instance.gameMain.mouseY, true)) {
                        if (this.lastBall == null) {
                            this.lastX = ball.movieclip.x;
                            this.lastY = ball.movieclip.y;
                            this.lastBall = ball;
                        }
                        return true;
                    }
                }
            }
            return false;
        };
        Game.prototype.linHitBall = function (ball) {
            if (!ball || this.lastBall.movieclip.x == ball.movieclip.x && this.lastBall.movieclip.y == ball.movieclip.y)
                return false;
            var xx = (egret.Vision.stage.mouseX - ball.movieclip.x);
            var yy = (egret.Vision.stage.mouseY - ball.movieclip.y);
            if ((xx * xx + yy * yy) <= 800) {
                return true;
            }
            return false;
        };
        Game.prototype.onMove = function (event) {
            Main.instance.gameMain.mouseX = event.stageX;
            Main.instance.gameMain.mouseY = event.stageY;
            if (this.ifDwon && this.chackMouse()) {
                this.drawLin();
                this.GameIfWin();
            }
        };
        Game.prototype.chackMouse = function () {
            if (egret.Vision.stage.mouseX > 75 && egret.Vision.stage.mouseX < 680 && egret.Vision.stage.mouseY > 50 && egret.Vision.stage.mouseY <= 430) {
                return true;
            }
            return false;
        };
        Game.prototype.intersectionRectangle = function (target1, target2) {
            var bounds1 = target1.getBounds();
            var bounds2 = target2.getBounds();
            var po = target1.parent.localToGlobal(target1.x, target1.y);
            bounds1.x = po.x;
            bounds1.y = po.y;
            po = target2.parent.localToGlobal(target2.x, target2.y);
            bounds2.x = po.x;
            bounds2.y = po.y;
            var cc;
            if (cc < 1000) {
                this.shape1.graphics.clear();
                var shape2 = new egret.Shape();
                this.shape1.graphics.beginFill(0xff0000);
                this.shape1.graphics.drawRect(bounds1.x, bounds1.y, bounds1.width, bounds1.height);
                this.shape1.graphics.endFill();
                shape2.graphics.beginFill(0x00ff00);
                shape2.graphics.drawRect(bounds2.x, bounds2.y, bounds2.width, bounds2.height);
                shape2.graphics.endFill();
                Main.instance.addChild(this.shape1);
                Main.instance.addChild(shape2);
            }
            cc++;
            return bounds1.intersects(bounds2) || bounds2.intersects(bounds1);
        };
        Game.prototype.checkLine = function (lin1, lin2) {
            var bounds1 = lin1.movieclip.getBounds();
            var bounds2 = lin2.movieclip.getBounds();
            var po = lin1.movieclip.parent.localToGlobal(lin1.movieclip.x, lin1.movieclip.y);
            bounds1.x = po.x;
            bounds1.y = po.y;
            po = lin2.movieclip.parent.localToGlobal(lin2.movieclip.x, lin2.movieclip.y);
            bounds2.x = po.x;
            bounds2.y = po.y;
            if (bounds2.bottom == bounds1.bottom && bounds2.right == bounds1.right && bounds2.width == bounds1.width) {
                return true;
            }
            return false;
        };
        Game.prototype.GameIfWin = function () {
            var index = 0;
            var i = 0;
            var line1;
            var meLine;
            while (i < this.connectedLineList.length) {
                index = 0;
                while (index < egret.gameArithmetic.linList.length) {
                    line1 = egret.gameArithmetic.linList[index];
                    if (!line1.ifAddSore) {
                        meLine = this.connectedLineList[i];
                        //                        if(this.intersectionRectangle(meLine.mc.getChildByName("mc1"),line1.mc.getChildByName("mc1"))&&
                        //                            this.intersectionRectangle(meLine.mc.getChildByName("mc2"),line1.mc.getChildByName("mc2"))||
                        //                            this.intersectionRectangle(meLine.mc.getChildByName("mc1"),line1.mc.getChildByName("mc2"))&&
                        //                            this.intersectionRectangle(meLine.mc.getChildByName("mc2"),line1.mc.getChildByName("mc1")))
                        //                        {
                        if (this.checkLine(meLine, line1)) {
                            this.num2++;
                            line1.ifAddSore = true;
                        }
                    }
                    index++;
                }
                i++;
            }
            if (this.num2 == (egret.GameCheckpoint.readData()[0] - 1) && this.num2 == this.connectedLineList.length - 1) {
                egret.GameView.ifComp = false;
                this.win();
                egret.SoundManage.addjiekais();
                egret.SoundManage.addGsound();
                Game.PassList.push(egret.GameCheckpoint.checkPoint);
                this.num2 = 0;
                this.removeEvent();
            }
        };
        Game.prototype.drawLin = function () {
            if (!this.ifPass) {
                if (this.mouseHitBall()) {
                    this.ifPass = true;
                    this.lin = new egret.GameLine();
                    this.linWigth = this.lin.movieclip.width;
                    this.lin.movieclip.x = this.lastBall.movieclip.x;
                    this.lin.movieclip.y = this.lastBall.movieclip.y;
                    this.connectedLineList.push(this.lin);
                    egret.GameView.lineContainer.addChild(this.lin.movieclip);
                    this.lin.movieclip.gotoAndStop(3);
                }
            }
            if (this.lin != null && this.lastBall != null) {
                var index1 = 0;
                var index2 = 0;
                var ball;
                while (index1 < 3) {
                    index2 = 0;
                    while (index2 < 3) {
                        ball = egret.gameArithmetic.listBgBall[index1][index2];
                        if (this.linHitBall(ball)) {
                            ball.movieclip.gotoAndStop(1); //球变亮
                            this.lastBall.movieclip.gotoAndStop(1);
                            this.lin.movieclip.rotation = Math.atan2(ball.movieclip.y - this.lastBall.movieclip.y, ball.movieclip.x - this.lastBall.movieclip.x) / Math.PI * 180;
                            this.lin.movieclip.scaleX = Math.sqrt((ball.movieclip.y - this.lastBall.movieclip.y) * (ball.movieclip.y - this.lastBall.movieclip.y) + (ball.movieclip.x - this.lastBall.movieclip.x) * (ball.movieclip.x - this.lastBall.movieclip.x)) / this.linWigth;
                            if (this.ifChanegColor()) {
                                this.lin.movieclip.gotoAndStop(1);
                            }
                            this.lastLine = this.lin;
                            egret.SoundManage.addlin();
                            this.lastX = ball.movieclip.x;
                            this.lastY = ball.movieclip.y;
                            this.lastBall = ball;
                            this.connectedBallList.push(ball);
                            this.ifPass = false;
                            return;
                        }
                        index2++;
                    }
                    index1++;
                }
                this.lin.movieclip.rotation = Math.atan2(egret.Vision.stage.mouseY - this.lastBall.movieclip.y, egret.Vision.stage.mouseX - this.lastBall.movieclip.x) / Math.PI * 180;
                this.lin.movieclip.scaleX = Math.sqrt((egret.Vision.stage.mouseY - this.lastBall.movieclip.y) * (egret.Vision.stage.mouseY - this.lastBall.movieclip.y) + (egret.Vision.stage.mouseX - this.lastBall.movieclip.x) * (egret.Vision.stage.mouseX - this.lastBall.movieclip.x)) / this.linWigth;
            }
            return;
        };
        /**
         *当前 线和任意一条真线交融了
         * @return
         */
        Game.prototype.ifChanegColor = function () {
            var i = 0;
            var conunt = egret.gameArithmetic.linList.length;
            var line;
            while (i < conunt) {
                line = egret.gameArithmetic.linList[i];
                //                if (this.intersectionRectangle(this.lin.mc.getChildByName("mc1"), line.mc.getChildByName("mc1")) &&
                //                    this.intersectionRectangle(this.lin.mc.getChildByName("mc2"), line.mc.getChildByName("mc2")) ||
                //                    this.intersectionRectangle(this.lin.mc.getChildByName("mc1"), line.mc.getChildByName("mc2")) &&
                //                    this.intersectionRectangle(this.lin.mc.getChildByName("mc2"), line.mc.getChildByName("mc1"))) {
                if (this.checkLine(this.lin, line)) {
                    return true;
                }
                i++;
            }
            return false;
        };
        Game.prototype.tip2 = function () {
            var gotoFun;
            gotoFun = function (param1) {
                param1.gotoAndStop(2);
                param1.getChildByName("jiantou").visible = false;
                return;
            };
            egret.Tween.get(egret.gameArithmetic.linList[0]).wait(1000).call(gotoFun, this, egret.gameArithmetic.linList[0]);
            egret.gameArithmetic.linList[0].movieclip.gotoAndStop(1);
            egret.gameArithmetic.linList[(egret.gameArithmetic.linList.length - 1)].movieclip.gotoAndStop(1);
            var nnn = egret.gameArithmetic.linList[(egret.gameArithmetic.linList.length - 1)];
            egret.Tween.get(nnn).wait(1000).call(gotoFun, this, nnn);
            return;
        };
        Game.prototype.removeAllItem = function () {
            var i = 0;
            for (; i < egret.gameArithmetic.linList.length; i++) {
                egret.GameView.lineContainer.removeChild(egret.gameArithmetic.linList[i].movieclip);
            }
            for (i = 0; i < egret.gameArithmetic.listBgBall.length; i++) {
                for (var m = 0; m < egret.gameArithmetic.listBgBall[i].length; m++)
                    egret.GameView.ballContainer.removeChild(egret.gameArithmetic.listBgBall[i][m].movieclip);
            }
            for (i = 0; i < this.connectedLineList.length; i++) {
                egret.GameView.lineContainer.removeChild(this.connectedLineList[i].movieclip);
            }
            while (egret.GameView.lineBallContainer.numChildren > 0)
                egret.GameView.lineBallContainer.removeChildAt(0);
            egret.gameArithmetic.linList = new Array();
            egret.gameArithmetic.listBgBall = new Array();
            this.connectedLineList = new Array();
            while (egret.GameView.lineBallContainer.numChildren > 0)
                egret.GameView.lineBallContainer.removeChildAt(0);
        };
        Game.prototype.onTimer = function (e) {
            if (e === void 0) { e = null; }
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.stop();
            egret.Tween.removeTweens(egret.GameView.gamejm.body_mc);
            egret.Tween.removeTweens(egret.GameView.gamejm.underwear_mc);
            egret.Tween.removeTweens(egret.GameView.gamejm.hair_mc);
            egret.GameView.succeed();
            this.removeAllItem();
            if (egret.GameCheckpoint.totallevel < egret.GameCheckpoint.checkPoint)
                egret.GameCheckpoint.totallevel = egret.GameCheckpoint.checkPoint;
        };
        Game.prototype.win = function () {
            this.timer = new egret.Timer(2100, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            egret.GameCheckpoint.checkPoint++;
            egret.GameView.gamejm.guanka_btn.gotoAndStop(egret.GameCheckpoint.checkPoint);
            if (egret.GameCheckpoint.nowTimer >= 5) {
                this.timer.start();
            }
            this.removeAllItem();
            egret.GameView.gamejm.underwear_mc.getChildAt(0).gotoAndStop(2);
            egret.Tween.get(egret.GameView.gamejm.hair_mc).to({ x: 317 - 600 }, 2000);
            egret.Tween.get(egret.GameView.gamejm.underwear_mc).to({ x: 236 - 600 }, 2000);
            egret.Tween.get(egret.GameView.gamejm.body_mc).to({ x: 154 - 600 }, 2000);
            egret.GameView.gamejm.bg_mc.visible = false;
        };
        Game.prototype.removeEvent = function () {
            egret.Vision.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            egret.Vision.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDown, this);
            egret.Vision.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onUp, this);
        };
        return Game;
    })(egret.DisplayObjectContainer);
    egret.Game = Game;
    Game.prototype.__class__ = "egret.Game";
})(egret || (egret = {}));
