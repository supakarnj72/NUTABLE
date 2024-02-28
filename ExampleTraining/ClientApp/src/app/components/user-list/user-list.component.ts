import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { event } from 'devextreme/events';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, throwError } from 'rxjs';
import { ChangePasswordParam, CreateUserParam, UpdateUserParam } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { IErrorPanel } from '../error-panel/error-panel.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild('errorPanelModal') public errorPanal!: IErrorPanel;
  @ViewChild("userGrid") userGrid!: DxDataGridComponent;

  public modalCreate?: BsModalRef;

  public dataSource!: any;
  public allowedPageSizes = [5];
  public displayMode = 'full'
  public showInfo = true;
  public showNavButtons = true;

  public users: any[] = [];

  public canWrite: boolean;

  public createUserForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  public username: string = '';
  public userId?: number;

  public changePasswordForm = new FormGroup({
    password: new FormControl(),
    newPassword: new FormControl(),
    confirmPassword: new FormControl()
  })

  public updateUserForm = new FormGroup({
    username: new FormControl()
  })

  constructor(private router: Router,
    private modalService: BsModalService,
    private userService: UserService,
    public authService: AuthService) {
      console.log("constructor");
      
      this.canWrite = this.authService.canWrite;
  }

  ngOnInit() {
    this.QueryAllUser()
  }

  public QueryAllUser(): void {
    this.userService.queryAllUser().subscribe((data) => {
      this.dataSource = data;
    });
  }

  public updatePermissionModal(): void {
    this.router.navigate(['/user-permission']);
  }

  public createUser(template: TemplateRef<any>): void {
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })
    this.createUserForm.reset()
  }

  public saveCreateUser(error: IErrorPanel): void {
    error.clearError();
    let users = new CreateUserParam()
    users.username = this.createUserForm.value.username
    users.password = this.createUserForm.value.password
    this.userService.createUser(users)
      .pipe(catchError((e) => {
        error.setError(e.error.errorMessage);
        return throwError('');
      })).subscribe(() => {
        this.userGrid.instance.refresh()
        this.onCancel()
      })

  }

  public changePassword(template: TemplateRef<any>, cell: any): void {
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })
    this.username = cell.data.username;
    this.changePasswordForm.reset()
  }

  public saveChangePassword(error: IErrorPanel): void {
    let userPassword = new ChangePasswordParam()
    userPassword.username = this.username
    userPassword.password = this.changePasswordForm.value.password
    userPassword.newPassword = this.changePasswordForm.value.newPassword
    userPassword.confirmPassword = this.changePasswordForm.value.confirmPassword
    this.userService.changePassword(userPassword)
      .pipe(catchError((e) => {
        error.setError(e.error.errorMessage);
        return throwError('');
      }))
      .subscribe(() => {
        this.userGrid.instance.refresh()
        this.onCancel()
      })
  }

  public onCancel(): void {
    this.createUserForm.reset()
    this.changePasswordForm.reset()
    this.updateUserForm.reset()
    this.modalCreate?.hide()
    this.QueryAllUser()
  }

  public deleteUser(cell: any, error: IErrorPanel): void {
    if (!cell.isAdmin && cell.userName !== 'root') {
      let result = confirm("Are you sure to delete?");
      if (result) {
        this.userService.deleteUser(cell.userId)
          .pipe(catchError((e) => {
            error.setError(e.error.errorMessage);
            return throwError('');
          })).subscribe(() => {
            this.QueryAllUser()
          })
      }
    } else {
      alert('ไม่สามารถลบผู้ใช้นี้ได้');
    }
  }

  public updateUser(template: TemplateRef<any>, cell: any): void {
    this.userId = cell.data.userId;
    this.updateUserForm.patchValue({
      username: cell.data.username
    })
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })
  }

  public saveUpdateUser(error: IErrorPanel): void {
    let updateUser = new UpdateUserParam()
    updateUser.userId = this.userId
    updateUser.username = this.updateUserForm.value.username
    this.userService.updateUser(updateUser)
      .pipe(catchError((e) => {
        error.setError(e.error.errorMessage);
        return throwError('');
      }))
      .subscribe(() => {
        
        this.onCancel()
      })
  }

public onLogOut() : void {
  this.authService.logOut()
}

}
