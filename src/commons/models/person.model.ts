import { TypeUtil } from '../utils';

export class PersonModel {
	public id: number;

	public name: string;

	public password: string;

	public nickname: string;

	public user?: string;

	public type: string;

	constructor(json?: any) {
		if (json != undefined && json != null) {
			const keys: Array<string> = Object.keys(json);
			if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
			if (keys.includes('name')) this.name = json.name ? String(json.name) : json.name;
			if (keys.includes('password')) this.password = json.password ? String(json.password) : json.password;
			if (keys.includes('nickname')) this.nickname = json.nickname ? String(json.nickname) : json.nickname;
			if (keys.includes('user')) this.user = json.user ? String(json.user) : json.user;
			if (keys.includes('type')) this.type = json.type ? String(json.type) : json.type;
		}
	}
}
