module material
{
    export class BgMap extends  egret.DisplayObjectContainer
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
            img.texture = RES.getRes("map_2_jpg");
            img.fillMode = egret.BitmapFillMode.REPEAT;
            img.width = this.stageW;
            img.height = this.stageW;
            img.alpha = 0.4;
            this.addChild(img);
        }
    }
}