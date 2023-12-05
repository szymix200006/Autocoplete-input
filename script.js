import { Autocomplete } from "/autocomplete.js";
import { Content } from "/content.js";

const autocompleteInput = document.querySelector('.search-input');
const autocompleteList = document.querySelector('.tickers');
const autocompleteButton = document.querySelector('.search-button');
const resultHeader = document.querySelector('.result-title');
const resultPara = document.querySelector('.result-para');
const errorContainer = document.querySelector('.error-container');
const errorMessage = document.querySelector('.message-box');
const errorButton = document.querySelector('.close-popup');

const myContent = new Content(resultHeader, resultPara);
const myAutocomplete = new Autocomplete(autocompleteInput, autocompleteList, autocompleteButton, getAutocompleteData, myContent.setContent);

async function getAutocompleteData(url){
    const rawData = await fetch(url);
    const parsedInfo = await rawData.json();
    try {
        if (parsedInfo.bestMatches) {
            return parsedInfo.bestMatches;
        } else {
            console.log(parsedInfo)
        }
    } catch (error) {
        errorPopup(error);
    }
}

function errorPopup(message) {
    errorContainer.style.display = "flex";
    errorMessage.innerHTML = message;
    errorButton.addEventListener("click", () => {
        errorContainer.style.display = "none";
        myAutocomplete.input.value = "";
    });
}

myAutocomplete.input.addEventListener("input", () => {
    myAutocomplete.createTickersList();//createTickersList();
});

myAutocomplete.button.addEventListener("click", async () => {
    const content = await getAutocompleteData(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${myAutocomplete.input.value}&apikey=J4PCDBZPG2HD4QG3`);
    console.log(content)
    if(typeof content == "array"){
        myContent.setContent(content[0]);
    } else {
        errorPopup("Not Found!");
    }
});



/*const findMatchingItems = (contentArray) => {
    const data = autocompleteInput.value;
    if(data) {
        const matchingItems = contentArray.filter(item => item.includes(data));
        return matchingItems;
    }
}*/

/*const getContentArray = async (phrase) => {
    const dataArray = await getAutocompleteData(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${autocompleteInput.value}&apikey=J4PCDBZPG2HD4QG3`);
    let contentArray = [];
    return dataArray;
}*/

/*const createTickersList = async () => {
    autocompleteList.innerHTML = "";
    const tickersValues = await getAutocompleteData(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${autocompleteInput.value}&apikey=J4PCDBZPG2HD4QG3`);
    if(typeof tickersValues == 'array'){
        tickersValues.forEach(ticker => {
            const listElement = document.createElement('li');
            listElement.classList.add('ticker');
            listElement.innerHTML = ticker["2. name"];
            listElement.addEventListener('click', () => {
                setContent(ticker);
            });
            autocompleteList.append(listElement);
        });
    }
}*/

/*const setContent = (data) => {
    resultHeader.innerHTML = data["2. name"];
    resultPara.innerHTML = `Symbol: ${data["1. symbol"]}
    <br>Type: ${data["3. type"]}
    <br>Region: ${data["4. region"]}
    <br>Market Open: ${data["5. marketOpen"]}
    <br>Market Close: ${data["6. marketClose"]}
    <br>Timezone: ${data["7. timezone"]}
    <br>Currency: ${data["8. currency"]}`;
    autocompleteList.innerHTML = "";
    autocompleteInput.value = "";
}*/

