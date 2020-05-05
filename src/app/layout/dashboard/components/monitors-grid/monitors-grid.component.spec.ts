import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsGridComponent } from './monitors-grid.component';

describe('MonitorsGridComponent', () => {
  let component: MonitorsGridComponent;
  let fixture: ComponentFixture<MonitorsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
