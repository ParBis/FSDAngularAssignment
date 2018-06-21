import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
 

const STORAGE_KEY = "my-biography"
const STORAGE_KEY_TODO = "my-todo"

const STORAGE_KEY_INDEX = "index"

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class BiographyService {

    
    
    biographies : Array<object> = []; 
    
    todoObj : object;
    index: number;
    constructor(private http : HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService){

    }

    getBiographies() {
        return new Promise((resolve, reject) => {
            this.biographies = this.storage.get(STORAGE_KEY) || []
            resolve(this.biographies)
        })

    }

    addBiography(obj){
        //alert(obj);
        return new Promise((resolve, reject) => {
            this.biographies.push(obj)
            // Auto stringyfies the object
            this.storage.set(STORAGE_KEY, this.biographies);
            resolve(this.biographies)
        })
    }

    removeBiography(index: number){
        return new Promise((resolve, reject) => {
            this.biographies = this.storage.get(STORAGE_KEY)
            this.biographies.splice(index, 1);
            this.storage.set(STORAGE_KEY, this.biographies)
            resolve(this.biographies)
        })
    }

    
    editTodo(index: number){
        return new Promise((resolve, reject) => {
            this.biographies = this.storage.get(STORAGE_KEY)
            this.todoObj = this.biographies[index];
            this.storage.set(STORAGE_KEY_TODO, this.todoObj)
            //console.log(JSON.stringify(this.todoObj));
            this.index = index;
            this.storage.set(STORAGE_KEY_INDEX, this.index)
            console.log("index-->", this.todoObj);
            resolve(this.todoObj)
        })
    }


}