import blacklistModel from "../models/BlacklistModel.js";
export default class BlackListRepository {
	static async create(data) {
		return await blacklistModel.create(data);
	}
}
