import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grad-check',
  templateUrl: './grad-check.component.html',
  styleUrls: ['./grad-check.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .cal_calendar
  {
          /* border:3px solid rgb(47,79,78); */
          padding:1px;
          background-color:rgb(245,245,245);
          width:600px;
          margin:auto;
          height:486px;
          
  }
  .cal_calendar th
  {
          border:1px solid rgb(230,235,235);
          background-color:rgb(245,245,245);
          width:36px;
  }
  .cal_calendar td
  {
          border:1px solid rgb(230,235,235);
          background-color:rgb(245,245,245);
      
      vertical-align: top;
          text-align:right;
          width:36px;
          height:85px;
  }
  .cal_today
  {
  
      background-color:rgb(252,248,227) !important;
  }
  
  
  
  .cal_days_bef_aft
  {
          color:#5a779e;
  }
  
  .container1 {
    position: relative;
    width: 22.5%;
    left: 750px;
    top: 40px;
  }
  
  .container2 {
    position: relative;
    width: 22.5%;
    left: 750px;
    top: 70px;
  }
  
  .container3 {
    position: relative;
    width: 22.5%;
    left: 1200px;
    bottom: 615px;
  }
  
  .container4 {
    position: relative;
    width: 22.5%;
    left: 1200px;
    bottom: 585px ;
  }
  
  .container5 {
    position: relative;
    width: 5.5%;
    left: 1650px;
    bottom: 1270px ;
  }
  
  .container6 {
    position: relative;
    width: 5.5%;
    left: 1650px;
    bottom: 1240px ;
    
  }
  
  .calendar {
    border-radius:15px;
  border:3px solid rgb(47,79,78);
    position: relative;
    width: 35%;
    height: 90%;
    left: 60px;
    bottom: 1465px ;
    color: #000000; 
    background-color:#FFFFFF;
  }
  
  
  .image {
    display: block;
    width: 100%;
    height: auto;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #008CBA;
  }
  
  .container1:hover .overlay {
    opacity: 1;
  }
  
  .container2:hover .overlay {
    opacity: 1;
  }
  
  .container3:hover .overlay {
    opacity: 1;
  }
  
  .container4:hover .overlay {
    opacity: 1;
  }
  
  .text {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  
  
  * {
    margin: 0;
    padding: 0;
  }
  
  a {
    color: #ffffff;
    text-decoration: none;
  }
  
  a:hover {
    color: #1ed760;
    text-decoration: none;
  }
  
  body {
    font-size: 12pt;
    line-height: 1.75em;
    font-family: Georgia, serif;
    background: rgb(47,79,78);
    color: #ffffff;
  }
  
  
  
  #greybox{
    border-radius:15px;
    /* position: static; */
    /* width: 745px;  */
    /* margin: 0 0 0 355px;  */
    /* padding: 40px; */
    background: rgb(172,185,185);
    margin: 20px;
    width:1800px;
    height:750px;
    max-height:750px;
    /* max-width:1500px; */
  }
  
  
  
  
  
  br.clear {
    clear: both;
  }
  
  h1,h2,h3,h4 {
    /* text-transform: lowercase; */
    letter-spacing: -1px;
  }
  
  h2,h3,h4 {
    margin-bottom: 1em;
    font-family: Arvo, serif;
    color: #fff;
  }
  
  hr { 
      display: block;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
      margin-left: auto;
      margin-right: auto;
      border-style: inset;
      border-width: 1.5px;
  }
  
  p {
    margin-bottom: 1.5em;
  }
  
  ul {
    margin-bottom: 1.5em;
  }
  
  
  
  #bg {
    background: rgb(47,79,78);
  }
  
  #banner {
    background: #fff;
  }
  
  #box1 {
    width: 222px;
    /* overflow: hidden; */
    /* margin: 0 0 35px 0; */
  }
  
  #box1 object{
  overflow:auto;
  border:4px ridge rgb(47,79,78);
  border-radius:15px;
  }
  
  
  
  
  #content {
    border-radius:15px;
    width: 1345px;
    height: 650px;
    margin: 0 0 0 355px;
    padding: 40px;
    background: #fff;
  }
  
  #copyright {
    padding: 0 0 80px 0;
    text-align: center;
    
  }
  
  #footer {
    position: relative;
    padding: 40px;
    width: 1100px;
    color: #e1d2c7;
  }
  
  #footer a {
    color: #f4eeea;
  }
  
  #footer h2, #footer h3, #footer h4 {
    color: #f4eeea;
  }
  
  #footer ul {
    list-style: none;
  }
  
  #footer ul li {
    padding: 15px 0 15px 0;
    border-top: dotted 1px #c6aa95;
  }
  
  #footer ul li.first {
    padding-top: 0;
    border-top: 0;
  }
  
  #footerContent {
    width: 745px;
    margin: 0 0 0 355px;
  }
  
  #footerSidebar {
    width: 240px;
    float: left;
  }
  
  #header {
    position: relative;
    padding: 0;
    height: 30px;
  }
  
  #logo {
    position: absolute;
    top: 40px;
    left: 40px;
    height: 120px;
    line-height: 120px;
  }
  
  #logo a {
    text-decoration: none;
    color: #fff;
  }
  
  #logo h1 {
    font-size: 3.5em;
    font-family: Lobster, cursive;
    text-shadow: 0 2px 1px #32251B;
  }
  
  
  
  #boss h1{
    color: #FFFFFF;	
    text-transform: uppercase;
    margin-left: 10px;
  }
  
  
  #nav {
    position: absolute;
    right: 40px;
    height: 53px;
    line-height: 53px;
    top: 0px;
  }
  
  #nav a {
    text-decoration: none;
    text-shadow: 0 1px 1px #32251B;
    font-size: 1.2em;
  }
  
  #nav li {
    margin: 0 1em 0 1em;
  }
  
  #nav ul {
    list-style: none;
  }
  
  #nav ul li {
    float: left;
  }
  
  
  
  #sidebar {
    width: 240px;
    float: left;
    padding: 40px;
  
  }
  
  #sidebar h2, #sidebar h3, #sidebar h4 {
    color: #fff;
  }
  
  #sidebar ul {
    list-style: none;
  }
  
  #sidebar ul li {
    padding: 15px 0 15px 0;
    border-top: dotted 1px #70665f;
  }
  
  #sidebar ul li.first {
    padding-top: 0;
    border-top: 0;
  }
  
  #sidebar ul li u {
      text-decoration: none;
      border-bottom: 2.5px solid white;
  }​

