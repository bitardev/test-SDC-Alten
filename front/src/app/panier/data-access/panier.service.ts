import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PanierService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts() {
    return this.productsSubject.asObservable();
  }

  ajouterAuPanier(product: Product): void {
    this.products.push(product);
    this.productsSubject.next(this.products);
    console.log("Product ajouté au panier:", product);
  }
  obtenirProduits(): Product[] {
    return this.products;
  }

  supprimerProduit(id: number) {
    this.products = this.products.filter((produit) => produit.id !== id);
    this.productsSubject.next(this.products);
  }
  incrementQtyAuPanier(id: number) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        product.quantity += 1;
      }
      return product; // Return the original product if no match
    });
    this.productsSubject.next(this.products);
  }
  decrementQtyAuPanier(id: number) {
    this.products = this.products
      .map((product) => {
        if (product.id === id) {
          product.quantity -= 1;
        }
        return product; // Return the original product if no match
      })
      .filter((product) => product.quantity > 0);
    this.productsSubject.next(this.products);
  }
}
