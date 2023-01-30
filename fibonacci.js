let looping = function(n) {
    let a=0, b=1, f=1;
    for (let i = 0; i <= n; i++) {
        f = a + b;
        a = b;
        b = f;
    }
    return f;
}