import React, {useState} from "react";
import { Form, Input, Button, Checkbox, notification} from "antd";
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import {signUpApi} from "../../../api/user";

import "../Form.scss";

export default function RegisterForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolity: false,
        active: false
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolity: false,
        active: false
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

    const register = async e => {
        e.preventDefault();

        const emailValue = inputs.email;
        const passwordValue = inputs.password;
        const repeatPasswordValue = inputs.repeatPassword;
        const privacyPolityValue = inputs.privacyPolity;

        if(!emailValue || !passwordValue || !repeatPasswordValue || !privacyPolityValue){
            notification['error']({
                message: "Todos los campos son obligatorios"
            })
        }else {
            if(passwordValue !== repeatPasswordValue){
                notification['error']({
                    message: "Las contraseñas no coinciden"
                })
            }else {
                const result = await signUpApi(null, inputs, "");
                if(!result){
                    notification["error"]({
                        message: "Email ya se encuentra en uso"
                    })
                }else{
                    notification["success"]({
                        message: "Usuario creado exitosamente"
                    })
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");
        for(let input of inputs){
            input.classList.remove("error");
            input.classList.remove("success");
        }
        setInputs({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolity: false
        })
        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolity: false
        })
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