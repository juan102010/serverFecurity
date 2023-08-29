const { Router } = require('express');

const { rolGet,rolPost } = require('../controllers/rol');



const router = Router();
//metodo get
router.get('/', rolGet );
// //metodo put
// router.put('/',userLoginPut );
//metodo post
router.post('/', rolPost, );
// //metodo delete
// router.delete('/', userLoginPost, );


 
module.exports = router;