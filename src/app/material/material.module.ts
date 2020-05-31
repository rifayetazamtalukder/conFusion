import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";

import { MatListModule } from "@angular/material/list";

import { MatGridListModule } from "@angular/material/grid-list";

import { MatCardModule } from "@angular/material/card";

import { MatButtonModule } from "@angular/material/button";

import { MatDialogModule } from "@angular/material/dialog";

import { MatFormFieldModule } from "@angular/material/form-field";

import { MatInputModule } from "@angular/material/input";

import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatSelectModule } from "@angular/material/select";

import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { MatSliderModule } from "@angular/material/slider";



const MATERIAL_MODUELS = [
  MatToolbarModule,

  MatListModule,

  MatGridListModule,

  MatCardModule,

  MatButtonModule,

  MatDialogModule,

  MatFormFieldModule,

  MatInputModule,

  MatCheckboxModule,

  MatSelectModule,

  MatSlideToggleModule,

  MatProgressSpinnerModule,

  MatSliderModule

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_MODUELS
  ],
  exports: [
    MATERIAL_MODUELS
  ]
})
export class MaterialModule { }
