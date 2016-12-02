module material
{
    export class GameLabel extends  egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;

        public constructor(contentText: string) {
            super();
            this.contentText = contentText;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        public contentText:string;
        private olabel:egret.TextField;
        
        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.olabel = new egret.TextField();
            this.olabel.x = 0;
            this.olabel.y = 0;
            this.olabel.textColor = 0xff0000;
            this.olabel.height = 70;
            this.olabel.size = 30;
            this.olabel.text = this.contentText; 
            this.addChild(this.olabel);
        }

        public setText(contentText: string):void{
            this.olabel.text = contentText;
        }
    }
}