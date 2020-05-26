import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";

import { MatListModule } from "@angular/material/list";

import { MatGridListModule } from "@angular/material/grid-list";

import { MatCardModule } from "@angular/material/card";

import { MatButtonModule } from "@angular/material/button";



const MATERIAL_MODUELS = [
  MatToolbarModule,

  MatListModule,

  MatGridListModule,

  MatCardModule,

  MatButtonModule
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
