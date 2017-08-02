/**
 * 组件的规范
 * 在实际使用中推荐预先加载的方式
 * 在用到layui组件之前就加载，加载组建的核心是use方法，预加载避免了多次写use，便于维护，use应该写在所有Js代码的外层
 */
layui.use(['form','upload'],function(){
  var form = layui.form(),  // 获取form组建
      upload = layui.upload();  // 获取upload组件

  // 监听提交按钮
  form.on('submit(test)',function(data){
    console.log(data);      
  })

  // 实例化一个上传控件
  upload({
    url:'url地址',
    success:function(){
      console.log(data);
    }
  })
})


/**
 * 这是非预加载的方式
 * 每次需要用layui的组件再去调用use方法加载，不利于维护
 */

//下面是在一个事件回调里去加载一个Layui组件
button.addEventListener('click', function(){
  layui.use('laytpl', function(laytpl){ //温馨提示：多次调用use并不会重复加载laytpl.js，Layui内部有做模块cache处理。
    var html = laytpl('').render({});
    console.log(html);
  });
});


/**
 * 组件命名空间
 * 所有组件都绑定在layui对象下，内部由define方法来完成，所以无需担心组件被污染的问题。
 * 调用一个组件也必须通过layui对象赋值
 */
layui.use(['layer', 'laypage', 'laydate'], function(){
  var layer = layui.layer //获得layer组件
  ,laypage = layui.laypage //获得laypage组件
  ,laydate = layui.laydate; //获得laydate组件
  
  //使用组件
});

// 可以在元素上直接调用一个组件
//<input onclick="layui.laydate()">


/**
 * 扩展组件
 * 扩展组件也是放在layui的对象中
 * 假设现在扩展一个叫做test的组件，需要新建一个test.js，并且不需要放到layui的目录下
 */
layui.define(function(exports){
  var obj = {
    hello:function(str){
      alert('Hello' + (str||'test'));
    }
  }
  // 输出test接口
  exports('test',obj);
})

/**
 * 下面引用扩展的组件
 */
layui.config({
  base:'./js/'  // 假设这是组件test.js的目录
}).extend({
  test:'test',  // 设置组件别名，如果组件在根目录也可以不设置别名
  test1:'admin/test1'   // 相对于上述base目录的子目录，key是模块名,值是js文件位置
})
// 使用test组件
layui.use('test',function(){
  var test = layui.test;
  test.hello('hello world')   // 定义test组建时候写的方法
})


/**
 * 关于jquery
 * layui内置了jquery1.11最稳定的一个版本作为一个组件，使用时需要加载
 * 如果script已经引用了jquery就不需要再加载该模块了
 */
// 主动加载jquery模块
layui.use(['jquery','layer'],function(){
  var $ = layui.jquery,   // layui去除了jquery和$，所以需要重新赋值
      layer = layui.layer;
  // 之后就和平常用jquery一样
  $('body').append('hello');
})

// 如果内置的组件本身就依赖jquery，就不用特意去use jquery
layui.use('layer',function(){
  var $ = layui.jquery,   // layer组件依赖jquery，所以直接就可以得到，这个写法和上面的结果相同
      layer = layui.layer;
})










