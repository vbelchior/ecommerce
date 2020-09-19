import { TypeUtil } from '../utils';

export class UserModel {
	public id: number;

	public name: string;

	public phone: string;

	public email: string;

	public password: string;

	public cpf: string;

	public cep: string;

	public state: string;

	public city: string;

	public neighborhood: string;

	public street: string;

	public number: string;

	public complement: string;

	constructor(id?: number) {
		if (TypeUtil.exists(id)) this.id = id;
	}

	public static factory(source: any): UserModel {
		if (!TypeUtil.exists(source)) return new UserModel();
		let target: UserModel = new UserModel(source.id);
		if (TypeUtil.exists(source.name)) target.name = source.name;
		if (TypeUtil.exists(source.phone)) target.phone = source.phone;
		if (TypeUtil.exists(source.email)) target.email = source.email;
		if (TypeUtil.exists(source.password)) target.password = source.password;
		if (TypeUtil.exists(source.cpf)) target.cpf = source.cpf;
		if (TypeUtil.exists(source.cep)) target.cep = source.cep;
		if (TypeUtil.exists(source.state)) target.state = source.state;
		if (TypeUtil.exists(source.city)) target.city = source.city;
		if (TypeUtil.exists(source.neighborhood)) target.neighborhood = source.neighborhood;
		if (TypeUtil.exists(source.street)) target.street = source.street;
		if (TypeUtil.exists(source.number)) target.number = source.number;
		if (TypeUtil.exists(source.complement)) target.complement = source.complement;
		return target;
	}

	public equals(other: UserModel): boolean {
		if (!TypeUtil.exists(other)) return false;
		if (this.id !== other.id) return false;
		if (this.name !== other.name) return false;
		if (this.phone !== other.phone) return false;
		if (this.email !== other.email) return false;
		if (this.password !== other.password) return false;
		if (this.cpf !== other.cpf) return false;
		if (this.cep !== other.cep) return false;
		if (this.state !== other.state) return false;
		if (this.city !== other.city) return false;
		if (this.neighborhood !== other.neighborhood) return false;
		if (this.street !== other.street) return false;
		if (this.number !== other.number) return false;
		if (this.complement !== other.complement) return false;
		return true;
	}

	public issues(): Array<string> {
		let problems: Array<string> = new Array<string>();
		if (!TypeUtil.isFullString(this.name, true)) {
			problems.push('name: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.phone, true)) {
			problems.push('phone: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.email, true)) {
			problems.push('email: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.password, true)) {
			problems.push('password: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.cpf, true)) {
			problems.push('cpf: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.cep, true)) {
			problems.push('cep: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.state, true)) {
			problems.push('state: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.city, true)) {
			problems.push('city: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.neighborhood, true)) {
			problems.push('neighborhood: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.street, true)) {
			problems.push('sreet: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.number, true)) {
			problems.push('number: não pode ser indefinido ou em branco');
		}
		if (!TypeUtil.isFullString(this.complement, true)) {
			problems.push('complement: não pode ser indefinido ou em branco');
		}
		return problems;
	}
}
