import React, { useState } from 'react'
import { Row, Col, Form, InputGroup, Card, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const [form, setForm] = useState({
        email:'test@test.com',
        pass:'password'
    });
    const {email, pass} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(email==="" || pass==="") {
            alert("이메일 또는 비밀번호를 비어있습니다")
        } else {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, pass)
                .then(success=>{
                    alert("로그인 성공");
                    setLoading(false);
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('uid', success.user.uid)
                    if(sessionStorage.getItem('target')) {
                        navi(sessionStorage.getItem('target'))
                    } else {
                        navi('/');
                    }
                })
                .catch(error=>{
                    alert("에러: " + error.message)
                    setLoading(false);
                })
        }
    }

    if(loading) return <h1 className='my-5 fw-bold'>로딩중입니다...</h1>
    return (
        <Row className='my-5 justify-content-center w-100'>
            <Col md={6} lg={4}>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>로그인</h3>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text style={{width:100}} className='justify-content-center'>
                                    이메일
                                </InputGroup.Text>
                                <Form.Control name='email' value={email} onChange={onChange}/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text style={{width:100}} className='justify-content-center'>
                                    비밀번호
                                </InputGroup.Text>
                                <Form.Control name='pass' type='password' value={pass} onChange={onChange}/>
                            </InputGroup>
                            <div className='text-center'>
                                <div>
                                    <Row>
                                        <Col>
                                            <Button className='w-45 px-2 me-1' type='submit'>로그인</Button>
                                            <Button className='w-45 px-2' href="/join">회원가입</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login