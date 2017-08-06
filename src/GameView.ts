module egret {
	export class GameView extends egret.DisplayObjectContainer{
        public static mc:any;
        public static container:DisplayObjectContainer = new DisplayObjectContainer();
        public static lineContainer:DisplayObjectContainer = new DisplayObjectContainer();
        public static lineBallContainer:DisplayObjectContainer = new DisplayObjectContainer();
        public static ballContainer:DisplayObjectContainer = new DisplayObjectContainer();
        public static backContainer:DisplayObjectContainer = new DisplayObjectContainer();
        public static logoContainer:DisplayObjectContainer = new DisplayObjectContainer();
        public static xuanguanList:any = new Array();
        private static game:Game;
        private static ifTip:boolean;
        public static ifComplete:boolean;
        public static ifComp:boolean;
        public static gamejm:gameJiemian;
        public static Time:egret.Timer = new egret.Timer(1000);
        public static gameN:GameNum;
        public static ifSucceed:boolean;
        public static ifPlay:boolean = true;

        public constructor(){
			super();
        }
        private static  bookCount:number;
        private static gotoServer(){
            try{
                var urlreq:egret.URLRequest = new egret.URLRequest();
                //这里要传过去得分
                urlreq.url = "./launcher/server.php?Point="+GameCheckpoint.checkPoint;
                this.urlloader.load( urlreq );
                this.urlloader.addEventListener(egret.Event.COMPLETE, this.onServerComplete, this);

            }catch(e){
                console.log(e);
            }

        }

        private static  urlloader:egret.URLLoader= new egret.URLLoader();
        private static  onServerComplete(event:egret.Event):void
        {
            try{
                console.log( this.urlloader.data );
                eval("var data = "+this.urlloader.data);
                // this.toplist 是初始化并添加到舞台中的 文本框
                //this.toplist.text = "您在全宇宙"+eval("data.count")+"名玩家中排"+eval("data.top")+"位";
                // this.toplist.textAlign = "center";
                //this.toplist.x = (this.stage.width - this.toplist.width)/2;
            }catch(e){
                console.log(e);
            }

            //注意服务器权限，php进程需要对launcher文件夹有创建db文件的权限 ，创建的文件应该有写入权限。简单处理的方法是 chmod -R 755
            //第一次访问的时候会创建数据库，第二次就会开始插入数据了。
        }
        public static addTime() : void{
            GameView.Time.addEventListener(TimerEvent.TIMER, GameView.onTimer, GameView);
            GameView.Time.start();
            GameView.gameN = new GameNum(GameCheckpoint.nowTimer);
            GameView.logoContainer.addChild(GameView.gameN);
            GameView.gameN.addnum();
            GameView.gameN.x = 380;
            return;
        }

		public static onTimer(event:TimerEvent) : void {
			GameCheckpoint.nowTimer --;
            GameView.gameN.changeNum(GameCheckpoint.nowTimer);
            if (GameCheckpoint.nowTimer == 10)//时间警告
                SoundManage.timeOver();
            if (GameCheckpoint.nowTimer <= 0)//游戏结束
            {
                GameView.GameEnd();
                GameView.Time.stop();
            }
        }

        public static init() {
            Vision.addView("MAIN", GameView.backContainer);
            Vision.addView("MAIN", GameView.container);
            Vision.addView("MAIN", GameView.lineContainer);
            Vision.addView("MAIN", GameView.lineBallContainer);
            Vision.addView("MAIN", GameView.ballContainer);
            Vision.addView("MAIN", GameView.logoContainer);
        }

        static onComplete(event:egret.Event) : void {
            GameView.ifComplete = true;
        }
		/**
		 *游戏开始 
		 */
        public static gameLogo():void{
			GameView.gameCover();
			SoundManage.addBgSound();
        }
        public static gameCover() : void{
            GameView.mc = GameMain.instance.getMcByName("spr_fengm");
            GameView.mc.getChildByName("play1").touchEnabled =true;
            GameView.mc.getChildByName("play2").touchEnabled =true;
            GameView.container.addChild(GameView.mc);
            GameView.mc.getChildByName("play1").addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play1Click, GameView);
            GameView.mc.getChildByName("play2").addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play2Click, GameView);
        }

        static tuijianClick(event:egret.TouchEvent):void {
            return;
        }

        static play1Click(event:egret.TouchEvent) : void{
            GameView.mc.removeEventListener(egret.TouchEvent.TOUCH_TAP, GameView.play1Click, GameView);
            GameView.container.removeChild(GameView.mc);
            GameView.game = new Game();
            GameView.addTime();
        }
        //更多游戏
		static play2Click(event:egret.TouchEvent) : void{
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
		}

        public static addGameJm() : void{
            var miss:Function;
            miss = function () : void{
                if (!GameView.ifSucceed){
                    GameView.gamejm.bg_mc.visible = true;
                    gameArithmetic.addBall();//GameCheckpoint.readData()[0]
                    egret.Tween.removeTweens(GameView.gamejm.body_mc);
                    egret.Tween.removeTweens(GameView.gamejm.underwear_mc);
                    egret.Tween.removeTweens(GameView.gamejm.hair_mc);//TweenLite.killTweensOf
                    GameView.ifComp = true;
                }
                return;
            };
			if(GameView.gamejm){
				if(GameView.gamejm.movieclip.parent)
					GameView.gamejm.movieclip.parent.removeChild(GameView.gamejm.movieclip);
				GameView.gamejm.movieclip.removeEventListener(egret.TouchEvent.TOUCH_TAP, GameView.gameClick, GameView);
			}
            GameView.gamejm =  new gameJiemian();
            GameView.container.addChild(GameView.gamejm.movieclip);
			var arr:any = GameCheckpoint.readBodydtata();
            GameView.gamejm.guanka_btn.gotoAndStop(egret.GameCheckpoint.checkPoint);
            GameView.gamejm.movieclip.addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.gameClick, GameView);
            GameView.gamejm.body_mc.gotoAndStop(arr[2]);
            GameView.gamejm.hair_mc.gotoAndStop(arr[1]);
            GameView.gamejm.underwear_mc.gotoAndStop(arr[0]);
            (<any> GameView.gamejm.underwear_mc.getChildAt(0)).gotoAndStop(1);
            GameView.gamejm.body_mc.x = 754;
            GameView.gamejm.hair_mc.x = 917;
            if (!GameView.ifPlay)
                GameView.gamejm.music_btn.gotoAndStop(3);
            else
                GameView.gamejm.music_btn.gotoAndStop(1);
            GameView.gamejm.underwear_mc.x = 836;
            GameView.gamejm.bg_mc.visible = false;
            egret.Tween.get(GameView.gamejm.body_mc).to({x:23},2000)
            egret.Tween.get(GameView.gamejm.underwear_mc).to({x:105},2000)
            egret.Tween.get(GameView.gamejm.hair_mc).to({x:186},2000).call(miss);


            //2 Tween的实现和Flash差异很大，所有时间都以毫秒为单位
            //3 egret.Tween.get(sprite).wait(2000).to({x:100},1500).call(onComplete);
            //egret.Tween.to(GameView.gamejm.body_mc, 2, {x:23});//23  154
            //egret.Tween.to(GameView.gamejm.underwear_mc, 2, {x:105});//236
            //egret.Tween.to(GameView.gamejm.hair_mc, 2, {x:186, onComplete:miss});//317
            GameView.gamejm.guanka_btn.visible = true;
            GameView.share(egret.GameCheckpoint.checkPoint);
        }

        static gameClick(event:egret.TouchEvent) : void {
            if (event.target.name == "tip_btn") {
				//GameView.back();
                if (GameView.ifComp){
                    if (GameCheckpoint.nowLin == 0 && !GameView.ifTip){
                        GameView.ifTip = true;
                        GameView.getTip();
                    }
                }
            }
            else if (event.target.name == "again_btn")   {
                if (GameView.ifComp) {
                    GameView.ifComp = false;
                    GameView.remove();
                    GameView.game = new Game();
                }
            }
            else if (event.target.name == "stop_btn") {
				GameView.game.gameStop(); 
			}
            else if (event.target.name == "gantan_btn") {
                GameView.game.tip2();
            }
            else if (event.target.name == "music_btn"){
                if (GameView.ifPlay) {
                    GameView.gamejm.music_btn.gotoAndStop(3);
                    SoundManage.bgStop();
                    GameView.ifPlay = false;
                }
                else{
                    GameView.gamejm.music_btn.gotoAndStop(1);
                    SoundManage.addBgSound();
                    GameView.ifPlay = true;
                }
            }
            else if (event.target.name == "next_btn"){ }
            else if (event.target.name == "playmore"){
                //this.navigateToURL(new URLRequest("http://www.dijuguotang.com"));
            }
            else if (event.target.name == "replay_btn") {
				GameView.replayButtClick();//重新开始
            }
        }

        private static isClick:boolean =false;
        private static getTip() : void{
            var id:number = 0;
            var miss:Function;
            miss = function (param1:any) : void{
                var mc:any = param1;
                var _loc_4:any = id + 1;
                id = _loc_4;
                mc.gotoAndStop(1);
                if (id >= gameArithmetic.linList.length) {
                    var Change:any = function () : void {
	                    var i:any = 0;
	                    while (i < gameArithmetic.linList.length)  {
	                        gameArithmetic.linList[i].movieclip.gotoAndStop(2);
	                        GameView.ifTip = false;
							i++
	                    }
	                    return;
	                };
                    egret.Tween.get(mc).wait(1000).call(Change);
                    //3 egret.Tween.get(sprite).wait(2000).to({x:100},1500).call(onComplete);
                }
                return;
            }  ;
            id;
            var i:number = 0;
            while (i < gameArithmetic.linList.length){
                //TweenLite.to(gameArithmetic.linList[i], 1, {delay:i, onComplete:miss, onCompleteParams:[gameArithmetic.linList[i]]});
                egret.Tween.get(gameArithmetic.linList[i]).wait(1000).to({x:100},1000).call(miss,this,gameArithmetic.linList[i]);
              	i++;
            }
            return;
        }

        private static back() : void{
            GameView.changeCheckpoint();
        }

        public static changeCheckpoint() : void{
            var xgsMC:xuanguanshu_mc ;
            GameView.mc = GameMain.instance.getMcByName("spr_changeguanka");//new changeguanka();
            GameView.container.addChild(GameView.mc);
            var index:any = 0;
            while (index < 16){
                xgsMC = new xuanguanshu_mc();
                xgsMC.zhenzhao.alpha = 0;
                GameView.mc.addChild(xgsMC);
                xgsMC.x = (xgsMC.width + 25) * (index % 4) + 170-131;
                xgsMC.y = (xgsMC.height + 15) * parseInt(""+(index / 4)) + 80;
                xgsMC.mc.gotoAndStop(index + 2);
                GameView.xuanguanList.push(xgsMC);
                xgsMC.addEventListener(egret.TouchEvent.TOUCH_TAP, GameView.onClick, GameView);
                xgsMC.id = index;
                index = index + 1;
            }
            var _loc_2:any = 0;
            while (_loc_2 < Game.PassList.length){
                
                GameView.xuanguanList[(Game.PassList[_loc_2] - 1)].zhenzhao.alpha = 0.6;
                _loc_2 = _loc_2 + 1;
            }
            return;
        }

        private static remove() : void {
            GameView.xuanguanList = new Array();
			var i:number =0;
			for(;i<gameArithmetic.linList.length;i++){
				GameView.lineContainer.removeChild(gameArithmetic.linList[i].movieclip);
			}
			for(i =0;i<gameArithmetic.listBgBall.length;i++){
				for(var m:number =0;m<3;m++)
					GameView.ballContainer.removeChild(gameArithmetic.listBgBall[i][m].movieclip);
			}
			for(i =0;i<GameView.game.connectedLineList.length;i++){
				GameView.lineContainer.removeChild(GameView.game.connectedLineList[i].movieclip);
			}
			if(GameView.gamejm && GameView.gamejm.movieclip){
				if(GameView.gamejm.movieclip.parent)
					GameView.gamejm.movieclip.parent.removeChild(GameView.gamejm.movieclip);
			}
            while(GameView.lineBallContainer.numChildren>0)
                GameView.lineBallContainer.removeChildAt(0);
            gameArithmetic.ballList = new Array();
            gameArithmetic.linList = new Array();
            GameView.game.connectedLineList = new Array();
            gameArithmetic.listBgBall = new Array();
            GameView.mc.removeEventListener(egret.TouchEvent.TOUCH_TAP, egret.GameView.succedClick, GameView);
            if (GameView.game){
                GameView.game.removeEvent();
            }
            GameCheckpoint.linNum = 0;
            GameCheckpoint.nowLin = 0;
            return;
        }

        static onClick(event:egret.TouchEvent) : void{
            GameCheckpoint.checkPoint = event.currentTarget.id + 1;
            GameView.remove();
            GameView.container.removeChild(GameView.mc);
            GameView.game = new Game();
            return;
        }

        public static succeed() : void{
            if (GameView.gamejm.movieclip.parent == GameView.container) {
                GameView.container.removeChild(GameView.gamejm.movieclip);
            }
            if (!GameView.ifSucceed){
                GameView.game = new Game();
            }
        }

        public static GameEnd() : void{
            if (GameView.ifComplete) {
               // GameView.logoContainer.addChild(GameView.my_load);
               // my_load.y = 200;
                GameView.ifComplete = false;
            }
            SoundManage.gameOverS();
            GameView.gameN.visible = false;
			GameView.mc = GameMain.instance.getMcByName("spr_succeed1");;
            GameView.ifSucceed = true;
            //GameView.mc.x = 75;
            //GameView.mc.y = 20;
			GameView.mc.buttonMode =true;
			GameView.mc.getChildByName("replay_btn").buttonMode =true;
			GameView.mc.getChildByName("playmore").buttonMode =true;
           // GameView.gamejm.getChildByName("guanka_btn").visible = false;
           // if (gamejm.parent == container){
                GameView.container.addChild(GameView.mc);
           // }
            GameView.mc.getChildByName("replay_btn").touchEnabled = true;
            GameView.mc.getChildByName("playmore").touchEnabled = true;
			GameView.mc.getChildByName("replay_btn").addEventListener(egret.TouchEvent.TOUCH_TAP, function aaa():void{
				GameView.replayButtClick();
			},this);
			GameView.mc.getChildByName("playmore").addEventListener(egret.TouchEvent.TOUCH_TAP, function bbb():void{
				//this.navigateToURL(new URLRequest("http://www.dijuguotang.com"));
			},this);
            GameView.addNumEnd();
            GameView.remove();
        }

		private static replayButtClick():void{
			if(GameView.gamejm.parent)
				GameView.container.removeChild(GameView.gamejm);
			if(GameView.mc.parent)
				GameView.container.removeChild(GameView.mc);
			GameCheckpoint.nowTimer = 90;
			GameCheckpoint.checkPoint = 1;
			GameView.gameN.changeNum(GameCheckpoint.nowTimer);
			GameView.gameN.visible = true;
			GameView.Time.start();
			GameView.game = new Game();
			GameView.ifSucceed = false;
		}
        private static addNumEnd() : void{
            var gnum:GameNum = new GameNum((GameCheckpoint.checkPoint - 1));
            GameView.mc.addChild(gnum);
			gnum.x = 380;
			gnum.y = 50;
			gnum.addnum();
        }
        public static share(val):void {//微信分享
            var self = this;
            WeixinApi.ready(function(api:WeixinApi){
                var info:WeixinShareInfo = new WeixinShareInfo();
                info.title = "看你有多快";//分享的标题 长度不能超过512字节
                //两种取数据的方法
                var desc:string = "";
                if(GameCheckpoint.checkPoint<3){
                    desc +="这是一个神一样的测试，让其他朋友们也放松一下吧！！！";
                }
                else if (GameCheckpoint.checkPoint<9){
                    desc +="这速度充其量也就是个屌丝，找朋友帮忙看看吧！";
                }//！
                else if (GameCheckpoint.checkPoint < 15){
                    desc +=" 你已经跨过屌丝的门槛了，果然是玉树临风啊！！！";
                }
                else{
                    desc +="哈哈哈，还有谁？还有谁--能超越哥的传奇,完爆各国情圣，" +
                        "妹子非我莫属，妈妈再也不用担心抱孙子的事~(≧▽≦)/~啦啦啦";
                }
                info.desc = desc;//分享的内容 长度不能超过1K
                info.link = "http://www.dijuguotang.com/jiekouzi";//分享的连接
                info.imgUrl = "http://www.dijuguotang.com/jiekouzi/logo.png"; //分享图片的地址 图片大小不能超过32k

                // 分享的回调
                var wxCallbacks =  new WeixinShareCallbackInfo();
                wxCallbacks.confirm = function (resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？

                }
                wxCallbacks.cancel = function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                }
                // 整个分享过程结束
                wxCallbacks.all =function (resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                }
                // 分享操作开始之前
                wxCallbacks.ready = function () {
                    // 你可以在这里对分享的数据进行重组
                }
                // 分享被用户自动取消
                wxCallbacks.cancel=function (resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                }
                // 点击分享到腾讯微博，会执行下面这个代码
                api.shareToFriend(info,wxCallbacks);
                //点击分享到朋友圈，会执行下面这个代码
                api.shareToTimeline(info,wxCallbacks);

            })
        }
        public static weixinHideOptionMenu():void{
            // 所有功能必须包含在 WeixinApi.ready 中进行
            WeixinApi.ready(function(Api){
                // 隐藏右上角popup菜单入口
                Api.hideOptionMenu();
                // 隐藏浏览器下方的工具栏
                Api.hideToolbar();
                // 获取网络状态
                Api.getNetworkType(function(network){
                    // 拿到 network 以后，做任何你想做的事
                });
            });
        }
        public static weixinShowOptionMenu():void{
            // 所有功能必须包含在 WeixinApi.ready 中进行
            WeixinApi.ready(function(Api){
                Api.showOptionMenu()
                // 隐藏浏览器下方的工具栏
                Api.showToolbar()
            });
        }
        private static succedClick(event:egret.TouchEvent) : void{

            if (event.target.name == "tip_btn"){}
            else if (event.target.name == "again_btn"){}
            else if (event.target.name == "stop_btn"){}
            else if (event.target.name == "gamtan_btn") {}
            else if (event.target.name == "bback_btn"){}
            return;
        }

    }
}