const route = 'crowd';
const CrowdDAO = require('../DAO/crowDao');
const bd = require('../infra/crowdBD');
const crowdDao = new CrowdDAO(bd);
module.exports = (app) => { 
    app.get(`/${route}`,async (req, res) => {
        try {
            let response = await crowdDao.listUsers()  
            res.status(200).send(response);
        }catch(e){
          res.status(404).send({'Erro':'Ops! Deu erro :/'});
        }
    });
    app.get(`/${route}/:id`,async (req, res) => {
        try {
            let response = await crowdDao.searchUser(Number(req.params.id));  
            res.status(200).send(response);
        }catch(e){
          res.status(404).send({'Erro':'Ops! Deu erro :/'});
        }
    });
    app.post(`/${route}`,async (req, res) => {
        try{
          res.status(200).send({post:"ok",...req.body});
        } catch(e){
          res.status(404).send(e);
        }
        
    });
    app.patch(`/${route}/:id`,async (req, res) => {
        try{
          res.status(200).send({patch:"ok"});
        } catch(e){
          res.status(404).send(e);
        }
        
    });
    app.delete(`/${route}/:id`,async (req, res) => {
        try{
          res.status(200).send({delete:"ok"});
        } catch(e){
          res.status(404).send(e);
        }
       
    });         
}