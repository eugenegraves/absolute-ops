import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { renderTourFooter } from '../../../backend/utils/renderTourFooter';
import type { RouteKey } from '../../../shared/types';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'ao-tour-footer',
	standalone: true,
	template: `<div [innerHTML]="html"></div>`
})
export class TourFooterComponent {
	@Input() routeKey: RouteKey = 'admin';
	private sanitizer = inject(DomSanitizer);

	get html(): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(
			renderTourFooter(this.routeKey)
		);
	}
}
