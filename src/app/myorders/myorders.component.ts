import { Component } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent {

  orderData: {
    orderId: number;
    date: Date,
    products: String,
    price: number,
    status: String,

  }[] = [{
    orderId: 1,
    date: new Date(),
    products: 'Parecetomol(X2)',
    price: 20,
    status: 'Out for Delivery'
  }];
  displayedColumns: string[] = ['orderId', 'date', 'products', 'price', 'status'];
  dataSource = this.orderData;
}
