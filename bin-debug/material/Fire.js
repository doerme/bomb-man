var material;
(function (material) {
    var Fire = (function (_super) {
        __extends(Fire, _super);
        function Fire() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Fire,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.curFire = new egret.Bitmap();
            this.curFire.texture = RES.getRes("big-fire_png");
            this.curFire.x = 0;
            this.curFire.y = 0;
            this.curFire.width = 100;
            this.curFire.height = 100;
            this.addChild(this.curFire);
        };
        return Fire;
    }(egret.DisplayObjectContainer));
    material.Fire = Fire;
    egret.registerClass(Fire,'material.Fire');
})(material || (material = {}));
