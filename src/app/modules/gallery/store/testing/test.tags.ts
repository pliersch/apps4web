import { Tag, TagGroup } from "@gallery/store/tags/tag.model";

export function getFooBarTagGroups(): TagGroup[] {
  return [{
    id: 'groupFoo',
    name: 'Foo',
    priority: 1,
    tags: [{
      id: 'foo1',
      name: 'Foo1'
    }, {
      id: 'foo2',
      name: 'Foo2'
    }]
  }, {
    id: 'groupBar',
    name: 'Bar',
    priority: 10,
    tags: [{
      id: 'bar1',
      name: 'Bar1'
    }, {
      id: 'bar2',
      name: 'Bar2'
    }]
  }];
}

export function getBazTagGroup(): TagGroup {
  return {
    id: 'groupBaz',
    name: 'Baz',
    priority: 20,
    tags: [{
      id: 'baz1',
      name: 'Baz1'
    }]
  };
}

export function getFoo1Bar2Tags(): Tag[] {
  return [{
    id: 'foo1',
    name: 'Foo1'
  }, {
    id: 'bar2',
    name: 'Bar2'
  }];
}
