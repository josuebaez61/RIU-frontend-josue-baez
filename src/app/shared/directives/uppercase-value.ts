import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseValue]',
})
export class UppercaseValue implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef, private ngControl: NgControl) {}

  ngOnDestroy(): void {
    const inputElement = this.elementRef.nativeElement;
    if (inputElement) {
      inputElement.removeEventListener('keyup', this.valueToUpperCase);
    }
  }

  ngOnInit(): void {
    const inputElement = this.elementRef.nativeElement;
    if (inputElement) {
      inputElement.addEventListener('keyup', this.valueToUpperCase);
    }
  }

  valueToUpperCase = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      inputElement.value = inputElement.value.toUpperCase();
      this.ngControl.control?.setValue(inputElement.value);
    }
  };
}
