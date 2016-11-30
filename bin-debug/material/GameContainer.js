var material;
(function (material) {
    /**
     * 主游戏容器
     */
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            /**阴影[] */
            this.shadows = [];
            this._touchStatus = false; //当前触摸状态，按下时，值为true
            this._lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameContainer,p=c.prototype;
        /**初始化*/
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        };
        /**创建游戏场景*/
        p.createGameScene = function () {
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.gameWrap = new material.GameWrap();
            this.addChild(this.gameWrap);
            //背景
            this.bg = new material.BgMap(); //创建可滚动的背景
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
            this._ctrlGuide.graphics.beginFill(0x2b96e1, 1);
            this._ctrlGuide.graphics.drawCircle(0, 0, 50);
            this._ctrlGuide.graphics.endFill();
            this._ctrlGuide.alpha = 0;
            this.addChild(this._ctrlGuide);
            //猪脚
            this.pumpkin = new material.Pumpkin();
            this.addChild(this.pumpkin);
            //猪脚阴影
        };
        /**
         * 游戏操控
         */
        p.touchStart = function (evt) {
            console.log("touchStart");
            this._touchStatus = true;
            this._ctrlGuide.alpha = 1;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        };
        /**
         * 游戏操控
         */
        p.touchEnd = function (evt) {
            this._touchStatus = false;
            this._ctrlGuide.alpha = 0;
            this.pumpkin.speedX = 0;
            this.pumpkin.speedY = 0;
        };
        /**
         * 游戏操控
         */
        p.touchMove = function (evt) {
            if (this._touchStatus) {
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
                var distance = Math.sqrt(Math.pow((roundX - rsX), 2) + Math.pow((roundY - rsY), 2));
                if (distance > roundR) {
                    /*第一象限*/
                    if (rsX > roundX && rsY < roundY) {
                        anX = roundX + (rsX - roundX) * 100 / distance;
                        anY = roundY + (rsY - roundY) * 100 / distance;
                    }
                    /*第二象限*/
                    if (rsX < roundX && rsY < roundY) {
                        anX = roundX - (roundX - rsX) * 100 / distance;
                        anY = roundY + (rsY - roundY) * 100 / distance;
                    }
                    /*第三象限*/
                    if (rsX < roundX && rsY > roundY) {
                        anX = roundX - (roundX - rsX) * 100 / distance;
                        anY = roundY + (rsY - roundY) * 100 / distance;
                    }
                    /*第四象限*/
                    if (rsX > roundX && rsY > roundY) {
                        anX = roundX + (rsX - roundX) * 100 / distance;
                        anY = roundY + (rsY - roundY) * 100 / distance;
                    }
                }
                this._ctrlGuide.x = anX;
                this._ctrlGuide.y = anY;
                /*控制逻辑 第一象限*/
                if (rsX > roundX && rsY < roundY) {
                    this.pumpkin.speedX = this.pumpkin.speed * (rsX - roundX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunRight();
                }
                /*第二象限*/
                if (rsX < roundX && rsY < roundY) {
                    this.pumpkin.speedX = -this.pumpkin.speed * (roundX - rsX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunLeft();
                }
                /*第三象限*/
                if (rsX < roundX && rsY > roundY) {
                    this.pumpkin.speedX = -this.pumpkin.speed * (roundX - rsX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunLeft();
                }
                /*第四象限*/
                if (rsX > roundX && rsY > roundY) {
                    this.pumpkin.speedX = this.pumpkin.speed * (rsX - roundX) * 100 / distance;
                    this.pumpkin.speedY = this.pumpkin.speed * (rsY - roundY) * 100 / distance;
                    this.pumpkin.setRunRight();
                }
            }
        };
        /**游戏开始*/
        p.gameStart = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        };
        /**游戏画面更新*/
        p.gameViewUpdate = function (evt) {
            //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this._lastTime);
            var timeStamp = nowTime - this._lastTime;
            this._lastTime = nowTime;
            var speedOffset = 60 / fps;
            //console.log(this._lastTime, timeStamp);
            this.drawPumpkin(timeStamp);
        };
        /**画南瓜 */
        p.drawPumpkin = function (timeStamp) {
            if (timeStamp > 100) {
                return;
            }
            var _tmp_dx = this.pumpkin.speedX * (timeStamp) / 1000;
            var _tmp_dy = this.pumpkin.speedY * (timeStamp) / 1000;
            this.pumpkin.x = this.pumpkin.x + _tmp_dx;
            this.pumpkin.y = this.pumpkin.y + _tmp_dy;
            console.log(this.pumpkin.x, this.pumpkin.y);
            /*防撞墙*/
            if (this.pumpkin.x < this.pumpkin.width / 2 - this.stageW / 2) {
                this.pumpkin.x = this.pumpkin.width / 2 - this.stageW / 2;
            }
            if (this.pumpkin.y < this.pumpkin.height / 2 - this.stageW / 2) {
                this.pumpkin.y = this.pumpkin.height / 2 - this.stageW / 2;
            }
            if (this.pumpkin.x > this.stageW / 2 - this.pumpkin.width / 2) {
                this.pumpkin.x = this.stageW / 2 - this.pumpkin.width / 2;
            }
            if (this.pumpkin.y > this.stageW / 2 - this.pumpkin.height / 2) {
                this.pumpkin.y = this.stageW / 2 - this.pumpkin.height / 2;
            }
            /*防撞墙end*/
            this.pumpkin.walked += Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
            // if(this.pumpkin.speedX != 0 || this.pumpkin.speedY != 0){
            // 	if(parseInt(this.pumpkin.walked) % 50 > 25){
            // 		this.pumpkin.yoffset = 0;
            // 	}else{
            // 		this.pumpkin.yoffset = 10;
            // 	}
            // }else{
            // 	this.pumpkin.yoffset = 10;
            // }
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    material.GameContainer = GameContainer;
    egret.registerClass(GameContainer,'material.GameContainer');
})(material || (material = {}));
//# sourceMappingURL=GameContainer.js.map