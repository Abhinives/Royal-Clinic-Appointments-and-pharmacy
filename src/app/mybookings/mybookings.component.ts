import { Component, OnInit } from '@angular/core';
import { MybookingsService } from './mybookings.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent implements OnInit {
  userId: string | null = null;

  tableData: {
    doctorName: String,
    gender: String,
    specializedIn: String,
    date: Date,
    startTime: String,
    endTime: String,
    generalFee: Number,
    doctorId: String,
    scheduleId: String,
    slotId: String
  }[] = [];
  dataSource: {
    doctorName: String,
    gender: String,
    specializedIn: String,
    date: Date,
    startTime: String,
    endTime: String,
    generalFee: Number,
    doctorId: String,
    scheduleId: String,
    slotId: String
  }[] = [];
  displayedColumns: string[] = ['sno', 'doctorName', 'gender', 'specializedIn', 'date', 'schedule', 'fee', 'actions'];

  ngOnInit(): void {
    this.authService.getUserId().subscribe((uid) => {
      this.userId = uid;
      this.getBookings();
    })

  }

  getBookings(): void {
    this.mybookingsService.getBookings(this.userId).subscribe((data) => {
      console.log(data);
      this.tableData = [];
      this.dataSource = [];
      data.forEach((info: any) => {
        let updatedData: any = {
          doctorName: info.doctorDetails.firstName,
          gender: info.doctorDetails.gender,
          date: new Date(info.date),
          specializedIn: info.doctorDetails.specializedIn,
          startTime: new Date(info.startTime).getUTCHours(),
          endTime: new Date(info.endTime).getUTCHours(),
          generalFee: info.doctorDetails.generalFee,
          doctorId: info.doctorId,
          scheduleId: info.scheduleId,
          isCancel: true,
          slotId: info.slotId
        };
        if (new Date(updatedData.date).getUTCDate() < new Date().getUTCDate()) {
          console.log("goin1");
          updatedData = {
            ...updatedData,
            isCancel: false
          }
        }
        console.log(updatedData);
        if (new Date(updatedData.date).getUTCDate() === new Date().getUTCDate() && new Date(updatedData.date).getUTCMonth() === new Date().getUTCMonth()) {

          if (updatedData.startTime < new Date().getHours()) {
            updatedData = {
              ...updatedData,
              isCancel: false
            }
            console.log(updatedData);
          }
          console.log("goin2");
        }

        this.tableData.push(updatedData);
      });
      this.dataSource = this.tableData;
      console.log(this.dataSource);
    });
  }
  constructor(private mybookingsService: MybookingsService, private authService: AuthService, private snackBar: MatSnackBar) {

  }

  cancelBooking(index: number): void {
    let payload: {
      doctorId: String,
      scheduleId: String,
      slotId: String
    } = {
      doctorId: this.tableData[index].doctorId,
      scheduleId: this.tableData[index].scheduleId,
      slotId: this.tableData[index].slotId
    };

    this.mybookingsService.cancelBooking(payload).subscribe((data) => {
      this.dataSource = [];
      this.getBookings();
      this.snackBar.open("Cancelled Successfully", "", {
        duration: 2000
      });

    }, (error) => {
      this.snackBar.open("Please try again later", "", {
        duration: 2000
      });
    })
  }
}
