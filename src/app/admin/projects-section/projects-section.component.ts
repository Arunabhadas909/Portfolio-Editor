import { Component, OnInit } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { transpileModule } from 'typescript';

import { Service1Service } from '../../service1.service';
// import { NgModel } from '@angular/forms';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs';
import { projectSchema, ReadLink } from '../../interface';
@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css']
})
export class ProjectsSectionComponent implements OnInit {


  constructor(private service:Service1Service){}
  

  


 readLink:ReadLink  =
  {
    title:'',
    description:'',
    img:'',
    url:'',
  };




  projects:{title: string; description:string; img:string; url:string } [] = [];

  url:string ='';
  projectDescription='';

  // project:projectSchema =
  // {
  //   projectLink:this.url,
  //   projectDescription:this.projectDescription,
  // }

textEntered: string='';
  isSaved=false;

  showDiv = 'div1';

  hovered = false;


isClickedUploadButton = false;  
showEditButton=false;

isIconClicked = false;


Projects: number[] =[1];

projectsCount = 1;

files:{name: string ; url:string ; thumbnail: string; type:string} [] = [];
// projectClasses=['col-2','border','rounded','project-box','text-center']

// Projects:{}

previewUrl: string | ArrayBuffer | null = null;

renderProject = false;



  showProject()
{
  // if(this.renderProject == false)
  //   {
    // this.projectsCount++;
    this.Projects;
    //.push(this.projectsCount);
    // }
}


  // onProjectSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (!input.files?.length) return;

  //   const file = input.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.files.push({
  //       name: file.name,
  //       url: reader.result as string,
  //     });
  //   };

  //   reader.readAsDataURL(file); // read file as base64
  // }


   async onProjectSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    for (const file of Array.from(input.files)) {
      const type = file.type;

      if (type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            name: file.name,
            url: reader.result as string,
            thumbnail: reader.result as string,
            type,
          });
        };
        reader.readAsDataURL(file);

        console.log(reader);
      } 
      
      // else if (type === 'application/pdf') {
      //   const reader = new FileReader();
      //   reader.onload = async () => {
      //     const pdfData = new Uint8Array(reader.result as ArrayBuffer);
      //     const pdf: PDFDocumentProxy = await getDocument({ data: pdfData }).promise;
      //     const page = await pdf.getPage(1);

      //     const canvas = document.createElement('canvas');
      //     const ctx = canvas.getContext('2d')!;
      //     const viewport = page.getViewport({ scale: 1.5 });

      //     canvas.height = viewport.height;
      //     canvas.width = viewport.width;

      //     await page.render({ canvasContext: ctx, viewport }).promise;

      //     const thumbnail = canvas.toDataURL();

      //     this.files.push({
      //       name: file.name,
      //       url: reader.result as string,
      //       thumbnail,
      //       type,
      //     });
      //   };
      //   reader.readAsArrayBuffer(file);
      // }
      
      else {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            name: file.name,
            url: reader.result as string,
            thumbnail: 'assets/file-icon.png', 
            type,
          });
        };
        reader.readAsDataURL(file);
      }
    }

    this.showProject();
  }

  deleteFile(index: number) {
    this.projects.splice(index, 1);
  }


  addProjectToDatabase()
{
  const project: projectSchema =
  {
    projectLink:this.url,
    projectDescription:this.projectDescription,
  }
  console.log("posting projects");
  console.log(project);
    this.service.postProjects('/project', project).subscribe({

      next: (response:any)=>{

        console.log(response);

      },

      error:error => {

        console.log(error);
      }
      

    });
}


 placeProject()
{

  console.log("posting projects ...");
  this.addProjectToDatabase();

  console.log(this.url);
 

  

  this.showDiv='div3';
  this.service.getProject(this.url).subscribe(async (link:ReadLink)=>
    {
      if(link)
        {
          this.readLink = await link;
          console.log(link);
          console.log("service is working");
          console.log(this.readLink);
          this.service.storeprojects.push({
            title:this.readLink.title,
            description:this.readLink.description,
            img:this.readLink.img,
            url:this.readLink.url,
          })
        }

        this.projects.push({

    title:this.readLink.title,
    description:this.readLink.description,
    img:this.readLink.img,
    url:this.readLink.url
   
  })


  this.service.passDataToUserComp({
          // textEntered:this.textEntered

          // previewUrl:this.previewUrl

          projects:this.projects
        });
   console.log("projects: ");
   console.log(this.projects);
    });

  
  console.log("projects: ");
console.log(this.projects);
  console.log(this.readLink);
  console.log(this.service.readLink);
  console.log(this.service.getProject(this.url));
  this.showProject();
this.showDiv ='div1';




}

goBack()
{
  this.showDiv = 'div1';
}

// addProjectToDatabase(data:projectSchema)
// {
//     this.service.postProjects('/project', data).subscribe({

//       next: (response:any)=>{

//         console.log(response);

//       },

//       error:error => {

//         console.log(error);
//       }
      

//     });
// }



getProjects()
{
  console.log("getting projects");
  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      // const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.projects= await info.projects;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('projects ',this.projects);
      // console.log('data' , data);

    })
}



  ngOnInit()
  {

    // this.service.data$.subscribe( (updatedData) =>
    //   {
    //     this.data = updatedData;
    //      this.projects = updatedData.projects ?? '';

    //     //  this.previewUrl = updatedData.previewUrl;
    //         console.log(this.data);
    //         console.log('projects: '  , this.projects);
    this.getProjects();
      // });
  }

}
