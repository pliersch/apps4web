import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  PushMessageEvent,
  PushMessageListener,
  ServerPushService
} from "@app/common/services/server-push.service";

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
export class GalleryContainerComponent implements OnInit, OnDestroy, PushMessageListener {

  linksAndNames: LinkAndName[] = [
    // {name: 'Home', link: '/gallery/home'},
    {name: 'Explorer', link: '/gallery/explorer'},
    {name: 'Slideshow', link: '/gallery/slideshow'},
    {name: 'Lightbox', link: '/gallery/lightbox'},
    {name: 'Upload', link: '/gallery/upload'},
  ];

  activeLink = this.linksAndNames[0].link;

  constructor(private router: Router,
              private location: Location,
              private pushService: ServerPushService
  ) { }

  ngOnInit(): void {
    this.pushService.addListener(PushMessageEvent.META_CHANGED, this);
    this.pushService.addListener(PushMessageEvent.TAGS_CHANGED, this);
    this.pushService.addListener(PushMessageEvent.PHOTOS_CHANGED, this);
    this.activeLink = this.location.path();
    this.location.onUrlChange(url => this.activeLink = url);
  }

  ngOnDestroy(): void {
    this.pushService.removeListener(PushMessageEvent.META_CHANGED, this);
    this.pushService.removeListener(PushMessageEvent.TAGS_CHANGED, this);
    this.pushService.removeListener(PushMessageEvent.PHOTOS_CHANGED, this);
  }

  navigateUrl(link: string): void {
    void this.router.navigateByUrl(link);
  }

  onServerPushMessage(event: PushMessageEvent): void {
    console.log('GalleryContainerComponent onServerPushMessage: ', event.type)
  }
}
