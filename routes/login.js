/**
 * Created by Dhruvraj on 11/18/2016.
 */
module.exports = function(app, passport) {

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/addPv', // redirect to the secure profile section
        failureRedirect : '/loginRegPage', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

}