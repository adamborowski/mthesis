const cache = {};

function fib(n) {
    if (cache[n] !== undefined) {
        return cache[n];
    }
    if (n <= 1) {
        return n;
    }
    const result = (fib(n - 2) + fib(n - 1));

    cache[n] = result;
    return result;
}