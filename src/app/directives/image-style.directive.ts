import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[appImageStyle]' })

export class ImageStyleDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.cssFloat = 'left';
    el.nativeElement.style.marginRight = '12px';
    el.nativeElement.style.marginBottom = '7px';
  }
}
