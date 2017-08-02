/*
//layui模块的定义
layui.define([mods], function(exports){
  //……
  exports('mod', api);
});  
//layui模块的使用
layui.use(['mod1', 'mod2'], function(args){
  var mod = layui.mod1;
  
  //……
});  
*/

/*
// 一般的写法,这些模块使用时才会加载
layui.use(['layer','form'],function(){
  var layer = layui.layer,
      form = layui.form();

  layui.msg('hello world');
})
*/



// 规范化的用法，这里引入我的index.js模块，模块化编程思想
layui.config({
  base: './js/' // 模块目录
}).use('index') // 加载模块 