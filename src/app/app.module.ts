import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './/app-routing.module';

import { AuthGuard} from './auth.guard';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    HeaderComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
