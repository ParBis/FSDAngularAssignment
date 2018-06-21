import { Component, OnInit } from '@angular/core';
import {ExperienceService} from './experience.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  providers: [ExperienceService]
})
export class ExperienceComponent implements OnInit {
  experienceDet: any = {
      experience: ''
  };
  private experiences;
  
  constructor(public experienceService: ExperienceService, private router: Router, 
    private location: Location, private route: ActivatedRoute) {
    console.log('Experience CONSTRUCTOR **')
  }


  ngOnInit() { 
    console.log('ON INIT Experience Component**')
    this.experienceService.getExperiences()
    .then((res) =>{
        console.log('ngOnIt In the Experience component' ,res);
        this.experiences = res;
    })
  }


  addExperience(){
    if(this.experienceDet.experience.length > 0){
      this.experienceService.addExperience({experience: this.experienceDet.experience})
      .then((res) =>{
          console.log('addExperience In the Experience component -- post' ,res);
          this.experiences = res;
          this.experienceDet.experience = '';
          this.router.navigateByUrl('/experience');
      })
    }
    else{
      alert("Experience details cannot be blank!!");
    }
  }


  removeExperience(index: number){
    this.experienceService.removeExperience(index)
    .then((res) =>{
        console.log('removeExperience In the Experience component -- remove' ,res);
        this.experiences = res;
        
        this.router.navigateByUrl('/experience');
    })
  }

}
