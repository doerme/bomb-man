var material;
(function (material) {
    var GameWrap = (function (_super) {
        __extends(GameWrap, _super);
        function GameWrap() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameWrap,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var gameWrap = new egret.Shape();
            gameWrap.graphics.beginFill(0xffffff, 1);
            gameWrap.graphics.drawRect(0, 0, this.stageW, this.stageH);
            gameWrap.graphics.endFill();
            this.addChild(gameWrap);
        };
        return GameWrap;
    }(egret.DisplayObjectContainer));
    material.GameWrap = GameWrap;
    egret.registerClass(GameWrap,'material.GameWrap');
})(material || (material = {}));
//# sourceMappingURL=GameWrap.js.map