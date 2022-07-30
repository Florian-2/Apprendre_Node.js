/* JWT

    Comment ça marche ?
        ...
        Ensuite au moment de la vérification avec la méthode "jwt.verify()" il va prendre le token et le secret et générer la signature, il va ensuite vérifier que la signature générée est la même que celle sur le token, si elle ne sont pas identique cette méthode va "throw" une erreur.

    
    Les algo d'encyption:
        Il est possible d'utiliser une encryption asymétrique dans la mise en place de token jwt cela permet d'utiliser un même token pour plusieurs applications différentes qui pourront vérifier la validité d'un token grâce à une clé publique, la ou la clé privée sera utilisée pour signer les tokens, MAIS si c'est pour une application simple qui ne communique avec rien d'autre on peut très bien utiliser un clé privé sans clé public.


    Fiabilité du token ?
        Le "header" et le "payload" vont être encodé en base 64 ce qui va donnée une grandre chaine de caractère (qu'on peut décoder facilement), ensuite on prend la clé "secret" (qui doit rester privé) que l'on l'encrypte avec l'algo est indiqué dans le "header" et donc en sortie on va avoir une longue chaine de caractère (qu'on appelle signature) qui contiendera 3 partie qui sont le "header" + "payload" + "signature".


    Token:

        Ils existent 3 partie dans un token:
            - "header" = Contient 2 propriétés qui précice quel est le type du token et alogo qui est utilisé pour la signature.
                {
                    "alg": "HS256",
                    "typ": "JWT"
                }

            - "payload" = Contient les donnée lié au token.
                {
                    "sub": "1234567890", // id
                    "name": "John Doe",
                    "admin": true,
                    "exp": "1653054643" // date d'expiration
                }

            - "signature" = Contient le résultat de l'encodage en base 64 entre le "header" + "payload" et le secret, le résultat sera utiliser pour vérifier la validiter du token
                HMACSHA256(
                    base64UrlEncode(header) + "." + base64UrlEncode(payload),
                    1eac334d-c7f4-4232-ba52-6505bb903dc4 // Secret
                )


    Refresh Token:
        
*/

const jwt = require("jsonwebtoken");

const { app } = require("../app");
const { findUserById } = require("../queries/user.queries");

const secret = "1eac334d-c7f4-4232-ba52-6505bb903dc4";

const createJwtToken = ({user = null, id = null}) => {
    /*
        expiresIn:
            Prend des secondes ou une chaine de caractère comme: "2h" ou "7d"
    */
    return jwt.sign({ 
        sub: id || user._id.toString()
    }, secret, { expiresIn: 5 }); // Expire X seconde après sa création
}

exports.createJwtToken = createJwtToken;

const checkExpirationToken = (token, res) => {
    const tokenExp = token.exp;
    const nowInSec = Math.floor(Date.now() / 1000);

    /*
        SI le "exp" est inférieur ou égal au la date actuel alors ca veut dire que le token n'a pas encore expiré

        SINON SI la date actuel est suppérieur à la date du token ca veut dire qu'il à expériré, dans ce cas on vérifie que la différence entre la date actuel et la date d'expiration du token est inférieur à 1 jours (24h), si c'est le cas on va créer un nouveau token

        SINON on lève une erreur comme quoi le token est expiré
    */
    if (nowInSec <= tokenExp) {
        return token;
    } 
    else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < 60 * 60 * 24) ) {
        const refreshedToken = createJwtToken({ id: token.sub });
        res.cookie('jwt', refreshedToken);
        return jwt.decode(refreshedToken);
    } 
    else {
        throw new Error('token expired');
    }
}

const extractUserFromToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);

    if (token) {
        try {
            let decodeToken = jwt.verify(token, secret, { ignoreExpiration: true });
            decodeToken = checkExpirationToken(decodeToken, res);
            const user = await findUserById(decodeToken.sub);

            if (user) {
                req.user = user;
                next();
            }
            else {
                res.clearCookie("jwt");
                res.redirect("/");
            }
        }
        catch (error) {
            /* Les erreur éventuelle

                - Token qui à expirer
                - findUserByID qui à échoué
            */
            console.log(error);
            res.clearCookie("jwt");
            res.redirect("/");
        }
    } 
    else {
        next();
    }
}

const addJwtFeatures = (req, res, next) => {
    
    req.isAuthenticated = () => req.user ? true : false;

    req.logout = () => res.clearCookie("jwt");

    req.login = (user) => {
        const token = createJwtToken({ user });
        res.cookie("jwt", token);
    }

    next();
}

app.use(extractUserFromToken);
app.use(addJwtFeatures);