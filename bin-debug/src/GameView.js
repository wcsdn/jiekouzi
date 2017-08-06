var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var egret;
(function (egret) {
    var GameView = (function (_super) {
        __extends(GameView, _super);
        function GameView() {
            _super.call(this);
        }
        GameView.gotoServer = function () {
            try {
                var urlreq = new egret.URLRequest();
                //这里要传过去得分
                urlreq.url = "./launcher/server.php?Point=" + egret.GameCheckpoint.checkPoint;
                this.urlloader.load(urlreq);
                this.urlloader.addEventListener(egret.Event.COMPLETE, this.onServerComplete, this);
            }
            catch (e) {
                console.log(e);
            }
        };
        GameView.onServerComplete = function (event) {
            try {
                console.log(this.urlloader.data);
                eval("var data = " + this.urlloader.data);
            }
            catch (e) {
                console.log(e);
            }
            //注意服务器权限，php进程需要对launcher文件夹有创建db文件的权限 ，创建的文件应该有写入权限。简单处理的方法是 chmod -R 755
            //第一次访问的时候会创建数据库，第二次就会开始插入数据了。
        };
        GameView.addTime = function () {
            GameView.Time.addEventListener(egret.TimerEvent.TIMER, GameView.onTimer, GameView);
            GameView.Time.start();
            GameView.gameN = new egret.GameNum(egret.GameCheckpoint.nowTimer);
            GameView.logoContainer.addChild(GameView.gameN);
            GameView.gameN.addnum();
            GameView.gameN.x = 380;
            return;
        };
        GameView.onTimer = function (event) {
            egret.GameCheckpoint.nowTimer--;
            GameView.gameN.changeNum(egret.GameCheckpoint.nowTimer);
            if (egret.GameCheckpoint.nowTimer == 10)
                egret.SoundManage.timeOver();
            if (egret.GameCheckpoint.nowTimer <= 0) {
                GameView.GameEnd();
                GameView.Time.stop();
            }
        };
        GameView.init = function () {
            egret.Vision.addView("MAIN", GameView.backContainer);
            egret.Vision.addView("MAIN", GameView.container);
            egret.Vision.addView("MAIN", GameView.lineContainer);
            egret.Vision.addView("MAIN", GameView.lineBallContainer);
            egret.Vision.addView("MAIN", GameView.ballContainer);
            egret.Vision.addView("MAIN", GameView.logoContainer);
        };
        GameView.onComplete = function (event) {
            GameView.ifComplete = true;
        };
        /**
         *游戏开始
         */
        GameView.gameLogo = function () {
            GameView.gameCover();
            egret.SoundManage.addBgSound();
        };
        GameView.gameCover = function () {
            GameView.mc = egret.GameMain.instance.getMcByName("spr_fengm");
            GameView.mc.getChildByName("play1").touchEnabled = true;
            GameView.mc.getChildByName("play2").touchEnabled = true;
            GameView.container.addChild(GameView.mc);
            GameView.mc.getChildByName("play1").addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play1Click, GameView);
            GameView.mc.getChildByName("play2").addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play2Click, GameView);
        };
        GameView.tuijianClick = function (event) {
            return;
        };
        GameView.play1Click = function (event) {
            GameView.mc.removeEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play1Click, GameView);
            GameView.container.removeChild(GameView.mc);
            GameView.game = new egret.Game();
            GameView.addTime();
        };
        //更多游戏
        GameView.play2Click = function (event) {
            GameView.gotoServer();
            //this.navigateToURL(new URLRequest("http://www.dijuguotang.com"));
            if (GameView.isClick) {
                GameView.weixinHideOptionMenu();
                GameView.isClick = false;
            }
            else {
                GameView.share(egret.GameCheckpoint.checkPoint);
                GameView.isClick = true;
                GameView.weixinShowOptionMenu();
            }
        };
        GameView.addGameJm = function () {
            var miss;
            miss = function () {
                if (!GameView.ifSucceed) {
                    GameView.gamejm.bg_mc.visible = true;
                    egret.gameArithmetic.addBall(); //GameCheckpoint.readData()[0]
                    egret.Tween.removeTweens(GameView.gamejm.body_mc);
                    egret.Tween.removeTweens(GameView.gamejm.underwear_mc);
                    egret.Tween.removeTweens(GameView.gamejm.hair_mc); //TweenLite.killTweensOf
                    GameView.ifComp = true;
                }
                return;
            };
            if (GameView.gamejm) {
                if (GameView.gamejm.movieclip.parent)
                    GameView.gamejm.movieclip.parent.removeChild(GameView.gamejm.movieclip);
                GameView.gamejm.movieclip.removeEventListener(egret.TouchEvent.TOUCH_TAP, GameView.gameClick, GameView);
            }
            GameView.gamejm = new egret.gameJiemian();
            GameView.container.addChild(GameView.gamejm.movieclip);
            var arr = egret.GameCheckpoint.readBodydtata();
            GameView.gamejm.guanka_btn.gotoAndStop(egret.GameCheckpoint.checkPoint);
            GameView.gamejm.movieclip.addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.gameClick, GameView);
            GameView.gamejm.body_mc.gotoAndStop(arr[2]);
            GameView.gamejm.hair_mc.gotoAndStop(arr[1]);
            GameView.gamejm.underwear_mc.gotoAndStop(arr[0]);
            GameView.gamejm.underwear_mc.getChildAt(0).gotoAndStop(1);
            GameView.gamejm.body_mc.x = 754;
            GameView.gamejm.hair_mc.x = 917;
            if (!GameView.ifPlay)
                GameView.gamejm.music_btn.gotoAndStop(3);
            else
                GameView.gamejm.music_btn.gotoAndStop(1);
            GameView.gamejm.underwear_mc.x = 836;
            GameView.gamejm.bg_mc.visible = false;
            egret.Tween.get(GameView.gamejm.body_mc).to({ x: 23 }, 2000);
            egret.Tween.get(GameView.gamejm.underwear_mc).to({ x: 105 }, 2000);
            egret.Tween.get(GameView.gamejm.hair_mc).to({ x: 186 }, 2000).call(miss);
            //2 Tween的实现和Flash差异很大，所有时间都以毫秒为单位
            //3 egret.Tween.get(sprite).wait(2000).to({x:100},1500).call(onComplete);
            //egret.Tween.to(GameView.gamejm.body_mc, 2, {x:23});//23  154
            //egret.Tween.to(GameView.gamejm.underwear_mc, 2, {x:105});//236
            //egret.Tween.to(GameView.gamejm.hair_mc, 2, {x:186, onComplete:miss});//317
            GameView.gamejm.guanka_btn.visible = true;
            GameView.share(egret.GameCheckpoint.checkPoint);
        };
        GameView.gameClick = function (event) {
            if (event.target.name == "tip_btn") {
                //GameView.back();
                if (GameView.ifComp) {
                    if (egret.GameCheckpoint.nowLin == 0 && !GameView.ifTip) {
                        GameView.ifTip = true;
                        GameView.getTip();
                    }
                }
            }
            else if (event.target.name == "again_btn") {
                if (GameView.ifComp) {
                    GameView.ifComp = false;
                    GameView.remove();
                    GameView.game = new egret.Game();
                }
            }
            else if (event.target.name == "stop_btn") {
                GameView.game.gameStop();
            }
            else if (event.target.name == "gantan_btn") {
                GameView.game.tip2();
            }
            else if (event.target.name == "music_btn") {
                if (GameView.ifPlay) {
                    GameView.gamejm.music_btn.gotoAndStop(3);
                    egret.SoundManage.bgStop();
                    GameView.ifPlay = false;
                }
                else {
                    GameView.gamejm.music_btn.gotoAndStop(1);
                    egret.SoundManage.addBgSound();
                    GameView.ifPlay = true;
                }
            }
            else if (event.target.name == "next_btn") {
            }
            else if (event.target.name == "playmore") {
            }
            else if (event.target.name == "replay_btn") {
                GameView.replayButtClick(); //重新开始
            }
        };
        GameView.getTip = function () {
            var id = 0;
            var miss;
            miss = function (param1) {
                var mc = param1;
                var _loc_4 = id + 1;
                id = _loc_4;
                mc.gotoAndStop(1);
                if (id >= egret.gameArithmetic.linList.length) {
                    var Change = function () {
                        var i = 0;
                        while (i < egret.gameArithmetic.linList.length) {
                            egret.gameArithmetic.linList[i].movieclip.gotoAndStop(2);
                            GameView.ifTip = false;
                            i++;
                        }
                        return;
                    };
                    egret.Tween.get(mc).wait(1000).call(Change);
                }
                return;
            };
            id;
            var i = 0;
            while (i < egret.gameArithmetic.linList.length) {
                //TweenLite.to(gameArithmetic.linList[i], 1, {delay:i, onComplete:miss, onCompleteParams:[gameArithmetic.linList[i]]});
                egret.Tween.get(egret.gameArithmetic.linList[i]).wait(1000).to({ x: 100 }, 1000).call(miss, this, egret.gameArithmetic.linList[i]);
                i++;
            }
            return;
        };
        GameView.back = function () {
            GameView.changeCheckpoint();
        };
        GameView.changeCheckpoint = function () {
            var xgsMC;
            GameView.mc = egret.GameMain.instance.getMcByName("spr_changeguanka"); //new changeguanka();
            GameView.container.addChild(GameView.mc);
            var index = 0;
            while (index < 16) {
                xgsMC = new egret.xuanguanshu_mc();
                xgsMC.zhenzhao.alpha = 0;
                GameView.mc.addChild(xgsMC);
                xgsMC.x = (xgsMC.width + 25) * (index % 4) + 170 - 131;
                xgsMC.y = (xgsMC.height + 15) * parseInt("" + (index / 4)) + 80;
                xgsMC.mc.gotoAndStop(index + 2);
                GameView.xuanguanList.push(xgsMC);
                xgsMC.addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.onClick, GameView);
                xgsMC.id = index;
                index = index + 1;
            }
            var _loc_2 = 0;
            while (_loc_2 < egret.Game.PassList.length) {
                GameView.xuanguanList[(egret.Game.PassList[_loc_2] - 1)].zhenzhao.alpha = 0.6;
                _loc_2 = _loc_2 + 1;
            }
            return;
        };
        GameView.remove = function () {
            GameView.xuanguanList = new Array();
            var i = 0;
            for (; i < egret.gameArithmetic.linList.length; i++) {
                GameView.lineContainer.removeChild(egret.gameArithmetic.linList[i].movieclip);
            }
            for (i = 0; i < egret.gameArithmetic.listBgBall.length; i++) {
                for (var m = 0; m < 3; m++)
                    GameView.ballContainer.removeChild(egret.gameArithmetic.listBgBall[i][m].movieclip);
            }
            for (i = 0; i < GameView.game.connectedLineList.length; i++) {
                GameView.lineContainer.removeChild(GameView.game.connectedLineList[i].movieclip);
            }
            if (GameView.gamejm && GameView.gamejm.movieclip) {
                if (GameView.gamejm.movieclip.parent)
                    GameView.gamejm.movieclip.parent.removeChild(GameView.gamejm.movieclip);
            }
            while (GameView.lineBallContainer.numChildren > 0)
                GameView.lineBallContainer.removeChildAt(0);
            egret.gameArithmetic.ballList = new Array();
            egret.gameArithmetic.linList = new Array();
            GameView.game.connectedLineList = new Array();
            egret.gameArithmetic.listBgBall = new Array();
            GameView.mc.removeEventListener(egret.TouchEvent.TOUCH_TAP, egret.GameView.succedClick, GameView);
            if (GameView.game) {
                GameView.game.removeEvent();
            }
            egret.GameCheckpoint.linNum = 0;
            egret.GameCheckpoint.nowLin = 0;
            return;
        };
        GameView.onClick = function (event) {
            egret.GameCheckpoint.checkPoint = event.currentTarget.id + 1;
            GameView.remove();
            GameView.container.removeChild(GameView.mc);
            GameView.game = new egret.Game();
            return;
        };
        GameView.succeed = function () {
            if (GameView.gamejm.movieclip.parent == GameView.container) {
                GameView.container.removeChild(GameView.gamejm.movieclip);
            }
            if (!GameView.ifSucceed) {
                GameView.game = new egret.Game();
            }
        };
        GameView.GameEnd = function () {
            if (GameView.ifComplete) {
                // GameView.logoContainer.addChild(GameView.my_load);
                // my_load.y = 200;
                GameView.ifComplete = false;
            }
            egret.SoundManage.gameOverS();
            GameView.gameN.visible = false;
            GameView.mc = egret.GameMain.instance.getMcByName("spr_succeed1");
            ;
            GameView.ifSucceed = true;
            //GameView.mc.x = 75;
            //GameView.mc.y = 20;
            GameView.mc.buttonMode = true;
            GameView.mc.getChildByName("replay_btn").buttonMode = true;
            GameView.mc.getChildByName("playmore").buttonMode = true;
            // GameView.gamejm.getChildByName("guanka_btn").visible = false;
            // if (gamejm.parent == container){
            GameView.container.addChild(GameView.mc);
            // }
            GameView.mc.getChildByName("replay_btn").touchEnabled = true;
            GameView.mc.getChildByName("playmore").touchEnabled = true;
            GameView.mc.getChildByName("replay_btn").addEventListener(egret.TouchEvent.TOUCH_TAP, function aaa() {
                GameView.replayButtClick();
            }, this);
            GameView.mc.getChildByName("playmore").addEventListener(egret.TouchEvent.TOUCH_TAP, function bbb() {
                //this.navigateToURL(new URLRequest("http://www.dijuguotang.com"));
            }, this);
            GameView.addNumEnd();
            GameView.remove();
        };
        GameView.replayButtClick = function () {
            if (GameView.gamejm.parent)
                GameView.container.removeChild(GameView.gamejm);
            if (GameView.mc.parent)
                GameView.container.removeChild(GameView.mc);
            egret.GameCheckpoint.nowTimer = 90;
            egret.GameCheckpoint.checkPoint = 1;
            GameView.gameN.changeNum(egret.GameCheckpoint.nowTimer);
            GameView.gameN.visible = true;
            GameView.Time.start();
            GameView.game = new egret.Game();
            GameView.ifSucceed = false;
        };
        GameView.addNumEnd = function () {
            var gnum = new egret.GameNum((egret.GameCheckpoint.checkPoint - 1));
            GameView.mc.addChild(gnum);
            gnum.x = 380;
            gnum.y = 50;
            gnum.addnum();
        };
        GameView.share = function (val) {
            var self = this;
            WeixinApi.ready(function (api) {
                var info = new WeixinShareInfo();
                info.title = "看你有多快"; //分享的标题 长度不能超过512字节
                //两种取数据的方法
                var desc = "";
                if (egret.GameCheckpoint.checkPoint < 3) {
                    desc += "这是一个神一样的测试，让其他朋友们也放松一下吧！！！";
                }
                else if (egret.GameCheckpoint.checkPoint < 9) {
                    desc += "这速度充其量也就是个屌丝，找朋友帮忙看看吧！";
                }
                else if (egret.GameCheckpoint.checkPoint < 15) {
                    desc += " 你已经跨过屌丝的门槛了，果然是玉树临风啊！！！";
                }
                else {
                    desc += "哈哈哈，还有谁？还有谁--能超越哥的传奇,完爆各国情圣，" + "妹子非我莫属，妈妈再也不用担心抱孙子的事~(≧▽≦)/~啦啦啦";
                }
                info.desc = desc; //分享的内容 长度不能超过1K
                info.link = "http://www.dijuguotang.com/jiekouzi"; //分享的连接
                info.imgUrl = "http://www.dijuguotang.com/jiekouzi/logo.png"; //分享图片的地址 图片大小不能超过32k
                // 分享的回调
                var wxCallbacks = new WeixinShareCallbackInfo();
                wxCallbacks.confirm = function (resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                };
                wxCallbacks.cancel = function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                };
                // 整个分享过程结束
                wxCallbacks.all = function (resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                };
                // 分享操作开始之前
                wxCallbacks.ready = function () {
                    // 你可以在这里对分享的数据进行重组
                };
                // 分享被用户自动取消
                wxCallbacks.cancel = function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                };
                // 点击分享到腾讯微博，会执行下面这个代码
                api.shareToFriend(info, wxCallbacks);
                //点击分享到朋友圈，会执行下面这个代码
                api.shareToTimeline(info, wxCallbacks);
            });
        };
        GameView.weixinHideOptionMenu = function () {
            // 所有功能必须包含在 WeixinApi.ready 中进行
            WeixinApi.ready(function (Api) {
                // 隐藏右上角popup菜单入口
                Api.hideOptionMenu();
                // 隐藏浏览器下方的工具栏
                Api.hideToolbar();
                // 获取网络状态
                Api.getNetworkType(function (network) {
                    // 拿到 network 以后，做任何你想做的事
                });
            });
        };
        GameView.weixinShowOptionMenu = function () {
            // 所有功能必须包含在 WeixinApi.ready 中进行
            WeixinApi.ready(function (Api) {
                Api.showOptionMenu();
                // 隐藏浏览器下方的工具栏
                Api.showToolbar();
            });
        };
        GameView.succedClick = function (event) {
            if (event.target.name == "tip_btn") {
            }
            else if (event.target.name == "again_btn") {
            }
            else if (event.target.name == "stop_btn") {
            }
            else if (event.target.name == "gamtan_btn") {
            }
            else if (event.target.name == "bback_btn") {
            }
            return;
        };
        GameView.container = new egret.DisplayObjectContainer();
        GameView.lineContainer = new egret.DisplayObjectContainer();
        GameView.lineBallContainer = new egret.DisplayObjectContainer();
        GameView.ballContainer = new egret.DisplayObjectContainer();
        GameView.backContainer = new egret.DisplayObjectContainer();
        GameView.logoContainer = new egret.DisplayObjectContainer();
        GameView.xuanguanList = new Array();
        GameView.Time = new egret.Timer(1000);
        GameView.ifPlay = true;
        GameView.urlloader = new egret.URLLoader();
        GameView.isClick = false;
        return GameView;
    })(egret.DisplayObjectContainer);
    egret.GameView = GameView;
    GameView.prototype.__class__ = "egret.GameView";
})(egret || (egret = {}));
