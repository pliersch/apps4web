BUGS

- gelöschte fotos ggf aus downloads entfernen

NGXS

- impl router state! (app/stores/router.state)
- schauen, ob selectOnce möglich ist
- unsubscription prüfen
- impl: state properties loaded & loading
- index der photos müssen nach delete neu gesetzt werden. andere Lösung?
  -> currentPhoto = photos[currentIndex]
- updateMany Lösung?
  https://stackoverflow.com/questions/71086279/how-to-apply-updateitem-to-multiple-all-items-in-ngxs
  // ctx.setState(
  // patch({
  // rabbits: compose(...updateItems),
  // })
  // );

- chat und gallery nutzen denselben service (photoservice)
- gallery versuchen gemeinsamen code der pages in gallery-container zu extrahieren
- gallery evtl im ImageControl nur bei hover bzw. download cdk-overlay nutzen (also erst wenn nötig)
- alt property für img
- scroller(photo) haben feste werte
- sharemodule prüfen (wird in anderen modulen importiert) macht es sinn(größe, geschwindigkeit)?
- gallery pages einführen?
- optimize photo-obj im frontend sind createDateTime, lastChangedDateTime und lastChangedBy unnötig
- gallery request new photos auch bei resize des viewports? wenn kleiner viewport, und dann großer wird
  request nicht ausgeführt. eigentlich kein use-case

- Can't resolve 'google-one-tap' wenn account oder google importiert wird

BACKEND

- upload/update photo gibt user anstatt nur userId zurück

- typeORM updates werden nicht genutzt
  - https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it
  - The key is returning response.raw[0] in order to get the type back.

- configure eslintrc. is disabled: @typescript-eslint/explicit-member-accessibility
- Add / Remove tags optimieren? z.zt. werden die tags am stück ersetzt
- optimize/refactor routes:
  - Example1:
    export const APP_ROUTES: Routes = [
    {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
    },
    {
    path: 'home',
    component: HomeComponent
    }
    ];

so gehts doch ohne Konstanten
export interface DialogData {
animal: 'panda' | 'unicorn' | 'lion';
}
https://material.angular.io/components/dialog/examples
