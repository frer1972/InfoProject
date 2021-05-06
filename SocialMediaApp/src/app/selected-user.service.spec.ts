import { TestBed } from '@angular/core/testing';

import { SelectedUserService } from './selected-user.service';

describe('SelectedUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedUserService = TestBed.get(SelectedUserService);
    expect(service).toBeTruthy();
  });
});
