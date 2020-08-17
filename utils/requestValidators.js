const isValidPassword = (password) => {
    if (password.length < 7) return false;
    if (password.search(/[a-z]/i) === -1) return false;
    if (password.search(/[A-Z]/i) === -1) return false;
    if (password.search(/[0-9]/i) === -1) return false;
    if (password.search(/\W/i) === -1) return false;
    return true;
};

module.exports = {
    isValidPassword,
};
