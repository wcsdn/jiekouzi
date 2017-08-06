
module egret {

	export class GameNum extends egret.DisplayObjectContainer{
        public listNum:any;
        public id:number = 100000;
        public sore:number = 0;

        public constructor(param1:number = 0){
			super();
            this.listNum = new Array();
            this.sore = param1;
            return;
        }

        public addnum() : void{
            var numMC:any;
            var soreStr:string = this.sore+"";
            var index:any = 0;
            while (index < soreStr.length){
                numMC = GameMain.instance.getMcByName("mc_num");
                numMC.x = 45 * index;
                this.addChild(numMC);
                numMC.gotoAndStop((parseInt(soreStr.charAt(index)) + 1));
                this.listNum.push(numMC);
  		        index ++;
            }
        }

        public changeNum(param1:number = 0) : void{
            var index:any = 0;
            var subSore:any =  param1+"";
            if (subSore.length != this.id) {
                this.id = subSore.length;
                this.removeNum();
                this.addnum();
            }
            if (param1 <= 9) {
                this.listNum[(this.listNum.length - 1)].gotoAndStop((parseInt(subSore.charAt(index)) + 1));
                this.listNum[0].gotoAndStop(1);
            }
            else{
                index = 0;
                while (index < this.listNum.length){
                    this.listNum[index].gotoAndStop((parseInt(subSore.charAt(index)) + 1));
                    index ++;
                }
            }
        }

        public removeNum() : void{
            var num:any = this.listNum.length - 1;
            while (num >= 0){
                this.removeChild(this.listNum[num]);
                this.listNum.splice(num, 1);
                num = num - 1;
            }
        }
    }
}