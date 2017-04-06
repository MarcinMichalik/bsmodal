import { Injectable } from '@angular/core';

@Injectable()
export class BsActiveModal {
    /**
     * Can be used to close a modal, passing an optional result.
     */
    close(result?: any): void {}

    /**
     * Can be used to dismiss a modal, passing an optional reason.
     */
    dismiss(reason?: any): void {}
}