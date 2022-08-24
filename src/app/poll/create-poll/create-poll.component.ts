import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Poll } from '../../model/poll/poll.model';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  form = this.fb.group({
      title: ['', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur'
      }],
      options: this.fb.array([], {
        validators: [ this.minLengthArray(2)],
        updateOn: 'submit'
      }),
      multiVote: [false],
      allowNewOption: [false]
    }
  );

  isSubmitted = false;

  constructor(private readonly fb: FormBuilder,
              private readonly service: PollService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.addOption();
    this.addOption();
  }

  addOption(): void {
    const option = this.fb.group({
        option: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }]
    });
    this.options.push(option);
  }

  onDismissOption(index: number): void {
    if (this.options.length > 2) {
      this.options.removeAt(index);
    }
  }

  onClickCreate(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createPoll(this.form.value)
        .subscribe(result => {
          if (result.ok) {
            const poll = result.rtnObj as Poll;
            this.router.navigate([`/poll/${poll.id}`]);
          }
      });
    }
  }

  get title(): FormControl {
    return this.form.controls['title'] as FormControl;
  }

  get options(): FormArray {
    return this.form.controls['options'] as FormArray;
  }

  minLengthArray(min: number): ValidatorFn {
    return (c: AbstractControl):  ValidationErrors | null  => {
      if (c.value.length >= min) {
        // tslint:disable-next-line:no-null-keyword
        return null;
      }

      return { minLengthArray: true};
    };
  }
}
