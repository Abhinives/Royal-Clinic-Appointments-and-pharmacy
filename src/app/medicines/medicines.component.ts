import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MedicinesDialogComponent } from '../medicines-dialog/medicines-dialog.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {
  badgeColor: string = 'red';
  medicines: { name: String; description: String; cost: Number }[] = [{
    name: 'Paracetomol',
    cost: 10,
    description: 'Paracetamol tablets are a commonly used medication for pain relief and reducing fever. They work by blocking the production of certain chemical messengers in the brain that cause pain and fever.'
  },
  {
    name: 'Paracetomol',
    cost: 10,
    description: 'Paracetamol tablets are a commonly used medication for pain relief and reducing fever. They work by blocking the production of certain chemical messengers in the brain that cause pain and fever.'
  },
  {
    name: 'Paracetomol',
    cost: 10,
    description: 'Paracetamol tablets are a commonly used medication for pain relief and reducing fever. They work by blocking the production of certain chemical messengers in the brain that cause pain and fever.'
  },
  {
    name: 'Paracetomol',
    cost: 10,
    description: 'Paracetamol tablets are a commonly used medication for pain relief and reducing fever. They work by blocking the production of certain chemical messengers in the brain that cause pain and fever.'
  },
  {
    name: 'Paracetomol',
    cost: 10,
    description: 'Paracetamol tablets are a commonly used medication for pain relief and reducing fever. They work by blocking the production of certain chemical messengers in the brain that cause pain and fever.'
  }];

  cartItems: { name: String; price: number; qty: number }[] = [];
  constructor(private _dialog: MatDialog) {

  }
  openProduct(index: number): void {
    const dialogRef = this._dialog.open(MedicinesDialogComponent, {
      data: this.medicines[index],
      width: '600px',
      minHeight: '300px'
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.cartItems.push(data);
        console.log(this.cartItems);
      }
    })
  }


  openCart(): void {
    const cartDialog = this._dialog.open(CartComponent, {
      data: this.cartItems,
      width: '800px',
      minHeight: '140px',

    });
    cartDialog.componentInstance.buttonClicked.subscribe((data) => {
      this.cartItems = data;
    })
  }
  ngOnInit(): void {

  }

}
