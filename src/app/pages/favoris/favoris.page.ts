import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  article: any;
  articleContentWithoutImg: any;


  constructor(private actRoute: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.params.id;
    this.dataService.getFavorisById(id)
      .then(data => this.article = data)
      .then(() => {
        this.articleContentWithoutImg = this.article.description.replace(/<img .*?>/g, '');
      });

  }

  goBack() {
    this.router.navigate(['tabs/tab2']);
  }

  refresh(event) {
    event.target.complete();
  }

  onSwipeLeft($event) {
    this.router.navigate(['tabs/tab2']);
  }




}
