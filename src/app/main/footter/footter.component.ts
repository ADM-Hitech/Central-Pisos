import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import {  } from '@fortawesome/free-solid-svg-icons';
import { CategoryModel } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-footter',
  templateUrl: './footter.component.html',
  styleUrls: ['./footter.component.scss']
})
export class FootterComponent implements OnInit {

  public categories: Array<CategoryModel> = [];

  constructor(private cartShop: CartShopService) {}

  ngOnInit() {
    this.categories = this.cartShop.categories;
    this.cartShop.categoriesSub.subscribe((categories) => {
      this.categories = categories;
    });
  }

}
