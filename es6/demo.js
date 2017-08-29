// {
//     let a = 10;
//     var b = 1;
// }
// console.log(a);
// console.log(b);



// let a = [];
// for (let i = 0; i < 10; i++) {
//     a[i] = function () {
//         console.log(i);
//     };
// }
// a[6](); // 6



// var a = 0;
// if(true){
//     let a = 10;
//     console.log(a)
// }

// var y = 2;

// function fun(x = y, y = 2){
//     return [x,y];
// }

// fun();


// function fun(){
//     let a = 10;
//     {
//         let a = 1; 
//     }
// }

// fun()
// var tmp = new Date();

// function fun() {
//     console.log(tmp);
//     if(false){
//         var tmp = "hello world";
//     }
// }

// var s = 'hello';

// for(var i = 0; i < s.length; i++) {
//     console.log(s[i]);
// }

// console.log(i); //5


// function fun(){
//     let n = 5;
//     if(false) {
//         let n = 10;
//     }
//     console.log(n)  // 5
// }

// fun();


// {
//     {
//         let str = 'hello world';
//     }
//     console.log(str)  // 报错
// }

// {
//     let = str = 'hello world';
//     {
//         let str = 'javascript';
//     }
// }


function f() { console.log('outside'); }
(function(){
    if(false){
        // 重复外层的声明
        function f() { console.log('inside');}
    }
    f();
}());


























