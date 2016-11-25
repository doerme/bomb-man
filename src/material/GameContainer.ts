module material
{
    /**
     * 主游戏容器
     */
    export class GameContainer extends egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;
        /**游戏大盒子 */
        private gameWrap: material.GameWrap;
        /**游戏背景*/
        private bg: material.BgMap;
        /**南瓜猪脚 */
        private pumpkin: material.Pumpkin;
        /**游戏控制杆 */
        private ctrlLever: material.CtrlLever;

        private _ctrlGuide:egret.Shape;                   //操控杆对象
        private _touchStatus:boolean = false;             //当前触摸状态，按下时，值为true
        /**@private*/
        private _lastTime:number;

        public constructor() {
            super();
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        /**初始化*/
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.createGameScene();
        }

        /**创建游戏场景*/
        private createGameScene():void{
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.gameWrap = new material.GameWrap();
            this.addChild(this.gameWrap);
            //背景
            this.bg = new material.BgMap();//创建可滚动的背景
            this.addChild(this.bg);
            //控制杆
            this.ctrlLever = new material.CtrlLever();
            this.addChild(this.ctrlLever);
            //触碰事件绑定
            this.ctrlLever.touchEnabled = true;
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this); //触碰控杆游戏开始
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            this.gameWrap.touchEnabled = true;
            this.gameWrap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.gameWrap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            //控制杆心
            this._ctrlGuide = new egret.Shape();
            this._ctrlGuide.x = 150;
            this._ctrlGuide.y = this.stageW + 200;
            this._ctrlGuide.graphics.beginFill( 0x2b96e1, 1);
            this._ctrlGuide.graphics.drawCircle( 0, 0, 50 );
            this._ctrlGuide.graphics.endFill();
            this._ctrlGuide.alpha = 0;
            this.addChild(this._ctrlGuide);
            //猪脚
            this.pumpkin = new material.Pumpkin();
            this.addChild(this.pumpkin);
        }

        /**
         * 游戏操控
         */
        private touchStart(evt:egret.TouchEvent){
            console.log("touchStart");
            this._touchStatus = true;
            this._ctrlGuide.alpha = 1;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        }

        /**
         * 游戏操控
         */
        private touchEnd(evt:egret.TouchEvent){
            this._touchStatus = false;
            this._ctrlGuide.alpha = 0;
        }

        /**
         * 游戏操控
         */
        private touchMove(evt:egret.TouchEvent){
            if( this._touchStatus ){
                //控制台中心坐标
                var roundX = 150;
                var roundY = this.stageW + 200;
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

         /**游戏开始*/
        private gameStart():void{
            this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
        }

        /**游戏画面更新*/
        private gameViewUpdate(evt:egret.Event):void{
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime:number = egret.getTimer();
            var fps:number = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;
            var speedOffset:number = 60/fps;
            console.log(this._lastTime);
        }

    }
}