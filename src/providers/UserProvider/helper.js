export const mapErrors = (errors) => {
    return Object
    .keys(errors)
    .reduce((acc, el) => {
        const errorArr = errors[el];
        const { message, field } = errorArr.errors[0];
        return { ...acc, [field]: message };
    }, {})
}