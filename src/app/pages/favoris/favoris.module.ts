
import { SwipeModule } from './../../directives/directives.module';
import { LoaderModule } from './../../loader/loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorisPageRoutingModule } from './favoris-routing.module';

import { FavorisPage } from './favoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorisPageRoutingModule,
    LoaderModule,
    SwipeModule
  ],
  declarations: [FavorisPage]
})
export class FavorisPageModule {}
