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
            this.setRunLeft();
            this.addChild(this.runner);
            this.runner.play(-1);
        };
        p.setRunRight = function () {
            this.runner.x = this.stageW / 2 - this.runner.width / 2;
            this.runner.y = this.stageW / 2 - this.runner.height / 2;
            this.runner.scaleX = 1;
        };
        p.setRunLeft = function () {
            this.runner.x = this.stageW / 2 + this.runner.width / 2;
            this.runner.y = this.stageW / 2 - this.runner.height / 2;
            this.runner.scaleX = -1;
        };
        return Pumpkin;
    }(egret.DisplayObjectContainer));
    material.Pumpkin = Pumpkin;
    egret.registerClass(Pumpkin,'material.Pumpkin');
})(material || (material = {}));
//# sourceMappingURL=Pumpkin.js.map