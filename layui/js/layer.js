layui.use(['layer'], function () {

      var layer = layui.layer;


      // layer.open({
      //   content: 'hello',
      //   area:'500px',
      //   offset:'l'
      // });

      // layer.alert('...',{icon:1});



      // layer.msg('', {
      //   time: 3
      // })

      // layer.confirm('???',{
      //     btn: ['按钮1', '按钮2', '按钮3'],
      //     btn3: function (index, layero) {
      //       alert('1' + index);

      //     },
      //     btnAlign:'l'
      //   },
      //   function (index, layero) {
      //     alert('2' + index);

      //   },
      //   function (index, layero) {
      //     alert('3' + index);

      //   },

      // )
      // layer.open({
      //   type:4,
      //   content:'test',
      //   title:'标题',
      //   closeBtn:2,
      //   resize:true,

      //   btn: ['按钮1', '按钮2', '按钮3'],
      //   btn1:function(index,layero){
      //     alert('1')
      //   },
      //   btn2:function(){
      //     alert('2')
      //     return false
      //   },
      //   btn3:function(){
      //     alert('3')
      //     return false
      //   },
      //   cancel:function(){

      //   }
      // })

      // layer.load(2,{time:1000})
      // layer.open({
      //   area:['1000px','800px'],
      //   type:2,
      //   content:'./index.html',
      // })
      layer.tab({
        area: ['600px', '300px'],
        tab: [{
          title: 'tab1',
          content: '内容'
        }, {
          title: 'tab2',
          content: '内容2'
        }, {
          title: 'tab3',
          content: '内容3'
        }]
      })
})