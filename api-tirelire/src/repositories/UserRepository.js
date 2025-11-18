import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export default class UserRepository {
	static async findByEmail(email, selectPassword = false) {
		const user = (await UserModel.findOne({ email }).select(
			selectPassword ? "+password" : "-password"
		)).toObject();
		user.id = user._id;
		delete user._id;
		return user;
	}

	static async createUser(data) {
		const { password } = data;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new UserModel({ ...data, password: hashedPassword });
		const savedUser = (await user.save()).toObject();

		savedUser.id = savedUser._id;

		delete savedUser._id;
		delete savedUser.password;

		return savedUser;
	}
}
