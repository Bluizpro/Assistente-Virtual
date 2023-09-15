import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirChatComponent } from './abrir-chat.component';

describe('AbrirChatComponent', () => {
  let component: AbrirChatComponent;
  let fixture: ComponentFixture<AbrirChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirChatComponent]
    });
    fixture = TestBed.createComponent(AbrirChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
