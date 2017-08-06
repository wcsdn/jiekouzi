
module egret {

	export class Game extends egret.DisplayObjectContainer{
        public ifWin:boolean;
        public lastX:number;
        public lastY:number;
        public lastBall:GameBall;
        private lastLinedl:GameLine;
        public ifPass:boolean =false;
        private linWigth:number;
        private ifDwon:boolean;
        private lin:GameLine;
        private ifStop:boolean;
        private lastLine:GameLine;
        public connectedBallList:Array<GameBall>;
		/**
		 *当前画的线 
		 */		
        public connectedLineList:any;
        public listBgBall:any;
        public ifBack:boolean;
        public lineId:number = 0;
        public timer:Timer;
        private num2:number = 0;
        public static PassList:any;

        public constructor(){
			super();
            this.listBgBall = new Array();
            Game.PassList = new Array();
            this.init();
        }

        private init() : void{
            Vision.stage.addEventListener(TouchEvent.TOUCH_MOVE, this.onMove, this);
            Vision.stage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onDown, this);
            Vision.stage.addEventListener(TouchEvent.TOUCH_END, this.onUp, this);
            this.connectedBallList = new Array();
            this.connectedLineList = new Array();
            GameView.ifComp = false;
            GameView.addGameJm();
        }


        public gameStop() : void{
            if (this.ifStop) {
                this.removeEvent();
                this.ifStop = false;
            }
            else {
                Vision.stage.addEventListener(TouchEvent.TOUCH_MOVE, this.onMove, this);
                Vision.stage.addEventListener(TouchEvent.TOUCH_BEGIN, this.onDown, this);
                Vision.stage.addEventListener(TouchEvent.TOUCH_END, this.onUp, this);
                this.ifStop = true;
            }
        }

        public back() : void {
            return;
        }

        public onUp(event:egret.TouchEvent) : void{
            this.ifDwon = false;
        }

        public onDown(event:egret.TouchEvent) : void{
            this.ifDwon = true;
        }

        private mouseHitBall() : boolean{
			var conunt1:number = gameArithmetic.listBgBall.length;
			if(conunt1 <=0) return false;
			var index1:number = 0;
            var index2:number = 0;
			var ball:GameBall;
			for(var i:number =0;i<3;i++){
				for(var j:number =0;j<3;j++){
					ball = gameArithmetic.listBgBall[i][j];
					if (ball.movieclip.hitTestPoint(Main.instance.gameMain.mouseX,Main.instance.gameMain.mouseY, true)) {//Vision.stage.mouseX, Vision.stage.mouseY
						if (this.lastBall == null){
							this.lastX = ball.movieclip.x;
							this.lastY = ball.movieclip.y;
							this.lastBall = ball;
						}
						return true;
					}
				}
			}
            return false;
        }

        private linHitBall(ball:GameBall) : boolean {
            if (!ball ||this.lastBall.movieclip.x == ball.movieclip.x && this.lastBall.movieclip.y == ball.movieclip.y)
                return false;
			var xx:number = (Vision.stage.mouseX - ball.movieclip.x);
			var yy:number = (Vision.stage.mouseY - ball.movieclip.y);
            if ((xx * xx + yy*yy) <= 800){
                return true;
            }
            return false;
        }


        public onMove(event:TouchEvent) : void  {
            Main.instance.gameMain.mouseX= event.stageX;
            Main.instance.gameMain.mouseY =event.stageY;
            if (this.ifDwon && this.chackMouse()) {
				this.drawLin();
				this.GameIfWin();
            }
        }

        private chackMouse() : boolean{
            if (Vision.stage.mouseX > 75 && Vision.stage.mouseX < 680 && Vision.stage.mouseY > 50 && Vision.stage.mouseY <= 430){
				return true;
            }
            return false;
        }
        public  shape1 = new egret.Shape()
        public  intersectionRectangle( target1:any, target2:any):boolean {
            var bounds1 = target1.getBounds();
            var bounds2 = target2.getBounds();
            var po = target1.parent.localToGlobal(target1.x,target1.y);
            bounds1.x = po.x;
            bounds1.y = po.y;
            po = target2.parent.localToGlobal(target2.x,target2.y);
            bounds2.x = po.x;
            bounds2.y = po.y;
            var cc ;
            if(cc <1000) {
               this. shape1.graphics.clear()
                var shape2 = new egret.Shape()
                this. shape1.graphics.beginFill(0xff0000);
                this. shape1.graphics.drawRect(bounds1.x,bounds1.y,bounds1.width,bounds1.height);
                this.shape1.graphics.endFill();
                shape2.graphics.beginFill(0x00ff00);
                shape2.graphics.drawRect(bounds2.x,bounds2.y,bounds2.width,bounds2.height);
                shape2.graphics.endFill();
                Main.instance.addChild(this.shape1);
                Main.instance.addChild(shape2);
                //console.log(bounds1,bounds2)

            }
            cc ++;
            return bounds1.intersects(bounds2) || bounds2.intersects(bounds1);
        }

