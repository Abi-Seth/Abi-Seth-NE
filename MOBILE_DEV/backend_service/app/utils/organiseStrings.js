export const organiseStrings = value => {
    return typeof(value) === 'string' ?
        value.toString().split('\"').join('').charAt(0).toUpperCase() +
        value.toString().split('\"').join('').slice(1) : ''
}