import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalModule } from '../src';
import { DemoComponent } from './demo.component';
import {ModalComponent} from "./modal-component";

@NgModule({
  declarations: [DemoComponent, ModalComponent],
  imports: [BrowserModule, BsModalModule.forRoot()],
  bootstrap: [DemoComponent],
  entryComponents: [ModalComponent]
})
export class DemoModule {}