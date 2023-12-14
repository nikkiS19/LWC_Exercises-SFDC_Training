public with sharing class Contacts {
    /*@Auraenabled
    public static getContacts(String firstLetter) {
        /*if (String.isEmpty(firstLetter)) {
            myContacts = [
            SELECT Id, Name, Email, Phone
            FROM Contact
            WITH SECURITY_ENFORCED
            ORDER BY Name
            ];
            } else {
            String filterVar = firstLetter + '%';
            myContacts = [
            SELECT Id, Name, Email, Phone
            FROM Contact
            WHERE Name LIKE :filterVar
            WITH SECURITY_ENFORCED
            ORDER BY Name
            ];
            }
    } */
}