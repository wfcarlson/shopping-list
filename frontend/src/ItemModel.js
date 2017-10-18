export default class ItemModel {
    
    constructor(data){
        this.id = -1;
        this.done = false;
        this.text = "";

        if (data){
            this.id = data.id;
            this.done = data.done;
            this.text = data.text;
        }
    }
}