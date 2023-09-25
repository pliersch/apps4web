import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: `button[mat-button][loading], button[mat-raised-button][loading], button[mat-icon-button][loading],
             button[mat-fab][loading], button[mat-mini-fab][loading], button[mat-stroked-button][loading],
             button[mat-flat-button][loading]`,
    standalone: true
})
export class MatButtonLoadingDirective implements OnChanges {
  private readonly spinnerFactory: ComponentFactory<MatProgressSpinner>;
  private spinner: ComponentRef<MatProgressSpinner>;

  @Input()
  loading: boolean;

  @Input()
  disabled: boolean;

  @Input()
  color: ThemePalette;

  constructor(
    private matButton: MatButton,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private nativeElement: Element
  ) {
    // TODO use angular13 way https://www.heise.de/news/JavaScript-Angular-13-schneidet-alte-Zoepfe-ab-6251255.html
    this.spinnerFactory = this.componentFactoryResolver.resolveComponentFactory(MatProgressSpinner);
    this.nativeElement = this.matButton._elementRef.nativeElement as Element;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.loading) {
      return;
    }

    if (changes.loading.currentValue) {
      this.nativeElement.classList.add('mat-loading');
      this.matButton.disabled = true;
      this.createSpinner();
    } else if (!changes.loading.firstChange) {
      this.nativeElement.classList.remove('mat-loading');
      this.matButton.disabled = this.disabled;
      this.destroySpinner();
    }
  }

  private createSpinner(): void {
    if (!this.spinner) {
      this.spinner = this.viewContainerRef.createComponent(this.spinnerFactory);
      this.spinner.instance.color = this.color;
      this.spinner.instance.diameter = 20;
      this.spinner.instance.mode = 'indeterminate';
      this.renderer.appendChild(
        this.matButton._elementRef.nativeElement,
        this.spinner.instance._elementRef.nativeElement
      );
    }
  }

  private destroySpinner(): void {
    if (this.spinner) {
      this.spinner.destroy();
      // this.spinner = null;
    }
  }
}
