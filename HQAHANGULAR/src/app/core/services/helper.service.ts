import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, reduce } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var NProgress: any;
NProgress.configure({ showSpinner: true });

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  toastAnimate: any = 'slideFromTop';
  private history = [];
  constructor(
    private router: Router,
    private toastr: ToastrManager
  ) { }

  public loaderStart() {
    NProgress.start();
  }

  public loaderStop() {
    NProgress.done();
  }
  // Function to display success Toaster message
  public notifySuccess(msg: string = null) {
    this.toastr.successToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display info Toaster message
  public notifyInfo(msg: string = null) {
    this.toastr.infoToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display warning Toaster message
  public notifyWarnig(msg: string = null) {
    this.toastr.warningToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display error Toaster message
  public notifyError(msg: string = null) {
    this.toastr.errorToastr(msg, '', {
      animate: this.toastAnimate
    });
  }
  public lsSetItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
  public lsGetItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  public lsRemoveItem(key) {
    return localStorage.removeItem(key);
  }
  public lsClear() {
    return localStorage.clear();
  }

  public ssSetItem(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  public ssGetItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
  public ssRemoveItem(key) {
    return sessionStorage.removeItem(key);
  }
  public ssClear() {
    return sessionStorage.clear();
  }

  public encoder(strings) {
    if (strings) {
      try {
        return btoa(strings);
      } catch (error) {
        return undefined;
      }
    } else {
      return null;
    }
  }

  public decoder(encodedString) {
    if (encodedString) {
      try {
        return atob(encodedString);
      } catch (error) {
        return undefined;
      }
    } else {
      return null;
    }

  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/index';
  }

  // public errorHandler(error) {
  //   switch (error.status) {
  //     case 400:
  //       this.notifyError(error.statusText);
  //       break;
  //     case 401:
  //       this.notifyError(error.statusText);
  //       break;
  //     case 402:
  //       this.notifyError(error.statusText);
  //       break;
  //     case 403:
  //       this.notifyError(error.statusText);
  //       break;
  //     case 404:
  //       this.notifyError(error.statusText);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  public pageCount() {
    const countWords = [
      { countValue: '1', countTitle: '1 pages / 250 words' },
      { countValue: '2', countTitle: '2 pages / 500 words' },
      { countValue: '3', countTitle: '3 pages / 750 words' },
      { countValue: '4', countTitle: '4 pages / 1000 words' },
      { countValue: '5', countTitle: '5 pages / 1250 words' },
      { countValue: '6', countTitle: '6 pages / 1500 words' },
      { countValue: '7', countTitle: '7 pages / 1750 words' },
      { countValue: '8', countTitle: '8 pages / 2000 words' },
      { countValue: '9', countTitle: '9 pages / 2250 words' },
      { countValue: '10', countTitle: '10 pages / 2500 words' },
      { countValue: '11', countTitle: '11 pages / 2750 words' },
      { countValue: '12', countTitle: '12 pages / 3000 words' },
      { countValue: '13', countTitle: '13 pages / 3250 words' },
      { countValue: '14', countTitle: '14 pages / 3500 words' },
      { countValue: '15', countTitle: '15 pages / 3750 words' },
      { countValue: '16', countTitle: '16 pages / 4000 words' },
      { countValue: '17', countTitle: '17 pages / 4250 words' },
      { countValue: '18', countTitle: '18 pages / 4500 words' },
      { countValue: '19', countTitle: '19 pages / 4750 words' },
      { countValue: '20', countTitle: '20 pages / 5000 words' },
      { countValue: '21', countTitle: '21 pages / 5250 words' },
      { countValue: '22', countTitle: '22 pages / 5500 words' },
      { countValue: '23', countTitle: '23 pages / 5750 words' },
      { countValue: '24', countTitle: '24 pages / 6000 words' },
      { countValue: '25', countTitle: '25 pages / 6250 words' },
      { countValue: '26', countTitle: '26 pages / 6500 words' },
      { countValue: '27', countTitle: '27 pages / 6750 words' },
      { countValue: '28', countTitle: '28 pages / 7000 words' },
      { countValue: '29', countTitle: '29 pages / 7250 words' },
      { countValue: '30', countTitle: '30 pages / 7500 words' },
      { countValue: '40', countTitle: '40 pages / 10000 words' },
      { countValue: '50', countTitle: '50 pages / 12500 words' },
      { countValue: '60', countTitle: '60 pages / 15000 words' },
      { countValue: '70', countTitle: '70 pages / 17500 words' },
      { countValue: '80', countTitle: '80 pages / 20000 words' },
      { countValue: '90', countTitle: '90 pages / 22500 words' },
      { countValue: '100', countTitle: '100 pages / 25000 words' },
      { countValue: '110', countTitle: '110 pages / 27500 words' },
      { countValue: '120', countTitle: '120 pages / 30000 words' },
      { countValue: '130', countTitle: '130 pages / 32500 words' },
      { countValue: '140', countTitle: '140 pages / 35000 words' },
      { countValue: '150', countTitle: '150 pages / 37500 words' },
    ];
    return countWords;
  }

  public subjects() {
    const subject = [
      { subValue: 'accountings_and_finance', subTitle: 'Accountings and Finance' },
      { subValue: 'arts_and_humanities', subTitle: 'Arts and Humanities' },
      { subValue: 'economics', subTitle: 'Economics' },
      { subValue: 'engineering', subTitle: 'Engineering' },
      { subValue: 'computer_science', subTitle: 'IT Computer Science' },
      { subValue: 'law', subTitle: 'Law' },
      { subValue: 'management', subTitle: 'Management' },
      { subValue: 'nursing', subTitle: 'Nursing' },
      { subValue: 'science_And_maths', subTitle: 'Science and Maths' },
      { subValue: 'statistics', subTitle: 'Statistics' },
      { subValue: 'other_subjects', subTitle: 'Other Subjects' },
    ];
    return subject;
  }

  public australiaStateList() {
    const australiya = [
      {
        name: 'New South Wales',
        code: 'NSW'
      },
      {
        name: 'Victoria',
        code: 'VIC'
      },
      {
        name: 'Queensland',
        code: 'QLD'
      },
      {
        name: 'Tasmania',
        code: 'TAS'
      },
      {
        name: 'South Australia',
        code: 'SA'
      },
      {
        name: 'Western Australia',
        code: 'WA'
      },
      {
        name: 'Northern Territory',
        code: 'NT'
      },
      {
        name: 'Australian Capital Territory',
        code: 'ACT'
      }
    ];
    return australiya;
  }

  public malasiyaStateList() {
    const malasiya = [
      {
        name: 'Wilayah Persekutuan Kuala Lumpur',
        code: 'MY-14',
      },
      {
        name: 'Wilayah Persekutuan Labuan',
        code: 'MY-15',
      },
      {
        name: 'Wilayah Persekutuan Putrajaya',
        code: 'MY-16',
      },
      {
        name: 'Johor',
        code: 'MY-01',
      },
      {
        name: 'Kedah',
        code: 'MY-02',
      },
      {
        name: 'Kelantan',
        code: 'MY-03',
      },
      {
        name: 'Melaka',
        code: 'MY-04',
      },
      {
        name: 'Negeri Sembilan',
        code: 'MY-05',
      },
      {
        name: 'Pahang',
        code: 'MY-06',
      },
      {
        name: 'Perak',
        code: 'MY-08',
      },
      {
        name: 'Perlis',
        code: 'MY-09',
      },
      {
        name: 'Pulau Pinang',
        code: 'MY-07',
      },
      {
        name: 'Sabah',
        code: 'MY-12',
      },
      {
        name: 'Sarawak',
        code: 'MY-13',
      },
      {
        name: 'Selangor',
        code: 'MY-10',
      },
      {
        name: 'Terengganu',
        code: 'MY-11',
      }
    ];
    return malasiya;
  }

  public USAStateList() {
    const usa = [
      {
        name: 'Alabama',
        code: 'AL'
      },
      {
        name: 'Alaska',
        code: 'AK'
      },
      {
        name: 'American Samoa',
        code: 'AS'
      },
      {
        name: 'Arizona',
        code: 'AZ'
      },
      {
        name: 'Arkansas',
        code: 'AR'
      },
      {
        name: 'California',
        code: 'CA'
      },
      {
        name: 'Colorado',
        code: 'CO'
      },
      {
        name: 'Connecticut',
        code: 'CT'
      },
      {
        name: 'Delaware',
        code: 'DE'
      },
      {
        name: 'District Of Columbia',
        code: 'DC'
      },
      {
        name: 'Federated States Of Micronesia',
        code: 'FM'
      },
      {
        name: 'Florida',
        code: 'FL'
      },
      {
        name: 'Georgia',
        code: 'GA'
      },
      {
        name: 'Guam',
        code: 'GU'
      },
      {
        name: 'Hawaii',
        code: 'HI'
      },
      {
        name: 'Idaho',
        code: 'ID'
      },
      {
        name: 'Illinois',
        code: 'IL'
      },
      {
        name: 'Indiana',
        code: 'IN'
      },
      {
        name: 'Iowa',
        code: 'IA'
      },
      {
        name: 'Kansas',
        code: 'KS'
      },
      {
        name: 'Kentucky',
        code: 'KY'
      },
      {
        name: 'Louisiana',
        code: 'LA'
      },
      {
        name: 'Maine',
        code: 'ME'
      },
      {
        name: 'Marshall Islands',
        code: 'MH'
      },
      {
        name: 'Maryland',
        code: 'MD'
      },
      {
        name: 'Massachusetts',
        code: 'MA'
      },
      {
        name: 'Michigan',
        code: 'MI'
      },
      {
        name: 'Minnesota',
        code: 'MN'
      },
      {
        name: 'Mississippi',
        code: 'MS'
      },
      {
        name: 'Missouri',
        code: 'MO'
      },
      {
        name: 'Montana',
        code: 'MT'
      },
      {
        name: 'Nebraska',
        code: 'NE'
      },
      {
        name: 'Nevada',
        code: 'NV'
      },
      {
        name: 'New Hampshire',
        code: 'NH'
      },
      {
        name: 'New Jersey',
        code: 'NJ'
      },
      {
        name: 'New Mexico',
        code: 'NM'
      },
      {
        name: 'New York',
        code: 'NY'
      },
      {
        name: 'North Carolina',
        code: 'NC'
      },
      {
        name: 'North Dakota',
        code: 'ND'
      },
      {
        name: 'Northern Mariana Islands',
        code: 'MP'
      },
      {
        name: 'Ohio',
        code: 'OH'
      },
      {
        name: 'Oklahoma',
        code: 'OK'
      },
      {
        name: 'Oregon',
        code: 'OR'
      },
      {
        name: 'Palau',
        code: 'PW'
      },
      {
        name: 'Pennsylvania',
        code: 'PA'
      },
      {
        name: 'Puerto Rico',
        code: 'PR'
      },
      {
        name: 'Rhode Island',
        code: 'RI'
      },
      {
        name: 'South Carolina',
        code: 'SC'
      },
      {
        name: 'South Dakota',
        code: 'SD'
      },
      {
        name: 'Tennessee',
        code: 'TN'
      },
      {
        name: 'Texas',
        code: 'TX'
      },
      {
        name: 'Utah',
        code: 'UT'
      },
      {
        name: 'Vermont',
        code: 'VT'
      },
      {
        name: 'Virgin Islands',
        code: 'VI'
      },
      {
        name: 'Virginia',
        code: 'VA'
      },
      {
        name: 'Washington',
        code: 'WA'
      },
      {
        name: 'West Virginia',
        code: 'WV'
      },
      {
        name: 'Wisconsin',
        code: 'WI'
      },
      {
        name: 'Wyoming',
        code: 'WY'
      }
    ];
    return usa;
  }

  countryCode() {
    // tslint:disable-next-line:no-unused-expression
    const countryCodes =
      [
        {
          name: 'Afghanistan',
          dial_code: '+93',
          code: 'AF'
        },
        {
          name: 'Aland Islands',
          dial_code: '+358',
          code: 'AX'
        },
        {
          name: 'Albania',
          dial_code: '+355',
          code: 'AL'
        },
        {
          name: 'Algeria',
          dial_code: '+213',
          code: 'DZ'
        },
        {
          name: 'AmericanSamoa',
          dial_code: '+1 684',
          code: 'AS'
        },
        {
          name: 'Andorra',
          dial_code: '+376',
          code: 'AD'
        },
        {
          name: 'Angola',
          dial_code: '+244',
          code: 'AO'
        },
        {
          name: 'Anguilla',
          dial_code: '+1 264',
          code: 'AI'
        },
        {
          name: 'Antarctica',
          dial_code: '+672',
          code: 'AQ'
        },
        {
          name: 'Antigua and Barbuda',
          dial_code: '+1268',
          code: 'AG'
        },
        {
          name: 'Argentina',
          dial_code: '+54',
          code: 'AR'
        },
        {
          name: 'Armenia',
          dial_code: '+374',
          code: 'AM'
        },
        {
          name: 'Aruba',
          dial_code: '+297',
          code: 'AW'
        },
        {
          name: 'Australia',
          dial_code: '+61',
          code: 'AU'
        },
        {
          name: 'Austria',
          dial_code: '+43',
          code: 'AT'
        },
        {
          name: 'Azerbaijan',
          dial_code: '+994',
          code: 'AZ'
        },
        {
          name: 'Bahamas',
          dial_code: '+1 242',
          code: 'BS'
        },
        {
          name: 'Bahrain',
          dial_code: '+973',
          code: 'BH'
        },
        {
          name: 'Bangladesh',
          dial_code: '+880',
          code: 'BD'
        },
        {
          name: 'Barbados',
          dial_code: '+1 246',
          code: 'BB'
        },
        {
          name: 'Belarus',
          dial_code: '+375',
          code: 'BY'
        },
        {
          name: 'Belgium',
          dial_code: '+32',
          code: 'BE'
        },
        {
          name: 'Belize',
          dial_code: '+501',
          code: 'BZ'
        },
        {
          name: 'Benin',
          dial_code: '+229',
          code: 'BJ'
        },
        {
          name: 'Bermuda',
          dial_code: '+1 441',
          code: 'BM'
        },
        {
          name: 'Bhutan',
          dial_code: '+975',
          code: 'BT'
        },
        {
          name: 'Bolivia, Plurinational State of',
          dial_code: '+591',
          code: 'BO'
        },
        {
          name: 'Bosnia and Herzegovina',
          dial_code: '+387',
          code: 'BA'
        },
        {
          name: 'Botswana',
          dial_code: '+267',
          code: 'BW'
        },
        {
          name: 'Brazil',
          dial_code: '+55',
          code: 'BR'
        },
        {
          name: 'British Indian Ocean Territory',
          dial_code: '+246',
          code: 'IO'
        },
        {
          name: 'Brunei Darussalam',
          dial_code: '+673',
          code: 'BN'
        },
        {
          name: 'Bulgaria',
          dial_code: '+359',
          code: 'BG'
        },
        {
          name: 'Burkina Faso',
          dial_code: '+226',
          code: 'BF'
        },
        {
          name: 'Burundi',
          dial_code: '+257',
          code: 'BI'
        },
        {
          name: 'Cambodia',
          dial_code: '+855',
          code: 'KH'
        },
        {
          name: 'Cameroon',
          dial_code: '+237',
          code: 'CM'
        },
        {
          name: 'Canada',
          dial_code: '+1',
          code: 'CA'
        },
        {
          name: 'Cape Verde',
          dial_code: '+238',
          code: 'CV'
        },
        {
          name: 'Cayman Islands',
          dial_code: '+ 345',
          code: 'KY'
        },
        {
          name: 'Central African Republic',
          dial_code: '+236',
          code: 'CF'
        },
        {
          name: 'Chad',
          dial_code: '+235',
          code: 'TD'
        },
        {
          name: 'Chile',
          dial_code: '+56',
          code: 'CL'
        },
        {
          name: 'China',
          dial_code: '+86',
          code: 'CN'
        },
        {
          name: 'Christmas Island',
          dial_code: '+61',
          code: 'CX'
        },
        {
          name: 'Cocos (Keeling) Islands',
          dial_code: '+61',
          code: 'CC'
        },
        {
          name: 'Colombia',
          dial_code: '+57',
          code: 'CO'
        },
        {
          name: 'Comoros',
          dial_code: '+269',
          code: 'KM'
        },
        {
          name: 'Congo',
          dial_code: '+242',
          code: 'CG'
        },
        {
          name: 'Congo, The Democratic Republic of the Congo',
          dial_code: '+243',
          code: 'CD'
        },
        {
          name: 'Cook Islands',
          dial_code: '+682',
          code: 'CK'
        },
        {
          name: 'Costa Rica',
          dial_code: '+506',
          code: 'CR'
        },
        {
          name: 'Cote d\'Ivoire',
          dial_code: '+225',
          code: 'CI'
        },
        {
          name: 'Croatia',
          dial_code: '+385',
          code: 'HR'
        },
        {
          name: 'Cuba',
          dial_code: '+53',
          code: 'CU'
        },
        {
          name: 'Cyprus',
          dial_code: '+357',
          code: 'CY'
        },
        {
          name: 'Czech Republic',
          dial_code: '+420',
          code: 'CZ'
        },
        {
          name: 'Denmark',
          dial_code: '+45',
          code: 'DK'
        },
        {
          name: 'Djibouti',
          dial_code: '+253',
          code: 'DJ'
        },
        {
          name: 'Dominica',
          dial_code: '+1 767',
          code: 'DM'
        },
        {
          name: 'Dominican Republic',
          dial_code: '+1 849',
          code: 'DO'
        },
        {
          name: 'Ecuador',
          dial_code: '+593',
          code: 'EC'
        },
        {
          name: 'Egypt',
          dial_code: '+20',
          code: 'EG'
        },
        {
          name: 'El Salvador',
          dial_code: '+503',
          code: 'SV'
        },
        {
          name: 'Equatorial Guinea',
          dial_code: '+240',
          code: 'GQ'
        },
        {
          name: 'Eritrea',
          dial_code: '+291',
          code: 'ER'
        },
        {
          name: 'Estonia',
          dial_code: '+372',
          code: 'EE'
        },
        {
          name: 'Ethiopia',
          dial_code: '+251',
          code: 'ET'
        },
        {
          name: 'Falkland Islands (Malvinas)',
          dial_code: '+500',
          code: 'FK'
        },
        {
          name: 'Faroe Islands',
          dial_code: '+298',
          code: 'FO'
        },
        {
          name: 'Fiji',
          dial_code: '+679',
          code: 'FJ'
        },
        {
          name: 'Finland',
          dial_code: '+358',
          code: 'FI'
        },
        {
          name: 'France',
          dial_code: '+33',
          code: 'FR'
        },
        {
          name: 'French Guiana',
          dial_code: '+594',
          code: 'GF'
        },
        {
          name: 'French Polynesia',
          dial_code: '+689',
          code: 'PF'
        },
        {
          name: 'Gabon',
          dial_code: '+241',
          code: 'GA'
        },
        {
          name: 'Gambia',
          dial_code: '+220',
          code: 'GM'
        },
        {
          name: 'Georgia',
          dial_code: '+995',
          code: 'GE'
        },
        {
          name: 'Germany',
          dial_code: '+49',
          code: 'DE'
        },
        {
          name: 'Ghana',
          dial_code: '+233',
          code: 'GH'
        },
        {
          name: 'Gibraltar',
          dial_code: '+350',
          code: 'GI'
        },
        {
          name: 'Greece',
          dial_code: '+30',
          code: 'GR'
        },
        {
          name: 'Greenland',
          dial_code: '+299',
          code: 'GL'
        },
        {
          name: 'Grenada',
          dial_code: '+1 473',
          code: 'GD'
        },
        {
          name: 'Guadeloupe',
          dial_code: '+590',
          code: 'GP'
        },
        {
          name: 'Guam',
          dial_code: '+1 671',
          code: 'GU'
        },
        {
          name: 'Guatemala',
          dial_code: '+502',
          code: 'GT'
        },
        {
          name: 'Guernsey',
          dial_code: '+44',
          code: 'GG'
        },
        {
          name: 'Guinea',
          dial_code: '+224',
          code: 'GN'
        },
        {
          name: 'Guinea-Bissau',
          dial_code: '+245',
          code: 'GW'
        },
        {
          name: 'Guyana',
          dial_code: '+595',
          code: 'GY'
        },
        {
          name: 'Haiti',
          dial_code: '+509',
          code: 'HT'
        },
        {
          name: 'Holy See (Vatican City State)',
          dial_code: '+379',
          code: 'VA'
        },
        {
          name: 'Honduras',
          dial_code: '+504',
          code: 'HN'
        },
        {
          name: 'Hong Kong',
          dial_code: '+852',
          code: 'HK'
        },
        {
          name: 'Hungary',
          dial_code: '+36',
          code: 'HU'
        },
        {
          name: 'Iceland',
          dial_code: '+354',
          code: 'IS'
        },
        {
          name: 'India',
          dial_code: '+91',
          code: 'IN'
        },
        {
          name: 'Indonesia',
          dial_code: '+62',
          code: 'ID'
        },
        {
          name: 'Iran, Islamic Republic of Persian Gulf',
          dial_code: '+98',
          code: 'IR'
        },
        {
          name: 'Iraq',
          dial_code: '+964',
          code: 'IQ'
        },
        {
          name: 'Ireland',
          dial_code: '+353',
          code: 'IE'
        },
        {
          name: 'Isle of Man',
          dial_code: '+44',
          code: 'IM'
        },
        {
          name: 'Israel',
          dial_code: '+972',
          code: 'IL'
        },
        {
          name: 'Italy',
          dial_code: '+39',
          code: 'IT'
        },
        {
          name: 'Jamaica',
          dial_code: '+1 876',
          code: 'JM'
        },
        {
          name: 'Japan',
          dial_code: '+81',
          code: 'JP'
        },
        {
          name: 'Jersey',
          dial_code: '+44',
          code: 'JE'
        },
        {
          name: 'Jordan',
          dial_code: '+962',
          code: 'JO'
        },
        {
          name: 'Kazakhstan',
          dial_code: '+7 7',
          code: 'KZ'
        },
        {
          name: 'Kenya',
          dial_code: '+254',
          code: 'KE'
        },
        {
          name: 'Kiribati',
          dial_code: '+686',
          code: 'KI'
        },
        {
          name: 'Korea, Democratic People\'s Republic of Korea',
          dial_code: '+850',
          code: 'KP'
        },
        {
          name: 'Korea, Republic of South Korea',
          dial_code: '+82',
          code: 'KR'
        },
        {
          name: 'Kuwait',
          dial_code: '+965',
          code: 'KW'
        },
        {
          name: 'Kyrgyzstan',
          dial_code: '+996',
          code: 'KG'
        },
        {
          name: 'Laos',
          dial_code: '+856',
          code: 'LA'
        },
        {
          name: 'Latvia',
          dial_code: '+371',
          code: 'LV'
        },
        {
          name: 'Lebanon',
          dial_code: '+961',
          code: 'LB'
        },
        {
          name: 'Lesotho',
          dial_code: '+266',
          code: 'LS'
        },
        {
          name: 'Liberia',
          dial_code: '+231',
          code: 'LR'
        },
        {
          name: 'Libyan Arab Jamahiriya',
          dial_code: '+218',
          code: 'LY'
        },
        {
          name: 'Liechtenstein',
          dial_code: '+423',
          code: 'LI'
        },
        {
          name: 'Lithuania',
          dial_code: '+370',
          code: 'LT'
        },
        {
          name: 'Luxembourg',
          dial_code: '+352',
          code: 'LU'
        },
        {
          name: 'Macao',
          dial_code: '+853',
          code: 'MO'
        },
        {
          name: 'Macedonia',
          dial_code: '+389',
          code: 'MK'
        },
        {
          name: 'Madagascar',
          dial_code: '+261',
          code: 'MG'
        },
        {
          name: 'Malawi',
          dial_code: '+265',
          code: 'MW'
        },
        {
          name: 'Malaysia',
          dial_code: '+60',
          code: 'MY'
        },
        {
          name: 'Maldives',
          dial_code: '+960',
          code: 'MV'
        },
        {
          name: 'Mali',
          dial_code: '+223',
          code: 'ML'
        },
        {
          name: 'Malta',
          dial_code: '+356',
          code: 'MT'
        },
        {
          name: 'Marshall Islands',
          dial_code: '+692',
          code: 'MH'
        },
        {
          name: 'Martinique',
          dial_code: '+596',
          code: 'MQ'
        },
        {
          name: 'Mauritania',
          dial_code: '+222',
          code: 'MR'
        },
        {
          name: 'Mauritius',
          dial_code: '+230',
          code: 'MU'
        },
        {
          name: 'Mayotte',
          dial_code: '+262',
          code: 'YT'
        },
        {
          name: 'Mexico',
          dial_code: '+52',
          code: 'MX'
        },
        {
          name: 'Micronesia, Federated States of Micronesia',
          dial_code: '+691',
          code: 'FM'
        },
        {
          name: 'Moldova',
          dial_code: '+373',
          code: 'MD'
        },
        {
          name: 'Monaco',
          dial_code: '+377',
          code: 'MC'
        },
        {
          name: 'Mongolia',
          dial_code: '+976',
          code: 'MN'
        },
        {
          name: 'Montenegro',
          dial_code: '+382',
          code: 'ME'
        },
        {
          name: 'Montserrat',
          dial_code: '+1664',
          code: 'MS'
        },
        {
          name: 'Morocco',
          dial_code: '+212',
          code: 'MA'
        },
        {
          name: 'Mozambique',
          dial_code: '+258',
          code: 'MZ'
        },
        {
          name: 'Myanmar',
          dial_code: '+95',
          code: 'MM'
        },
        {
          name: 'Namibia',
          dial_code: '+264',
          code: 'NA'
        },
        {
          name: 'Nauru',
          dial_code: '+674',
          code: 'NR'
        },
        {
          name: 'Nepal',
          dial_code: '+977',
          code: 'NP'
        },
        {
          name: 'Netherlands',
          dial_code: '+31',
          code: 'NL'
        },
        {
          name: 'Netherlands Antilles',
          dial_code: '+599',
          code: 'AN'
        },
        {
          name: 'New Caledonia',
          dial_code: '+687',
          code: 'NC'
        },
        {
          name: 'New Zealand',
          dial_code: '+64',
          code: 'NZ'
        },
        {
          name: 'Nicaragua',
          dial_code: '+505',
          code: 'NI'
        },
        {
          name: 'Niger',
          dial_code: '+227',
          code: 'NE'
        },
        {
          name: 'Nigeria',
          dial_code: '+234',
          code: 'NG'
        },
        {
          name: 'Niue',
          dial_code: '+683',
          code: 'NU'
        },
        {
          name: 'Norfolk Island',
          dial_code: '+672',
          code: 'NF'
        },
        {
          name: 'Northern Mariana Islands',
          dial_code: '+1 670',
          code: 'MP'
        },
        {
          name: 'Norway',
          dial_code: '+47',
          code: 'NO'
        },
        {
          name: 'Oman',
          dial_code: '+968',
          code: 'OM'
        },
        {
          name: 'Pakistan',
          dial_code: '+92',
          code: 'PK'
        },
        {
          name: 'Palau',
          dial_code: '+680',
          code: 'PW'
        },
        {
          name: 'Palestinian Territory, Occupied',
          dial_code: '+970',
          code: 'PS'
        },
        {
          name: 'Panama',
          dial_code: '+507',
          code: 'PA'
        },
        {
          name: 'Papua New Guinea',
          dial_code: '+675',
          code: 'PG'
        },
        {
          name: 'Paraguay',
          dial_code: '+595',
          code: 'PY'
        },
        {
          name: 'Peru',
          dial_code: '+51',
          code: 'PE'
        },
        {
          name: 'Philippines',
          dial_code: '+63',
          code: 'PH'
        },
        {
          name: 'Pitcairn',
          dial_code: '+872',
          code: 'PN'
        },
        {
          name: 'Poland',
          dial_code: '+48',
          code: 'PL'
        },
        {
          name: 'Portugal',
          dial_code: '+351',
          code: 'PT'
        },
        {
          name: 'Puerto Rico',
          dial_code: '+1 939',
          code: 'PR'
        },
        {
          name: 'Qatar',
          dial_code: '+974',
          code: 'QA'
        },
        {
          name: 'Romania',
          dial_code: '+40',
          code: 'RO'
        },
        {
          name: 'Russia',
          dial_code: '+7',
          code: 'RU'
        },
        {
          name: 'Rwanda',
          dial_code: '+250',
          code: 'RW'
        },
        {
          name: 'Reunion',
          dial_code: '+262',
          code: 'RE'
        },
        {
          name: 'Saint Barthelemy',
          dial_code: '+590',
          code: 'BL'
        },
        {
          name: 'Saint Helena, Ascension and Tristan Da Cunha',
          dial_code: '+290',
          code: 'SH'
        },
        {
          name: 'Saint Kitts and Nevis',
          dial_code: '+1 869',
          code: 'KN'
        },
        {
          name: 'Saint Lucia',
          dial_code: '+1 758',
          code: 'LC'
        },
        {
          name: 'Saint Martin',
          dial_code: '+590',
          code: 'MF'
        },
        {
          name: 'Saint Pierre and Miquelon',
          dial_code: '+508',
          code: 'PM'
        },
        {
          name: 'Saint Vincent and the Grenadines',
          dial_code: '+1 784',
          code: 'VC'
        },
        {
          name: 'Samoa',
          dial_code: '+685',
          code: 'WS'
        },
        {
          name: 'San Marino',
          dial_code: '+378',
          code: 'SM'
        },
        {
          name: 'Sao Tome and Principe',
          dial_code: '+239',
          code: 'ST'
        },
        {
          name: 'Saudi Arabia',
          dial_code: '+966',
          code: 'SA'
        },
        {
          name: 'Senegal',
          dial_code: '+221',
          code: 'SN'
        },
        {
          name: 'Serbia',
          dial_code: '+381',
          code: 'RS'
        },
        {
          name: 'Seychelles',
          dial_code: '+248',
          code: 'SC'
        },
        {
          name: 'Sierra Leone',
          dial_code: '+232',
          code: 'SL'
        },
        {
          name: 'Singapore',
          dial_code: '+65',
          code: 'SG'
        },
        {
          name: 'Slovakia',
          dial_code: '+421',
          code: 'SK'
        },
        {
          name: 'Slovenia',
          dial_code: '+386',
          code: 'SI'
        },
        {
          name: 'Solomon Islands',
          dial_code: '+677',
          code: 'SB'
        },
        {
          name: 'Somalia',
          dial_code: '+252',
          code: 'SO'
        },
        {
          name: 'South Africa',
          dial_code: '+27',
          code: 'ZA'
        },
        {
          name: 'South Georgia and the South Sandwich Islands',
          dial_code: '+500',
          code: 'GS'
        },
        {
          name: 'Spain',
          dial_code: '+34',
          code: 'ES'
        },
        {
          name: 'Sri Lanka',
          dial_code: '+94',
          code: 'LK'
        },
        {
          name: 'Sudan',
          dial_code: '+249',
          code: 'SD'
        },
        {
          name: 'Suriname',
          dial_code: '+597',
          code: 'SR'
        },
        {
          name: 'Svalbard and Jan Mayen',
          dial_code: '+47',
          code: 'SJ'
        },
        {
          name: 'Swaziland',
          dial_code: '+268',
          code: 'SZ'
        },
        {
          name: 'Sweden',
          dial_code: '+46',
          code: 'SE'
        },
        {
          name: 'Switzerland',
          dial_code: '+41',
          code: 'CH'
        },
        {
          name: 'Syrian Arab Republic',
          dial_code: '+963',
          code: 'SY'
        },
        {
          name: 'Taiwan',
          dial_code: '+886',
          code: 'TW'
        },
        {
          name: 'Tajikistan',
          dial_code: '+992',
          code: 'TJ'
        },
        {
          name: 'Tanzania, United Republic of Tanzania',
          dial_code: '+255',
          code: 'TZ'
        },
        {
          name: 'Thailand',
          dial_code: '+66',
          code: 'TH'
        },
        {
          name: 'Timor-Leste',
          dial_code: '+670',
          code: 'TL'
        },
        {
          name: 'Togo',
          dial_code: '+228',
          code: 'TG'
        },
        {
          name: 'Tokelau',
          dial_code: '+690',
          code: 'TK'
        },
        {
          name: 'Tonga',
          dial_code: '+676',
          code: 'TO'
        },
        {
          name: 'Trinidad and Tobago',
          dial_code: '+1 868',
          code: 'TT'
        },
        {
          name: 'Tunisia',
          dial_code: '+216',
          code: 'TN'
        },
        {
          name: 'Turkey',
          dial_code: '+90',
          code: 'TR'
        },
        {
          name: 'Turkmenistan',
          dial_code: '+993',
          code: 'TM'
        },
        {
          name: 'Turks and Caicos Islands',
          dial_code: '+1 649',
          code: 'TC'
        },
        {
          name: 'Tuvalu',
          dial_code: '+688',
          code: 'TV'
        },
        {
          name: 'Uganda',
          dial_code: '+256',
          code: 'UG'
        },
        {
          name: 'Ukraine',
          dial_code: '+380',
          code: 'UA'
        },
        {
          name: 'United Arab Emirates',
          dial_code: '+971',
          code: 'AE'
        },
        {
          name: 'United Kingdom',
          dial_code: '+44',
          code: 'GB'
        },
        {
          name: 'United States',
          dial_code: '+1',
          code: 'US'
        },
        {
          name: 'Uruguay',
          dial_code: '+598',
          code: 'UY'
        },
        {
          name: 'Uzbekistan',
          dial_code: '+998',
          code: 'UZ'
        },
        {
          name: 'Vanuatu',
          dial_code: '+678',
          code: 'VU'
        },
        {
          name: 'Venezuela, Bolivarian Republic of Venezuela',
          dial_code: '+58',
          code: 'VE'
        },
        {
          name: 'Vietnam',
          dial_code: '+84',
          code: 'VN'
        },
        {
          name: 'Virgin Islands, British',
          dial_code: '+1 284',
          code: 'VG'
        },
        {
          name: 'Virgin Islands, U.S.',
          dial_code: '+1 340',
          code: 'VI'
        },
        {
          name: 'Wallis and Futuna',
          dial_code: '+681',
          code: 'WF'
        },
        {
          name: 'Yemen',
          dial_code: '+967',
          code: 'YE'
        },
        {
          name: 'Zambia',
          dial_code: '+260',
          code: 'ZM'
        },
        {
          name: 'Zimbabwe',
          dial_code: '+263',
          code: 'ZW'
        }
      ];

    return countryCodes;
  }
}
