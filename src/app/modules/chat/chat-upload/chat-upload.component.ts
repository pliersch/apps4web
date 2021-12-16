import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PhotoService} from "@app/core/services/photo.service";

@Component({
  selector: 'app-chat-upload',
  templateUrl: './chat-upload.component.html',
  styleUrls: ['./chat-upload.component.scss']
})
export class ChatUploadComponent implements OnChanges {

  @Input()
  fileList: FileList

  @Output()
  closeUploadEvent = new EventEmitter<never>();

  @Output()
  previewMountedEvent = new EventEmitter<never>();

  @Output()
  uploadEvent = new EventEmitter<string>();

  imageUrls: string[] = [];

  constructor(private photoService: PhotoService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ChatUploadComponent ngOnChanges: ')
    if (changes.fileList.firstChange) {
      return;
    }
    const files = this.fileList;

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // TODO show warning?
      const imageType = /^image\//
      if (!imageType.test(file.type)) {
        continue
      }

      const reader = new FileReader();
      reader.onload = (e: any): void => {
        this.imageUrls.push(e.target.result)
      };
      reader.onerror = (e: any): void => {
        console.log('File could not be read: ' + reader.error!.code);
      };
      if (file) {
        reader.readAsDataURL(file);
      }

      if (file) {
        // this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        // const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        //   reportProgress: true,
        //   observe: 'events'
        // })
        //   .pipe(
        //     finalize(() => this.reset())
        //   );
        //
        // this.uploadSub = upload$.subscribe(event => {
        //   if (event.type == HttpEventType.UploadProgress) {
        //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        //   }
        // })
      }
    }
  }

  closePreview(): void {
    this.closeUploadEvent.emit();
  }

  onUploadClicked(): void {
    // const payload = {files: this.files}
    // if (this.content !== '') {
    //   payload.msg = this.content
    // }
    // // this.$emit('upload', payload)
  }

  handleFiles(files: any): void {
    // this.files = files
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i]
    //   // const imageType = /^image\//
    //   // if (!imageType.test(file.type)) {
    //   //   continue
    //   // }
    //   const img = document.createElement('img')
    //   img.classList.add('obj')
    //   img.file = file
    //   this.$refs.preview.appendChild(img)
    //
    //   const reader = new FileReader()
    //   reader.onload = (function (aImg) {
    //     return function (e) {
    //       aImg.src = e.target.result
    //     }
    //   })(img)
    //   reader.readAsDataURL(file)
    // }
  }
}
