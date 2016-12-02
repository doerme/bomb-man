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
        /**炸弹按钮 */
        private ctrlBomb: material.CtrlBomb;

        /**炸弹[] */
        private bombResource: material.Bomb[] = [];
        /**放出的炸弹[] */
        private throwBombResource: material.Bomb[] = [];
        /**火花[] */
        private fireFlowerResource: material.Bomb[] = [];
        /**倒计时文本[] */
        private restTimelabelResource: material.GameLabel[] = [];
        /**爆炸火焰[] */
        private fireResource: material.Fire[] = [];

        private _gameStart:boolean = false;               //判断游戏是否已经开始  
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
            //炸弹按钮
            this.ctrlBomb = new material.CtrlBomb();
            this.addChild(this.ctrlBomb);
            //触碰事件绑定
            this.ctrlLever.touchEnabled = true;
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStart, this);
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.gameStart, this); //触碰控杆游戏开始
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.ctrlLever.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
            this.gameWrap.touchEnabled = true;
            this.gameWrap.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
            this.gameWrap.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);

            this.ctrlBomb.$touchEnabled = true;
            this.ctrlBomb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.throwBomb, this);
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
            this.pumpkin.x = this.stageW / 2;
            this.pumpkin.y = this.stageW / 2;
            this.addChild(this.pumpkin);
            
            //猪脚阴影
            
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
            this.pumpkin.speedX = 0;
            this.pumpkin.speedY = 0;
            this.pumpkin.seStop();
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

                /*控制逻辑 第一象限*/
                if(rsX > roundX && rsY < roundY){
                    this.pumpkin.speedX = this.pumpkin.speed * (rsX - roundX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunRight();
                }
                /*第二象限*/
                if(rsX < roundX && rsY < roundY){
                    this.pumpkin.speedX = -this.pumpkin.speed * (roundX - rsX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunLeft();
                }
                /*第三象限*/
                if(rsX < roundX && rsY > roundY){
                    this.pumpkin.speedX = -this.pumpkin.speed * (roundX - rsX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunLeft();
                }
                /*第四象限*/
                if(rsX > roundX && rsY > roundY){
                    this.pumpkin.speedX = this.pumpkin.speed * (rsX - roundX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunRight();
                }
            }
        }

         /**游戏开始*/
        private gameStart():void{
            if(this._gameStart){
                return;
            }
            this._gameStart = true;
            this.addEventListener(egret.Event.ENTER_FRAME,this.gameViewUpdate,this);
            this.sessionStart();
        }

        /**游戏画面更新*/
        private gameViewUpdate(evt:egret.Event):void{
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime:number = egret.getTimer();
            var fps:number = 1000/(nowTime-this._lastTime);
            var timeStamp:number = nowTime - this._lastTime;
            this._lastTime = nowTime;
            var speedOffset:number = 60/fps;
            //console.log(this._lastTime, timeStamp);

            this.drawPumpkin(timeStamp);

            //炸弹火花
            this.fireFloweMove();
            this.fireMove();

            //炸弹爆炸
            this.bombExplode(nowTime);
            
            //碰撞检测
            this.gameHitTest();
        }

        /**关数控制 */
        private sessionStart():void{
            console.log('sessionStart');
            var timer:egret.Timer = new egret.Timer(1500, 30);
            //创建炸弹
            timer.addEventListener(egret.TimerEvent.TIMER,this.createBomb,this);
            //timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.createBomb,this);
            timer.start();
        }

        /**创建炸弹 */
        private createBomb():void{
            var bomb:material.Bomb;
            bomb = material.Bomb.produce("bomb_png");
            
            bomb.width = 60;
            bomb.height = 60;
            bomb.x = bomb.width + Math.random() * (this.stageW - 2*bomb.width);
            bomb.y = bomb.width + Math.random() * (this.stageW - 2*bomb.width);
            this.addChild(bomb);
            this.bombResource.push(bomb);
            console.log('add bomb ',bomb);
        }

        /**放炸弹 */
        private throwBomb():void{
            if(this.pumpkin.havebomb <= 0){
                return;
            }

            var bomb:material.Bomb;
            bomb = material.Bomb.produce("bomb_png");
            bomb.width = 60;
            bomb.height = 60;
            bomb.x = this.pumpkin.x - this.pumpkin.width/2;
            bomb.y = this.pumpkin.y - this.pumpkin.height/2;
            bomb.setTime = egret.getTimer();
            bomb.lastTime = 3000;
            this.addChild(bomb);
            this.throwBombResource.push(bomb);
            this.pumpkin.havebomb --;
            this.ctrlBomb.setCtrlBomb(this.pumpkin.havebomb);

            var fireFlower:material.Bomb;
            fireFlower = material.Bomb.produce("fire_png");
            fireFlower.width = 20;
            fireFlower.height = 20;
            fireFlower.x = this.pumpkin.x - this.pumpkin.width/2 + 30;
            fireFlower.y = this.pumpkin.y - this.pumpkin.height/2 - 5;
            fireFlower.xCache = fireFlower.x;
            fireFlower.yCache = fireFlower.y;
            fireFlower.setTime = egret.getTimer();
            fireFlower.lastTime = bomb.lastTime;
            this.addChild(fireFlower);
            this.fireFlowerResource.push(fireFlower);

            var restTimeLabel:material.GameLabel;
            restTimeLabel = new material.GameLabel(fireFlower.lastTime.toString());
            restTimeLabel.x = this.pumpkin.x - 20;
            restTimeLabel.y = this.pumpkin.y - 80;
            this.addChild(restTimeLabel);
            this.restTimelabelResource.push(restTimeLabel);
        }

        /**火花抖动 */
        private fireFloweMove():void{
            for(var n in this.fireFlowerResource){
                this.fireFlowerResource[n].x = this.fireFlowerResource[n].xCache  - 5 + (Math.random()*10);
                this.fireFlowerResource[n].y = this.fireFlowerResource[n].yCache  - 5 + (Math.random()*10);
            }
        }

        /**爆炸火焰抖动 */
        private fireMove():void{
            for(var n in this.fireResource){
                this.fireResource[n].x = this.fireResource[n].xCache  - 5 + (Math.random()*10);
                this.fireResource[n].y = this.fireResource[n].yCache  - 5 + (Math.random()*10);
            }
        }

        /**炸弹爆炸 */
        private bombExplode(nowtime:number):void{
            for(var n in this.throwBombResource){
                //console.log(nowtime, this.throwBombResource[n].setTime);
                var tmpTime = this.throwBombResource[n].setTime + this.throwBombResource[n].lastTime - nowtime;
                if(tmpTime > 0){
                    console.log(tmpTime);
                    this.restTimelabelResource[n].setText(Math.floor(tmpTime/10).toString());
                }else{
                    console.log('explode');
                    this.fireExplode(nowtime, this.throwBombResource[n]);

                    material.Bomb.reclaim(this.throwBombResource[n]);
                    this.removeChild(this.throwBombResource[n]);
                    this.throwBombResource.splice(parseInt(n), 1);

                    material.Bomb.reclaim(this.fireFlowerResource[n]);
                    this.removeChild(this.fireFlowerResource[n]);
                    this.fireFlowerResource.splice(parseInt(n), 1);

                    this.removeChild(this.restTimelabelResource[n]);
                    this.restTimelabelResource.splice(parseInt(n), 1);
                }
            }
        }

        /**爆炸火焰 */
        private fireExplode(nowtime:number, bombObj:material.Bomb):void{
            var tmpFire = new material.Fire;
            var tmpOffset = 60;
            tmpFire.setTime = egret.getTimer();
            tmpFire.lastTime = 1000;
            tmpFire.xCache = bombObj.x;
            tmpFire.x = bombObj.x;
            tmpFire.yCache = bombObj.y;
            tmpFire.y = bombObj.y;
            this.addChild(tmpFire);
            this.fireResource.push(tmpFire);

            for(var n = 0; n < this.pumpkin.fireable; n++){
                //left
                var tmpFire = new material.Fire;
                var tmpOffset = 50;
                tmpFire.setTime = egret.getTimer();
                tmpFire.lastTime = 1000;
                tmpFire.xCache = bombObj.x - (n + 1)*tmpOffset;
                tmpFire.x = bombObj.x - (n + 1)*tmpOffset;
                tmpFire.yCache = bombObj.y;
                tmpFire.y = bombObj.y;
                this.addChild(tmpFire);
                this.fireResource.push(tmpFire);
                //right
                var tmpFire = new material.Fire;
                var tmpOffset = 60;
                tmpFire.setTime = egret.getTimer();
                tmpFire.lastTime = 1000;
                tmpFire.xCache = bombObj.x + (n + 1)*tmpOffset;
                tmpFire.x = bombObj.x + (n + 1)*tmpOffset;
                tmpFire.yCache = bombObj.y;
                tmpFire.y = bombObj.y;
                this.addChild(tmpFire);
                this.fireResource.push(tmpFire);
                //top
                var tmpFire = new material.Fire;
                var tmpOffset = 60;
                tmpFire.setTime = egret.getTimer();
                tmpFire.lastTime = 1000;
                tmpFire.xCache = bombObj.x;
                tmpFire.x = bombObj.x;
                tmpFire.yCache = bombObj.y - (n + 1)*tmpOffset;
                tmpFire.y = bombObj.y - (n + 1)*tmpOffset;
                this.addChild(tmpFire);
                this.fireResource.push(tmpFire);
                //bottom
                var tmpFire = new material.Fire;
                var tmpOffset = 60;
                tmpFire.setTime = egret.getTimer();
                tmpFire.lastTime = 1000;
                tmpFire.xCache = bombObj.x;
                tmpFire.x = bombObj.x;
                tmpFire.yCache = bombObj.y + (n + 1)*tmpOffset;
                tmpFire.y = bombObj.y + (n + 1)*tmpOffset;
                this.addChild(tmpFire);
                this.fireResource.push(tmpFire);
            }


        }

        /**画南瓜 */
        private drawPumpkin(timeStamp):void{
            if(timeStamp < 60){
                var _tmp_dx = this.pumpkin.speedX * (timeStamp) / 1000;
                var _tmp_dy = this.pumpkin.speedY * (timeStamp) / 1000;

                this.pumpkin.x = this.pumpkin.x + _tmp_dx;
                this.pumpkin.y = this.pumpkin.y + _tmp_dy;

                //console.log(this.pumpkin.x, this.pumpkin.y);

                /*防撞墙*/
                if(this.pumpkin.x < this.pumpkin.width){
                    console.log('fzq 1');
                    this.pumpkin.x = this.pumpkin.width;
                }

                if(this.pumpkin.x > this.stageW - this.pumpkin.width){
                    console.log('fzq 2');
                    this.pumpkin.x = this.stageW - this.pumpkin.width;
                }

                if(this.pumpkin.y < this.pumpkin.height){
                    console.log('fzq 3');
                    this.pumpkin.y = this.pumpkin.height;
                }

                if(this.pumpkin.y > this.stageW - this.pumpkin.height){
                    console.log('fzq 4');
                    this.pumpkin.y = this.stageW - this.pumpkin.height;
                }

                /*防撞墙end*/
                
                this.pumpkin.walked += Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
            }else{
                this.pumpkin.x = this.stageW / 2;
                this.pumpkin.y = this.stageW / 2;
            }
            
        }

        /**游戏碰撞检测 */
        private gameHitTest():void {
            //我拿炸弹
            for(var n in this.bombResource) {
                if(material.GameUtil.hitRoundTest(this.bombResource[n],this.pumpkin)) {
                    this.pumpkin.havebomb += 10;
                    console.log('hit', this.pumpkin.havebomb);
                    this.ctrlBomb.setCtrlBomb(this.pumpkin.havebomb);
                    material.Bomb.reclaim(this.bombResource[n]);
                    this.removeChild(this.bombResource[n]);
                    this.bombResource.splice(parseInt(n), 1);
                }
            }
        }
    }
}