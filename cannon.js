//炮筒属性:x,y,type,rotate,speed,imgY
//炮筒方法：draw 发射时会抖动emit
var CANNON_SIZE = [
	null,
	{ w: 74, h: 74 },
	{ w: 74, h: 76 },
	{ w: 74, h: 76 },
	{ w: 74, h: 83 },
	{ w: 74, h: 85 },
	{ w: 74, h: 90 },
	{ w: 74, h: 94 }
];
class Cannon {
	constructor(type) {
		this.x = 431;
		this.y = 570;

		this.type = type || 1;
		this.rotate = 0;
		this.speed = 10;
		this.imgY = 0;

		this.timer = null;
		
	}
	draw(gd) {
		var w = CANNON_SIZE[this.type].w;
		var h = CANNON_SIZE[this.type].h;

		gd.save();
			gd.translate(this.x, this.y);
			gd.rotate(d2a(this.rotate));
			gd.drawImage(Json["cannon" + this.type],
				0, h * this.imgY, w, h,
				-w/2,-h/2,w,h
			)
		gd.restore();
	}
	emit(){
		clearInterval(this.timer);//防止出现炮筒点击后不停地动，应该是点一下动一下
		this.timer=setInterval(function(){
			this.imgY++;
			if(this.imgY==5){
				this.imgY=0;
				clearInterval(this.timer)
			}
		}.bind(this),30)
	}
	
}