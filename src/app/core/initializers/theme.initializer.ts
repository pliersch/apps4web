import { ToggleAction } from "@modules/themes/stores/toggle-action";
import { Themes } from "@modules/themes/themes";
import { Store } from '@ngxs/store';

export function initTheme(store: Store): () => Promise<any> {
  return (): Promise<unknown> => {
    return new Promise<void>((resolve) => {
      const item = localStorage.getItem('theme') || Themes.Dark;
      store.dispatch(new ToggleAction({theme: item}));
      resolve();
    });
  };
}

