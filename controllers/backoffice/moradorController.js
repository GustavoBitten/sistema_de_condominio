const {
  Usuario,
  Bloco,
  Apartamento
} = require('../../models')
const bcrypt = require('bcrypt')
module.exports = moradorController = {
  store: async (req, res) => {
    let {
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      tipo,
      status
    } = req.body
    const [fotoMorador] = req.files;

    //if verifica se tem foto se não tiver salva sem foto no banco
    if (fotoMorador == undefined) {
      foto = "SEM FOTO"
    } else {

      foto = `/images/moradores/${fotoMorador.filename}`

    }
    bloco_id = 2
    apartamento_id = 1
    tipo_usuario_id = 2
    const senha = bcrypt.hashSync(cpf, 2)
    console.log(senha)

    /* const VerificaEmail = await Usuario.findOne({ 
      where:{
         email: email } });
if (project != null) {
  console.log('Not found!');
} else {
  
} */

    const novoMorador = await Usuario.create({
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      senha,
      foto,
      tipo_usuario_id
    })


    return res.redirect("/backoffice/sindico/moradores")
    // const morador = await Usuario.create({
    //   nome,
    //   email,
    //   cpf,
    //   rg,
    //   bloco_id,
    //   apartamento_id,
    //   senha,
    //   foto,
    //   sindico,
    //   status
    // })

    //return res.json(morador)

  },
  ListaMoradores: async (req, res) => {

    const result = await Usuario.findAll({
      where: {
        tipo_usuario_id: 2
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['updated_at','DESC'],]
    })
    const resultBloco = await Bloco.findAll()
    const resultApartamento = await Apartamento.findAll()
    // console.log("id que trouxe é: "+ result)

    return res.render('./backoffice/sindico/moradores', {
      titulo: "Síndico - Moradores",
      result,
      resultBloco,
      resultApartamento,
      usuario: "FODÂO"
    })

  },
  editar: async (req, res) => {
    const {
      moradorId
    } = req.params
    const {
      nome,
      email,
      cpf,
      rg,
      bloco_id,
      apartamento_id,
      //  tipo,
      //  status
    } = req.body
    const [fotoMorador] = req.files;
    //if verifica se mudou foto caso mudou , salva a nova.
    if (fotoMorador == undefined) {
      // foto = "SEM FOTO"
      const buscaFoto = await Usuario.findOne({
        where: {
          id: moradorId
        }
      })
      foto = buscaFoto.foto
      
    } else {

      foto = `/images/moradores/${fotoMorador.filename}`
    }


    const result = await Usuario.update({
      nome: nome,
      email: email,
      cpf: cpf,
      rg: rg,
      bloco_id: bloco_id,
      apartamento_id: apartamento_id,
      foto: foto

    }, {
      where: {
        id: moradorId
      }

    })
    console.log("execução da edição : " + result)

    return res.redirect("/backoffice/sindico/moradores")
  },

}