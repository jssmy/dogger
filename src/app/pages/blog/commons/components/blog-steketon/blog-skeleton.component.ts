import { ShimmerComponent } from '@/app/commons/components/shimmer/shimmer.component';
import { Component } from '@angular/core';

@Component({
    selector: 'bgz-blog-skeleton',
    templateUrl: './blog-skeleton.component.html',
    styleUrl: './blog-skeleton.component.scss',
    imports: [ShimmerComponent]
})
export default class BlogSkeletonComponent {

}