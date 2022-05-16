import { Component, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";
import { LoadPhotosAction } from "@gallery/store/photos/photo.actions";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { PageOptionsDto } from "@app/common/dto/page-options.dto";

// TODO ugly naming
interface LinkAndName {
  link: string;
  name: string;
}

@Component({
  selector: 'app-gallery-container',
  templateUrl: './gallery-container.component.html',
  styleUrls: ['./gallery-container.component.scss'],
})
export class GalleryContainerComponent implements OnInit {

  linksAndNames: LinkAndName[] = [
    {name: 'Home', link: '/gallery/home'},
    {name: 'Explorer', link: '/gallery/explorer'},
    {name: 'Lightbox', link: '/gallery/lightbox'},
    {name: 'Upload', link: '/gallery/upload'},
  ];

  activeLink = this.linksAndNames[0].link;

  constructor(private router: Router,
              private location: Location,
              private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.activeLink = this.location.path();
    this.location.onUrlChange(url => this.activeLink = url);
  }

  navigateUrl(link: string): void {
    void this.router.navigateByUrl(link);
  }
}
