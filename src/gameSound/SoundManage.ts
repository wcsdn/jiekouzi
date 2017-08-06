
module egret {

	export class SoundManage extends egret.DisplayObjectContainer{
        public static bgCh:any;// = //new ();//SoundChannel

        public constructor(){
			super();
            return;
        }

        public static addBgSound() : void{
           // var _loc_1:* = new bgsound();
           // bgCh = _loc_1.play(0, 999);
            return;
        }

        public static timeOver() : void{
            //var _loc_1:* = new timeover();//倒计时
           // _loc_1.play();
            return;
        }

        public static bgStop() : void{
            //SoundManage.bgCh.stop();
            return;
        }

        public static gameOverS() : void{
          //  var _loc_1:* = new oversound();
          //  _loc_1.play();
            return;
        }

        public static addGsound() : void{
            var _loc_1:any = null;
            var _loc_2:any = null;
            if (Math.random() < 0.5){
                //_loc_1 = new jiekaig1();
                //_loc_1.play();
            }
            else{
                //_loc_2 = new jiekaig2();
               // _loc_2.play();
            }
            return;
        }

        public static addjiekais() : void{
            //var _loc_1:* = new jiekai();
           // _loc_1.play();
            return;
        }

        public static addlin() : void{
           // var _loc_1:* = new linsound();
           // _loc_1.play();
            return;
        }

    }
}