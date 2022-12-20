import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { PizzaComponent } from './ingredients/pizza.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";

@NgModule({
  declarations: [
    PizzaComponent
  ],
  exports: [
    PizzaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MaterialModule,
    ShareModule
  ]
})
export class RecipesModule {}
