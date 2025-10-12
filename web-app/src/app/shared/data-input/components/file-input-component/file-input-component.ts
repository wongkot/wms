import { AfterViewInit, Component, computed, input, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  standalone: false,
  templateUrl: './file-input-component.html',
  styleUrl: './file-input-component.css'
})
export class FileInputComponent implements AfterViewInit {
  inputControl = input.required<FormControl>();
  fileTypesFilter = input<string>('');
  maxFileSizeMb = input<number>(2);

  private _isDragOver = signal<boolean>(false);
  private _fileUrl = signal<string>('');
  private _errorMessage = signal<string>('');
  private _maxFileSize = computed<number>(() => {
    return this.maxFileSizeMb() * this.singleMbSize;
  })
  private readonly singleMbSize = 1048576;

  dragOverStyles = computed<object>(() => {
    return {
      'bg-base-100': !this._isDragOver(),
      'bg-base-200': this._isDragOver(),
    };
  });
  get fileUrl() {
    return this._fileUrl.asReadonly();
  }
  get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  ngAfterViewInit(): void {
    if (this.inputControl().getRawValue()) {
      this._fileUrl.set(this.inputControl().getRawValue());
    }
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputFile = inputElement?.files?.item(0) ?? null
    
    this.handleFileChange(inputFile);

    // Remove file from input element
    inputElement.value = '';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const inputFile = event.dataTransfer?.files[0] ?? null;
    this.handleFileChange(inputFile);
    this._isDragOver.set(false);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._isDragOver.set(false);
  }

  onDeleteImage() {
    this._fileUrl.set('');
    this.inputControl().setValue('');
  }

  private handleFileChange(inputFile: File | null) {
    this._errorMessage.set('');
    this._fileUrl.set('');

    if (inputFile) {
      // Validate input
      if (inputFile.size > this._maxFileSize()) {
        const maxFileSizeMb = this._maxFileSize() / this.singleMbSize;
        const currentSizeMb = inputFile.size / this.singleMbSize;
        this._errorMessage.set(`File size has to be less than ${maxFileSizeMb.toFixed(2)} MB (current size: ${currentSizeMb.toFixed(2)} MB)`);
        return;
      }
      if (!this.fileTypesFilter().split(',').includes(inputFile.type)) {
        this._errorMessage.set(`File type "${inputFile.type}" is not a valid type (valid types: ${this.fileTypesFilter()})`);
        return;
      }

      // Convert to URL
      const fileReader = new FileReader();
      fileReader.readAsDataURL(inputFile);
      fileReader.onload = () => {
        const newFileUrl = String(fileReader.result);
        this._fileUrl.set(newFileUrl);
        this.inputControl().setValue(newFileUrl);
      };
      fileReader.onerror = () => {
        this._errorMessage.set('An error has been occurred while processing the file');
      };
    } else {
      this.inputControl().setValue('');
    }
  }
}
