import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTradesComponent } from './manage-trades.component';

describe('ManageTradesComponent', () => {
  let component: ManageTradesComponent;
  let fixture: ComponentFixture<ManageTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
