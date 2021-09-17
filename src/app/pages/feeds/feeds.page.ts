import { Newspaper } from './../../models/newspaper';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {


  newspaper: any;
  feeds: Array<Newspaper>;
  title: string;
  feedsWithNoImgInSummary: Array<Newspaper> = [];

  constructor(private dataService: DataService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params.id;
    this.dataService.getNewspaperById(id)
      .then(elem => this.newspaper = elem)
      .then(() => {
        this.title = this.newspaper.name;
        this.loadFeed(this.newspaper.url).then(() => {
          this.removeImgFromFeed(this.feeds);
        });
      })
      .catch(err => console.log(err))
  }


  removeImgFromFeed(array: Array<any>): void {
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


  async loadFeed(url: string): Promise<any> {
    await this.dataService.getFeedContent(url)
      .then(data => {
        this.feeds = data.entries,
          this.dataService.feedsTemp = data.entries;
      })
      .catch(error => console.log(error));

  }

  readArticle(id: number, title: string, articleTitle: string): void {
    this.dataService.articleTitleTemp = articleTitle
    this.dataService.title = title;
    this.router.navigate(['tabs/tab1/feeds/article/', id]);
  }

  goBack(): void {
    this.router.navigate(['tabs/tab1']);
  }


  refresh(event): void {
    this.loadFeed(this.newspaper.url).then(() => {
      this.removeImgFromFeed(this.feeds);
    }).then(() => event.target.complete());


  }

  onSwipeLeft($event) {
    this.router.navigate(['tabs/tab1']);
  }



}
