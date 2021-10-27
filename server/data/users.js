import bcrypt from "bcryptjs";

const users = [
  {
    nickname: "Cheolsoo",
    email: "soo@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/users/1.jpeg",
  },
  {
    nickname: "Younghee",
    email: "hee@example.com",
    password: bcrypt.hashSync("123456", 10),
    image: "/images/users/2.jpeg",
  },
];

export default users;
// to hash the password should install becryptjs
// 패스워드를 해시하는데는 다양한 방법이 있는데
// 기본적인 방법이 비동기로 하는 것
// 현재는 실제로 회원가입을 하거나 로그인을 하는 것이 아니기 떄문에
// hash sync method로 진행
