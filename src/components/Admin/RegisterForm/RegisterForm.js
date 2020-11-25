import React, {useState} from "react";
import { Form, Input, Button, Checkbox, notification} from "antd";
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import {singUpApi} from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolity: false
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolity: false
    })

    const changeForm = e => {
        if(e.target.name === "privacyPolity"){
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            })
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            })
        }
    }
    const inputValidation = e => {
        const {type, name} = e.target;
        if(type === "email"){
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            })
        }
        if(type === "password"){
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            })
        }
        if(type === "checkbox"){
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    }

    const register = e => {
        e.preventDefault();
        const {email, password, repeatPassword, privacyPolity} = formValid;

        const emailValue = inputs.email;
        const passwordValue = inputs.password;
        const repeatPasswordValue = inputs.repeatPassword;
        const privacyPolityValue = inputs.privacyPolity;

        if(!emailValue || !passwordValue || !repeatPasswordValue || !privacyPolityValue){
            notification['error']({
                message: "Todos los campos son obligatorios"
            })
        }else {
            if(passwordValue != repeatPasswordValue){
                notification['error']({
                    message: "Las contraseñas no coinciden"
                })
            }else {
                const result = singUpApi(inputs);
                //console.log(inputs);
            }
        }
    }

    return (
        <Form className="register-form" onSubmitCapture={register} onChange={changeForm}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="email" 
                    name="email" 
                    placeholder="Correo electronico" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password" 
                    name="repeatPassword" 
                    placeholder="Repetir contraseña" 
                    className="register-form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolity" onChange={inputValidation} checked={inputs.privacyPolity}>
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Regístrarme
                </Button>
            </Form.Item>
        </Form>
    )
}