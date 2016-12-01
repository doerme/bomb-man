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
        /**数量文本 */
        private label:egret.TextField;

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

            this.label = new egret.TextField();
            this.label.textColor = 0xff0000;
            this.label.width = 70;
            this.label.height = 70;
            this.label.size = 50;
            this.addChild(this.label);
        }

        private showCtrlBomb():void{
            this.ctrlBomb.alpha = 1;
        }

        private hideCtrlBomb():void{
            this.ctrlBomb.alpha = 0;
        }

        public setCtrlBomb(num:number){
            console.log('setCtrlBomb', num);
            if(num <= 0){
                this.hideCtrlBomb();
            }else{
                this.showCtrlBomb();
                var tmpX = this.stageW - 250;
                var tmpY = this.stageW + 100;
                this.label.x = tmpX;
                this.label.y = tmpY;
                this.label.text = num.toString();
                egret.Tween.get(  this.ctrlBomb ).to( 
                    { scaleX:.8, scaleY:.8, x: tmpX + 20, y: tmpY + 20 }, 500, egret.Ease.circIn ).to( 
                        { scaleX:1, scaleY:1, x: tmpX, y: tmpY }, 500, egret.Ease.circIn );
            }
        }
    }
}