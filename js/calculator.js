const technologiesSelect = document.querySelector('#calculator-form-technologies');

const technologiesMultiSelect = new Choices(technologiesSelect, {
    allowSearch: false,
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    duplicateItemsAllowed: false,
    delimiter: ",",
    paste: true,
    searchEnabled: false,
    searchChoices: true,
    searchResultLimit: -1,
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: true,
    noChoicesText: "No available options",
    itemSelectText: "Click to select",
    classNames: {
        containerInner: "choices__inner tech-input-container",
        input: "choices__input",
    },
});

calculateSum();

const calculatorForm = document.querySelector('.calculator-form');

calculatorForm.addEventListener('submit', function (event) {

    event.preventDefault();
    calculateSum();

});

function calculateSum() {
    //selectors

    const websiteTypeSelect = document.querySelector('#calculator-form-website-type');
    const websiteCard = document.querySelector('#calculator-form-input-cart input:checked');
    const websiteEmail = document.querySelector('#calculator-form-input-email input:checked');

    //values

    const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
    const technologiesValue = getTecnologiesSum(technologiesMultiSelect.getValue());
    const websiteCardValue = convertCartOptionToPrice(websiteCard.value);
    const websiteEmailValue = convertEmailOptionToPrice(websiteEmail.value);
    const totalSum = (websiteTypeValue + technologiesValue + websiteCardValue + websiteEmailValue);

    renderSum(totalSum);
}

function renderSum(sum) {
    const costElement = document.querySelector('.calculator-form-total-cost');

    costElement.textContent = 'Calculating...';

    setTimeout(function () { 
        costElement.textContent = sum + '$';
    }, 2000);

    
}

function convertCartOptionToPrice(option) {
    if (option === 'yes') {
        return 300;
    }
    return 0;
}

function convertEmailOptionToPrice(option) {
    if (option === 'yes') {
        return 400;
    }
    return 0;
}

function getTecnologiesSum(technologiesArr) {
    let totalSum = 0;

    technologiesArr.forEach(function (tech) {
        totalSum = totalSum + extractPriceFromValue(tech.value)
    });

    return totalSum;

}

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);

    if (price) {
        return Number(price[0].slice(1)) || 0;
    }

    return 0;
}
