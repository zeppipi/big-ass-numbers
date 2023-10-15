import { Directive, Output, Input } from '@angular/core';

@Directive({
  selector: '[appOutputProcessing]'
})

export class OutputProcessingService {

  @Input() getInput!: any;
  @Output() appOutputProcessing!: number;
  
}
