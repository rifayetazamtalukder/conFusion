import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common"; // Enables to track the location of page in the history of browser
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;


  constructor(private dishService: DishService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];

    this.dishService.getDish(id)
      .subscribe((dish) => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }



}
