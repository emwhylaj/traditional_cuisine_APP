import {
    Restuarant
} from '../models/Restuarant.js';

import {
    cuisine
} from '../cuisine.js';


export class RestuarantRepository {
    constructor() {
        this.Restuarant = [
            new Restuarant(1, 'Mama Nkechi', 'CALABAR', cuisine.CALABAR, 'Calabar local foods'),
            new Restuarant(2, 'Mohammed Cool Spot', 'KANO', cuisine.KANO, 'Kano Based local foods'),
            new Restuarant(3, 'Five Star intercontinental', 'TARABA', cuisine.TARABA, 'Hausa vaieties'),
            new Restuarant(4, 'Eat and forget your worries', 'Osun', cuisine.OSUN, 'Indegenuous Food of State of Osun'),
            new Restuarant(5, 'Pay for only meat', 'oyo', cuisine.OYO, 'Oluyole Abula Food')
        ];
    };
    
    get gRestuarant() {
        return this.Restuarant;


    };
    gRestuarantMethod() {
        return this.Restuarant;
    };

    set sRestuarant(res) {
        return this.Restuarant.push(res);
    };

};
