
import React, { useEffect, useState } from "react";
import User from "./user";
import PageHeader from "./common/pageHeader";
import axios from "axios";



function Members() {
    const [users, setUsers] = useState()

    const setTheUsers = async () => {
        await axios.get('http://localhost:3900/api/users/get-users')
        .then((res) => {
            console.log(res);
            setUsers(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        setTheUsers();
    }, [])

    if (users) {
        return (
            <div className="container">
                <PageHeader titleText="משתמשים" />
                <div className="row">
                    <table className="table caption-top table-striped table-light">
                        <thead>

                            <tr>
                                <th scope="col">שם</th>
                                <th scope="col">אימייל</th>
                                <th scope="col">תאריך הצטרפות</th>
                                <th scope="col">מנהל</th>
                                <th scope="col">הגדרת ניהול</th>
                            </tr>
                        </thead>
                        <tbody className="text-warning">
                            {users.length > 0 &&
                                users.map(user => < User user={user} key={user._id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    else return (
        <div className="container">
            <PageHeader titleText="משתמשים" />
        </div>

    )
}


export default Members;