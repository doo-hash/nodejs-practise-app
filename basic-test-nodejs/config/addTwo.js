module.exports = function(){
    let args = Array.prototype.slice.call(arguments);
    console.log(args);
    if(!args.every(Number.isFinite)){
        throw new TypeError('addTwo() expects only numbers or array of numbers');
    }
    return args.map(x => x+2);
}