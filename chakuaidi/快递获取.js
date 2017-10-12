(function (w, d) {

	function Trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, '');
	}
	var title, phone, addr, area;

	var btn = d.querySelector('#change');
	var res = d.querySelector('#result');

	btn.addEventListener('click', function () {
		res.innerHTML = '';
		area = d.querySelectorAll('.btline .selected')[2].innerHTML;
		var company_nav = d.querySelector('.company_nav');
		var list = company_nav.querySelectorAll('li');

		var message, t_elem, p_elem, a_ele;
		var result = [];
		for (var i = 0; i < list.length; i++) {
			var obj = {};
			message = list[i].querySelector('.list_message');

			t_elem = message.querySelectorAll('p')[0];
			p_elem = message.querySelectorAll('p')[1];
			a_elem = message.querySelectorAll('p')[2];

			title = Trim(t_elem.querySelectorAll('.color_blue')[0].innerHTML) + '|' + Trim(t_elem.querySelectorAll('.color_blue')[2].innerHTML);


			phone = p_elem.querySelector('span').innerHTML;
			addr = a_elem.querySelector('span').innerHTML;

			obj._title = title;
			obj._number = phone;
			obj._addr = addr;

			result.push(obj);

			obj = null;
		}

		var top = d.createElement('p');
		top.innerHTML = w.localStorage.getItem('name');
		res.appendChild(top);
		
		for(var k = 0; k < result.length; k++){
			var t = d.createElement('span');
			var p = d.createElement('span');
			var a = d.createElement('span');
			

		
			t.innerHTML = result[k]._title + ' + ';
			p.innerHTML = result[k]._number + ' + ';
			a.innerHTML = result[k]._addr;

			var hang = d.createElement('p');

			hang.appendChild(t)
			hang.appendChild(p)
			hang.appendChild(a)

		
			res.appendChild(hang);

		}


	})


})(window, document)