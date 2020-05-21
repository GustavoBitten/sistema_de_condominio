const session = require('express-session')

let backofficePageController = {
  moradorDashboard: (req,res) => {
    res.render("backoffice/morador/dashboard", {titulo:"Morador - Dashboard",usuario:req.session.user})
  },
  moradorPerfil: (req,res) => {
    res.render("backoffice/morador/perfil", {titulo:"Morador - Perfil",usuario:req.session.user})
  },
  moradorOcorrencias: (req,res) => {
    res.render("backoffice/morador/ocorrencias", {titulo:"Morador - Ocorrências",usuario:req.session.user})
  },
  moradorAreasComuns: (req,res) => {
    res.render("backoffice/morador/areasComuns", {titulo: "Morador - Áreas Comuns",usuario:req.session.user})
  },
  moradorPortaria: (req,res) => {
    res.render("backoffice/morador/portaria", {titulo:"Morador - Portaria",usuario:req.session.user})
  },
  moradorComunicados: (req,res) => {
    res.render("backoffice/morador/comunicados", {titulo:"Morador - Comunicados",usuario:req.session.user})
  },
  moradorFinanceiro: (req, res) => {
    res.render("backoffice/morador/financeiro", {titulo:"Morador - Financeiro",usuario:req.session.user})
  },



  sindicoPerfil: (req,res) => {
    res.render("backoffice/sindico/perfil", {titulo:"Síndico - Perfil",usuario:req.session.user})
  },
  sindicoOcorrencias: (req,res) => {
    res.render("backoffice/sindico/ocorrencias", {titulo:"Síndico - Ocorrências",usuario:req.session.user})
  },
  sindicoAreasComuns: (req, res) => {
    res.render("backoffice/sindico/areasComuns", {titulo: "Síndico - Áreas Comuns",usuario:req.session.user})
  },
  sindicoMoradores: (req,res) => {
    res.render("backoffice/sindico/moradores", {titulo:"Síndico - Moradores",usuario:req.session.user})
  },
  sindicoPortaria: (req,res) => {
    res.render("backoffice/sindico/portaria", {titulo:"Síndico - Portaria",usuario:req.session.user})
  },
  sindicoComunicados: (req,res) => {
    res.render("backoffice/sindico/comunicados", {titulo:"Síndico - Comunicados",usuario:req.session.user})
  },
  sindicoFinanceiro: (req, res) => {
    res.render("backoffice/sindico/financeiro", {titulo:"Síndico - Financeiro",usuario:req.session.user})
  },


  
  portariaPerfil: (req,res) => {
    res.render("backoffice/portaria/perfil", {titulo:"Portaria - Perfil",usuario:req.session.user})
  },
  portariaOcorrencias: (req,res) => {
    res.render("backoffice/portaria/ocorrencias", {titulo:"Portaria - Ocorrências",usuario:req.session.user})
  },
  portariaAreasComuns: (req, res) => {
    res.render("backoffice/portaria/areasComuns", {titulo: "Portaria - Áreas Comuns",usuario:req.session.user})
  },
  portariaMoradores: (req,res) => {
    res.render("backoffice/portaria/moradores", {titulo:"Portaria - Moradores",usuario:req.session.user})
  },
  portariaCorrespondencias: (req,res) => {
    res.render("backoffice/portaria/correspondencias", {titulo:"Portaria - Correspondencias",usuario:req.session.user})
  },
  portariaComunicados: (req,res) => {
    res.render("backoffice/portaria/comunicados", {titulo:"Portaria - Comunicados",usuario:req.session.user})
  }



}


module.exports = backofficePageController