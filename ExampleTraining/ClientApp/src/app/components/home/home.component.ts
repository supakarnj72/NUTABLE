import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  constructor(private router: Router, private userService: UserService,
    private authService: AuthService) {

  }
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
  }

  public onLogOut(): void {
    this.authService.logOut()
  }

}
