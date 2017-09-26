/**
*  初始化参数和画布
*  opts.canvas：字符串，上传图片背景画布的选择器，必须是id选择器，必须是一个canvas元素。
*  opts.image：元素对象，通过上传按钮上传图片之后生成的图片元素。
*  opts.el：字符串，中间焦点选区框的选择器。
*  opts.parent：字符串，opts.canvas和opts.image的父元素选择器
*  opts.result：字符串，预览图的选择器
*  opts.btn：字符串，剪裁按钮的选择器
*  预览图绘制完成后，用方法上的base64属性获取最终的base64字符串。
*/
function veImage(opts) {
    if(!opts) {
        return false;
    }
    // 初始化
    this.events = {start:'touchstart', move:'touchmove', end:'touchend', click:'click'};
    this.opts = opts  //默认参数与传入参数合并
    this.canvas = document.querySelector(this.opts.canvas);  //画布
    this.el = $(this.opts.el);   // 焦点元素
    this.el_w = this.el.width();   
    this.el_h = this.el.height();
    this.el_l = this.el.position().left;
    this.el_t = this.el.position().top;
    this.parent = $(this.opts.parent);    // 画布的容器
    this.parent_w = this.parent.width();
    this.parent_h = this.parent.height();
    this.size = this.canvas.getBoundingClientRect();   //画布的尺寸参数,包含宽高和定位位置
    this.context = this.canvas.getContext('2d');   //画布上下文
    this.image = this.opts.image;    //图片
    this.result = $(this.opts.result);
    this.btn = $(this.opts.btn);
    // this.base64 = '';

    //设置画布的宽高
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;

    //将图片用合适的尺寸放入到画布中
    var rateWidth = this.canvas.width / this.image.width,  //画布与图片的宽比
        rateHeight = this.canvas.height / this.image.height,  //画布与图片的高比
        rate = rateWidth > rateHeight ? rateHeight : rateWidth;  //取小的比率

    //设置目标宽高 也就是缩放后的宽高
    this.dWidth = this.image.width * rate * 0.95;
    this.dHeight = this.image.height * rate * 0.95;

    //将画布的中心点 作为起始坐标 缩放的时候会从中间开始放大，效果更佳，图片也能画在正中间
    this.origin = {
        x: Math.floor(this.canvas.width / 2),
        y: Math.floor(this.canvas.height / 2)
    };

    var load = $('<div class="loading">图片加载中...</div>');
    this.parent.append(load);

    this._draw();//画图
    this._bind(); //绑定手指事件
}
var veImagePrototype = veImage.prototype;

/**
* 画图
* @param dx X轴偏移量
* @param dy Y轴偏移量
* @param zoomWidth 宽度缩放比
* @param zoomHeight 高度缩放比
* @private
*/
veImagePrototype._draw = function() {
    //清空画布 擦除之前绘制的所有内容 不清空的话会显示各个步骤的画布
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.save();//保存状态

    //计算偏移
    this.context.translate(this.origin.x, this.origin.y);//位移

    //计算缩放
    var zoom = 1 //统一按一个比例做缩放
    this.dWidth *= zoom;//宽度缩放
    this.dHeight *= zoom;//高度缩放

    //画图
    this.context.drawImage(
        this.image,
        0, 0, this.image.width, this.image.height,
        -this.dWidth / 2, -this.dHeight / 2, this.dWidth, this.dHeight);//目标画布的中心点
    
    this.image = null;
    this.parent.find('.loading').remove();
    // 绘制新的头像
    this.crop(this.el_w,this.el_h,this.el_l,this.el_t)
    
    //还原到上一个状态 也就是空画布的时候
    this.context.restore();
};

/**
    * 绑定事件
    */
    veImagePrototype._bind = function() {
    var _this = this;
    this.parent.on(this.events.start,function(e){
        _this.startEvt(e);
    }) 
    this.parent.on(this.events.move,function(e){
        _this.moveEvt(e);
    }) 
    this.btn.on(this.events.click,function(e){
        _this.endEvt(e);
    }) 
};

