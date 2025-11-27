import GroupRepository from "../repositories/GroupRepository.js";
import MembershipService from "./MembershipService.js";

export default class GroupService {
	static async getAll() {
		let groups = await GroupRepository.getAll();
		for(const group of groups) {
			group.members = await MembershipService.getMembers(group.id);
		}

		return groups;
	}

	static async store(data) {
		return await GroupRepository.create(data);
	}

	static async getOne(id) {
		const group = await GroupRepository.getOne({ _id: id });
		if (!group) {
			const error = new Error("Not Found");
			error.statusCode = 404;
			throw error;
		}
		return group;
	}

	static async delete(id) {
		const group = await GroupRepository.delete(id);

		if (!group) {
			const error = new Error("Not Found");
			error.statusCode = 404;
			throw error;
		}
		return group;
	}

	static async getGroupsCreatedByUser(user_id) {
		const groups = await GroupRepository.getAll({ admin_id: user_id });
		for (const group of groups) {
			group.members = await MembershipService.getMembers(group.id);
		}
		
		return groups;
	}

	static async getGroupsMemberedByUser(user_id) {
		const groups = await GroupRepository.getGroupsMemberedByUser(user_id);
		for (const group of groups) {
			group.members = await MembershipService.getMembers(group.id);
		}

		return groups;
	}
}
