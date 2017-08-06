
module egret {

	export class xuanguanshu_mc  extends egret.DisplayObjectContainer{
        public zhenzhao:any;
        public mc:any;
		public moviecliip:any;
		public id:number = 0;
        public constructor(){
			super();
			this.moviecliip =  GameMain.instance.getMcByName("mc_xuanguanshu");
			this.addChild(this.moviecliip);
			this.mc = <MovieClip><any> (this.moviecliip.getChildByName("mc"));
			this.zhenzhao = this.moviecliip.getChildByName("zhenzhao");
            return;
        }

    }
}