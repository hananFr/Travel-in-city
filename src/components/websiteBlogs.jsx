import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Blog from "./blog";
import {apiUrl} from '../config.json';

function WebsiteBlogs() {

    const [blogs, setBlogs] = useState();


    const didMount = () => {
        axios.get(`${apiUrl}/blogs`)
            .then((res) => setBlogs(res.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        didMount()
    }, [])

    console.log(blogs);
    if (blogs) {
        return (
            <React.Fragment>
                <div className="col-12  justify-content-center px-0" >
                    <div className="row d-flex col-12 col-md-10 col-lg-9 pt-5 my-4  mx-auto col justify-content-center">
                        {blogs.map(blog => <Blog
                            blog={blog}
                            key={blogs.indexOf(blog)}
                            id={blogs.indexOf(blog)}
                        />)}
                    </div>
                </div>
            </React.Fragment>
        )
    }
    else return null;
}

export default WebsiteBlogs