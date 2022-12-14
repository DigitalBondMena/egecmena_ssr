  import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DependentFormService } from 'src/app/services/dependent-form.service';
import { HomeService } from 'src/app/services/home.service';
import { StudyService } from 'src/app/services/study.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.scss']
})
export class AdmissionFormComponent implements OnInit {
  faculties: any[] = [];
  facultyData: any;
  facultyUniversity: any;
  universityChoice:boolean =  false;
  facultyChoice:boolean =  false;
  majorChoice:boolean =  false;
  departmentChoice:boolean =  false;
  destinations : any[] = [];
  universities: any[] = [];
  majors: any[] = [];
  departments: any[] = [];
  changeUniversities: any;
  changeFaculty: any;
  changeMajor: any;
  changeDepartment: any;
  universityOnchangeId:any;
  facultyDatas: any[] = [];
  conditions: any[] = [];
  userArray: any;
  isLogined!:boolean;
  userPersonalInfo: any;
  userAcademicInfo: any;
  academicCondition!:boolean;
  universityImage:string = `${environment.imageUrl}universities/`;
  facultyImage:string = `${environment.imageUrl}faculties/`;
  destinationImage:string = `${environment.imageUrl}destinations/`;
  currentLanguage: any;
  majorId!:number;
  actionLoading!:boolean;
  constructor(
    private _StudyService:StudyService,
    private _UserService:UserService,
    private _DependentFormService:DependentFormService,
    private _Router: Router,
    private _TranslateService:TranslateService,
    private _AuthenticationService:AuthenticationService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2

  ) { }

  ngOnInit(): void {
    this.translateFunction();
    this.authenticationData()
    this.showPersonalInformation();
    this.showAcademicInformation();
    this.showDestination();
  }

  navigateToAcademic(){
    this._Router.navigate(['/academic-information'])
    let admissionCard = document.querySelector('.admission__card');
    let bodyOverlay = document.querySelector('.body-overlay');

    this._Renderer2.removeClass(admissionCard ,'admission__card--opened');
    this._Renderer2.removeClass(bodyOverlay ,'opened');


  }
  navigateToPersonal(){
    this._Router.navigate(['/personal-information'])
    let admissionCard = document.querySelector('.admission__card');
    let bodyOverlay = document.querySelector('.body-overlay');

    this._Renderer2.removeClass(admissionCard ,'admission__card--opened');
    this._Renderer2.removeClass(bodyOverlay ,'opened');


  }
  navigateToLogin(){
    this._Router.navigate(['/login'])
    let admissionCard = document.querySelector('.admission__card');
    let bodyOverlay = document.querySelector('.body-overlay');

    this._Renderer2.removeClass(admissionCard ,'admission__card--opened');
    this._Renderer2.removeClass(bodyOverlay ,'opened');


  }
  openAdmissionForm(){
    let admissionCard = document.querySelector('.admission__card');
    let bodyOverlay = document.querySelector('.body-overlay');
    this._Renderer2.addClass(admissionCard ,'admission__card--opened')
    this._Renderer2.addClass(bodyOverlay ,'opened')
  }
  closeAdmissionForm(){
    let admissionCard = document.querySelector('.admission__card');
    let bodyOverlay = document.querySelector('.body-overlay');

    this._Renderer2.removeClass(admissionCard ,'admission__card--opened')
    this._Renderer2.removeClass(bodyOverlay ,'opened');
  }
  showPersonalInformation() {
    if (localStorage.getItem('currentUserToken') !== null) {

    this._UserService
      .getPersonalInformation(this.userArray.id)
      .subscribe((response) => {
        console.log(response);
        this.userPersonalInfo = response.userPersonalInfo;
      });
    }
  }
  showAcademicInformation() {
    if (localStorage.getItem('currentUserToken') !== null) {

    this._UserService
      .getAcademicInformation(this.userArray.id)
      .subscribe((response) => {
        console.log(response);
        this.userAcademicInfo = response;
      });
    }
  }
  translateFunction(){
    this.currentLanguage = localStorage.getItem("currentLanguage") || 'ar'
    this._TranslateService.use(this.currentLanguage)
    this._TranslateService.onLangChange.subscribe(
      () => {

        this.currentLanguage = this._TranslateService.currentLang
      }
    )
  }
  authenticationData(){

      this._AuthenticationService.currentUserData.subscribe(() => {
        if (this._AuthenticationService.currentUserData.getValue() == null) {
          this.isLogined = false;

        } else {
          this.userArray = JSON.parse(
            localStorage.getItem('currentUserArray') || '{}'
          );

          this.isLogined = true;
        }
      });

  }

