const request = require('request');
var AugustApi = function AugustApi(securityToken) {
    securityToken = securityToken || {};
    var getBaseRequest = function getBaseRequest() {
        return ({
            method: null,
            url: 'https://api-production.august.com/',
            headers: {
                'x-august-access-token': securityToken,
                'x-august-api-key': '727dba56-fe45-498d-b4aa-293f96aae0e5',
                'x-kease-api-key': '14445b6a2dba',
                'Content-Type': 'application/json'
            },
            json: true
        });
    }

    var makeRequest = async function makeRequest(option) {
        return (await makeRawRequest(option)).body;
    }

    var makeRawRequest = function makeRawRequest(option) {
        return new Promise(function (resolve, reject) {
            request(option, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                if (response.statusCode < 200 || response.statusCode > 299) {
                    return reject(new Error('Http error: ' + response.statusCode, response, body));
                }
                resolve({ response: response, body: body });
            });
        });
    }

    this.sendCodeToPhone = function sendCodeToPhone(phoneNumber) {
        //
        var option = getBaseRequest();
        option.url += 'validation/phone';
        option.method = 'POST';
        option.body = {
            value: phoneNumber
        };
        return makeRawRequest(option);
    }

    this.validatePhone = function validatePhone(phoneNumber, code) {
        var option = getBaseRequest();
        option.url += 'validate/phone';
        option.method = 'POST';
        option.body = {
            code: code,
            phone: phoneNumber
        };
        return makeRawRequest(option);
    }

    this.sendCodeToEmail = function sendCodeToEmail(emailAddress) {
        //
        var option = getBaseRequest();
        option.url += 'validation/email';
        option.method = 'POST';
        option.body = {
            value: emailAddress
        };
        return makeRawRequest(option);
    }

    this.validateEmail = function validateEmail(emailAddress, code) {
        var option = getBaseRequest();
        option.url += 'validate/email';
        option.method = 'POST';
        option.body = {
            code: code,
            email: emailAddress
        };
        return makeRawRequest(option);
    }

    this.authenticate = function authenticate(userid, password) {
        // https://api-production.august.com/session
        var option = getBaseRequest();
        option.url += 'session';
        option.method = 'POST';
        option.body = {
            identifier: userid,
            installId: 'E629CCCC-A9E0-40F1-8BB8-43A24830346B',
            password: password
        };
        return makeRawRequest(option);
    }

    this.getLocks = function getLocks() {
        // https://api-production.august.com/users/locks/mine
        var option = getBaseRequest();
        option.url += 'users/locks/mine';
        option.method = 'GET';
        return makeRequest(option);
    }

    this.getLock = function getLock(lockId) {
        // https://api-production.august.com/locks/{lockId}
        var option = getBaseRequest();
        option.url += 'locks/' + encodeURIComponent(lockId.toUpperCase());
        option.method = 'GET';
        return makeRequest(option);
    }

    this.getHouses = function getHouses() {
        // https://api-production.august.com/houses/mine
        var option = getBaseRequest();
        option.url += 'houses/mine';
        option.method = 'GET';
        return makeRequest(option);
    }

    this.getHouse = function getHouse(houseId) {
        // https://api-production.august.com/houses/00000000-1111-2222-3333-444444444444
        var option = getBaseRequest();
        option.url += 'houses/' + encodeURIComponent(houseId.toLowerCase());
        option.method = 'GET';

        return makeRequest(option);
    }

    this.remoteOperate = function remoteOperate(lockId, state) {
        // PUT https://api-production.august.com/remoteoperate/{lockId}/{state}
        var option = getBaseRequest();
        option.url += 'remoteoperate/' + encodeURIComponent(lockId.toUpperCase()) + '/' + encodeURIComponent(state.toLowerCase());
        option.method = 'PUT';
        return makeRequest(option);
    }    
}
module.exports = AugustApi;
