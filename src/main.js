export function sum (a, b) {
    return a + b;
}
export function validatePassword(input) {

    let capitalLetterRegex = /^(?=.*[A-Z]).*$/;

    if (!input) {
        throw Error (`must submit a password`);
    }

    if (input.length < 8) {
        throw Error (`must have at least 8 digits`);
    }

    if (!capitalLetterRegex.test(input)) {
        throw Error (`must have at least one capital letter`);
    }

}