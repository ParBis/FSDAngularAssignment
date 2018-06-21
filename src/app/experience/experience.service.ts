import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
 

const STORAGE_KEY = "my-experiences"
const STORAGE_KEY_TODO = "my-todo"

const STORAGE_KEY_INDEX = "index"

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class ExperienceService {

    
    
    experiences : Array<object> = []; 
    
    todoObj : object;
    index: number;
    constructor(private http : HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService){

    }

    getExperiences() {
        return new Promise((resolve, reject) => {
            this.experiences = this.storage.get(STORAGE_KEY) || []
            resolve(this.experiences)
        })

    }

    addExperience(obj){
        //alert(obj);
        return new Promise((resolve, reject) => {
            this.experiences.push(obj)
            // Auto stringyfies the object
            this.storage.set(STORAGE_KEY, this.experiences);
            resolve(this.experiences)
        })
    }

    removeExperience(index: number){
        return new Promise((resolve, reject) => {
            this.experiences = this.storage.get(STORAGE_KEY)
            this.experiences.splice(index, 1);
            this.storage.set(STORAGE_KEY, this.experiences)
            resolve(this.experiences)
        })
    }

    
    editTodo(index: number){
        return new Promise((resolve, reject) => {
            this.experiences = this.storage.get(STORAGE_KEY)
            this.todoObj = this.experiences[index];
            this.storage.set(STORAGE_KEY_TODO, this.todoObj)
            //console.log(JSON.stringify(this.todoObj));
            this.index = index;
            this.storage.set(STORAGE_KEY_INDEX, this.index)
            console.log("index-->", this.todoObj);
            resolve(this.todoObj)
        })
    }


}