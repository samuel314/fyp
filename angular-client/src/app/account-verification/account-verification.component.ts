import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  user: any = {};

  email: any;

  correct = true;

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id) {
    this.http.get(`${this.API}/user/` + id).subscribe(data => {
      this.user = data;
      this.email = data['email'];
    });
  }

  editEmail() {
    this.correct = false;
  }

  doneEdit() {
    this.correct = true;
    if (this.user.email !== this.email) {
      this.user.updated_date = Date.now();
      this.user.email = this.email;
      this.http.put(`${this.API}/user/`+ this.user._id, this.user)
      .subscribe(res => {
        }, (err) => {
          console.log(err);
        }
      );
    }
  }

  resendEmail() {
    this.http.post(`${this.API}/resend`, this.user).subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['/account-verification', id]);
    }, (err) => {
      console.log(err);
    });
  }

  checkVerify() {
    this.http.get(`${this.API}/user`).subscribe(data => {
      
    })
  }
}
