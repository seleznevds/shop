//возвращает форму  существительного в зависимости от числительного
export const getWordForm = (number, wordForms) => {
    let rest = number % 100;

    if(rest >= 11 &&  rest <= 19){
        return wordForms.plural;
    }

    rest = rest % 10;

    if (rest === 0 || rest >=5){
        return wordForms.plural;
    }

    if(rest >=2){
        return wordForms.genitive;
    }

    return wordForms.nominative;
}


export const getUniqueCollectionByProp = (collection, prop) => {
    let propValues = [];
    collection = collection.filter(element => {
      if (propValues.indexOf(element[prop]) === -1) {
        propValues.push(element[prop]);
        return true;
      }
      return false;
    });

    return collection;

  }

export const convertToRublesFromCents = (valueInCent) => {
  valueInCent = parseInt(valueInCent, 10);
  
  if(isNaN(valueInCent)){
    return 0;
  }
  
  let valueInRubles =  (valueInCent / 100);
  if(parseInt(valueInRubles, 10) === valueInRubles){
    return formatPrice(valueInRubles, ' ');
  }

  let rubles  = parseInt(valueInRubles, 10) ;
  let cents = (valueInRubles - rubles).toFixed(2).replace(/\d{1}\./g, ',');

  return '' + formatPrice(rubles, ' ') + cents;
} 


const formatPrice = (priceInt, delimiter='') => {
  let i = 0;

  let price = priceInt.toString().split('').reduceRight((prev, current) => {
    i++;
    let value = prev;
    
    if(i === 3){
      value = '' + delimiter + value;
      i = 0;
    }
    return '' + current + value; 
  });

  return price;
}