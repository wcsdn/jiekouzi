var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.onAddToStage = function (event) {
        Main.instance = this;
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.initLoading();
            RES.loadGroup("MainFile");
        }
        if (event.groupName == "MainFile") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload" || event.groupName == "MainFile") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        var swfData = RES.getRes("jiekouzi_swf");
        var spriteSheet = RES.getRes("jiekouzi");
        var assetsManager = new starlingswf.SwfAssetManager();
        assetsManager.addSpriteSheet("jiekouzi", spriteSheet);
        this.swf = new starlingswf.Swf(swfData, assetsManager, 60);
        this.gameMain = new egret.GameMain();
        this.addChild(this.gameMain);
        //this.mask = new egret.Rectangle(0,0,480,800);
        this.stage.addEventListener(egret.Event.RESIZE, this.onReSize, this);
        //egret.Profiler.getInstance().run();
        // Window.localStorage.setItem("name","test");
        //var name= Window.localStorage.getItem("name");
        //this.showHoerInfoPanle(name,name);
    };
    Main.prototype.getMCByName = function (strName) {
        var dis;
        if (strName.indexOf("mc_") > -1) {
            dis = this.swf.createMovie(strName);
            dis.stop();
        }
        else {
            dis = this.swf.createSprite(strName);
        }
        return dis;
    };
    Main.prototype.showHoerInfoPanle = function (title, content) {
        if (content === void 0) { content = ""; }
        if (this.showPanle == null) {
            this.showPanle = egret.GameMain.instance.getMcByName("mc_ShowHeroPanle");
            this.showPanle.getChildByName("btn_close").addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(this.showPanle);
        }
        this.showPanle.visible = true;
        var titleText = this.showPanle.getChildByName("titleText");
        titleText.text = title;
        this.showPanle.getChildByName("titleText").text = content;
    };
    Main.prototype.onClick = function (e) {
        this.showPanle.visible = false;
    };
    /**
     * Sprite测试
     * */
    Main.prototype.test1 = function () {
        var sprite = this.swf.createSprite("spr_1");
        this.addChild(sprite);
    };
    /**
     * 动画事件测试
     * */
    Main.prototype.test3 = function () {
        var mc = this.swf.createMovie("mc_Tain");
        mc.x = 480 / 2;
        mc.y = 320 / 2;
        mc.addEventListener(egret.Event.COMPLETE, this.mcComplete, mc);
        mc.gotoAndPlay("walk");
        this.addChild(mc);
    };
    Main.prototype.mcComplete = function (e) {
        console.log("mcComplete");
    };
    /**
     * 帧事件测试
     * */
    Main.prototype.test4 = function () {
        var mc = this.swf.createMovie("mc_frame_event");
        mc.addEventListener("@out", this.frameEventOut, mc);
        mc.addEventListener("@in", this.frameEventIn, mc);
        this.addChild(mc);
    };
    Main.prototype.frameEventOut = function (e) {
        console.log("@out");
    };
    Main.prototype.frameEventIn = function (e) {
        console.log("@in");
    };
    Main.prototype.onReSize = function (e) {
        console.log(this.stage.stageWidth);
        console.log(this.stage.stageHeight);
    };
    return Main;
})(egret.DisplayObjectContainer);
