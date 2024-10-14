import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { Message } from "primeng/api";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Product } from "app/products/data-access/product.model";
import { SelectItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { MessagesModule } from "primeng/messages";

@Component({
  selector: "app-contact-form",
  template: `
    <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
      <div class="form-field text-left">
        <label for="email">Email</label>
        <input
          pInputText
          type="email"
          id="email"
          name="email"
          ngModel
          required
        />
      </div>
      <div class="form-field text-left">
        <label for="message">Message</label>
        <textarea
          pInputTextarea
          id="message"
          name="message"
          rows="5"
          cols="30"
          maxlength="300"
          ngModel
          required
        ></textarea>
      </div>
      <div class="flex justify-content-between align-items-center">
        <div *ngIf="successMessage" class="card">
          <p-messages [(value)]="successMessage" [enableService]="false" />
        </div>
        <span></span>

        <p-button
          type="submit"
          [disabled]="contactForm.invalid"
          label="Envoyer"
          severity="primary"
        />
      </div>
    </form>
  `,
  styleUrls: ["./contact-form.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CommonModule,
    InputTextareaModule,
    DropdownModule,
    MessagesModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ContactFormComponent {
  successMessage: Message[] | undefined;
  email: string | null = "";
  message: string | null = "";

  onSubmit() {
    this.email = "";
    this.message = "";
    this.successMessage = [
      { severity: "info", detail: "Demande de contact envoyée avec succès" },
    ];
  }
}
