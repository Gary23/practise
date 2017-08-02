(function ($, undefined) {

  $.fn.monthpicker = function (options) {
    // 获取月份
    var months = options.months || ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      // 获取年份
      yearNow = new Date().getFullYear(),


      // 获取年份
      getYears = function () {
        // options.years是开始年份,yaerNow是结束年份,length是一共几年
        // years是从开始到结束的年份
        var length = yearNow - options.years,
          i = 0,
          years = [];
        for (; i <= length; i++) {
          years.push(yearNow - i);
        }
        return years;
      },

      Monthpicker = function (el) {
        this._el = $(el);
        this._init();
        this._render();
        this._renderYears();
        this._renderMonths();
        this._bind();
        this._checkmonths();
      };

    Monthpicker.prototype = {
      destroy: function () {
        this._el.off('click');    // 移除$('input')的click事件
        this._yearsSelect.off('click');    // 移除select年份选择的click事件
        this._container.off('click');     //  移除月份显示的容器的click事件
        $(document).off('click', $.proxy(this._hide, this));    // 让_hide函数中的this变为这个函数的this指向
        this._container.remove();     // 删除显示月份的容器
      },

      _init: function () {
        this._el.html(getYears()[0] + '' + months[0]);    // 设置$('input')的内容,年份+空格+月份
        this._el.data('monthpicker', this);     // 给$('input')设置data-monthpicker属性，值是Monthpicker对象
      },

      _bind: function () {
        this._el.on('click', $.proxy(this._show, this));    // 点击$('input')元素后,将这个函数的this传给_show函数
        $(document).on('click', $.proxy(this._hide, this));     /// 点击文档的任何位置,都会将这个函数的this传给_hide函数
        this._yearsSelect.on('click', function (e) {      // 点击select年份选择  取消冒泡
          e.stopPropagation();
        });
        this._container.on('click', 'button', $.proxy(this._selectMonth, this));      //  点击月份的容器  将this传给_selectMonth函数
      },

      _show: function (e) {
        e.preventDefault();     // 阻止默认事件
        e.stopPropagation();    // 阻止冒泡
        this._container.css('display', 'inline-block');     // 设置月份选择的容器显示出来
      },

      _hide: function () {
        this._container.css('display', 'none');       // 设置月份选择的容器隐藏
      },

      _selectMonth: function (e) {
        var monthIndex = $(e.target).data('value'),     // 点击月份,获取这个月份的data-value属性
          month = months[monthIndex],       // month保存当前选择的月份
          year = this._yearsSelect.val();       // year保存当前选择的年份

 
          
        if (this._el.attr('type') == "text") {     // 如果是Input输入框
          this._el.attr("value", year + '' + month);      // 设置value属性 = 年份+月份  201701
        } else {
          this._el.html(year + '' + month);       // 如果不是input输入框那么设置这个元素的内容是年份+月份
        }

        if (options.onMonthSelect) {        
          options.onMonthSelect(monthIndex, year);      // 如果有onMonthSelect参数,就执行onMonthSelect函数  传入月份索引和年份,
                                                        //  这个方法应该是用于自定义月份
        }
      },

      _render: function () {
        var _containerWidth = 166,      //  月份容器的宽度
          // 月份容器的right值,body的宽 - input距离左边距的宽 - input的宽
          _containerRight = $("body").width() - this._el.offset().left - this._el.width(),    
          // 得到文本框的位置
          linkPosition = this._el.offset(),
          // 文本框的padding-right + 文本框的padding-left
          _padding = parseInt(this._el.css('paddingRight')) + parseInt(this._el.css('paddingLeft')),
          cssOptions = {};
        // 根据input标签的位置改变月份选择弹出框的位置  
        // 如果input距离右边窗口的距离小于月份容器的宽度
        if (_containerRight < _containerWidth) {
          cssOptions = {
            display: 'none',
            position: 'absolute',
            top: linkPosition.top + this._el.height() + (options.topOffset || 0),
            right: _containerRight - _padding
          };
        } else {
          cssOptions = {
            display: 'none',
            position: 'absolute',
            top: linkPosition.top + this._el.height() + (options.topOffset || 0),
            left: linkPosition.left
          };
        }

        this._id = (new Date).valueOf();
        this._container = $('<div class="monthpicker" id="monthpicker-' + this._id + '">')
          .css(cssOptions)
          .appendTo($('body'));

      },

      _renderYears: function () {
        var years = getYears()
        var markup = $.map(years, function (year) {
          return '<option>' + year + '</option>';
        });
        var yearsWrap = $('<div class="years">').appendTo(this._container);
        this._yearsSelect = $('<select>').html(markup.join('')).appendTo(yearsWrap);
      },

      _renderMonths: function () {
        var markup = ['<table>', '<tr>'];
        $.each(months, function (i, month) {
          if (i > 0 && i % 4 === 0) {
            markup.push('</tr>');
            markup.push('<tr>');
          }
          markup.push('<td><button data-value="' + i + '">' + month + '</button></td>');
        });
        markup.push('</tr>');
        markup.push('</table>');
        this._container.append(markup.join(''));
      },
      // 检测月份，不能选择大于当前月份
      _checkmonths: function () {
        var length = new Date().getMonth();
        if ($('.monthpicker select').val() == yearNow) {
          $('.monthpicker button').attr('disabled', 'true') // 当前年份的所有月份改为disabled
          $('.monthpicker').each(function (index, elem) {
            for (var i = 0; i <= length; i++) {
              $(elem).find('button').eq(i).removeAttr('disabled'); // 如果是已经过去的月份就可选
            }
          })
        }

        $('.monthpicker').each(function (index, elem) {
          $(elem).find('.years select').on('change', function () {
            if ($(this).val() == yearNow) { // 如果选择了当前年份
              $(this).parent().next().find('button').attr('disabled', 'true') // 当前年份的所有月份改为disabled
              for (var i = 0; i <= length; i++) {
                $(this).parent().next().find('button').eq(i).removeAttr('disabled'); // 如果是已经过去的月份就可选
              }
            } else {
              $(this).parent().next().find('button').removeAttr('disabled'); // 当前年份的所有月份改为disabled
            }
          })
        });
      },
    };

    var methods = {
      destroy: function () {
        var monthpicker = this.data('monthpicker');
        if (monthpicker) monthpicker.destroy();
        return this;
      }
    }

    if (methods[options]) {
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof options === 'object' || !options) {
      return this.each(function () {
        return new Monthpicker(this);
      });
    } else {
      $.error('Method ' + options + ' does not exist on monthpicker');
    }

  };




}(jQuery));