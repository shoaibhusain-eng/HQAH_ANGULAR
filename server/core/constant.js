const Path = require('path');

module.exports = Object.freeze({

    // JWT SECRET KEY
    SECRET_TOKEN: 'sz2#re3xdr33cfqtd3vgybhunjim',

    // send grid key
    sendGridKey: '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',

    // Assignment File Path
    ASSIGNMENT_PATH: Path.join(__dirname, '../upload/assignments/'),

    // Contact Info File Path
    CONTACT_PATH: Path.join(__dirname, '../upload/contact/'),

    // General File Path
    GENERAL_PATH: Path.join(__dirname, '../upload/general/'),

    // Document File Path
    DOCUMENT_PATH: Path.join(__dirname, '../upload/document/'),

});