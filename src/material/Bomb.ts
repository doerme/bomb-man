/**
 * Created by shaorui on 14-6-7.
 */
module material
{
    /**
     * 炸弹，利用对象池
     */
    export class Bomb extends egret.Bitmap
    {
        public xCache:number = 0;
        public yCache:number = 0;
        public setTime:number;
        public lastTime:number;
        private static cacheDict:Object = {};
        /**生产*/
        public static produce(textureName:string):material.Bomb
        {
            if(material.Bomb.cacheDict[textureName]==null)
                material.Bomb.cacheDict[textureName] = [];
            var dict:material.Bomb[] = material.Bomb.cacheDict[textureName];
            var Bomb:material.Bomb;
            if(dict.length>0) {
                Bomb = dict.pop();
            } else {
                Bomb = new material.Bomb(RES.getRes(textureName),textureName);
            }
            return Bomb;
        }
        /**回收*/
        public static reclaim(Bomb:material.Bomb):void
        {
             var textureName: string = Bomb.textureName;
            if(material.Bomb.cacheDict[textureName]==null)
                material.Bomb.cacheDict[textureName] = [];
            var dict:material.Bomb[] = material.Bomb.cacheDict[textureName];
            if(dict.indexOf(Bomb)==-1)
                dict.push(Bomb);
        }

        public textureName:string;//可视为炸弹类型名

        public constructor(texture:egret.Texture,textureName: string) {
            super(texture);
            this.textureName = textureName;
		}
    }
}