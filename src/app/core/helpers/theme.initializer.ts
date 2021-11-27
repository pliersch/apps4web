import {Store} from '@ngxs/store';
import {ToggleAction} from "@modules/themes/stores/toggle-action";
import {Themes} from "@modules/themes/themes";

export function initTheme(store: Store): () => Promise<unknown> {
  return () => {
    return new Promise<void>((resolve, reject) => {
      let item = localStorage.getItem('theme') || Themes.Dark;
      store.dispatch(new ToggleAction({theme: item}));
      resolve();
    });
  };
}

