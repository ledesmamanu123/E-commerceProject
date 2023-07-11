export const privacy = (privacyType) => {
    return (req, res, next) =>{
        const {user} = req.session;
        console.log(user)
        switch (privacyType) {
            case 'PRIVATE':
            //Esta validacion es para dejar pasar a los que se hayan logueado
            if (user) next();
            else res.redirect('/login')
            break;
            case 'NO_AUTHENTICATED':
                if(!user) next();
                else res.redirect('/profile')
        }
    }
}