import { NoSanitizePipe } from './../../pipes/no-sanitize.pipe';
import { SwipeModule } from './../../directives/directives.module';
import { LoaderModule } from './../../loader/loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedsPageRoutingModule } from './feeds-routing.module';
import { FeedsPage } from './feeds.page';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedsPageRoutingModule, 
    PipesModule,
    LoaderModule,
    SwipeModule,
  ],
  declarations: [FeedsPage]
})
export class FeedsPageModule {}
