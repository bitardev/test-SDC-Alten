// panier.component.ts
import { Component, inject, OnInit } from "@angular/core";
import { PanierService } from "app/panier/data-access/panier.service";
import { Product } from "app/panier/data-access/product.model";

import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { TagModule } from "primeng/tag";
import { CommonModule } from "@angular/common";

import { BadgeModule } from "primeng/badge";

import { TableModule } from "primeng/table";
import { OverlayPanelModule } from "primeng/overlaypanel";

@Component({
  selector: "app-panier",
  templateUrl: "./panier.component.html",
  styleUrls: ["./panier.component.scss"],
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DataViewModule,
    DialogModule,
    TagModule,
    CommonModule,
    OverlayPanelModule,
    TableModule,
    BadgeModule,
  ],
})
export class PanierComponent implements OnInit {
  products: Product[] = [];
  private panierService = inject(PanierService);

  ngOnInit() {
    this.panierService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  supprimerProduit(id: number) {
    this.panierService.supprimerProduit(id);
  }
  public incrementQty(id: number): void {
    this.panierService.incrementQtyAuPanier(id);
  }
  public decrementQty(id: number): void {
    this.panierService.decrementQtyAuPanier(id);
  }
}
