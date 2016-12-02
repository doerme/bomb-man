var material;
(function (material) {
    var GameLabel = (function (_super) {
        __extends(GameLabel, _super);
        function GameLabel(contentText) {
            _super.call(this);
            this.contentText = contentText;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameLabel,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.olabel = new egret.TextField();
            this.olabel.x = 0;
            this.olabel.y = 0;
            this.olabel.textColor = 0xff0000;
            this.olabel.height = 70;
            this.olabel.size = 30;
            this.olabel.text = this.contentText;
            this.addChild(this.olabel);
        };
        p.setText = function (contentText) {
            this.olabel.text = contentText;
        };
        return GameLabel;
    }(egret.DisplayObjectContainer));
    material.GameLabel = GameLabel;
    egret.registerClass(GameLabel,'material.GameLabel');
})(material || (material = {}));
