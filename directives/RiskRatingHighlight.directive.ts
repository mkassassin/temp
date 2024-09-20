import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[riskRatingHighlight]',
  standalone: true,
})
export class RiskRatingHighlightDirective implements OnChanges{
	@Input('riskRatingHighlight') riskRatingValue: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['riskRatingValue']) {
		switch (this.riskRatingValue.toLowerCase()) {
			case 'low':
				this.setHighlightColor('green')
				break;
			case 'medium':
				this.setHighlightColor('orange')
				break;
			case 'high':
			this.setHighlightColor('red')
			break;
			default:
				break;
		}
    }
  }

  private setHighlightColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
  }
}
