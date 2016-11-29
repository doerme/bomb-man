var material;
(function (material) {
    var Shadow = (function (_super) {
        __extends(Shadow, _super);
        function Shadow() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Shadow,p=c.prototype;
        p.onAddToStage = function (event) {
            this.drawShadow(this.x, this.y, this.offsetY, 5);
        };
        p.drawShadow = function (x, y, a, b) {
            var shp = new egret.Shape();
            shp.graphics.beginFill(0x333333);
            var step = (a > b) ? 1 / a : 1 / b;
            shp.graphics.moveTo(x + a, y);
            for (var i = 0; i < 2 * Math.PI; i += step) {
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                shp.graphics.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
            }
            shp.graphics.endFill();
            this.addChild(shp);
        };
        return Shadow;
    }(egret.DisplayObjectContainer));
    material.Shadow = Shadow;
    egret.registerClass(Shadow,'material.Shadow');
})(material || (material = {}));
