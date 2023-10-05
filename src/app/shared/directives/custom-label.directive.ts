import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  private _color: string = 'red';

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  ngOnInit() {}

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage() {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }
    const errors = Object.keys(this._errors);
    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerText = `Minimo ${current}/${min} caracteres`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo';
      return;
    }
  }
}
