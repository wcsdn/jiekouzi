
module egret {

	export class gameJiemian extends egret.DisplayObjectContainer{
        public again_btn:any;
        public music_btn:any;
        public hair_mc:any;
        public tip_btn:any;
        public bg_mc:any;
        public guanka_btn:any;
        public guanqiaTxt:any;
        public body_mc:any;
        public underwear_mc:any;
		public movieclip:any;
        public constructor(){
            super();
			this.movieclip = GameMain.instance.getMcByName("spr_gameJiemian");
			this.music_btn = (this.movieclip.getChildByName("music_btn"));
			this.hair_mc = (this.movieclip.getChildByName("hair_mc"));
			this.tip_btn = (this.movieclip.getChildByName("tip_btn"));
            this.tip_btn.touchEnabled = true;
			this.bg_mc = (this.movieclip.getChildByName("bg_mc"));
			this.guanqiaTxt = this.movieclip.getChildByName("guanqiaTxt")
			
			this.guanka_btn =  (this.movieclip.getChildByName("guanka_btn"));
			this.body_mc =  (this.movieclip.getChildByName("body_mc"));
			this.underwear_mc =  (this.movieclip.getChildByName("underwear_mc"));
			this.again_btn=   (this.movieclip.getChildByName("again_btn"));
            this.again_btn.touchEnabled = true;
            this. music_btn.touchEnabled = true;
			this.music_btn.stop();
			//this.tip_btn.stop();
			//this.again_btn.stop();
            return;
        }

    }
}