import { TypeUtil } from '../utils';

export class RegisterModel {
	public id: number;

	public date: Date;

	public dateEnd: Date;

	public status: number;

	public risk: number;

	public priority: number;

	public isOnline: boolean;

	public personId?: number;

	public description?: string;

	constructor(json?: any) {
		if (json != undefined && json != null) {
			const keys: Array<string> = Object.keys(json);
			if (keys.includes('id')) this.id = json.id ? Number(json.id) : json.id;
			if (keys.includes('date')) this.date = json.date ? new String(json.date) : json.date;
			if (keys.includes('dateEnd')) this.dateEnd = json.dateEnd ? new Date(json.dateEnd) : json.dateEnd;
			if (keys.includes('status')) this.status = json.status ? Number(json.status) : json.status;
			if (keys.includes('risk')) this.risk = json.risk ? Number(json.risk) : json.risk;
			if (keys.includes('priority')) this.priority = json.priority ? Number(json.priority) : json.priority;
			if (keys.includes('isOnline')) this.isOnline = json.isOnline ? json.isOnline : json.isOnline;
			if (keys.includes('personId')) this.personId = json.personId ? Number(json.personId) : json.personId;

			if (keys.includes('description')) this.description = json.description ? String(json.description) : json.description;
		}
	}
}
