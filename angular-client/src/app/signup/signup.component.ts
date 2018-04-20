import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  credentials = {};

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.http.post(`${this.API}/signup`, this.credentials).subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['/account-verification', id]);
    }, (err) => {
      console.log(err);
    });
  }

}
