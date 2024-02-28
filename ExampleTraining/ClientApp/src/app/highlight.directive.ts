import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[required]'
})
export class HighlightDirective implements OnInit{

  constructor(private el: ElementRef) {
   
 }

 ngOnInit(): void { 
  this.el.nativeElement.innerHTML += "<span style='color: red;'>*</span>";
 }
 
}
