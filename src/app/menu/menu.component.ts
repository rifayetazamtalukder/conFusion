import { Component, OnInit } from '@angular/core';

import { Dish } from "../shared/dish";

import { DishService } from "../services/dish.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish: Dish;


  // ==================================================
  //                      Constructor
  // 
  // Automatically runs when the class is been created
  // ==================================================
  constructor(private dishService: DishService) { }


  // ==================================================
  //                      ngOnInit
  // 
  // Automatically runs by Angular when the component
  // is initialized.
  // ==================================================
  ngOnInit() {

    this.dishes = this.dishService.getDishes();

  }


  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }



}
