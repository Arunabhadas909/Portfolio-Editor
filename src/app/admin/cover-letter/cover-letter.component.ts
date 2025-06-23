import { Component,OnInit } from '@angular/core';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.css']
})
export class CoverLetterComponent implements OnInit{


  constructor(private service:Service1Service){}

  showDiv='div1';

  textEntered: string='';

  hovered=false;


  // noChange = true;

  showEditButton=false;

  storeText(event:Event)
{

  var value = (event?.target as HTMLTextAreaElement).value;
  this.textEntered = value;
  console.log(this.textEntered);
  

  // this.service.storecoverLettertextEntered = this.textEntered;

        this.service.passDataToUserComp({
          // textEntered:this.textEntered

          // previewUrl:this.previewUrl

          coverLettertextEntered :this.textEntered
        });
  // this.noChange = false;
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



   getCoverLetterText()
{

  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      // const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.textEntered= await info.coverLettertextEntered;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('Cover Letter Text',this.textEntered);
      // console.log('data' , data);

    })
}



  ngOnInit()
  {

    this.getCoverLetterText();
  }


  
}
