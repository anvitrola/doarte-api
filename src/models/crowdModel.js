class Crowdfunding {
  constructor(id,id_user,title,category,value,deadline,creation_date,
    description)
    {
      this.id = id,
      this.id_user = id_user,
      this.title = title,
      this.category = category,
      this.value = value,
      this.deadline = deadline,
      this.creation_date = creation_date,
      this.description = description
  }
}

module.exports = Crowdfunding;
