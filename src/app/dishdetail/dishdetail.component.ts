import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common"; // Enables to track the location of page in the history of browser
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";

import { switchMap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from "../shared/comment";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  //#region Variables

  dish: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment;
  dishCopy: Dish;
  visibility = 'shown';

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
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL) {

    this.createForm();
  }

  ngOnInit() {

    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.activatedRoute.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(params['id']);
      }))
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      },
        errmess => this.errMess = <any>errmess);
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
    this.dishCopy.comments.push(this.comment);

    this.dishService.putDish(this.dishCopy)
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
      },
        errmess => {
          this.dish = null;
          this.dishCopy = null;
          this.errMess = <any>errmess;
        });

    this.commentFormDirective.resetForm({
      rating: 5,
      comment: '',
      author: '',
      date: new Date().toISOString()
    });

  }


}
