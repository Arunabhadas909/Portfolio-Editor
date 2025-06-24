import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { transpileModule } from 'typescript';


// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as RouterEvent } from '@angular/router';
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// import * as pdfjsLib from 'pdfjs-dist';
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// import 'pdfjs-dist/build/pdf.worker.entry'; // registers the worker

// type PDFDocumentProxy = pdfjsLib.PDFDocumentProxy;
// const getDocument = pdfjsLib.getDocument;

// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;


// GlobalWorkerOptions.workerSrc = workerSrc;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {




     loading = false;

constructor(private routes:Router){


     this.routes.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
}











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


  goToUser()
  {
   this.routes.navigate(['/userComp'])
  }
  










}



