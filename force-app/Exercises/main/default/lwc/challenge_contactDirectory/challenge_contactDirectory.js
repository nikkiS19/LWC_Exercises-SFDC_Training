import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/Contacts.getContacts'; 
export default class Challenge_contactDirectory extends LightningElement {
    error; contactId; firstLetter = ''; 
    letters = ('a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z').toUpperCase().split(',');	
    columnConfig = [
		{
			label: 'Name',
			fieldName: 'Name',
			type: 'text'
		},
		{
			label: 'Email',
			fieldName: 'Email',
			type: 'email'
		},
		{
			label: 'Phone',
			fieldName: 'Phone',
			type: 'phone'
		}
	];
    @wire(getContacts,{firstLetter :'$firstLetter'})
    contacts;

    onLetterSelect(event) { 
		this.firstLetter = event.detail.value;
	}
    }