module.exports = {
    ensureAuthenticated : function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/home');
    },
    ensureNotAuthenticated : function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect('/tasks');
    }
}