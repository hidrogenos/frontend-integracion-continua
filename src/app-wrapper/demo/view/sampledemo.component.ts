import {Component, OnInit} from '@angular/core';
import {CarService} from '../service/carservice';
import {CountryService} from '../service/countryservice';
import {NodeService} from '../service/nodeservice';
import {Car} from '../domain/car';
import {SelectItem, MenuItem, TreeNode} from 'primeng/primeng';

@Component({
    templateUrl: './sampledemo.component.html'
})
export class SampleDemoComponent implements OnInit {

    country: any;

    filteredCountries: any[];

    cities1: SelectItem[];

    cities2: SelectItem[];

    selectedCity1: any;

    selectedCity2: any;

    radioValue: string;

    checkboxValues: string[] = [];

    splitButtonItems: MenuItem[];

    carOptions: SelectItem[];

    selectedMultiSelectCars: string[] = [];

    types: SelectItem[];

    dialogVisible: boolean;

    cars: Car[];

    cols: any[];

    carsLarge: Car[];

    selectedCar3: Car;

    filesTree: TreeNode[];

    menuItems: MenuItem[];

    panelMenuItems: MenuItem[];

    sourceCars: Car[];

    targetCars: Car[];

    orderListCars: Car[];

    carouselCars: Car[];

    maskValue: string;

    toggleButtonChecked: boolean;

    selectedType: string;

    constructor(private carService: CarService, private countryService: CountryService, private nodeService: NodeService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.carService.getCarsLarge().then(cars => this.carsLarge = cars);
        this.nodeService.getFiles().then(files => this.filesTree = files);
        this.carService.getCarsSmall().then(cars => this.sourceCars = cars);
        this.targetCars = [];
        this.carService.getCarsSmall().then(cars => this.orderListCars = cars);

        this.cities1 = [];
        this.cities1.push({label: 'Select City', value: null});
        this.cities1.push({label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}});
        this.cities1.push({label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}});
        this.cities1.push({label: 'London', value: {id: 3, name: 'London', code: 'LDN'}});
        this.cities1.push({label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}});
        this.cities1.push({label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}});

        this.cities2 = this.cities1.slice(1, 6);

        this.splitButtonItems = [
            {label: 'Update', icon: 'fa fa-refresh'},
            {label: 'Delete', icon: 'fa fa-close'},
            {label: 'Home', icon: 'fa fa-home', url: 'http://www.primefaces.org/primeng'}
        ];

        this.carOptions = [];
        this.carOptions.push({label: 'Audi', value: 'Audi'});
        this.carOptions.push({label: 'BMW', value: 'BMW'});
        this.carOptions.push({label: 'Fiat', value: 'Fiat'});
        this.carOptions.push({label: 'Ford', value: 'Ford'});
        this.carOptions.push({label: 'Honda', value: 'Honda'});
        this.carOptions.push({label: 'Jaguar', value: 'Jaguar'});
        this.carOptions.push({label: 'Mercedes', value: 'Mercedes'});
        this.carOptions.push({label: 'Renault', value: 'Renault'});
        this.carOptions.push({label: 'VW', value: 'VW'});
        this.carOptions.push({label: 'Volvo', value: 'Volvo'});

        this.types = [];
        this.types.push({label: 'Apartment', value: 'Apartment'});
        this.types.push({label: 'House', value: 'House'});
        this.types.push({label: 'Studio', value: 'Studio'});

        this.menuItems = [{
            label: 'File',
            items: [
                {label: 'New', icon: 'fa fa-plus'},
                {label: 'Open', icon: 'fa fa-download'}
            ]
        },
            {
                label: 'Edit',
                items: [
                    {label: 'Undo', icon: 'fa fa-refresh'},
                    {label: 'Redo', icon: 'fa fa-repeat'}
                ]
        }];

        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'fa fa-file-o',
                items: [{
                    label: 'New',
                    icon: 'fa fa-plus',
                    items: [
                        {label: 'Project'},
                        {label: 'Other'},
                    ]
                },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa fa-mail-forward'},
                    {label: 'Redo', icon: 'fa fa-mail-reply'}
                ]
            },
            {
                label: 'Help',
                icon: 'fa fa-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'fa fa-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'fa fa-gear',
                items: [
                    {
                        label: 'Edit',
                        icon: 'fa fa-refresh',
                        items: [
                            {label: 'Save', icon: 'fa fa-save'},
                            {label: 'Update', icon: 'fa fa-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'fa fa-phone',
                        items: [
                            {label: 'Delete', icon: 'fa fa-minus'}
                        ]
                    }
                ]
            }
        ];

        this.carouselCars = [
            {vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black'},
            {vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White'},
            {vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue'},
            {vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White'},
            {vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red'},
            {vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue'},
            {vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow'},
            {vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown'},
            {vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black'}
        ];
    }

    filterCountry(event) {
        const query = event.query;
        this.countryService.getCountries().then(countries => {
            this.filteredCountries = this.searchCountry(query, countries);
        });
    }

    searchCountry(query, countries: any[]): any[] {
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
        const filtered: any[] = [];
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }
}
