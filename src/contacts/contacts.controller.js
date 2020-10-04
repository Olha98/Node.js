const contacts =[{
	id:1,
	name:'Gichard',
	email: "gfghf@gmail.com",
	password: "123456gg"
}]

module.exports = class ContactsController{
	static getContacts(req, res,next){
		return res.json(contacts)
	}
}