  admissionFormPage: FormGroup = new FormGroup({
    'admission_destination_id': new FormControl('', Validators.required),
    'admission_university_id': new FormControl('', Validators.required),
    'admission_fac_uni_id': new FormControl('', Validators.required),
    'admission_fac_uni_major_id': new FormControl(''),
    'admission_department_id': new FormControl('', Validators.required),
    'user_id': new FormControl(''),
    // 'universitySlug' : new FormControl('')
  })
  onSubmitAdmissionForm(admissionFormPage: FormGroup){
    this.actionLoading = true
    this._UserService.submitAdmissionInformation(
      admissionFormPage.value
    ).subscribe(
      ( response) => {
        this.actionLoading = true
        if(response.success === 'You registered before and we will call you soon'){
          if(this.currentLanguage === 'en'){
            this._ToastrService.warning(`${response.success}`,`Attention` , {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })

            this.actionLoading = false;
            this.closeAdmissionForm();
          }else if(this.currentLanguage === 'ar'){
            this._ToastrService.warning(`${response.ar_success}`,`??????????`, {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })
            this.actionLoading = false;
            this.closeAdmissionForm();
          }
          this._TranslateService.onLangChange.subscribe(
            (language) => {
              if(language.lang === 'en'){
                this._ToastrService.warning(`${response.success}`,`success` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })

                this.actionLoading = false;
                this.closeAdmissionForm();
              }else if(language.lang === 'ar'){
                this._ToastrService.warning(`${response.ar_success}`,`?????????? ????????` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })
                this.actionLoading = false;
                this.closeAdmissionForm();
              }
            }
          )
        }else{
          if(this.currentLanguage === 'en'){
            this._ToastrService.success(`${response.success}`,`success` , {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })

            this.actionLoading = false;
            this.closeAdmissionForm();
          }else if(this.currentLanguage === 'ar'){
            this._ToastrService.success(`${response.ar_success}`,`?????????? ????????` , {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })
            this.actionLoading = false;
            this.closeAdmissionForm();
          }
          this._TranslateService.onLangChange.subscribe(
            (language) => {
              if(language.lang === 'en'){
                this._ToastrService.success(`${response.success}`,`success` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })

                this.actionLoading = false;
                this.closeAdmissionForm();
              }else if(language.lang === 'ar'){
                this._ToastrService.success(`${response.ar_success}`,`?????????? ????????` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })
                this.actionLoading = false;
                this.closeAdmissionForm();
              }
            }
          )

        }
      }, error => {
        if(error.status === 500) {
          if(this.currentLanguage === 'en'){

            this._ToastrService.error(`${error.error.error}`,`Wrong` , {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })
          }else if(this.currentLanguage === 'ar'){
            this._ToastrService.error(`${error.error.ar_error}`,`??????` , {
              timeOut: 4000 , positionClass: 'toast-bottom-center'

            })
          }
          this._TranslateService.onLangChange.subscribe(
            (language) => {
              if(language.lang === 'en'){

                this._ToastrService.error(`${error.error.error}`,`Wrong` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })
              }else if(language.lang === 'ar'){
                this._ToastrService.error(`${error.error.ar_error}`,`??????` , {
                  timeOut: 4000 , positionClass: 'toast-bottom-center'

                })
              }
            }
          )

        }
        this.actionLoading = false

      }
    )
  }
  showDestination() {
    this._StudyService.getDestinations().subscribe((response) => {
      this.destinations = response.destinations;
    });
  }
  onChangeDestination(event: any) {
    this.actionLoading = true;
    this._DependentFormService.getUniversities(event.target.value , 'en').subscribe(
      (response) => {
        this.changeUniversities = response.universities[0];
        this.actionLoading = false;
      }
    )
    // this.admissionFormPage.value.admission_destination_id =
    this.universityChoice = true;
  }
  onChangeUniversity(event: any) {
    console.log(event);
    this.actionLoading = true;

    this._DependentFormService.getFaculty(event.target.value, 'en').subscribe(
      (response) => {
        console.log(response);
        this.changeFaculty = response.faculties[0];
        this.actionLoading = false;

      }
    )
    this.universityOnchangeId = event.target.value
    this.facultyChoice = true;
  }
  onChangeFaculty(event: any) {

    this.actionLoading = true;
    this._DependentFormService.getMajors(this.universityOnchangeId, event.target.value , 'en').subscribe(
      (response) => {
        this.changeMajor = response.majors[0]
        this.actionLoading = false;

      }
    )

    this.majorChoice = true;
  }
  onMajorSaerch(event: any){
    this.actionLoading = true;

    this._DependentFormService.getDepartments(event.target.value , 'en').subscribe(
      (response) => {
        this.changeDepartment = response.departments[0]
        this.actionLoading = false;
        this.departmentChoice = true;
      }

    )
  }
}
