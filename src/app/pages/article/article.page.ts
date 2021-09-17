import { Newspaper } from './../../models/newspaper';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  newspaper: Newspaper;
  feeds: any = [];
  articleFromFeed: any;
  articleContentWithoutImg: any;
  title: string;
  isFav: boolean;
  link: string;



  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController,
    private router: Router

  ) { }

  ngOnInit() {
    this.title = this.dataService.title;
    this.feeds = this.dataService.feedsTemp;

    (this.dataService.getFeedByArticleId())
      .then(data => this.articleFromFeed = data)
      .then(() => this.link = this.articleFromFeed.link)
      .then(() => this.articleContentWithoutImg = this.articleFromFeed.description.replace(/<img .*?>/g, ''))
      .then(() => this.dataService.isAlreadyFav(this.articleFromFeed.title).then(data => this.isFav = data))
      .catch(data => console.log(data))

  }


  ionViewWillEnter(): void {
    this.feeds = [];
    this.feeds = this.dataService.feedsTemp;
  }

  addFavoris(article: any): void {
    article.name = this.title;
    this.dataService.addFavoris(article);
    this.toastFavoris();
    this.isFav = true;
  }

  async toastFavoris(): Promise<any> {
    const toast = await this.toastCtrl.create({
      message: 'Article ajouté aux favoris',
      position: 'top',
      duration: 500,
      animated: true,
      color: 'tertiary'

    });
    toast.present();
  }

  goBack(): void {
    let id = this.dataService.id;
    this.router.navigate(['tabs/tab1/feeds/' + id]);
  }


  refresh(event): void {
    event.target.complete();
  }


  onSwipeLeft($event) {
    let id = this.dataService.id;
    this.router.navigate(['tabs/tab1/feeds/'+id]);
  }


}
