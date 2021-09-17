declare var feednami: any;
import { Newspaper } from './../models/newspaper';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { AngularFireDatabase } from '@angular/fire/database';
import { promise } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  db;
  newspapers = [];
  feedsTemp = [];
  title: string;
  id: number;
  allFavs = [];
  articleTitleTemp: string;


  constructor(private afd: AngularFireDatabase) {
    this.db = new Dexie('appNews');
    this.db.version(1).stores({
      favoris: '++id, article'
    });
  }

  getAllNewspapers() {
    return new Promise((resolve, reject) => {
      this.afd.list('newspapers').valueChanges().subscribe(data =>{
        if(data) resolve(data);
        else reject("Error while getting newspapers, nothing found in the database =(");
      })
    })
  }

  getNewspaperById(id: number) {
    this.id = id;
    let tempNewspapers ;
    return new Promise((resolve, reject) => {
      this.getAllNewspapers()
        .then(data => tempNewspapers = data)
        .then(() => {
          tempNewspapers.map(elem => {
            if (elem.id === +id) {
              resolve(elem);
            }
          });
          reject("Error, invalid id or issue while fetching newspapers =(")
        }
        );
    })


  }

  getFeedContent(url: string): Promise<any> {  
    return feednami.load(url);
  }


  getFeedByArticleId() {
    let articleToReturn;
    return new Promise((resolve, reject) => {
      this.feedsTemp.map(feed => {
        if (feed.title == this.articleTitleTemp){
          articleToReturn = feed;
          resolve(articleToReturn);
        }
      });
    })
  }

  async isAlreadyFav(title: string) {
    await this.getFavoris();
    for (let i = 0; i < this.allFavs.length; i++) {
      if (title === this.allFavs[i].title) return true;
    } return false;
  }


  addFavoris(article) {
    this.db.favoris.add(article);
  }

  getFavoris(): Dexie.Promise<any[]> {
    return this.db.favoris.toArray()
      .then(data => {
        this.allFavs = data;
        return data
      })
      .catch(error => console.log(error))
  }

  getFavorisById(id:number) {
    return new Promise((resolve, reject) => {
      this.db.favoris.toArray()
        .then((data) => {
          this.allFavs = data;
        })
        .then(() => {
          for (let i = 0; i < this.allFavs.length; i++) {
            if (i == id) {
              resolve(this.allFavs[i]);
            }
          } reject('error');
        })
    });

  }

  deleteArticleFromFav() {
    this.db.favoris.clear();
  }

  
}
