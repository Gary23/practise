/** 
 * layui.define([mods], callback) 定义模块
 * mods是可选值，代表该模块的依赖模块，callback就是当前模块加载完毕后的回调
 * 必须要有exports方法，这是输出该模块的接口
 */
layui.define(['layer','form'],function(exports){
  var layer = layui.layer,
      form = layui.form();

  layer.msg('hello world');

  /** 
   * 这里exports接收两个参数，第一个是模块名，第二个是模块接口
   * 这里index就会注册到layui对象下，即可通过layui.index()执行该模块的接口
   */
  exports('index', {});  // 输出该模块
})
