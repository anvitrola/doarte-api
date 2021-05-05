class Crowdfunding {
  constructor(id, id_user, title, category, value, deadline, description) {
    this._id = id,
    this._id_user = id_user,
    this._title = title,
    this._category = category,
    this._value = value,
    this._deadline = deadline,
    this._created_at = "",
    this._description = description
  }
  getDeadline(form_date){
    const dateInMs = Date.parse(form_date);
    const date = new Date(dateInMs);
    this._deadline = date;
  }
}

module.exports = Crowdfunding;
