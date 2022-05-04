import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {PhotoService} from '@app/core/services/photo.service';
import {AlertService} from '@app/services/alert.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TagService} from "@gallery/store/tags/tag.service";
import {Select} from "@ngxs/store";
import {TagState} from "@gallery/store/tags/tag-state";
import {Observable} from "rxjs";
import {Tag} from "@gallery/store/tags/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";

const PLACEHOLDER_URL = 'assets/svg/image-placeholder.svg';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})

export class GalleryUploadComponent {

  @ViewChild('fileInput')
  input!: ElementRef;

  @Select(TagState.getTags)
  tags$: Observable<Tag[]>;

  imgUrl = PLACEHOLDER_URL;
  imgFile: File | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  addressForm = this.fb.group({
    category: [null, Validators.required],
    tagList: [null, Validators.required]
  });

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private photoService: PhotoService,
              private tagService: TagService,
              private alertService: AlertService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  openFile(): void {
    // TODO look in chat upload. there is a better solution
    this.renderer.selectRootElement(this.input.nativeElement).click();
  }

  onChange(event: Event): void {
    let inputElement = event.target as HTMLInputElement;

    const reader = new FileReader();
    reader.onload = (e: any): void => {
      this.imgUrl = e.target.result;
    };
    reader.onerror = (e: any): void => {
      console.log('File could not be read: ' + reader.error?.code);
    };
    if (inputElement.files) {
      this.imgFile = inputElement.files[0];
      reader.readAsDataURL(this.imgFile);
    }
  }

  uploadImage(): void {
    if (this.imgFile) {
      // const tagsAsString: string = this.addressForm.get('tagList')!.value;
      this.photoService.create(this.imgFile, this.createTagArray()).subscribe({
        next: (photo) => {
          this.alertService.success('Upload ok');
        },
        error: (error) => {
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
