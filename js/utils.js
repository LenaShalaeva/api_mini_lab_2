const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false
formValidation.password = false
formValidation.passwordreg = false
formValidation.email = false
formValidation.emailreg = false

export const setValue = (id) => {
  const object = document.getElementById(id);
  object.value = ""
}

export const changeFormValidation = () => {
  setValue("password")
  setValue("passwordreg")
  setValue("email")
  setValue("emailreg")
  formValidation.password = false
  formValidation.passwordreg = false
  formValidation.email = false
  formValidation.emailreg = false
  var btnsgnup = document.getElementById('sign_up_btn');
 btnsgnup.disabled = true;
  var btnsgnin = document.getElementById('sign_in_btn');
 btnsgnin.disabled = true;
}


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
  //formValidation.password = e.target.value
  console.log("Password validation...")
  //console.log(e)
  // Напишите код валидации здесь и присвойте true/false в объект(словарь) formValidation
  // formValidation.password = ...  // formValidation['password'] = ... - то же самое, но другой синтаксис
  //return formValidation.password !== undefined   // Это заглушка, return вероятно надо переписать
  var password_length = password.length;
    var max = 15;
    var min = 6;
    const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])');
    const password_id = document.activeElement.id
    //const password_1 = document.getElementById(password_id);
    //var baton = document.getElementById('sign_up_btn');
    if (password_length == 0 || password_length >= max || password_length < min || !password.match(reg))
    {
        formValidation.password = false;
        console.log("Error")
        //password_1.classList.add("invalid")
        //baton.disabled = true;
      }
      else{
          formValidation.password = true;
          //password_1.classList.remove("invalid")
         // password_1.classList.add("valid")
         // baton.disabled = false;
      }
      return formValidation.password;
  }



export const validateEmail = (email) => {
  // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
  // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (String(email).toLowerCase().match(regExp) == null){
    return false
    }
  else{
    return true
  }

  //return String(email)
    //.toLowerCase()
    //.match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  //formValues[valueKey] = newValue
    console.log(formValidation)
  if (validator !== undefined) {
    formValidation[valueKey] = validator(newValue)
  }
  var button;
  const passwordreg = document.getElementById(valueKey);

  if (formValidation[valueKey] == false)
    {
        passwordreg.classList.add("invalid")
        if (valueKey == "password" || valueKey == "email"){
            button = document.getElementById('sign_up_btn')
        }
        else {
            button = document.getElementById('sign_in_btn')
        }
        button.disabled = true;
    }
  else{
        passwordreg.classList.remove("invalid")
        passwordreg.classList.add("valid")
        if (valueKey == "password" || valueKey == "email"){
            button = document.getElementById('sign_up_btn')
        }
        else {
            button = document.getElementById('sign_in_btn')
        }
        
        if((formValidation["password"] == true && formValidation["email"] == true) || (formValidation["passwordreg"] == true && formValidation["emailreg"] == true) ) {
             button.disabled = false;
        }

    }
}



// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("FORM IS INCORRECT")
    return false
  }
  console.log("FORM IS FINE")
  console.log(formValues)
  return true
}
