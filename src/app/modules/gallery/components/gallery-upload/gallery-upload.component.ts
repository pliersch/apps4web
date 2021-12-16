import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {PhotoService} from '@app/core/services/photo.service';
import {AlertService} from '@app/services/alert.service';
import {FormBuilder, Validators} from '@angular/forms';

const PLACEHOLDER_URL = 'assets/svg/image-placeholder.svg';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})

export class GalleryUploadComponent {

  @ViewChild('fileInput') input!: ElementRef;

  imgUrl = PLACEHOLDER_URL;
  imgFile: File | undefined;

  addressForm = this.fb.group({
    category: [null, Validators.required],
    tagList: [null, Validators.required]
  });

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private photoService: PhotoService,
              private alertService: AlertService) {
  }

  openFile(): void {
    this.renderer.selectRootElement(this.input.nativeElement).click();
  }

  // TODO alles mal mit debug durchschauen
  onChange(event: Event): void {
    let inputElement = event.target as HTMLInputElement;

    const reader = new FileReader();
    reader.onload = (e: any): void => {
      this.imgUrl = e.target.result;
    };
    reader.onerror = (e: any): void => {
      console.log('File could not be read: ' + reader.error!.code);
    };
    if (inputElement.files) {
      this.imgFile = inputElement.files[0];
      reader.readAsDataURL(this.imgFile);
    }
  }

  uploadImage(): void {
    if (this.imgFile) {
      const tagsAsString: string = this.addressForm.get('tagList')!.value;
      this.photoService.create(this.imgFile, this.createTagArray()).subscribe({
        next: (photo) => {
          console.log('photo upload success', photo);
          this.alertService.success('Upload ok');
          // this.photoService.create(this.createPhotoDto(photo));
        },
        error: (error) => {
          console.log('photo upload failed', error);
          this.alertService.error('Upload fehlgeschlagen');
        }
      });
    }
  }

  createTagArray(): string[] {
    const txt: string = this.addressForm.get('tagList')!.value;
    const entries: string[] = txt.split(',');
    const result: string[] = [];
    entries.forEach(entry => {
      result.push(entry.trim());
    });
    return result;
  }
}
