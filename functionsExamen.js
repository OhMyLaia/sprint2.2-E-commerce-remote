const instance1Arr = [];
const instance2Arr = [];

const notFoundMessage = element => `Error, "${element}" not found.`;
const successMessage = procedure => `${procedure} successfully!`;
const missingDataMessage = missingData => `Please, fill all the gaps, for example, "${missingData}" is incorrect or missing`;
const normalizeString = stringInput => stringInput.toUpperCase().trim();

const toFindMillionaire = name => instance1Arr.find(millionaire => millionaire.name.toUpperCase().trim() === name);
const toFindFunction = element => instance2Arr.find(element => element.property.toUpperCase().trim() == cleanInput);

const toFindIndexOfMillionaire = name => instance1Arr.findIndex(millionaire => millionaire.name.toUpperCase().trim() === name);
const toFindIndexOfCar = model => instance2Arr.findIndex(car => car.model.toUpperCase().trim() === model);

const resultDiv = document.getElementById("resultDiv");
function cleanDiv() { return resultDiv.innerHTML = ""; }
function showMessage(message) { resultDiv.innerHTML = message; }
//showMessage(successMessage("Car created"));

function calculateAverage(array) {
    if (array.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}

// devuelve el num mas alto de algo
function findHighestElement(array) {
    if (array.length === 0) return null; //
    let highestOne = array[0]; // 
    for (let i = 1; i < array.length; i++) {
        if (array[i].property > highestOne.property) {
            highestOne = array[i]; 
        }
    }
    return highestOne;
}


// devuelve el objeto o mensaje error
function validateAndFind() {
    if (array.length <= 0) return resultDiv.innerHTML = err;

    let input = document.getElementById("nameMillionaire");
    // normalize input
    let valInput = normalizeString(input);

    let instanceFound = array.find(instance => instance.name == valInput);

    if (!instanceFound) return resultDiv.innerHTML = err;
    if (instanceFound) return instanceFound;

}















// --- CRUD LIBRARY --- //

// Función para crear un nuevo elemento en el array
function createItem(array, name, extraInfo, className) {
    if (!name || !extraInfo) {
        return showMessage(missingDataMessage('name or extra info'));
    }

    const newItem = new className(name, extraInfo);
    array.push(newItem);
    showMessage(successMessage('Created successfully!'));
}


function readItem(array, name, findFunction) {
    const item = findFunction(name);
    if (item) {
        showMessage(`${name} found!`);
    } else {
        showMessage(notFoundMessage(name));
    }
}

function updateItem(array, name, newExtraInfo, findIndexFunction) {
    const index = findIndexFunction(name);
    if (index !== -1) {
        array[index].extraInfo = newExtraInfo;
        showMessage(successMessage('Updated successfully!'));
    } else {
        showMessage(notFoundMessage(name));
    }
}


function deleteItem(array, name, findIndexFunction) {
    const index = findIndexFunction(name);
    if (index !== -1) {
        array.splice(index, 1);
        showMessage(successMessage('Deleted successfully!'));
    } else {
        showMessage(notFoundMessage(name));
    }
}