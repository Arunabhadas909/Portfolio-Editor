import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { AllDetails, projectSchema, ReadLink, skillsSchema, userData, webAllDetails } from './interface';
@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor(private http:HttpClient) {

    const saved = localStorage.getItem('webAllDetails');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.dataSubject.next(parsed);
      } catch (e) {
        console.warn('Failed to parse saved data');
      }
    }
   }
  private dataSubject = new BehaviorSubject<webAllDetails>({
    username:"",
    designation:"",
    previewUrl: null,
    textEntered: '',
    skills:[{
      name:"",
      img:"",
    }],
    projects: [],
    coverLettertextEntered: ''
  });



  lastUserData:webAllDetails ={

    username:"",
    designation:"",
    previewUrl:null,
    textEntered:"",
    skills:[{
      name:"",
      img:"",
    }],
    projects:[],
    coverLettertextEntered:""
  }


    storepreviewUrl: string | ArrayBuffer | null = null;
    storetextEntered: string ="";
    storekills:{ name:string; img:string;} [] = [];
    storeprojects:{title: string; description:string; img:string; url:string } [] =[];
    storecoverLettertextEntered: string="";

  

  backendUrl = "https://portfolio-editor-backend-1.onrender.com/admin";
  backendUserUrl = "https://portfolio-editor-backend-1.onrender.com/user" ;
  backendStoreUrl="https://portfolio-editor-backend-1.onrender.com/dataSelected";

  readLink:ReadLink =
  {
    title:'',
    description:'',
    img:'',
    url:''
  };

  skills:skillsSchema = {
    name:"",
    img:""
  }
  
  userData:userData =
  {
    userName:"",
    email:"",
    message:"",
  }

  projects:projectSchema= {

    
    projectLink:"",
    projectDescription:"",
  }

getProject(url:string): Observable<ReadLink>
  {

    return this.http.get<any>(`https://portfolio-editor-backend-1.onrender.com/admin/project?url=${url}`).pipe(
    map(project => ({
      title: project.title,
      description: project.description,
      img: project.image,
      url: project.url
    })),
    catchError(error => {
      console.error('Error fetching preview:', error);
      return of({
        title: '',
        description: '',
        img: '',
        url: ''
      });
    })
  );
  

    
 

  }


postProjects(urlEndpoint:string,data:projectSchema):Observable<any>
{
    const url = `${this.backendUrl}${urlEndpoint}`;

    return this.http.post(url,data);
}

postSkills(urlEndpoint:string, data:skillsSchema): Observable<skillsSchema>
{

  console.log(" started posting data through httpclient")
  const url = `${this.backendUrl}${urlEndpoint}`;
  console.log("sent to backend server");
  return this.http.post<skillsSchema>(url, data);
}

getSkills(urlEndpoint:string, data:string): Observable<skillsSchema>
{

  // const skillHeaders = new HttpHeaders().set( 'name', data);
  return this.http.get<any>(`${this.backendUrl}${urlEndpoint}?name=${data}`).pipe(

    map( skills => ({

      name:skills.name,
      img:skills.img


      
    })),
    catchError(error =>
      {
        console.error("Error while fetching data", error);

        return of({

          name:"",
          img:""

        })
      })
    );
}

postUserData(urlEndpoint:string, data:userData):Observable<any>
{

  const url = `${this.backendUserUrl}${urlEndpoint}`;
  
  return this.http.post<any>(url,data);

}

data$ = this.dataSubject.asObservable()

passDataToUserComp( patch: Partial<webAllDetails>){


const current = this.dataSubject.value;

const updated = {...current, ...patch}

this.dataSubject.next(updated);

console.log(this.dataSubject);


localStorage.setItem('webAllDetails', JSON.stringify(updated));



}



passDataToDatabase(urlEndpoint:string, data:FormData): Observable<any> 
{

  
  
  const url = `${this. backendStoreUrl}${urlEndpoint}`;

  // const sendData = localStorage.getItem('webAllDetails');
console.log(" sending data")

 return this.http.post(url, data);

}


getDataFromDatabase(urlEndpoint:string):Observable<AllDetails>
{

  return this.http.get <any>(`${this.backendStoreUrl}${urlEndpoint}`).pipe(
    map( (data) => ({

        username:data.username,
        designation:data.designation,
        previewUrl: data.previewUrl,
        mimeType: data.mimeType,
        textEntered: data.textEntered,
        skills: data.skills,
        projects: data.projects,
        coverLettertextEntered: data.coverLettertextEntered,


      })),

      catchError((error) => {


        console.log(error);

        return of({
                username:"",
                designation:"",
                previewUrl: "",
                textEntered:"",
                mimeType:"",
                skills:[],
                projects:[],
                coverLettertextEntered:"",

        })

      }


      



      )
    )


    
    

}

// postAllDataToDatabase( urlEndpoint:string):Observable<any>
// {
//   console.log("Entered Service ")

//  const url = `${this. backendStoreUrl}${urlEndpoint}`;

//  const data: webAllDetails = {

//  previewUrl: this.storepreviewUrl,
//  skills: this.storekills,
//  projects:this.storeprojects,
//  textEntered :this.storetextEntered,
//  coverLettertextEntered :this.storecoverLettertextEntered,
// }

// console.log(url);
//  console.log("Leaving Service ")

//  console.log(data);
//  return this.http.post<any>(url,data);

// }


// getData()
// {
  
// }


// passDataToUser()
// {

//   const data : webAllDetails = {


    
//   }
// }

}
