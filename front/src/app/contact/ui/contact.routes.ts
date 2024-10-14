import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ContactComponent } from "../features/contact/contact.component";

export const PRODUCTS_ROUTES: Routes = [
  {
    path: "contact",
    component: ContactComponent,
  },
];
