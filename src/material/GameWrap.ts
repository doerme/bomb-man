module material
{
    export class GameWrap extends  egret.DisplayObjectContainer
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
            var gameWrap:egret.Shape = new egret.Shape();
            gameWrap.graphics.beginFill( 0xffffff, 1);
            gameWrap.graphics.drawRect( 0, 0, this.stageW, this.stageH );
            gameWrap.graphics.endFill();
            this.addChild(gameWrap);
        }
    }
}