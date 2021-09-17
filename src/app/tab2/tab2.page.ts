import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  feeds: any = [] ;
  feedsWithNoImgInSummary = [];
  isEmptyFeed: boolean = false;



  constructor(private dataService: DataService, private router: Router, private toastCtrl: ToastController) {
   }


  ngOnInit(): void {

    this.getData().then(() => {
      this.removeImagesFromFeed(this.feeds);
    }).then(() => {
      return this.isEmptyFeed = this.isEmptyArray(this.feedsWithNoImgInSummary) ? true : false;
    });
  }


  ionViewWillEnter() {
    this.getData().then(() => this.removeImagesFromFeed(this.feeds))
      .then(() => {
        return this.isEmptyFeed = this.isEmptyArray(this.feedsWithNoImgInSummary) ? true : false;
      });

  }


  isEmptyArray(array: Array<any>) {
    if (array != undefined && array.length == 0) return true;
  }


  removeImagesFromFeed(array: Array<any>) {
    this.feedsWithNoImgInSummary = [];
    array.forEach(element => {
      for (let key in element) {
        if (typeof (element[key]) === "string" && element[key] != null && key == "summary") {
          element[key] = element[key].replace(/<img .*?>/g, '');
          this.feedsWithNoImgInSummary.push(element);
        }
      }    
    });
    

  }


  async getData() {
    this.feeds = [];
    await this.dataService.getFavoris().then(data => {
      this.feeds = data
    });
  }

  readArticle(id) {
    this.router.navigate(['tabs/tab2/favoris/article/', id])
  }

  deleteArticle() {
    this.toastDelete().then(data => {
      data.present();
    });
  }

  goBack() {
    this.router.navigate(['tabs/tab1']);
  }

  async toastDelete() {
    const toast = await this.toastCtrl.create({

      message: 'Êtes vous sûr de vouloir supprimer les favoris?',
      position: 'middle',
      color: 'danger',
      duration: 3500,
      buttons: [
        {
          text: 'oui',
          role: 'cancel',
          handler: () => {
            this.dataService.deleteArticleFromFav();
            this.router.navigate(['tabs/tab1'])
          }
        },
        {
          text: 'non',
        }
      ]
    });
    return toast;
  }

  refresh(event) {
    this.getData()
      .then(() => this.removeImagesFromFeed(this.feeds))
      .then(() => event.target.complete());
  }
  

}
