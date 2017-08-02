(function ($) {

  $.fn.monthpicker = function (option) {
    // 获取月份
    var months = option.month || ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      // 当前年份
      year_now = new Date().getFullYear(),
      // 获取年份的数组
      getYears = function () {
        // 检测是否传入年份参数
        var year_target = option.target || year_now - 20,
          // 获取年份长度
          length = Math.abs(year_now - year_target),
          i = 0,
          years = [];
        for (; i <= length; i++) {
          if (year_now > year_target) {
            years.push(year_now - i);
          } else {
            years.push(year_now + i);
          }
        }
        return years;
      };
    // 执行阶段
    var Monthpicker = function (elem) {
      this._elem = $(elem); // 获取input元素对象
      this._init(); // 初始化
      this._render(); // 整个容器的位置
      this._renderYears(); // 年份容器的位置
      this._renderMonths(); // 月份容器的位置
      this._checkMonths(); // 检测月份
      this._bind();     // 上面的都是准备阶段,bind是执行阶段
    };
    // 实现的一些方法
    Monthpicker.prototype = {
      // 初始化
      _init: function () {
        if(this._elem.attr('type') == 'text'){
          this._elem.attr('value', getYears()[0] + ' ' + months[0]);
        }else{
          this._elem.html(getYears()[0] + ' ' + months[0]);
        }
      },

      _bind: function () {
        // 这里的this是Monthpicker函数,而show和hide的this就是input
        // 因为是input去调用show和hide函数
        // 所以在这里调用show和hide并且改变他们的this指向
        this._elem.on('click', $.proxy(this._show, this));
        $(document).on('click', $.proxy(this._hide, this));
        this._yearsSelect.on('click', function (e) {
          e.stopPropagation();
        });
        this._container.on('click', 'button', $.proxy(this._selectMonth, this));
      },
      // 显示选择容器
      _show: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this._container.css('display', 'inline-block');
      },
      // 隐藏选择容器
      _hide: function () {
        this._container.css('display', 'none');
      },
      // 选择月份并在input显示的方法
      _selectMonth: function (e) {
        // e是点击事件的时间对象,e.target是点击的哪个元素,
        // 最终是为了获取点击的那个元素的value属性值
        var month_index = $(e.target).data('value'),
          // 根绝点击的button确定是哪个月份
          month = months[month_index],
          // 选择的年份
          year = this._yearsSelect.val();

        if (this._elem.attr('type') == 'text') {
          this._elem.attr('value', year + ' ' + month);
        } else {
          this._elem.html(year + ' ' + month);
        }
      },

      // 渲染(容器的位置)
      _render: function () {
        var container_width = 166,
          // input的left
          elem_left = this._elem.offset().left,
          // input的左右padding
          elem_padding = parseInt(this._elem.css('paddingRight')) + parseInt(this._elem.css('paddingLeft')),
          // input的right
          elem_right = $('body').width() - elem_left - this._elem.width(),
          // input的top
          elem_top = this._elem.offset().top,
          // 容器的right
          container_right = elem_right - elem_padding,
          // 容器的top值
          container_top = elem_top + this._elem.height() + (option.topOffset || 0),

          css_option = {};
        // 如果容器的right值小于容器的宽度    
        if (container_right < container_width) {
          css_option = {
            display: 'none',
            position: 'absolute',
            top: container_top,
            right: container_right
          };
        } else {
          css_option = {
            display: 'none',
            position: 'absolute',
            top: container_top,
            left: elem_left
          };
        }

        this._id = (new Date).valueOf();
        // 创建容器
        this._container = $('<div class = "monthpicker" id = "monthpicker-' + this._id + '">')
          .css(css_option)
          .appendTo($('body'));
      },

      // 渲染年份
      _renderYears: function () {
        // 年份的数组
        var years = getYears();
        // 把所有年份用<option>标签嵌套,每个option元素就是markup数组的一个元素
        var markup = $.map(years, function (year) {
          return '<option>' + year + '</option>';
        });
        // 创建年份容器
        var years_wrap = $('<div class = "years">').appendTo(this._container);
        // 创建年份列表(option下拉框选项)
        this._yearsSelect = $('<select>').html(markup.join('')).appendTo(years_wrap);
      },

      // 渲染月份
      _renderMonths: function () {
        var markup = ['<table>', '<tr>'];
        $.each(months, function (i, month) {
          // 判断每四个月是一行(实际上i==4时是第五个月，但这里是放在创建td之前就创建tr所以没有影响),
          if (i > 0 && i % 4 === 0) {
            markup.push('</tr>');
            markup.push('<tr>');
          }
          // 每个月份被<td>嵌套，每个月份是一个button,
          // 设置每个月份的button的value属性
          markup.push('<td><button data-value="' + i + '">' + month + '</button></td>');
        });

        markup.push('</tr>');
        markup.push('</table>');
        this._container.append(markup.join(''));
      },
      _currentMonth: function () {

      },

      // 检测月份，不能选择大于当前月
      _checkMonths: function () {
        // 今年的已过月份长度
        var length = new Date().getMonth();
        // 获取当前的容器(每个容器只有id不同)
        var monthpicker = '#monthpicker-' + this._id
        // 如果选择了今年,就让大于当前月份的button禁用
        if ($(monthpicker + ' select').val() == year_now) {
          $(monthpicker + ' button').each(function (index, elem) {
            if (index > length) {
              $(elem).attr('disabled', 'true');
            }
          })
        };

        $(monthpicker + ' .years select').on('change', function () {
          if ($(this).val() == year_now) {
            $(monthpicker + ' button').each(function (index, elem) {
              if (index > length) {
                $(elem).attr('disabled', 'true');
              }
            })
          }else{
            $(monthpicker + ' button').removeAttr('disabled');
          }
        })
      },
    };

    if (typeof option == 'object') {
      return new Monthpicker(this);
    } else {
      $.error('Method' + option + 'does not exist on monthpicker');
    }
  }

}(jQuery));