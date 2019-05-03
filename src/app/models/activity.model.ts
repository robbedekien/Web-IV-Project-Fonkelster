import { Category } from './category.model';

export class Activity{
    id : number
    name : string
    category : Category
    description : string
    start : Date
    end : Date
    images : string[]
    frontImage : string
    constructor(id: number, name:string, category:Category, description:string, start:Date, end:Date, frontImage:string, images:string[]){
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.start = start;
        this.end = end;
        this.frontImage = frontImage;
        this.images = images;
    }

    static fromJSON(json: any): Activity {
        var ac = new Activity(json.activityId, json.name, json.category, json.description, new Date(json.start), new Date(json.end), json.frontImage.url, json.images.map(i => i.url));
        return ac;
    }
}
