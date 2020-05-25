import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";

import { MatListModule } from "@angular/material/list";



const MATERIAL_MODUELS = [
  MatToolbarModule,

  MatListModule
]

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
