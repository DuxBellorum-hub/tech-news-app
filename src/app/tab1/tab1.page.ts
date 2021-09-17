import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Newspaper } from '../models/newspaper';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  newspapers;


  constructor(private datasrvc: DataService, private router: Router) { }

  ngOnInit(): void {
   
    this.datasrvc.getAllNewspapers()
    .then(data => this.newspapers = data)
    .catch(err => console.log(err));
    
    this.datasrvc.feedsTemp = [];
  }
  

  goToPage(id:Number) {
     this.router.navigate(['/tabs/tab1/feeds/', id])

  }


}
