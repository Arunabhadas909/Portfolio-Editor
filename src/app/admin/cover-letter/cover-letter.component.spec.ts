import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverLetterComponent } from './cover-letter.component';

describe('CoverLetterComponent', () => {
  let component: CoverLetterComponent;
  let fixture: ComponentFixture<CoverLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverLetterComponent]
    });
    fixture = TestBed.createComponent(CoverLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
