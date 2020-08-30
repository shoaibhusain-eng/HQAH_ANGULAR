import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-container',
  templateUrl: './service-container.component.html',
  styleUrls: ['./service-container.component.css']
})
export class ServiceContainerComponent implements OnInit {

  index = 2;
  imageSrc = 'assets/images/services/13.png' ;
  imgalt = 'test';

 service = ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
   'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.'
 ];



  constructor() { }

  ngOnInit(): void {
  }

  test()
  {
    this.index = 2;
    this.imageSrc = 'assets/images/services/13.png' ;
  }
  test1()
  {
    this.index = 1;
    this.imageSrc = 'assets/images/services/14.png' ;
  }

}
