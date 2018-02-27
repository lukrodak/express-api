const validateData = function (partNumber, totalChecked, reworked, nok, remarks) {
    if(typeof partNumber !== 'undefined' && partNumber > 9999999999) {
        return Promise.reject({'message': 'partNumber is longer than 10 digits'});
    }
    
    if(typeof totalChecked !== 'undefined' && totalChecked > 99999) {
        return Promise.reject({'message': 'totalChecked is longer than 5 digits'});
    }

    if(typeof reworked !== 'undefined' && reworked.length > 99999) {
        return Promise.reject({'message': 'reworked is longer than 5 digits'});
    }

    if(typeof nok !== 'undefined' && nok.length > 99999) {
        return Promise.reject({'message': 'nok is longer than 5 digits'});
    }

    if(typeof remarks !== 'undefined' && remarks.length > 30) {
        return Promise.reject({'message': 'remarks is longer than 30 digits'});
    }

    return Promise.resolve();
};

module.exports = {
    validateData
}