import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumberInput]'
})

export class OnlyNumberInputDirective {

  @Input() appOnlyNumberInput!: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent> event;
    if (this.appOnlyNumberInput) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.code == 'KeyA' && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.code == 'KeyC' && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.code == 'KeyX' && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.code == 'KeyV' && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.code >= 'ArrowLeft' && e.code <= 'ArrowRight')) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.code < 'Digit0' || e.code > 'Digit9')) && (e.code < 'Numpad0' || e.code > 'Numpad9')) {
            e.preventDefault();
        }
      }
  }
}
