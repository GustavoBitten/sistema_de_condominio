const moment = require("moment")
const truncate = require('html-truncate')
const { validationResult } = require('express-validator')

const { Comunicado } = require("../../models")

module.exports = comunicadoController = {
  index: async (req, res) => {
    const listaComunicados = await Comunicado.findAll()

    return res.render("backoffice/comunicados", {
      titulo: "Comunicados",
      usuario: req.session.user,
      listaComunicados,
      moment,
      truncate
    })
  },
  show: async (req, res) => {
    try {
      const { id } = req.params

      const comunicado = await Comunicado.findByPk(id)

      if(!comunicado)
        throw {erro: 'Comunicado não existe!'}

      return res.status(200).json(comunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  store: async (req, res) => {
    const { user } = req.session
    const { titulo, mensagem } = req.body
    const sindico_id = user.id

    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw res.status(422).json({ errors: errors.array() });
      }

      if (user.tipo_usuario_id != 2)
        throw res.status(400).json({error: 'Erro de permissão ao criar o comunicado, apenas síndicos podem criar novos comunicados!'})

      const createComunicado = await Comunicado.create({
        sindico_id,
        titulo,
        mensagem,
      });

      if (!createComunicado)
        throw res.status(400).json({error: 'Erro ao criar o comunicado, tente novamente mais tarde!'})

      return res.status(200).json(createComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  update: async (req, res) => {
    const { user } = req.session
    const { id } = req.params
    const { titulo, mensagem } = req.body

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw res.status(422).json({ errors: errors.array() });
      }

      if (user.tipo_usuario_id != 2)
        throw res.status(400).json({error: 'Erro de permissão ao atualizar o comunicado, apenas síndicos podem autalizar comunicados!'})

      const updateComunicado = await Comunicado.update({
        titulo,
        mensagem,
      }, {
        where: {id}
      });

      if(!updateComunicado)
        throw res.status(400).json({error: 'Erro ao atualizar o comunicado, tente novamente mais tarde!'})

      return res.status(200).json(updateComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  destroy: async (req, res) => {
    const { user } = req.session

    try {
      const { id } = req.params

      const comunicado = await Comunicado.findByPk(id)

      if(!comunicado)
        throw {error: 'Comunicado não existe!'}

      if (user.tipo_usuario_id != 2)
        throw res.status(400).json({error: 'Erro de permissão ao excluir o comunicado, apenas síndicos podem excluir comunicados!'})

      const destruirComunicado = await Comunicado.destroy({
        where: [{id}]
      })

      if(!destruirComunicado)
        throw {error: 'Erro ao excluir comunicado'}

      return res.status(200).json(destruirComunicado)
    } catch (error) {
      return res.status(400).json(error)
    }
  },
  getComunicados: async (req, res) => {
    try {
      const listaComunicados = await Comunicado.findAll()

      return res.status(200).json(listaComunicados)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
