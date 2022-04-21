const JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt;

const Student = require('../models/student');
const Teacher = require('../models/teacher');

const opts = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
   passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
         const type = jwt_payload.type;

         if(type === 'student'){
            Student.findById(jwt_payload.id)
            .then(user => {
                  return done(null, user, type);
            })
            .catch(err => {
               return done(err, false, null, { message: 'Server Error' });
            });
         }


         else if(type  === 'teacher'){
            Teacher.findById(jwt_payload.id)
            .then(user => {
                  return done(null, user, type);
            })
            .catch(err => {
               return done(err, false, null, { message: 'Server Error' });
            });
         }
         
         else{
            return done(null, false);
         }
         
      })
   );
};