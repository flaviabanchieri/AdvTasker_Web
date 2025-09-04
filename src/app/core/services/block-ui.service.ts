// block-ui.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockUiService {
  private _isBlocked = signal(false);
  isBlocked = this._isBlocked.asReadonly();

  show() {
    this._isBlocked.set(true);
  }

  hide() {
    this._isBlocked.set(false);
  }
}
