import { AfterViewInit, Component, computed, input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAX_FILE_SIZE_MB, MESSAGES } from '@app/core/constants/app';

@Component({
  selector: 'app-file-input',
  standalone: false,
  templateUrl: './file-input-component.html',
  styleUrl: './file-input-component.css'
})
export class FileInputComponent implements AfterViewInit {
  public readonly inputControl = input.required<FormControl>();
  public readonly fileTypesFilter = input<string>('');
  public readonly maxFileSizeMb = input<number>(MAX_FILE_SIZE_MB);
  public readonly dragOverStyles = computed<object>(() => {
    return {
      'bg-base-100': !this._isDragOver(),
      'bg-base-200': this._isDragOver(),
    };
  });
  private readonly _isDragOver = signal<boolean>(false);
  private readonly _fileUrl = signal<string>('');
  private readonly _errorMessage = signal<string>('');
  private readonly _maxFileSize = computed<number>(() => {
    return this.maxFileSizeMb() * this.singleMbSize;
  });
  private readonly singleMbSize = 1048576;

  public get fileUrl() {
    return this._fileUrl.asReadonly();
  }

  public get errorMessage() {
    return this._errorMessage.asReadonly();
  }

  public ngAfterViewInit(): void {
    if (this.inputControl().getRawValue()) {
      this._fileUrl.set(this.inputControl().getRawValue());
    }
  }

  public onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputFile = inputElement?.files?.item(0) ?? null

    this.handleFileChange(inputFile);

    // Remove file from input element
    inputElement.value = '';
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const inputFile = event.dataTransfer?.files[0] ?? null;
    this.handleFileChange(inputFile);
    this._isDragOver.set(false);
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._isDragOver.set(true);
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._isDragOver.set(false);
  }

  public onDeleteImage(): void {
    this._fileUrl.set('');
    this.inputControl().setValue('');
  }

  private handleFileChange(inputFile: File | null): void {
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
