import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Cart, Carts } from '../types/common-type';
import { CartPageService } from './cart-page.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  userId: string | null = '';
  isSelected: boolean = false;
  cartForm: FormGroup = this.fb.group({
    quantities: this.fb.array([]),
    selectedIndex: this.fb.array([])  // Initialize with an empty array
  });;
  quantity: FormControl = new FormControl(0);
  totalCost: number = 0;
  carts: Carts = {
    cartId: '',
    carts: []
  };
  constructor(private router: Router, private _authService: AuthService, private cartPageService: CartPageService, private fb: FormBuilder) {

  }
  ngOnInit(): void {

    this._authService.getUserId().subscribe((data) => {
      this.userId = data;
      this.getCarts();
    });
    this.cartForm.valueChanges.subscribe((data) => {
      console.log(data);
    })
    this.selectedIndices.valueChanges.subscribe((data) => {
      let cnt = 0;
      this.totalCost = 0;
      data.forEach((d: any, index: number) => {
        console.log(d);
        if (d) {

          this.totalCost += this.carts.carts[index].actualCost * this.carts.carts[index].qty;
          this.isSelected = true;
          cnt++;
        }
        if (cnt === 0) {
          this.isSelected = false;
        }
      })
    })

  }


  getCarts(): void {
    this.cartPageService.getCarts(this.userId).subscribe((data) => {
      this.carts = data;

      this.carts.carts.forEach(cart => {
        this.addQuantityControl(cart.qty);
        this.selectedIndices.push(new FormControl(null));  // Initialize with default quantity 1
      });


      console.log(this.cartForm.value);
    })
  }
  addQuantityControl(quantity: number): void {
    const control = this.fb.control(quantity, [Validators.required, Validators.min(1)]);
    control.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      const index = this.quantities.controls.indexOf(control);

      const payload: { medicineId: String, qty: number } = {
        medicineId: this.carts.carts[index].medicineId,
        qty: value ?? 0
      };
      this.cartPageService.updateCart(this.userId, payload).subscribe((data) => {
        console.log("updated");
        this.getCarts();
      })
      // Add your custom logic here, e.g., update total cost
    });
    this.quantities.push(control);
  }

  deleteProduct(index: number): void {
    const medicineId = this.carts.carts[index].medicineId;
    this.cartPageService.deleteProductFromCart(this.userId, medicineId).subscribe((data) => {
      console.log("Deleted successfully");
      this.getCarts();
    })
  }

  goToCheckOutPage(): void {
    const indices = this.selectedIndices.value;
    let finalCarts: Cart[] = [];
    indices.forEach((ind: any, index: number) => {
      if (ind) {

        finalCarts.push(this.carts.carts[index]);
      }
    });
    console.log(finalCarts);
    const serializedData = JSON.stringify(finalCarts);
    console.log(serializedData);
    this.router.navigate(['/services/medicines/checkout'], { queryParams: { data: serializedData } });
  }

  get quantities(): FormArray {
    return this.cartForm.get('quantities') as FormArray;
  }


  get selectedIndices(): FormArray {
    return this.cartForm.get('selectedIndex') as FormArray;
  }

}
