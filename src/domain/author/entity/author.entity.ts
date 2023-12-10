export default class Author {

  constructor(
    public age: number,
    public name: string,
    public bio: string,
    public email: string
  ){
    this.validateRequiredFields();
    this.validateAgeRule();
  }

  private validateRequiredFields() {
    if(this.name.length === 0) {
      throw new Error('Name is required')
    }
    
    if(this.email.length === 0) {
      throw new Error('Email is required')
    }

    if(this.bio.length === 0) {
      throw new Error('Bio is required')
    }
  }

  private validateAgeRule() {
    if(this.age < 18) {
      throw new Error('The minimum age required is 18 years')
    }
  }
}