
module egret {

	export class GameLine extends  egret.DisplayObjectContainer{
        public id:number = 0;
        public ifAddSore:boolean;
        public ifunidirection:boolean;
		/**
		 *占领 
		 */		
        public ifoccupy:boolean = false;
		public movieclip:any;
        public constructor(){
			super();
			this.movieclip = GameMain.instance.getMcByName("mc_line");
        }
		public  get mc():any{
			var mcc:any = <any> (this.movieclip.getChildAt(0));
			return mcc;
		}

    }
}