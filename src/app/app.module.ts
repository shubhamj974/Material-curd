import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PostComponent } from './shared/component/post/post.component';
import { ConfirmPostComponent } from './shared/component/confirm-post/confirm-post.component';
import { AuthIntercepterService } from './shared/service/auth-intercepter.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostDashboardComponent,
    PostFormComponent,
    PostComponent,
    ConfirmPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
