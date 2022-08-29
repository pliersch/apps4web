import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {

  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  defaultQuantity = this.quantities[3];

  ingredientsForm = this.builder.group({
    hydration: [{
      value: 70,
      disabled: false,
    }, Validators.required],
    flour: [null, Validators.required],
    water: [null, Validators.required],
    yeast: [null, Validators.required],
    honey: [{
      value: 'Foo',
      disabled: false,
    }, Validators.required],
    salt: [null, Validators.required]
  });

  constructor(private builder: FormBuilder) {
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  onInputChange($event: Event) {
    console.log('IngredientsComponent onInputChange: ', $event)
  }
}
