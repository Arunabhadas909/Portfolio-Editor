import { Component } from '@angular/core';

// import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transpileModule } from 'typescript';


// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs';
import { Router } from '@angular/router';
import { Service1Service } from '../service1.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  constructor(private routes:Router , private service: Service1Service){}
  
  
  
    title = 'admin';
  
    textEntered: string='';
    isSaved=false;
  
    showDiv = 'div1';
  
    hovered = false;
  
    goToHome= false;
  
  isClickedUploadButton = false;  
  showEditButton=false;
  
  
  showSidebar = false;
  
  isIconClicked = false;
  
  
  Projects: number[] =[1];
  
  projectsCount = 1;
  
  files:{name: string ; url:string ; thumbnail: string; type:string} [] = [];
  // projectClasses=['col-2','border','rounded','project-box','text-center']
  
  // Projects:{}
  
  previewUrl: string | ArrayBuffer | null = null;
  
  renderProject = false;
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  storeText(evnt:Event)
  {
  
    var value = (event?.target as HTMLTextAreaElement).value;
    this.textEntered = value;
    console.log(this.textEntered);
  }
  
  onMouseEnter()
  {
    this.hovered=true;
    this.showEditButton=true;
  
  }
  onMouseLeave()
  {
     this.hovered= false;
     this.showEditButton=false;
  }
  
  showProject()
  {
    // if(this.renderProject == false)
    //   {
      // this.projectsCount++;
      this.Projects;
      // .push(this.projectsCount);
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
        else {
          const reader = new FileReader();
          reader.onload = () => {
            this.files.push({
              name: file.name,
              url: reader.result as string,
              thumbnail: 'assets/file-icon.png', // fallback icon
              type,
            });
          };
          reader.readAsDataURL(file);
        }
      }
  
      this.showProject();
    }
  
    deleteFile(index: number) {
      this.files.splice(index, 1);
    }
  
  
    // goToUser()
    // {
    //  this.routes.navigate(['/userComp'])
    // }

  passDataToBackend()
  {
    // console.log('Sending Data  To Backend')
    // this.service.postAllDataToDatabase('/data').subscribe(
    //   (response)=>
    //     {

    //       console.log(response);
    //     },
    //    ( error )=>
    //       {
    //         console.log(error);
    //       }

      
    // );
    // console.log('Checking Service');
  }


}
