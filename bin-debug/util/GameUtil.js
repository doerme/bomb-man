/**
 * Created by shaorui on 14-6-6.
 */
var material;
(function (material) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        var d = __define,c=GameUtil,p=c.prototype;
        /**基于矩形的碰撞检测*/
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        /**圆形碰撞检测 */
        GameUtil.hitRoundTest = function (obj1, obj2) {
            var _tmp_dx = obj1.x - obj2.x;
            var _tmp_dy = obj1.y - obj2.y;
            var distance = Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
            //console.log(distance);
            if (distance < (obj1.width + obj2.width) / 2) {
                return true;
            }
            else {
                return false;
            }
        };
        return GameUtil;
    }());
    material.GameUtil = GameUtil;
    egret.registerClass(GameUtil,'material.GameUtil');
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    material.createBitmapByName = createBitmapByName;
})(material || (material = {}));
