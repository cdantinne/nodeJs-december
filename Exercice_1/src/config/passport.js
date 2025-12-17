const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt'); 
const LocalStrategy = require('passport-local').Strategy; 
// ... Importez bcrypt, AppDataSource et votre entité User ici 
const bcrypt = require('bcrypt')
const AppDataSource = require('./data-source')


module.exports = (passport) => { 
     
    // ================================================== 
    // 1. STRATÉGIE LOCAL (Sert uniquement au Login) 
    // ================================================== 
    passport.use(new LocalStrategy({ 
            usernameField: 'email', // Indiquez à Passport quel champ sert d'identifiant 
            session: false          // Désactivez les sessions (car on fait une API REST) 
        }, 
        async (email, password, done) => { 
            // TODO : 
            // 1. Récupérez le Repository User via AppDataSource 
            // 2. Cherchez l'utilisateur par son email. 
            const userRepository = await AppDataSource.getRepository('users')
            let user = await userRepository.findOneBy({ email })
             
            // 3. VÉRIFICATIONS : 
            //    Si l'user n'existe pas OU si le mot de passe (bcrypt.compare) est faux : 
            //    return done(null, false, { message: '...' }); 
            if (user != undefined) {
                let cryptPassword = await bcrypt.compare(password, user.password)
                if (cryptPassword) {
                    // 4. SUCCÈS : 
                    //    Si tout est bon : 
                    //    return done(null, user); 
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Invalid password'})
                }
            } else {
                return done(null, false, {message: 'User not found'})
            }

        } 
    )); 
 
    // ================================================== 
    // 2. STRATÉGIE JWT (Sert aux routes protégées) 
    // ================================================== 
    const jwtOptions = { 
        // Indiquez à Passport où trouver le token (Indice: ExtractJwt.fromAuthHeaderAsBearerToken()) 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        // Indiquez la clé secrète (process.env.JWT_SECRET) 
        secretOrKey: process.env.JWT_SECRET
    }; 
 
    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => { 
        // TODO : 
        // Le "payload" contient les infos décodées du token (ex: payload.id) 
         
        // 1. Cherchez l'utilisateur dans la DB grâce à payload.id 
        let userId = payload.id
        const userRepository = await AppDataSource.getRepository('users')
        let user = await userRepository.findOneBy({ userId })
         
        // 2. Si l'utilisateur existe : return done(null, user); 
        if (user != undefined) {
            return done(null, user)

            // 3. Sinon : return done(null, false); 
        } else {
            return done(null, false)
        }

    })); 
};