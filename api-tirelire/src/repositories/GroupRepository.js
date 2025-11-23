import GroupModel from "../models/GroupModel.js";

export default class GroupRepository {
	static async getAll(filter = {}) {
		let groups = await GroupModel.find(filter).populate("cycles.cycle_order.member_id");

		groups = groups.map((group) => {
			const groupObject = group.toObject();
			const id = group._id;
			delete groupObject._id;
			return {
				id,
				amount: Number(groupObject.amount),
				...groupObject,
			};
		});
		return groups;
	}

	static async create(data) {
		const newGroup = new GroupModel(data);
		await newGroup.save();
		return newGroup;
	}

	static async getOne(filter) {
		return await GroupModel.findOne(filter).populate("cycles.cycle_order.member_id");
	}

	static async getGroupsMemberedByUser(user_id) {
		return await GroupModel.find({})
			.populate("cycles.cycle_order.member_id")
			.populate({
				path: "memberships",
				match: { member_id: user_id, status: "accepted" },
			});
	}

	static async delete(id) {
		return await GroupModel.findByIdAndDelete(id);
	}
}