        public checkLine(lin1,lin2){
            var bounds1 = lin1.movieclip.getBounds();
            var bounds2 = lin2.movieclip.getBounds();
            var po = lin1.movieclip.parent.localToGlobal(lin1.movieclip.x, lin1.movieclip.y);
            bounds1.x = po.x;
            bounds1.y = po.y;
            po = lin2.movieclip.parent.localToGlobal(lin2.movieclip.x, lin2.movieclip.y);
            bounds2.x = po.x;
            bounds2.y = po.y;
            if(bounds2.bottom == bounds1.bottom && bounds2.right == bounds1.right
                && bounds2.width == bounds1.width){
                return true;
            }
            return false;
        }
        public GameIfWin():void {
            var index:number = 0;
            var i:number = 0;
			var line1:GameLine;
			var meLine:GameLine;
            while (i < this.connectedLineList.length){//点选的 球connectedBallList
                index = 0;
                while (index < gameArithmetic.linList.length) {//正确的线
					line1 =gameArithmetic.linList[index];
                    if (!line1.ifAddSore) {
						meLine = this.connectedLineList[i];
//                        if(this.intersectionRectangle(meLine.mc.getChildByName("mc1"),line1.mc.getChildByName("mc1"))&&
//                            this.intersectionRectangle(meLine.mc.getChildByName("mc2"),line1.mc.getChildByName("mc2"))||
//                            this.intersectionRectangle(meLine.mc.getChildByName("mc1"),line1.mc.getChildByName("mc2"))&&
//                            this.intersectionRectangle(meLine.mc.getChildByName("mc2"),line1.mc.getChildByName("mc1")))
//                        {
                        if(this.checkLine(meLine,line1)){
							this.num2++;
							line1.ifAddSore = true;
							//line1.movieclip.visible = false;
						}
                    }
                    index ++;
                }
                i ++;
            }

            if (this.num2 == (GameCheckpoint.readData()[0] - 1) && this.num2 == this.connectedLineList.length-1) {
                GameView.ifComp = false;
                this.win();
                SoundManage.addjiekais();
                SoundManage.addGsound();
                Game.PassList.push(GameCheckpoint.checkPoint);
                this.num2 = 0;
                this.removeEvent();
            }
        }

        public drawLin() : void {
            if (!this.ifPass) {
                if (this.mouseHitBall()) {
                    this.ifPass = true;
                    this.lin = new GameLine();
                    this.linWigth = this.lin.movieclip.width;
                    this.lin.movieclip.x = this.lastBall.movieclip.x;
                    this.lin.movieclip.y = this.lastBall.movieclip.y;
                    this.connectedLineList.push(this.lin);
                    GameView.lineContainer.addChild(this.lin.movieclip);
                    this.lin.movieclip.gotoAndStop(3);
                }
            }
            if (this.lin != null && this.lastBall != null){
				var index1:any = 0;
				var index2:any = 0;
				var ball:GameBall;
                while (index1 <3) {
                    index2 = 0;
                    while (index2 < 3){
						ball = gameArithmetic.listBgBall[index1][index2];
                        if (this.linHitBall(ball)) {//if (ifrepeat())
							ball.movieclip.gotoAndStop(1);//球变亮
							this.lastBall.movieclip.gotoAndStop(1);
							this.lin.movieclip.rotation = Math.atan2(ball.movieclip.y - this.lastBall.movieclip.y, ball.movieclip.x - this.lastBall.movieclip.x) / Math.PI * 180;
							this.lin.movieclip.scaleX = Math.sqrt((ball.movieclip.y - this.lastBall.movieclip.y) * (ball.movieclip.y - this.lastBall.movieclip.y) + (ball.movieclip.x - this.lastBall.movieclip.x) * (ball.movieclip.x - this.lastBall.movieclip.x)) / this.linWigth;
							if (this.ifChanegColor()){
                                this.lin.movieclip.gotoAndStop(1);
                            }
							this.lastLine = this.lin;
							SoundManage.addlin();
							this.lastX = ball.movieclip.x;
							this.lastY = ball.movieclip.y;
							this.lastBall = ball;
							this.connectedBallList.push(ball);
							this.ifPass = false;
							return;
                        }
                        index2 ++;
                    }
                    index1 ++;
                }
                this.lin.movieclip.rotation = Math.atan2(Vision.stage.mouseY - this.lastBall.movieclip.y, Vision.stage.mouseX - this.lastBall.movieclip.x) / Math.PI * 180;
                this.lin.movieclip.scaleX = Math.sqrt(
					(Vision.stage.mouseY - this.lastBall.movieclip.y) * (Vision.stage.mouseY - this.lastBall.movieclip.y) + 
					(Vision.stage.mouseX - this.lastBall.movieclip.x) * (Vision.stage.mouseX - this.lastBall.movieclip.x)) / this.linWigth;
            }
            return;
        }

