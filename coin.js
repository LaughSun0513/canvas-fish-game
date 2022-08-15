//金币属性：x,y,type,移动位置
//金币方法:draw move
class Coin{
	constructor(type){
		this.type=type||1;
		this.x=0;
		this.y=0;
		this.imgY=0;
		this.scale=0.5;
		this.timer=null;
		this.move();
		this.music();
	}
	draw(gd){
		gd.save();
			switch(this.type){
				case 1:
				case 2:
					gd.drawImage(Json["coinAni1"],
					0,this.imgY*60,60,60,
					this.x,this.y,60,60
				);
				break;
				case 3:
				case 4:
				case 5:
					gd.drawImage(Json["coinAni2"],
					0,this.imgY*60,60,60,
					this.x,this.y,60,60
				);
				break;				
				
			}
		gd.restore();
	}
	move(){
		var _this=this;
		this.timer=setInterval(function(){

			_this.x+=(0-_this.x)/10;
			_this.y+=(630-_this.y)/10;
			
			_this.imgY++;
			if(_this.imgY==10){
				_this.imgY=0;
			}
			_this.scale-=0.05;
			if(_this.scale<0){
				clearInterval(this.timer);
			}
		},30)
	}
	music(){
		var oA=new Audio();
		oA.src="snd/coin.wav";;
		oA.play();
	}
}
