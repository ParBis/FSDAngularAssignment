import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  projectDet: any = {
      project: ''
  };
  private projects;
  
  constructor(public projectService: ProjectService, private router: Router, 
    private location: Location, private route: ActivatedRoute) {
    console.log('Project CONSTRUCTOR **')
  }


  ngOnInit() { 
    console.log('ON INIT Project Component**')
    this.projectService.getProjects()
    .then((res) =>{
        console.log('ngOnIt In the Project component' ,res);
        this.projects = res;
    })
  }


  addProject(){
    if(this.projectDet.project.length > 0){
      this.projectService.addProject({project: this.projectDet.project})
      .then((res) =>{
          console.log('addProject In the Project component -- post' ,res);
          this.projects = res;
          this.projectDet.project = '';
          this.router.navigateByUrl('/projects');
      })
    }
    else{
      alert("Project details cannot be blank!!");
    }
  }


  removeProject(index: number){
    this.projectService.removeProject(index)
    .then((res) =>{
        console.log('removeProject In the Project component -- remove' ,res);
        this.projects = res;
        
        this.router.navigateByUrl('/projects');
    })
  }

}
