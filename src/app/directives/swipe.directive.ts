import { AfterViewInit, Directive, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective implements AfterViewInit {

  
  xDown = null;
  
  yDown = null;

  time = 0;

  @Output() swipeLeft: EventEmitter<any>;
  @Output() swipeRight: EventEmitter<any>;
  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.swipeRight = new EventEmitter<any>();
    this.swipeLeft = new EventEmitter<any>();
  }

  ngAfterViewInit() {
    
    this.renderer.listen(this.elRef.nativeElement, 'touchstart', (event: TouchEvent) => {
      this.handleTouchStart(event);
    });

    
    this.renderer.listen(this.elRef.nativeElement, 'touchend', (event: TouchEvent) => {
      this.handleTouchMove(event);
    });
  }

  private handleTouchStart(event: TouchEvent) {
    this.xDown = event.touches[0].pageX;
    this.yDown = event.touches[0].pageY;
    this.time = event.timeStamp;
  }

  handleTouchMove(event: TouchEvent) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }
 
    const touch = event.touches[0] || event.changedTouches[0];

    const xUp = touch.pageX;
    const yUp = touch.pageY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;
    const timeDiff = event.timeStamp - this.time;

    
    if (timeDiff < 500) {
      
      if (Math.abs(xDiff) > 60) {
        if (xDiff > 0) {
          this.swipeRight.emit(event);
        } else {
          this.swipeLeft.emit(event);
        }
      }

    }
    this.xDown = null;
    this.yDown = null;
  }
}
