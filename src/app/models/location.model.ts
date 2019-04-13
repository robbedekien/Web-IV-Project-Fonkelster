export class Location {
  constructor(
    private _street: string,
    private _nr: number,
    private _postalCode: number,
    private _city: string
  ) {}

  get street(): string {
    return this._street;
  }

  get nr(): number {
    return this._nr;
  }

  get postalCode(): number {
    return this._postalCode;
  }

  get city(): string {
    return this._city;
  }

  static fromJSON(json: any): Location {
    const loc = new Location(json.street, json.number, json.postalCode, json.city);
    return loc;
  }

  public toJSON() {
    return {
      street: this.street,
      number: this.nr,
      postalCode: this.postalCode, 
      city: this.city
    };
  }
}
