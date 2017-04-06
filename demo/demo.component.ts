import {Component} from '@angular/core';
import {BsModal, BsModalDismissReason} from "../src";
import {ModalComponent} from "./modal-component";

@Component({
    selector: 'bs-demo-app',
    templateUrl: './demo.component.html'
})
export class DemoComponent {
    closeResult: string;

    constructor(private modalService: BsModal) {}

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openComponent(){
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.name = 'World';
        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openCustomClass(content, options){
        this.modalService.open(content, options).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === BsModalDismissReason.ESC) {
            return 'by pressing ESC';
        } else if (reason === BsModalDismissReason.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }
}