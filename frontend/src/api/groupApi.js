import api from "./axiosClient";

export function getAllGroups() {
	return api.get("/groups");
}

export function createGroup(data) {
	return api.post("/groups", data);
}

export function getMemberedGroups() {
	return api.get("/groups/membered");
}

export function getCreatedGroups() {
	return api.get("/groups/created");
}

export function getGroupById(id) {
	return api.get(`/groups/${id}`);
}

export function getGroupMembers(id) {
	return api.get(`/groups/${id}/members`);
}

export function deleteGroup(id) {
	return api.delete(`/groups/${id}`);
}

export function joinGroup(group_id) {
	return api.post(`/memberships/${group_id}`);
}
