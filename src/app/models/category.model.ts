export class Category
{
    name : string;
    image : string;
    
    constructor(name:string, image:string)
    {
        this.name = name;
        this.image = image;
    }

    static fromJson(json:any) : Category
    {
        return new Category(json.name, json.image);
    }
}