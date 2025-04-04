import { ComponentFixture, TestBed } from '@angular/core/testing';
import PublicBlogComponent from './public-blog.component';



describe('PublicBlogComponent', () => {
  let component: PublicBlogComponent;
  let fixture: ComponentFixture<PublicBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
