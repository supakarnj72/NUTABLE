import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
    selector: 'error-panel',
    styles: [`/*! CSS Used from: https://getbootstrap.com/docs/4.0/dist/css/bootstrap.min.css */
    *,::after,::before{box-sizing:border-box;}
    strong{font-weight:bolder;}
    button{border-radius:0;}
    button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color;}
    button{margin:0;font-family:inherit;font-size:inherit;line-height:inherit;}
    button{overflow:visible;}
    button{text-transform:none;}
    button,html [type=button]{-webkit-appearance:button;}
    [type=button]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none;}
    .fade{opacity:0;transition:opacity .15s linear;}
    .fade.show{opacity:1;}
    .alert{position:relative;padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem;}
    .alert-dismissible{padding-right:4rem;}
    .alert-dismissible .close{position:absolute;top:0;right:0;padding:.75rem 1.25rem;color:inherit;}
    .alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba;}
    .close{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.5;}
    .close:focus,.close:hover{color:#000;text-decoration:none;opacity:.75;}
    button.close{padding:0;background-color:transparent;border:0;-webkit-appearance:none;}
    @media print{
    *,::after,::before{text-shadow:none!important;box-shadow:none!important;}
    }`],
    template: `
    <span #errorBar></span>
    <div class="row" *ngIf="!!messages && messages.length>0">
            <div class="col-12">
                <div class="alert alert-dismissible fade show" [class.alert-danger]="type==='E'" [class.alert-warning]="type==='W'" role="alert">
                    
                    <ng-container *ngFor="let message of messages">
                        <span style="display: block;" [innerHTML]="message | safeHtml"></span>
                    </ng-container>

                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="onClose()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    `
})
export class ErrorPanelComponent implements IErrorPanel {
    @ViewChild('errorBar') errorBar!: ElementRef;
    public messages: string[] = []
    public type: string = 'E'
    public setError(messages: string[]): void {
        this.type = 'E'
        this.messages = messages;
    }

    public onClose(): void {
        this.clearError();
    }

    public clearError(): void {
        this.messages = [];
    }
    public setWarning(messages: string[]): void {
        this.type = 'W'
        this.messages = messages;;
    }

    public scrollToError(): void {
        this.errorBar.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
}

export interface IErrorPanel {
    setError(messages: string[]): void;
    setWarning(messages: string[]): void;
    clearError(): void;
    scrollToError(): void;
}