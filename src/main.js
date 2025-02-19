export function sum (a, b) {
    return a + b;
}
export function validatePassword(input) {
    if (!input) {
        throw Error (`must submit a password`);
    }

}