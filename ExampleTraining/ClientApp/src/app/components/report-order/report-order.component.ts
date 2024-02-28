import { Component } from '@angular/core';
import { IErrorPanel } from '../error-panel/error-panel.component';

@Component({
  selector: 'report-order',
  templateUrl: './report-order.component.html',
  styleUrls: ['./report-order.component.css']
})
export class ReportOrderComponent {

  constructor() { }

  public exampleActionComplete(errorPanelModal: IErrorPanel) {
    errorPanelModal?.clearError();
  }

  public exampleError(errorPanelModal: IErrorPanel) {
    errorPanelModal?.clearError();
    let error = {
      messages: [
        'This is error 1',
        'This is error 2',
        'This is error 3'
      ],
    }
    errorPanelModal?.setError(error.messages);
  }
}
