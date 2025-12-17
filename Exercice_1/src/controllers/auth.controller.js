const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const AppDataSource = require('../config/data-source');
const passport = require('../config/passport');
const User = AppDataSource.getRepository('User')
const { ValidationError } = require('../errors/ApiError')

const register = async (req, res) => { 
    try { 
        // 1. Récupérer email, password, role depuis req.body 
        let newUser = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            role: req.body.role || USER
        } 
        // 2. Vérifier si l'utilisateur existe déjà (findOneBy email) 
        //    -> Si oui : renvoyer une erreur 400 ou 409 
        let email = newUser.email
        let alreadyExist = await User.findOneBy({ email }) || undefined
        if (alreadyExist) {
            throw new ValidationError('This email is already used')
        } else {
            // 3. Hacher le mot de passe (bcrypt.hash) avec un salt de 10 
             newUser.password = await bcrypt.hash(newUser.password, 10)
            // 4. Créer l'instance de l'utilisateur (Repository.create) 
            //    -> Attention à mettre le mot de passe HACHÉ 
            //    -> Si le rôle n'est pas fourni, forcer 'USER' par défaut 
            const createUser = User.create(newUser)
            // 5. Sauvegarder (Repository.save) et répondre 201 
            await User.save(createUser)
            return res.status(201).json({
                message: "Utilisateur créé",
                user: newUser
            })
        }
         
    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Server error" }); 
    } 
}; 

const login = async (req, res) => { 
    // 1. Récupérer l'user validé par Passport 
    // INDICE : Il est disponible dans req.user 
    const user = req.user;  
    const valideUser = passport(user)
 
    // 2. Préparer le Payload (les infos à mettre dans le token) 
    //    -> id, email, role 
    let payload = {
        userId : valideUser.id,
        userEmail : valideUser.email,
        userRole : valideUser.role,
    }
    
     
    // 3. Générer l'ACCESS Token (Court terme : 15 min) 
    //    -> Utiliser jwt.sign(payload, secret, options) 
    let accessToken = jsonWebToken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m',
        algorithm: 'HS256'
    })   
     
    // 4. Générer le REFRESH Token (Long terme : 7 jours) 
    //    -> Utiliser jwt.sign(payload, secret, options) 
    let refreshToken = jsonWebToken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256'
    })   
 
    // 5. Renvoyer les deux tokens au client (JSON) 
    const tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
    res.json(tokens)
};


const refresh = async (req, res) => { 
    // 1. Récupérer le refreshToken depuis le body 
    //    -> Si pas de token : erreur 401 
    const refreshToken = req.body.token || undefined
    if (refreshToken != undefined) {
        // 2. Vérifier le token (jwt.verify) 
        //    -> Premier argument : le token 
        //    -> Deuxième argument : le secret 
        //    -> Troisième argument : le callback (err, decodedUser) 
        let validationToken = jsonWebToken.verify(refreshToken, process.env.JWT_SECRET, (err, user)=>{
            if (err) {
                // 3. Si erreur (token invalide ou expiré) : erreur 403 
                throw new ValidationError('Toujours paaaas')
            } else {
                // 4. Si tout est bon : 
                //    -> Re-créer un payload propre (id, email, role) depuis l'objet 'user' décodé 
                //    -> Signer un NOUVEL accessToken (15m) 
                let payload = {
                    id : user.id,
                    email: user.email,
                    role: user.role || USER
                }
                let accessToken = jsonWebToken.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '15m',
                    algorithm: 'HS256'
                })   
                // 5. Renvoyer l'accessToken (JSON) 
                res.json(accessToken)
            }
             
        })
    } else {
        throw new ValidationError('Nope frérot')
    }
}; 

module.exports={
    register,
    login,
    refresh
}


