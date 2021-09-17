import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}


  newspaperRedir(){
    this.router.navigate(['tabs/tab1']);
  }

  favsRedir(){
    this.router.navigate(['tabs/tab2']);
  }
 

}
