import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {

  ingredientsForm = this.fb.group({
    flour: [null, Validators.required],
    water: [null, Validators.required],
    yeast: [null, Validators.required],
    honey: [null, Validators.required],
    salt: [null, Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    alert('Thanks!');
  }

}
