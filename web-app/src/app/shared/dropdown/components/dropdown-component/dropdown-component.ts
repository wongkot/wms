import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.css'
})
export class DropdownComponent implements AfterViewInit {
  prefix = input<string>('');
  options = input<KeyValue<string, string>[]>([]);
	selectionChanged = output<string>();

	public selectionForm: FormGroup;

	constructor(public fb: FormBuilder) {
		this.selectionForm = this.fb.group({
			option: '',
		});
	}

	ngAfterViewInit(): void {
		// Set dropdown value to first item by default
		if (this.options().length > 0) {
			this.selectionForm.get('option')?.setValue(this.options()[0].key);
		}
	}

	public onSelectionChanged(): void {
		this.selectionChanged.emit(this.selectionForm.get('option')?.value);
	}
}
