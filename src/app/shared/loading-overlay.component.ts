import { Component, computed, inject } from '@angular/core';
import { BlockUiService } from '../core/services/block-ui.service';

@Component({
  selector: 'app-block-ui',
  standalone: true,
  template: `
    @if (isBlocked()) {
      <div class="block-ui-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [`
    .block-ui-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .spinner {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #3f51b5;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class BlockUiComponent {
  private service = inject(BlockUiService);
  isBlocked = this.service.isBlocked; // já é signal
}

