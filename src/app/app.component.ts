import { Component } from '@angular/core';
import { CategoryModel } from './core/models/category.model';
import { AppNavigationModel } from './core/models/navigation.model';
import { CartShopService } from './core/services/cart-shop.service';
import { IndexDBService } from './core/services/index-db.service';
import { NavigationService } from './core/services/navigation.service';
import { ProductService } from './main/content/products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private navigationService: NavigationService,
    private cartShop: CartShopService,
    private productService: ProductService
  ) {
    //this.navigationService.setNavigationModel(new AppNavigationModel([]));

    this.productService.getCategories().subscribe((response) => {
      response.forEach((category) => {
        const catParse = CategoryModel.fromJson(category);

        this.cartShop.addCategory(catParse);
      });

      this.cartShop.categoriesSub.next(response.map((category) => CategoryModel.fromJson(category)));

      this.navigationService.setNavigationModel(new AppNavigationModel(response.map((category) => CategoryModel.fromJson(category))));
    });
  }
}
