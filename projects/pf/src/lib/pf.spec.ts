import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf } from './pf';

describe('Pf', () => {
  let component: Pf;
  let fixture: ComponentFixture<Pf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
