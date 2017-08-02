## count_down倒计时插件


一个倒计时插件,用于一些活动的时间显示

###显示模式
1. 默认的(01天 02时 03分 05秒) 如果天数是0也显示 (00天 00时 00分 30秒)
2. (01天 02时 03分 05秒) 如果天数是0不显示 (30秒)   
3. 这种不要天数 (35:45:03)
4. 只有秒倒计时 (354秒)

###关于参数的说明

element: string  必传参数,没有默认值,传入倒计时插件的容器

通用设置	
- type: number  0|1|2|3|  默认值:0  倒计时插件的模式
- time: number  默认值:60  需要倒计时的秒数
- bgColor: string  默认值:'transparent'  整体element元素的背景色
- color: string  默认值:'#ffffff'  时间和文字的颜色
- size: string  默认值:'16px'  时间和文字的字体大小
- family: string  默认值:'Arial'  时间和文字的字体
- weight: number  默认值:100  时间和文字的字体粗细
- margin: string  默认值:'0 2px'  时间容器的margin值
- padding: string  默认值:'2px 1px'  时间容器的padding值
 
以下设置用于区分时间和文字的样式
时间区域的单独设置
- sizeT: string  默认值:'16px'  时间的字体大小
- familyT: string  默认值:'Arial'  时间的字体大小
- weightT: number  默认值:100  时间的字体粗细
- colorT:  string  默认值:'#ffffff'  时间的颜色
- bgColorT:  string  默认值:'transparent'  时间的背景颜色
- borderT:  string   默认值:'2px'  时间的圆角尺寸
 
文字区域的单独设置
- familyF:  string  默认值:'Arial'  文字的字体大小
- sizeF:  string  默认值:'16px'  文字的字体大小
- weightF:  number  默认值:100  文字的字体粗细
- colorF:  string  默认值:'#ffffff'  文字的颜色