import { Component, OnInit } from '@angular/core';
import {BiographyService} from './biography.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.css'],
  providers: [BiographyService]
})
export class BiographyComponent implements OnInit {
  biographyDet: any = {
      biography: ''
  };
  private biographies;
  
  constructor(public biographyService: BiographyService, private router: Router, 
    private location: Location, private route: ActivatedRoute) {
    console.log('Biography CONSTRUCTOR **')
  }

  ngOnInit() { 
    console.log('ON INIT Biography Component**')
    this.biographyService.getBiographies()
    .then((res) =>{
        console.log('ngOnIt In the Biography component' ,res);
        this.biographies = res;
    })
  }
  
  
  addBiography(){
    if(this.biographyDet.biography.length > 0){
      this.biographyService.addBiography({biography: this.biographyDet.biography})
      .then((res) =>{
          console.log('addBiography In the Biography component -- post' ,res);
          this.biographies = res;
          this.biographyDet.biography = '';
          this.router.navigateByUrl('/biography');
      })
    }
    else{
      alert("Biography details cannot be blank!!");
    }
  }


  removeBiography(index: number){
    this.biographyService.removeBiography(index)
    .then((res) =>{
        console.log('removeBiography In the Biography component -- remove' ,res);
        this.biographies = res;
        
        this.router.navigateByUrl('/biography');
    })
  }

}
