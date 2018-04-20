import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { CreditTransferComponent } from './credit-transfer/credit-transfer.component';
import { SignupComponent } from './signup/signup.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { GpaCalcComponent } from './gpa-calc/gpa-calc.component';
import { GradCheckComponent } from './grad-check/grad-check.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'book-details/:id',
    component: BookDetailComponent,
    data: { title: 'Book Details' }
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
    data: { title: 'Create Book' }
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: { title: 'Edit Book' }
  },
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
  }
  // { path: '',
  //   redirectTo: '/credit-transfers',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    CreditTransferComponent,
    SignupComponent,
    AccountVerificationComponent,
    GpaCalcComponent,
    GradCheckComponent
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
