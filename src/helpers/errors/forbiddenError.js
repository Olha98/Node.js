exports.ForBidden= class ForBidden extends Error{
  constructor(message){
    super(message)
    this.status = 403;
  }
}