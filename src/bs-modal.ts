import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { BsModalOptions } from './bs-modal-option';
import { BsModalRef } from './bs-modal-ref';
import { BsModalStack } from './bs-modal-stack';

@Injectable()
export class BsModal {
    constructor(private _moduleCFR: ComponentFactoryResolver, private _injector: Injector, private _modalStack: BsModalStack) {}

    /**
     * Opens a new modal window with the specified content and using supplied options. Content can be provided
     * as a TemplateRef or a component type. If you pass a component type as content than instances of those
     * components can be injected with an instance of the NgbActiveModal class. You can use methods on the
     * NgbActiveModal class to close / dismiss modals from "inside" of a component.
     */
    open(content: any, options: BsModalOptions = {}): BsModalRef {
        return this._modalStack.open(this._moduleCFR, this._injector, content, options);
    }
}