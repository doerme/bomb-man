module material
{
    export class CtrlBomb extends  egret.DisplayObjectContainer
    {
        /**stage宽*/
        private stageW:number;
        /**stage高*/
        private stageH:number;
        /**控杆 */
        private ctrlBomb:egret.Bitmap;

        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(event:egret.Event){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.ctrlBomb = new egret.Bitmap();
            this.ctrlBomb.texture = RES.getRes("bomb_png");
            this.ctrlBomb.x = this.stageW - 250;
            this.ctrlBomb.y = this.stageW + 100;
            this.ctrlBomb.width = 200;
            this.ctrlBomb.height = 200;
            this.ctrlBomb.alpha = 0;
            this.addChild(this.ctrlBomb);
        }

        private showCtrlBomb():void{
            this.ctrlBomb.alpha = 1;
        }

        private hideCtrlBomb():void{
            this.ctrlBomb.alpha = 0;
        }

        public setCtrlBomb(num:number){
            if(num <= 0){
                this.hideCtrlBomb();
            }else{
                this.showCtrlBomb();
                var tmpX = this.ctrlBomb.x;
                var tmpY = this.ctrlBomb.y;
                egret.Tween.get(  this.ctrlBomb ).to( 
                    { scaleX:.8, scaleY:.8, x: tmpX + 20, y: tmpY + 20 }, 500, egret.Ease.circIn ).to( 
                        { scaleX:1, scaleY:1, x: tmpX, y: tmpY }, 500, egret.Ease.circIn );
            }
        }
    }
}