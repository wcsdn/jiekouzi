/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class LoadingUI extends egret.Sprite{

    private loadedPic=0;
    private maskRect:egret.Rectangle;
    private bright:egret.Bitmap;
    public constructor(){
        super();
        this.createView();
    }
    private textField:egret.TextField;

    private createView():void {
        RES.getResByUrl("resource/logo.png",this.onLoadComplete,this);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 250;
        this.textField.x=egret.MainContext.instance.stage.stageWidth/2 - 160;
        this.textField.width = 320;
        this.textField.height = 100;
        this.textField.size = 14;
        this.textField.textAlign = "center";
    }

    public onLoadComplete(thisObject, res):void{
        var bit:egret.Bitmap =  new egret.Bitmap();
        bit.texture = thisObject;
        this.addChild(bit);
        bit.x = egret.MainContext.instance.stage.stageWidth/2 - bit.width / 2;
        bit.y = 100;
    }

    public setProgress(current, total):void {
        if(this.loadedPic ==0)
            this.textField.text = "资源配置文件,骚等:" + current + "/" + total;
        else
        {
            this.textField.text = parseInt(""+(current/total*1.0))+"%100";
            var per:number = current/total;//加载的比例
            this.maskRect = new egret.Rectangle(0,0,per*256,24);//计算遮罩的大小
            this.bright.mask = this.maskRect;
        }
    }
    public initLoading():void{
        this.loadedPic = 1;
        //底部的进度条
        var dark:egret.Bitmap = new egret.Bitmap(RES.getRes("bardark"));
        dark.x =egret.MainContext.instance.stage.stageWidth/2 -dark.width/2;
        this.addChild(dark);
        //上面的进度条
        this.bright = new egret.Bitmap(RES.getRes("barbright"));
        this.bright.x =egret.MainContext.instance.stage.stageWidth/2 -this.bright.width/2;
        this.addChild(this.bright);
        dark.y = this.bright.y =300;
        this.maskRect = new egret.Rectangle(0,0,0,24);
        this.bright.mask = this.maskRect;//设置空的遮罩，亮条不显示
    }
}
