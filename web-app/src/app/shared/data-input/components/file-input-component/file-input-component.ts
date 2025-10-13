import { AfterViewInit, Component, computed, input, output, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAX_FILE_SIZE_MB, MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-file-input',
  standalone: false,
  templateUrl: './file-input-component.html',
  styleUrl: './file-input-component.css'
})
export class FileInputComponent implements AfterViewInit {
  inputControl = input.required<FormControl>();
  fileTypesFilter = input<string>('');
  maxFileSizeMb = input<number>(MAX_FILE_SIZE_MB);

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
        this._errorMessage.set(MESSAGES.INVALID_FILE_SIZE(maxFileSizeMb.toFixed(2), currentSizeMb.toFixed(2)));
        return;
      }
      if (!this.fileTypesFilter().split(',').includes(inputFile.type)) {
        this._errorMessage.set(MESSAGES.INVALID_FILE_TYPE(inputFile.type, this.fileTypesFilter()));
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
        this._errorMessage.set(MESSAGES.PROCESS_FILE_ERROR);
      };
    } else {
      this.inputControl().setValue('');
    }
  }
}
