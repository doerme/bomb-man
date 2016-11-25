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
            var img = new egret.Bitmap();
            img.texture = RES.getRes("mine_png");
            img.width = 120;
            img.height = 120;
            img.x = this.stageW / 2 - img.width / 2;
            img.y = this.stageW / 2 - img.height / 2;
            this.addChild(img);
        };
        return Pumpkin;
    }(egret.DisplayObjectContainer));
    material.Pumpkin = Pumpkin;
    egret.registerClass(Pumpkin,'material.Pumpkin');
})(material || (material = {}));
