import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroductionComponent } from './admin/introduction/introduction.component';
import { ProjectsSectionComponent } from './admin/projects-section/projects-section.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SkillsComponent } from './admin/skills/skills.component';
// import { CoverLetterComponent } from './cover-letter/cover-letter.component';
import { CoverLetterComponent } from './admin/cover-letter/cover-letter.component';
// import { FooterSectionComponent } from './footer-section/footer-section.component';
import { FooterSectionComponent } from './admin/footer-section/footer-section.component';
import { UserComponent } from './user/user.component';
import { UserIntroComponent } from './user/user-intro/user-intro.component';
import { UserSkillsComponent } from './user/user-skills/user-skills.component';
import { UserProjectsComponent } from './user/user-projects/user-projects.component';
import { UserCoverletterComponent } from './user/user-coverletter/user-coverletter.component';
import { UserFooterComponent } from './user/user-footer/user-footer.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    ProjectsSectionComponent,
    SkillsComponent,
    CoverLetterComponent,
    FooterSectionComponent,
    UserComponent,
    UserIntroComponent,
    UserSkillsComponent,
    UserProjectsComponent,
    UserCoverletterComponent,
    UserFooterComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
