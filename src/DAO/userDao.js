class UserDAO{
    constructor(bd){
        this.bd = bd;
    }
    listUsers(){
        const promise = new Promise((resolve,reject)=>
        {
            let arr = [...this.bd];
            arr? resolve(arr):reject({Erro:"Deu erro."});
        })
        return promise
    }
    searchUser(id){
        const promise = new Promise((resolve,reject)=>
        {
            let arr = this.bd.filter(item => item.id == id);
            arr? resolve(arr):reject({Erro:"Deu erro."});
        })
        return promise 
    }
}

module.exports = UserDAO;