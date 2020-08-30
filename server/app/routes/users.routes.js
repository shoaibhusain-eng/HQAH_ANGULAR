const { usersController } = require('../controller');

module.exports = (app) => {
    app.post('/signup', usersController.signup);
    app.post('/login', usersController.login);
    app.get('/checkEmailforForgetPassword', usersController.checkEmailforForgetPassword);
    app.put('/updatePassword', usersController.updatePassword);
    app.post('/socialLogin', usersController.socialLogin);

}
