// 开始使用gulp
var gulp = require('gulp');
// gulp的插件也是基于nodejs的，插件要先安装再去引入

// css压缩的插件是cssmin
var cssmin = require('gulp-cssmin');
// css增加私有前缀的插件autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// 图片压缩
var imagemin = require('gulp-imagemin');
// 压缩js
var uglify = require('gulp-uglify');
// html压缩
var htmlmin = require('gulp-htmlmin');
// 合并
var concat = require('gulp-concat');

var useref = require('gulp-useref');

var gulpif = require('gulp-if');

// 新建一个任务,在命令行执行任务直接输入 gulp css，css是任务名
gulp.task('css',function(){
    // 指定静态资源的路径，gulp.src,多个路径可以写为数组，['./public/*','./upload/*']
    // .pipe()是管道函数，里边直接调用require引入的插件，其实和jquery的链式操作相似
    // cssmin()函数会通过gulp.src的路径查找到文件并执行压缩，
    // 压缩之后还需要增加css的私有前缀autoprefixer(),这个插件有配置项，参数是对象形式，browsers: ['last 2 versions']是根据最新版本往前2个版本(也就是项目需要兼容的版本)。
    // 通过gulp.dest()的路径生成压缩之后的文件。
    gulp.src('./css/layout.css')
    .pipe(cssmin())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./release/'));
});

gulp.task('image',function(){
    // './image/**/*'  **的意思是递归，比如image文件夹下面还有文件夹，那么使用**就会一层一层的找下去。
    // {base:'./'}用于修改gulp.desc()的路径，意思是用src中的路径作为基准，将输出后的文件路径就是gulp.dest()的路径拼接上基准路径。现在图片压缩后都会放到release/image/目录下
    gulp.src('./image/*',{base:'./'})
    .pipe(imagemin())
    .pipe(gulp.dest('./release/'))
})

gulp.task('js',function(){
    // concat('all.js')将js合并为一个all.js,通常先压缩再去丑化
    gulp.src('./script/*.js',{base:'./'})
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./release/'))
})

gulp.task('html',function(){
    // {collapseWhitespace: true}参数是合并html中的空白符
    gulp.src('./*.html',{base:'./'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./release/'))
})

// 当文件合并后或者改名后，文件引入也要发生变化，用useref来完成这个更改
// <!--build:js ./script/all.js-->
// <script src='....'></script>
// <!--endbuild-->
// 删除引用：
// <!--build:remove-->
// <script src='....'></script>
// <!--endbuild-->
gulp.task('useref',function(){
    // gulpif('*.js',uglify()) 假如是js文件就执行uglify()
    gulp.src('./index.html')
    .pipe(useref())
    .pipe(gulpif('*.js',uglify()))
    .pipe(gulp.dest('./release/'))
})
// gulp的方法：gulp.src、gulp.task、gulp.pipe、gulp.dest


