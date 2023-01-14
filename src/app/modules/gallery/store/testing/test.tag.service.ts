import { Injectable } from "@angular/core";
import { TagService } from "@gallery/services/tag.service";

@Injectable()
/**
 * FakeHeroService pretends to make real http requests.
 * implements only as much of HeroService as is actually consumed by the app
 */
export class TestTagService extends TagService {


  constructor() {
    super(null!);
  }
}
