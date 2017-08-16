// 获取商品数组
function getData(index) {
    this.index = typeof index == 'number' ? index : 'null';
    this.dataAll = [];
    this.init();
}

getData.prototype = {
    constructor: getData,
	init: function () { // 初始化方法
		alert('进入获取商品数组的方法')
        this.path = window.location.pathname;
        if (this.path.indexOf('olist') != -1) {
            this.isolist = true; // 在订单页
        } else if (this.path.indexOf('myCart') != -1) {
            this.ismyCart = true; // 在超市购物车页
        } else if (this.path.indexOf('cart') != -1) {
            this.iscart = true; // 在普通购物车页
        } else {
            return false; // 不在这三个页面就跳出
        }
        this.exec();
    },
    Trim: function (str) { // 字符串祛首尾空格
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    getId: function (str) { // 获取商品和店铺id
        if (str.indexOf('=') != -1) { // 普通id获取
            var arr = str.split('=');
            return arr[arr.length - 1];
        } else if (str.indexOf('chaoshi') != -1) { // 普通购物车天猫超市id
            return '725677994';
        } else if (/i[\d]+./.test(str)) { // 普通购物车非天猫超市商品id
            var arr = str.match(/i[\d]+./);
            return arr[0].replace(/(^i)|(.$)/g, '');
        } else { // 其他情况
            return str;
        }
    },
    getElem: function (str, parent) { // 获取单一元素
        parent = parent || document;
        return parent.querySelector(str);
    },
    getElems: function (str, parent) { // 获取多个元素
        parent = parent || document;
        return parent.querySelectorAll(str);
    },
    getTab: function () { // 返回订单页当前的tab选项下的列表
        return this.getElems('.order-cont')[this.index];
    },
    getOrder: function (ul, elem) { // 获取所有数据的方法
        var parent = elem || document; // 确定列表的容器
        this.lis = this.getElems(ul, parent); // 获取显示的所有列表项
        var lis_len = this.lis.length; // 列表数量

        var goods_e = '', // 初始化变量
            goods_a = '',
            goods_l = '',
            goods_n = '',
            shop_e = '',
            lis_text = '';

        for (var j = 0; j < lis_len; j++) { // 遍历所有列表
            // if (this.isolist) {
            //     lis_text = this.getElem('.state-cont .h', this.lis[j]).innerHTML
            //     if (lis_text.indexOf('交易关闭') !== -1) { // 判断如果有交易关闭的就跳出
            //         continue;
            //     }
            // }
            if (this.isolist || this.iscart) { // 在订单页或普通购物车页
                shop_e = this.getElem('.o-t-title-shop .contact > a', this.lis[j]) || this.getElem('.invalid-title', this.lis[j]); // 获取店铺的容器，'.invalid-title'是失效商品的

                if (!shop_e.href && this.isolist) { // 2.0 排除订单页下没有店铺名的(例如淘票票订单)
                    continue;
                }

                goods_e = this.getElems('.item-list .item-info .title', this.lis[j]); // 商品名容器
                goods_a = this.getElems('.item-list .item-info > a', this.lis[j]); // 普通购物车页的商品id容器，订单页没有这个元素

            } else if (this.ismyCart) { // 在超市购物车页，因为结构和其他页面不同所以单独判断
                shop_e = this.lis[j]; // 获取店铺的容器
                goods_e = document.querySelectorAll('.order-des > h2'); // 获取商品名的容器
            } else {
                return false; // 其他页面就不执行后面的代码，防止报错
            }

            goods_l = goods_e.length; // 获取商品的数量
            for (var k = 0; k < goods_l; k++) { // 遍历当前店铺的商品
                var goods_obj = {};
                goods_n = this.Trim(goods_e[k].innerHTML); // 获取商品名

                if (goods_n.indexOf('保险服务') !== -1) { // 2.0 排除运费险
                    continue;
                }

                goods_obj['goods_name'] = goods_n;

                if (this.iscart) { // 普通购物车页获取商品id
                    goods_obj['goods_id'] = this.getId(goods_a[k].href);
                    goods_obj['shop_id'] = !shop_e.href ? '' : this.getId(shop_e.href);
                } else if (this.ismyCart) { // 超市购物车页获取商品id
                    goods_obj['goods_id'] = this.getId(goods_e[k].getAttribute('href'));
                    goods_obj['shop_id'] = shop_e.getAttribute('data-shop');
                } else { // 订单页，没有id，直接为空
                    goods_obj['goods_id'] = '';
                    goods_obj['shop_id'] = !shop_e.href ? '' : this.getId(shop_e.href);
                }
                this.dataAll.push(goods_obj);
                goods_obj = null; // 销毁临时对象
            }
        }
    },
    exec: function () { // 整个对象的执行处理
        if (this.isolist && this.index !== 'null') {
            this.order_cur = this.getTab();
            this.getOrder('.order-list > li', this.order_cur);
        } else if (this.ismyCart) {
            this.getOrder('.grid-shop');
        } else if (this.iscart) {
            this.getOrder('.bundlev2')
        }else {
            return false;
        }
    },
};
function formatData(data) {
    var k,
        ret = [];
    for (k in data) {
        ret.push(window.encodeURIComponent(k) + '=' +
            window.encodeURIComponent(data[k]));
    }
    return ret.join('&');
};
function jsonp(options) {
    alert('发送跨域请求')
createElem()
    var scriptElem,
        headElem,
        callbackName,
        url;
    scriptElem = document.createElement('script');
    headElem = document.getElementsByTagName('head')[0];
    headElem.appendChild(scriptElem);
    callbackName = ('jsonp_' + Math.random()).replace('.', '');
    options.data = options.data || {};
    options.data[options.callback] = callbackName;
    window[callbackName] = function (data) {
        window.clearTimeout(scriptElem.timerId);
        headElem.removeChild(scriptElem);
		delete window[callbackName];
		noneElem();
        options.success && options.success(data);
    }
    options.data = formatData(options.data);
    url = options.url + '?' + options.data;
    scriptElem.src = url;
};
function clfabli(res) {
	alert('打印返利' + res);
};
function getL(key) {
    return window.sessionStorage.getItem(key);
};
function setL(key,val) {
    return window.sessionStorage.setItem(key,val);
};
function getfanli(result,tab) {
    var result_l = result.length;
    var q = '';
    var uid = '';
    var tid = '';
    var num = 0;
    var count = 0;
    var res = 0;
    if (result_l == 0) {
        return false;
    }
    if(getL(tab)){
        var tabLen = getL(tab + 'Len') ? +getL(tab + 'Len') : result_l;
        if(result_l > tabLen){
            setL(tab + 'Len',result_l);
            result.splice(0,tabLen);
            result_l = result.length;
        }else{
            clfabli(+getL(tab) / 100);
            return false;
        }
    }else{
        setL(tab + 'Len', result_l);
    }
    var max = Math.ceil(result_l / 20);
    function getData5(count) {
        var arr = [];
        var j = count * 20;
        for (var i = j; i < j + 20; i++) {
            if (i > result_l - 1) {
                break;
            }
            var obj = {};
            obj['q'] = result[i]['goods_name'];
            obj['uid'] = result[i]['shop_id'];
            arr.push(obj);
            obj = null;
        }
        return JSON.stringify(arr);
    };
    var array = getData5(0);
    jsonp({
        url: '//mall.aili88.cn/tb-rebate-amount.html',
        data: {
            'array': array,
        },
        callback: 'callback',
        success: function (data) {
            var count = 0;
            num += data['flje'] * 100;
            if (count === max - 1) {
                res = (num + (getL(tab) ? (+getL(tab)) : 0)) / 100;
                clfabli(res);
                setL(tab,(res * 100));
            }else{
                var res = ajaxSuccess(data, count, num);
            }
        },
    });
    function ajaxSuccess(data, count, num) {
        if (data) {
            count++;
            array = getData5(count);
            jsonp({
                url: '//mall.aili88.cn/tb-rebate-amount.html',
                data: {
                    'array': array,
                },
                callback: 'callback',
                success: function (data) {
                    num += data['flje'] * 100;
                    if (count === max - 1) {
                        res = (num + (getL(tab) ? (+getL(tab)) : 0)) / 100;
                        clfabli(res);
                        setL(tab,(res * 100));
                        return res;
                    }
                    ajaxSuccess(data, count, num);
                },
            });
        }
    };
};

function createElem() {
    var parent = document.createElement('div');
    var body = document.querySelector('body');
	body.appendChild(parent)
	parent.className = 'lock_aili';
    parent.style.backgroundColor = 'rgba(0,0,0,0.6)';
    parent.style.color = 'rgb(255,255,255)';
    parent.style.height = '1.5rem';
    parent.style.width = '6rem';
    parent.style.marginLeft = '50%';
    parent.style.position = 'fixed';
    parent.style.lineHeight = '1.5rem';
    parent.style.bottom = '7.5rem';
    parent.style.left = '-3rem';
    parent.style.zIndex = '99999999999999999';
    parent.style.fontSize = '0.42rem';
    parent.style.textAlign = 'center';
    parent.style.display = 'block';
    parent.style.borderRadius = '0.2rem';
    parent.innerHTML = '正在加载返利，请稍后...';
};

function noneElem() {
	var elem = document.querySelectorAll('.lock_aili');
	var body = document.querySelector('body');
	var len = elem.length;
	if(len == 0){
		return false;
	}
	for(var i = 0; i < len; i++){
		body.removeChild(elem[i]);
	}
}

window.sessionStorage.clear();
var result = '';
if (new getData().isolist) {
    alert('进入订单页，登录未知')
    var tab_elem = document.querySelectorAll('.nav-tab-top ul > li');
    var tab_len = tab_elem.length;
    if(tab_len > 0){
        alert('进入订单页,已经登录');
        var tab_name = '';
        var index = 0;
        var tab_arr = [];
        for (var i = 0; i < tab_len; i++) {
            tab_arr.push(tab_elem[i]);
        }
        tab_arr.forEach(function (e, i) {
            if (e.classList.value == 'cur') {
                index = i;
                result = new getData(i).dataAll;
                tab_name = e.getAttribute('data-code');
                alert('订单页第一次获取返利')
                getfanli(result,tab_name);
            }
            e.addEventListener('click', function(){
                alert('点击tab页');
                window.setTimeout(function () {
                    index = i;
                    result = new getData(i).dataAll;
                    tab_name = e.getAttribute('data-code');
                    getfanli(result,tab_name);
                    scroll_h = parseInt(scroll_e.style.height);
                }, 1000);
            });
        });
        var scroll_e = document.querySelector('.scroll-content');
        var scroll_h = parseInt(scroll_e.style.height);
        var cur_h = '';
        window.addEventListener('touchstart', function () {
            cur_h = parseInt(scroll_e.style.height);
            if (cur_h > scroll_h){
                alert('加载更多商品')
                result = new getData(index).dataAll;
                getfanli(result,tab_name);
                scroll_h = cur_h;
            }
        });
    }
} else {
    result = new getData().dataAll;
    getfanli(result);
}