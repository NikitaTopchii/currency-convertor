import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCurrencyComponent } from './header-currency.component';

describe('HeaderCurrencyComponent', () => {
  let component: HeaderCurrencyComponent;
  let fixture: ComponentFixture<HeaderCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCurrencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
