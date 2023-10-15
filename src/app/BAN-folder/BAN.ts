// Main class
import { NaiveBANumber } from "./naiveBAN";
const ALPHABET: string[] = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 26 letters

export class BANumber 
{  
  // Variables
  naiveObj = new NaiveBANumber("0", 10);  // Should refactor this eventually
  
  // Properties
  stringNumbers: string;
  numberList: number[];
  limit: number;  
  outputBAN: string;

  // For testing
  testList: number[];
  
  // Constructor
  constructor(stringNum: string, limit: number) {
    this.stringNumbers = stringNum;
    this.limit = limit;

    this.numberList = this.stringListTransform(this.stringNumbers, limit);
    this.outputBAN = this.numListToBAN(this.numberList);

    // Testing
    this.testList = this.stringListTransform(this.stringNumbers, limit);
  }
    
  // Methods
  stringListTransform(stringNumber: string, limit: number): number[] {
    /**
     * Transforms a string into the number list
     */
    // Segment number
    let tempList: number[] = [];
    const chunkSize = 1; 

    for (let i = stringNumber.length; i > 0; i -= chunkSize) {
      let stringNum = Number(stringNumber.substring(i - chunkSize, i));

      if(stringNum || stringNum == 0) {
        tempList.push(stringNum);
      }
    }

    let resLis: number[] = [];
    for (let i = 0; i < tempList.length; i++) {
      // Start the number list
      // i-index: loops through the number list
      // j-index: loops through the amount of power for the current i index (ie. j=4 -> 10^4)
      let tempRes: number[] = [];
      
      if (i == 0) {
        // Having a 0 causes the list to be empty
        if(tempList[i] == 0) {
          resLis = [0];
        } else {
          resLis = this.naiveObj.naiveNumList(tempList[i], limit);  // Only used for a very small number
        }
      }
      
      // Generate the number list
      else {
        if(tempList[i] == 0) {
          tempRes = [0];
        } else {
          tempRes = this.naiveObj.naiveNumList(tempList[i], limit); // Same here
        }
        
        // Powering
        for (let j = 0; j < i; j++) {
          tempRes = this.naiveObj.naiveNumlistMultiplication(tempRes, 10, limit);
        }

        resLis = this.naiveObj.naiveNumlistAddition(resLis, tempRes, limit);
      }
    }

    return resLis;
  }

  numListToBAN(numList: number[]): string {
    /**
     * Turns a number list into a BAN
     */
    // Variables
    let tempString = "";
    let mainNum = 0;
    let stringIndexes = this.naiveObj.naiveNumList(numList.length - 1, ALPHABET.length);

    // Calculation 'mainNum'
    if (numList.length > 1) {
      let tempDec = 0;
      for (let i = numList.length - 2; i > -1; i--) {
        // Exists a point of inaccuracy, but only for display
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

  strToNum(numString: string): number {
    /**
     * Turns a string of numbers straightup
     * Delete this when implementing the non-naive algorithm
     */
    return Number(numString);
  }
}
