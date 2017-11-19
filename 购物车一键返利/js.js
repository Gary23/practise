var obj = {
	"p": {
		"data": {
			"itemv2_649066450404": {		// 购物车的临时商品id，在商品最外层获取
				"fields": {
					"bundleId": "s_745949152",		// 购物车店铺的临时id，bundlev2中获取，或者商品最外层获取
					"cartId": "649066450404",	// 购物车的临时商品id，在商品最外层获取
					"checked": false,
					"itemId": "12560113269",	// 商品id
					"quantity": 1,
					"shopId": "68368026",
					"skuId": "0",
					"valid": true
				}
			},
			"itemv2_649074681373": {
				"fields": {
					"bundleId": "s_745949152",
					"cartId": "649074681373",
					"checked": false,
					"itemId": "528347068026",
					"quantity": 1,
					"shopId": "68368026",
					"skuId": "0",
					"valid": true
				}
			},
			"itemv2_649056433999": {
				"fields": {
					"bundleId": "s_745949152",
					"cartId": "649056433999",
					"checked": false,
					"itemId": "528688834857",
					"quantity": 1,
					"shopId": "68368026",
					"skuId": "0",
					"valid": true
				}
			}
		},
		"operate": {
			"deleteSome": ["itemv2_649066450404"]     // 购物车的临时商品id，在商品最外层获取
		},
		"hierarchy": {
			"root": "global_1",		// 页面根元素
			"structure": {	   // 整个购物车的结构
				"global_1": ["banner_1", "allItemv2_1"],	// 全局结构
				"allItemv2_1": ["bundlev2_s_745949152", "bundlev2_s_1124599300", "bundlev2_invalid", "footer_1"],	// allItemv2_1内部的结构
				"bundlev2_s_745949152": ["shopv2_s_745949152", "group_s_745949152_1000382013-40000_5000"],	// 第一个块			
				"group_s_745949152_1000382013-40000_5000": ["itemv2_649066450404", "itemv2_649074681373", "itemv2_649056433999"],   // 第一个块包含的三个商品
				"bundlev2_s_1124599300": ["shopv2_s_1124599300", "group_s_1124599300_1000382013-40000_5000"],				
				"bundlev2_invalid": ["itemv2_638971477550", "itemv2_638996550240", "itemv2_624070823003"],
				"group_s_1124599300_1000382013-40000_5000": ["itemv2_639115746733", "itemv2_639116922589", "itemv2_638968705616"]
			}
		}
	},
	"extStatus": "0",
	"feature": {
		"gzip": false
	},
	"exParams": {
		"mergeCombo": "true",
		"version": "1.0.0",
		"globalSell": "1",
		"pds": "cart#h#taojia"
	},
	"pds": "cart#h#taojia"
}
consol

var bub = $('.itemv2').eq(0);
var opopop = bub.find('.item-del').eq(0);
opopop.on('touchstart',function(){
	alert(1);
});
opopop.click();


console.log(opopop);
creatTouchstartEventAndDispatch(bub);

function creatTouchstartEventAndDispatch(el) {
	var event = document.createEvent('Events');
	event.initEvent('touchstart', true, true);
	el.dispatchEvent(event);
}




var stat = $('.state').eq(0).find('.state-cont');
stat.click();
window.setTimeout(function(){
	var dell = $('.item-del').eq(0);
	dell.click();
	window.setInterval(function(){
		if($('.c-float-popWrap').css('opacity') == 1){
			var alert1 = $('.c-float-popWrap .ok');
			alert1.click();
		}
		
	},10)
},100)



var del_btn = $('#bundlev2_s_745949152 .itemv2');
if (del_btn.hasClass('edit-false')) {
	del_btn.removeClass('edit-false').addClass('edit-true');
}
console.log(del_btn)





var bot = document.querySelector('.op');
bot.addEventListener('touchstart', function () { alert('touchstart'); }); 

creatTouchstartEventAndDispatch(bot); 

function creatTouchstartEventAndDispatch (el) { 
	var event = new MouseEvent('touchstart', {'view': window,'bubbles': true,'cancelable': true});
	//  event.initEvent('touchstart', true, true); 
	 el.dispatchEvent(event); 
} 


var event = new MouseEvent('click', {'view': window,'bubbles': true,'cancelable': true});
dom.dispatchEvent(event);