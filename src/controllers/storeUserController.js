const User = require('../models/User')

module.exports = (req,res)=>{
    User.findOne({ username: req.body.username }).then((existingUser) => {
        if (existingUser) {
            const validationErrors = "User already exists";
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/login');
        } else{
            // Continue with user creation logic
            User.create(req.body).then(() => {
                console.log("User registered successfully");
                return res.redirect('/');
            }).catch((error) => {
                if(error){
                    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
                    req.flash('validationErrors', validationErrors);
                    req.flash('data', req.body);
                    return res.redirect('/login');
                }
                
            });
        }
    }).catch((error) => {
        console.log('Error checking user existence:',error);
        // Handle error case here
    });
}
