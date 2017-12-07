

(function() {
	
	var pagination,
		pageBtn ,
		parent,
		items,
		arr = [],
		pageNext,
		temp,
		items,
		str;

	function isLoad() {
		pagination = document.querySelector('.pagination');
		pageBtn = pagination.querySelectorAll('a');
		parent = document.querySelector('.J_TItems');
		items = parent.querySelectorAll('.item');
		if (pagination && parent && pageBtn && items) {
			return true;
		} else {
			return false;
		}
	}

	function getItems() {

		var arr = [];
		
		for (var i = 0,l = items.length; i < l; i++) {
			var id = items[i].dataset.id
			var obj = {};
			obj['id'] = items[i].dataset.id;
			obj['title'] = items[i].querySelector('.detail > a').innerText;
			obj['price'] = items[i].querySelector('.detail .c-price').innerText;
			if (items[i].querySelector('.photo img').dataset.ksLazyload) {
				obj['photo'] = items[i].querySelector('.photo img').dataset.ksLazyload;
			} else {
				obj['photo'] = items[i].querySelector('.photo img').src;					
			}
			arr.push(obj);
		}

		return arr;
	}


	var timer = window.setInterval(function(){
		if (isLoad()) {
			clearInterval(timer);

			for (var i = 0,l = pageBtn.length; i < l; i++) {
				if (pageBtn[i].innerText === '下一页') {
					pageNext = pageBtn[i];
				}
		
				if (pageBtn[i].innerText === '1' && pageBtn[i].className.indexOf('page-cur') >= 0) {
					window.localStorage.removeItem('shopItems');
				}
			}


			if (window.localStorage.getItem('shopItems')) {
				temp = window.localStorage.getItem('shopItems');
				items = JSON.stringify(getItems());
				str = temp.replace(/]$/, ',' + items + ']');
				window.localStorage.setItem('shopItems',str);
			} else {
				arr.push(getItems());
				window.localStorage.setItem('shopItems',JSON.stringify(arr));
			}

			pageNext.click();
		}
	},500)

})()


