function BaiduMap(options) {

	this.id = options['map'];
	this.sea = options['search'];
	this.ipt = options['point'];
	this.area = options['area'] || [120.385109,36.070048];
	this.scale = options['scale'] || 12;
	this.sContent = options['sContent'];

	if (!this.id) {
		return false;
	}

	if (this.sContent) {
		this.mapClick = false;
	} else {
		this.mapClick = true;
	}

	this.init();
}

BaiduMap.prototype.init = function() {
	var _this = this;

	this.map = new BMap.Map(this.id,{enableMapClick:this.mapClick});		// 创建地图实例  
	this.point = new BMap.Point(this.area[0],this.area[1]);	 // 创建点坐标 
	this.map.centerAndZoom(this.point, this.scale);		// 初始化地图，设置中心点坐标和地图级别
	this.pointResult(this.point);

	this.map.enableScrollWheelZoom();     //开启鼠标滚轮缩放
	this.map.addControl(new BMap.NavigationControl());     // 控件缩放
	this.map.addControl(new BMap.ScaleControl());    // 控件比例尺

	this.marker = new BMap.Marker(this.point);        // 创建标注
	this.map.addOverlay(this.marker);     // 将标注添加到地图中
	this.marker.setAnimation(BMAP_ANIMATION_BOUNCE);   // 添加标注动画

	if (this.sea) {
		// 创建地址解析器实例
		this.myGeo = new BMap.Geocoder();
		// 逆解析
		this.myGeo.getLocation(this.point, function(rs) {
			_this.city = rs['addressComponents']['city'];

			// 检索实例初始化
			_this.local = new BMap.LocalSearch(_this.city, {
				renderOptions: {
					map: _this.map,
					selectFirstResult: true,
				},
				pageCapacity: 1,
				onMarkersSet: function(rs) {
					_this.map.removeOverlay(rs[0]['marker']);
				},
				onSearchComplete: function(rs) {
					window.setTimeout(function(){
						_this.mapMove();
					},500)
				}
			});

			_this.mapEvent();
		})
	}
	
	if (this.sContent) {
		var opts = {
			width : 220,
			height: 0,
			offset: {
				width: 0,
				height: -30
			},
			enableCloseOnClick: false,
			// offset: 2,
			title : "海底捞王府井店", // 信息窗口标题
			
		}

		this.infoWindow = new BMap.InfoWindow(this.sContent, opts);

		this.map.openInfoWindow(this.infoWindow,this.point); //开启信息窗口

	}
}

BaiduMap.prototype.mapEvent = function() {
	var _this = this;

	var form = document.querySelector(this.sea);
	var input = form.querySelector('input');
	var button = form.querySelector('button');
	var val = '';

	button.addEventListener('click', function() {
		val = input.value;
		input
		_this.local.search(val);
	})

	input.addEventListener('keyup', function(e) {
		var key = e['keyCode'];
		if (key == 13) {
			val = input.value;
			_this.local.search(val);
		}
	})

	this.map.addEventListener('moving', function() {
		_this.mapMove();
	})

	this.map.addEventListener('zoomend', function() {
		_this.mapMove();
	})
}

BaiduMap.prototype.mapMove = function() {
	var _this = this;
	var p = this.map.getCenter();

	this.marker.setPosition(p);

	this.myGeo.getLocation(p, function(rs) {
		_this.city = rs['addressComponents']['city'];
		_this.local.setLocation(_this.city);
	})

	this.pointResult(p);
}

BaiduMap.prototype.pointResult = function(p) {
	if (this.ipt) {
		var res = document.querySelector(this.ipt);
		var point = p['lng'] + ',' + p['lat'];
		res.value = point;
	}
}