
module egret {

	export class GameBall{
        public id:number = 0;
        public ifoccupy:boolean;
        public ifHit:boolean;
        public idX:number = 0;
        public idY:number = 0;
		public movieclip:any;
        public constructor(){
			this.movieclip = GameMain.instance.getMcByName("mc_smallball");
        }

    }
}