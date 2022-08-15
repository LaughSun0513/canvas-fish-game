//鱼的属性：坐标（x,y），大小，类型type，角度rotate，速度speed，
//鱼的方法：  画鱼   移动 move    
var FISH_SIZE = [
	null,
	{ w: 55, h: 37, collR: 17 },
	{ w: 78, h: 64, collR: 24 },
	{ w: 72, h: 56, collR: 20 },
	{ w: 77, h: 59, collR: 22 },
	{ w: 107, h: 122, collR: 29 }
];
class Diefish {
	constructor(type) {
		this.type = type;
		this.x = 0;
		this.y = 0;
		this.rotate = 0;

		this.imgY = 0;
		this.timer = null;
		this.move();
		this.clear();
	}
	draw(gd) {
		//获取鱼的宽高
		var w = FISH_SIZE[this.type].w;
		var h = FISH_SIZE[this.type].h;
		this.collR = FISH_SIZE[this.type].collR;
		//开始绘制
		gd.save();
		gd.translate(this.x, this.y);
		gd.rotate(d2a(this.rotate));
		if (this.rotate > 90 && this.rotate < 270) {//如果鱼的角度在90-270，就翻转轴，改变影子角度
			gd.scale(1, -1);
		}
		gd.drawImage(Json["fish" + this.type],
			0, h * (this.imgY + 4), w, h,
			-w / 2, -h / 2, w, h
		)
		gd.restore();
	}
	move() {
		//挣扎
		this.timer = setInterval(function () {
			this.imgY++;
			if (this.imgY == 4) this.imgY = 0;
		}.bind(this), 200);
	}
	clear() {
		setTimeout(function () {
			clearInterval(this.timer);
		}.bind(this), 490)
	}

}
