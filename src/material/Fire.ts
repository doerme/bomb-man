module material
{
    export class Fire extends  egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;

        public xCache:number;
        public yCache:number;
        public setTime:number;
        public lastTime:number;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        public contentText:string;
        private curFire:egret.Bitmap;
        
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.curFire = new egret.Bitmap();
            this.curFire.texture = RES.getRes("big-fire_png");
            this.curFire.x = 0;
            this.curFire.y = 0;
            this.curFire.width = 60;
            this.curFire.height = 60;
            this.addChild(this.curFire);
        }

    }
}