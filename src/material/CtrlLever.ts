module material
{
    export class CtrlLever extends  egret.DisplayObjectContainer
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
            var ctrlLever:egret.Shape = new egret.Shape();
            ctrlLever.x = 150;
            ctrlLever.y = this.stageW + 200;
            ctrlLever.graphics.beginFill( 0xdddddd, 1);
            ctrlLever.graphics.drawCircle( 0, 0, 100 );
            ctrlLever.graphics.endFill();
            this.addChild(ctrlLever);
        }
    }
}