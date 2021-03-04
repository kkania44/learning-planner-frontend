import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubtopicsComponent } from './subtopics/subtopics.component';
import { TopicsComponent } from './topics/topics.component';
import { UpdateTopicComponent } from './update-topic/update-topic.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CanActivateGuardService } from './auth/can-activate-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/topics',  pathMatch: 'full'},
  { path: 'subtopics/topic/:id', component: SubtopicsComponent
  , canActivate: [CanActivateGuardService]
},
  { path: 'topics', component: TopicsComponent
  , canActivate: [CanActivateGuardService] 
},
  { path: 'topics/:id', component: UpdateTopicComponent
  , canActivate: [CanActivateGuardService] 
},
  { path: 'auth/signup', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
