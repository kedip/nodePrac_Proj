import  jwt  from "jsonwebtoken";

export const generateJwtAccessToken = (userData) => {  
    // Customize the payload as needed
    const payload = {
      userId: userData.id
      // Add more user-related data to the payload if needed
    };
    // Set the expiration time for the token (e.g., 1 hour)
    const expiresIn = '365d';
  
    // Sign the token
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn });
  
    return token;
  };

  export const generateJwtIdToken = (userData) => {  
    // Customize the payload as needed
    const payload = {
      userId: userData.id,
      email: userData.email,
      // Add more user-related data to the payload if needed
    };
  
    // Set the expiration time for the token (e.g., 1 hour)
    const expiresIn = '365d';
  
    // Sign the token
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn });
  
    return token;
  };

  export const verifyJwtAccessToken = (req, res, next) => {
    let token = req.body.authorization || req.query.authorization || req.headers['authorization'];
    if (!token) {
        return res.status(401).json((401, "globalMessage.noToken", {}));
    } else {
        let authToken = token.split(' ');
        if (authToken) {
            if (authToken[0] !== 'Bearer') {
                return res.status(401).json((401," globalMessage.invalidToken", {}));
            } else {
                jwt.verify(authToken[1], process.env.TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(401).json((401, "globalMessage.invalidToken", {}));
                    } else {
                        req.user = decoded.user_id;
                        next();
                    }
                });
            }
        } else {
            return res.status(401).json((401, "globalMessage.noToken", {}));
        }
    }
  };