import { ComponentRef, Injectable } from '@angular/core';
import { ContentRef } from './popup';
import { BsModalWindowComponent } from './bs-modal-window';
import { BsModalBackdropComponent } from './bs-modal-backdrop';

@Injectable()
export class BsModalRef {

    /**
     * A promise that is resolved when a modal is closed and rejected when a modal is dismissed.
     */
    public result: Promise<any>;
    private _resolve: (result?: any) => void;
    private _reject: (reason?: any) => void;

    // result2: BehaviorSubject<any>;

    constructor(private _windowCmptRef: ComponentRef<BsModalWindowComponent>, private _contentRef: ContentRef,
                private _backdropCmptRef?: ComponentRef<BsModalBackdropComponent>) {
        _windowCmptRef.instance.dismissEvent.subscribe((reason: any) => { this.dismiss(reason); });

        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => {});

        // this.result2 = new BehaviorSubject("a");
    }

    /**
     * The instance of component used as modal's content.
     * Undefined when a TemplateRef is used as modal's content.
     */
    get componentInstance(): any {
        if (this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }

    // only needed to keep TS1.8 compatibility
    set componentInstance(instance: any) {}



    /**
     * Can be used to close a modal, passing an optional result.
     */
    close(result?: any): void {
        if (this._windowCmptRef) {
            this._resolve(result);
            // this.result2.next(result);
            this._removeModalElements();
        }
    }

    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    dismiss(reason?: any): void {
        if (this._windowCmptRef) {
            this._reject(reason);
            // this.result2.error(reason);
            this._removeModalElements();
        }
    }

    private _removeModalElements() {
        const windowNativeEl = this._windowCmptRef.location.nativeElement;
        windowNativeEl.parentNode.removeChild(windowNativeEl);
        this._windowCmptRef.destroy();

        if (this._backdropCmptRef) {
            const backdropNativeEl = this._backdropCmptRef.location.nativeElement;
            backdropNativeEl.parentNode.removeChild(backdropNativeEl);
            this._backdropCmptRef.destroy();
        }

        if (this._contentRef && this._contentRef.viewRef) {
            this._contentRef.viewRef.destroy();
        }

        this._windowCmptRef = null;
        this._backdropCmptRef = null;
        this._contentRef = null;
    }
}