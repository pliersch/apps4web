import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDropDirective]',
  standalone: true
})
export class DragDropDirective {

  @HostBinding('class.fileover')
  fileOver: boolean;

  @Output()
  fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event'])
  onDragOver(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt: DragEvent): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files: FileList = evt.dataTransfer?.files || new FileList();
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
