import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/content/home/home.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';

import ar from '@angular/common/locales/ar';

import en from '@angular/common/locales/en';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SearchDestinationPipe } from "./pipes/search-destination.pipe";
import { SearchUniversityPipe } from "./pipes/search-university.pipe";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { CountUpModule } from 'ngx-countup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NotfoundComponent } from './pages/shared/notfound/notfound.component';
import { AboutComponent } from './pages/content/about-us/about-us.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {PopoverModule} from "ngx-bootstrap/popover";
import { LoginComponent } from './pages/content/auth/login/login.component';
import { ContactUsComponent } from './pages/content/contact-us/contact-us.component';
import { DepartmentComponent } from './pages/content/department/department.component';
import { RegisterComponent } from './pages/content/auth/register/register.component';
import { UniversitiesComponent } from './pages/content/universities/universities.component';
import { DestinationComponent } from './pages/content/destination/destination.component';
import { DestinationsComponent } from './pages/content/destinations/destinations.component';
import { FacultyComponent } from './pages/content/faculty/faculty.component';
import { BlogDetailsComponent } from './pages/content/blog-details/blog-details.component';
import { InnerPageLoaderComponent } from './pages/shared/inner-page-loader/inner-page-loader.component';
import { MovementInformationComponent } from './pages/content/auth/movement-information/movement-information.component';
import { AdmissionFormComponent } from './pages/shared/admission-form/admission-form.component';
import { ActionLoaderComponent } from './pages/shared/action-loader/action-loader.component';
import { LoaderComponent } from './pages/shared/loader/loader.component';
import { HomeLoaderComponent } from './pages/shared/home-loader/home-loader.component';
import { StudyByFacultyUniversityComponent } from './pages/content/study-by-faculty-university/study-by-faculty-university.component';
import { StudyByFacultyComponent } from './pages/content/study-by-faculty/study-by-faculty.component';
import { AcademicInformationComponent } from './pages/content/auth/academic-information/academic-information.component';
import { PersonalInformationComponent } from './pages/content/auth/personal-information/personal-information.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(ar)
registerLocaleData(en)
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    NotfoundComponent,
    AboutComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    UniversitiesComponent,
    DestinationComponent,
    DestinationsComponent,
    FacultyComponent,
    PersonalInformationComponent,
    AcademicInformationComponent,
    StudyByFacultyComponent,
    StudyByFacultyUniversityComponent,
    HomeLoaderComponent,
    LoaderComponent,
    ActionLoaderComponent,
    AdmissionFormComponent,
    MovementInformationComponent,
    SearchUniversityPipe,
    SearchDestinationPipe,
    InnerPageLoaderComponent,
    BlogDetailsComponent,
    DepartmentComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CarouselModule,
    ToastrModule.forRoot(),
    CountUpModule,
    NgxIntlTelInputModule,
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(_HttpClient:HttpClient){
  return new TranslateHttpLoader(_HttpClient , './assets/i18n/','.json')
}
