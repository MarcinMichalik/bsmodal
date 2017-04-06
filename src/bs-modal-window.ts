import {
    AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    Renderer2
} from '@angular/core';
import { BsModalDismissReason } from './bs-modal-dismiss-reason';


@Component({
    selector: 'bs-modal-window',
    host: {
        '[class]': '"modal fade show" + (windowClass ? " " + windowClass : "")',
        'role': 'dialog',
        'tabindex': '-1',
        'style': 'display: block;',
        '(keyup.esc)': 'escKey($event)',
        '(click)': 'backdropClick($event)'
    },
    template: `
        <div [class]="'modal-dialog' + (size ? ' modal-' + size : '')" role="document">
            <div class="modal-content"><ng-content></ng-content></div>
        </div>
    `
})
export class BsModalWindowComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() backdrop: boolean | string = true;
    @Input() keyboard = true;
    @Input() size: string;
    @Input() windowClass: string;

    @Output('dismiss') dismissEvent = new EventEmitter();

    // private _elWithFocus: Element;
    private _elWithFocus: HTMLElement;

    constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

    ngOnInit(): void {
        this._elWithFocus = <HTMLElement>document.activeElement;
        // this._renderer.setElementClass(document.body, 'modal-open', true);
        this._renderer.addClass(document.body, 'modal-open');
    }

    ngAfterViewInit(): void {
        if (!this._elRef.nativeElement.contains(document.activeElement)) {
            // this._renderer.invokeElementMethod(this._elRef.nativeElement, 'focus', []);
            this._elRef.nativeElement.focus();
        }
    }

    ngOnDestroy(): void {
        if (this._elWithFocus && document.body.contains(this._elWithFocus)) {
            // this._renderer.invokeElementMethod(this._elWithFocus, 'focus', []);
            this._elWithFocus.focus();
        } else {
            // this._renderer.invokeElementMethod(document.body, 'focus', []);
            document.body.focus();
        }

        this._elWithFocus = null;
        // this._renderer.setElementClass(document.body, 'modal-open', false);
        this._renderer.removeClass(document.body, 'modal-open');
    }

    backdropClick($event: any): void {
        if (this.backdrop === true && this._elRef.nativeElement === $event.target) {
            this.dismiss(BsModalDismissReason.BACKDROP_CLICK);
        }
    }

    escKey($event: any): void {
        if (this.keyboard && !$event.defaultPrevented) {
            this.dismiss(BsModalDismissReason.ESC);
        }
    }

    dismiss(reason: any): void { this.dismissEvent.emit(reason); }
}