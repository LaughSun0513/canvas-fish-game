//渔网的属性：x,y,type,scale
//渔网的方法：draw,move
var WEB_SIZE=[
    null,
    {x:332,y:373,w:87,h:86},
    {x:13,y:413,w:108,h:106},
    {x:177,y:369,w:125,h:124},
    {x:252,y:179,w:149,h:149},
    {x:1,y:244,w:160,h:154},
    {x:21,y:22,w:198,h:199},
    {x:241,y:0,w:180,h:179}
];
class Web{
	constructor(type){
		this.type=type||1;
		this.x=0;
		this.y=0;
		this.scale=0.5;
		this.move();
	}
	draw(gd){
		var x=WEB_SIZE[this.type].x;
		var y=WEB_SIZE[this.type].y;
		var w=WEB_SIZE[this.type].w;
		var h=WEB_SIZE[this.type].h;

		gd.save();
			gd.translate(this.x,this.y);
			gd.scale(this.scale,this.scale);
			gd.drawImage(Json["web"],
			x,y,w,h,
			-w/2,-h/2,w,h
		);
		gd.restore();
	}
	move(){
		//网不断变大
		var timer=setInterval(function(){
			this.scale+=0.1;
			if(this.scale>=1){
				clearInterval(timer);
			}
		}.bind(this),30)
	}
	isIn(x,y){
			var a=this.x-x;
			var b=this.y-y;
			var c=Math.sqrt(a*a+b*b);
			
			var w=WEB_SIZE[this.type].w/2;
			var h=WEB_SIZE[this.type].h/2;
			var d=Math.sqrt(w*w+h*h);
			
			if(c<=d){
				return true;
			}else{
				return false;
			}
		}
}
