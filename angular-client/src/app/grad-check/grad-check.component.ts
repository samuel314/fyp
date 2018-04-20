import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grad-check',
  templateUrl: './grad-check.component.html',
  styleUrls: ['./grad-check.component.css']
})
export class GradCheckComponent implements OnInit {

  majorRequirements: any;

  courseHistories: any;

  results = [];

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    this.http.get(`${this.API}/majorRequirement`).subscribe(req => {
      this.majorRequirements = req;
      this.http.get(`${this.API}/courseHistory`).subscribe(his => {
        this.courseHistories = his;
        for (var i in req) {
          if (!/[a-z]/i.test(req[i].id)) {
            if (Object.keys(req[i].courseList).length > 1) {
              for (var j in req[i].courseList) {
                var done = false;
                var size = Object.keys(req[i].courseList).length;
                var and = 0;
                for (var k in his) {
                  if (his[k].course === req[i].courseList[j].code) {
                    if (req[i].condition[0].logic === "or") {
                      var condition: string = "";
                      var index = 1;
                      for (var l in req[i].courseList) {
                        if (index != size) {
                          condition += req[i].courseList[l].code + " OR ";
                          index++;
                        } else {
                          condition += req[i].courseList[l].code;
                        }
                      }
                      var temp = {
                        id: req[i].id,
                        condition: condition,
                        course: his[k].course,
                        credits: his[k].units,
                        fulfilled: true
                      };
                      this.results.push(temp);
                      done = true;
                      break;
                    } else {
                      and++;
                      if (and == size) {
                        var condition: string = "";
                        var index = 1;
                        for (var l in req[i].courseList) {
                          if (index != size) {
                            condition += req[i].courseList[l].code + " AND ";
                            index++;
                          } else {
                            condition += req[i].courseList[l].code;
                          }
                        }
                        var temp = {
                          id: req[i].id,
                          condition: condition,
                          course: his[k].course,
                          credits: his[k].units,
                          fulfilled: true
                        };
                        this.results.push(temp);
                      }
                    }
                  }
                }
                if (done) {
                  break;
                }
              }
            } else if (Object.keys(req[i].courseList).length == 1) {
              for (var k in his) {
                if (his[k].course === req[i].courseList[0].code) {
                  var condition: string = req[i].courseList[0].code;
                  var temp = {
                    id: req[i].id,
                    condition: condition,
                    course: his[k].course,
                    credits: his[k].units,
                    fulfilled: true
                  };
                  this.results.push(temp);
                  break;
                }
              }
              var condition: string = req[i].courseList[0].code;
              var course:any = "";
              var temp = {
                id: req[i].id,
                condition: condition,
                course: course,
                credits: req[i].credits[0].units,
                fulfilled: false
              };
              this.results.push(temp);
            }
          }
        }
        this.results.sort(function(a,b){return (a.fulfilled === b.fulfilled)? 0 : a.fulfilled? 1 : -1;});
      });
    });
    
  }

}
