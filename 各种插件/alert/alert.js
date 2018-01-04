window.alert = function(name, fn){
	//创建一个大盒子
	var box = document.createElement("div");
	var p = document.createElement("p");
	var back = document.createElement("div");
	var h = window.innerHeight;
	//创建一个关闭按钮
	back.id = "backg";
	document.body.appendChild(back);
	var button = document.createElement("div");
	//定义一个对象保存样式
	box.id="alertbox";
	//把创建的元素添加到body中
	document.body.appendChild(box);
	//把alert传入的内容添加到box中
	if(arguments[0]){
		p.innerHTML = arguments[0];
		box.appendChild(p);
	}
	button.innerHTML = "确定";
	//定义按钮样式
	button.id="alertbutton";
	//把按钮添加到box中
	box.appendChild(button);

	var box_h = box.offsetHeight;
	box.style.top = (h - box_h) / 2 + 'px';

	//给按钮添加单击事件
	button.addEventListener("click",function(){
		document.body.removeChild(box);
		document.body.removeChild(back);//每次点击需要移除子元素
		if (fn) {
			fn();
		}
	})
}; 