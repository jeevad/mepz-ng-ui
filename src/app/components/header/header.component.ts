import { Component, OnInit } from '@angular/core';
import { Account, Role } from '@app/_models';
import { AccountService } from '@app/_services';
import * as $ from 'jquery';
import 'metismenu';

// declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpened: boolean = false;

  Role = Role;
  account?: Account | null;
  userDetails: any;

  constructor(private accountService: AccountService) {
    // this.accountService.account.subscribe((x) => (this.account = x));
    console.log('this.accountService.accountValue',this.accountService.accountValue);
    this.userDetails = this.accountService.accountValue;
    
  }

  logout() {
    this.accountService.logout();
  }

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
              $('.main-content').addClass('body-width');
            },
            function () {
              $('.wrapper').removeClass('sidebar-hovered');
              $('.wrapper').addClass('toggled');
              $('.main-content').removeClass('body-width');
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
