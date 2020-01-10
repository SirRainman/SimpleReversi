// 传数组传的是引用
var a = [1, 1, 1];
function x(b) {
    b[0] = 0;
}
x(a);
console.log(a);
