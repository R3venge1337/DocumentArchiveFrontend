import { TestBed } from '@angular/core/testing';

import { GeneratorPkceCredentialsService } from './generator-pkce-credentials.service';

describe('GeneratorPkceCredentialsService', () => {
  let service: GeneratorPkceCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorPkceCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
