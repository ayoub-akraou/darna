import GroupModel from "../models/GroupModel.js";
import MembershipModel from "../models/MembershipModel.js";

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
		const memberships = await MembershipModel.find({ member_id: user_id, status: "accepted" }).populate("group_id");
		console.log(memberships);
		const groups = memberships?.map((membership) => {
			const groupObject = membership?.group_id?.toObject();
			const id = membership?.group_id?._id;
			delete groupObject?._id;
			return { id, ...groupObject };
		});
		return groups;
	}

	static async delete(id) {
		const group = await GroupModel.findByIdAndDelete(id);
		console.log(group);
		if (group) await MembershipModel.deleteMany({ group_id: id });
		return group;
	}
}
