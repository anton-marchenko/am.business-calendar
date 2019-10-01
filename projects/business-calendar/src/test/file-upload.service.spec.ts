import { TestBed } from '@angular/core/testing';
import {FileUploadService} from '../lib/file-upload.service';

describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    expect(service).toBeTruthy();
  });

  it('should file be read', () => {
    const service: FileUploadService = TestBed.get(FileUploadService);
    const fileContent = 'test';
    const fakeFile = new File([fileContent], 'filename', {type: 'text/csv'});

    service.upload(fakeFile).then(result => expect(result).toBe(fileContent));
  });
});
