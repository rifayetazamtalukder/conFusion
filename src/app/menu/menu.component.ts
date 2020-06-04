import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from "../shared/dish";

import { DishService } from "../services/dish.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;


  // ==================================================
  //                      Constructor
  // 
  // Automatically runs when the class is been created
  // ==================================================
  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL) { }



  // ==================================================
  //                      ngOnInit
  // 
  // Automatically runs by Angular when the component
  // is initialized.
  // ==================================================
  ngOnInit() {

    this.dishService.getDishes()
      .subscribe(
        (dishes) => this.dishes = dishes,
        errmess => this.errMess = <any>errmess
      );

  }


}
