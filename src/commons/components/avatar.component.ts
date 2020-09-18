import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'th-avatar',
	template: ` <div id="{{ id }}" class="avatar">{{ initials }}</div> `,
	styles: [
		`
			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				font-size: 20px;
				color: #ffffff;
				text-align: center;
				line-height: 40px;
			}
		`
	]
})
export class AvatarComponent implements AfterViewInit {
	public id: string;

	@Input()
	public name: string;

	public constructor() {
		this.id = 'avatar-' + String(Math.floor(Math.random() * 100000000));
	}

	public get initials(): string {
		let output: string = '';
		if (this.name !== null && this.name !== undefined) {
			let parts: Array<string> = this.name.split(' ');
			output = parts[0].length > 0 ? parts[0].substring(0, 1) : '';
			output += parts[parts.length - 1].length > 0 ? parts[parts.length - 1].substring(0, 1) : '';
		}
		return output;
	}

	public ngAfterViewInit(): void {
		let element = document.getElementById(this.id);
		element.style.backgroundColor = '#9D9D9D';
	}
}
