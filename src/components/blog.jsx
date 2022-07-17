import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Blog({ blog, id }) {
    const [desc, setDesc] = useState()

    const handleResize = () => {
        if (`id_p_blog${id}`) {
            document.getElementById(`id_p_blog${id}`).style.fontSize = `${document.getElementById(`id_blog${id}`).getBoundingClientRect().width * 16 / 190.5729217529297}px`
        }
    }

    const setShortDesc = () => {

        const desc = blog.content.split(' ', 5)
        let words = ''
        desc.map(word => {
            words += word + ' '
        })
        console.log(words);
        setDesc(words)
    }
    useEffect(() => {
        handleResize();
        setShortDesc();
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    })
    if (document.getElementById(`id_blog${id}`)) {
        console.log(document.getElementById(`id_blog${id}`).getBoundingClientRect().width);
    }
    return (
        <div className="card mb-5 bg-light p-0 mx-2" id={`id_blog${id}`} style={{
            width: '28%',
            borderRadius: '10px',
            borderRight: 'outset',
            borderBottom: 'outset',
            borderLeft: 'inset',
            borderTop: 'inset',
            borderWidth: '4px',
            borderColor: 'AppWorkspace'

        }}>
            <img src={`http://localhost:3900/api/blogs/image/${blog._id}`} style={{
            borderColor: 'AppWorkspace',
            borderRadiusTopRight: '5px',
            borderRadiusTopLeft: '5px',
            borderBottom: 'outset',
            borderWidth: '4px',
            height: '60%',
            width: '100%'
             }} className="card-img-top m-0 p-0" alt="blog_image" />
            <div className="card-body">
                <p id={`id_p_blog${id}`} style={{ fontSize: '16px' }}>{desc}<br></br>
                    <Link className="text-decoration-none" to={`/blog-page/${blog._id}`}>{'>>>'}</Link></p>
            </div>
        </div>
    )
}

export default Blog