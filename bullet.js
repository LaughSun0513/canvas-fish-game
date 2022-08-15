var BULLET_SIZE = [
	null,
	{ x: 86, y: 0, w: 24, h: 26 },
	{ x: 62, y: 0, w: 25, h: 29 },
	{ x: 30, y: 0, w: 31, h: 35 },
	{ x: 32, y: 35, w: 27, h: 31 },
	{ x: 30, y: 82, w: 29, h: 33 },
	{ x: 0, y: 82, w: 30, h: 34 },
	{ x: 0, y: 0, w: 30, h: 44 }
];

class Bullet {
	constructor(type) {
		this.type = type || 1;
		this.x = 0;
		this.y = 0;
		this.speed = 10;
		this.rotate = 0;
		this.move();
		this.music();
	}
	draw(gd) {
		var x = BULLET_SIZE[this.type].x;
		var y = BULLET_SIZE[this.type].y;
		var w = BULLET_SIZE[this.type].w;
		var h = BULLET_SIZE[this.type].h;

		gd.save();
		gd.translate(this.x, this.y);
		gd.rotate(d2a(this.rotate));
		gd.drawImage(Json["bullet"],
			x, y, w, h,
			-w / 2, -h / 2, w, h
		)
		gd.restore();
	}
	move() {
		setInterval(function () {
			this.x += Math.sin(d2a(this.rotate)) * this.speed;
			this.y -= Math.cos(d2a(this.rotate)) * this.speed;
		}.bind(this), 30)
	}
	music() {
		var oA = new Audio();
		oA.src = "snd/cannon.mp3";
		oA.play();
	}
}
