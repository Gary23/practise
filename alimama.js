/**
 * 1、获取到要选中的账户名
 * 2、在页面中选择该账户名
 * 3、然后自动登录点击，保证登录后就是之前选择的那个账户
 */

 // 设置账号名字
var user_name = '机械小宅';

function cntb(name){
  if(!name) return false;
  this.name = name;
  this.init();
}
cntb.prototype.init = function(){
  this.selectRadio();
}

cntb.prototype.selectRadio = function(){
  var user_list = document.querySelectorAll('.item-sso-user');
  var user_len = user_list.length;
  for(var i = 0; i < user_len; i++){
    var name = user_list[i].querySelector('label').innerHTML;
    var ipt = user_list[i].querySelector('input');

    if(name == this.name && $){
      var name_id = '#' + ipt.id;
      if($){
        $(name_id).click();
      }
    }
  }

  window.setTimeout(function(){
    var sub = document.querySelector('#J_SubmitQuick');
    sub.click();
  },2000)
}

new cntb(user_name);
