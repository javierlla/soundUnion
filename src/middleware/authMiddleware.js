import { verifyToken } from "../utils/token.js";

// Middleware para proteger rutas de vistas: necesita sesión activa
function isLoggedInSession(req, res, next) {
    const user = req.session?.user;
    if (!user) {
        return res.redirect("/login?error=You+must+be+logged+in+to+access+this+page");
    }
    next();
}

// Middleware para proteger rutas de API: necesita JWT válido
function isLoggedInAPI(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: "No authorization header provided" });
    }

    const parts = authorization.split(" ");
    const token = parts.length === 2 ? parts[1] : null;

    if (!token) {
        return res.status(401).json({ error: "Invalid authorization header format" });
    }

    const result = verifyToken(token);

    if (result) {
        req.user = {
            user_id: result.user_id,
        };
        next();
    } else {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

// Middleware general para verificar sesión activa (por si lo usás como default export)
function isAuthenticated(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        res.redirect("/login?error=Please+login+first");
    }
}

export default isAuthenticated;

export {
    isLoggedInSession,
    isLoggedInAPI
};
