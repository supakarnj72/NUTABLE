import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports: [MatCardModule]
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
