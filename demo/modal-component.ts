import {Component, Input} from "@angular/core";
import {BsActiveModal} from "../src";

@Component({
    selector: 'bs-modal-content',
    templateUrl: './modal-component.html'
})
export class ModalComponent{
    @Input() name;

    constructor(public activeModal: BsActiveModal) {}
}