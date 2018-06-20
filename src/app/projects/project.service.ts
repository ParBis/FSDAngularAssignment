import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
 

const STORAGE_KEY = "my-projects"
const STORAGE_KEY_TODO = "my-todo"

const STORAGE_KEY_INDEX = "index"

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class ProjectService {

    
    
    projects : Array<object> = []; 
    
    todoObj : object;
    index: number;
    constructor(private http : HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService){

    }

    getProjects() {
        return new Promise((resolve, reject) => {
            this.projects = this.storage.get(STORAGE_KEY) || []
            resolve(this.projects)
        })

    }

    addProject(obj){
        //alert(obj);
        return new Promise((resolve, reject) => {
            this.projects.push(obj)
            // Auto stringyfies the object
            this.storage.set(STORAGE_KEY, this.projects);
            resolve(this.projects)
        })
    }

    removeProject(index: number){
        return new Promise((resolve, reject) => {
            this.projects = this.storage.get(STORAGE_KEY)
            this.projects.splice(index, 1);
            this.storage.set(STORAGE_KEY, this.projects)
            resolve(this.projects)
        })
    }

    
    editTodo(index: number){
        return new Promise((resolve, reject) => {
            this.projects = this.storage.get(STORAGE_KEY)
            this.todoObj = this.projects[index];
            this.storage.set(STORAGE_KEY_TODO, this.todoObj)
            //console.log(JSON.stringify(this.todoObj));
            this.index = index;
            this.storage.set(STORAGE_KEY_INDEX, this.index)
            console.log("index-->", this.todoObj);
            resolve(this.todoObj)
        })
    }


}