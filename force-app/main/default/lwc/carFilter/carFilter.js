import { LightningElement, wire } from 'lwc';
import {getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';

const CATEGORY_ERROR = 'Error Loading Category';
const MAKE_ERROR = 'Error Loading Make Types';
export default class CarFilter extends LightningElement {
    filters={
        searchKey:'',
        maxPrice: 999999
    }

    categoryError = CATEGORY_ERROR;
    makeError = MAKE_ERROR;

    @wire(getObjectInfo, {objectApiName: CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId: '$carObjectInfo.data.defaultRecordTypeId', 
        fieldApiName: CATEGORY_FIELD})
    categories;

    @wire(getPicklistValues, {
        recordTypeId: "$carObjectInfo.data.defaultRecordTypeId", 
        fieldApiName: MAKE_FIELD})
    makeType;

    handleSearchKeyChange(event){
        this.filters = {...this.filters, "searchKey":event.target.value};
    }

    handleMaxPriceChange(event){
        this.filters = {...this.filters, "maxPrice":event.target.value};
    }

    handleCheckbox(event){
        const {name, value} = event.target.dataset;

    }
}