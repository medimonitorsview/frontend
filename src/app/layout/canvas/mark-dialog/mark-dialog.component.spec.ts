import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDialogComponent } from './mark-dialog.component';

describe('MarkDialogComponent', () => {
  let component: MarkDialogComponent;
  let fixture: ComponentFixture<MarkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
