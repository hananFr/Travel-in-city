import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiUrl } from '../config.json';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUser } from "../services/userService";
import PageHeader from "./common/pageHeader";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

function BlogPage(props) {
    const [blog, setBlog] = useState({
        _id: '',
        content: '',
        writer: '',

    });
    const [user, setUser] = useState({
        _id: '',
        admin: ''
    })
    const [writer, setWriter] = useState();
    const [created_at, setCreatedAt] = useState();
    let { id } = useParams();

    const getUser = () => {
        const data = getCurrentUser();
        console.log(data);
        if (data) setUser(data);
    }

    const setTheBlog = async () => {
        await axios.get(`http://localhost:3900/api/blogs/${id}`)
            .then((res) => {
                console.log(res.data);
                setBlog(res.data)
                setTheWriter(res.data.writer)
                setCreatedAt(new Date(res.data.created_at))
            }).catch((err) => {
                console.log(err);
            });
    }
    const setTheWriter = async (writer) => {
        await axios.get(`http://localhost:3900/api/blogs/username/${writer}`)
            .then((res) => {
                console.log(res.data);
                setWriter(res.data.name)
            }).catch((err) => {
                console.log(err);
            });
    }

 

    const deleteBlog = async () => {
        await axios.delete(`${apiUrl}/blogs/${id}`).then((res) => {
            toast('המחיקה הושלמה');
            window.location.assign('/');
        }).catch((err) => console.log(err))
    }

    

    const submit = () => {
        
        const path = window.location.pathname
        
        confirmAlert({
          customUI: ({ onClose }) => {
            document.getElementById('id_container').addEventListener('click', () => {
                onClose();
                setInterval(() => {if(window.location.pathname !== path) props.history.replace(path)},0); 
            });    
            return (
                  <div id="id_alert" style={{
                zIndex: 2,
                position: 'fixed',
                top: '25%',
                left: '25%',
                display: 'block',
                borderStyle: 'solid',
                borderColor: 'ActiveBorder',
                borderRadius: 10,
                backgroundColor: 'white'
              }} className="mt-3 mx-auto mb-0 p-0 col-10 col-sm-9 col-md-8 col-lg-6 text-center text-light custom-ui" dir="rtl">
                <h5 className="mt-2 mb-4 text-danger col-12 mx-0" style={{
                    
                    backgroundColor: 'black',
                    paddingTop: '13px',
                    paddingBottom: '13px'
                }}>האם אתה בטוח?</h5>
                <p className="mb-5 text-primary">אתה רוצה למחוק את הבלוג הזה?</p>
                <div className="mb-4">
                <button className="btn text-center btn-secondary text-light col-2 col-sm-1 mx-1 py-1" onClick={() => {
                    document.getElementById('id_container').hidden = false
                    onClose()
                    }}>לא</button>
                <button className="btn text-center btn-secondary text-light col-2 col-sm-1 mx-1 py-1"
                  onClick={() => {
                    deleteBlog()
                    onClose();
                  }}
                >
                  כן
                </button>
                </div>
              </div>
            );
          }
        });
      };

    console.log(created_at);

    useEffect(() => {
        setTheBlog();
        getUser();
    }, []);

    if (blog && created_at) {
        return (
            <React.Fragment>
                <Container className="col-lg-9">
                    <Row>
                        <PageHeader
                            titleText={blog.name}
                        />

                    </Row>
                    <Row className="col-2 mx-auto">
                        <p className=" card-text mx-auto justify-content-center text-muted">{`${created_at.getDate()}.${created_at.getMonth() + 1}.${created_at.getFullYear()}`}</p>
                    </Row>

                    <div style={{
                        borderStyle: "double",
                        borderWidth: 7,
                        borderRadius: 12,
                        borderColor: "GrayText",
                    }} className="float-left card mt-2 col-md-6 p-0 mr-2 ">

                        <div className="d-inline-flex pl-0 p-0 card-body">


                            <div className="col-8 m-0 mt-0 ">

                                <div className="pt-2 pr-0">
                                    <p style={{ fontSize: 'smaller', alignContent: 'center', fontFamily: 'sans-serif' }} className=" card-text text-justify "> {writer} {blog.about_writer}</p>
                                </div>
                            </div>
                            <div className=" col-4 mx-0 p-0  " style={{
                                borderRight: 'outset',
                                // borderLeft: 'outset',
                                borderRadius: 2,
                                backgroundImage: `http://localhost:3900/api/blogs/user/${blog.writer}`
                            }}>
                                <img src={`http://localhost:3900/api/blogs/user/${blog.writer}`} className="  p-0 " style={{
                                    borderRadius: 6,
                                    margin: 0,
                                    width: '100%',
                                }} alt="profile_pic" />
                            </div>
                        </div>
                    </div>
                    <p className="text-justify p-0 m-0">{blog.content}</p>
                </Container>
                <div className="d-flex justift-content-center text-center col-7 mx-auto mt-3">
                    {blog.writer === user._id && (
                        <Link className=" text-decoration-none mr-auto ml-3" to={`/update-blog/${id}`}><button className='text-decoration-none btn mx-auto justify-content-center text-center btn-success'>ערוך בלוג</button>
                        </Link>
                    )}

                    {blog.writer === user._id && (
                        <input type="button" dir="rtl" className='btn ml-auto btn-success delete-button' onClick={submit}  value='מחק בלוג' />

                    )}
                </div>

            </React.Fragment>
        )
    }
    else return null
}

export default BlogPage