/**
* 记录按下时的手指的坐标
* @param touches
*/
veImagePrototype._finger = function(touches) {
    var coordinate = [],
        len = touches.length;
    for(var i=0; i<len; i++) {//TouchList类型 不能用forEach
        coordinate.push({x:touches[i].clientX, y:touches[i].clientY})
    }
    return coordinate;
}

/**
* 模式判断
*/
veImagePrototype._mode = function(fingers) {
    if(fingers.length == 1) {
        this.mode = 1;  //位移模式
    }else if(fingers.length > 1) {
        this.mode = 2;  //缩放模式
    }
};

/**
* 绑定开始事件
*/
veImagePrototype.startEvt = function(e) {
    this.start = this._finger(e.touches);//记录开始的坐标
    this._mode(e.touches);//模式初始化(位移或缩放)
};

/**
* 绑定手指移动事件
*/
veImagePrototype.moveEvt = function(e) {
    e.preventDefault();//禁止滚动

    var fingers = this._finger(e.touches);//记录移动中的坐标

    //不能仅仅通过手指数量来判断 因为当缩放后，移除手指的时候，会出现一个手指还停留在页面上，导致位移
    if(this.mode == 1) {//位移
        this._translate(fingers);
    }else if(this.mode == 2) {//缩放
        this._zoom(fingers);
    }
    //将start的坐标复为移动中的坐标 时时计算偏移值，不然会变得非常大，图片在移动中会飞出画面
    this.start = fingers;
};

/**
* 缩放
*/
veImagePrototype._zoom = function(fingers){
    // 计算缩放比例
    var lastOffset = {
        x : Math.abs(this.start[0].x - this.start[1].x),
        y : Math.abs(this.start[0].y - this.start[1].y)
    };
    if(lastOffset.x == 0 || lastOffset.y == 0) {//防止分母是0
        return;
    }

    // 焦点框的宽高
    this.el_h = this.el_w = this.el_w * Math.abs(fingers[0].x - fingers[1].x) / lastOffset.x;

    // 设定焦点框的宽高
    this.el.css({
        'width': this.el_w + 'px',
        'height': this.el_h + 'px'
    })
};

/**
* 位移
*/
veImagePrototype._translate = function(fingers){

    // 焦点框移动时初始的left和top
    this.el_l = this.el_l + (fingers[0].x - this.start[0].x);
    this.el_t = this.el_t + (fingers[0].y - this.start[0].y);
    
    // 焦点框超出左和上的处理
    this.el_l = this.el_l < 0 ? 0 : this.el_l;
    this.el_t = this.el_t < 0 ? 0 : this.el_t;

    // 焦点框超出右和下的处理
    this.el_l = this.el_l > this.parent_w - this.el_w ? this.parent_w - this.el_w : this.el_l;
    this.el_t = this.el_t > this.parent_h - this.el_h ? this.parent_h - this.el_h : this.el_t;
    
    // 设置焦点框的left和top
    this.el.css({
        'left': this.el_l + 'px',
        'top' : this.el_t + 'px'
    });
};


/**
* 绑定结束事件
*/
veImagePrototype.endEvt = function(e) {
    // 绘制新的头像
    this.crop(this.el_w,this.el_h,this.el_l,this.el_t)
};

/**
* 裁剪
* @param w 裁剪的宽度
* @param h 裁剪的高度
* @param x 开始裁剪的X轴坐标
* @param y 开始裁剪的Y轴坐标
*/
veImagePrototype.crop = function(w,h,x,y) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        rate = 1;//当前画布的宽度与设置的相对宽度 计算比率

    x *= rate;
    y *= rate;

    canvas.width = w*rate;
    canvas.height = h*rate;

    context.drawImage(
        this.canvas,
        x, y, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height
    );
    this.base64 = canvas.toDataURL('image/jpeg', 1);
    canvas = null;
    this.result.prop('src',this.base64);
};