import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-search-bar',
	standalone: false,
	templateUrl: './search-bar-component.html',
	styleUrl: './search-bar-component.css'
})
export class SearchBarComponent {
	private readonly _fb = inject(FormBuilder);
	public readonly placeHolder = input<string>('');
	public readonly textChanged = output<string>();
	public searchForm: FormGroup = this._fb.group({
		searchTerm: '',
	});

	public onSubmit(): void {
		this.textChanged.emit(this.searchForm.get('searchTerm')?.value);
	}
}
