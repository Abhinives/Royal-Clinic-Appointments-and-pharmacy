import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, phoneValidator } from './booking.validators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingFormGroup: FormGroup;
  specialist: String[] = ['Cardiologist', 'Neuro'];
  doctors: String[] = ['Ram', 'Kumar'];
  myFilter = (d: Date | null): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return !d || d >= yesterday;

  };
  slots: { time: String; isAvailable: boolean }[] = [
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: false,
    },
    {
      time: '9:00AM - 10:00AM',
      isAvailable: true,
    },
  ];



  constructor(private _dialog: MatDialog, private _formBuilder: FormBuilder) {
    this.bookingFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      age: [0, Validators.required],
      email: ['', [Validators.required, emailValidator]],
      specialist: ['', Validators.required],
      doctorName: ['', Validators.required],
      phone: ['', [Validators.required, phoneValidator]],
      date: ['', Validators.required],

    })

  }
  ngOnInit(): void {
    this.bookingFormGroup.valueChanges.subscribe((data) => {


    })
  }

  openDialog(): void {
    this._dialog.open(DialogComponent, {
      width: '400px'
    });
  }
}
