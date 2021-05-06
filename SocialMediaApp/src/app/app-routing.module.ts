import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PassRecoveryComponent } from './pass-recovery/pass-recovery.component';
import { UserFieldComponent } from './user-field/user-field.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { SearchFriendComponent } from './search-friend/search-friend.component';
import { InvitationComponent } from './invitation/invitation.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'pass-recovery', component: PassRecoveryComponent },
  { path: 'user-field', component: UserFieldComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-menu', component: UserMenuComponent },
  { path: 'update-form', component: UpdateFormComponent},
  { path: 'search-friend', component: SearchFriendComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'app-friend-profile', component: FriendProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
