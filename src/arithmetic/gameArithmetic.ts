
module egret {

	export class gameArithmetic extends egret.DisplayObjectContainer{
        public static ballList:any;
        private static linWigth:number;
        public static linList:any;
        public static lastBall:GameBall;
        public static listBgBall:any = new Array();
        public constructor(){
			super();
        }
        public static addddd(){
            var shape;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j< 3; j++) {
                    shape = new egret.Shape();
                    shape.graphics.beginFill(0xFBFF99);
                    shape.graphics.drawCircle(0, 0, 8);
                    shape.graphics.endFill();
                    shape.x = (63.85 + 26) * i + 290 - 131;
                    shape.y = (63.85 + 15) * j + 220;
                    egret.GameView.lineBallContainer.addChild(shape);
                }
            }
         }
        public static addBall() : void {
            gameArithmetic.linList = new Array();
            gameArithmetic.addBgball();
            gameArithmetic.addddd();
            gameArithmetic.addLine();
        }

        public static addBgball() : void {

            var arr:Array<GameBall> = null;
            var Column:number = 0;
            var ball:GameBall;
            var row:number = 0;
            while (row < 3){
				arr = new Array();
                Column = 0;
                while (Column < 3) {
                    ball = new GameBall();
                    GameView.ballContainer.addChild(ball.movieclip);

                    arr.push(ball);
                    ball.movieclip.x = (ball.movieclip.width + 25) * row + 290-131;
                    ball.movieclip.gotoAndStop(3);
                    ball.idX = row;
                    ball.idY = Column;
                    ball.movieclip.y = (ball.movieclip.height + 15) * Column + 220;
                    Column ++;
                }
                gameArithmetic.listBgBall.push(arr);
                row ++;
            }
        }

        public static addLine() : void {
			var arr:Array<any> = GameCheckpoint.readData();
			if(arr.length<=0) return;
            gameArithmetic.lastBall = gameArithmetic.listBgBall[arr[1]][arr[2]];
			var line:GameLine;
			var i:number = 0;
			var j:number = 0;
            var index:number = 2;
			var ball:GameBall;
			//arr = new Array(5, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0);
            while (index < arr [0] * 2){
                i = arr[(index + 1)];
                j = arr[index + 2];
                line = new GameLine();
                line.id = index;
                gameArithmetic.linWigth = line.movieclip.width;
                line.movieclip.x = gameArithmetic.lastBall.movieclip.x;
                line.movieclip.y = gameArithmetic.lastBall.movieclip.y;
                line.movieclip.gotoAndStop(2);
                GameView.lineContainer.addChild(line.movieclip);
				GameCheckpoint.linNum ++;
                gameArithmetic.linList.push(line);
				ball = gameArithmetic.listBgBall[i][j];
                line.movieclip.rotation = Math.atan2(gameArithmetic.lastBall.movieclip.y - ball.movieclip.y,
					gameArithmetic.lastBall.movieclip.x - ball.movieclip.x) / Math.PI * 180 + 180;
                line.movieclip.scaleX = Math.sqrt((gameArithmetic.lastBall.movieclip.y - ball.movieclip.y) * (gameArithmetic.lastBall.movieclip.y - ball.movieclip.y) +
					(gameArithmetic.lastBall.movieclip.x - ball.movieclip.x) * (gameArithmetic.lastBall.movieclip.x - ball.movieclip.x)) / this.linWigth;
                ball.ifoccupy = true;
                gameArithmetic.lastBall.ifoccupy = true;
                gameArithmetic.lastBall = ball;
                index += 2;
            }
        }

    }
}