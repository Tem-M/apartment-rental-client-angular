import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupadvertiserComponent } from './signupadvertiser.component';

describe('SignupadvertiserComponent', () => {
  let component: SignupadvertiserComponent;
  let fixture: ComponentFixture<SignupadvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupadvertiserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupadvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
