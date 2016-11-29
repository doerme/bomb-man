module material
{
    export class Pumpkin extends  egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;
        /**速度*/
        public speed:number;
        public speedX:number;
        public speedY:number;
        /**行程 */
        public walked:number;
        /**上一次渲染时间 */
        public lastactiontime:number;
        /**拥有炸弹数 */
        public havebomb:number;
        /**火力 */
        public fireable:number;
        /**杀人数 */
        public killed:number;
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
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.speed = 1;
            var img:egret.Bitmap = new egret.Bitmap();
            img.texture = RES.getRes("mine_png");
            img.width = 120;
            img.height = 120;
            img.x = this.stageW/2 - img.width / 2;
            img.y = this.stageW/2 - img.height / 2;
            this.addChild(img);

        }
    }
}