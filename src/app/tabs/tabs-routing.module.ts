import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule),
          }
        ]
      },
      {
        path: 'tab1',
        children: [
          {
            path: 'feeds/:id',
            loadChildren: () =>
              import('../pages/feeds/feeds.module').then(m => m.FeedsPageModule),
          }
        ]
      },
      {
        path: 'tab1',
        children: [
          {
            path: 'feeds/article/:id',
            loadChildren: () =>
              import('../pages/article/article.module').then(m => m.ArticlePageModule),
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: 'favoris/article/:id',
            loadChildren: () =>
              import('../pages/favoris/favoris.module').then(m => m.FavorisPageModule),
          }
        ]
      }
      
     
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo: '/tabs/tab1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
