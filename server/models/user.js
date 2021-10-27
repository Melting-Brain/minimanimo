import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // 필수 항목
      unique: true, // 동일 이메일이 없도록 설정
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timeStamps: true,
  } // 두번쨰 인자로 옵션을 줄 수 있는데 시간 필드를 자동으로 생성해준다.
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // 비밀번호 해독 함수

// hashing password  manually in the controller
// this little middleware is really helpful
// don't need to mock up controller with all that stuff
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // 해시된 패스워드로 재할당
}); // 비밀번호 암호화 함수

const User = mongoose.model("User", userSchema);

export default User;
// 유저 스키마 작성 및 모델 생성
