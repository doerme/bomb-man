var material;
(function (material) {
    var BgMap = (function (_super) {
        __extends(BgMap, _super);
        function BgMap() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=BgMap,p=c.prototype;
        p.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            var img = new egret.Bitmap();
            img.texture = RES.getRes("map_2_jpg");
            img.fillMode = egret.BitmapFillMode.REPEAT;
            img.width = this.stageW;
            img.height = this.stageW;
            img.alpha = 0.4;
            this.addChild(img);
        };
        return BgMap;
    }(egret.DisplayObjectContainer));
    material.BgMap = BgMap;
    egret.registerClass(BgMap,'material.BgMap');
})(material || (material = {}));
