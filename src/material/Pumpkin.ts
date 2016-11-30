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

        private runner:egret.MovieClip;


        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.speed = 2;
            var data = RES.getRes("cat_json");
            var txtr = RES.getRes("cat_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
            this.runner = new egret.MovieClip( mcFactory.generateMovieClipData( "cat" ) );
            this.setRunLeft();
            this.addChild(this.runner);
            this.runner.play(-1);
        }

        public setRunRight(){
            this.runner.x = this.stageW/2 - this.runner.width/2;
            this.runner.y = this.stageW/2 - this.runner.height/2;
            this.runner.scaleX = 1;
        }

        public setRunLeft(){
            this.runner.x = this.stageW/2 + this.runner.width/2;
            this.runner.y = this.stageW/2 - this.runner.height/2;
            this.runner.scaleX = -1;
        }

    }
}