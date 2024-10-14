export class Product {
    id!: number;
    code!: string;
    name!: string;
    description!: string;
    image!: string;
    category!: string;
    price!: number;
    quantity!: number;
    internalReference!: string;
    shellId!: number;
    inventoryStatus!: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
    rating!: number;
    createdAt!: number;
    updatedAt!: number;
  
    constructor(data: Partial<Product>) {
      Object.assign(this, data);
    }
  }
  