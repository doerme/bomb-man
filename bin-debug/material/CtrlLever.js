var material;
(function (material) {
    var CtrlLever = (function (_super) {
        __extends(CtrlLever, _super);
        function CtrlLever() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=CtrlLever,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var ctrlLever = new egret.Shape();
            ctrlLever.x = 150;
            ctrlLever.y = this.stageW + 200;
            ctrlLever.graphics.beginFill(0xdddddd, 1);
            ctrlLever.graphics.drawCircle(0, 0, 100);
            ctrlLever.graphics.endFill();
            this.addChild(ctrlLever);
        };
        return CtrlLever;
    }(egret.DisplayObjectContainer));
    material.CtrlLever = CtrlLever;
    egret.registerClass(CtrlLever,'material.CtrlLever');
})(material || (material = {}));
//# sourceMappingURL=CtrlLever.js.map