import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from "signature_pad";

@Component({
  selector: 'app-doctor-container',
  templateUrl: './doctor-container.component.html',
  styleUrls: ['./doctor-container.component.scss']
})
export class DoctorContainerComponent implements OnInit {

  @ViewChild("canvas", {static: true}) canvas: ElementRef;
  sig: SignaturePad;

  ngOnInit(): void {
    this.sig = new SignaturePad(this.canvas.nativeElement);
    this.resizeCanvas();
  }

  onClickClearSignature(): void {
    this.sig.clear();
  }

  resizeCanvas(): void {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const element = this.canvas.nativeElement;
    element.width = element.offsetWidth * ratio;
    element.height = element.offsetHeight * ratio;
    element.getContext("2d").scale(ratio, ratio);
  }
}
