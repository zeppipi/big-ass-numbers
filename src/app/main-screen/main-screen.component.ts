import { Component, Input } from '@angular/core';
import { BANumber } from '../BAN-folder/BAN';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent {
  BANObject = new BANumber('', 10);
  
  // Input from html
  @Input() inputBox: string = '';
  @Input() limitBox: number = 10;
  
  // Outputs
  @Input() outputBox: number = NaN;
  @Input() limit: number = NaN;
  @Input() outputBAN: string = '';

  onChange(newValue : any, idChange: string) {
    /**
     * Detect change on any of the inputbox
     */
    switch(idChange) {
      case 'inputBox':
        this.inputBox = newValue;
        this.BANObject = new BANumber(newValue, this.limitBox);
        break;

      case 'limitBox':
        this.limitBox = newValue;
        this.BANObject = new BANumber(this.inputBox, newValue);
        break;

      default:
        console.log('Error: Invalid idChange');
    }

    this.update();
  }

  update() {
    /**
     * updatE Is cALleD OnCE PEr FraME
     * Updates the outputBAN
     */
    this.outputBAN = this.BANObject.outputBAN;
  }
}
