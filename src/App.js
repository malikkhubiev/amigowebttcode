import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState, useRef } from 'react';
import './App.css';
import check from './images/check.svg'
import select from './images/select.svg'

// Global variables
let globalSetAllRight
let globalLanguageValue = ''
let globalValues

// Validate function
const validate = values => {
  const errors = {}

  values = values || {
    name: '',
    email: '',
    phoneNumber: '',
    language: '',
    accept: false
  }
  globalValues = values
  if(globalLanguageValue !== '') values["language"] = globalLanguageValue

  let foundBad = false
  Object.keys(values).forEach(key => {
    if (!values[key]) foundBad = true
  })

  Object.keys(values).forEach(key => {
    if (!values[key]) errors[key] = "Введено некорректное значение"
  })

  if (!/^[А-Яа-яA-Za-z\s-]{1,}$/.test(values.name)) errors.name = "Введено некорректное значение"
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = "Введено некорректное значение"
  else if (!/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(values.phoneNumber)) errors.phoneNumber = "Введено некорректное значение"

  if (!foundBad && !Object.keys(errors).length) globalSetAllRight(true)

  return errors
}

function App() {
  let [allRight, setAllRight] = useState(false)
  globalSetAllRight = setAllRight

  // Check
  let [checkCompleted, setCheckCompleted] = useState(false)
  const checkRef = useRef()
  const checkEmulate = () => {
    checkRef.current.click()
    setCheckCompleted(!checkCompleted)
  }

  // Select
  let [toggle, setToggle] = useState(false)
  let [fakeSelectValue, setFakeSelectValue] = useState('Язык')
  const optionOneRef = useRef()
  const optionTwoRef = useRef()
  const optionThreeRef = useRef()
  const optionFourRef = useRef()
  const arrayOfOptionsRefs = [
    optionOneRef,
    optionTwoRef,
    optionThreeRef,
    optionFourRef
  ]
  const selectEmulate = id => {
    const option = arrayOfOptionsRefs[id].current 
    setFakeSelectValue(option.value)
    globalLanguageValue = option.value
    validate(globalValues)
  }

  return (
    <div className="App">
      <div className="form">
        <div className="header">
          <h1>Регистрация</h1>
          <h2>Уже есть аккаунт? <a href=''>Войти</a></h2>
        </div>
        <div className="main">
          <Formik
            initialValues={{
              name: '',
              email: '',
              phoneNumber: '',
              language: '',
              accept: false
            }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <div className="group">
                <label htmlFor="name">Имя</label>
                <Field name="name" type="text" placeholder="Введите ваше имя" />
                <span className="error"><ErrorMessage name="name" /></span>
              </div>

              <div className="group">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" placeholder="Введите ваш email" />
                <span className="error"><ErrorMessage name="email" /></span>
              </div>

              <div className="group">
                <label htmlFor="phoneNumber">Номер телефона</label>
                <Field name="phoneNumber" type="text" placeholder="Введите номер телефона" />
                <span className="error"><ErrorMessage name="phoneNumber" /></span>
              </div>

              <div className="group">
                <label htmlFor="language">Язык</label>
                <Field className="hide" name="language" as="select">
                  <option ref={optionOneRef} value="Русский">Русский</option>
                  <option ref={optionTwoRef} value="Английский">Английский</option>
                  <option ref={optionThreeRef} value="Китайский">Китайский</option>
                  <option ref={optionFourRef} value="Испанский">Испанский</option>
                </Field>
                <div className="fakeSelect">
                  <div onClick={()=>setToggle(!toggle)} className="fakeSelectHeader">{fakeSelectValue} <img src={select}></img>
                    <div onClick={()=>setToggle(!toggle)} className={toggle?"fakeSelectMenu fakeSelectMenuShow": "fakeSelectMenu"}>
                      <div onClick={() => selectEmulate(0)}>Русский</div>
                      <div onClick={() => selectEmulate(1)}>Английский</div>
                      <div onClick={() => selectEmulate(2)}>Китайский</div>
                      <div onClick={() => selectEmulate(3)}>Испанский</div>
                    </div>
                  </div>
                </div>
                <span className="error"><ErrorMessage name="language" /></span>
              </div>

              <div className="specialGroup">
                <Field innerRef={checkRef} className="hide" type="checkbox" name="accept" />
                <div className={checkCompleted ? "showCheck" : ""} onClick={checkEmulate}>
                  {checkCompleted ? <img src={check}></img> : ""}
                </div>
                <span className="accept">Принимаю <a href="">условия</a> использования</span>
                <span className="error"><ErrorMessage name="language" /></span>
              </div>

              <button disabled={!allRight} className="button" type="submit">Зерегистрироваться</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
