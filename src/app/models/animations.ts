import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
export const slideInAnimation =
  trigger('routeAnimations', [

    transition('ProfPage => HomePage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateX(-100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)'}),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('HomePage => ProfPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateX(100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)'}),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),


    transition('DecPage => HomePage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateX(100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)'}),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('HomePage => DecPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter',[
          style({ transform: 'translateX(-100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform:   'translateX(0%)'}),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),



    transition('NewDecPage => HomePage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(-900px)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(900px)' }))
        ], { optional: true }),
      ])
    ]),
    transition('HomePage => NewDecPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(900px)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(-900px)' }))
        ], { optional: true }),
      ])
    ]),



    transition('NewDecPage => ProfPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('NewDecPage => DecPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),


    transition('ProfPage => DecPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-200%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(200%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('DecPage => ProfPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.28s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),


    transition('DecPage => NewDecPage', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(900px)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.32s ease-in-out',
            style({ transform: 'translateY(-900px)' }))
        ], { optional: true }),
      ])
    ]),
  ]);
