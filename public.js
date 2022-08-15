function rnd(n, m) {
	return parseInt(Math.random() * (m - n)) + n;
}
function fillzero(n) {
	return n < 10 ? '0' + n : '' + n;
}
function d2a(n) {
	return n * Math.PI / 180;
}
function a2d(n) {
	return n * 180 / Math.PI;
}
//资源
var resource = [
	'fish1', 'fish2', 'fish3', 'fish4', 'fish5',
	'cannon1', 'cannon2', 'cannon3', 'cannon4', 'cannon5', 'cannon6', 'cannon7',
	'bottom', 'bullet', 'coinAni1', 'coinAni2', 'web', 'coinText', 'number_black'
];


//资源加载
//游戏引擎
var Json = {};//存{}存资源
function GameEngine() {
	if (!GameEngine.instance) {
		GameEngine.instance = {
			loadImage: function (arr, success, loading) {
				var count = 0;
				for (var i = 0; i < arr.length; i++) {
					(function (index) {
						var oImg = new Image();
						oImg.onload = function () {
							count++;//如果有图片加载进来，就计数
							loading && loading(count, arr.length)//如果有loadin，可以根据参数算出百分比，加载loading动画
							//json[i]表示值，this表示oImg,将oImg赋值给Json[i],类似于json[name]=jack=》name:jack
							Json[arr[index]] = this; //Json[arr[index]]=fish1,this=图片路径fish1=>fish1:fish1
							if (count == arr.length) {//如果计数=数组长度，说明全部加载完毕
								success && success(gd);//如果有回调，就返回一个画笔
							}
						}
						oImg.src = "img/" + arr[index] + ".png";//传入图片路径
					})(i)
				}
			},
			init: function (gd) {
				//绘制炮筒
				var c = new Cannon(1);
				var tabcannon = new Button(1);



				var arrBullet = [];//收集子弹
				var fishArr = [];//收集鱼
				var coinArr = [];
				var diefishArr = [];
				var webArr = [];
				var scoreArr = [];
				var countArr = [];

				var add = 1000;

				setInterval(function () {
					gd.clearRect(0, 0, oC.width, oC.height);
					//根据概率绘制鱼出来的数量、方向和角度
					if (Math.random() < 0.05) {
						var f = new Fish(rnd(1, 6));//种类

						f.rotate = rnd(0, 360);//四面八方
						if (f.rotate > 90 && f.rotate < 270) {
							f.x = oC.width + 50;
						} else {
							f.x = -50
						}
						f.y = rnd(100, oC.height);

						fishArr.push(f);
					}

					//统一绘制鱼
					for (var i = 0; i < fishArr.length; i++) {
						fishArr[i].draw(gd);
					}
					//统一绘制渔网
					for (var i = 0; i < webArr.length; i++) {
						webArr[i].draw(gd);
					}
					//统一绘制死鱼
					for (var i = 0; i < diefishArr.length; i++) {
						diefishArr[i].draw(gd);
					}
					//统一绘制金币
					for (var i = 0; i < coinArr.length; i++) {
						coinArr[i].draw(gd);
					}
					//绘制分数
					for (var i = 0; i < scoreArr.length; i++) {
						scoreArr[i].draw(gd);
					}

					//绘制炮台
					gd.drawImage(Json["bottom"],
						0, 0, 765, 70,
						0, 532, 765, 70
					);







					gd.drawImage(Json["bottom"],
						130, 75, 47, 28,
						355, 570, 47, 28
					)
					gd.drawImage(Json["bottom"],
						44, 75, 47, 28,
						470, 570, 47, 28
					)
					tabcannon.draw(gd);
					//先绘制炮弹
					for (var i = 0; i < arrBullet.length; i++) {
						arrBullet[i].draw(gd);
					}

					//再绘制炮筒，不然子弹会在炮筒上面
					c.draw(gd);



					//碰撞检测
					for (var i = 0; i < fishArr.length; i++) {
						for (var j = 0; j < arrBullet.length; j++) {
							if (fishArr[i].isIn(arrBullet[j].x, arrBullet[j].y)) {
								var x = fishArr[i].x;
								var y = fishArr[i].y;
								var type = fishArr[i].type;

								var fishrotate = fishArr[i].rotate;
								var bullettype = arrBullet[j].type;

								clearInterval(fishArr[i].timer);
								clearInterval(arrBullet[j].timer);
								fishArr.splice(i, 1); i--;
								arrBullet.splice(j, 1); j--;

								//出现死鱼
								var diefish = new Diefish(type);
								diefish.x = x;
								diefish.y = y;
								diefish.rotate = fishrotate;
								diefishArr.push(diefish);

								//死鱼消失
								setTimeout(function () {
									diefishArr.shift();
									i--;
								}, 500)

								//出现渔网
								var web = new Web(bullettype);
								web.x = x;
								web.y = y;
								webArr.push(web);
								/*	for(var k=0;k<fishArr.length;k++){
										if(fishArr[k].isIn()){
											
										}
									}*/
								//渔网消失
								setTimeout(function () {
									webArr.splice(0, 1);
								}, 500)


								//出现金币
								var coin = new Coin(type);
								var coinType = coin.type;
								//根据鱼的类型，判断金币的类型
								switch (type) {
									case 1:
									case 2:
										coinType = 1;
										break;
									case 3:
									case 4:
									case 5:
										coinType = 10;
										break;
								}
								coin.x = x;
								coin.y = y;
								coinArr.push(coin);
								setTimeout(function () {
									coinArr.splice(0, 1);
								}, 500)

								//出现分数
								var score = new Score(type);
								var scoreType = score.type;
								score.x = x;
								score.y = y;
								scoreArr.push(score);
								setTimeout(function () {
									scoreArr.splice(0, 1);
								}, 500)



								//金币总额=金币类型*分数类型
								var sum = parseInt(coinType * scoreType);
								add += sum;
							}

						}
					}
					//123456

					var Num = add;
					var g = Num % 10 ? Num % 10 : 0;//12345.6
					var s = parseInt(Num / 10) % 10 ? parseInt(Num / 10) % 10 : 0;//12345.6 
					var h = parseInt(Num / 100) % 10 ? parseInt(Num / 100) % 10 : 0;
					var th = parseInt(Num / 1000) % 10 ? parseInt(Num / 1000) % 10 : 0;
					var w = parseInt(Num / 10000) % 10 ? parseInt(Num / 10000) % 10 : 0;
					var sw = parseInt(Num / 100000) ? parseInt(Num / 100000) : 0;

					var count = new Count(9 - g); count.draw6(gd);
					var count = new Count(9 - s); count.draw5(gd);
					var count = new Count(9 - h); count.draw4(gd);
					var count = new Count(9 - th); count.draw3(gd);
					var count = new Count(9 - w); count.draw2(gd);
					var count = new Count(9 - sw); count.draw1(gd);





					//优化
					//炮弹优化
					for (var i = 0; i < arrBullet.length; i++) {
						if (
							arrBullet[i].x < -100 ||
							arrBullet[i].x > oC.width + 100 ||
							arrBullet[i].y < -100 ||
							arrBullet[i].y > oC.height + 100
						) {
							clearInterval(arrBullet[i].timer);
							arrBullet.splice(i, 1);//剔除实例
							i--;
						}

					}
					//鱼优化
					for (var i = 0; i < fishArr.length; i++) {
						if (
							fishArr[i].x < -100 ||
							fishArr[i].x > oC.width + 100 ||
							fishArr[i].y < -100 ||
							fishArr[i].y > oC.height + 100
						) {
							clearInterval(fishArr[i].timer);
							fishArr.splice(i, 1);//剔除实例
							i--;
						}

					}

				}, 16);


				oC.onclick = function (e) {

					clearInterval(this.timer);
					//切换炮台
					//求出点击的坐标
					var disx = e.clientX - oC.offsetLeft;
					var disy = e.clientY - oC.offsetTop;

					if (disx > 361 && disx < 393 && disy > 567 && disy < 588) {//左边被点击
						tabcannon.type = 3;

						c.type--;
						if (c.type <= 1) {
							c.type = 1;
						}
						setTimeout(function () {
							tabcannon.type = 1;
						}, 100)

					} else if (disx > 475 && disx < 505 && disy > 567 && disy < 588) {//右边被点击

						tabcannon.type = 2;

						c.type++;
						if (c.type >= 7) {
							c.type = 7;
						}
						setTimeout(function () {
							tabcannon.type = 1;
						}, 100)
					} else {
						add -= c.type;
						tabcannon.type = 1;

						//求炮筒的角度

						//计算角度，注意角度的公式tan是临边比对边，和数学公式的有所不同 Math.atan2(y,x);并且这里是弧度转角度
						var x = e.clientX - oC.offsetLeft - c.x;//根据点击位置和炮塔位置，求出横向值
						var y = c.y - e.clientY - oC.offsetTop;
						var d = a2d(Math.atan2(x, y));//调换x,y，算的就是x,y炮塔和点击点的夹角
						c.rotate = d;//将这个夹角给炮筒，炮筒就会根据点击的点旋转
						c.emit();//抖动

						//出炮弹
						var b = new Bullet(c.type);

						b.rotate = c.rotate;
						b.x = c.x;
						b.y = c.y;
						arrBullet.push(b);
					}


				}
			}

		}
	}
	return GameEngine.instance;
}
