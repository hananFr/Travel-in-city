const getElemVal = (id) => document.getElementById(id).value;

export default function validateSimpleRegistration(
  file,
  idAbout,
  idEmail,
  idPassword,
  idName
) {
  let error = "";
  var data = {
    image: file,
    about_writer: getElemVal(idAbout),
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
    name: getElemVal(idName),
    admin: false,
  };

  if(!file){
    error = 'אנא הוסף את תמונך לאתר'
  }

  if (!data.password || data.password.length < 6) {
    error = "הסיסמא חייבת להיות 8 ספרות, לכלול אות אחת גדולה באנגלית ואחת קטנה וסימן אחד";
  }

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