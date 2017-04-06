import {
    ApplicationRef, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable,
    Injector, ReflectiveInjector, TemplateRef
} from '@angular/core';
import { BsModalBackdropComponent } from './bs-modal-backdrop';
import { BsModalWindowComponent } from './bs-modal-window';
import { isDefined, isString } from './utils';
import { ContentRef } from './popup';
import { BsModalRef } from './bs-modal-ref';
import { BsActiveModal } from './bs-active-modal';

@Injectable()
export class BsModalStack {
    private _backdropFactory: ComponentFactory<BsModalBackdropComponent>;
    private _windowFactory: ComponentFactory<BsModalWindowComponent>;

    constructor(
        private _applicationRef: ApplicationRef, private _injector: Injector,
        private _componentFactoryResolver: ComponentFactoryResolver) {
        this._backdropFactory = _componentFactoryResolver.resolveComponentFactory(BsModalBackdropComponent);
        this._windowFactory = _componentFactoryResolver.resolveComponentFactory(BsModalWindowComponent);
    }

    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options: any): BsModalRef {
        const containerSelector = options.container || 'body';
        const containerEl = document.querySelector(containerSelector);

        if (!containerEl) {
            throw new Error(`The specified modal container "${containerSelector}" was not found in the DOM.`);
        }

        const activeModal: BsActiveModal = new BsActiveModal();
        const contentRef: ContentRef = this._getContentRef(moduleCFR, contentInjector, content, activeModal);

        let windowCmptRef: ComponentRef<BsModalWindowComponent>;
        let backdropCmptRef: ComponentRef<BsModalBackdropComponent>;
        let ngbModalRef: BsModalRef;


        if (options.backdrop !== false) {
            backdropCmptRef = this._backdropFactory.create(this._injector);
            this._applicationRef.attachView(backdropCmptRef.hostView);
            containerEl.appendChild(backdropCmptRef.location.nativeElement);
        }
        windowCmptRef = this._windowFactory.create(this._injector, contentRef.nodes);
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);

        ngbModalRef = new BsModalRef(windowCmptRef, contentRef, backdropCmptRef);

        activeModal.close = (result: any) => { ngbModalRef.close(result); };
        activeModal.dismiss = (reason: any) => { ngbModalRef.dismiss(reason); };

        this._applyWindowOptions(windowCmptRef.instance, options);

        return ngbModalRef;
    }

    private _applyWindowOptions(windowInstance: BsModalWindowComponent, options: Object): void {
        ['backdrop', 'keyboard', 'size', 'windowClass'].forEach((optionName: string) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }

    private _getContentRef(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any,
                           context: BsActiveModal): ContentRef {
        if (!content) {
            return new ContentRef([]);
        } else if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        } else if (isString(content)) {
            return new ContentRef([[document.createTextNode(`${content}`)]]);
        } else {
            const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
            const modalContentInjector =
                ReflectiveInjector.resolveAndCreate([{provide: BsActiveModal, useValue: context}], contentInjector);
            const componentRef = contentCmptFactory.create(modalContentInjector);
            this._applicationRef.attachView(componentRef.hostView);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
    }
}