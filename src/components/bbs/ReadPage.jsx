import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Row, Col, Button, Card } from 'react-bootstrap'
import Comments from './Comments'

const ReadPage = () => {
    const loginEmail = sessionStorage.getItem('email');
    const [post, setPost] = useState('');
    const {id} = useParams();
    const db = getFirestore(app);
    const navi = useNavigate();

    const callAPI = async() => {
        const res = await getDoc(doc(db, `posts/${id}`));
        setPost(res.data());
    }

    const {email, date, title, contents} = post;

    const onClickDelete = async() => {
        if(!window.confirm(`${id}번 게시글을 삭제하시겠습니까?`)) return;
        await deleteDoc(doc(db, `/posts/${id}`));
        window.location.href='/bbs'
    }

    useEffect(() => {
        callAPI();
    }, []);

    return (
        <Row className='my-5 justify-content-center' style={{width:"100%"}}>
            <Col xs={12} md={10} lg={8}>
                <h1 className={'fw-bold'}>게시글정보</h1>
                {loginEmail === email &&
                    <div className='text-end mb-2'>
                        <Button variant='success' size='sm' className='me-2 fw-bold' onClick={() => navi(`/bbs/update/${id}`)}>수정</Button>
                        <Button variant='danger' size='sm' className={'fw-bold'} onClick={onClickDelete}>삭제</Button>
                    </div>
                }
                <Card>
                    <Card.Body>
                        <h5>{title}</h5>
                        <div className='text-muted'>
                            <span className='me-3'>{date}</span>
                            <span>{email}</span>
                        </div>
                        <hr/>
                        <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
                    </Card.Body>
                </Card>
                <Comments/>
            </Col>
        </Row>
    )
}

export default ReadPage
