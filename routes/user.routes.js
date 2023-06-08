const {Router}=require('express');
const {check}=require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user.controller');

const router=Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria y debe tener mas de 6 digitos').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.patch('/',usuariosPatch);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
],usuariosDelete);

module.exports=router