import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { DocumentComponent } from './document/document.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';

import { AuthGuard} from './auth.guard';
import { BaseService } from './services/base.service';
import { FriendComponent } from './friend/friend.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    HeaderComponent,
    ProfileComponent,
    RegisterComponent,
    DocumentComponent,
    FooterComponent,
    FriendComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ BaseService ],
  bootstrap: [ AppComponent, HeaderComponent, FooterComponent ]
})
export class AppModule { }
