var material;
(function (material) {
    var Pumpkin = (function (_super) {
        __extends(Pumpkin, _super);
        function Pumpkin() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Pumpkin,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.speed = 2;
            var data = RES.getRes("cat_json");
            var txtr = RES.getRes("cat_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.runner = new egret.MovieClip(mcFactory.generateMovieClipData("cat"));
            this.runner.x = this.stageW / 2 - this.runner.width / 2;
            this.runner.y = this.stageW / 2 - this.runner.height / 2;
            this.seStop();
            this.addChild(this.runner);
        };
        p.setRunRight = function () {
            if (this.runnerState == 'right') {
                return;
            }
            this.runnerState = 'right';
            this.runner.x = this.stageW / 2 - this.runner.width / 2;
            this.runner.y = this.stageW / 2 - this.runner.height / 2;
            this.runner.scaleX = 1;
            this.runner.gotoAndPlay("run", -1);
        };
        p.setRunLeft = function () {
            if (this.runnerState == 'left') {
                return;
            }
            this.runnerState = 'left';
            this.runner.x = this.stageW / 2 + this.runner.width / 2;
            this.runner.y = this.stageW / 2 - this.runner.height / 2;
            this.runner.scaleX = -1;
            this.runner.gotoAndPlay("run", -1);
        };
        p.seStop = function () {
            if (this.runnerState == 'stop') {
                return;
            }
            this.runnerState = 'stop';
            this.runner.gotoAndPlay("stop", -1);
        };
        return Pumpkin;
    }(egret.DisplayObjectContainer));
    material.Pumpkin = Pumpkin;
    egret.registerClass(Pumpkin,'material.Pumpkin');
})(material || (material = {}));
