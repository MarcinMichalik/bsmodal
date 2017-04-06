import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalWindowComponent } from './bs-modal-window';
import { BsModalBackdropComponent } from './bs-modal-backdrop';
import { BsModal } from './bs-modal';
import { BsModalStack } from './bs-modal-stack';

@NgModule({
    declarations: [
        BsModalWindowComponent,
        BsModalBackdropComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        BsModal
    ],
    entryComponents: [
        BsModalWindowComponent,
        BsModalBackdropComponent
    ]
})
export class BsModalModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BsModalModule,
            providers: [BsModal, BsModalStack]
        };
    }

}