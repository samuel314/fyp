import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sis-login',
  templateUrl: './sis-login.component.html',
  styleUrls: ['./sis-login.component.css']
})
export class SisLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signin() {
    window.location.href = "http://localhost:3000/courseHistory/scrape/ch";
  }
}
