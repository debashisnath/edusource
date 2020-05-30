import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSixComponent } from './class-six.component';

describe('ClassSixComponent', () => {
  let component: ClassSixComponent;
  let fixture: ComponentFixture<ClassSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
