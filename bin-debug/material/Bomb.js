/**
 * Created by shaorui on 14-6-7.
 */
var material;
(function (material) {
    /**
     * 炸弹，利用对象池
     */
    var Bomb = (function (_super) {
        __extends(Bomb, _super);
        function Bomb(texture, textureName) {
            _super.call(this, texture);
            this.xCache = 0;
            this.yCache = 0;
            this.textureName = textureName;
        }
        var d = __define,c=Bomb,p=c.prototype;
        /**生产*/
        Bomb.produce = function (textureName) {
            if (material.Bomb.cacheDict[textureName] == null)
                material.Bomb.cacheDict[textureName] = [];
            var dict = material.Bomb.cacheDict[textureName];
            var Bomb;
            if (dict.length > 0) {
                Bomb = dict.pop();
            }
            else {
                Bomb = new material.Bomb(RES.getRes(textureName), textureName);
            }
            return Bomb;
        };
        /**回收*/
        Bomb.reclaim = function (Bomb) {
            var textureName = Bomb.textureName;
            if (material.Bomb.cacheDict[textureName] == null)
                material.Bomb.cacheDict[textureName] = [];
            var dict = material.Bomb.cacheDict[textureName];
            if (dict.indexOf(Bomb) == -1)
                dict.push(Bomb);
        };
        Bomb.cacheDict = {};
        return Bomb;
    }(egret.Bitmap));
    material.Bomb = Bomb;
    egret.registerClass(Bomb,'material.Bomb');
})(material || (material = {}));
