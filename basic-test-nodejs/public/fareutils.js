let rate = {
    fixed : 50,
    minKm : 5,
    perKm : 10,
    freeMin : 15,
    perMin : 2
}

function calcFare(km, min) {
    let fare = rate.fixed
    fare = fare +((km > rate.minKm) ? ((km - rate.minKm) * rate.perKm) : 0)
    console.log(fare)
    fare += (min > rate.freeMin) ? ((min - rate.freeMin) * rate.perMin) : 0
    console.log(fare)
    return fare;
}

exports = module.exports = {
    rate, calcFare
}