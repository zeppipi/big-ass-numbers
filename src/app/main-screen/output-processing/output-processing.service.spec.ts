import { TestBed } from '@angular/core/testing';

import { OutputProcessingService } from './output-processing.service';

describe('OutputProcessingService', () => {
  let service: OutputProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
