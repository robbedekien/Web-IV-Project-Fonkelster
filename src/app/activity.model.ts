export class Activity{
    constructor(
        private _name : string,
        private _description : string,
        private _start : Date,
        private _end : Date,
        private _sort : number = 0
    ){}

    //#region getters
    get name(): string
    {
        return this._name;
    }
    get description(): string
    {
        return this._description;
    }
    get start(): Date
    {
        return this._start;
    }
    get end(): Date
    {
        return this._end;
    }
    get sort(): number
    {
        return this._sort;
    }
    //#endregion

    static fromJSON(json: any): Activity {
        var ac = new Activity(json.name, json.description, new Date(json.start), new Date(json.end));
        return ac;
    }
}