`]
})
export class GradCheckComponent implements OnInit {

  majorRequirements: any;

  courseHistories: any;

  results = [];

  user: any;

  isLogin: boolean = false;

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit() {
    this.http.get(`${this.API}/user`).subscribe(data => {
      this.user = data;
      if (data[0]['isLogin']!== undefined) {
        this.isLogin = data[0]['isLogin'];
      }
    });
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
                var and = 1;
                for (var k in his) {
                  if (his[k].course === req[i].courseList[j].code) {
                    if (req[i].condition[0].logic === "OR") {
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
              var done = false;
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
                  done = true;
                  break;
                }
              }
              if (!done) {
                var condition: string = req[i].courseList[0].code;
                var course:any = "";
                var credits:any = "";
                credits = credits.concat(req[i].credits[0].units, ".00");
                var temp = {
                  id: req[i].id,
                  condition: condition,
                  course: course,
                  credits: credits,
                  fulfilled: false
                };
                this.results.push(temp);
              }
            } else {
              var tempResults = [];
              for (var l in req[i].requirementList) {
                for (var m in req) {
                  if (req[i].requirementList[l].rid === req[m].id) {
                    if (Object.keys(req[m].courseList).length > 1) {
                      for (var n in req[m].courseList) {
                        var done = false;
                        var size = Object.keys(req[m].courseList).length;
                        var and = 1;
                        for (var o in his) {
                          if (his[o].course === req[m].courseList[n].code) {
                            if (req[m].condition[0].logic === "OR") {
                              var condition: string = "";
                              var index = 1;
                              for (var p in req[m].courseList) {
                                if (index != size) {
                                  condition += req[m].courseList[p].code + " OR ";
                                  index++;
                                } else {
                                  condition += req[m].courseList[p].code;
                                }
                              }
                              var temp = {
                                id: req[m].id,
                                condition: condition,
                                course: his[o].course,
                                credits: his[o].units,
                                fulfilled: true
                              };
                              tempResults.push(temp);
                              done = true;
                              break;
                            } else {
                              and++;
                              if (and == size) {
                                var condition: string = "";
                                var index = 1;
                                for (var p in req[m].courseList) {
                                  if (index != size) {
                                    condition += req[m].courseList[p].code + " AND ";
                                    index++;
                                  } else {
                                    condition += req[m].courseList[p].code;
                                  }
                                }
                                var temp = {
                                  id: req[m].id,
                                  condition: condition,
                                  course: his[o].course,
                                  credits: his[o].units,
                                  fulfilled: true
                                };
                                tempResults.push(temp);
                              }
                            }
                          }
                        }
                        if (done) {
                          break;
                        }
                      }
                    } else if (Object.keys(req[m].courseList).length == 1) {
                      var done = false;
                      for (var o in his) {
                        if (his[o].course === req[m].courseList[0].code) {
                          var condition: string = req[m].courseList[0].code;
                          var temp = {
                            id: req[m].id,
                            condition: condition,
                            course: his[o].course,
                            credits: his[o].units,
                            fulfilled: true
                          };
                          tempResults.push(temp);
                          done = true;
                          break;
                        }
                      }
                      if (!done) {
                        var condition: string = req[m].courseList[0].code;
                        var course:any = "";
                        var credits:any = "";
                        credits = credits.concat(req[m].credits[0].units, ".00");
                        var temp = {
                          id: req[m].id,
                          condition: condition,
                          course: course,
                          credits: credits,
                          fulfilled: false
                        };
                        tempResults.push(temp);
                        console.log(tempResults);
                      }
                    }
                  }
                }
              }
              var final: boolean;
              for (var a in req[i].condition) {
                if (a === "0" && req[i].condition[a].logic === "OR") {
                  final = tempResults[0].fulfilled || tempResults[1].fulfilled;
                }
                if (a === "0" && req[i].condition[a].logic === "AND") {
                  final = tempResults[0].fulfilled && tempResults[1].fulfilled;
                }
                if (a !== "0" && req[i].condition[a].logic === "OR") {
                  final = final || tempResults[+a+1].fulfilled;
                } else {
                  final = final && tempResults[+a+1].fulfilled;
                }
              }
              if (final) {
                var condition: string = "";
                var course:any = "";
                var credits:any = "0.00";
                if (Object.keys(req[i].condition).length > 1) {
                  for (var a in req[i].condition) {
                    if (a === "0" && req[i].condition[a].logic === "AND") {
                      condition += '[(' + tempResults[0].condition + ')' + " AND " + '(' + tempResults[1].condition + ')]';
                    }
                    if (a !== "0" && req[i].condition[a].logic === "OR") {
                      condition += " OR " + '[' + tempResults[+a+1].condition + ']';
                    }
                  }
                } else {
                  for (var a in req[i].condition) {
                    if (a === "0" && req[i].condition[a].logic === "AND") {
                      condition += '(' + tempResults[0].condition + ')' + " AND " + '(' + tempResults[1].condition + ')';
                    }
                    if (a === "0" && req[i].condition[a].logic === "OR") {
                      condition += '(' + tempResults[0].condition + ')' + " OR " + '(' + tempResults[1].condition + ')';
                    }
                    if (a !== "0" && req[i].condition[a].logic === "OR") {
                      condition += " OR " + tempResults[+a+1].condition;
                    }
                  }
                }
                var size = Object.keys(tempResults).length;
                var index = 1;
                for (var b in tempResults) {
                  if (tempResults[b].fulfilled) {
                    course += tempResults[b].course + ', ';
                    credits = +credits + Number(tempResults[b].credits);
                  }
                  if (index === size) {
                    course = course.slice(0, -2);
                    credits = credits + ".00";
                  }
                  index++;
                }
                var temp = {
                  id: req[i].id,
                  condition: condition,
                  course: course,
                  credits: credits,
                  fulfilled: final
                };
                this.results.push(temp);
              }
            }
          }
        }
        this.results.sort(function(a,b){return (a.fulfilled === b.fulfilled)? 0 : a.fulfilled? 1 : -1;});
      });
    });
    
  }

  logout() {
    this.http.put(`${this.API}/login/`+ this.user[0]['_id'], this.isLogin)
      .subscribe(res => {
          this.router.navigate(['']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
