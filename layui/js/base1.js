 /** 
 * layui.define([mods], callback) 使用模块
 * 模块必须用use方法调用才会加载，用法和define一样
 */
layui.use(['laypage', 'layedit'], function () {
  // 使用laypage分页和layedit编辑器
  var laypage = layui.laypage,
    layedit = layui.layedit;

  // 也可以直接这样使用
  laypage();
  layedit.build();
})


/** 
 * layui.data(table,settings)
 * 在本地内存中操作表，local storage
 */
// 增加和修改
layui.data('test', {
  key: "name",
  value: "tom"
});
// 查,获取到tom
var localTest = layui.data('test');
console.log(localTest.name);

// 删除
layui.data('test', {
  key: 'name',
  remove: true
})


/**
 * layui.device(key)获取设备信息
 * 根据不同的设备返回不同的信息
 */
var device = layui.device();
console.log(device);
// android:false
// ie:false
// ios:false
// os:"windows"
// weixin:false
var APP = layui.device('myapp');
console.log(APP.myapp);  // 返回布尔值

/*
其他的  方法/属性	描述
layui.cache	静态属性。获得一些配置及临时的缓存信息
layui.getStyle(node, name)	获得一个原始DOM节点的style属性值，如：layui.getStyle(document.body, 'font-size')
layui.img(url, callback, error)	图片预加载
layui.extend(options)	拓展一个模块别名，如：layui.extend({test: '/res/js/test'})
layui.router()	获得location.hash路由，目前在Layui中没发挥作用。对做单页应用会派上用场。
layui.hint()	向控制台打印一些异常信息，目前只返回了error方法：layui.hint().error('出错啦')
layui.each(obj, fn)	对象（Array、Object、DOM对象等）遍历，可用于取代for语句
layui.stope(e)	阻止事件冒泡
layui.onevent(modName, events, callback)	自定义模块事件，属于比较高级的应用。有兴趣的同学可以阅读layui.js源码以及form模块
layui.event(modName, events, params)	执行自定义模块事件，搭配onevent使用
*/