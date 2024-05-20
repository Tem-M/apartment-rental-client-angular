import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMax]'
})
export class MaxDirective {

  @Input() max = 0
  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this.ref.nativeElement.max = this.max
  }

  @HostListener('blur', ['$event'])
  public onInput(a_Event: InputEvent): void {
    let val = parseInt(this.ref.nativeElement.value);
    if (val && this.max !== null && this.max !== undefined && val >= this.max)
      this.ref.nativeElement.value = this.max.toString();

  }
}
