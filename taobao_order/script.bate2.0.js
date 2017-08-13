/* 
    目的：获取页面内的列表
*/



    function getData(index) {
        this.index = index || 0;
        this.dataAll = [];
        this.init();
    }

    getData.prototype = {
        constructor: getData,
        init: function () {     // 初始化方法
            this.path = window.location.pathname;
            if (this.path.indexOf('olist') != -1) {
                this.isolist = true;    // 在订单页
            } else if (this.path.indexOf('myCart') != -1) {
                this.ismyCart = true;   // 在超市购物车页
            } else if (this.path.indexOf('cart') != -1) {
                this.iscart = true;     // 在普通购物车页
            } else {
                return false;       // 不在这三个页面就跳出
            }
            this.exec();
        },
        Trim: function (str) {      // 字符串祛首尾空格
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        getId: function (str) {     // 获取商品和店铺id
            if(str.indexOf('=') != -1) {        // 普通id获取
                var arr = str.split('=');
                return arr[arr.length - 1];
            }else if(str.indexOf('chaoshi') != -1){     // 普通购物车天猫超市id
                return '725677994';
            }else if(/i[\d]+./.test(str)){      // 普通购物车非天猫超市商品id
                var arr = str.match(/i[\d]+./);
                return arr[0].replace(/(^i)|(.$)/g,'');
            }else{      // 其他情况
                return str;
            }
        },
        getElem: function (str, parent) {       // 获取单一元素
            parent = parent || document;
            return parent.querySelector(str);
        },
        getElems: function (str, parent) {      // 获取多个元素
            parent = parent || document;
            return parent.querySelectorAll(str);
        },
        getTab: function () {       // 返回订单页当前的tab选项下的列表
            return this.getElems('.order-cont')[this.index];
        },
        getOrder: function (ul, elem) {     // 获取所有数据的方法
            var parent = elem || document;      // 确定列表的容器
            this.lis = this.getElems(ul, parent);   // 获取显示的所有列表项
            var lis_len = this.lis.length;      // 列表数量

            var goods_e = '',       // 初始化变量
                goods_a = '',
                goods_l = '',
                goods_n = '',
                shop_e = '',
                lis_text = '';
            
            for (var j = 0; j < lis_len; j++) {     // 遍历所有列表
                if (this.isolist) {
                    lis_text = this.getElem('.state-cont .h',this.lis[j]).innerHTML
                    if(lis_text.indexOf('交易关闭') !== -1){    // 判断如果有交易关闭的就跳出
                        continue; 
                    }
                }
                if (this.isolist || this.iscart) {      // 在订单页或普通购物车页
                    shop_e = this.getElem('.o-t-title-shop .contact > a', this.lis[j]) || this.getElem('.invalid-title', this.lis[j]);      // 获取店铺的容器，'.invalid-title'是失效商品的

                    if(!shop_e.href && this.isolist){    // 2.0 排除订单页下没有店铺名的(例如淘票票订单)
                        continue;
                    }

                    goods_e = this.getElems('.item-list .item-info .title', this.lis[j]);   // 商品名容器
                    goods_a = this.getElems('.item-list .item-info > a', this.lis[j]);   // 普通购物车页的商品id容器，订单页没有这个元素

                } else if (this.ismyCart) {     // 在超市购物车页，因为结构和其他页面不同所以单独判断
                    shop_e = this.lis[j];    // 获取店铺的容器
                    goods_e = document.querySelectorAll('.order-des > h2');     // 获取商品名的容器
                } else {
                    return false;       // 其他页面就不执行后面的代码，防止报错
                }
                
                goods_l = goods_e.length;   // 获取商品的数量
                for (var k = 0; k < goods_l; k++) {     // 遍历当前店铺的商品
                    var goods_obj = {};
                    goods_n = this.Trim(goods_e[k].innerHTML);    // 获取商品名

                    if(goods_n.indexOf('保险服务') !== -1) {    // 2.0 排除运费险
                        continue;
                    }

                    goods_obj['goods_name'] = goods_n;  

                    if (this.iscart) {    // 普通购物车页获取商品id
                        goods_obj['goods_id'] = this.getId(goods_a[k].href);
                        goods_obj['shop_id'] = !shop_e.href ? '' : this.getId(shop_e.href);
                    } else if (this.ismyCart) {     // 超市购物车页获取商品id
                        goods_obj['goods_id'] = this.getId(goods_e[k].getAttribute('href'));
                        goods_obj['shop_id'] = shop_e.getAttribute('data-shop');
                    } else {    // 订单页，没有id，直接为空
                        goods_obj['goods_id'] = '';
                        goods_obj['shop_id'] = !shop_e.href ? '' : this.getId(shop_e.href);
                    }
                    this.dataAll.push(goods_obj);
                    goods_obj = null;    // 销毁临时对象
                }
            }
        },
        exec: function () {     // 整个对象的执行处理
            if (this.isolist) {
                this.order_cur = this.getTab();
                this.getOrder('.order-list > li', this.order_cur);
            } else if (this.ismyCart) {
                this.getOrder('.grid-shop');
            } else if (this.iscart) {
                this.getOrder('.bundlev2')
            }
        }
    }



    // 如果是测试时，为了方便可以取消DOMContentLoaded事件
    // window.addEventListener('DOMContentLoaded',function(){
        var result = ''
        if(new getData().isolist){    // 以下是在订单页遇到的事件
            var tab_elem = document.querySelectorAll('.nav-tab-top ul > li');     // 获取所有tab
            var tab_len = tab_elem.length;    // tab的长度

            var tab_arr = []    // 由于tab_elem是伪数组，所以要在这里改为真数组使用foreach
            for(var i = 0; i < tab_len; i++){
                tab_arr.push(tab_elem[i]);
            }

            tab_arr.forEach(function(e,i){    // 遍历获取的tab栏添加点击事件
                if(e.classList.value == 'cur'){
                    result = new getData(i).dataAll     // 订单页首次获取数据
                }
                e.addEventListener('click',function(){
                    window.setTimeout(function(){   // 淘宝切换tab时，状态切换的比较慢，直接获取不到，只能延迟一点再获取。
                        result = new getData(i).dataAll
                        console.log(result);       // 点击tab栏获取数据
                        getfanli(result);
                    },1000)
                })
            });

            // 获取容器高度
            var scroll_e = document.querySelector('.scroll-content');   // 获取列表的容器的高度，可以理解为ul元素
            var scroll_h = parseInt(scroll_e.style.height);     // 当前容器的高度
            var cur_h = '';
            window.addEventListener('touchstart', function () {    
                cur_h = parseInt(scroll_e.style.height);    
                if (cur_h > scroll_h) {     // 当刷新出新数据后容器高度会变大，如果变大就重新获取。
                    result = new getData().dataAll;
                    console.log(result);    // 加载更多数据获取数据
                    getfanli(result);
                    scroll_h = cur_h;    // 保存新高度下次计算
                }
            })
        }else {
            result = new getData().dataAll;     // 非订单页首次获取数据
        }
        console.log(result)
        getfanli(result);



    // })


        function formatData (data){
            var k,
                ret = [];
            for(k in data){
                ret.push(window.encodeURIComponent(k) + '=' +
                        window.encodeURIComponent(data[k]));
            }
            ret.push(('_=' + Math.random()).replace('.',''));
            return ret.join('&');
        }


        function jsonp (options){
            var scriptElem,
                headElem,
                callbackName,
                url;
            
            // 动态创建一个script标签,将script标签添加到head标签下
            scriptElem = document.createElement('script');
            headElem = document.getElementsByTagName('head')[0];
            headElem.appendChild(scriptElem);

            // 创建一个全局的回调函数
            callbackName = ('jsonp_' + Math.random()).replace('.', '');
            options.data = options.data || {};
            options.data[options.callback] = callbackName;
            window[callbackName] = function(data){
                window.clearTimeout(scriptElem.timerId);
                headElem.removeChild(scriptElem);
                delete window[callbackName];
                options.success && options.success(data);
            }

            options.data = formatData(options.data);
            url = options.url + '?' + options.data;

            scriptElem.src = url;
        }


        function getfanli(result){
            var result_l = result.length;
            var q = '';
            var uid = '';
            var num = 0;
            var count = 0;
            if(result_l == 0){
                console.log(0);
                return false;
            }
            for(var i = 0; i < result_l; i++){
                q = result[i]['goods_name'];
                uid = result[i]['shop_id'];
                jsonp({
                    url: '//mall.aili88.cn/tb-rebate-amount.html',
                    data: {
                        'q': q,
                        'uid': uid,
                    },
                    callback: 'callback',
                    success: function(data){
                        if(data){
                            num += data['flje'] * 100;
                            count++;
                        }
                        if(count === result_l){
                            num = (num / 100)
                            console.log(num);
                        }
                    }
                })
            }
        }