import { TestBed, inject } from '@angular/core/testing';

import { FireBaseService } from './fire-base.service';

describe('FireBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireBaseService]
    });
  });

  it('should be created', inject([FireBaseService], (service: FireBaseService) => {
    expect(service).toBeTruthy();
  }));
});
