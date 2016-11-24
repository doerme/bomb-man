//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        this.createGameBackground();
        this.createCtrlLever();
    }

    /**
     * 游戏背景
     */
    private createGameBackground(){
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("map_png");
        img.fillMode = egret.BitmapFillMode.REPEAT;
        img.width = 750;
        img.height = 750;
        this.addChild(img);
    }

    private _ctrlGuide:egret.Shape;                   //操控杆对象
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差

    /**
     * 游戏操控台
     */
    private createCtrlLever(){
        var ctrlLever:egret.Shape = new egret.Shape();
        ctrlLever.x = 150;
        ctrlLever.y = 900;
        ctrlLever.graphics.beginFill( 0xdddddd, 1);
        ctrlLever.graphics.drawCircle( 0, 0, 100 );
        ctrlLever.graphics.endFill();
        //触碰事件绑定
        ctrlLever.touchEnabled = true;
        ctrlLever.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
        ctrlLever.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addChild(ctrlLever);

        this._ctrlGuide = new egret.Shape();
        this._ctrlGuide.x = 150;
        this._ctrlGuide.y = 900;
        this._ctrlGuide.graphics.beginFill( 0x2b96e1, 1);
        this._ctrlGuide.graphics.drawCircle( 0, 0, 50 );
        this._ctrlGuide.graphics.endFill();
        this.addChild(this._ctrlGuide);

    }

    /**
     * 游戏操控
     */
    private touchStart(evt:egret.TouchEvent){
        console.log("touchStart");
        this._touchStatus = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    }

    /**
     * 游戏操控
     */
    private touchEnd(evt:egret.TouchEvent){

    }

    /**
     * 游戏操控
     */
    private touchMove(evt:egret.TouchEvent){
        if( this._touchStatus ){
            //控制台中心坐标
            var roundX = 150;
            var roundY = 900;
            //半径
            var roundR = 100;
            //外点
            var rsX = evt.stageX;
            var rsY = evt.stageY;
            var anX = rsX;
		    var anY = rsY;
            //两点之间的距离
		    var distance = Math.sqrt(Math.pow((roundX-rsX),2) + Math.pow((roundY-rsY),2));

            if(distance > roundR){
                /*第一象限*/
                if(rsX > roundX && rsY < roundY){
                    anX = roundX + (rsX - roundX) * 100 / distance; 
                    anY = roundY + (rsY - roundY) * 100 / distance;
                }
                /*第二象限*/
                if(rsX < roundX && rsY < roundY){
                    anX = roundX - (roundX - rsX) * 100 / distance; 
                    anY = roundY + (rsY - roundY) * 100 / distance;
                }
                /*第三象限*/
                if(rsX < roundX && rsY > roundY){
                    anX = roundX - (roundX - rsX) * 100 / distance; 
                    anY = roundY + (rsY - roundY) * 100 / distance;
                }
                /*第四象限*/
                if(rsX > roundX && rsY > roundY){
                    anX = roundX + (rsX - roundX) * 100 / distance; 
                    anY = roundY + (rsY - roundY) * 100 / distance;
                }		
            }

            this._ctrlGuide.x = anX;
            this._ctrlGuide.y = anY;
        }
    }

}


