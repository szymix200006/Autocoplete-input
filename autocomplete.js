export class Autocomplete {
    constructor(input, list, button, getContent, setContent) {
        this.input = input;
        this.list = list;
        this.button = button;
        this.getContent = getContent;
        this.setContent = setContent;
    }

    createTickersList = async () => {
        this.list.innerHTML = "";
        const tickersValues = await this.getContent(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.input.value}&apikey=J4PCDBZPG2HD4QG3`);
        //if(typeof tickersValues == 'array'){
            tickersValues.forEach(ticker => {
                const listElement = document.createElement('li');
                listElement.classList.add('ticker');
                listElement.innerHTML = ticker["2. name"];
                listElement.addEventListener('click', () => {
                    this.setContent(ticker);
                    this.list.innerHTML = "";
                    this.input.value = "";
                });
                this.list.append(listElement);
            });
        //}
    }
}