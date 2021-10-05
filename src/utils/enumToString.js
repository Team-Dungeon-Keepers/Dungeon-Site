
const RoleToString = function(value) {
    value = parseInt(value);

    switch (value) {
        case 1: return "Manager";
            break;
        default: return "Employee";
    }
}

const StatusToString = function(value) {
    value = parseInt(value);

    switch (value) {
        case 1: return "Approved";
            break;
        case 2: return "Denied";
            break;
        default: return "Pending";
    }
}

const TypeToString = function(value) {
    value = parseInt(value);

    switch (value) {
        case 1: return "Lodging";
            break;
        case 2: return "Travel";
            break;
        case 3: return "Food";
            break;
        default: return "Other";
    }
}

module.exports = {
    RoleToString,
    StatusToString,
    TypeToString
}