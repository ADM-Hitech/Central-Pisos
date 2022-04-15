import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { appAnimations } from '../../../../core/animations';

@Component({
    selector: 'app-content-about-us',
    templateUrl: './content-about-us.component.html',
    styleUrls: ['./content-about-us.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentAboutUsComponent implements AfterViewInit {

    @ViewChild('video') videoPlayer;

    constructor() {}

    ngAfterViewInit(): void {
        console.log(this.videoPlayer);
    }
}
