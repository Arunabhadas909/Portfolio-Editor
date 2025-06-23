import { Component, OnInit } from '@angular/core';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit{

constructor(private service:Service1Service){}


  textEntered: string='';
  isSaved=false;


    username ="";
    designation ="";



  showDiv = 'div1';

  hovered = false;

  nameSaved =false;
  designationSaved = false;
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

showWork = 'div1';
// this.service.storepreviewUrl = previewUrl;


onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      //Passing Data To Backend Through Service1Service
      // this.service.storepreviewUrl = this.previewUrl;

        this.service.passDataToUserComp({
          // textEntered:this.textEntered

          previewUrl:this.previewUrl
        });
    };
    reader.readAsDataURL(file);

    console.log(reader.readAsDataURL(file));
  }
}

storeText(event:Event)
{

  var value = (event?.target as HTMLTextAreaElement).value;
  this.textEntered = value;
  console.log(this.textEntered);

 localStorage.setItem('aboutText', this.textEntered);

  //Passing Data To Backend Through Service1Service
  this.service.passDataToUserComp({
    textEntered:this.textEntered
  });
console.log('storedText',this.service.storetextEntered);
  // this.service.storetextEntered = localStorage.getItem('aboutText')?? '';

  console.log('storedText',this.service.storetextEntered);


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

goBack()
{
  this.showDiv = 'div1';
}

saveName(event:Event)
{

  //  var value = (event?.target as HTMLInputElement).value;
  // this.username = value;



 this.service.passDataToUserComp({
    username:this.username,
  });

  console.log(this.username);
  this.nameSaved = true;
}

saveDesignation(event:Event)
{

  //  var value = (event?.target as HTMLInputElement).value;
  // this.designation = value;



 this.service.passDataToUserComp({
  username:this.username,
    designation:this.designation,
  
  });

  // this.designationSaved = true;

this.showWork = 'div2';

  // if(this.nameSaved && this.designationSaved)
  //   {
  //     this.showWork = "'div2'";
  //   }
}

getIntro()
{

  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      // const data = await info;
      const base64 : string| ArrayBuffer | null = await info.previewUrl;
      const mimeType = await info.mimeType;
      this.textEntered = await data.textEntered;
      this.username = await data.username;
      this.designation = await data.designation;


      this.previewUrl = `data:${mimeType};base64,${base64}`;
      
      console.log('previewUrl' ,this.previewUrl);
      console.log('base64' ,base64);
      // console.log('data' , data);

    })
}

ngOnInit()
  {

    this.getIntro();
  }

  
}
