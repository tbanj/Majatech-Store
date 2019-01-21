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




//     public (EditText idEditTextt, String nameEx, int editCount){
//         if(idEditTextt.getText().toString().trim()
//                 .length() <editCount || idEditTextt.getText().toString().trim()
//                 .length() >=1){
//             idEditTextt.setError(nameEx+ " is required");
//         }else if(idEditTextt.getText().toString().trim()
//                 .length() >=editCount ){
//             idEditTextt.setError(null);
//         }else{
//             idEditTextt.setError(null);
//         }

// }

    // ngAfterContentInit(): number {
    // throw new Error("Method not implemented.");
    // }

}

