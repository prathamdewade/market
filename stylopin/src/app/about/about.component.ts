import { Component, OnInit } from '@angular/core';
import { APIService } from '../shardData/api.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  aboutus : any=[]
  //aboutData:any = {}
  constructor(private apiService: APIService) {
  
    
  }
  ngOnInit(): void {
    this.getAboutUs();
   
    
  }
  getAboutUs(){
    this.apiService.getAllAbout().subscribe(
      (data: any) => {
        this.aboutus = data.data[0];
        console.log('About Us Data:', this.aboutus?.length);
        

        console.log('About Us data fetched successfully:', this.aboutus);
      },
      (error) => {
        console.error('Error fetching About Us data:', error);
      }
    );
  }


  
}
