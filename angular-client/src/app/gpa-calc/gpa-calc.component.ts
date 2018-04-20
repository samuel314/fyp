import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class currentCourse {
  course: string = "";
  units: string = "";
  newUnits: string = "";
  grade: string = "";
}

@Component({
  selector: 'app-gpa-calc',
  templateUrl: './gpa-calc.component.html',
  styleUrls: ['./gpa-calc.component.css']
})
export class GpaCalcComponent implements OnInit {

  courseHistories: any;

  cGPA: any;

  creditsEarned: any;

  gradeConverter = [
    {"A+": {grade:4.3},
     "A": {grade:4.0},
     "A-": {grade:3.7},
     "B+": {grade:3.3},
     "B": {grade:3.0},
     "B-": {grade:2.7},
     "C+": {grade:2.3},
     "C": {grade:2.0},
     "C-": {grade:1.7},
     "D": {grade:1.0},
     "F": {grade:0}
    }
  ];

  currentCourses = [];

  calculated: boolean = false;

  currentCredits: number;

  currentGrades: number;

  currentGPA: number = 0.00;

  totalCredits: number;

  totalGrades: number;

  totalGPA: number = 0.00;

  newCurrentCourse: currentCourse;

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    this.http.get(`${this.API}/courseHistory`).subscribe(data => {
      this.courseHistories = data;
      var totalGPA : number = 0.00;
      var totalCredits : number = 0.00;
      for (var key in data) {
        if (data[key].grade !== "T" && data[key].grade.trim() !== "" && data[key].grade !== "PP" && data[key].grade !== "P") {
          totalGPA += (this.gradeConverter[0][data[key].grade].grade * parseFloat(data[key].units));
          totalCredits += parseFloat(data[key].units);
        }
        if (data[key].status === "In Progress" && data[key].units !== "6.00" && data[key].units !== "0.00") {
          var temp = {
            course: data[key].course,
            units: data[key].units,
            newUnits: "",
            grade: ""
          };
          this.currentCourses.push(temp);
        }
      };
      this.cGPA = totalGPA/totalCredits;
      this.creditsEarned = totalCredits;
      this.cGPA = this.round(this.cGPA);
    });
  }

  round(value) {
    return Math.round( Math.round( value * 10000 ) / 10 ) / 1000;
  }

  calculate() {
    this.calculated = true;
    this.currentGrades = 0.00;
    this.currentCredits = 0.00;
    this.totalCredits = 0.00;
    this.totalGrades = 0.00;
    for (var key in this.currentCourses) {
      if (this.currentCourses[key].units!==''){
        this.currentCredits += parseFloat(this.currentCourses[key].units);
        if (isNaN(parseFloat(this.currentCourses[key].grade))) {
          this.currentGrades += (this.gradeConverter[0][this.currentCourses[key].grade.toUpperCase()].grade * parseFloat(this.currentCourses[key].units));
        }
        else {
          this.currentGrades += (parseFloat(this.currentCourses[key].grade) * parseFloat(this.currentCourses[key].units));
        }
      }
      else {
        this.currentCredits += parseFloat(this.currentCourses[key].newUnits);
        if (isNaN(parseFloat(this.currentCourses[key].grade))) {
          this.currentGrades += (this.gradeConverter[0][this.currentCourses[key].grade.toUpperCase()].grade * parseFloat(this.currentCourses[key].newUnits));
        }
        else {
          this.currentGrades += (parseFloat(this.currentCourses[key].grade) * parseFloat(this.currentCourses[key].newUnits));
        }
      }
    }
    this.currentGPA = this.round(this.currentGrades/this.currentCredits);
    this.totalCredits = parseFloat(this.creditsEarned) + this.currentCredits;
    this.totalGrades = parseFloat(this.cGPA) * parseFloat(this.creditsEarned) + this.currentGrades;
    this.totalGPA = this.round(this.totalGrades/this.totalCredits);
  }

  reset() {
    this.calculated = false;
    this.currentGrades = 0.00;
    this.currentCredits = 0.00;
    this.totalCredits = 0.00;
    this.totalGrades = 0.00;
    for (var key in this.currentCourses) {
      this.currentCourses[key].grade = "";
      this.currentCourses[key].newUnits = "";
    }
  }
  addrow() {
    this.newCurrentCourse = new currentCourse();
    if (this.newCurrentCourse) {
      var entry = this.newCurrentCourse;
      this.currentCourses.push(entry);
    }
    
  }

}
