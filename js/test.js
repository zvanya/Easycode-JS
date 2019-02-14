const x = function x(val1) {
    return (val2) => { return val1 + val2};
};


console.log(x(1)(7));