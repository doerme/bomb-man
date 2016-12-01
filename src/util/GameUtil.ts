/**
 * Created by shaorui on 14-6-6.
 */
module material
{
    export class GameUtil
    {
        /**基于矩形的碰撞检测*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }

        /**圆形碰撞检测 */
        public static hitRoundTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var _tmp_dx = obj1.x - obj2.x;
            var _tmp_dy = obj1.y - obj2.y;
            var distance = Math.sqrt((_tmp_dx * _tmp_dx) + (_tmp_dy * _tmp_dy));
            console.log(distance);
            if (distance <  obj1.width + obj2.width) {
                return true;
            }else{
                return false;
            }
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}