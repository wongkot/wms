import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.css'
})
export class SearchBarComponent {
	placeHolder = input<string>('');
  textChanged = output<string>();
	public searchForm: FormGroup;

  constructor(public fb: FormBuilder) {
		this.searchForm = this.fb.group({
			searchTerm: '',
		});
	}

	public onSubmit(): void {
		this.textChanged.emit(this.searchForm.get('searchTerm')?.value);
	}
}
