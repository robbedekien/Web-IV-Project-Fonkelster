export class Location {
  street: string
  number: number
  postalCode: number
  city: string
  constructor(street:string, number:number, postalCode:number, city:string
  ) {
    this.street = street;
    this.number = number;
    this.postalCode = postalCode;
    this.city = city;
  }

  static fromJSON(json: any): Location {
    const loc = new Location(json.street, json.number, json.postalCode, json.city);
    return loc;
  }

  public toJSON() {
    return {
      street: this.street,
      number: this.number,
      postalCode: this.postalCode, 
      city: this.city
    };
  }
}
