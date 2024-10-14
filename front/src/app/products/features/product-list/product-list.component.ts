import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";

import { TagModule } from "primeng/tag";
import { CommonModule } from "@angular/common";
import { PanierService } from "app/panier/data-access/panier.service";
import { FormsModule } from "@angular/forms";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    TagModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private panierService = inject(PanierService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  public totalRecords: number = 0; // Total des produits
  public pageSize: number = 10; // Nombre de produits par page
  public currentPage: number = 0; // Page actuelle
  searchQuery: string = "";

  public filteredProducts: Product[] = [];

  ngOnInit() {
    this.productsService.get().subscribe((products) => {
      this.filteredProducts = products; // Initialize with all products
    });
  }

  filterProducts() {
    if (!this.searchQuery) {
      this.productsService.get().subscribe((products) => {
        this.filteredProducts = products; // Initialize with all products
      });
      return;
    }

    this.productsService.get().subscribe((products) => {
      this.filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      ); // Initialize with all products
    });
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return "secondary";
    }
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public ajouterAuPanier(product: Product): void {
    product.quantity = 1;
    this.panierService.ajouterAuPanier(product);
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
