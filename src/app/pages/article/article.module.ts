import { SwipeModule } from './../../directives/directives.module';
import { LoaderModule } from './../../loader/loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ArticlePageRoutingModule } from './article-routing.module';
import { ArticlePage } from './article.page';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    LoaderModule,
    SwipeModule
  ],
  declarations: [ArticlePage]
})
export class ArticlePageModule {}
