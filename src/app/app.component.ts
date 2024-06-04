import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { CommonModule } from '@angular/common';
import { event } from 'jquery';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, HeaderComponent,FooterComponent,AmplifyAuthenticatorModule]
})
export class AppComponent {
  screenHeight: any;
  screenWidth:any;
  footerMaxHeight!:number;
  title = 'latestApp';

  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    this.getScreenSize();
  }



getScreenSize() {
  if (isPlatformBrowser(this.platformId)) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxHeight = this.screenHeight - 160;
  }
}

}
