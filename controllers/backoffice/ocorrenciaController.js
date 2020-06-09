const { Ocorrencia, Status_ocorrencia, Tipo_ocorrencia, Usuario } = require('../../models')
const moment = require("moment");

module.exports = ocorrenciaController = {
    index: async (req, res) => {
        const listaOcorrencias = await Ocorrencia.findAll({
            include: [{
                model: Usuario,
                required: true,
                where:{id : req.session.user.id},
               },
               {
                   model: Status_ocorrencia,
                   required: true,
                },
                {
                    model: Tipo_ocorrencia,
                    required: true,
                },
            
            ], 
            
        })
        
     //   const {idOcorrencia} = req.params
      //  const ocorrencias = await Ocorrencia.findByPk(idOcorrencia)


        return res.render("backoffice/morador/ocorrencias", {
            titulo: "Ocorrências",
            usuario: req.session.user,
            listaOcorrencias,
            //ocorrencias,
            moment,
        })

    },
  

   

    
    
    
    storeMorador: async (req, res) => {
        const { user } = req.session;
        const {tituloOcorrencia, tipoOcorrencia,mensagemOcorrencia } = req.body;
        const [arquivoOcorrencia] = req.files;

        let foto = null   
        if(foto == null){foto = `/images/padrao/padrao.png` } 
        if(arquivoOcorrencia){foto = `/images/ocorrencias/${arquivoOcorrencia.filename}` }  
    

        try {
            const novaOcorrencia = await Ocorrencia.create({
                titulo: tituloOcorrencia,
                mensagem: mensagemOcorrencia,
                resposta: null, 
                arquivo: foto,
                administrador_id: 2,	
                status_ocorrencia_id: 1, // padrão de cadastro: 1 - Registrado
                tipo_ocorrencia_id: parseInt(tipoOcorrencia),
                morador_id: user.id,
            })
            return res.status(201).redirect('/backoffice/morador/ocorrencias')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    storeSindico: async (req, res) => {
        const { user } = req.session;
        const {tituloOcorrencia, tipoOcorrencia,respostaOcorrencia } = req.body;
        const [arquivoOcorrencia] = req.files;

        try {
            const novaOcorrencia = await Ocorrencia.create({
                titulo: "vazio",
                mensagem: "vazia",
                resposta: respostaOcorrencia,
                arquivo: null,
                administrador_id: 2,	
                status_ocorrencia_id: 2, // padrão cadastro: Registrado
                tipo_ocorrencia_id: 1, // arrumar
                morador_id: user.id,
            })
            return res.status(201).redirect('/backoffice/morador/ocorrencias')
        } catch (error) {
            return res.status(400).json(error);
        }

    },
    delete: async (req, res) => {
        const { ocorrenciaId } = req.params;

        try {
            const deleteOcorrencia = await Ocorrencia.destroy({
                where: [{ id: ocorrenciaId },
                ]
            });

            return res.redirect("/backoffice/morador/ocorrencias");

        } catch (error) {
            return res.status(400).json(error);
        }
    },
    update: async (req, res) => {
        const { user } = req.session;
        const { ocorrenciaId } = req.params
        const [fotoOcorrencia] = req.files;
        const { } = req.body;

        try {
            const editarOcorrencia = await Ocorrencia.update({

                morador_id: user.id,
            }, {
                where: { id: ocorrenciaId }
            })

            return res.redirect("/backoffice/morador/ocorrencia")

        }
        catch (error) {
            return res.status(400).json(error);
        }
    },

}