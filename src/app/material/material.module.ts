import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";


const MATERIAL_MODUELS = [
  MatToolbarModule
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
