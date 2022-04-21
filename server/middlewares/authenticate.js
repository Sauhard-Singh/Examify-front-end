const passport = require('passport');

module.exports = (req, res, next) => {
   passport.authenticate('jwt', function (err, user, type, info) {
      if (err)
         return next(err);

      if (!user)
         return res.status(401).json({ success: false, message: "Unauthorized Access" });

      if(type == 'student')
         req.student = user;
      if(type == 'teacher')
         req.teacher = user;
      next();
   })(req, res, next);
};