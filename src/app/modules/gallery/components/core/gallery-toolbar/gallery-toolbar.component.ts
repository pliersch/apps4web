import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

enum View {
  Home = 1,
  Explorer,
  Lightbox,
  Upload
}

@Component({
  selector: 'app-gallery-toolbar',
  templateUrl: './gallery-toolbar.component.html',
  styleUrls: ['./gallery-toolbar.component.scss']
})
export class GalleryToolbarComponent implements OnInit {

  @Input() data: any;

  viewType = View;
  view = View.Home;
  icon = 'arrow_downward';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.view = this.updateView(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.view = this.updateView(this.router.url);
      }
    });
  }

  updateView(url: string): View {
    switch (url) {
      // case '/gallery/home':
      //   return View.Home;
      case '/gallery/explorer':
        return View.Explorer;
      case '/gallery/lightbox':
        return View.Lightbox;
      case '/gallery/upload':
        return View.Upload;
      default:
        return View.Home;
    }
  }

  emitSwitchView(): void {
    // this.eventBus.emit(new EventData('switchView')); // write service!
    this.icon = this.icon === 'arrow_downward' ? 'arrow_forward' : 'arrow_downward';
  }

  openFilterMenu(): void {
    // this.eventBus.emit(new EventData('filterPhotos')); // write service!
  }

  emitClearComparePhotos(): void {
    // this.eventBus.emit(new EventData('ClearComparePhotos')); // write service!
  }
}
