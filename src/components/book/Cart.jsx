import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseInit'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { Table, Button } from 'react-bootstrap'
import Book from "./Book";

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const uid = sessionStorage.getItem('uid');
    const db = getDatabase(app);

    const callAPI = () => {
        setLoading(true);
        onValue(ref(db, `cart/${uid}`), snapshot=>{
            const rows=[];
            snapshot.forEach(row=>{
                rows.push({key:row.key, ...row.val()});
            });
            setBooks(rows);
            setLoading(false);
        });
    }

    const onClickDelete = (book) => {
        if(window.confirm(`"${book.title}"\n도서를 삭제하시겠습니까?`)){
            //삭제하기
            remove(ref(db, `cart/${uid}/${book.isbn}`));
            alert("삭제되었습니다.");
        }
    }

    useEffect(()=>{
        callAPI();
    }, [])

    if(loading) return <h1 className='my-5 fw-bold'>로딩중...</h1>
    return (
        <div>
            <h1 className='my-5 fw-bold'>장바구니</h1>
            <Table>
                <thead>
                <tr>
                    <td colSpan={2}>도서제목</td>
                    <td>가격</td>
                    <td>저자</td>
                    <td>삭제</td>
                </tr>
                </thead>
                <tbody>
                {books.map(book=>
                    <tr key={book.isbn}>
                        <td><Book book={book} width={"30px"}/></td>
                        <td>{book.title}</td>
                        <td>{book.price}</td>
                        <td>{book.authors}</td>
                        <td><Button variant='danger' className='btn-sm' onClick={() => onClickDelete(book)}>삭제</Button></td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart
