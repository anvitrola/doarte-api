exports.allAcess = (req, res) => {
    res.status(200).send({message: "Conteúdo público"});
}

exports.userBoard = (req, res) => {
    res.status(200).send({message: "Conteúdo pessoal"});
}