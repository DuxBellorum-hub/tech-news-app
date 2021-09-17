import { EllipsisPipe } from './ellipsis.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NoSanitizePipe } from './no-sanitize.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [EllipsisPipe, NoSanitizePipe], 
  exports:[EllipsisPipe, NoSanitizePipe]
})
export class PipesModule {}
