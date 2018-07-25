import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/feed', pathMatch: 'full' },
	{ path: 'feed', component: FeedComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
  	RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
