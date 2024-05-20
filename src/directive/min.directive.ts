import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMin]'
})
export class MinDirective {
  @Input() min = 0
  constructor(private ref:ElementRef) { }

  ngOnInit() {
    this.ref.nativeElement.min = this.min
  }

  @HostListener('blur', ['$event'])
  
  public onInput(a_Event: InputEvent): void {
    let val = parseInt(this.ref.nativeElement.value);
    if (val && this.min !== null && this.min !== undefined && val <= this.min){
      this.ref.nativeElement.value = this.min.toString();
    }

      

  }
}
