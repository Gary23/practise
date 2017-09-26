function baiduMAP(Coord, zoom, gps, callback) {
	// 初始化参数
	this.Coord = Coord || {
		lng: "120.388969",
		lat: "36.073179"
	};
	this.zoom = zoom || 12;
	if(arguments.length === 3){
		if(typeof gps === 'boolean'){
			this.gps = gps;    // h5获取的是gps坐标
		}else{
			this.callback = gps;
		}
	}else{
		this.gps = gps;
		this.callback = callback;
	}
	
	//创建地图
	this.map = new BMap.Map("allmap", {
		enableMapClick: false
	});
	this.marker = '';
	this.myValue = '';
	// 初始化编码实例
	this.myGeo = new BMap.Geocoder();

	// 初始化坐标转换
	this.convertor = new BMap.Convertor();

	// 初始化一个自动完成关联搜索的对象
	this.ac = new BMap.Autocomplete({
		"input": "suggestId",
		"location": this.map
	});

	this.init();

}

baiduMAP.prototype = {
	constructor: baiduMAP,
	init: function () { // 三种情况初始化地图
		var typeCoors = typeof this.Coord;
		var _this = this;
		if (typeCoors.toLowerCase() == 'string') { // 通过地区名初始化地图
			this.myGeo.getPoint(this.Coord, function (point) { // 解析地区名为坐标，解析不到就默认青岛
				point = point || {
					lng: "120.388969",
					lat: "36.073179"
				};
				if (point) {
					// 初始化地图
					var point = new BMap.Point(point.lng, point.lat);
					_this.map.centerAndZoom(point, _this.zoom);
					_this.marker = new BMap.Marker(point);
					_this.map.addOverlay(_this.marker);
					_this.myGeo.getLocation(new BMap.Point(point.lng, point.lat), function (result) {
						_this.getLocationList.call(_this, result);
					});
				}
			});
		} else
		if (this.gps) { // gps坐标转为百度地图坐标,并初始化地图
			// 初始化地图
			var point = new BMap.Point(this.Coord.lng, this.Coord.lat);
			this.map.centerAndZoom(point, this.zoom);
			this.marker = new BMap.Marker(point);
			var pointArr = [point];
			this.convertor.translate(pointArr, 1, 5, function (data) {
				_this.translateCallback.call(_this, data);
			})
		} else { // 通过坐标直接初始化地图
			var point = new BMap.Point(this.Coord.lng, this.Coord.lat);
			this.map.centerAndZoom(point, this.zoom);
			this.marker = new BMap.Marker(point);
			this.map.addOverlay(this.marker);
			this.myGeo.getLocation(new BMap.Point(this.Coord.lng, this.Coord.lat), function (result) {
				_this.getLocationList.call(_this, result);
			});
		}
		// 添加地图控件
		this.control();

		//点击地图到另外的位置
		this.map.addEventListener("click", function (e) {
			_this.clickMap(e, _this);
		});

		//鼠标放在下拉列表上的事件
		this.ac.addEventListener("onhighlight", function (e) {
			_this.mouseList(e);
		})

		//鼠标点击下拉列表后的事件
		this.ac.addEventListener("onconfirm", function (e) {
			_this.clickList(e);
		})

		// 点击搜索按钮事件
		this.G('but').onclick = function () {
			_this.searchMap();
		}
	},
	clickMap: function (e, _this) { //点击地图到另外的位置
		if (this.G('step')) {
			this.G('step').style.display = 'none';
		}
		var point = {
			lng: e.point.lng,
			lat: e.point.lat
		}
		this.map.clearOverlays(); //清除地图上所有覆盖物
		this.map.panTo(new BMap.Point(point.lng, point.lat)); //平移到新的坐标点
		var pt = new BMap.Point(point.lng, point.lat); // 创建点坐标
		var marker = new BMap.Marker(pt); // 创建标注
		this.map.addOverlay(marker); // 将标注添加到地图中
		// 在有覆盖物的前提下设置为覆盖物的坐标
		if (e.overlay != null) {
			var p = e.overlay.getPosition();
			pt.lng = p.lng;
			pt.lat = p.lat;
		}
		// 根据坐标得到地址描述
		this.myGeo.getLocation(new BMap.Point(point.lng, point.lat), function (result) {
			_this.getLocationList.call(_this, result);
		});
	},
	control: function () {
		var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件
		this.map.addControl(top_left_navigation);
	},
	translateCallback: function (data) { //坐标转换完之后的回调函数
		if (data.status === 0) {
			this.map.clearOverlays(); //清除地图上所有覆盖物
			this.marker = new BMap.Marker(data.points[0]);
			this.map.addOverlay(this.marker);
			this.getLocationList(data.points[0].lng, data.points[0].lat);
		}
	},
	getLocationList: function (result) { // 根据坐标得到地址并展示在列表中
		if (result) {
			var s = [];
			var l = [];
			if (result.surroundingPois.length > 0) {
				var pois = result.surroundingPois;
				for (var i = 0; i < pois.length; i++) {
					s.push(pois[i].title + ',' + pois[i].address);
					l.push(pois[i].point.lng + ',' + pois[i].point.lat);
				}
			} else {
				s = result.address;
				l = result.point.lng + ',' + result.point.lat;
			}
			this.setList(s, l);
		}
	},
	mouseList: function (e) {
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		this.G("searchResultPanel").innerHTML = str;
	},
	clickList: function (e) {
		var _value = e.item.value;
		this.myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		this.G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + this.myValue;
		this.G("suggestId").blur();
		this.setPlace(this);
	},
	setPlace: function (_this) {
		this.map.clearOverlays(); //清除地图上所有覆盖物
		var local = new BMap.LocalSearch(this.map, { //智能搜索
			onSearchComplete: function (results) {
				_this.myFun.call(_this, results);
			}
		});

		local.search(this.myValue);
	},
	searchMap: function () {
		var _this = this;
		this.map.clearOverlays(); //清除地图上所有覆盖物
		var search = this.G('suggestId').value;
		if (!search) return false;
		var local = new BMap.LocalSearch(this.map, {
			onSearchComplete: function (results) {
				_this.myFun.call(_this, results)
			}
		});
		local.search(search);
	},
	myFun: function (results) { // 将搜索的信息在地图上创建标注，一般是多个标注3
		if (results) {
			// 判断状态是否正确
			var s = [];
			var lnglat = [];
			for (var i = 0; i < results.getCurrentNumPois(); i++) {
				var pt = new BMap.Point(results.getPoi(i).point.lng, results.getPoi(i).point.lat); // 创建点坐标
				this.map.centerAndZoom(pt, 12);
				var marker = new BMap.Marker(pt); // 创建标注
				this.map.addOverlay(marker); // 将标注添加到地图中
				s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
				lnglat.push(results.getPoi(i).point.lng + ',' + results.getPoi(i).point.lat);
			}
			this.setList(s, lnglat);
		}
	},
	setList: function (s, l) {

		var arr, title, text, str = '', result = [];
		var url = "javascript:;";
		var pois = this.G('pois');

		// 创建html内容
		if ((typeof s).toLowerCase() == 'string') {
			var obj = {};
			str = '<li><a href=' + url + ' ><p class="addr-text">' + s +
				'</p><input type="hidden" value=' + l + '></a></li>';
			obj['t'] = s;
			obj['l'] = l;
			obj['s'] = '';
			result.push(obj);
		} else {
			for (var i = 0; i < s.length; i++) {
				var obj = {};
				arr = s[i].split(',');
				title = arr[0];
				text = arr[1];
				str += '<li><a href=' + url + ' ><p class="addr-title">' + title +
					'</p><p class="addr-text">' + text + '</p><input type="hidden" value=' + l[i] + '></a></li>';
				obj['t'] = title;
				obj['s'] = text;
				obj['l'] = l[i];
				result.push(obj);
			}
		}
		pois.innerHTML = str;

		if(this.callback){
			this.callback(result);
		}

	},
	G: function (id) {
		return document.getElementById(id);
	}

}