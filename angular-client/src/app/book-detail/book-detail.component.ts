import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {

  book = {};

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
    this.http.get(`${this.API}/book/` + id).subscribe(data => {
      this.book = data;
    });
  }

  deleteBook(id) {
    this.http.delete(`${this.API}/book/` + id).subscribe(res => {
      this.router.navigate(['/books']);
    }, (err) => {
      console.log(err);
    });
  }

}
