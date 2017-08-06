
module egret {

	export class GameMain extends DisplayObjectContainer{
		public static  instance:GameMain;
        public static openService:any;
        public mouseX:number = 0;
        public mouseY:number = 0;
        public constructor(){
			super();
			GameMain.instance = this;
            this.main1();
        }

		public getMcByName(nameStr:string):any{
			//var mc:MovieClip =	new (<any><any> <MovieClip><any> ((getDefinitionByName(nameStr)))());
			//mc.stop();
			return Main.instance.getMCByName(nameStr);
		}
		public getMcByName2(nameStr:string):DisplayObjectContainer{
			var mc:DisplayObjectContainer =	new (<any><any> <DisplayObjectContainer><any> ((getDefinitionByName(nameStr)))());
			return mc;
		}
        public init1(event:Event = null) : void {
            Vision.visionInit(this);
            this.touchEnabled =true;
            egret.GameView.init();
            egret.GameView.gameLogo();
            this.removeEventListener(Event.ADDED_TO_STAGE, this.init1, this);
        }

        public main1() : void{
            if (this.stage)
                this.init1();
            else
                this.addEventListener(Event.ADDED_TO_STAGE, this.init1, this);
            
        }

        public setService(param1) : void{
            GameMain.openService = param1;
            return;
        }

    }
}