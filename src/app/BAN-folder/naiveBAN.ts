// Main class
const ALPHABET: string[] = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 26 letters

export class NaiveBANumber 
/**
 * The Big Ass Number system that is done naively,
 * meaning that the output number, actually becomes inaccurate when its big enough
 * in terms of digits and decimal places, used for doing small BAN calculations
 * 
 * Points of inaccuracy
 * 1. 'pureNumber': Turning a very long string of numbers into a number introduces inaccuracies
 * 2. Calculations with 'pureNumber': 'pureNumber' gets through a handful of calculations, and with a huge number, it becomes inaccurate
 * 3. Decimals in 'mainNum': The higher the ALPHABET, the more decimal places there will be, which will become inaccurate quite quickly
 */
{  
  // Properties
  stringNumbers: string;
  pureNumber: number; // This goes over limit
  numberList: number[];
  limit: number;  
  outputBAN: string;
  
  // Constructor
  constructor(stringNum: string, limit: number) {
    this.stringNumbers = stringNum;
    this.limit = limit;

    this.pureNumber = this.strToNum(stringNum);
    this.numberList = this.naiveNumList(this.pureNumber, limit);

    this.outputBAN = this.naiveListToBAN(this.numberList);
  }
    
  // Methods
  naiveNumlistMultiplication(numlist: number[], multiple: number, limit: number): number[] {
    /**
     * Multiplies a number list by a number
     * A*B
     */
    // Variables
    let tempNumList: number[] = [];

    // Multitplication = repeated addition
    for (let i = 0; i < multiple; i++) {
      if (i == 0) {
        tempNumList = numlist;
      } else {
        tempNumList = this.naiveNumlistAddition(tempNumList, numlist, limit);
      }
    }

    // console.log(tempNumList);
    return tempNumList;
  }

  naiveNumlistAddition(numListA: number[], numListB: number[], limit: number): number[] {
    /**
     * Adds two number lists together
     * A+B
     */
    // Variables
    let tempNumList: number[] = [];
    let overFlow = 0;
    const maxIndex = Math.max(numListA.length, numListB.length);

    // Add the two lists together
    for (let i = 0; i < maxIndex; i++) {
      // Padding
      if(i >= numListA.length) numListA.push(0);
      if(i >= numListB.length) numListB.push(0);
      
      let tempSum = numListA[i] + numListB[i] + overFlow;
      if (tempSum >= limit) {
        overFlow = 1;
        tempNumList.push(tempSum - limit);
      } else {
        overFlow = 0;
        tempNumList.push(tempSum);
      }
    }

    // Add the overflow
    if (overFlow == 1) {
      tempNumList.push(overFlow);
    }

    return tempNumList;
  }

  naiveListToBAN(numList: number[]): string {
    /**
     * Turns a number list into a BAN
     */
    // Variables
    let tempString = "";
    let mainNum = 0;
    let stringIndexes = this.naiveNumList(numList.length - 1, ALPHABET.length);

    // Calculation 'mainNum'
    if (numList.length > 1) {
      let tempDec = 0;
      for (let i = numList.length - 2; i > -1; i--) {
        tempDec += (numList[i] / this.limit) / (Math.pow(10, ((numList.length - 2) - i)));
      }
      mainNum = numList[numList.length - 1] + tempDec;
    }
    else if (numList.length == 1) {
      mainNum = numList[numList.length - 1];
    }

    // Write letters
    if (this.numberList.length > 1) {
      for (let i = stringIndexes.length - 1; i > -1; i--) {
        if (stringIndexes[i] == 0) {
          tempString = tempString.concat(ALPHABET[stringIndexes[i] + 1]);
        } else {
          tempString = tempString.concat(ALPHABET[stringIndexes[i]]);
        }
      }
    }
    
    return mainNum.toString().concat(tempString);
  }

  naiveNumList(numberNumber: number, limit: number): number[] {
    /**
     * Transforms a number into the number list
     */
    let tempNum = numberNumber;
    let tempList: number[] = [];
    
    while (tempNum >= 1)
    {
      tempList.push(tempNum % limit);
      if (tempNum == limit){
        tempList.push(1);
        break;
      } else {
        tempNum = Math.floor(tempNum / limit);
      }
    }
    
    return tempList;
  }

  strToNum(numString: string): number {
    /**
     * Turns a string of numbers straightup
     */
    return Number(numString);
  }
}
