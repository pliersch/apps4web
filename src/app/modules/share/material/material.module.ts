import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@angular/cdk/layout";

import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule {
}
