// const jwt = require('jsonwebtoken');

// /*********************extraction du token */
// const extractBearer=authorization=>{
//   if(typeof authorization !==String){
//     return false
//   }
//   const matches= authorization.matches(/(bearer)\s+(\S+)/i)
//   return matches && matches[2]
// }

// const checkTokenMiddleware= (req,res,next)=>{
  
//   const token=req.headers.authorization && extractBearer(req.headers.authorization)
//   if (!token){
//     return res.status(401).json({message: 'bad token'})
//   }
// //validité token
// jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
//   if(err){
//     return res.status(401).json({message:'bad Token'})
//   }
//   next()
// })

// }
// module.exports = checkTokenMiddleware