class Score{
	constructor(type){
		this.type=type||1;
		this.x=0;
		this.y=0;
		this.move();
	}
	draw(gd){
			gd.save();
				gd.translate(this.x,this.y);
				switch(this.type){
					case 1:
					case 2:
					gd.drawImage(Json["coinText"],
					 360,0,36,48,
					 18,48/2,36,48
					)
	
					gd.drawImage(Json["coinText"],
					 this.type*36,0,36,48,
					 18+36,48/2,36,48
					)
					break;
					case 3:
					case 4:
					case 5:
					gd.drawImage(Json["coinText"],
					 360,0,36,48,
					 18,48/2,36,48
					)
	
					gd.drawImage(Json["coinText"],
					 this.type*36,0,36,48,
					 18+36,48/2,36,48
					)
					gd.drawImage(Json["coinText"],
					 0,0,36,48,
					 18+72,48/2,36,48
					)
					break;
				}
				
			gd.restore();
		
		
	}
	move(){
		clearInterval(timer);
		var timer=setInterval(function(){
			this.y-=5;
			if(this.y<0){
				clearInterval(timer);
			}
		}.bind(this),30)
	}
}
