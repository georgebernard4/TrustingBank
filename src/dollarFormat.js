
//atLeastWholedigits adds zeros, until there are at least the input amount of digits to the left of the decimal
//least length adds spaces until least length reached, add space where could be set to start - before $, or end defaults to after $
//countCSLength false allows for decimal places to allign with cent symbol sticking to right
export function dollarFormat( input, 
  alwaysShowCents = true, useCommas = false, useSpaces= false , useCentSymbol = false,
  atLeastWholeDigits = null, leastLength=null, addSpaceWhere='middle', countCSLength = false, 
  dollarSymbolX = '$', centSymbolX = '\u{00A2}', inputRadix = 10){
if( atLeastWholeDigits) useCentSymbol = false;
let ds = dollarSymbolX
let cs = centSymbolX;
let noDecimal = false;
let y = input.toString(inputRadix);
//remove , cent symbol (cs) and $ in case input was already a string with these
y = y.replaceAll(',','');
y = y.replaceAll(cs,'');
y = y.replaceAll(ds,'');


//removing leading zeros 
while( y.length > 1 && y[0] === '0'){
  y = y.slice(1);
}

//console.log(y);
let numSize = y.length;
//console.log(numSize);
let decLocation = y.indexOf('.');
//console.log(decLocation);
let digitAfter = numSize - decLocation -1;
//console.log(digitAfter);
let zerosNeeded = 2- digitAfter;
//console.log(zerosNeeded);
if( decLocation === -1){ 
  decLocation = numSize;
  zerosNeeded = ( alwaysShowCents ? 2 : 0);
  if(!alwaysShowCents) noDecimal = true;
  digitAfter = 0;
  }
let cents= y.slice(numSize - digitAfter);
//console.log('cents: ' + cents);
let digitsToLeft = decLocation;
let pad = '0'.repeat( zerosNeeded);
//console.log(pad);
let frontPad = (decLocation === 0) ? '0': '';
//adding cent symbol functionality
let centSymbolYes = false;
if( frontPad === '0' && useCentSymbol === true){
  centSymbolYes = true;
  frontPad = '';
  noDecimal = true;
}
let insertText = '';
if( useCommas) insertText = ',';
if( useSpaces) insertText = insertText + ' ';

//console.log(frontPad);
let wholeDigits = y.slice(0, digitsToLeft);
//console.log('wholeDigits: ' + wholeDigits); 

//adding zero pad for least whole digits parameter
if(atLeastWholeDigits !== null && atLeastWholeDigits !== Infinity){
  let wDCount = wholeDigits.length + frontPad.length;
  if( atLeastWholeDigits > wDCount){
    let zeroFillAMT = atLeastWholeDigits - wDCount;
    zeroFillAMT = Math.ceil(zeroFillAMT);
    let zeroFill = '0'.repeat(zeroFillAMT);
    wholeDigits = zeroFill + wholeDigits;
  }
}
digitsToLeft = wholeDigits.length;


//inserting commas and/or spaces
if( (insertText !== '' ) && ( digitsToLeft !== 0 ) ){
  let startingDigitNumber = digitsToLeft % 3;
  //console.log('startingDigitNumber: ' + startingDigitNumber);
  let newWholeDigits = '';
  let initial = true;
  if( startingDigitNumber === 0) startingDigitNumber = 3;
  //console.log('startingDigitNumber: ' + startingDigitNumber);
  for( let i = startingDigitNumber; i <= digitsToLeft; i += 3){
    //console.log('i: ' + i);
    let startIndex = i - 3;
    if( initial) startIndex = 0;
    let newDigits = wholeDigits.slice( startIndex, i);
    newWholeDigits = newWholeDigits + (initial ? '': insertText) + newDigits;
    initial = false;
  }
  //console.log('newWholeDigits: ' + newWholeDigits);
  wholeDigits = newWholeDigits;
}

let dollarSymbol = centSymbolYes ? ''         : ds;
let centSymbol  = centSymbolYes ? cs : '';
//console.log(answer);
let dec = noDecimal ? '':'.';
//adding space to meet leastLength parameter

let startFill = '';
let midFill   = '';
let endFill   = '';

if(leastLength !== null && leastLength !== Infinity){
  let firstanswer = dollarSymbol + frontPad + wholeDigits + dec + cents + pad;
  let answerCount = firstanswer.length;
  if(countCSLength === true) answerCount += centSymbol.length;
  if( leastLength > answerCount){
    let spaceFillAMT = leastLength - answerCount;
    spaceFillAMT = Math.ceil(spaceFillAMT);
   let spaceFill = ' '.repeat(spaceFillAMT);
   if( typeof addSpaceWhere === 'string'){
     if( addSpaceWhere === 'front' || addSpaceWhere === 'start'){
       startFill = spaceFill;
      } else {
        if( addSpaceWhere === 'end'){
          endFill = spaceFill;
        } else {
          midFill = spaceFill;
        }
      }
     } else {
     midFill = spaceFill;
      
    }
  }
 }


let answer = startFill + dollarSymbol + midFill + frontPad + wholeDigits + dec + cents + pad + centSymbol + endFill;
return answer;
}
