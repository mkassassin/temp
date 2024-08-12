import {
	Directive,
	EventEmitter,
	Output,
	HostListener,
	HostBinding,
 } from '@angular/core';

@Directive({
  selector: '[alphaDragDropFileUpload]',
  standalone: true
})
export class DragDropFileUploadDirective {

	@Output() fileDropped = new EventEmitter<any>();

	@HostBinding('style.background-color') private background = '#ffffff';

	@HostListener('dragover', ['$event']) dragOver(event: any) {
		event.preventDefault();
		event.stopPropagation();
		this.background = '#e2eefd';
	}

	@HostListener('dragleave', ['$event']) public dragLeave(event: any) {
		event.preventDefault();
		event.stopPropagation();
		this.background = '#ffffff';
	}

	@HostListener('drop', ['$event']) public drop(event: any) {
		event.preventDefault();
		event.stopPropagation();
		this.background = '#ffffff';
		const files = event.dataTransfer.files;
		if (files.length > 0) {
			this.fileDropped.emit(files);
		}
	}

}
