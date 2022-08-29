import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "@app/shared/material/material.module";
import { ShareModule } from "@modules/share/share.module";


@NgModule({
  declarations: [
    IngredientsComponent
  ],
  exports: [
    IngredientsComponent
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
