class Button {
	constuctor(type) {
		this.type = type || 1;
	}

	draw(gd) {
		gd.save();
		switch (this.type) {
			//正常的减号-与加号+（都没点的情况）
			case 1:
				gd.drawImage(Json["bottom"],
					130, 75, 47, 28,
					355, 570, 47, 28
				)
				gd.drawImage(Json["bottom"],
					44, 75, 47, 28,
					470, 570, 47, 28
				)
				break;

			//正常的减号-与点击的加号+(右边被点击)
			case 2:
				gd.drawImage(Json["bottom"],
					130, 75, 47, 28,
					355, 570, 47, 28
				)
				gd.drawImage(Json["bottom"],
					0, 75, 47, 28,
					470, 570, 47, 28
				)
				break;

			//点击的减号和正常的加号（左边被点击）
			case 3:
				gd.drawImage(Json["bottom"],
					85, 75, 47, 28,
					355, 570, 47, 28
				)
				gd.drawImage(Json["bottom"],
					44, 75, 47, 28,
					470, 570, 47, 28
				)
				break;
		}
		gd.restore();
	}


}
