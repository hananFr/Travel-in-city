const getElemVal = (id) => document.getElementById(id).value;
export default function validateSimpleUpdate(

    idAbout,
    idEmail,
    idName
  ) {
    let error = "";
    var data = {

      about_writer: getElemVal(idAbout),
      email: getElemVal(idEmail),
      name: getElemVal(idName),
    };
  
  
  
    if (data.email) {
      var reges =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var res = reges.test(data.email);
      if (!res) {
        error += "אנא מלא אימייל תקין";
      }
    
    }
    if (!data.name || data.name.length < 2) {
      error += "השם חייב להכיל שני תווים לפחות";
    }
  
    return error || data;
  }
  