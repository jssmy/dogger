import { ComponentFixture, TestBed } from '@angular/core/testing';
import DraftBlogComponent from './draft-blog.component';

describe('DraftBlogComponent', () => {
  let component: DraftBlogComponent;
  let fixture: ComponentFixture<DraftBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftBlogComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DraftBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
