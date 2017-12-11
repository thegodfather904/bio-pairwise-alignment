import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceBarComponent } from './sequence-bar.component';

describe('SequenceBarComponent', () => {
  let component: SequenceBarComponent;
  let fixture: ComponentFixture<SequenceBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
