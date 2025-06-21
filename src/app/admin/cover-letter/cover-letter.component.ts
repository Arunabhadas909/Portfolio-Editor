import { Component } from '@angular/core';
import { Service1Service } from 'src/app/service1.service';

@Component({
  selector: 'app-cover-letter',
  templateUrl: './cover-letter.component.html',
  styleUrls: ['./cover-letter.component.css']
})
export class CoverLetterComponent {


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

}