		/**
		 *当前 线和任意一条真线交融了 
		 * @return 
		 */		
        public ifChanegColor() : boolean{
            var i:number = 0;
			var conunt:number = gameArithmetic.linList.length;
			var line:GameLine;
            while (i <conunt) {
				line =gameArithmetic.linList[i];
//                if (this.intersectionRectangle(this.lin.mc.getChildByName("mc1"), line.mc.getChildByName("mc1")) &&
//                    this.intersectionRectangle(this.lin.mc.getChildByName("mc2"), line.mc.getChildByName("mc2")) ||
//                    this.intersectionRectangle(this.lin.mc.getChildByName("mc1"), line.mc.getChildByName("mc2")) &&
//                    this.intersectionRectangle(this.lin.mc.getChildByName("mc2"), line.mc.getChildByName("mc1"))) {
                if(this.checkLine(this.lin,line)){
                    return true;
                }
                i ++;
            }
            return false;
        }

        public tip2() : void{
            var gotoFun:Function;
            gotoFun = function (param1:any) : void{
                param1.gotoAndStop(2);
                param1.getChildByName("jiantou").visible = false;
                return;
            } ;

            egret.Tween.get(gameArithmetic.linList[0]).wait(1000).call(gotoFun,this,gameArithmetic.linList[0]);
            gameArithmetic.linList[0].movieclip.gotoAndStop(1);
            gameArithmetic.linList[(gameArithmetic.linList.length - 1)].movieclip.gotoAndStop(1);
            var nnn:any = gameArithmetic.linList[(gameArithmetic.linList.length - 1)];
            egret.Tween.get(nnn).wait(1000).call(gotoFun,this,nnn);
            return;
        }

		public removeAllItem():void{
			var i:number =0;
			for(;i<gameArithmetic.linList.length;i++){
				GameView.lineContainer.removeChild(gameArithmetic.linList[i].movieclip);
			}
			for(i =0;i<gameArithmetic.listBgBall.length;i++){
				for(var m:number =0;m<gameArithmetic.listBgBall[i].length;m++)
					GameView.ballContainer.removeChild(gameArithmetic.listBgBall[i][m].movieclip);
			}
			for(i =0;i<this.connectedLineList.length;i++){
				GameView.lineContainer.removeChild(this.connectedLineList[i].movieclip);
			}
            while(GameView.lineBallContainer.numChildren>0)
                GameView.lineBallContainer.removeChildAt(0);
			gameArithmetic.linList = new Array();
			gameArithmetic.listBgBall = new Array();
			this.connectedLineList = new Array();
            while(GameView.lineBallContainer.numChildren>0)
                GameView.lineBallContainer.removeChildAt(0);
		}
		public  onTimer(e:Event =null):void{
			this.timer.removeEventListener(TimerEvent.TIMER, this.onTimer, this);
			this.timer.stop();
            egret.Tween.removeTweens(GameView.gamejm.body_mc);
            egret.Tween.removeTweens(GameView.gamejm.underwear_mc);
            egret.Tween.removeTweens(GameView.gamejm.hair_mc);
			GameView.succeed();
			this.removeAllItem();
			if (GameCheckpoint.totallevel < GameCheckpoint.checkPoint)
				GameCheckpoint.totallevel = GameCheckpoint.checkPoint;
		}
        private win() : void {
            this.timer = new egret.Timer(2100, 1);
            this.timer.addEventListener(TimerEvent.TIMER, this.onTimer, this);
			GameCheckpoint.checkPoint ++;
            GameView.gamejm.guanka_btn.gotoAndStop(GameCheckpoint.checkPoint);
            if (GameCheckpoint.nowTimer >= 5){
                this.timer.start();
            }
			this.removeAllItem();
            (<any> GameView.gamejm.underwear_mc.getChildAt(0)).gotoAndStop(2);
            egret.Tween.get(GameView.gamejm.hair_mc).to({x:317 - 600},2000);
            egret.Tween.get(GameView.gamejm.underwear_mc).to({x:236 - 600},2000);
            egret.Tween.get(GameView.gamejm.body_mc).to({x:154 - 600},2000);
            GameView.gamejm.bg_mc.visible = false;
        }

        public removeEvent() : void{
            Vision.stage.removeEventListener(TouchEvent.TOUCH_MOVE, this.onMove, this);
            Vision.stage.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onDown, this);
            Vision.stage.removeEventListener(TouchEvent.TOUCH_END, this.onUp, this);
        }

    }
}