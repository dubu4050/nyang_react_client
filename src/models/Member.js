export default class Member {
  id;
  password;
  nickname;
  email;
  phone_number;
  name;
  date_register;
  date_birth;
  authority;
  constructor(id, password, name, nickname, email, phone_number, date_birth) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.phone_number = phone_number;
    this.date_birth = date_birth;
  }
}
