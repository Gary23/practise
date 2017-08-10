
    function getData(index) {
        // 所有的数据
        this.index = index || 0;
        this.flag = false;
        this.all_data = [];
        this.init();
    }

    getData.prototype = {
        constructor: getData,
        init: function () {
            this.path = window.location.pathname;
            if (this.path.indexOf('olist') != -1) {
                this.isolist = true;
            } else if (this.path.indexOf('myCart') != -1) {
                this.ismyCart = true;
            } else if (this.path.indexOf('cart') != -1) {
                this.iscart = true;
            } else {
                return false;
            }
            this.exec();
        },
        Trim: function (str) {
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        getId: function (str) {
            if(str.indexOf('=') != -1) {
                var arr = str.split('=');
                return arr[arr.length - 1];            
            }else{
                return str;
            }
        },
        getElem: function (str, parent) {
            parent = parent || document;
            return parent.querySelector(str);
        },
        getElems: function (str, parent) {
            parent = parent || document;
            return parent.querySelectorAll(str);
        },
        getTab: function () {
            return this.getElems('.order-cont')[this.index];
        },
        getOrder: function (ul, elem) {
            // console.log(elem)
            var parent = elem || document;
            // 获取当前tab中所有的li元素
            this.lis = this.getElems(ul, parent);
            // 获取li元素的数量
            var lis_len = this.lis.length;

            var goods_e = '',
                goods_a = '',
                goods_l = '',
                goods_n = '',
                shop_e = '';
            // 遍历容器获取id值
            for (var j = 0; j < lis_len; j++) {
                // 装载数据
                var shop_obj = {};

                if (this.isolist || this.iscart) {
                    // 获取店铺元素
                    shop_e = this.getElem('.o-t-title-shop .contact > a', this.lis[j])
                    // 获取商品元素
                    goods_e = this.getElems('.item-list .item-info .title', this.lis[j]);
                    goods_a = this.getElems('.item-list .item-info > a', this.lis[j]);

                    shop_obj['shop_id'] = this.getId(shop_e.href);
                } else if (this.ismyCart) {
                    // 获取店铺元素
                    shop_e = this.lis[j];
                    // 获取商品元素
                    goods_e = document.querySelectorAll('.order-des > h2');

                    shop_obj['shop_id'] = shop_e.getAttribute('data-shop');
                } else {
                    return false;
                }
                // 获取goodsname元素数量
                goods_l = goods_e.length;

                shop_obj['goods'] = [];
                for (var k = 0; k < goods_l; k++) {
                    var goods_obj = {};
                    goods_n = this.Trim(goods_e[k].innerHTML);
                    goods_obj['goods_name'] = goods_n;

                    if (this.iscart) {
                        goods_obj['goods_id'] = this.getId(goods_a[k].href);
                    } else if (this.ismyCart) {
                        goods_obj['goods_id'] = this.getId(goods_e[k].getAttribute('href'));
                    } else {
                        goods_obj['goods_id'] = '';
                    }

                    shop_obj['goods'].push(goods_obj);
                    goods_obj = null;
                }
                // 将该店铺对象放到数组中
                this.all_data.push(shop_obj);
                // 销毁对象
                shop_obj = null;
            }
        },
        exec: function () {
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





    var data_all = new getData().all_data;

    // 切换tab栏的时候获取数据
    if(new getData().isolist){
        var tab_elem = document.querySelectorAll('.nav-tab-top ul > li');
        var tab_len = tab_elem.length;
        // 遍历获取的tab栏添加点击事件
        tab_elem.forEach(function(e,i){
            e.addEventListener('click',function(){
                window.setTimeout(function(){
                    data_all = new getData(i).all_data
                },1000)
            })
        });


        // 获取容器高度
        var scroll_e = document.querySelector('.scroll-content');
        var scroll_h = parseInt(scroll_e.style.height);
        var cur_h = '';
        window.addEventListener('touchmove', function () {
            // 当加载后height值会变大，如果比原来大则执行exec()
            cur_h = parseInt(scroll_e.style.height);
            if (cur_h > scroll_h) {
                data_all = new getData().all_data;
                scroll_h = cur_h;
            }
        })
    }

    console.log(data_all)
