const MASK_CHARACTER = '#';
function maskify (creditCard) {
  // credit card length is less than 6, send it as is
  if(creditCard.length < 6){
    return creditCard;
  } 
  
  // start masking the credit card.
  let maskedCreditCard = '';
  const length = creditCard.length;
  for(var i=0;i<length-4;i++){
    if(creditCard[i] === MASK_CHARACTER){
      maskedCreditCard += ' ';
      continue;
    }
    maskedCreditCard += handleCharacter(creditCard[i],i);
  }
  for(let j=i;j<length;j++){
    maskedCreditCard += creditCard[j];
  }
  return maskedCreditCard;
}

function isDigit(value){
  return value >= 0 || value <= 9;
}

function handleCharacter(value,index){
  if(index === 0){
    return value;
  }
  return isDigit(value) ? MASK_CHARACTER : value;
}

console.log(maskify('4556-3646-0793-5616'));