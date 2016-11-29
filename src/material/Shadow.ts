module material
{
    export class Shadow extends  egret.DisplayObjectContainer
    {
        /**x坐标 */
        public x:number;
        /**y坐标 */
        public y:number;
        /**x方向偏移量 */
        public offsetX:number;
        /**y方向偏移量 */
        public offsetY:number;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event){
            this.drawShadow(this.x, this.y, this.offsetY, 5);
        }

        private drawShadow(x, y, a, b){
            var shp:egret.Shape = new egret.Shape();
            shp.graphics.beginFill( 0x333333 );
            var step = (a > b) ? 1 / a : 1 / b;
            shp.graphics.moveTo(x + a, y);
            for (var i = 0; i < 2 * Math.PI; i += step)
            {
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                shp.graphics.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
            }
            shp.graphics.endFill();
            this.addChild( shp );
        }
    }



    
}