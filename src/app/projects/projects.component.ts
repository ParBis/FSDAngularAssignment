import { Component, OnInit } from '@angular/core';
import {ProjectService} from './project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  projectId: '';
  private projects;
  
  constructor(public projectService: ProjectService, private router: Router) {
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


  addProject(projectId: string){
    if(projectId.length > 0){
      this.projectService.addProject({project: projectId})
      .then((res) =>{
          console.log('addProject In the Project component -- post' ,res);
          this.projects = res;
          //projectId = '';
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
