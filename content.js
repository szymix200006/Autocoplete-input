export class Content {
    constructor(header, para, errorHandler) {
        this.header = header;
        this.para = para;
        this.errorHandler = errorHandler;
    }

    setContent = (data) => {
        if(data){
            this.header.innerHTML = data["2. name"];
            this.para.innerHTML = `Symbol: ${data["1. symbol"]}
            <br>Type: ${data["3. type"]}
            <br>Region: ${data["4. region"]}
            <br>Market Open: ${data["5. marketOpen"]}
            <br>Market Close: ${data["6. marketClose"]}
            <br>Timezone: ${data["7. timezone"]}
            <br>Currency: ${data["8. currency"]}`;
        } 
    }
}