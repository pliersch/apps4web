import { animate, animateChild, animation, group, query, style, transition, trigger } from '@angular/animations';

// export const fooAnimation = animation([
//   state('open', style({
//     opacity: 1,
//     backgroundColor: 'yellow'
//   })),
//   state('closed', style({
//     opacity: 0.8,
//     backgroundColor: 'blue'
//   })),
//   transition('open => closed', [
//     animate('1s')
//   ]),
//   transition('closed => open', [
//     animate('0.5s')
//   ]),
// ]);


export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
    color: '{{ color }}'
  }),
  animate('{{ time }}')
]);

// Routable animations
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> AboutPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild())
    ]),
    transition('* <=> FilterPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild())
    ])
  ]);
