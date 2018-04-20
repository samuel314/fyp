import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-credit-transfer',
  templateUrl: './credit-transfer.component.html',
  styleUrls: ['./credit-transfer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreditTransferComponent implements OnInit {

  schools: any;

  credits: any;

  exams: any;

  examCredits: any;
  
  locations: any;

  country: any;

  exam = {};

  institution = {};

  searched = false;

  id: any;

  keyword: any;
  
  category: any;

  type: any;

  types = [ 
    {
      name: 'Exam'
    },
    {
      name: 'Local'
    },
    {
      name: 'Non-Local'
    }
  ];

  columns = [ 
    {
      name: 'All',
      id: 'All'
    },
    {
      name: 'Subject',
      id: 'subject'
    },
    {
      name: 'Course Code',
      id: 'courseCode'
    },
    {
      name: 'HKUST Equivalent Course',
      id: 'transferCourseCode'
    },
    {
      name: 'Credits',
      id: 'credits'
    },
    {
      name: 'Restriction',
      id: 'restriction'
    },
    {
      name: 'Valid Until',
      id: 'validUntil'
    },
    {
      name: 'DB Ref. No.',
      id: 'dbReferenceNo'
    }
  ];

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get(`${this.API}/institution/type/` + "Non-Local").subscribe(data => {
      this.locations = data;
    });
    this.http.get(`${this.API}/exam`).subscribe(data => {
      this.exams = data;
    });
    this.id = this.route.snapshot.params['id'];
    this.keyword = this.route.snapshot.params['keyword'];
    this.type = this.route.snapshot.params['type'];
    this.country = this.route.snapshot.params['location'];
    if (this.route.snapshot.params['category']==="") {
      this.category = undefined;
    }
    else {
      this.category = this.route.snapshot.params['category'];
    }
    if (this.country != undefined) {
      this.http.get(`${this.API}/institution/` + this.type + '/' + this.country).subscribe(data => {
        this.schools = data;
      });
    }
    if (this.type === "Local") {
      this.http.get(`${this.API}/institution/type/` + this.type).subscribe(data => {
        this.schools = data;
      });
    }
    if (this.type != "Exam" && (this.id != undefined || this.keyword != "" || this.category != undefined)) {
      this.search(this.type, this.id, this.keyword, this.category);
    }
    if (this.type === "Exam") {
      this.update(this.type, this.id);
    }
  }

  search(type, id, keyword, category) {
    this.searched = true;
    var uri = encodeURI(keyword);
    if (keyword != "" && category != undefined) {
      this.http.get(`${this.API}/credit-transfer/` + id + '/' + uri + '/' + category).subscribe(data => {
        this.credits = data;
      });
    }
    else {
      this.http.get(`${this.API}/credit-transfer/` + id).subscribe(data => {
        this.credits = data;
      });
    }
    this.http.get(`${this.API}/institution/` + id).subscribe(data => {
      this.institution = data;
    });
    if (type === "Local") {
      const url = this
        .router
        .createUrlTree([{ type: type, id: (id==undefined)? "" : id, keyword: (keyword==undefined)? "" : keyword, category: (category==undefined)? "" : category }], {relativeTo: this.route})
        .toString();

      this.location.go(url);
    }
    else {
      const url = this
          .router
          .createUrlTree([{ type: type, location: this.country, id: (id==undefined)? "" : id, keyword: (keyword==undefined)? "" : keyword, category: (category==undefined)? "" : category }], {relativeTo: this.route})
          .toString();
  
      this.location.go(url);
    }
  }

  update(type, id) {
    this.searched = true;
    this.http.get(`${this.API}/exam/` + id).subscribe(data => {
      this.exam = data;
    });
    this.http.get(`${this.API}/exam-transfer/` + id).subscribe(data => {
      this.examCredits = data;
    });
    const url = this
        .router
        .createUrlTree([{ type: type, id: (id==undefined)? "" : id }], {relativeTo: this.route})
        .toString();

    this.location.go(url);
  }

  changeType() {
    this.searched = false;
    this.id = undefined;
    this.keyword = undefined;
    if (this.type === "Local") {
      this.http.get(`${this.API}/institution/type/` + this.type).subscribe(data => {
        this.schools = data;
      });
    }
  }

  changeLoc(){
    this.id = undefined;
    this.http.get(`${this.API}/institution/` + this.type + '/' + this.country).subscribe(data => {
      this.schools = data;
    });
  }

}
