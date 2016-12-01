var material;
(function (material) {
    var CtrlBomb = (function (_super) {
        __extends(CtrlBomb, _super);
        function CtrlBomb() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=CtrlBomb,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.ctrlBomb = new egret.Bitmap();
            this.ctrlBomb.texture = RES.getRes("bomb_png");
            this.ctrlBomb.x = this.stageW - 250;
            this.ctrlBomb.y = this.stageW + 100;
            this.ctrlBomb.width = 200;
            this.ctrlBomb.height = 200;
            this.ctrlBomb.alpha = 0;
            this.addChild(this.ctrlBomb);
        };
        p.showCtrlBomb = function () {
            this.ctrlBomb.alpha = 1;
        };
        p.hideCtrlBomb = function () {
            this.ctrlBomb.alpha = 0;
        };
        p.setCtrlBomb = function (num) {
            if (num <= 0) {
                this.hideCtrlBomb();
            }
            else {
                this.showCtrlBomb();
            }
        };
        return CtrlBomb;
    }(egret.DisplayObjectContainer));
    material.CtrlBomb = CtrlBomb;
    egret.registerClass(CtrlBomb,'material.CtrlBomb');
})(material || (material = {}));
