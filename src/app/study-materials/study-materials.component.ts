import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from './../data';

@Component({
  selector: 'app-study-materials',
  templateUrl: './study-materials.component.html',
  styleUrls: ['./study-materials.component.scss']
})
export class StudyMaterialsComponent implements OnInit {

  constructor(private route:Router, private data: Data) { }

  ngOnInit() {
  }
  className:string;
  onSelectClass(className:string){
    this.data.storage ={
      "class" : className
    }
    //if(className === 'SIX'){
      this.route.navigate(['/class-six']);
    //}
    console.log(className);
  }
}
