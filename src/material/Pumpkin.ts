module material
{
    export class Pumpkin extends  egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
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