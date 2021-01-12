let check_duplicate = function(obj){
  return new Set(Object.values(obj)).size !== Object.values(obj).length
}

module.exports = check_duplicate;
