import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ContactFormComponent } from "app/contact/ui/contact-form/contact-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-contact",
  //   templateUrl: "./contact.component.html",
  template: `
    <p-card header="Contact" class="block m-2 text-center">
      <app-contact-form></app-contact-form>
    </p-card>
  `,
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, ContactFormComponent],
})
export class ContactComponent {}
