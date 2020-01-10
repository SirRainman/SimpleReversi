// 传数组传的是引用
let a: number[] = [1, 1, 1]
function x(b: number[]) {
    b[0] = 0
}
x(a)
console.log(a);
