function getArea(x) {
  // Controllo subito se la lunghezza è giusta
  if(x.length != 2)
    return -1;

  var a = parseInt(x[0])
  var b = parseInt(x[1])

  var aDouble = parseFloat(x[0])
  var bDouble = parseFloat(x[1])

  // Controllo ora se i tipi sono giusti
  if(!Number.isInteger(a) || !Number.isInteger(b))
    return -1;

  // Controllo ora se i tipi sono giusti
  if(isFloat(aDouble) || isFloat(bDouble))
    return -1;

  // se tutto è corretto, allora ritorno l'area
  return a * b;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

module.exports = getArea;
