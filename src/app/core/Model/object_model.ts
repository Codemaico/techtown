export class User {
  name!: string;
  password!: string;
  upLoadPhoto!: string;
  role!: string;
  mobNumber!: string;
  address!: Address;
  gender!: string;
  languages!: string;
  email!: string;
  dob!: string;
  agreeTC!: boolean;
  age!: number;
  aboutYou!: string;
}

export class Address {
  id!: any;
<<<<<<< HEAD
  name!: any;
=======
  
>>>>>>> 9e03fb8cdd860c19dc473781f22de11a2f7fe6f1
  addLine1!: string;
  addLine2!: string;
  city!: string;
  state!: string;
  zipCode!: number;
}

export class Product {
  id!: any;
  name!: string;
  uploadPhoto!: string;
  productDescription!: string;
  mrp!: number;
  dp!: number;
  status!: string;
}

export class Order {
  id!: any;
  userId!: number;
  sellerId!: number;
  product!: Product;
  deliveryAddress!: Address;
  contact!: number;
  dateTime!: string;
}
