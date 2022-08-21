import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPollComponent } from './get-poll.component';

describe('GetPollComponent', () => {
  let component: GetPollComponent;
  let fixture: ComponentFixture<GetPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
