import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  upload(file: File): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = () => reject(reader.result.toString());
    });
  }
}
