import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private overlayRef: OverlayRef = this.overlay.create({
    hasBackdrop: true,
    backdropClass: 'overlay-backdrop',
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
  });
  busyRequestCount = 0;
  constructor(private overlay: Overlay) {}

  busy() {
    if (this.overlayRef.hasAttached()) this.overlayRef.detach();
    this.busyRequestCount++;
    this.overlayRef.attach(new ComponentPortal(MatSpinner));
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.overlayRef.detach();
    }
  }
}
