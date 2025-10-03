import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWriterComponent } from './avatar-writer.component';

describe('AvatarWriterComponent', () => {
  let component: AvatarWriterComponent;
  let fixture: ComponentFixture<AvatarWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarWriterComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AvatarWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
