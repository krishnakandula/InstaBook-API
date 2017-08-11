function formatInputText(inputStr) {
    let formattedInput = inputStr.trim().replace(new RegExp("[^\w\d]", ""));
    console.log(formattedInput);

    return formattedInput;
}

module.exports = {
    formatInputText
}