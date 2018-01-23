import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${this.API}/book`).subscribe(data => {
      this.books = data;
    });
  }

}
