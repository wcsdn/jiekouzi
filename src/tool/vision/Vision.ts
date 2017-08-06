
module egret {

	export class Vision extends egret.DisplayObjectContainer{
        public static MAIN:string = "MAIN";
        public static UI:string = "UI";
        public static TIPS:string = "TIPS";
        private static DPO_DIC:any = {};
        public static stage:any;
		public static TIPSLay:DisplayObjectContainer;
        public constructor(){
			super();
        }
		/**
		 *层级 
		 * @param param1
		 */
        public static visionInit(param1:any) : void{
            Vision.stage = param1;

            var mainLay:any = new DisplayObjectContainer();
            param1.addChild(mainLay);
            Vision.DPO_DIC[Vision.MAIN] = mainLay;
            var uiLay:any = new DisplayObjectContainer();
            param1.addChild(uiLay);
            Vision.DPO_DIC[Vision.UI] = uiLay;
			Vision.TIPSLay = new DisplayObjectContainer();
            param1.addChild(Vision.TIPSLay);
            Vision.DPO_DIC[Vision.TIPS] = Vision.TIPSLay;
			Vision.TIPSLay.touchEnabled = false;
			Vision.TIPSLay.touchChildren = false;
        }

        public static addView(param1:string, param2:DisplayObject) : void{
            var obj:any = Vision.DPO_DIC[param1];
			obj.addChild(param2);
        }

        public static removeView(param1:string, param2:DisplayObject) : void{
            var obj:any = null;
            if (param2 != null && param2.parent != null) {
				obj = Vision.DPO_DIC[param1];
				obj.removeChild(param2);
            }
        }

    }
}