const validateData = function (data) {
    if(typeof data.partNumber !== 'undefined' && data.partNumber.length > 10) {
        return Promise.reject({'message': 'partNumber is longer than 10 digits'});
    }

    if(typeof data.totalChecked !== 'undefined' && data.totalChecked > 99999) {
        return Promise.reject({'message': 'totalChecked is longer than 5 digits'});
    }

    if(typeof data.reworked !== 'undefined' && data.reworked > 99999) {
        return Promise.reject({'message': 'reworked is longer than 5 digits'});
    }

    if(typeof data.nok !== 'undefined' && data.nok > 99999) {
        return Promise.reject({'message': 'nok is longer than 5 digits'});
    }

    if(typeof data.remarks !== 'undefined' && data.remarks.length > 30) {
        return Promise.reject({'message': 'remarks is longer than 30 digits'});
    }

    if(typeof data.totalOk !== 'undefined' && data.totalOk > 99999 || data.fromThisOk < -99999) {
        return Promise.reject({'message': 'totalOk is longer than 5 digits'});
    }

    if(typeof data.fromThisOk !== 'undefined' && data.fromThisOk > 99999 || data.fromThisOk < -99999) {
        return Promise.reject({'message': 'fromThisOk is longer than 5 digits'});
    }
    return Promise.resolve();
};

module.exports = {
    validateData
};