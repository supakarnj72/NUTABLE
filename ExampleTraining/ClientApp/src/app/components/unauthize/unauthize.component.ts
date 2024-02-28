import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: '',
  templateUrl: './unauthize.component.html',
  styleUrls: ['./unauthize.component.css']
})
export class UnauthizeComponent {
  constructor(private authService: AuthService) {

  }
  onLogOut() {
    this.authService.logOut()
  }
}