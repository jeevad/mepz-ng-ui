import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'metismenu';

// declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  isMenuOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {
    $(function () {
      $('#menu').metisMenu();
    });
    $(() => {
      // $('#menu').metisMenu();
      $('.mobile-toggle-menu').on('click', function () {
        $('.wrapper').addClass('toggled');
      });

      // toggle menu button
      $('.toggle-icon').on('click', function () {
        if ($('.wrapper').hasClass('toggled')) {
          $('.wrapper').removeClass('toggled');
          // $(".wrapper").removeClass("sidebar-hovered");
          $('.sidebar-wrapper').off('hover');
          $('.page-wrapper').addClass('changes');
        } else {
          $('.wrapper').addClass('toggled');
          $('.sidebar-wrapper').unbind('hover');
          $('.page-wrapper').removeClass('changes');
          $('.sidebar-wrapper').hover(
            function () {
              $('.wrapper').addClass('sidebar-hovered');
              $('.wrapper').removeClass('toggled');
            },
            function () {
              $('.wrapper').removeClass('sidebar-hovered');
              $('.wrapper').addClass('toggled');
            }
          );
        }
      });
      $('.metismenu li .dropdown li a').on('click', () => {
        $('.metismenu li ul li a').parents('.dropdown').addClass('mm-show');
      });
      $('.metismenu li ul .dropdown-item a').on('click', () => {
        $('.metismenu li ul .dropdown-item a')
          .parents('ul')
          .addClass('mm-show');
      });
    });
  }
}
