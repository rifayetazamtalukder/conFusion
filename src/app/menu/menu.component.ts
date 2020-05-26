import { Component, OnInit } from '@angular/core';

import { Dish } from "../shared/dish";

import { DISHES } from "../shared/dishes";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] = DISHES;

  selectedDish: Dish;


  // ==================================================
  //                      Constructor
  // 
  // Automatically runs when the class is been created
  // ==================================================
  constructor() { }


  // ==================================================
  //                      ngOnInit
  // 
  // Automatically runs by Angular when the component
  // is initialized.
  // ==================================================
  ngOnInit() {
  }


  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }



}
