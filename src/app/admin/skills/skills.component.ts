import { Component, OnInit } from '@angular/core';
// import { string } from 'mathjs';
import { Service1Service } from '../../service1.service';
import { skillsSchema } from '../../interface';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  constructor(private service:Service1Service){}
showSkill = 'div1';
skillAdded = false;

viewSkill = "html";
response = "";

addSkills=[1];
skillName ="";
skillImg ="";
skills:{ name:string; img:string;} [] =[];

skillsToBeSent:skillsSchema = {

  name:"",
  img:""
}

gotSkills:skillsSchema [] = [ {

  name:"",
  img:""
}];

saveSkill()
{
this.skillAdded=true;
this.showSkill = 'div1';

this.skills.push({

  name:this.skillName,
  img:this.skillImg
});

this.skillsToBeSent = {
  name:this.skillName,
  img:this.skillImg
}


this.service.storekills.push({
    name:this.skillName,
    img:this.skillImg,
})


      console.log("Skills found")

      this.service.passDataToUserComp({
      // textEntered:this.textEntered

      skills:this.skills
      });
this.service.postSkills("/skills",this.skillsToBeSent).subscribe(

  response=> 
    {
      console.log(response);
    },
  error => 
    {
       console.error('error',error);
    }

);


}

getskills()
{

  console.log("getting skills")

  // this.service.getSkills('/skills', this.viewSkill).subscribe((skills:skillsSchema) => {


  //   if(skills)
  //     {

  //       const skillsFound =  skills;
  //       this.skills.push(skills);
  //       console.log(this.gotSkills);

  //       // console.log("Skills found")

  //       //        this.service.passDataToUserComp({
  //       //   // textEntered:this.textEntered

  //       //   skills:this.gotSkills
  //       // });

  //     }
    



  // })



  this.service.getDataFromDatabase('/data').subscribe( async (info) =>
    {
      // const data = await info;
      // const base64 : string| ArrayBuffer | null = await info.previewUrl;
      // const mimeType = await info.mimeType;

      // this.gotPreviewUrl = `data:${mimeType};base64,${base64}`;
      this.skills = await  info.skills;


      // console.log('goPreviewUrl' ,this.gotPreviewUrl);
      // console.log('base64' ,base64);
      console.log('skillsFound ',this.skills);
      console.log('data' , data);

    })



  




}
    deleteSkill(index: number) {
    this.skills.splice(index, 1);
  }



  goBack()
{
  this.showSkill = 'div1';
}


    ngOnInit()
  {

    this.service.data$.subscribe( (updatedData) =>
      {
        // this.data = updatedData;
         this.skills = updatedData.skills ?? '';

        //  this.previewUrl = updatedData.previewUrl;
            // console.log(this.data);
            console.log('skills : '  , this.skills);

    // console.log('textEntered :' , this.textEntered);

      });

      this.getSkills();
    
    }


  
}
