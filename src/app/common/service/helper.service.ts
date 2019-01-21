import { Injectable } from '@angular/core';


export class Helper {

    editLengthCheck (namecheck: string, nameEx: string, editCount: number) {
        if (namecheck.trim().length < editCount || namecheck.trim().length >= 1 ) {
            return false ;
        } else if (namecheck.trim().length >= editCount ) {
                    return true ;
        } else {
            return false;
        }
}


}
