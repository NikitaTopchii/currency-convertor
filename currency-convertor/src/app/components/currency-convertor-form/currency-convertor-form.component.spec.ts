import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConvertorFormComponent } from './currency-convertor-form.component';

describe('CurrencyConvertorFormComponent', () => {
  let component: CurrencyConvertorFormComponent;
  let fixture: ComponentFixture<CurrencyConvertorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyConvertorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConvertorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
