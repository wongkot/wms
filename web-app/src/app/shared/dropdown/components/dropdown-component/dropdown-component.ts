import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-dropdown',
	standalone: false,
	templateUrl: './dropdown-component.html',
	styleUrl: './dropdown-component.css'
})
export class DropdownComponent implements AfterViewInit {
	private readonly _fb = inject(FormBuilder);
	public readonly prefix = input<string>('');
	public readonly options = input<KeyValue<string, string>[]>([]);
	public readonly selectionChanged = output<string>();
	public selectionForm: FormGroup = this._fb.group({
		option: '',
	});

	public ngAfterViewInit(): void {
		// Set dropdown value to first item by default
		if (this.options().length > 0) {
			this.selectionForm.get('option')?.setValue(this.options()[0].key);
		}
	}

	public onSelectionChanged(): void {
		this.selectionChanged.emit(this.selectionForm.get('option')?.value);
	}
}
