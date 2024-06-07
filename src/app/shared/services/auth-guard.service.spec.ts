import { TestBed } from "@angular/core/testing";

import { AdminAuthGuardService } from "./auth-guard.service";

describe("AuthGuardService", () => {
  let service: AdminAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuardService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
