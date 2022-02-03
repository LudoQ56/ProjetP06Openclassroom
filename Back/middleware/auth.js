/*import de module*/
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user_id;
    req.auth= {userId}      
    if (req.body.userId && req.body.userId !== userId) {
      
      throw 'Invalid user ID';
    } else {
     
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
 
}
// try {
//   const token = req.header("x-auth-token");
//   if (!token) return res.status(403).send("Access denied.");

//   const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
//   req.user = decoded;
//   next();
// } catch (error) {
//   res.status(400).send("Invalid token");
// }
// };
