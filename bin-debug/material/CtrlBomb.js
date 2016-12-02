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
            this.label = new egret.TextField();
            this.label.textColor = 0xff0000;
            this.label.width = 70;
            this.label.height = 70;
            this.label.size = 50;
            this.addChild(this.label);
        };
        p.showCtrlBomb = function () {
            this.ctrlBomb.alpha = 1;
            this.label.alpha = 1;
        };
        p.hideCtrlBomb = function () {
            this.ctrlBomb.alpha = 0;
            this.label.alpha = 0;
        };
        p.setCtrlBomb = function (num) {
            console.log('setCtrlBomb', num);
            if (num <= 0) {
                this.hideCtrlBomb();
            }
            else {
                this.showCtrlBomb();
                var tmpX = this.stageW - 250;
                var tmpY = this.stageW + 100;
                this.label.x = tmpX;
                this.label.y = tmpY;
                this.label.text = num.toString();
                egret.Tween.get(this.ctrlBomb).to({ scaleX: .8, scaleY: .8, x: tmpX + 20, y: tmpY + 20 }, 500, egret.Ease.circIn).to({ scaleX: 1, scaleY: 1, x: tmpX, y: tmpY }, 500, egret.Ease.circIn);
            }
        };
        return CtrlBomb;
    }(egret.DisplayObjectContainer));
    material.CtrlBomb = CtrlBomb;
    egret.registerClass(CtrlBomb,'material.CtrlBomb');
})(material || (material = {}));
