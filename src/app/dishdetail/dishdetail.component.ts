import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common"; // Enables to track the location of page in the history of browser
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";

import { switchMap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from "../shared/comment";



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //#region Variables

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment;

  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'rating': '',
    'comment': '',
    'author': '',
  }

  validationMessages = {
    'rating': {
      'required': 'Rating is required.'
    },
    'comment': {
      'required': 'Comment is required.'
    },
    'author': {
      'required': 'Author name is required.',
      'minlength': 'Author name must be at least 2 characters long.'
    },

  }

  //#endregion Variables


  constructor(private dishService: DishService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {

    this.createForm();
  }

  ngOnInit() {

    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.activatedRoute.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {

    const index = this.dishIds.indexOf(dishId);

    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];

    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }


  goBack(): void {
    this.location.back();
  }


  createForm() {
    this.commentForm = this.fb.group({
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: [new Date().toISOString()]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any) {

    if (!this.commentForm) { return }

    const form = this.commentForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear the previous error message (if any)
        this.formErrors[field] = '';

        const control = form.get(field);

        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }



  onSubmit() {
    this.comment = this.commentForm.value;

    // TODO: Add the form value to the 
    // comment object using dish.service.ts

    // console.log(this.dish.id)
    this.dish.comments.push(this.comment);

    // this.commentForm.reset({
    //   rating: 5,
    //   comment: '',
    //   author: '',
    //   date: ''
    // }); 
    // 
    // Uporer reset form er dorkar nai
    // Nicher feedbackFormDirective.resetForm e jei parameter set
    // kora hobe finnaly tai form er value thakbe
    // 
    // 
    this.commentFormDirective.resetForm({
      rating: 5,
      comment: '',
      author: '',
      date: new Date().toISOString()
    });

  }


}
