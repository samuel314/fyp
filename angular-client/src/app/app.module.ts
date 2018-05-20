import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CreditTransferComponent } from './credit-transfer/credit-transfer.component';
import { SignupComponent } from './signup/signup.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { GpaCalcComponent } from './gpa-calc/gpa-calc.component';
import { GradCheckComponent } from './grad-check/grad-check.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseRecommendationComponent } from './course-recommendation/course-recommendation.component';
import { LoginComponent } from './login/login.component';
import { SisLoginComponent } from './sis-login/sis-login.component';

const appRoutes: Routes = [
  {
    path: 'credit-transfers',
    component: CreditTransferComponent,
    data: { title: 'Credit Transfer List' },
    children: [
      { path: ';id=:id;keyword=:keyword', component: CreditTransferComponent },
    ]
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up Page' }
  },
  {
    path: 'account-verification/:id',
    component: AccountVerificationComponent,
    data: { title: 'Account Verification' }
  },
  {
    path: 'gpa-calc',
    component: GpaCalcComponent,
    data: { title: 'GPA Calculator' }
  },
  {
    path: 'grad-check',
    component: GradCheckComponent,
    data: { title: 'Graduation Checklist' }
  },
  {
    path: '',
    component: HomepageComponent,
    data: { title: 'Homepage'}
  },
  {
    path: 'course-recommend',
    component: CourseRecommendationComponent,
    data: { title: 'Course Recommendation' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login Page'}
  },
  {
    path: 'sis-login',
    component: SisLoginComponent,
    data: { title: 'SIS Login'}
  }
  // { path: '',
  //   redirectTo: '/credit-transfers',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    CreditTransferComponent,
    SignupComponent,
    AccountVerificationComponent,
    GpaCalcComponent,
    GradCheckComponent,
    HomepageComponent,
    CourseRecommendationComponent,
    LoginComponent,
    SisLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
