import { Component } from '@angular/core';
// import { Service1Service } from '../service1.service';
import { Service1Service } from 'src/app/service1.service';
// import { userData } from '../interface';
import { userData } from 'src/app/interface';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-footer-section',
  templateUrl: './footer-section.component.html',
  styleUrls: ['./footer-section.component.css']
})
export class FooterSectionComponent {


 constructor(private service: Service1Service){}

 showModal=false;
 name:string ="";
 email:string ="";
 message:string ="";


dataSent=false;

responseFromBackend="";
//  responseFromBankend: userData = 
//  {
//   userName: this.name,
//   email:this.email,
//   message:this.message
//  }
  saveDetails()
  {

   
  const sendUserData: userData = 
 {
  userName: this.name,
  email:this.email,
  message:this.message
 };


      this.service.postUserData('/addUser', sendUserData).subscribe({

        // response =>
        //   {
        //     // this.showModal=true;
        //     console.log('response' ,response.message);
        //     // this.responseFromBankend=response.msg;
        //   },
        
        next:async (response:any)=> {

          this.responseFromBackend = await response.msg;
          console.log(this.responseFromBackend);
          this.showModal=true;
           this.dataSent =true;
        },
        


        error: (error) => 
          {
            console.log('error', error);
          }
  })
  console.log(this.showModal);
 

   console.log('msg:', this.responseFromBackend);
  }

}
