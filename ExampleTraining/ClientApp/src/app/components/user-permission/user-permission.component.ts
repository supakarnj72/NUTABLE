import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { event } from 'devextreme/events';
import { format } from 'devextreme/ui/widget/ui.widget';
import { InsertPermissionParam } from 'src/app/models/user-menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserMenuService } from 'src/app/services/user-menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  @ViewChild("permissionGrid") permissionGrid!: DxDataGridComponent;
  
  public selectUser = new FormControl();

  public permissionItem: string[] = [];

  public dataSource!: any;
  public dataMenu: any;
  public allowedPageSizes = [5];
  public displayMode = 'full'
  public showInfo = true;
  public showNavButtons = true;

  public userInUse?: number;
  
  constructor(private userService: UserService,
    private userMenuService: UserMenuService,
    private authService: AuthService) {
    this.permissionItem = [
      'Read Only',
      'Write'
    ];
    this.userInUse = parseInt(localStorage.getItem('userId')!);
  }

  ngOnInit(): void {
    this.userService.queryAllUser().subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    })
  }

  onSelectUsername(): void {
    this.userMenuService.GetPermission(this.selectUser.value).subscribe((res) => {
      this.dataMenu = res;
    })
  }

  public something: boolean = false;



  public onAllowChange(data: any, e: any): void {
    data.isAllow = e.value;
    let permission = new InsertPermissionParam()
    if (!data.isAllow) {
      permission.isAllow = data.isAllow;
      permission.menuId = data.menuId;
      permission.permission = "";
      permission.userId = data.userId;
      this.userMenuService.InsertPermission(permission).subscribe(() => {
        data.permission = permission.permission;
        this.permissionGrid.instance.refresh()
      })
    } else {
      permission.isAllow = data.isAllow;
      permission.menuId = data.menuId;
      permission.permission = "Read";
      permission.userId = data.userId;
      this.userMenuService.InsertPermission(permission).subscribe(() => {
        data.permission = permission.permission;
        this.permissionGrid.instance.refresh()
      })
    }

  }

  public onPermissionChanged(data: any,e: any): void {
    if (e.value == "Read Only"){
      e.value = "Read";
    }
    console.log("e.value",e.value);
    data.permission = e.value;
    let permission = new InsertPermissionParam()
      permission.isAllow = true;
      permission.menuId = data.menuId;
      permission.permission = e.value;
      permission.userId = data.userId;
    this.userMenuService.InsertPermission(permission).subscribe(() => {
      data.permission = e.value;
      this.permissionGrid.instance.refresh()
    })
    
  }

  public onLogOut() : void {
    this.authService.logOut()
  }
}
